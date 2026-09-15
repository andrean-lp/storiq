/**
 * STORIQ localStorage helpers.
 * API keys and user preferences — never leave the browser.
 */

const PREFIX = 'storiq_';

export function saveApiKey(provider, key) {
  localStorage.setItem(`${PREFIX}apikey_${provider}`, key);
}

export function getApiKey(provider) {
  return localStorage.getItem(`${PREFIX}apikey_${provider}`) || '';
}

export function removeApiKey(provider) {
  localStorage.removeItem(`${PREFIX}apikey_${provider}`);
}

export function getPreferences() {
  try {
    return JSON.parse(localStorage.getItem(`${PREFIX}prefs`) || '{}');
  } catch {
    return {};
  }
}

export function savePreferences(prefs) {
  const current = getPreferences();
  localStorage.setItem(`${PREFIX}prefs`, JSON.stringify({ ...current, ...prefs }));
}

export function clearAll() {
  Object.keys(localStorage)
    .filter(k => k.startsWith(PREFIX))
    .forEach(k => localStorage.removeItem(k));
}
