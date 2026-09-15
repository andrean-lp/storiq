/**
 * STORIQ AI Client — Vanilla JS streaming for multiple providers.
 * Zero dependencies. Uses native fetch + ReadableStream.
 *
 * Supported: Gemini (Google AI Studio), Groq, OpenRouter, Cerebras, Mistral, SambaNova
 * All via BYOK (Bring Your Own Key) — keys never leave the browser.
 */

/**
 * Stream from OpenAI-compatible APIs (Groq, OpenRouter, Cerebras, Mistral, SambaNova).
 * @param {Object} opts
 * @param {string} opts.url - API endpoint (e.g. 'https://api.groq.com/openai/v1/chat/completions')
 * @param {string} opts.apiKey
 * @param {string} opts.model
 * @param {Array<{role:string, content:string}>} opts.messages
 * @param {(chunk: string) => void} opts.onChunk - called for each text chunk
 * @param {AbortSignal} [opts.signal] - optional abort signal
 */
export async function streamOpenAI({ url, apiKey, model, messages, onChunk, signal }) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ model, messages, stream: true }),
    signal,
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || `HTTP ${response.status}`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop();

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || !trimmed.startsWith('data:')) continue;
      if (trimmed === 'data: [DONE]') return;

      try {
        const json = JSON.parse(trimmed.slice(5).trim());
        const content = json.choices?.[0]?.delta?.content || '';
        if (content) onChunk(content);
      } catch {
        // skip unparseable lines
      }
    }
  }
}

/**
 * Stream from Google Gemini API (different endpoint format).
 * @param {Object} opts
 * @param {string} opts.apiKey - Google AI Studio API key
 * @param {string} [opts.model='gemini-2.5-flash'] - model name
 * @param {string} opts.prompt - text prompt
 * @param {(chunk: string) => void} opts.onChunk
 * @param {AbortSignal} [opts.signal]
 */
export async function streamGemini({ apiKey, model = 'gemini-2.5-flash', prompt, onChunk, signal }) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?alt=sse&key=${apiKey}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
    signal,
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || `Gemini Error: HTTP ${response.status}`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop();

    for (const line of lines) {
      if (line.startsWith('data: ')) {
        try {
          const json = JSON.parse(line.slice(6));
          const text = json.candidates?.[0]?.content?.parts?.[0]?.text || '';
          if (text) onChunk(text);
        } catch {
          // skip
        }
      }
    }
  }
}

/** Provider configs — endpoint URLs and default models */
export const PROVIDERS = {
  sumopod: {
    name: 'SumoPod',
    type: 'openai',
    url: 'https://api.sumopod.com/v1/chat/completions', // Placeholder URL, can be configured later
    defaultModel: 'sumopod-model',
    models: ['sumopod-model'],
    signupUrl: '#',
  },
};

/**
 * Unified generate function — picks the right streaming method by provider.
 * @param {Object} opts
 * @param {string} opts.provider - key from PROVIDERS
 * @param {string} opts.apiKey
 * @param {string} opts.prompt
 * @param {(chunk: string) => void} opts.onChunk
 * @param {AbortSignal} [opts.signal]
 */
export async function generate({ provider, apiKey, prompt, onChunk, signal }) {
  const config = PROVIDERS[provider];
  if (!config) throw new Error(`Provider "${provider}" tidak dikenali.`);

  if (config.type === 'gemini') {
    return streamGemini({
      apiKey,
      model: config.defaultModel,
      prompt,
      onChunk,
      signal,
    });
  }

  return streamOpenAI({
    url: config.url,
    apiKey,
    model: config.defaultModel,
    messages: [{ role: 'user', content: prompt }],
    onChunk,
    signal,
  });
}
