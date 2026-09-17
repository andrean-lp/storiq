# Contributing to STORIQ (Content Repurposing Engine)

Thank you for your interest in contributing to **STORIQ**! We warmly welcome open-source contributions from developers, copywriters, landing page strategists, and content creators around the world to help build the most intuitive and powerful storytelling engine.

---

## 🌟 How You Can Contribute

There are many ways to contribute to STORIQ, whether you write code, design prompts, or craft educational content:

- 🧭 **Add New Storytelling Frameworks:** Implement proven narrative and copywriting frameworks (e.g., *Before-After-Bridge*, *Problem-Agitate-Solve*, *Dan Harmon's Story Circle*, *Pixar Pitch*).
- 📱 **Expand Repurposing Formats:** Create new output templates for emerging platforms (e.g., TikTok/Reels hook breakdowns, LinkedIn carousels, Substack newsletters, Threads unrolls).
- 🤖 **AI Model Adapters & BYOK Integrations:** Add or improve client-side API integrations for providers like Google Gemini, Groq, OpenRouter, DeepSeek, or local Ollama instances.
- ⚡ **UI / UX & Accessibility:** Enhance mobile responsiveness, dark mode, keyboard navigation, copy-to-clipboard feedback, or export formats (Markdown, PDF, Image).
- 📖 **Documentation & Case Studies:** Improve guides, fix typos, share real-world landing page conversion breakdowns, or translate documentation.

---

## 🚀 Getting Started

### 1. Fork & Clone

```bash
# 1. Fork the repository on GitHub (click the Fork button at the top right)
# 2. Clone your fork locally
git clone https://github.com/<your-username>/storiq.git
cd storiq

# 3. Add the upstream remote to stay synced with the original repository
git remote add upstream https://github.com/andrean-lp/storiq.git
```

### 2. Environment Setup

STORIQ is built with [Astro 5](https://astro.build/) and [Tailwind CSS v4](https://tailwindcss.com/). It requires **Node.js 18+** (Node 20+ recommended).

```bash
# 1. Install dependencies
npm install

# 2. Start the local development server
npm run dev
```

Your local instance will be live at:
```
http://localhost:4321/storiq/
```

> [!TIP]
> **Zero Backend Required:** STORIQ is 100% client-side! There are no databases, Docker containers, or backend servers to configure. API keys and state are managed strictly within the user's browser `localStorage`.

---

## 📁 Repository Structure

```text
storiq/
├── public/               # Static assets (favicons, logos, webp graphics)
├── src/
│   ├── components/       # Reusable Astro & UI components (Header, Footer, Cards)
│   ├── layouts/          # Page layouts (Base.astro)
│   ├── pages/            # Astro file-based routing
│   │   ├── index.astro            # Landing page
│   │   ├── generator/             # Generator pages (Manual & API modes)
│   │   ├── framework.astro        # 10 Elemen Framework documentation
│   │   ├── panduan.astro          # Tutorial & Free API key guide
│   │   ├── kontribusi.astro       # In-app contributor guide
│   │   ├── roadmap.astro          # Product roadmap & feature voting
│   │   └── tentang.astro          # About creator & project philosophy
│   └── utils/            # Client-side utility functions
│       ├── prompts.js             # Framework prompts & repurposing templates
│       └── storage.js             # LocalStorage & BYOK API key helpers
├── astro.config.mjs      # Astro configuration (base path & Tailwind v4)
└── package.json          # Project metadata and npm scripts
```

---

## 🛠️ Development Guidelines

### Branching Standard

We follow a clean, structured branch convention:

- `main` — Production branch. Deployed automatically via GitHub Pages.
- `development` — Active development and integration branch.
- `feat/<feature-name>` — New features, frameworks, or UI additions (e.g., `feat/tiktok-hook-template`).
- `fix/<bug-description>` — Bug fixes or edge case handling (e.g., `fix/clipboard-ios-safari`).
- `docs/<topic-name>` — Documentation, case studies, or copywriting enhancements.
- `refactor/<scope>` — Code cleanup, performance tuning, or styling refactors.

### Code Quality & Standards

- **Privacy First:** Never log, send, or expose user API keys or prompts to any third-party telemetry server.
- **Performance & Simplicity:** Favor native web APIs and standard Tailwind CSS classes over adding heavy third-party npm packages (*keep the bundle feather-light*).
- **Mobile First:** Every layout, card, and button must be comfortable to use on mobile touchscreens.
- **Semantic Markup:** Use accessible HTML elements (`<main>`, `<article>`, `<button type="button">`, proper ARIA attributes).

### Testing & Verification

Before opening a pull request, ensure your code compiles without warnings or errors:

```bash
# Build the production static site into /dist
npm run build

# Preview the production build locally
npm run preview
```

---

## 🤝 Pull Request Process

1. **Keep PRs Focused:** Submit one logical change per PR to make review fast and painless.
2. **Sync with Upstream:** Make sure your branch is rebased on the latest `upstream/main` or `upstream/development`:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```
3. **Open Pull Request:** Push your branch to your fork and submit a PR to `andrean-lp/storiq`:
   ```bash
   git push origin feat/your-feature-name
   ```
4. **Fill the PR Description:**
   - Clearly state the purpose of the change.
   - Mention any related issues (e.g., `Closes #5`).
   - Include before/after screenshots or GIFs for UI/visual changes.

---

## 📜 Code of Conduct & License

- By contributing to STORIQ, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md).
- All contributions are licensed under the [MIT License](LICENSE).

---

## 💬 Community & Questions

Need help or want to bounce an idea before writing code?

- 💬 **GitHub Issues & Discussions:** [Open an Issue](https://github.com/andrean-lp/storiq/issues)
- 📢 **Telegram Community:** Join our creator & developer community on Telegram
- 🌐 **Project Founder:** Maintained with ❤️ by **Andre Wahyu Hermawan** (*Landing Page Strategist & CRO*)
