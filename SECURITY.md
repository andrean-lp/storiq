# Security Policy

## Supported Versions

We actively maintain and patch the latest version of STORIQ on GitHub Pages:

| Version | Supported          |
| ------- | ------------------ |
| latest  | :white_check_mark: |
| < 1.0   | :x:                |

---

## 🔒 Client-Side Privacy & Security Model

STORIQ is engineered with a **Zero-Backend, Client-Side-First** security model:

1. **No External Telemetry:** All generation workflows, prompts, and content atoms are processed locally in your browser.
2. **Bring Your Own Key (BYOK) Safety:** When you configure API keys (e.g., Google Gemini, Groq), they are saved exclusively to your device's `localStorage`. They are never sent to, collected by, or logged on any intermediary server operated by STORIQ.
3. **Direct Outbound API Calls:** Calls to AI providers go directly from your browser client to the provider's official endpoint over HTTPS.

---

## 🚨 Reporting a Vulnerability

If you discover a security vulnerability or potential privacy leak within STORIQ, please report it responsibly:

1. **Do not disclose publicly:** Please avoid opening a public GitHub Issue with sensitive vulnerability details.
2. **Contact the maintainer:** Open a confidential discussion or contact **Andre Wahyu Hermawan** via [GitHub Profile](https://github.com/andrean-lp).
3. **Include details:**
   - A description of the issue and potential impact.
   - Steps to reproduce or proof-of-concept code.
   - Affected browsers, versions, or environments.

We take all reports seriously and will acknowledge receipt within 48 hours and work on a prompt remediation.
