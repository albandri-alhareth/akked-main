/**
 * Akked Shares & Proofs Registry Component
 */

window.AkkedShares = {
  currentFilter: 'all',
  searchQuery: '',

  render() {
    const isAr = I18N.currentLang === 'ar';
    let list = [...AkkedState.shares];

    // Filter by status
    if (this.currentFilter !== 'all') {
      list = list.filter(s => s.status === this.currentFilter);
    }

    // Filter by search query
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      list = list.filter(s => 
        (s.recipientNameAr && s.recipientNameAr.toLowerCase().includes(q)) ||
        (s.recipientNameEn && s.recipientNameEn.toLowerCase().includes(q)) ||
        (s.purposeNameAr && s.purposeNameAr.toLowerCase().includes(q)) ||
        (s.purposeNameEn && s.purposeNameEn.toLowerCase().includes(q)) ||
        (s.id && s.id.toLowerCase().includes(q))
      );
    }

    return `
      <div class="shares-view animate-fade-in">
        <!-- Page Header -->
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; margin-bottom: 24px;">
          <div>
            <h1 style="font-size: 1.6rem; font-weight: 800; color: var(--text-main); display: flex; align-items: center; gap: 10px;">
              <picture style="display: inline-flex; line-height: 0;">
                <source srcset="assets/proof-doc-slate.webp" type="image/webp">
                <img src="assets/proof-doc-slate.png" 
                     alt="${isAr ? 'الإثبات الرقمي' : 'Digital Proof'}" 
                     title="${isAr ? 'الإثبات الرقمي' : 'Digital Proof'}" 
                     aria-label="${isAr ? 'الإثبات الرقمي' : 'Digital Proof'}" 
                     width="26" 
                     height="26" 
                     style="width: 26px; height: 26px; object-fit: contain;">
              </picture>
              <span>${I18N.t('sharesPageTitle')}</span>
            </h1>
            <p style="font-size: 0.9rem; color: var(--text-muted); margin-top: 4px;">${I18N.t('sharesPageSubtitle')}</p>
          </div>
          <button class="btn btn-primary" onclick="AkkedApp.navigate('wizard')">
            <picture style="display: inline-flex; line-height: 0;">
              <source srcset="assets/proof-doc-mint.webp" type="image/webp">
              <img src="assets/proof-doc-mint.png" 
                   alt="${isAr ? 'الإثبات الرقمي' : 'Digital Proof'}" 
                   title="${isAr ? 'الإثبات الرقمي' : 'Digital Proof'}" 
                   aria-label="${isAr ? 'الإثبات الرقمي' : 'Digital Proof'}" 
                   width="16" 
                   height="16" 
                   style="width: 16px; height: 16px; object-fit: contain;">
            </picture>
            <span>${I18N.t('createSecureShare')}</span>
          </button>
        </div>

        <!-- Filter & Search Bar -->
        <div class="filter-bar card" style="padding: 16px; margin-bottom: 24px;">
          <!-- Status Filter Tabs -->
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <button class="btn ${this.currentFilter === 'all' ? 'btn-primary' : 'btn-secondary'} btn-sm" onclick="AkkedShares.setFilter('all')">
              ${I18N.t('filterAll')} (${AkkedState.shares.length})
            </button>
            <button class="btn ${this.currentFilter === 'active' ? 'btn-primary' : 'btn-secondary'} btn-sm" onclick="AkkedShares.setFilter('active')">
              ${I18N.t('filterActive')} (${AkkedState.shares.filter(s=>s.status==='active').length})
            </button>
            <button class="btn ${this.currentFilter === 'expired' ? 'btn-primary' : 'btn-secondary'} btn-sm" onclick="AkkedShares.setFilter('expired')">
              ${I18N.t('filterExpired')} (${AkkedState.shares.filter(s=>s.status==='expired').length})
            </button>
            <button class="btn ${this.currentFilter === 'revoked' ? 'btn-primary' : 'btn-secondary'} btn-sm" onclick="AkkedShares.setFilter('revoked')">
              ${I18N.t('filterRevoked')} (${AkkedState.shares.filter(s=>s.status==='revoked').length})
            </button>
          </div>

          <!-- Search Input -->
          <div class="search-input-wrapper">
            <span class="search-icon">${AkkedIcons.get('search', { size: 16 })}</span>
            <input type="text" placeholder="${I18N.t('searchPlaceholder')}" value="${this.searchQuery}" oninput="AkkedShares.handleSearch(this.value)">
          </div>
        </div>

        <!-- Table Card -->
        <div class="card" style="padding: 0; overflow: hidden;">
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
                  <th>${I18N.t('colCreatedDate')}</th>
                  <th>${I18N.t('colExpiryDate')}</th>
                  <th>${I18N.t('colStatus')}</th>
                  <th>${I18N.t('colActions')}</th>
                </tr>
              </thead>
              <tbody>
                ${list.length === 0 ? `
                  <tr>
                    <td colspan="7" style="text-align: center; padding: 48px 20px; color: var(--text-muted);">
                      <div style="margin-bottom: 12px; color: var(--brand-slate);">${AkkedIcons.get('folder', { size: 38, strokeWidth: 1.5 })}</div>
                      <div style="font-weight: 700; font-size: 1.1rem;">${I18N.t('noSharesFound')}</div>
                    </td>
                  </tr>
                ` : list.map(s => `
                  <tr>
                    <td>
                      <div style="font-weight: 700; color: var(--brand-slate); font-size: 0.95rem; display: inline-flex; align-items: center; gap: 6px;">
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
                      <div style="font-family: monospace; font-size: 0.76rem; color: var(--text-subtle);">
                        ID: ${s.id}
                      </div>
                    </td>
                    <td>
                      <div style="font-weight: 600; color: var(--text-main); font-size: 0.88rem;">
                        ${isAr ? s.purposeNameAr : s.purposeNameEn}
                      </div>
                    </td>
                    <td>
                      <span class="claim-clean-text">
                        ${isAr ? s.sharedClaimsAr : s.sharedClaimsEn}
                      </span>
                    </td>
                    <td style="font-size: 0.82rem; color: var(--text-muted);">
                      ${s.createdDate}
                    </td>
                    <td style="font-size: 0.82rem; color: var(--text-muted);">
                      ${s.expiryDate}
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
                      <div style="display: flex; align-items: center; gap: 8px;">
                        <button class="btn btn-secondary btn-sm" title="${I18N.t('actionViewDetails')}" onclick="AkkedShares.openProofModal('${s.id}')">
                          ${AkkedIcons.get('eye', { size: 15 })}
                        </button>
                        <button class="btn btn-secondary btn-sm" title="${I18N.t('actionCopyLink')}" onclick="AkkedShares.copyShareLink('${s.id}')">
                          ${AkkedIcons.get('link', { size: 15 })}
                        </button>
                        ${s.status === 'active' ? `
                          <button class="btn btn-outline-danger btn-sm" title="${I18N.t('actionRevoke')}" onclick="AkkedShares.confirmRevoke('${s.id}')">
                            ${AkkedIcons.get('ban', { size: 15 })}
                          </button>
                        ` : ''}
                      </div>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <!-- Mobile Stacked Cards View (< 768px) -->
          <div class="mobile-only-cards mobile-activity-cards" style="padding: 12px;">
            ${list.length === 0 ? `
              <div style="text-align: center; padding: 32px 16px; color: var(--text-muted);">
                <div style="margin-bottom: 8px; color: var(--brand-slate);">${AkkedIcons.get('folder', { size: 32 })}</div>
                <div style="font-weight: 700;">${I18N.t('noSharesFound')}</div>
              </div>
            ` : list.map(s => `
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

                <div class="mobile-card-field">
                  <span class="mobile-card-label">${I18N.t('colExpiryDate')}:</span>
                  <span class="mobile-card-value" style="font-size: 0.8rem; color: var(--text-muted);">${s.expiryDate}</span>
                </div>

                <div class="mobile-card-actions-row" style="display: grid; grid-template-columns: 1fr 1fr ${s.status === 'active' ? '1fr' : ''}; gap: 6px;">
                  <button class="btn btn-secondary btn-sm" style="justify-content: center; min-height: 40px; padding: 6px;" title="${I18N.t('actionViewDetails')}" onclick="AkkedShares.openProofModal('${s.id}')">
                    ${AkkedIcons.get('eye', { size: 14 })}
                    <span style="font-size: 0.78rem;">${isAr ? 'معاينة' : 'View'}</span>
                  </button>
                  <button class="btn btn-secondary btn-sm" style="justify-content: center; min-height: 40px; padding: 6px;" title="${I18N.t('actionCopyLink')}" onclick="AkkedShares.copyShareLink('${s.id}')">
                    ${AkkedIcons.get('link', { size: 14 })}
                    <span style="font-size: 0.78rem;">${isAr ? 'رابط' : 'Link'}</span>
                  </button>
                  ${s.status === 'active' ? `
                    <button class="btn btn-outline-danger btn-sm" style="justify-content: center; min-height: 40px; padding: 6px;" title="${I18N.t('actionRevoke')}" onclick="AkkedShares.confirmRevoke('${s.id}')">
                      ${AkkedIcons.get('ban', { size: 14 })}
                      <span style="font-size: 0.78rem;">${isAr ? 'إلغاء' : 'Revoke'}</span>
                    </button>
                  ` : ''}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  },

  setFilter(filter) {
    this.currentFilter = filter;
    AkkedApp.renderView();
  },

  handleSearch(val) {
    this.searchQuery = val;
    AkkedApp.renderView();
  },

  copyShareLink(id) {
    const isAr = I18N.currentLang === 'ar';
    const share = AkkedState.shares.find(s => s.id === id);
    if (!share) return;

    const token = AkkedCrypto.createProofToken(share);
    const origin = window.location.origin;
    const path = window.location.pathname;
    const directUrl = `${origin}${path}?verify=${encodeURIComponent(share.id)}&token=${token}`;
    
    // Check if on localhost to provide LAN IP alternative
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const lanUrl = isLocalhost ? `http://192.168.8.34:8000${path}?verify=${encodeURIComponent(share.id)}&token=${token}` : directUrl;

    const qrSvg = AkkedCrypto.generateQRCodeSVG(lanUrl, 150);

    // Auto copy primary link
    navigator.clipboard.writeText(lanUrl).then(() => {
      AkkedApp.showToast(I18N.t('copiedToClipboard'), 'success');
    }).catch(() => {});

    AkkedApp.openModal(`
      <div style="text-align: center; padding: 10px;">
        <div style="margin-bottom: 12px; color: var(--brand-slate);">${AkkedIcons.get('link', { size: 36 })}</div>
        <h3 style="font-size: 1.3rem; font-weight: 800; color: var(--brand-slate); margin-bottom: 6px;">
          ${isAr ? 'مشاركة رابط التحقق الذاتي' : 'Share Verification Link'}
        </h3>
        <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 20px; line-height: 1.4;">
          ${isAr ? 'يمكن لأي جهة أو هاتف فحص الإثبات فوراً عبر الرابط دون الحاجة لتثبيت أي تطبيق.' : 'Anyone opening this link can verify the proof assertion immediately without extra software.'}
        </p>

        <!-- QR Code for Mobile Scanning -->
        <div style="margin-bottom: 20px; display: flex; flex-direction: column; align-items: center;">
          <div style="padding: 10px; background: #FFF; border-radius: var(--radius-md); box-shadow: var(--shadow-sm); border: 1px solid var(--border-light);">
            ${qrSvg}
          </div>
          <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 8px; display: flex; align-items: center; justify-content: center; gap: 6px;">
            ${AkkedIcons.get('phone', { size: 14 })}
            <span>${isAr ? 'امسح الرمز بكاميرا الجوال للتحقق الفوري' : 'Scan QR with phone camera for instant verification'}</span>
          </div>
        </div>

        <!-- Copyable Link Input -->
        <div style="margin-bottom: 20px; text-align: start;">
          <label style="font-size: 0.82rem; font-weight: 700; color: var(--text-main); margin-bottom: 6px; display: block;">
            ${isAr ? 'رابط المشاركة المصرح به:' : 'Verifiable Link:'}
          </label>
          <div style="display: flex; gap: 8px;">
            <input type="text" readonly value="${lanUrl}" id="shareable-link-input" style="flex: 1; padding: 10px 14px; border: 1px solid var(--border-card); border-radius: var(--radius-md); font-size: 0.82rem; background-color: var(--brand-surface-subtle); color: var(--text-main); outline: none;">
            <button class="btn btn-primary btn-sm" onclick="document.getElementById('shareable-link-input').select(); navigator.clipboard.writeText('${lanUrl}'); AkkedApp.showToast('${I18N.t('copiedToClipboard')}', 'success');">
              ${AkkedIcons.get('copy', { size: 14 })}
              <span>${isAr ? 'نسخ' : 'Copy'}</span>
            </button>
          </div>
        </div>

        <div style="display: flex; gap: 10px; justify-content: center;">
          <button class="btn btn-secondary" onclick="AkkedApp.closeModal()">
            ${isAr ? 'إغلاق' : 'Close'}
          </button>
        </div>
      </div>
    `);
  },

  confirmRevoke(id) {
    const share = AkkedState.shares.find(s => s.id === id);
    if (!share) return;
    
    AkkedApp.openModal(`
      <div style="text-align: center; padding: 10px;">
        <div style="margin-bottom: 14px; color: var(--status-expired);">${AkkedIcons.get('alert-triangle', { size: 36 })}</div>
        <h3 style="font-size: 1.3rem; font-weight: 800; color: var(--status-danger); margin-bottom: 8px;">
          ${I18N.t('confirmRevokeTitle')}
        </h3>
        <p style="font-size: 0.92rem; color: var(--text-muted); margin-bottom: 24px; line-height: 1.5;">
          ${I18N.t('confirmRevokeDesc')}
        </p>
        <div style="display: flex; justify-content: center; gap: 12px;">
          <button class="btn btn-secondary" onclick="AkkedApp.closeModal()">${I18N.t('btnCancel')}</button>
          <button class="btn btn-primary" style="background-color: var(--status-danger);" onclick="AkkedShares.executeRevoke('${id}')">
            ${I18N.t('btnConfirmRevoke')}
          </button>
        </div>
      </div>
    `);
  },

  executeRevoke(id) {
    AkkedState.revokeShare(id);
    AkkedApp.closeModal();
    AkkedApp.showToast(I18N.t('proofRevokedToast'), 'info');
    AkkedApp.renderView();
  },

  openProofModal(id) {
    const isAr = I18N.currentLang === 'ar';
    const share = AkkedState.shares.find(s => s.id === id);
    if (!share) return;

    const qrSvg = AkkedCrypto.generateQRCodeSVG(share.id, 140);
    const docTemplate = AkkedSampleDocs.find(d => d.id === share.docType) || AkkedSampleDocs[0];
    const previewSvg = docTemplate.renderSVG(true, share.allowedFieldIds || ['age_calc'], share.watermark);

    AkkedApp.openModal(`
      <div style="display: flex; flex-direction: column; align-items: center; gap: 20px;">
        <!-- Card Replicating Visual Identity -->
        <div class="proof-mobile-mockup">
          <div class="proof-brand-header">
            <picture style="display: block; line-height: 0;">
              <source srcset="assets/akkid-logo.webp" type="image/webp">
              <img src="assets/akkid-logo.png" 
                   alt="أكّد - أثبت المطلوب، واحفظ الباقي" 
                   title="أكّد - أثبت المطلوب، واحفظ الباقي" 
                   class="official-akkid-logo" 
                   width="64" 
                   height="88" 
                   style="width: 64px; height: auto; display: block; object-fit: contain;">
            </picture>
            <span class="badge ${share.status === 'active' ? 'badge-active' : (share.status === 'expired' ? 'badge-expired' : 'badge-revoked')}" style="padding: 4px 10px; display: inline-flex; align-items: center; gap: 6px;">
              ${share.status === 'active' ? `
                <picture style="display: inline-flex; line-height: 0;">
                  <source srcset="assets/checkmark-verified-mint.webp" type="image/webp">
                  <img class="single-pulse-badge" src="assets/checkmark-verified-mint.png" alt="${isAr ? 'تم التحقق' : 'Verified'}" title="${isAr ? 'تم التحقق' : 'Verified'}" aria-label="${isAr ? 'تم التحقق' : 'Verified'}" width="14" height="14" style="width: 14px; height: 14px; object-fit: contain;">
                </picture>
                <span>${isAr ? 'تم التحقق' : 'Verified'}</span>
              ` : (share.status === 'expired' ? I18N.t('statusExpired') : I18N.t('statusRevoked'))}
            </span>
          </div>

          <div class="proof-main-icon">
            <picture style="display: inline-flex; line-height: 0;">
              <source srcset="assets/checkmark-verified-mint.webp" type="image/webp">
              <img class="single-pulse-badge" src="assets/checkmark-verified-mint.png" alt="${isAr ? 'تم التحقق' : 'Verified'}" title="${isAr ? 'تم التحقق' : 'Verified'}" aria-label="${isAr ? 'تم التحقق' : 'Verified'}" width="38" height="38" style="width: 38px; height: 38px; object-fit: contain;">
            </picture>
          </div>

          <div class="proof-title">
            ${isAr ? (share.id === 'DEMO-018' ? 'تم إثبات الأهلية' : 'إثبات معتمد وموثق') : 'Eligibility Proven'}
          </div>
          <div class="proof-subtitle">
            ${isAr ? share.sharedClaimsAr : share.sharedClaimsEn}
          </div>

          <div class="proof-badge-safe">
            ${AkkedIcons.get('shield-check', { size: 14 })}
            <span>${I18N.t('noExtraData')}</span>
          </div>

          <div class="proof-id-pill" style="display: inline-flex; align-items: center; gap: 6px;">
            <picture style="display: inline-flex; line-height: 0;">
              <source srcset="assets/proof-doc-${share.status === 'active' ? 'mint' : 'slate'}.webp" type="image/webp">
              <img src="assets/proof-doc-${share.status === 'active' ? 'mint' : 'slate'}.png" 
                   alt="${isAr ? 'الإثبات الرقمي' : 'Digital Proof'}" 
                   title="${isAr ? 'الإثبات الرقمي' : 'Digital Proof'}" 
                   aria-label="${isAr ? 'الإثبات الرقمي' : 'Digital Proof'}" 
                   width="15" 
                   height="15" 
                   style="width: 15px; height: 15px; object-fit: contain;">
            </picture>
            <span>${isAr ? 'الإثبات الرقمي:' : 'Digital Proof:'} ${share.id}</span>
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
              <span><strong>${isAr ? 'الجهة الطالبة:' : 'Requesting Organization:'}</strong> ${isAr ? share.recipientNameAr : share.recipientNameEn}</span>
            </div>
            <div><strong>${isAr ? 'الغرض:' : 'Purpose:'}</strong> ${isAr ? share.purposeNameAr : share.purposeNameEn}</div>
            <div><strong>${isAr ? 'ينتهي في:' : 'Expires:'}</strong> ${share.expiryDate}</div>
          </div>
        </div>

        <!-- Watermarked Document Preview Dropdown / Accordion -->
        <div style="width: 100%;">
          <div style="font-size: 0.9rem; font-weight: 700; color: var(--text-main); margin-bottom: 8px;">
            ${isAr ? 'معاينة الوثيقة المحمية بالعلامة المائية:' : 'Watermarked Document Preview:'}
          </div>
          <div style="max-height: 280px; overflow: hidden; border-radius: var(--radius-md); border: 1px solid var(--border-light);">
            ${previewSvg}
          </div>
        </div>

        <!-- Digital Digest -->
        <div style="width: 100%; background-color: var(--brand-surface-subtle); padding: 12px; border-radius: var(--radius-md); font-size: 0.75rem;">
          <div style="font-weight: 700; color: var(--brand-slate); margin-bottom: 2px;">${I18N.t('tamperHashLabel')}</div>
          <div style="font-family: monospace; word-break: break-all; color: var(--text-muted);">${share.sha256Hash}</div>
        </div>

        <div style="display: flex; gap: 12px; width: 100%; justify-content: flex-end;">
          <button class="btn btn-secondary" onclick="AkkedShares.copyShareLink('${share.id}')">
            ${AkkedIcons.get('link', { size: 14 })}
            <span>${I18N.t('btnCopyProofLink')}</span>
          </button>
          <button class="btn btn-primary" onclick="AkkedApp.navigate('verify', { proofId: '${share.id}' }); AkkedApp.closeModal();">
            ${AkkedIcons.get('search', { size: 14 })}
            <span>${I18N.t('btnVerifyNow')}</span>
          </button>
        </div>
      </div>
    `);
  }
};
