/**
 * STORIQ Social Media Caption Generator & Article Summarizer
 * Generates dynamic, context-aware social media captions from generated or pasted articles.
 */

/**
 * Clean markdown formatting from text
 */
function cleanMarkdown(str) {
  if (!str) return '';
  return str
    .replace(/^#+\s+/gm, '') // Remove heading hashes
    .replace(/^[-*•]\s+/gm, '') // Remove bullets
    .replace(/^[\d]+\.\s+/gm, '') // Remove numbered lists
    .replace(/\*\*([^*]+)\*\*/g, '$1') // Bold **text**
    .replace(/\*([^*]+)\*/g, '$1') // Italic *text*
    .replace(/__([^_]+)__/g, '$1') // Bold __text__
    .replace(/_([^_]+)_/g, '$1') // Italic _text_
    .replace(/`([^`]+)`/g, '$1') // Inline code
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Links [text](url)
    .trim();
}

/**
 * Generate 3-5 clean hashtags from topic and tone
 */
function generateHashtags(topik, tone) {
  const cleanTopic = (topik || '').replace(/[^\w\s\u00C0-\u024F]/gi, '').trim();
  const words = cleanTopic.split(/\s+/).filter(w => w.length > 2);
  
  const tags = new Set();
  
  // Tag 1: Full topic pascal case if not too long
  if (words.length >= 1 && words.length <= 4) {
    const pascal = words.map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('');
    if (pascal.length > 2 && pascal.length <= 30) {
      tags.add('#' + pascal);
    }
  }

  // Tag 2: Primary keyword
  if (words.length >= 2) {
    const twoWords = words.slice(0, 2).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('');
    tags.add('#' + twoWords);
  } else if (words.length === 1) {
    tags.add('#' + words[0].charAt(0).toUpperCase() + words[0].slice(1).toLowerCase());
  }

  // Niche & general growth tags
  const nicheTagsByTone = {
    santai: ['#ContentCreator', '#TipsKreatif', '#BelajarBerkarya'],
    profesional: ['#StrategiBisnis', '#ProfesionalMuda', '#ProductivityTips'],
    edukatif: ['#EdukasiPraktis', '#InsightHarian', '#BelajarBareng'],
    inspiratif: ['#MindsetBertumbuh', '#MotivasiSukses', '#LangkahNyata'],
    storytelling: ['#StorytellingIndonesia', '#CeritaBermakna', '#KisahInspiratif']
  };

  const defaults = nicheTagsByTone[tone] || nicheTagsByTone.santai;
  for (const t of defaults) {
    tags.add(t);
  }
  tags.add('#STORIQ');

  return Array.from(tags).slice(0, 6).join(' ');
}

/**
 * Extract direct AI Caption block if present in the article
 */
function extractExplicitCaptionBlock(text) {
  if (!text) return null;
  
  const patterns = [
    /\[CAPTION(?: MEDIA SOSIAL)?\]([\s\S]*?)(?:$|---+|\[|$)/i,
    /(?:###|##)\s*Caption(?: Media Sosial)?[\s\S]*?\n([\s\S]*?)(?:$|---+|(?:###|##)\s+)/i,
    /(?:^|\n)---+\s*CAPTION[^\n]*---+[\s\S]*?\n([\s\S]*?)(?:$|---+)/i,
    /(?:^|\n)Caption Media Sosial:\s*([\s\S]*?)(?:$|---+)/i
  ];

  for (const pat of patterns) {
    const match = text.match(pat);
    if (match && match[1]) {
      const candidate = match[1].trim();
      // Verify candidate is meaningful
      if (candidate.length > 35 && !candidate.startsWith('(') && !candidate.startsWith('[')) {
        return cleanMarkdown(candidate);
      }
    }
  }
  return null;
}

/**
 * Extract opening hook from article
 */
function extractArticleHook(text, topik, tone) {
  if (text) {
    // Split into paragraphs
    const paragraphs = text
      .split(/\n\s*\n/)
      .map(p => p.trim())
      .filter(p => {
        if (p.length < 25) return false;
        if (p.startsWith('#') || p.startsWith('---') || p.startsWith('***')) return false;
        if (/^(Penulis|Tanggal|Waktu baca|Kategori):/i.test(p)) return false;
        if (/^\[(Slide|Cover|Visual)/i.test(p)) return false;
        return true;
      });

    if (paragraphs.length > 0) {
      const firstPara = cleanMarkdown(paragraphs[0]);
      // Extract first 1-2 sentences
      const sentences = firstPara.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 15);
      if (sentences.length >= 2) {
        const combined = sentences.slice(0, 2).join(' ');
        if (combined.length <= 220) return combined;
        return sentences[0];
      } else if (sentences.length === 1) {
        return sentences[0];
      }
    }
  }

  // Fallback dynamic hook based on topic & tone
  const hooks = {
    santai: `Pernah kepikiran nggak, kenapa seputar "${topik}" masih sering bikin banyak orang bingung?`,
    profesional: `Dalam lanskap perkembangan saat ini, memahami esensi "${topik}" menjadi kunci diferensiasi yang nyata.`,
    edukatif: `Banyak yang ingin menguasai "${topik}", tapi sering bingung harus mulai dari fondasi yang mana.`,
    inspiratif: `Seringkali langkah terbesar seputar "${topik}" berakar dari keberanian mengeksekusi hal mendasar dengan konsisten.`,
    storytelling: `Ada satu hal menarik saat kita menyelami lebih dalam tentang "${topik}".`
  };
  return hooks[tone] || hooks.santai;
}

/**
 * Extract key takeaways / action points from article, filtering out rhetorical questions and section headers
 */
export function extractKeyTakeaways(text, fallbackTopic) {
  const defaultTopic = fallbackTopic || 'isu ini';
  const defaultPoints = [
    `Identifikasi akar masalah seputar ${defaultTopic} secara tepat`,
    `Terapkan strategi bertahap dan prioritaskan aksi nyata`,
    `Evaluasi hasil secara berkala untuk menjaga konsistensi perbaikan`
  ];

  if (!text) return defaultPoints;

  const lines = text.split('\n').map(l => l.trim());
  const highPriority = [];
  const mediumPriority = [];

  // Question keywords to filter out (rhetorical/problem questions, not insights)
  const questionWordsRegex = /^(apakah|kenapa|mengapa|bagaimana jika|jangan-jangan|adakah|benarkah|pernahkah|siapakah)\b/i;
  
  // Section headers to filter out
  const sectionHeaderRegex = /^(masalah|tantangan|kendala|hambatan|problem|isu|kesalahan|pertanyaan|pendahuluan|pengantar|latar belakang|kesimpulan|rangkuman|daftar pustaka|penutup|slide|cover|cta|hook|solusi praktis|solusi|tips|langkah)\b/i;

  for (const rawLine of lines) {
    if (rawLine.length < 15 || rawLine.length > 160) continue;

    const isNumbered = /^[\d]+\.\s+/.test(rawLine);
    const isBullet = /^[-*•]\s+/.test(rawLine);
    const isHeading = /^#{2,4}\s+/.test(rawLine);
    const isBoldItem = /^\*\*[^*]+\*\*/.test(rawLine);

    if (isNumbered || isBullet || isHeading || isBoldItem) {
      const cleaned = cleanMarkdown(rawLine)
        .replace(/^[\d\-*•#]+\.?\s*/, '')
        .trim();

      // Filter out rhetorical questions
      if (cleaned.endsWith('?')) continue;
      if (questionWordsRegex.test(cleaned)) continue;

      // Filter out pure section headers
      if (sectionHeaderRegex.test(cleaned) && cleaned.length < 35) continue;

      if (cleaned.length >= 18 && cleaned.length <= 140) {
        // High priority for numbered points and actionable bullets
        if (isNumbered || /^(fokus|terapkan|gunakan|buat|tulis|bangun|hindari|optimasi|pahami|jaga|pastikan|lakukan|tingkatkan|pelajari|ubah)/i.test(cleaned)) {
          if (!highPriority.some(c => c.toLowerCase() === cleaned.toLowerCase())) {
            highPriority.push(cleaned);
          }
        } else {
          if (!mediumPriority.some(c => c.toLowerCase() === cleaned.toLowerCase())) {
            mediumPriority.push(cleaned);
          }
        }
      }
    }
  }

  const combined = [...highPriority, ...mediumPriority];
  if (combined.length >= 3) {
    return combined.slice(0, 3);
  }

  // Fallback: search for sentences with insight indicator keywords
  const insightWordsRegex = /\b(kunci|penting|solusi|cara|strategi|langkah|prinsip|fokus|fondasi|rahasia|metode|efektif|konsisten|hasil)\b/i;
  const sentences = text
    .split(/(?<=[.!?])\s+/)
    .map(s => cleanMarkdown(s.trim()))
    .filter(s => {
      if (s.length < 25 || s.length > 130) return false;
      if (s.endsWith('?')) return false;
      if (questionWordsRegex.test(s)) return false;
      return insightWordsRegex.test(s);
    });

  for (const s of sentences) {
    if (!combined.includes(s)) {
      combined.push(s);
      if (combined.length >= 3) break;
    }
  }

  if (combined.length >= 3) {
    return combined.slice(0, 3);
  }

  // If still fewer than 3, complete with contextual defaults
  for (const p of defaultPoints) {
    if (combined.length >= 3) break;
    if (!combined.includes(p)) combined.push(p);
  }
  return combined.slice(0, 3);
}

/**
 * Generate a complete, dynamic social media caption tailored to the article, tone, and audience.
 */
export function generateDynamicSocialCaption({ text, topik, audiens, tone }) {
  const activeTopic = (topik || '').trim() || 'Strategi Menghasilkan Dampak';
  const activeTone = tone || 'santai';
  const activeAudiens = (audiens || '').trim() || 'Teman-teman';

  // 1. Check if the AI generated a dedicated caption block
  const explicitCaption = extractExplicitCaptionBlock(text);
  if (explicitCaption) {
    return explicitCaption;
  }

  // 2. Extract opening hook from article or synthesize one
  const hook = extractArticleHook(text, activeTopic, activeTone);

  // 3. Dynamic tone bridge
  const bridges = {
    santai: 'Kelihatannya simpel, tapi banyak hal mendasar yang sering terlewat. Ini beberapa poin penting yang wajib kamu catat:',
    profesional: 'Untuk mengeksekusi strategi ini dengan hasil optimal, berikut beberapa prinsip kunci yang perlu diterapkan secara konsisten:',
    edukatif: 'Biar pemahamanmu makin kokoh dan tidak salah langkah, mari pelajari rangkuman intinya berikut:',
    inspiratif: 'Perubahan nyata selalu bermula dari keberanian mengeksekusi prinsip dasar dengan konsisten. Simak intinya:',
    storytelling: 'Dari proses dan pembelajaran ini, ada beberapa insight berharga yang layak dijadikan pengingat:'
  };
  const bridge = bridges[activeTone] || bridges.santai;

  // 4. Extract 3 high-impact actionable points
  const points = extractKeyTakeaways(text, activeTopic);

  // 5. Dynamic CTA & Engagement Question based on tone & audience
  const ctas = {
    santai: `👉 Swipe visual di atas untuk rangkuman lengkapnya!\n\nDari 3 poin di atas, mana yang paling relate sama kondisi kamu saat ini? Drop jawabanmu di kolom komentar ya! 👇`,
    profesional: `👉 Simak visualisasi di atas untuk kerangka kerja lengkapnya.\n\nBagaimana pendekatan Anda dalam menerapkan strategi ini? Mari berbagi insight di kolom komentar. 👇`,
    edukatif: `👉 Simpan (Save) postingan ini buat contekan saat kamu butuh nanti!\n\nPunya tips tambahan atau pengalaman seputar topik ini? Tulis di kolom komentar, yuk belajar bareng! 💡`,
    inspiratif: `👉 Simpan dan bagikan visual ini ke rekan yang sedang berjuang di hal serupa.\n\nSiap berkomitmen mengambil langkah pertama hari ini? Tulis 'SIAP' di kolom komentar jika kamu setuju! 🔥`,
    storytelling: `👉 Cek visual di atas untuk menyimak alur ceritanya secara utuh.\n\nPernah mengalami situasi atau tantangan yang sama? Ceritakan di kolom komentar ya! ✨`
  };
  const cta = ctas[activeTone] || ctas.santai;

  // 6. Dynamic hashtags
  const hashtags = generateHashtags(activeTopic, activeTone);

  // Assemble full dynamic caption
  return `🔥 ${activeTopic}

${hook}

${bridge}
📌 ${points[0]}
📌 ${points[1]}
📌 ${points[2]}

${cta}

${hashtags}`;
}
