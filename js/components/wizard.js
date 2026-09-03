/**
 * Akked 6-Step Secure Share Creation Wizard Component
 */

window.AkkedWizard = {
  currentStep: 1,
  selectedDocId: 'national_id',
  selectedRecipientId: 'recipient_store',
  selectedPurposeId: 'purpose_age',
  selectedDuration: '1_hour',
  redactionStyle: 'blackout',
  customAllowedFields: ['age_calc'],
  comparisonSliderPos: 50, // %

  init() {
    this.currentStep = 1;
    this.selectedDocId = 'national_id';
    this.selectedRecipientId = 'recipient_store';
    this.selectedPurposeId = 'purpose_age';
    this.selectedDuration = '1_hour';
    this.customAllowedFields = ['age_calc'];
    this.comparisonSliderPos = 50;
  },

  render() {
    const isAr = I18N.currentLang === 'ar';
    const steps = [
      { num: 1, label: I18N.t('step1') },
      { num: 2, label: I18N.t('step2') },
      { num: 3, label: I18N.t('step3') },
      { num: 4, label: I18N.t('step4') },
      { num: 5, label: I18N.t('step5') },
      { num: 6, label: I18N.t('step6') }
    ];

    return `
      <div class="wizard-view animate-fade-in" style="max-width: 960px; margin: 0 auto;">
        <!-- Header -->
        <div style="text-align: center; margin-bottom: 28px;">
          <h1 style="font-size: 1.7rem; font-weight: 900; color: var(--brand-primary);">${I18N.t('wizardTitle')}</h1>
          <p style="font-size: 0.92rem; color: var(--text-muted); margin-top: 4px;">${I18N.t('wizardSubtitle')}</p>
        </div>

        <!-- 6 Step Progress Stepper -->
        <div class="wizard-stepper">
          ${steps.map(s => `
            <div class="wizard-step-item ${this.currentStep === s.num ? 'active' : (this.currentStep > s.num ? 'completed' : '')}" onclick="AkkedWizard.goToStep(${s.num})">
              <div class="step-circle">
                ${this.currentStep > s.num ? AkkedIcons.get('check', { size: 14, strokeWidth: 3 }) : s.num}
              </div>
              <span class="step-label">${s.label}</span>
            </div>
          `).join('')}
        </div>

        <!-- Step Content Box -->
        <div class="card" style="padding: 32px; box-shadow: var(--shadow-lg); border-radius: var(--radius-xl);">
          ${this.renderStepContent()}
        </div>
      </div>
    `;
  },

  renderStepContent() {
    switch (this.currentStep) {
      case 1: return this.renderStep1();
      case 2: return this.renderStep2();
      case 3: return this.renderStep3();
      case 4: return this.renderStep4();
      case 5: return this.renderStep5();
      case 6: return this.renderStep6();
      default: return this.renderStep1();
    }
  },

  // Step 1: Document Upload / Sample Template Selection
  renderStep1() {
    const isAr = I18N.currentLang === 'ar';
    return `
      <div class="step-pane animate-fade-in">
        <h2 style="font-size: 1.25rem; font-weight: 800; color: var(--text-main); margin-bottom: 8px;">
          1. ${I18N.t('step1')}: ${isAr ? 'رفع الوثيقة أو اختيار نموذج' : 'Upload or Select Template'}
        </h2>
        <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 24px;">
          ${I18N.t('uploadBoxHint')}
        </p>

        <!-- Dropzone -->
        <div class="dropzone" onclick="document.getElementById('file-upload-input').click()">
          <input type="file" id="file-upload-input" style="display: none;" accept="image/*,.pdf" onchange="AkkedWizard.handleFileUpload(this)">
          <div class="dropzone-icon" style="color: var(--brand-slate);">${AkkedIcons.get('upload-cloud', { size: 40, strokeWidth: 1.8 })}</div>
          <div style="font-size: 1.1rem; font-weight: 700; color: var(--brand-slate);">${I18N.t('uploadBoxTitle')}</div>
          <div style="font-size: 0.82rem; color: var(--text-subtle);">PNG, JPG, PDF (Max 15MB)</div>
        </div>

        <div style="margin: 28px 0 16px; font-size: 0.95rem; font-weight: 700; color: var(--text-main);">
          ${I18N.t('orChooseSample')}
        </div>

        <!-- Sample Docs Grid -->
        <div class="sample-docs-grid">
          ${AkkedSampleDocs.map(doc => `
            <div class="sample-doc-card ${this.selectedDocId === doc.id ? 'selected' : ''}" onclick="AkkedWizard.selectDoc('${doc.id}')">
              <div class="sample-doc-thumb">
                <span class="sample-doc-type-badge">${isAr ? doc.nameAr : doc.nameEn}</span>
                <span style="color: var(--brand-slate);">${AkkedIcons.get(doc.id === 'national_id' ? 'id-card' : (doc.id === 'salary_cert' ? 'file-text' : 'receipt'), { size: 36, strokeWidth: 1.8 })}</span>
              </div>
              <div style="font-weight: 700; font-size: 0.9rem; color: var(--text-main);">${isAr ? doc.nameAr : doc.nameEn}</div>
              <div style="font-size: 0.78rem; color: var(--text-muted);">${doc.fields.length} ${isAr ? 'حقول مستخرجة' : 'fields extracted'}</div>
            </div>
          `).join('')}
        </div>

        <!-- Footer Navigation -->
        <div style="display: flex; justify-content: flex-end; margin-top: 32px;">
          <button class="btn btn-primary btn-lg" onclick="AkkedWizard.nextStep()">
            <span>${isAr ? 'متابعة لاختيار الجهة والغرض' : 'Continue to Recipient & Purpose'}</span>
            <span>${isAr ? '←' : '→'}</span>
          </button>
        </div>
      </div>
    `;
  },

  // Step 2: Recipient & Purpose Selection
  renderStep2() {
    const isAr = I18N.currentLang === 'ar';
    const purposes = [
      { id: 'purpose_age', nameAr: 'التحقق من الأهلية العمرية (فوق 18 عاماً)', nameEn: 'Age Eligibility Verification (18+ Only)', icon: AkkedIcons.get('user-check', { size: 20 }), docReq: 'national_id', defaultRecipient: 'recipient_store' },
      { id: 'purpose_salary', nameAr: 'التحقق من الحد الأدنى للراتب وملاءمة الإيجار', nameEn: 'Income Threshold & Lease Suitability', icon: AkkedIcons.get('credit-card', { size: 20 }), docReq: 'salary_cert', defaultRecipient: 'recipient_aqar' },
      { id: 'purpose_warranty', nameAr: 'التحقق من سريان الضمان والرقم التسلسلي', nameEn: 'Warranty Validity & Serial Check', icon: AkkedIcons.get('shield-check', { size: 20 }), docReq: 'warranty_receipt', defaultRecipient: 'recipient_service_center' }
    ];

    return `
      <div class="step-pane animate-fade-in">
        <h2 style="font-size: 1.25rem; font-weight: 800; color: var(--text-main); margin-bottom: 8px;">
          2. ${I18N.t('step2')}: ${I18N.t('selectRecipientTitle')}
        </h2>
        <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 24px;">
          ${isAr ? 'حدد الغرض المصرح به لإصدار الإثبات المطلوب بدقة.' : 'Specify the authorized purpose for issuing the required proof.'}
        </p>

        <!-- Purpose Selection -->
        <div style="font-weight: 700; font-size: 0.95rem; color: var(--text-main); margin-bottom: 12px;">
          ${I18N.t('selectPurposeTitle')}
        </div>
        <div class="selection-list" style="margin-bottom: 28px;">
          ${purposes.map(p => `
            <div class="selection-card ${this.selectedPurposeId === p.id ? 'selected' : ''}" onclick="AkkedWizard.selectPurpose('${p.id}', '${p.docReq}', '${p.defaultRecipient}')">
              <div class="selection-info">
                <div class="selection-icon">${p.icon}</div>
                <div>
                  <div style="font-weight: 700; color: var(--text-main); font-size: 0.95rem;">${isAr ? p.nameAr : p.nameEn}</div>
                  <div style="font-size: 0.8rem; color: var(--text-muted);">${isAr ? 'يتطلب إثبات الحد الأدنى فقط' : 'Requires minimal claim disclosure only'}</div>
                </div>
              </div>
              <input type="radio" name="purposeRadio" ${this.selectedPurposeId === p.id ? 'checked' : ''}>
            </div>
          `).join('')}
        </div>

        <!-- Recipient Selection -->
        <div style="font-weight: 700; font-size: 0.95rem; color: var(--text-main); margin-bottom: 12px; display: inline-flex; align-items: center; gap: 8px;">
          <picture style="display: inline-flex; line-height: 0;">
            <source srcset="assets/building-org-slate.webp" type="image/webp">
            <img src="assets/building-org-slate.png" 
                 alt="${isAr ? 'الجهة الطالبة' : 'Requesting Organization'}" 
                 title="${isAr ? 'الجهة الطالبة' : 'Requesting Organization'}" 
                 aria-label="${isAr ? 'الجهة الطالبة' : 'Requesting Organization'}" 
                 width="18" 
                 height="18" 
                 style="width: 18px; height: 18px; object-fit: contain; vertical-align: middle; display: inline-block;">
          </picture>
          <span>${isAr ? 'الجهة الطالبة' : 'Requesting Organization'}</span>
        </div>
        <div class="selection-list">
          ${AkkedState.entities.map(ent => `
            <div class="selection-card ${this.selectedRecipientId === ent.id ? 'selected' : ''}" onclick="AkkedWizard.selectRecipient('${ent.id}')">
              <div class="selection-info">
                <div class="selection-icon" style="display: flex; align-items: center; justify-content: center;">
                  <picture style="display: inline-flex; line-height: 0;">
                    <source srcset="assets/building-org-slate.webp" type="image/webp">
                    <img src="assets/building-org-slate.png" 
                         alt="${isAr ? 'الجهة الطالبة' : 'Requesting Organization'}" 
                         title="${isAr ? 'الجهة الطالبة' : 'Requesting Organization'}" 
                         aria-label="${isAr ? 'الجهة الطالبة' : 'Requesting Organization'}" 
                         width="22" 
                         height="22" 
                         style="width: 22px; height: 22px; object-fit: contain;">
                  </picture>
                </div>
                <div>
                  <div style="font-weight: 700; color: var(--text-main); font-size: 0.95rem;">${isAr ? ent.nameAr : ent.nameEn}</div>
                  <div style="font-size: 0.8rem; color: var(--brand-accent); font-weight: 600; display: inline-flex; align-items: center; gap: 4px;">
                    ${AkkedIcons.get('shield-check', { size: 12 })}
                    <span>${isAr ? 'تقييم الالتزام:' : 'Compliance:'} ${ent.trustScore}%</span>
                  </div>
                </div>
              </div>
              <input type="radio" name="recipientRadio" ${this.selectedRecipientId === ent.id ? 'checked' : ''}>
            </div>
          `).join('')}
        </div>

        <!-- Footer Navigation -->
        <div style="display: flex; justify-content: space-between; margin-top: 32px;">
          <button class="btn btn-secondary" onclick="AkkedWizard.prevStep()">
            <span>${isAr ? '→' : '←'}</span>
            <span>${isAr ? 'السابق' : 'Back'}</span>
          </button>
          <button class="btn btn-primary btn-lg" onclick="AkkedWizard.nextStep()">
            <span>${isAr ? 'متابعة تقليص البيانات' : 'Continue to Minimization'}</span>
            <span>${isAr ? '←' : '→'}</span>
          </button>
        </div>
      </div>
    `;
  },

  // Step 3: Data Minimization & Selective Disclosure
  renderStep3() {
    const isAr = I18N.currentLang === 'ar';
    const doc = AkkedSampleDocs.find(d => d.id === this.selectedDocId) || AkkedSampleDocs[0];
    const rec = AkkedRedactionEngine.getRecommendation(this.selectedPurposeId, this.selectedDocId);
    const score = AkkedRedactionEngine.calculatePrivacyScore(doc, this.customAllowedFields);

    return `
      <div class="step-pane animate-fade-in">
        <h2 style="font-size: 1.25rem; font-weight: 800; color: var(--brand-slate); margin-bottom: 8px;">
          3. ${I18N.t('step3')}: ${I18N.t('aiAnalysisTitle')}
        </h2>
        <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 24px;">
          ${I18N.t('aiAnalysisDesc')}
        </p>

        <!-- Minimization Recommendation Callout -->
        <div style="background-color: var(--brand-surface-subtle); border: 1.5px solid var(--brand-accent-border); border-radius: var(--radius-lg); padding: 20px; margin-bottom: 24px;">
          <div style="display: flex; align-items: flex-start; gap: 14px;">
            <div style="color: var(--brand-accent); flex-shrink: 0; padding-top: 2px;">
              ${AkkedIcons.get('shield-check', { size: 28, strokeWidth: 2 })}
            </div>
            <div>
              <div style="font-weight: 800; color: var(--brand-slate); font-size: 1.05rem; margin-bottom: 4px;">
                ${isAr ? 'توصية تقليص البيانات المصرح بها:' : 'Selective Disclosure Recommendation:'}
              </div>
              <div style="font-size: 0.9rem; color: var(--text-main); font-weight: 600; margin-bottom: 6px;">
                ${isAr ? rec.claimAr : rec.claimEn}
              </div>
              <div style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.4; display: flex; align-items: center; gap: 6px;">
                ${AkkedIcons.get('info', { size: 14 })}
                <span>${isAr ? rec.rationalAr : rec.rationalEn}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Data Disclosure & Minimization Status Row -->
        <div style="margin-bottom: 14px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;">
          <div style="display: inline-flex; align-items: center; gap: 8px;">
            <picture style="display: inline-flex; line-height: 0;">
              <source srcset="assets/eye-disclosed-slate.webp" type="image/webp">
              <img src="assets/eye-disclosed-slate.png" 
                   alt="${isAr ? 'البيانات المكشوفة' : 'Disclosed Data'}" 
                   title="${isAr ? 'البيانات المكشوفة' : 'Disclosed Data'}" 
                   aria-label="${isAr ? 'البيانات المكشوفة' : 'Disclosed Data'}" 
                   width="18" 
                   height="18" 
                   style="width: 18px; height: 18px; object-fit: contain; vertical-align: middle; display: inline-block;">
            </picture>
            <span style="font-weight: 800; font-size: 0.98rem; color: var(--brand-slate);">${isAr ? 'البيانات المكشوفة فقط' : 'Disclosed Data Only'}</span>
            <span style="font-size: 0.82rem; color: var(--text-muted);">(${doc.fields.length} ${isAr ? 'حقول تم فحصها' : 'fields scanned'})</span>
          </div>

          <!-- Hidden Data Section Indicator -->
          <div style="display: inline-flex; align-items: center; gap: 8px;">
            <picture style="display: inline-flex; line-height: 0;">
              <source srcset="assets/eye-hidden-purple.webp" type="image/webp">
              <img src="assets/eye-hidden-purple.png" 
                   alt="${isAr ? 'البيانات المخفية' : 'Hidden Data'}" 
                   title="${isAr ? 'البيانات المخفية' : 'Hidden Data'}" 
                   aria-label="${isAr ? 'البيانات المخفية' : 'Hidden Data'}" 
                   width="18" 
                   height="18" 
                   style="width: 18px; height: 18px; object-fit: contain; vertical-align: middle; display: inline-block;">
            </picture>
            <span style="font-weight: 800; font-size: 0.98rem; color: var(--brand-primary);">${isAr ? 'البيانات المخفية' : 'Hidden Data'}</span>
            <span style="font-size: 0.82rem; color: var(--status-active); font-weight: 700;">(${doc.fields.length - this.customAllowedFields.length} ${isAr ? 'محجوبة' : 'shielded'})</span>
          </div>
        </div>

        <div class="fields-checklist">
          ${doc.fields.map(f => {
            const isAllowed = this.customAllowedFields.includes(f.id);
            return `
              <div class="field-item-row ${isAllowed ? 'exposed' : 'shielded'}">
                <div class="field-item-meta">
                  <span style="display: flex; align-items: center;">
                    ${isAllowed ? `
                      <picture style="display: inline-flex; line-height: 0;">
                        <source srcset="assets/eye-disclosed-slate.webp" type="image/webp">
                        <img src="assets/eye-disclosed-slate.png" 
                             alt="${isAr ? 'البيانات المكشوفة' : 'Disclosed Data'}" 
                             title="${isAr ? 'البيانات المكشوفة' : 'Disclosed Data'}" 
                             aria-label="${isAr ? 'البيانات المكشوفة' : 'Disclosed Data'}" 
                             width="20" 
                             height="20" 
                             style="width: 20px; height: 20px; object-fit: contain; vertical-align: middle; display: inline-block;">
                      </picture>
                    ` : `
                      <div style="width: 26px; height: 26px; border-radius: var(--radius-sm); background-color: var(--brand-primary-light); display: inline-flex; align-items: center; justify-content: center;">
                        <picture style="display: inline-flex; line-height: 0;">
                          <source srcset="assets/eye-hidden-purple.webp" type="image/webp">
                          <img src="assets/eye-hidden-purple.png" 
                               alt="${isAr ? 'البيانات المخفية' : 'Hidden Data'}" 
                               title="${isAr ? 'البيانات المخفية' : 'Hidden Data'}" 
                               aria-label="${isAr ? 'البيانات المخفية' : 'Hidden Data'}" 
                               width="18" 
                               height="18" 
                               style="width: 18px; height: 18px; object-fit: contain; vertical-align: middle; display: inline-block;">
                        </picture>
                      </div>
                    `}
                  </span>
                  <div>
                    <div style="font-weight: 700; color: var(--text-main); font-size: 0.9rem;">
                      ${isAr ? f.nameAr : f.nameEn}
                    </div>
                    <div style="font-size: 0.78rem; color: var(--text-muted);">
                      ${isAllowed ? (isAr ? 'سيتم كشف هذا الحقل فقط للجهة' : 'This claim only will be shared') : (isAr ? 'البيانات المخفية: محجوب تماماً لمنع الانكشاف' : 'Hidden Data: Completely shielded')}
                    </div>
                  </div>
                </div>

                <div>
                  <span class="field-status-chip ${isAllowed ? 'chip-shared' : 'chip-hidden'}">
                    ${isAllowed ? I18N.t('fieldStatusNecessary') : I18N.t('fieldStatusShielded')}
                  </span>
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <!-- Footer Navigation -->
        <div style="display: flex; justify-content: space-between; margin-top: 32px;">
          <button class="btn btn-secondary" onclick="AkkedWizard.prevStep()">
            <span>${isAr ? '→' : '←'}</span>
            <span>${isAr ? 'السابق' : 'Back'}</span>
          </button>
          <button class="btn btn-primary btn-lg" onclick="AkkedWizard.nextStep()">
            <span>${isAr ? 'معاينة المقارنة التفاعلية' : 'Interactive Before/After Preview'}</span>
            <span>${isAr ? '←' : '→'}</span>
          </button>
        </div>
      </div>
    `;
  },

  // Step 4: Interactive Before/After Split Comparison
  renderStep4() {
    const isAr = I18N.currentLang === 'ar';
    const doc = AkkedSampleDocs.find(d => d.id === this.selectedDocId) || AkkedSampleDocs[0];
    const rec = AkkedRedactionEngine.getRecommendation(this.selectedPurposeId, this.selectedDocId);
    const recipient = AkkedState.entities.find(e => e.id === this.selectedRecipientId) || AkkedState.entities[0];
    const watermark = `${isAr ? 'صادر حصرياً لـ:' : 'Issued Exclusively For:'} ${isAr ? recipient.nameAr : recipient.nameEn}`;

    const originalSvg = doc.renderSVG(false, [], '');
    const protectedSvg = doc.renderSVG(true, this.customAllowedFields, watermark);

    return `
      <div class="step-pane animate-fade-in">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-bottom: 8px;">
          <h2 style="font-size: 1.25rem; font-weight: 800; color: var(--text-main);">
            4. ${I18N.t('step4')}: ${I18N.t('beforeAfterTitle')}
          </h2>
          <!-- Mask style selector -->
          <div style="display: flex; align-items: center; gap: 8px; font-size: 0.85rem;">
            <span>${I18N.t('redactionTypeSelect')}</span>
            <select class="btn btn-secondary btn-sm" onchange="AkkedWizard.setRedactionStyle(this.value)">
              <option value="blackout">${I18N.t('redactionModeBlackout')}</option>
              <option value="blur">${I18N.t('redactionModeBlur')}</option>
              <option value="pixelate">${I18N.t('redactionModePixelate')}</option>
              <option value="tokenize">${I18N.t('redactionModeTokenize')}</option>
            </select>
          </div>
        </div>
        <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 20px;">
          ${I18N.t('beforeAfterDesc')}
        </p>

        <!-- Side-by-side or Split Interactive Comparison Viewer -->
        <div class="grid-container grid-cols-2" style="margin-bottom: 24px;">
          <!-- Original Document Card -->
          <div class="card" style="padding: 16px; border: 2px solid #EF4444; background: #FFF5F5;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
              <span class="badge" style="background: #EF4444; color: #FFF; display: inline-flex; align-items: center; gap: 6px;">
                ${AkkedIcons.get('alert-triangle', { size: 14 })}
                <span>${I18N.t('labelOriginal')}</span>
              </span>
              <span style="font-size: 0.78rem; color: #991B1B; font-weight: 700;">${isAr ? 'انكشاف لكافة البيانات' : 'Full Exposure'}</span>
            </div>
            <div style="height: 280px; overflow: hidden; border-radius: var(--radius-sm);">
              ${originalSvg}
            </div>
          </div>

          <!-- Protected Reduced Document Card -->
          <div class="card" style="padding: 16px; border: 2px solid #50BE9B; background: #F0FDF4;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
              <span class="badge" style="background: #50BE9B; color: #FFF; display: inline-flex; align-items: center; gap: 6px;">
                ${AkkedIcons.get('shield-check', { size: 14 })}
                <span>${I18N.t('labelProtected')}</span>
              </span>
              <span style="font-size: 0.78rem; color: #065F46; font-weight: 700; display: inline-flex; align-items: center; gap: 4px;">
                ${AkkedIcons.get('lock', { size: 13 })}
                <span>${isAr ? 'تقليص للحد الأدنى المطلوب' : 'Minimized & Watermarked'}</span>
              </span>
            </div>
            <div style="height: 280px; overflow: hidden; border-radius: var(--radius-sm);">
              ${protectedSvg}
            </div>
          </div>
        </div>

        <!-- Footer Navigation -->
        <div style="display: flex; justify-content: space-between; margin-top: 32px;">
          <button class="btn btn-secondary" onclick="AkkedWizard.prevStep()">
            <span>${isAr ? '→' : '←'}</span>
            <span>${isAr ? 'السابق' : 'Back'}</span>
          </button>
          <button class="btn btn-primary btn-lg" onclick="AkkedWizard.nextStep()">
            <span>${isAr ? 'ضبط مدة الصلاحية والعلامة المائية' : 'Configure Expiry & Watermark'}</span>
            <span>${isAr ? '←' : '→'}</span>
          </button>
        </div>
      </div>
    `;
  },

  // Step 5: Safety Check & Watermark Configuration
  renderStep5() {
    const isAr = I18N.currentLang === 'ar';
    const doc = AkkedSampleDocs.find(d => d.id === this.selectedDocId) || AkkedSampleDocs[0];
    const score = AkkedRedactionEngine.calculatePrivacyScore(doc, this.customAllowedFields);
    const recipient = AkkedState.entities.find(e => e.id === this.selectedRecipientId) || AkkedState.entities[0];

    return `
      <div class="step-pane animate-fade-in">
        <h2 style="font-size: 1.25rem; font-weight: 800; color: var(--brand-primary); margin-bottom: 8px;">
          5. ${I18N.t('step5')}: ${I18N.t('safetyTitle')}
        </h2>
        <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 24px;">
          ${isAr ? 'فحص نهائي للأمان وتحديد فترة الصلاحية الذاتية الإلغاء.' : 'Final privacy audit and auto-expiration timeframe selection.'}
        </p>

        <!-- Privacy Gauge Box -->
        <div class="card" style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 20px; background-color: var(--brand-surface-subtle); margin-bottom: 28px;">
          <div style="display: flex; align-items: center; gap: 20px;">
            <div class="gauge-svg-wrap" style="width: 100px; height: 100px;">
              <svg width="100" height="100" viewBox="0 0 140 140">
                <circle class="gauge-bg" cx="70" cy="70" r="58" stroke-width="14" fill="none" />
                <circle class="gauge-progress" cx="70" cy="70" r="58" stroke-width="14" fill="none" 
                  stroke-dasharray="364.4" stroke-dashoffset="18.2" />
              </svg>
              <div class="gauge-value-text" style="font-size: 1.4rem;">${score}%</div>
            </div>
            <div>
              <div style="font-size: 1.1rem; font-weight: 800; color: var(--brand-primary);">${I18N.t('privacyScoreLabel')}</div>
              <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 4px;">${I18N.t('privacyScoreDesc')}</div>
            </div>
          </div>
          <span class="badge badge-active">
            ${AkkedIcons.get('check-circle', { size: 14 })} ${isAr ? 'اجتاز فحص الأمان بنجاح' : 'Passed Privacy Audit'}
          </span>
        </div>

        <!-- Duration Selection -->
        <div style="font-weight: 700; font-size: 0.95rem; color: var(--text-main); margin-bottom: 12px;">
          ${I18N.t('selectDurationTitle')}
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 12px; margin-bottom: 28px;">
          ${[
            { id: '5_min', label: I18N.t('duration5Min') },
            { id: '1_hour', label: I18N.t('duration1Hour') },
            { id: '24_hours', label: I18N.t('duration24Hours') },
            { id: '7_days', label: I18N.t('duration7Days') },
            { id: '30_days', label: I18N.t('duration30Days') }
          ].map(d => `
            <div class="selection-card ${this.selectedDuration === d.id ? 'selected' : ''}" style="padding: 12px 14px; text-align: center; justify-content: center;" onclick="AkkedWizard.selectDuration('${d.id}')">
              <span style="font-size: 0.88rem; font-weight: 700; color: var(--text-main);">${d.label}</span>
            </div>
          `).join('')}
        </div>

        <!-- Watermark Lock Notice -->
        <div style="background-color: var(--brand-surface-tint); border-radius: var(--radius-md); padding: 16px; border: 1px dashed var(--brand-slate-border);">
          <div style="font-weight: 700; color: var(--brand-primary); margin-bottom: 4px; display: flex; align-items: center; gap: 6px;">
            ${AkkedIcons.get('lock', { size: 16 })}
            <span>${I18N.t('watermarkOptionsTitle')}</span>
          </div>
          <p style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.4;">
            ${I18N.t('watermarkNotice')}
          </p>
          <div style="font-family: monospace; font-size: 0.85rem; font-weight: 700; color: var(--brand-primary); margin-top: 8px;">
            » ${isAr ? 'صادر حصرياً لـ:' : 'Issued Exclusively For:'} ${isAr ? recipient.nameAr : recipient.nameEn} (Akked Guarded)
          </div>
        </div>

        <!-- Footer Navigation -->
        <div style="display: flex; justify-content: space-between; margin-top: 32px;">
          <button class="btn btn-secondary" onclick="AkkedWizard.prevStep()">
            <span>${isAr ? '→' : '←'}</span>
            <span>${isAr ? 'السابق' : 'Back'}</span>
          </button>
          <button class="btn btn-primary btn-lg" onclick="AkkedWizard.issueProof()">
            <picture style="display: inline-flex; line-height: 0;">
              <source srcset="assets/proof-doc-mint.webp" type="image/webp">
              <img src="assets/proof-doc-mint.png" 
                   alt="${isAr ? 'الإثبات الرقمي' : 'Digital Proof'}" 
                   title="${isAr ? 'الإثبات الرقمي' : 'Digital Proof'}" 
                   aria-label="${isAr ? 'الإثبات الرقمي' : 'Digital Proof'}" 
                   width="18" 
                   height="18" 
                   style="width: 18px; height: 18px; object-fit: contain;">
            </picture>
            <span>${isAr ? 'إصدار وتوقيع الإثبات المشفر' : 'Sign & Issue Verifiable Proof'}</span>
          </button>
        </div>
      </div>
    `;
  },

  // Step 6: Issued Proof Result Card & Sharing Hub
  renderStep6() {
    const isAr = I18N.currentLang === 'ar';
    const proof = this.generatedProof || AkkedState.shares[0];
    const token = AkkedCrypto.createProofToken(proof);
    const origin = window.location.origin;
    const path = window.location.pathname;
    const directUrl = `${origin}${path}?verify=${encodeURIComponent(proof.id)}&token=${token}`;
    const qrSvg = AkkedCrypto.generateQRCodeSVG(directUrl, 160);

    return `
      <div class="step-pane animate-fade-in" style="display: flex; flex-direction: column; align-items: center;">
        <div style="margin-bottom: 14px; display: inline-flex; align-items: center; justify-content: center;">
          <picture style="display: inline-flex; line-height: 0;">
            <source srcset="assets/checkmark-verified-mint.webp" type="image/webp">
            <img class="single-pulse-badge" 
                 src="assets/checkmark-verified-mint.png" 
                 alt="${isAr ? 'تم التحقق' : 'Verified'}" 
                 title="${isAr ? 'تم التحقق' : 'Verified'}" 
                 aria-label="${isAr ? 'تم التحقق' : 'Verified'}" 
                 width="48" 
                 height="48" 
                 style="width: 48px; height: 48px; object-fit: contain;">
          </picture>
        </div>
        <h2 style="font-size: 1.6rem; font-weight: 900; color: var(--brand-primary); margin-bottom: 6px;">
          ${I18N.t('proofSuccessTitle')}
        </h2>
        <p style="font-size: 0.92rem; color: var(--text-muted); margin-bottom: 28px; text-align: center;">
          ${I18N.t('proofReadyNotice')}
        </p>

        <!-- Proof Card (Matching Provided Reference Image) -->
        <div class="proof-mobile-mockup" style="margin-bottom: 28px;">
          <div class="proof-brand-header">
            <picture style="display: block; line-height: 0;">
              <source srcset="assets/akkid-logo.webp" type="image/webp">
              <img src="assets/akkid-logo.png" 
                   alt="أكّد" 
                   title="أكّد" 
                   class="official-akkid-logo" 
                   width="64" 
                   height="88" 
                   style="width: 64px; height: auto; display: block; object-fit: contain;">
            </picture>
            <span class="badge badge-active">
              ${isAr ? 'مؤهل فقط' : 'Eligible only'}
            </span>
          </div>

          <div class="proof-main-icon">
            <picture style="display: inline-flex; line-height: 0;">
              <source srcset="assets/checkmark-verified-mint.webp" type="image/webp">
              <img class="single-pulse-badge" 
                   src="assets/checkmark-verified-mint.png" 
                   alt="${isAr ? 'تم التحقق' : 'Verified'}" 
                   title="${isAr ? 'تم التحقق' : 'Verified'}" 
                   aria-label="${isAr ? 'تم التحقق' : 'Verified'}" 
                   width="38" 
                   height="38" 
                   style="width: 38px; height: 38px; object-fit: contain;">
            </picture>
          </div>

          <div class="proof-title">
            ${isAr ? 'تم إثبات الأهلية' : 'Eligibility Proven'}
          </div>
          <div class="proof-subtitle">
            ${isAr ? proof.sharedClaimsAr : proof.sharedClaimsEn}
          </div>

          <div class="proof-badge-safe">
            ${AkkedIcons.get('shield-check', { size: 14 })}
            <span>${I18N.t('noExtraData')}</span>
          </div>

          <div class="proof-id-pill" style="display: inline-flex; align-items: center; gap: 6px;">
            <picture style="display: inline-flex; line-height: 0;">
              <source srcset="assets/proof-doc-mint.webp" type="image/webp">
              <img src="assets/proof-doc-mint.png" 
                   alt="${isAr ? 'الإثبات الرقمي' : 'Digital Proof'}" 
                   title="${isAr ? 'الإثبات الرقمي' : 'Digital Proof'}" 
                   aria-label="${isAr ? 'الإثبات الرقمي' : 'Digital Proof'}" 
                   width="15" 
                   height="15" 
                   style="width: 15px; height: 15px; object-fit: contain;">
            </picture>
            <span>${isAr ? 'الإثبات الرقمي:' : 'Digital Proof:'} ${proof.id}</span>
          </div>

          <div style="margin-bottom: 16px;">
            ${qrSvg}
          </div>

          <div style="font-size: 0.78rem; color: var(--text-muted); line-height: 1.4; border-top: 1px solid var(--border-light); padding-top: 12px; width: 100%;">
            <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
              <picture style="display: inline-flex; line-height: 0;">
                <source srcset="assets/building-org-slate.webp" type="image/webp">
                <img src="assets/building-org-slate.png" 
                     alt="${isAr ? 'الجهة الطالبة' : 'Requesting Organization'}" 
                     title="${isAr ? 'الجهة الطالبة' : 'Requesting Organization'}" 
                     aria-label="${isAr ? 'الجهة الطالبة' : 'Requesting Organization'}" 
                     width="14" 
                     height="14" 
                     style="width: 14px; height: 14px; object-fit: contain;">
              </picture>
              <span><strong>${isAr ? 'الجهة الطالبة:' : 'Requesting Organization:'}</strong> ${isAr ? proof.recipientNameAr : proof.recipientNameEn}</span>
            </div>
            <div><strong>${isAr ? 'الغرض:' : 'Purpose:'}</strong> ${isAr ? proof.purposeNameAr : proof.purposeNameEn}</div>
            <div><strong>${isAr ? 'تاريخ الانتهاء:' : 'Expires:'}</strong> ${proof.expiryDate}</div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div style="display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; width: 100%; max-width: 480px;">
          <button class="btn btn-secondary btn-lg" style="flex: 1;" onclick="AkkedShares.copyShareLink('${proof.id}')">
            ${AkkedIcons.get('link', { size: 16 })} <span>${I18N.t('btnCopyProofLink')}</span>
          </button>
          <button class="btn btn-primary btn-lg" style="flex: 1;" onclick="AkkedApp.navigate('verify', { proofId: '${proof.id}', token: '${token}' })">
            ${AkkedIcons.get('search', { size: 16 })} <span>${I18N.t('btnVerifyNow')}</span>
          </button>
        </div>

        <div style="margin-top: 16px;">
          <button class="btn btn-secondary" onclick="AkkedApp.navigate('dashboard')">
            ${I18N.t('btnDone')}
          </button>
        </div>
      </div>
    `;
  },

  goToStep(step) {
    if (step < this.currentStep || step === 1) {
      this.currentStep = step;
      AkkedApp.renderView();
    }
  },

  nextStep() {
    if (this.currentStep < 6) {
      this.currentStep++;
      AkkedApp.renderView();
    }
  },

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
      AkkedApp.renderView();
    }
  },

  selectDoc(docId) {
    this.selectedDocId = docId;
    // Set matching default purpose
    if (docId === 'national_id') {
      this.selectedPurposeId = 'purpose_age';
      this.customAllowedFields = ['age_calc'];
    } else if (docId === 'salary_cert') {
      this.selectedPurposeId = 'purpose_salary';
      this.customAllowedFields = ['status_active', 'salary_range'];
    } else if (docId === 'warranty_receipt') {
      this.selectedPurposeId = 'purpose_warranty';
      this.customAllowedFields = ['item_name', 'serial_no', 'warranty_status'];
    }
    AkkedApp.renderView();
  },

  selectPurpose(purposeId, docReq, defaultRecipient) {
    this.selectedPurposeId = purposeId;
    this.selectedDocId = docReq;
    this.selectedRecipientId = defaultRecipient;

    if (purposeId === 'purpose_age') {
      this.customAllowedFields = ['age_calc'];
    } else if (purposeId === 'purpose_salary') {
      this.customAllowedFields = ['status_active', 'salary_range'];
    } else if (purposeId === 'purpose_warranty') {
      this.customAllowedFields = ['item_name', 'serial_no', 'warranty_status'];
    }

    AkkedApp.renderView();
  },

  selectRecipient(recipientId) {
    this.selectedRecipientId = recipientId;
    AkkedApp.renderView();
  },

  selectDuration(duration) {
    this.selectedDuration = duration;
    AkkedApp.renderView();
  },

  setRedactionStyle(style) {
    this.redactionStyle = style;
    AkkedApp.renderView();
  },

  handleFileUpload(input) {
    if (input.files && input.files[0]) {
      AkkedApp.showToast(I18N.currentLang === 'ar' ? 'تم استيراد الوثيقة ومعالجتها محلياً بنجاح!' : 'Document loaded and processed locally!', 'success');
      this.selectedDocId = 'national_id';
      this.nextStep();
    }
  },

  async issueProof() {
    const isAr = I18N.currentLang === 'ar';
    const recipient = AkkedState.entities.find(e => e.id === this.selectedRecipientId) || AkkedState.entities[0];
    const rec = AkkedRedactionEngine.getRecommendation(this.selectedPurposeId, this.selectedDocId);
    
    // Generate simulated unique proof ID
    const proofId = this.selectedPurposeId === 'purpose_age' ? 'DEMO-018' : AkkedCrypto.generateProofId('AKK');
    const hash = await AkkedCrypto.generateSHA256(proofId + Date.now());

    // Expiry calculation
    const now = new Date();
    const expiry = new Date(now.getTime() + (this.selectedDuration === '5_min' ? 5 * 60000 : (this.selectedDuration === '1_hour' ? 60 * 60000 : 24 * 3600000)));
    const expiryStr = expiry.toISOString().replace('T', ' ').substring(0, 16);
    const createdStr = now.toISOString().replace('T', ' ').substring(0, 16);

    const newProof = {
      id: proofId,
      docType: this.selectedDocId,
      recipientId: this.selectedRecipientId,
      recipientNameAr: recipient.nameAr,
      recipientNameEn: recipient.nameEn,
      purposeId: this.selectedPurposeId,
      purposeNameAr: this.selectedPurposeId === 'purpose_age' ? 'التحقق من الأهلية العمرية (فوق 18 عاماً)' : (this.selectedPurposeId === 'purpose_salary' ? 'التحقق من الحد الأدنى للراتب وملاءمة الإيجار' : 'التحقق من سريان الضمان'),
      purposeNameEn: this.selectedPurposeId === 'purpose_age' ? 'Age Eligibility Verification (18+ Only)' : (this.selectedPurposeId === 'purpose_salary' ? 'Income Threshold Check' : 'Warranty Validity Check'),
      sharedClaimsAr: rec.claimAr,
      sharedClaimsEn: rec.claimEn,
      shieldedFieldsCount: 5,
      createdDate: createdStr,
      expiryDate: expiryStr,
      status: 'active',
      sha256Hash: hash,
      watermark: `${isAr ? 'صادر حصرياً لـ:' : 'Issued Exclusively For:'} ${isAr ? recipient.nameAr : recipient.nameEn}`,
      allowedFieldIds: this.customAllowedFields
    };

    AkkedState.addShare(newProof);
    this.generatedProof = newProof;
    this.currentStep = 6;
    AkkedApp.renderView();
  }
};
