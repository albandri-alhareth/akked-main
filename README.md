# Akked (أكّد)

**Personal Data & Consent Guardian | حارس البيانات الشخصية والموافقات**

## Project Overview

Akked is a bilingual graduation project that presents a privacy-focused approach to digital verification. The platform allows individuals to prove a required fact without sharing an entire identity document or disclosing unrelated personal information.

The project is based on the principle of **Minimum Necessary Disclosure**. This means that the requesting organization receives only the specific result required for a defined purpose, while all unnecessary personal details remain protected.

For example, if an organization needs to verify whether a person is eligible for a service, it may receive only an “Eligible” or “Not Eligible” result. The user does not need to reveal their full name, national identification number, date of birth, address, or any other unrelated information.

Akked is designed as a responsive web application that works on desktop computers, laptops, tablets, and mobile phones. It provides a complete Arabic interface with right-to-left direction and a complete English interface with left-to-right direction.

## The Problem

Many digital services request complete documents even when only one piece of information needs to be verified. A user may be asked to upload a full identity document simply to confirm eligibility, age, salary range, or warranty status.

This approach may create several privacy and security concerns:

- Personal information unrelated to the requested service may be disclosed.
- Copies of sensitive documents may be stored by several organizations.
- Users may not know which organizations accessed their information.
- Users may not know how long their documents will remain available.
- Documents may be reused for purposes that were not originally approved.
- Users may have limited control over cancelling or revoking an active disclosure.
- Sharing complete documents increases the possible impact of unauthorized access or data leakage.

## Proposed Solution

Akked provides a controlled method for creating a limited digital proof. Each proof is connected to four main elements:

- The specific information that needs to be verified.
- The organization receiving the proof.
- The stated purpose of the request.
- The period during which the proof remains valid.

The user selects a document and chooses the purpose of the verification. The platform identifies personal and sensitive fields, determines which information is necessary for the selected purpose, and conceals all unrelated data.

Before issuing the proof, the user can compare the original document with the protected version. The final proof contains only the approved result and does not reveal the hidden information.

A SHA-256 cryptographic digest is generated to help detect unauthorized changes to the proof. A dynamic watermark is also added and connected to the recipient, purpose, and validity period. Users can monitor their issued proofs and revoke active disclosures through a central registry.

## Project Objectives

The main objectives of Akked are:

- Applying the Minimum Necessary Disclosure principle to digital verification.
- Giving individuals greater control over their personal information.
- Reducing the circulation of complete identity documents.
- Preventing unnecessary personal data from being disclosed.
- Allowing organizations to verify a claim without accessing hidden information.
- Connecting every disclosure to a specific recipient, purpose, and validity period.
- Providing users with a clear record of active, expired, and revoked disclosures.
- Supporting immediate revocation of active proofs.
- Providing an accessible bilingual experience.
- Delivering a responsive interface suitable for mobile and desktop devices.

## How Akked Works

The secure sharing process consists of six main steps.

### Step 1: Document Upload

The user uploads a document from their device or selects one of the available demonstration templates.

The available templates may include:

- Saudi National ID.
- Salary certificate.
- Warranty invoice.

Documents are used to demonstrate how unnecessary personal information can be detected and concealed.

### Step 2: Recipient and Purpose Selection

The user identifies the organization requesting the proof and selects the specific verification purpose.

Possible purposes include:

- Eligibility verification.
- Salary-threshold verification.
- Warranty verification.

Connecting the proof to a specific purpose helps prevent it from being reused for a different request.

### Step 3: Data Minimization Analysis

The platform analyzes the document and identifies fields that may contain personally identifiable information.

The system separates the fields required for the selected purpose from the fields that are not necessary. Unnecessary fields are marked for protection before the proof is issued.

### Step 4: Before-and-After Review

The platform displays the original document and the protected version side by side.

This allows the user to confirm which information will be shared and which information will remain concealed.

The available protection methods include:

- Blackout.
- Blur.
- Pixelation.
- Tokenization.

The user can review the protected output before approving the disclosure.

### Step 5: Protection and Validity Settings

The user selects the period during which the proof will remain valid.

The available periods may range from five minutes to thirty days, depending on the selected verification scenario.

The platform also calculates a privacy score and adds a dynamic watermark connected to the intended recipient and purpose.

### Step 6: Proof Issuance

After the user approves the protected version, Akked issues a digital proof containing:

- The required verification result.
- A unique proof reference number.
- A QR code.
- A SHA-256 cryptographic digest.
- The recipient’s information.
- The verification purpose.
- The proof expiration time.

The proof does not display the concealed personal information.

## Main Features

### Dashboard

The dashboard provides a clear overview of the user’s privacy activity.

It includes:

- Number of active disclosures.
- Number of expired disclosures.
- Number of protected personal-information fields.
- Privacy Health Score.
- Recent activity timeline.
- Quick access to the secure sharing process.

### Secure Share Wizard

The Secure Share Wizard guides the user through the complete disclosure process.

Each step is presented separately to make the process easier to understand and reduce the possibility of accidental data exposure.

The wizard explains:

- What information is being requested.
- Why the organization needs it.
- What information will be shared.
- What information will remain protected.
- How long the proof will remain valid.

### Before-and-After Preview

The preview feature allows users to compare the original document with the protected version before approving the proof.

This step helps users ensure that no unnecessary personal information remains visible.

### Recipient Verification Portal

The Recipient Verification Portal allows organizations to verify issued proofs without accessing the concealed data.

The recipient can enter a proof reference, such as `DEMO-018`, or scan the QR code to view:

- Proof status.
- Verification result.
- Intended purpose.
- Expiration status.
- Cryptographic verification information.

### Shares Registry

The Shares Registry contains a searchable and filterable record of disclosures.

Each record may show:

- Recipient.
- Purpose.
- Creation date.
- Expiration date.
- Current status.
- Revocation option.

Proofs may appear as active, expired, or revoked. Active disclosures can be revoked directly from the registry.

### My Data Vault

My Data Vault provides an overview of personal-information categories detected during the demonstration.

It helps users understand which types of information have appeared in their previous disclosures.

The vault also includes a Zero-Trace Purge option that clears temporary data stored locally by the application.

### Trusted Entities

The Trusted Entities section provides a demonstration directory of organizations that follow relevant privacy and personal-data protection practices.

This section is intended to help users identify the recipient and understand the purpose of each request.

### Settings

The Settings page allows users to configure:

- Strict redaction mode.
- Watermark density.
- Interface language.
- Light or dark theme.
- Privacy preferences.
- Local data controls.

## Example Use Case

Suppose an online service needs to confirm that a user meets a particular eligibility condition.

Under the traditional approach, the user may be asked to upload a complete identity document. This document could reveal the user’s name, identification number, date of birth, photograph, address, and other information that is not required for the transaction.

Using Akked, the user selects the requesting organization and the exact purpose of the verification. The platform analyzes the document and conceals all information that is not necessary.

The final proof provides only an “Eligible” or “Not Eligible” result. The recipient can verify the proof and confirm its validity without viewing the user’s complete identity document.

## Technical Approach

Akked is implemented as a browser-based web application. The current demonstration performs its document presentation and processing locally on the user’s device.

The technical design includes the following components.

### Local Processing

Document processing is performed locally within the demonstration environment. This reduces the need to transmit source documents to external services.

### PII Detection

The platform identifies fields that may contain personally identifiable information, including:

- Full name.
- National identification number.
- Date of birth.
- Address.
- Contact information.
- Financial details.
- Document reference numbers.

### Data Minimization

The platform compares the information contained in the document with the selected verification purpose.

Only the information required for that purpose is preserved. All unrelated fields are concealed before the proof is issued.

### Redaction Methods

Akked supports several methods for protecting personal information:

- Blackout removes the visible content of a selected field.
- Blur makes the field unreadable.
- Pixelation hides the details using enlarged pixels.
- Tokenization replaces the original value with a non-sensitive representation.

### SHA-256 Cryptographic Digest

A SHA-256 digest is generated for the issued proof.

The digest helps detect whether the proof content has been modified after issuance. If the content changes, the generated digest will no longer match the original verification value.

### Dynamic Watermarking

A dynamic watermark is connected to:

- The intended recipient.
- The stated purpose.
- The date of issuance.
- The expiration period.

This makes it more difficult to reuse the protected output for an unrelated transaction.

### Independent Verification

The recipient can verify the proof using its unique reference number or QR code.

The verification process confirms the proof status and approved result without displaying the concealed personal information.

### Expiration and Revocation

Each proof has a defined validity period.

The proof automatically becomes invalid after its expiration time. The user may also revoke an active proof before it expires.

## Language and Layout Support

Akked supports Arabic and English throughout the application.

### Arabic Interface

The Arabic interface uses:

- Native right-to-left direction.
- Right-aligned text.
- Arabic navigation labels.
- Arabic buttons, forms, messages, and validation text.
- Arabic versions of visual and interactive content.

### English Interface

The English interface uses:

- Native left-to-right direction.
- Left-aligned text.
- English navigation labels.
- English buttons, forms, messages, and validation text.
- English versions of visual and interactive content.

When the language is changed, all visible content must change to the selected language. This includes:

- Navigation menus.
- Page headings.
- Paragraphs.
- Buttons.
- Forms.
- Input placeholders.
- Validation messages.
- Notifications.
- Labels.
- Interactive illustrations.
- Text displayed inside visual elements.
- Video titles and surrounding video content.

Directional icons, arrows, and chevrons are also adjusted to match the selected reading direction.

## Typography

The Arabic interface uses `IBM Plex Sans Arabic` as the primary font.

The Arabic fallback fonts are:

- `Noto Kufi Arabic`
- `Tajawal`
- `-apple-system`
- `sans-serif`

The English interface uses `Inter` as the primary font for user-interface elements, forms, buttons, tables, and body text.

The English fallback fonts are:

- `-apple-system`
- `BlinkMacSystemFont`
- `Segoe UI`
- `Roboto`
- `sans-serif`

`Cormorant Garamond` may be used for selected English display headings and academic titles. It is not used for buttons, form inputs, tables, captions, or long paragraphs.

Decorative and cursive fonts are not used for functional interface elements. The base text size is `15px` with a line height of `1.65`. Captions and secondary labels remain between `12.5px` and `13px` with sufficient font weight for readability.

## Accessibility

The interface was designed with WCAG 2.1 accessibility guidance in mind.

The accessibility considerations include:

- Strong contrast between text and backgrounds.
- Readable typography on desktop and mobile screens.
- Primary interactive touch targets with a minimum height of `44px`.
- Visible focus outlines for keyboard navigation.
- Correct document direction for Arabic and English.
- Mirrored directional icons when the interface direction changes.
- Clear labels for buttons and form fields.
- Responsive spacing across different screen sizes.
- Interface elements that remain usable without relying only on color.

The primary interface colors include:

- Deep purple: `#5A1854`
- Light application background: `#F8F9FD`
- Primary body text: `#1A1D2E`
- Secondary slate text: `#475569`
- Emerald protection and success states: `#0D825B`
- Dark-theme surface: `#181B26`
- Dark-theme text: `#F3F4F8`

## Responsive Design

Akked is designed to work on mobile phones, tablets, laptops, and desktop computers.

The responsive interface includes:

- Flexible layouts that adapt to different screen widths.
- Mobile-friendly buttons and form controls.
- Navigation suitable for small and large screens.
- Images and videos that remain within their containers.
- Readable content without horizontal scrolling.
- Stacked sections on mobile devices.
- Wider multi-column layouts on laptop and desktop screens.
- Consistent spacing and visual hierarchy across screen sizes.

## System Requirements

The demonstration version requires:

- A modern web browser.
- JavaScript enabled.
- Python 3 for running a local development server.

The current demonstration does not require a database or back-end server.

## Running the Project Locally

After downloading or cloning the repository, open a terminal and move to the project directory:

```bash
cd akked
