/**
 * Akked Dashboard Component
 */

window.AkkedDashboard = {
  render() {
    const isAr = I18N.currentLang === 'ar';
    const shares = AkkedState.shares || [];
    const activeShares = shares.filter(s => s.status === 'active');
    const expiredShares = shares.filter(s => s.status === 'expired');
    const uniqueEntitiesCount = new Set(shares.map(s => s.recipientId)).size || 3;
    const avgPrivacyScore = shares.length > 0 ? 94 : 100;
    const recentShares = shares.slice(0, 4);

    return `
      <div class="dashboard-view animate-fade-in">
        <!-- Clean, Open, Borderless Introduction Section -->
        <div class="intro-section">
          <h1 class="intro-heading">
            ${I18N.t('introHeading')}
          </h1>
          <p class="intro-desc">
            ${I18N.t('introDesc')}
          </p>
          
            <button class="btn-intro-primary" onclick="AkkedApp.navigate('wizard')">
              <picture style="display: inline-flex; line-height: 0;">
                <source srcset="assets/proof-doc-mint.webp" type="image/webp">
                <img src="assets/proof-doc-mint.png" 
                     alt="${isAr ? 'الإثبات الرقمي' : 'Digital Proof'}" 
                     title="${isAr ? 'الإثبات الرقمي' : 'Digital Proof'}" 
                     aria-label="${isAr ? 'الإثبات الرقمي' : 'Digital Proof'}" 
                     width="18" 
                     height="18" 
                     style="width: 18px; height: 18px; object-fit: contain; vertical-align: middle;">
              </picture>
              <span>${I18N.t('btnCreateDemoProof')}</span>
            </button>
            <button class="btn-intro-secondary" onclick="AkkedDashboard.openHowItWorksModal()">
              ${AkkedIcons.get('info', { size: 17 })}
              <span>${I18N.t('btnSeeHowItWorks')}</span>
            </button>
          </div>
        </div>

        <!-- 4 KPI Stat Cards with Verified Vector Outline Icons -->
        <div class="grid-container grid-cols-4" style="margin-bottom: 28px;">
          <!-- Active Shares: Connected Share-Nodes Icon -->
          <div class="card" style="display: flex; align-items: center; gap: 16px;">
            <div class="stat-icon-container" style="background-color: var(--status-active-bg); border: 1px solid var(--status-active-border);" aria-label="${isAr ? 'المشاركات النشطة' : 'Active Shares'}" role="img">
              <picture style="display: flex; align-items: center; justify-content: center; line-height: 0;">
                <source srcset="assets/share-nodes-mint.webp" type="image/webp">
                <img src="assets/share-nodes-mint.png" 
                     alt="${isAr ? 'المشاركات النشطة' : 'Active Shares'}" 
                     title="${isAr ? 'المشاركات النشطة' : 'Active Shares'}" 
                     aria-label="${isAr ? 'المشاركات النشطة' : 'Active Shares'}" 
                     width="22" 
                     height="22" 
                     style="width: 22px; height: 22px; display: block; object-fit: contain; pointer-events: none;">
              </picture>
            </div>
            <div>
              <div style="font-size: 0.82rem; font-weight: 600; color: var(--text-muted);">${I18N.t('statActiveShares')}</div>
              <div style="font-size: 1.65rem; font-weight: 800; color: var(--text-main); line-height: 1.2;">${activeShares.length}</div>
            </div>
          </div>

          <!-- Expired Shares: Standard Clock Icon (without backward arrow) -->
          <div class="card" style="display: flex; align-items: center; gap: 16px;">
            <div class="stat-icon-container" style="background-color: var(--status-expired-bg); color: var(--status-expired); border: 1px solid var(--status-expired-border);">
              ${AkkedIcons.get('clock', { size: 22, strokeWidth: 2 })}
            </div>
            <div>
              <div style="font-size: 0.82rem; font-weight: 600; color: var(--text-muted);">${I18N.t('statExpiredShares')}</div>
              <div style="font-size: 1.65rem; font-weight: 800; color: var(--text-main); line-height: 1.2;">${expiredShares.length}</div>
            </div>
          </div>

          <!-- Organizations That Accessed Data: Institutional Building Icon -->
          <div class="card" style="display: flex; align-items: center; gap: 16px;">
            <div class="stat-icon-container" style="background-color: var(--brand-slate-light); border: 1px solid var(--brand-slate-border);" aria-label="${isAr ? 'الجهة الطالبة' : 'Requesting Organization'}" role="img">
              <picture>
                <source srcset="assets/building-org-slate.webp" type="image/webp">
                <img src="assets/building-org-slate.png" 
                     alt="${isAr ? 'الجهة الطالبة' : 'Requesting Organization'}" 
                     title="${isAr ? 'الجهة الطالبة' : 'Requesting Organization'}" 
                     aria-label="${isAr ? 'الجهة الطالبة' : 'Requesting Organization'}"
                     width="24" 
                     height="24" 
                     style="width: 24px; height: 24px; display: block; object-fit: contain; pointer-events: none;">
              </picture>
            </div>
            <div>
              <div style="font-size: 0.82rem; font-weight: 600; color: var(--text-muted);">${I18N.t('statAccessedEntities')}</div>
              <div style="font-size: 1.65rem; font-weight: 800; color: var(--text-main); line-height: 1.2;">${uniqueEntitiesCount}</div>
            </div>
          </div>

          <!-- Privacy Protection Score: Supplied Shield-with-check Icon in Deep Purple -->
          <div class="card" style="display: flex; align-items: center; gap: 16px;">
            <div class="stat-icon-container" style="background-color: var(--brand-primary-light); border: 1px solid var(--brand-primary-border);" aria-label="${isAr ? 'مؤشر حماية الخصوصية' : 'Privacy Protection Score'}" role="img">
              <picture>
                <source srcset="assets/shield-check-purple.webp" type="image/webp">
                <img src="assets/shield-check-purple.png" 
                     alt="${isAr ? 'مؤشر حماية الخصوصية' : 'Privacy Protection Score'}" 
                     title="${isAr ? 'مؤشر حماية الخصوصية' : 'Privacy Protection Score'}" 
                     width="24" 
                     height="24" 
                     style="width: 24px; height: 24px; display: block; object-fit: contain; pointer-events: none;">
              </picture>
            </div>
            <div>
              <div style="font-size: 0.82rem; font-weight: 600; color: var(--text-muted);">${I18N.t('statPrivacyHealth')}</div>
              <div style="font-size: 1.65rem; font-weight: 800; color: var(--brand-primary); line-height: 1.2;">${avgPrivacyScore}%</div>
            </div>
          </div>
        </div>

        <!-- 2 Column Layout: Recent Shares + Live Privacy Health Gauge -->
        <div class="grid-container grid-cols-12 dashboard-main-grid">
          <!-- Recent Shares (8 Cols) -->
          <div class="card dashboard-activity-col" style="grid-column: span 8;">
            <div class="card-header">
              <div>
                <h2 class="card-title" style="display: flex; align-items: center; gap: 8px;">
                  <picture style="display: inline-flex; line-height: 0;">
                    <source srcset="assets/history-activity-slate.webp" type="image/webp">
                    <img src="assets/history-activity-slate.png" 
                         alt="${isAr ? 'أحدث الأنشطة والموافقات' : 'Recent Activity'}" 
                         title="${isAr ? 'أحدث الأنشطة والموافقات' : 'Recent Activity'}" 
                         aria-label="${isAr ? 'أحدث الأنشطة والموافقات' : 'Recent Activity'}" 
                         width="20" 
                         height="20" 
                         style="width: 20px; height: 20px; object-fit: contain; vertical-align: middle;">
                  </picture>
                  <span>${I18N.t('recentActivityTitle')}</span>
                </h2>
                <p class="card-subtitle">${isAr ? 'أحدث الوثائق والإثباتات المصدرة' : 'Latest issued proofs and consent records'}</p>
              </div>
              <button class="btn btn-secondary btn-sm" onclick="AkkedApp.navigate('shares')">
                <span>${I18N.t('viewAllShares')}</span>
                ${AkkedIcons.get(isAr ? 'arrow-left' : 'arrow-right', { size: 14 })}
              </button>
            </div>

            <!-- Desktop Table View (>= 768px) -->
            <div class="desktop-only-table data-table-container">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>
                      <span style="display: inline-flex; align-items: center; gap: 6px;">
                        <picture style="display: inline-flex; line-height: 0;">
                          <source srcset="assets/building-org-slate.webp" type="image/webp">
                          <img src="assets/building-org-slate.png" 
                               alt="${isAr ? 'الجهة الطالبة' : 'Requesting Organization'}" 
                               title="${isAr ? 'الجهة الطالبة' : 'Requesting Organization'}" 
                               aria-label="${isAr ? 'الجهة الطالبة' : 'Requesting Organization'}" 
                               width="16" 
                               height="16" 
                               style="width: 16px; height: 16px; object-fit: contain; vertical-align: middle; display: inline-block;">
                        </picture>
                        <span>${I18N.t('colRecipient')}</span>
                      </span>
                    </th>
                    <th>${I18N.t('colPurpose')}</th>
                    <th>
                      <span style="display: inline-flex; align-items: center; gap: 6px;">
                        <picture style="display: inline-flex; line-height: 0;">
                          <source srcset="assets/eye-disclosed-slate.webp" type="image/webp">
                          <img src="assets/eye-disclosed-slate.png" 
                               alt="${isAr ? 'البيانات المكشوفة' : 'Disclosed Data'}" 
                               title="${isAr ? 'البيانات المكشوفة' : 'Disclosed Data'}" 
                               aria-label="${isAr ? 'البيانات المكشوفة' : 'Disclosed Data'}" 
                               width="16" 
                               height="16" 
                               style="width: 16px; height: 16px; object-fit: contain; vertical-align: middle; display: inline-block;">
                        </picture>
                        <span>${I18N.t('colSharedData')}</span>
                      </span>
                    </th>
                    <th>${I18N.t('colStatus')}</th>
                    <th>${I18N.t('colActions')}</th>
                  </tr>
                </thead>
                <tbody>
                  ${recentShares.map(s => `
                    <tr>
                      <td style="font-weight: 700; color: var(--brand-slate);">
                        <div style="display: inline-flex; align-items: center; gap: 6px;">
                          <picture style="display: inline-flex; line-height: 0;">
                            <source srcset="assets/building-org-slate.webp" type="image/webp">
                            <img src="assets/building-org-slate.png" 
                                 alt="${isAr ? 'الجهة الطالبة' : 'Requesting Organization'}" 
                                 title="${isAr ? 'الجهة الطالبة' : 'Requesting Organization'}" 
                                 aria-label="${isAr ? 'الجهة الطالبة' : 'Requesting Organization'}" 
                                 width="15" 
                                 height="15" 
                                 style="width: 15px; height: 15px; object-fit: contain; vertical-align: middle; display: inline-block;">
                          </picture>
                          <span>${isAr ? s.recipientNameAr : s.recipientNameEn}</span>
                        </div>
                      </td>
                      <td style="font-size: 0.85rem; color: var(--text-muted);">
                        ${isAr ? s.purposeNameAr : s.purposeNameEn}
                      </td>
                      <td>
                        <span class="claim-clean-text">
                          ${isAr ? s.sharedClaimsAr : s.sharedClaimsEn}
                        </span>
                      </td>
                      <td>
                        <span class="badge ${s.status === 'active' ? 'badge-active' : (s.status === 'expired' ? 'badge-expired' : 'badge-revoked')}" style="display: inline-flex; align-items: center; gap: 5px;">
                          ${s.status === 'active' ? `
                            <picture style="display: inline-flex; line-height: 0;">
                              <source srcset="assets/checkmark-verified-mint.webp" type="image/webp">
                              <img class="single-pulse-badge" src="assets/checkmark-verified-mint.png" alt="${isAr ? 'تم التحقق' : 'Verified'}" title="${isAr ? 'تم التحقق' : 'Verified'}" aria-label="${isAr ? 'تم التحقق' : 'Verified'}" width="12" height="12" style="width: 12px; height: 12px; object-fit: contain;">
                            </picture>
                            <span>${isAr ? 'تم التحقق' : 'Verified'}</span>
                          ` : (s.status === 'expired' ? I18N.t('statusExpired') : I18N.t('statusRevoked'))}
                        </span>
                      </td>
                      <td>
                        <button class="btn btn-secondary btn-sm" onclick="AkkedShares.openProofModal('${s.id}')">
                          ${AkkedIcons.get('eye', { size: 15 })}
                          <span>${I18N.t('actionViewDetails')}</span>
                        </button>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>

            <!-- Mobile Stacked Cards View (< 768px) -->
            <div class="mobile-only-cards mobile-activity-cards">
              ${recentShares.map(s => `
                <div class="mobile-activity-card">
                  <div class="mobile-card-header-row">
                    <div class="mobile-card-org-name">
                      <picture style="display: inline-flex; line-height: 0;">
                        <source srcset="assets/building-org-slate.webp" type="image/webp">
                        <img src="assets/building-org-slate.png" 
                             alt="${isAr ? 'الجهة الطالبة' : 'Requesting Organization'}" 
                             width="15" height="15" 
                             style="width: 15px; height: 15px; object-fit: contain;">
                      </picture>
                      <span>${isAr ? s.recipientNameAr : s.recipientNameEn}</span>
                    </div>
                    <span class="badge ${s.status === 'active' ? 'badge-active' : (s.status === 'expired' ? 'badge-expired' : 'badge-revoked')}" style="display: inline-flex; align-items: center; gap: 4px;">
                      ${s.status === 'active' ? `
                        <picture style="display: inline-flex; line-height: 0;">
                          <source srcset="assets/checkmark-verified-mint.webp" type="image/webp">
                          <img class="single-pulse-badge" src="assets/checkmark-verified-mint.png" alt="${isAr ? 'تم التحقق' : 'Verified'}" width="12" height="12" style="width: 12px; height: 12px; object-fit: contain;">
                        </picture>
                        <span>${isAr ? 'تم التحقق' : 'Verified'}</span>
                      ` : (s.status === 'expired' ? I18N.t('statusExpired') : I18N.t('statusRevoked'))}
                    </span>
                  </div>

                  <div class="mobile-card-field">
                    <span class="mobile-card-label">${I18N.t('colPurpose')}:</span>
                    <span class="mobile-card-value">${isAr ? s.purposeNameAr : s.purposeNameEn}</span>
                  </div>

                  <div class="mobile-card-field">
                    <span class="mobile-card-label" style="display: inline-flex; align-items: center; gap: 4px;">
                      <picture style="display: inline-flex; line-height: 0;">
                        <source srcset="assets/eye-disclosed-slate.webp" type="image/webp">
                        <img src="assets/eye-disclosed-slate.png" alt="${isAr ? 'البيانات المكشوفة' : 'Disclosed Data'}" width="14" height="14" style="width: 14px; height: 14px; object-fit: contain;">
                      </picture>
                      <span>${I18N.t('colSharedData')}:</span>
                    </span>
                    <span class="mobile-card-value claim-clean-text">${isAr ? s.sharedClaimsAr : s.sharedClaimsEn}</span>
                  </div>

                  <div class="mobile-card-actions-row">
                    <button class="btn btn-secondary btn-sm" style="width: 100%; justify-content: center; min-height: 44px;" onclick="AkkedShares.openProofModal('${s.id}')">
                      ${AkkedIcons.get('eye', { size: 15 })}
                      <span>${I18N.t('actionViewDetails')}</span>
                    </button>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Privacy Health & Compliance Card (4 Cols) -->
          <div class="card dashboard-privacy-col" style="grid-column: span 4; display: flex; flex-direction: column; justify-content: space-between;">
            <div class="card-header">
              <h2 class="card-title" style="display: flex; align-items: center; gap: 8px;">
                ${AkkedIcons.get('shield-check', { size: 20 })}
                <span>${isAr ? 'مؤشر الامتثال للخصوصية' : 'Privacy Compliance'}</span>
              </h2>
            </div>

            <div class="privacy-gauge-container">
              <div class="gauge-svg-wrap">
                <svg width="140" height="140" viewBox="0 0 140 140">
                  <circle class="gauge-bg" cx="70" cy="70" r="58" stroke-width="12" fill="none" />
                  <circle class="gauge-progress" cx="70" cy="70" r="58" stroke-width="12" fill="none" 
                    stroke-dasharray="364.4" stroke-dashoffset="21.8" />
                </svg>
                <div class="gauge-value-text">94%</div>
              </div>
              <div style="font-size: 0.95rem; font-weight: 700; color: var(--text-main); margin-top: 14px;">
                ${isAr ? 'مستوى حماية فائق وممتثل' : 'Excellent Protection Level'}
              </div>
              <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 4px;">
                ${isAr ? 'تطبيق مبدأ تقليص البيانات ومشاركة الحد الأدنى الضروري فقط' : 'Strict adherence to data minimization and selective disclosure'}
              </p>
            </div>

            <div style="background-color: var(--brand-surface-subtle); border-radius: var(--radius-md); padding: 14px; border: 1px solid var(--border-light); font-size: 0.82rem; color: var(--text-muted);">
              <div style="font-weight: 700; color: var(--brand-slate); margin-bottom: 4px;">
                ${I18N.t('legalDisclaimer')}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  openHowItWorksModal() {
    const isAr = I18N.currentLang === 'ar';
    AkkedApp.openModal(`
      <div style="padding: 10px 4px;">
        <h3 style="font-size: 1.3rem; font-weight: 800; color: var(--brand-slate); margin-bottom: 12px; display: flex; align-items: center; gap: 10px;">
          ${AkkedIcons.get('shield-check', { size: 24 })}
          <span>${isAr ? 'آلية العمل: تقليص البيانات والإفصاح الانتقائي' : 'How It Works: Selective Disclosure & Data Minimization'}</span>
        </h3>
        <p style="font-size: 0.92rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 20px;">
          ${isAr 
            ? 'بدلاً من تسليم بطاقة الهوية أو الوثيقة كاملة بما تحويه من بيانات غير ذات صلة، تتيح المنصة إثبات الاستحقاق المطلوب حصراً دون كشف الهوية الشخصية.' 
            : 'Instead of handing over full identity documents containing irrelevant personal details, Akked proves only the exact binary claim required without exposing your full identity.'}
        </p>

        <div style="display: flex; flex-direction: column; gap: 14px; margin-bottom: 24px;">
          <div style="display: flex; gap: 14px; align-items: flex-start; padding: 14px; background: var(--brand-surface-subtle); border-radius: var(--radius-md); border: 1px solid var(--border-light);">
            <div style="width: 38px; height: 38px; border-radius: 50%; background: var(--brand-slate-light); color: var(--brand-slate); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
              ${AkkedIcons.get('id-card', { size: 18 })}
            </div>
            <div>
              <strong style="color: var(--text-main); font-size: 0.92rem;">${isAr ? '1. فحص عناصر الوثيقة' : '1. Document Inspection'}</strong>
              <div style="font-size: 0.82rem; color: var(--text-muted); margin-top: 2px;">
                ${isAr ? 'تحديد عناصر البيانات الشخصية داخل الوثيقة واختيار الغرض المخصص للمشاركة.' : 'Identify personal data elements within the document and select the authorized purpose.'}
              </div>
            </div>
          </div>

          <div style="display: flex; gap: 14px; align-items: flex-start; padding: 14px; background: var(--brand-surface-subtle); border-radius: var(--radius-md); border: 1px solid var(--border-light);">
            <div style="width: 38px; height: 38px; border-radius: 50%; background: var(--brand-primary-light); color: var(--brand-primary); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
              ${AkkedIcons.get('eye-off', { size: 18 })}
            </div>
            <div>
              <strong style="color: var(--text-main); font-size: 0.92rem;">${isAr ? '2. الفلترة وحجب البيانات الزائدة' : '2. Filtering & Shielding Redundant Data'}</strong>
              <div style="font-size: 0.82rem; color: var(--text-muted); margin-top: 2px;">
                ${isAr ? 'حجب كافة الحقول التي لا يحتاجها المستلم وتطبيق علامة مائية مخصصة.' : 'Shield all fields that the recipient does not require, applying a targeted watermark.'}
              </div>
            </div>
          </div>

          <div style="display: flex; gap: 14px; align-items: flex-start; padding: 14px; background: var(--brand-surface-subtle); border-radius: var(--radius-md); border: 1px solid var(--border-light);">
            <div style="width: 38px; height: 38px; border-radius: 50%; background: var(--brand-accent-light); color: var(--brand-accent); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
              ${AkkedIcons.get('check', { size: 18, strokeWidth: 2.5 })}
            </div>
            <div>
              <strong style="color: var(--text-main); font-size: 0.92rem;">${isAr ? '3. إصدار نتيجة الإثبات المصغرة' : '3. Issuing the Minimal Verified Proof'}</strong>
              <div style="font-size: 0.82rem; color: var(--text-muted); margin-top: 2px;">
                ${isAr ? 'إصدار بطاقة إثبات محددة الصلاحية تحتوي على النتيجة المطلوبة فقط دون أي بيانات إضافية.' : 'Generate a time-limited proof card containing only the required assertion with no extra personal data.'}
              </div>
            </div>
          </div>
        </div>

        <div style="display: flex; justify-content: flex-end;">
          <button class="btn btn-primary" onclick="AkkedApp.closeModal()">${isAr ? 'فهمت ذلك' : 'Got It'}</button>
        </div>
      </div>
    `);
  }
};
