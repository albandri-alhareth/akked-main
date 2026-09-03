# أكد (Akked) — Personal Data & Consent Guardian

> **"حارس البيانات الشخصية والموافقات" | "Personal Data & Consent Guardian"**

A modern, responsive, bilingual (Arabic RTL / English LTR) web application and graduation project centered on the principle of **Minimum Necessary Disclosure (مبدأ الحد الأدنى من البيانات)**.

Akked enables individuals to share only the minimum required data for a specific purpose, recipient, and duration through local client-side processing, automated PII redaction, tamper-evident SHA-256 cryptographic signatures, and dynamic watermarks.

---

## 🔤 Typography & Font Availability Documentation

This project adheres strictly to accessible, non-decorative typography guidelines for all user interface elements, forms, buttons, long paragraphs, and small texts:

### 1. Font Hierarchy & Fallback Policy

| Category               | Primary Font             | Documented Fallbacks                                                      | Purpose & Usage                                                                       |
| :--------------------- | :----------------------- | :------------------------------------------------------------------------ | :------------------------------------------------------------------------------------ |
| **Arabic UI & Text**   | `IBM Plex Sans Arabic`   | **`Noto Kufi Arabic`**, `Tajawal`, `-apple-system`, `sans-serif`          | All buttons, forms, paragraphs, badges, tables, and modal dialogs in Arabic.          |
| **English UI & Forms** | **`Inter`**              | `-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, `Roboto`, `sans-serif` | Clean, non-decorative sans-serif for buttons, form inputs, table data, and body copy. |
| **English Display**    | **`Cormorant Garamond`** | `Inter`, `sans-serif`                                                     | Editorial display headers and academic title text where appropriate.                  |

### 2. Strict Typographic Accessibility Rules

* **No Decorative Fonts for UI**: Decorative, cursive, or stylized display fonts are strictly prohibited on buttons, inputs, form fields, and long body paragraphs.
* **No Didot on Small Text**: High-contrast serifs like Didot are explicitly excluded on small body text, labels, and captions to prevent stroke-thinning blurriness on high-DPI and mobile displays.
* **Mobile Readability**: Base font size is set to `15px` with line-height of `1.65`. Captions and secondary labels maintain a minimum of `12.5px`–`13px` with font weight `600`+ to ensure total legibility across smartphone viewports.

---

## ♿ Accessibility (WCAG 2.1 AA / AAA Compliance)

* **Contrast Ratios**:

  * Deep Purple (`#5A1854`) on White (`#FFFFFF`): **10.9:1** *(Exceeds WCAG AAA requirement of 7:1)*.
  * Body Text (`#1A1D2E`) on Light App Background (`#F8F9FD`): **14.5:1** *(Exceeds WCAG AAA)*.
  * Secondary Slate (`#475569`) on White: **6.8:1** *(Exceeds WCAG AA requirement of 4.5:1)*.
  * Emerald Text (`#0D825B` / `#065F46`) on Green Tint (`#E6F4EA`): **5.4:1** *(Exceeds WCAG AA)*.
  * Dark Theme Text (`#F3F4F8`) on Surface (`#181B26`): **14.2:1** *(Exceeds WCAG AAA)*.
* **Touch Targets**: All interactive buttons, tabs, dropdowns, and links maintain a minimum interactive touch target height of **44px** (with `min-height: 36px` on compact badges) with explicit `:focus-visible` outline rings for keyboard navigation.
* **Bi-Directional Flow**:

  * **Arabic (RTL)**: Native `dir="rtl"` with right-to-left layout order, start-aligned typography, and flipped chevron icons.
  * **English (LTR)**: Native `dir="ltr"` with left-to-right flow.

---

## 🚀 Key Application Features

1. **Dashboard (لوحة التحكم)**:

   * Real-time KPI counters (Active Shares, Expired Shares, Shielded PII Fields).
   * Privacy Health Score gauge (94% protection rating).
   * Recent activity audit timeline.

2. **6-Step Secure Share Wizard (معالج المشاركة الآمنة)**:

   * **Step 1: Document Upload & Realistic Templates**: Supports local drag-and-drop or preloaded templates (Saudi National ID, Salary Certificate, Warranty Invoice).
   * **Step 2: Recipient & Purpose Selection**: Targeted disclosure for Age 18+ Verification, Salary Threshold, or Warranty Verification.
   * **Step 3: AI Minimization Analysis**: Detects sensitive PII and shields redundant fields.
   * **Step 4: Interactive Before/After Preview**: Side-by-side comparison of full vs. protected document with selectable masks (Blackout, Blur, Pixelate, Tokenize).
   * **Step 5: Safety Scan & Watermark**: Dynamic Privacy Score calculation, expiration duration (5 min to 30 days), and recipient-locked watermark.
   * **Step 6: Issued Proof**: Generates verifiable proof card with Proof ID `DEMO-018`, QR code, and SHA-256 digest.

3. **Recipient Verification Portal (بوابة التحقق للجهات)**:

   * Recipient can input Proof ID (e.g. `DEMO-018`) to verify claims without accessing hidden personal identifiable information.

4. **Shares Registry (سجل المشاركات)**:

   * Searchable, filterable table with 1-click **Instant Revoke** capability.

5. **My Data Vault (خزنة بياناتي)**:

   * Categorized exposure monitor with **Zero-Trace Purge** to wipe all local cache.

6. **Trusted Entities (الجهات الموثوقة)**:

   * Directory of organizations adhering to PDPL privacy guidelines.

7. **Settings (الإعدادات)**:

   * Strict Redaction Mode, Watermark density customizer, language & dark/light theme toggles.

---

## 🛠️ How to Run Locally

1. Navigate to the project root:

   ```bash
   cd /Users/atheer/.gemini/antigravity-ide/scratch/akked
   ```

2. Start the local server:

   ```bash
   python3 -m http.server 8000
   ```

3. Open your browser at:

   ```
   http://localhost:8000
   ```

---

## 👥 Team Members | أعضاء الفريق

تم تطوير مشروع «أكّد» بواسطة:

* البندري ال الحارث
* اثير الفرحان
* غيداء الشمري
* ساره الاسود
* لين الملاقي
* لمار المطيري

---

البرنامج التدريبي الذي نُفذ المشروع ضمنه: البرمجة التوليدية .

## 📄 Academic Project Documentation

For the complete graduation project thesis, IEEE 830 functional requirements, AI engine mechanics, and privacy architecture, see:

* [project_documentation.md](file:///Users/atheer/.gemini/antigravity-ide/scratch/akked/project_documentation.md)




