/**
 * STORIQ Prompt Templates — structured prompts for each output format.
 * Each template is a function that takes user input and returns a complete prompt.
 */

/** Build the STORIQ framework context section */
function frameworkContext(framework) {
  const frameworks = {
    storiq10: `Gunakan STORIQ Framework 10 Elemen:
1. Context — Pahami dunia dan kondisi audiens saat ini
2. Character — Posisikan audiens sebagai protagonis/tokoh utama
3. Conflict — Tunjukkan gap, masalah, atau hambatan nyata yang mereka rasakan
4. Desire — Gambarkan kondisi ideal yang mereka inginkan
5. Discovery — Buka perspektif baru yang mengejutkan ("Oh, ternyata ada cara!")
6. Mechanism — Jelaskan cara kerja solusi secara sederhana
7. Proof — Berikan bukti nyata (data, testimoni, studi kasus)
8. Transformation — Tunjukkan perubahan before → after yang konkret
9. Risk Reduction — Kurangi persepsi risiko (garansi, transparansi, ekspektasi jelas)
10. Action — Berikan langkah selanjutnya yang natural dan relevan`,

    pas: `Gunakan framework PAS (Problem-Agitate-Solve):
1. Problem — Identifikasi masalah spesifik yang dirasakan audiens
2. Agitate — Perbesar rasa urgensi, tunjukkan dampak jika tidak ditangani
3. Solve — Tawarkan solusi yang jelas dan actionable`,

    aida: `Gunakan framework AIDA:
1. Attention — Tarik perhatian dengan hook yang kuat
2. Interest — Bangun ketertarikan dengan fakta atau cerita relevan
3. Desire — Ciptakan keinginan untuk bertindak
4. Action — Berikan CTA yang jelas`,

    bab: `Gunakan framework Before-After-Bridge:
1. Before — Gambarkan kondisi saat ini (pain point)
2. After — Gambarkan kondisi ideal setelah masalah teratasi
3. Bridge — Jelaskan bagaimana cara mencapainya`,
  };
  return frameworks[framework] || frameworks.storiq10;
}

/** Generate prompt for a specific output format */
export function buildPrompt({ topik, audiens, tujuan, tone, framework, format }) {
  const ctx = frameworkContext(framework);
  const base = `Kamu adalah content strategist yang ahli storytelling dan copywriting.

KONTEKS:
- Topik: ${topik}
- Target Audiens: ${audiens}
- Tujuan Konten: ${tujuan}
- Tone/Gaya: ${tone}

FRAMEWORK STORYTELLING:
${ctx}

INSTRUKSI PENTING:
- Gunakan bahasa ${tone} yang mudah dipahami
- Setiap kalimat harus punya tujuan (tidak ada filler)
- Fokus pada value dan insight, bukan promosi
- Tulis dalam Bahasa Indonesia`;

  const formatInstructions = {
    blog: `\n\nBuat ARTIKEL BLOG dengan struktur:
1. Judul yang menarik (hook kuat, bikin penasaran)
2. Pembukaan (2-3 paragraf) — mulai dari masalah/cerita yang relatable
3. Isi (3-5 sub-bagian) — setiap sub-bagian punya heading dan insight
4. Kesimpulan — rangkuman + CTA natural
5. Panjang: 800-1200 kata
6. Sertakan 2-3 quote atau data yang mendukung`,

    carousel: `\n\nBuat CAROUSEL INSTAGRAM (8-10 slide) dengan struktur:
Slide 1 — COVER: Judul yang bikin orang berhenti scroll (max 8 kata)
Slide 2 — HOOK: Kalimat pembuka yang relatable atau mengejutkan
Slide 3 — PROBLEM: Masalah yang dirasakan audiens
Slide 4-7 — CONTENT: Poin-poin utama (1 poin per slide, max 3 kalimat per slide)
Slide 8 — PROOF/INSIGHT: Data atau contoh nyata
Slide 9 — SUMMARY: Rangkuman singkat
Slide 10 — CTA: Ajakan yang natural ("Save untuk nanti" / "Share ke teman yang butuh")

Format output:
[Slide 1]
(teks slide)

[Slide 2]
(teks slide)
...dst`,

    caption: `\n\nBuat CAPTION SOCIAL MEDIA dengan struktur:
1. Hook (1 kalimat pertama yang bikin berhenti scroll)
2. Story/Context (2-3 kalimat cerita atau konteks)
3. Insight utama (poin-poin pendek)
4. CTA (ajakan bertindak)
5. Hashtag relevan (5-8 hashtag)
6. Panjang: 150-300 kata
7. Gunakan line break untuk readability
8. Buat versi untuk: Instagram, LinkedIn, dan Facebook`,

    video: `\n\nBuat VIDEO SCRIPT dengan struktur:
1. HOOK (0-5 detik): Kalimat pembuka yang langsung menarik perhatian
2. PEMBUKAAN (5-15 detik): Konteks singkat, kenapa topik ini penting
3. ISI (15-90 detik):
   - Poin 1 + penjelasan singkat
   - Poin 2 + penjelasan singkat  
   - Poin 3 + penjelasan singkat
4. PENUTUP (5-10 detik): Rangkuman + CTA
5. Tambahkan [VISUAL NOTE] untuk saran visual di setiap bagian
6. Panjang total: 60-120 detik
7. Gaya bicara: conversational, seperti ngobrol sama teman`,

    thread: `\n\nBuat X/TWITTER THREAD (8-12 tweet) dengan struktur:
Tweet 1 — HOOK: Pernyataan bold atau pertanyaan yang memancing engagement
Tweet 2-9 — CONTENT: Satu insight per tweet, max 280 karakter per tweet
Tweet 10 — SUMMARY: "TL;DR" atau rangkuman
Tweet 11 — CTA: Ajakan retweet/follow/bookmark
Tweet 12 — PLUG: Referensi ke sumber atau akun

Format output:
1/ (teks tweet)
2/ (teks tweet)
...dst`,

    quote: `\n\nBuat 5-8 QUOTE IMAGE TEXT berdasarkan topik.
Setiap quote harus:
- Maksimal 2 kalimat
- Standalone (bisa dipahami tanpa konteks)
- Insightful dan shareable
- Mencampur gaya: inspiratif, edukatif, dan provocative

Format output:
[Quote 1]
"(teks quote)"

[Quote 2]
"(teks quote)"
...dst`,

    linkedin: `\n\nBuat LINKEDIN POST dengan struktur:
1. Hook (1 kalimat pembuka yang kuat)
2. Story/experience (cerita personal atau observasi)
3. Insight/lesson (3-5 poin pembelajaran)
4. Takeaway (1-2 kalimat kesimpulan)
5. CTA (ajakan diskusi)
6. Panjang: 200-400 kata
7. Gunakan line break setiap 1-2 kalimat
8. Professional tapi tetap personal`,

    pinterest: `\n\nBuat PINTEREST PIN DESCRIPTION:
1. Judul pin yang SEO-friendly (max 100 karakter)
2. Deskripsi (150-300 karakter) yang menarik klik
3. Keywords relevan (5-8 keyword)
4. Buat 3 variasi untuk A/B testing`,
  };

  return base + (formatInstructions[format] || formatInstructions.blog);
}

/** Available output formats with metadata */
export const OUTPUT_FORMATS = [
  { id: 'blog', label: 'Artikel Blog', icon: '📝', platform: 'Blog/Website' },
  { id: 'carousel', label: 'Carousel Instagram', icon: '📱', platform: 'Instagram' },
  { id: 'caption', label: 'Caption Social Media', icon: '💬', platform: 'IG/LinkedIn/FB' },
  { id: 'video', label: 'Video Script', icon: '🎬', platform: 'YouTube/Reels/TikTok' },
  { id: 'thread', label: 'X/Twitter Thread', icon: '🐦', platform: 'X/Twitter' },
  { id: 'quote', label: 'Quote Image', icon: '💡', platform: 'Semua Platform' },
  { id: 'linkedin', label: 'LinkedIn Post', icon: '💼', platform: 'LinkedIn' },
  { id: 'pinterest', label: 'Pinterest Pin', icon: '📌', platform: 'Pinterest' },
];

/** Available frameworks */
export const FRAMEWORKS = [
  { id: 'storiq10', label: 'STORIQ 10 Elemen', desc: 'Framework lengkap berbasis storytelling psychology (recommended)' },
  { id: 'pas', label: 'PAS (Problem-Agitate-Solve)', desc: 'Fokus pada masalah dan solusi — simpel dan efektif' },
  { id: 'aida', label: 'AIDA', desc: 'Attention → Interest → Desire → Action — klasik dan terbukti' },
  { id: 'bab', label: 'Before-After-Bridge', desc: 'Tunjukkan transformasi dari kondisi sekarang ke kondisi ideal' },
];

/** Available tones */
export const TONES = [
  { id: 'santai', label: 'Santai & Friendly' },
  { id: 'profesional', label: 'Profesional' },
  { id: 'edukatif', label: 'Edukatif & Informatif' },
  { id: 'inspiratif', label: 'Inspiratif & Motivasi' },
  { id: 'storytelling', label: 'Storytelling (bercerita)' },
];
