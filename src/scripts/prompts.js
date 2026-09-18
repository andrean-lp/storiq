/**
 * STORIQ Prompt Templates — structured prompts for each output format.
 * Each template is a function that takes user input and returns a complete prompt.
 */

/** Build the STORIQ framework context section */
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

    heros_journey: `Gunakan framework The Hero's Journey (Joseph Campbell):
1. Status Quo — Audiens di zona nyaman mereka tapi ada yang kurang
2. Call to Adventure — Sebuah tantangan atau masalah muncul
3. Meeting the Mentor — Kenalkan dirimu/brand sebagai mentor yang memberi alat/insight
4. Crossing the Threshold — Audiens mulai mencoba solusi baru
5. The Ordeal — Tantangan terbesar yang berhasil diatasi
6. The Reward — Hasil atau transformasi positif yang didapatkan`,

    storybrand: `Gunakan The StoryBrand Framework (Donald Miller):
1. A Character — Siapa audiens (sebagai hero) dan apa yang mereka inginkan?
2. Has a Problem — Masalah eksternal, internal, dan filosofis yang mereka hadapi
3. And Meets a Guide — Posisikan dirimu/brand sebagai pemandu yang empati dan punya otoritas
4. Who Gives Them a Plan — Berikan 3 langkah mudah untuk menyelesaikan masalah
5. And Calls Them to Action — Ajakan bertindak yang sangat jelas
6. That Helps Them Avoid Failure — Apa kerugiannya jika mereka tidak bertindak?
7. And Ends in a Success — Gambarkan kesuksesan yang mereka capai`,

    andy_raskin: `Gunakan framework Normal, Explosion, New Normal (Andy Raskin / Strategic Narrative):
1. The Old Normal (Status Quo) — Cara lama melakukan sesuatu
2. The Explosion (Disruption) — Perubahan besar di dunia yang membuat cara lama usang/berbahaya
3. The New Normal (Promised Land) — Kondisi ideal yang baru (bukan produkmu, tapi masa depan)
4. The Magic Gifts — Fitur/solusi dari produkmu yang membantu mereka bertahan di New Normal
5. The Proof — Bukti bahwa ini berhasil (contoh nyata)`,

    pixar: `Gunakan Pixar's Story Spine (Formula Bercerita Pixar):
1. Once upon a time... (Konteks audiens)
2. Every day... (Rutinitas atau masalah yang terus berulang)
3. Until one day... (Titik balik/insight baru ditemukan)
4. Because of that... (Langkah pertama dari solusi)
5. Because of that... (Dampak lanjutan dari solusi)
6. Until finally... (Transformasi akhir yang dicapai)`,

    three_act: `Gunakan The Three-Act Structure (Struktur 3 Babak klasik):
1. Babak 1: Setup — Kenalkan karakter (audiens), situasi, dan "Inciting Incident" (masalah utama)
2. Babak 2: Confrontation — Perjuangan mencari solusi, hambatan yang dihadapi, tension yang memuncak
3. Babak 3: Resolution — Masalah terselesaikan, pelajaran yang dipetik, perubahan yang terjadi`,

    golden_circle: `Gunakan framework Golden Circle (Simon Sinek):
1. WHY — Mulai dari tujuan, keyakinan, atau "kenapa" hal ini penting (Inspirasi)
2. HOW — Jelaskan proses, nilai-nilai, atau "bagaimana" cara mencapainya (Diferensiasi)
3. WHAT — Jelaskan "apa" bentuk nyata/solusi/produknya secara konkret (Hasil)`
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
6. Sertakan 2-3 quote atau data yang mendukung
7. Di bagian akhir artikel, sertakan bagian naskah caption siap posting dengan format:
[CAPTION MEDIA SOSIAL]
(Tulis naskah caption 100-200 kata yang merangkum inti artikel dengan hook pemikat, 3 poin utama, CTA interaktif, dan 3-5 hashtag relevan)`,

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
...dst

Di baris paling akhir, tambahkan naskah caption siap pakai:
[CAPTION MEDIA SOSIAL]
(Naskah caption ringkas 80-150 kata yang merangkum pesan carousel, ajakan swipe/baca, CTA diskusi, dan hashtag relevan)`,

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
  { id: 'heros_journey', label: "The Hero's Journey", desc: 'Perjalanan hero mengatasi tantangan dan bertransformasi (Joseph Campbell)' },
  { id: 'storybrand', label: 'The StoryBrand Framework', desc: 'Karakter punya masalah, bertemu guide, dapat plan, menuju sukses (Donald Miller)' },
  { id: 'andy_raskin', label: 'Normal, Explosion, New Normal', desc: 'Status quo yang terganggu menuju masa depan ideal (Andy Raskin)' },
  { id: 'pixar', label: "Pixar's Story Spine", desc: 'Formula bercerita ikonik Pixar: Once upon a time... Until finally...' },
  { id: 'three_act', label: 'The Three-Act Structure', desc: 'Struktur klasik 3 babak: Setup, Confrontation, Resolution' },
  { id: 'golden_circle', label: 'Golden Circle', desc: 'Mulai dari tujuan utama: Why, How, What (Simon Sinek)' },
];

/** Available tones */
export const TONES = [
  { id: 'santai', label: 'Santai & Friendly' },
  { id: 'profesional', label: 'Profesional' },
  { id: 'edukatif', label: 'Edukatif & Informatif' },
  { id: 'inspiratif', label: 'Inspiratif & Motivasi' },
  { id: 'storytelling', label: 'Storytelling (bercerita)' },
];
