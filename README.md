# Akked (أكّد)

**Personal Data & Consent Guardian | حارس البيانات الشخصية والموافقات**

## Project Overview

Akked is a bilingual, privacy-focused web application developed as a graduation project. It enables individuals to prove a required fact without sharing an entire personal document or revealing information that is unrelated to the requested service.

The project is based on the principle of **Minimum Necessary Disclosure**. This means that the requesting organization receives only the specific verification result it needs, while unnecessary personal information remains protected.

For example, if an organization needs to confirm whether a user meets a particular eligibility condition, it receives only an “Eligible” or “Not Eligible” result. The user does not need to reveal their full name, national identification number, date of birth, address, photograph, or any other unrelated information.

Akked is a responsive web application that works on mobile phones, tablets, laptops, and desktop computers. It supports Arabic with a right-to-left interface and English with a left-to-right interface.

## The Problem

Many digital services request complete personal documents even when only one piece of information needs to be verified.

A user may be required to upload a full identity document to prove eligibility, salary range, or warranty status. This may expose information that is not required for the transaction.

This approach creates several privacy and security concerns:

- Unnecessary personal information may be disclosed.
- Complete copies of sensitive documents may be stored by several organizations.
- Users may not know which organization accessed their information.
- Users may not know how long their documents will remain available.
- Documents may be reused for purposes that were not originally approved.
- Users may have limited control over revoking an active disclosure.
- Sharing complete documents increases the possible impact of unauthorized access or data leakage.

## Proposed Solution

Akked provides a controlled process for creating a limited digital proof.

Each disclosure is connected to:

- The specific information that needs to be verified.
- The organization receiving the proof.
- The stated purpose of the request.
- The period during which the proof remains valid.

The user selects a document, identifies the requesting organization, and chooses the verification purpose. The platform identifies personal and sensitive fields, determines which information is necessary, and conceals all unrelated data.

Before issuing the proof, the user can compare the original document with the protected version. The final proof displays only the approved verification result.

A SHA-256 cryptographic digest is generated to help detect unauthorized changes. A dynamic watermark connects the protected output to the intended recipient, purpose, and validity period.

Users can monitor their issued proofs and revoke active disclosures through a central registry.

## Project Objectives

The objectives of Akked are:

- Apply the Minimum Necessary Disclosure principle to digital verification.
- Give individuals greater control over their personal information.
- Reduce unnecessary sharing of complete identity documents.
- Prevent unrelated personal information from being disclosed.
- Allow organizations to verify a claim without accessing concealed data.
- Connect each disclosure to a specific recipient and purpose.
- Limit each proof to a defined validity period.
- Record active, expired, and revoked disclosures.
- Allow users to revoke active proofs.
- Support Arabic and English throughout the application.
- Provide a responsive experience on mobile and desktop devices.
- Promote responsible personal-data sharing practices.

## Target Users

The primary users of Akked are individuals who need to prove a specific fact without sharing a complete personal document.

The secondary users are organizations that need to verify the requested result without accessing unrelated personal information.

## How Akked Works

The secure sharing process consists of six main steps.

### Step 1: Document Upload

The user uploads a document from their device or selects one of the available demonstration templates.

The templates include examples such as:

- Saudi National ID.
- Salary certificate.
- Warranty invoice.

### Step 2: Recipient and Purpose Selection

The user selects the requesting organization and identifies the exact purpose of the verification.

Supported demonstration purposes include:

- Eligibility verification.
- Salary-threshold verification.
- Warranty verification.

### Step 3: Data Minimization Analysis

The platform analyzes the document and identifies fields that may contain personally identifiable information.

It separates the information required for the selected purpose from unrelated personal data.

### Step 4: Before-and-After Review

The original document and protected version are displayed for comparison.

The user can review which information will be disclosed and which fields will remain concealed.

The available protection methods include:

- Blackout.
- Blur.
- Pixelation.
- Tokenization.

### Step 5: Protection and Validity Settings

The user selects the period during which the proof will remain valid.

The platform calculates a privacy score and adds a dynamic watermark connected to the intended recipient and purpose.

### Step 6: Proof Issuance

After approval, Akked issues a digital proof containing:

- The approved verification result.
- A unique proof reference number.
- A QR code.
- A SHA-256 cryptographic digest.
- The requesting organization.
- The verification purpose.
- The creation date.
- The expiration time.
- The current proof status.

The proof does not display the concealed personal information.

## Main Features

### Dashboard

The dashboard provides an overview of the user’s privacy activity, including:

- Active disclosures.
- Expired disclosures.
- Protected personal-information fields.
- Privacy Health Score.
- Recent activity.
- Quick access to the secure sharing process.

### Secure Share Wizard

The Secure Share Wizard guides the user through the complete disclosure process.

Each stage explains:

- What information is being requested.
- Which organization is requesting it.
- Why the information is required.
- What information will be shared.
- What information will remain protected.
- How long the proof will remain valid.

### Before-and-After Preview

The preview allows the user to compare the complete document with the protected version before approving the disclosure.

This helps prevent accidental exposure of unnecessary information.

### Recipient Verification Portal

The Recipient Verification Portal allows an organization to verify an issued proof without viewing concealed information.

The recipient can enter a proof reference, such as `DEMO-018`, or use the QR code to view:

- Proof status.
- Verification result.
- Verification purpose.
- Expiration status.
- Cryptographic verification information.

### Shares Registry

The Shares Registry provides a searchable and filterable record of disclosures.

Proofs may be displayed as:

- Active.
- Expired.
- Revoked.

The user can revoke an active disclosure directly from the registry.

### My Data Vault

My Data Vault provides an overview of the personal-information categories detected during the demonstration.

It also provides an option to clear temporary information stored locally by the application.

### Trusted Entities

The Trusted Entities section provides a demonstration directory of organizations that follow relevant privacy and personal-data protection practices.

### Settings

The Settings page allows the user to configure:

- Strict redaction mode.
- Watermark density.
- Interface language.
- Light or dark theme.
- Privacy preferences.
- Local data controls.

## Example Use Case

Suppose an online service needs to confirm that a user meets a particular eligibility condition.

Under the traditional approach, the user may be asked to upload a complete identity document. This document may reveal the user’s name, identification number, date of birth, photograph, address, and other unnecessary information.

Using Akked, the user selects the requesting organization and verification purpose. The platform analyzes the document and conceals all information that is not required.

The final proof provides only an “Eligible” or “Not Eligible” result. The recipient can verify the result and its validity without accessing the complete identity document.

## Technical Approach

Akked is implemented as a browser-based web application.

The prototype demonstrates the following technical concepts:

### Local Processing

Document presentation and processing are performed locally within the demonstration environment. This reduces the need to send the original document to external services.

### Personal Data Detection

The platform identifies fields that may contain personally identifiable information, including:

- Full name.
- National identification number.
- Date of birth.
- Address.
- Contact information.
- Financial information.
- Document reference numbers.

### Data Minimization

The platform compares the information contained in the document with the selected verification purpose.

Only the necessary information is preserved. All unrelated fields are concealed before the proof is issued.

### Redaction Methods

Akked demonstrates different methods for protecting personal information:

- Blackout hides the complete value of a field.
- Blur makes the original information unreadable.
- Pixelation conceals the information using enlarged pixels.
- Tokenization replaces the original value with a non-sensitive representation.

### SHA-256 Cryptographic Digest

The platform demonstrates the use of SHA-256 to generate a cryptographic digest for an issued proof.

The digest helps identify whether the proof content has been modified after issuance.

### Dynamic Watermarking

A dynamic watermark connects the protected output to:

- The intended recipient.
- The verification purpose.
- The date of issuance.
- The expiration period.

### Independent Verification

The recipient can verify a proof through its unique reference number or QR code without accessing the concealed personal information.

### Expiration and Revocation

Each proof has a defined validity period. It becomes invalid after expiration, and the user can revoke an active proof before it expires.

## Development Technologies

The Akked prototype was developed using:

- HTML5 for structuring the website pages and content.
- CSS3 for styling, responsive layouts, themes, visual components, and Arabic RTL support.
- JavaScript for interactions, navigation, language switching, forms, document previews, and demonstration workflows.
- SHA-256 for demonstrating tamper-evident cryptographic digests.
- Python 3 HTTP Server for running and testing the project locally.
- Git for version control.
- GitHub for repository hosting, documentation, and project sharing.

## Development and AI-Assisted Tools

### Antigravity

Antigravity was the primary development environment used to build, test, revise, and organize the Akked website.

It was used to:

- Build the application pages.
- Develop the website interface.
- Implement the Arabic and English versions.
- Improve responsive behavior.
- Add and update visual content.
- Test the application.
- Organize the project files.

### ChatGPT

ChatGPT was used to support:

- Brainstorming.
- Refining the project idea.
- Improving written content.
- Structuring project documentation.
- Reviewing requirements.
- Preparing technical explanations.
- Developing and refining prompts.

### Google Gemini

Google Gemini was used to support:

- Website development.
- Code generation and refinement.
- Interface improvements.
- Bilingual content implementation.
- Responsive-design improvements.
- Troubleshooting.

### NotebookLM

NotebookLM was used to:

- Organize project information.
- Summarize the project concept.
- Structure the explanatory content.
- Produce the project’s explanatory video.

### Manus

Manus was used to:

- Prepare the project document.
- Organize the project information.
- Structure the project report.
- Present the project requirements clearly.

### Vercel

Vercel was used to deploy and display the Akked website online.

It provides access to the demonstration version through a web browser without requiring the project to be run locally.

### GitHub

GitHub was used to:

- Host the project source code.
- Maintain the project repository.
- Store the README and supporting documentation.
- Share the project with reviewers.
- Provide a public reference for the final submission.

These tools supported the planning, development, documentation, and presentation of the project. The project idea, requirements, design decisions, review process, and final implementation were completed and validated by the project team.

## Language Support

Akked supports Arabic and English throughout the application.

The Arabic interface uses:

- Right-to-left direction.
- Right-aligned content.
- Arabic navigation.
- Arabic buttons and forms.
- Arabic labels and messages.
- Arabic visual content.

The English interface uses:

- Left-to-right direction.
- Left-aligned content.
- English navigation.
- English buttons and forms.
- English labels and messages.
- English visual content.

Changing the selected language updates:

- Navigation items.
- Page headings.
- Paragraphs.
- Buttons.
- Forms.
- Input placeholders.
- Validation messages.
- Notifications.
- Labels.
- Interactive illustrations.
- Video-related text.
- Directional icons.

## Accessibility

The interface was designed with accessibility guidance in mind.

The accessibility considerations include:

- Clear contrast between text and backgrounds.
- Readable typography.
- Mobile-friendly interactive controls.
- Visible focus states for keyboard navigation.
- Correct page direction for Arabic and English.
- Mirrored directional icons when the language changes.
- Clear labels for buttons and form fields.
- Responsive spacing on different screen sizes.

## Responsive Design

Akked is designed to work on:

- Mobile phones.
- Tablets.
- Laptops.
- Desktop computers.

The responsive interface includes:

- Flexible page layouts.
- Mobile-friendly buttons and form controls.
- Navigation suitable for small and large screens.
- Images and videos that remain inside their containers.
- Readable content without horizontal scrolling.
- Stacked content on smaller screens.
- Wider layouts on laptop and desktop screens.

## System Requirements

The local demonstration requires:

- A modern web browser.
- JavaScript enabled.
- Python 3 for running a local development server.

The current demonstration does not require a database or production back-end server.

## Running the Project Locally

Open a terminal and move to the project directory:

```bash
cd akked
```

Start the local server:

```bash
python3 -m http.server 8000
```

Open the following address in a browser:

```text
http://localhost:8000
```

## How to Use the Application

1. Open the Akked website.
2. Select Arabic or English.
3. Sign in or create a demonstration account.
4. Open the dashboard.
5. Start a new secure disclosure request.
6. Upload a document or select an available template.
7. Select the requesting organization.
8. Choose the verification purpose.
9. Review the fields detected by the platform.
10. Compare the original document with the protected version.
11. Confirm that unnecessary information is concealed.
12. Select the proof validity period.
13. Review the watermark and privacy score.
14. Approve and issue the proof.
15. Share the proof reference or QR code with the intended recipient.
16. Monitor the proof through the Shares Registry.
17. Revoke the proof when necessary.

## Project Documentation

The project repository includes documentation covering:

- The project idea and objectives.
- The problem and proposed solution.
- Target users.
- Main use cases.
- Minimum Viable Product scope.
- Data-minimization workflow.
- Privacy and security concepts.
- Proof issuance and verification.
- Language support.
- Responsive design.
- Technologies and tools.
- Prototype limitations.

## Current Prototype Limitations

Akked is an educational prototype developed to demonstrate the proposed concept and user experience.

It is not a production system approved for processing official documents. All templates, organizations, user information, and proof references shown in the application are intended for demonstration purposes.

A production implementation would require:

- Integration with authorized identity providers.
- Approved connections with participating organizations.
- Secure back-end infrastructure.
- Protected database storage.
- Secure cryptographic-key management.
- Authentication and authorization controls.
- Detailed audit logging.
- Security and penetration testing.
- Legal and regulatory review.
- Operational monitoring.
- Formal compliance assessment.

## Privacy and Security Notice

The prototype demonstrates privacy-enhancing concepts but should not be used to process real sensitive documents.

Only fictional or demonstration data should be used when testing the application.

The SHA-256 digest, QR code, redaction methods, and dynamic watermarks demonstrate the intended technical architecture. These features do not independently make the prototype suitable for production use.

## Training Program

This project was completed as part of the **Generative Programming (البرمجة التوليدية)** training program.

## SDAIA Academy

SDAIA Academy GitHub account:

[SDAIA Academy](https://github.com/SDAIAAcademy)

## Team Members

- البندري ال الحارث
- اثير الفرحان
- غيداء الشمري
- ساره الاسود
- لين الملاقي
- لمار المطيري
