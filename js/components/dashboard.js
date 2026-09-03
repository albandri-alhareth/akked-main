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
        <!-- Clean, Open Introduction Section -->
        <div class="intro-section">
          <h1 class="intro-heading">
            ${I18N.t('introHeading')}
          </h1>
          
          <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap; margin-top: 14px;">
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
              <span>${I18N.t('btnCreateProof')}</span>
            </button>
            <button class="btn btn-secondary" onclick="AkkedApp.navigate('shares')">
              ${AkkedIcons.get('folder', { size: 16 })}
              <span>${I18N.t('viewAllShares')}</span>
            </button>
          </div>
        </div>

        <!-- Pending Incoming Requests Banner (if any) -->
        ${AkkedState.getPendingRequests().length > 0 ? `
          <div class="card animate-fade-in" style="margin-bottom: 24px; border: 1.5px solid var(--brand-primary-border); background: linear-gradient(135deg, var(--brand-primary-light) 0%, var(--bg-card) 100%);">
            <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 14px; margin-bottom: 12px;">
              <div style="display: flex; align-items: center; gap: 10px;">
                <div style="width: 38px; height: 38px; border-radius: var(--radius-md); background: var(--brand-primary); color: #FFF; display: flex; align-items: center; justify-content: center;">
                  ${AkkedIcons.get('bell', { size: 20 })}
                </div>
                <div>
                  <h3 style="font-size: 1.05rem; font-weight: 800; color: var(--brand-primary); margin: 0;">
                    ${isAr ? 'طلبات مشاركة بيانات وتجديد معلقة' : 'Pending Sharing & Renewal Requests'}
                  </h3>
                  <p style="font-size: 0.82rem; color: var(--text-muted); margin: 0;">
                    ${isAr ? 'يمكنك الموافقة أو الرفض صوتياً أو عبر النقر المباشر' : 'Approve or reject via voice command or direct click'}
                  </p>
                </div>
              </div>
              <span class="badge badge-warning">${AkkedState.getPendingRequests().length} ${isAr ? 'طلبات معلقة' : 'Pending'}</span>
            </div>

            <div style="display: flex; flex-direction: column; gap: 10px;">
              ${AkkedState.getPendingRequests().map(req => `
                <div style="background: var(--bg-card); border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 14px 18px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;">
                  <div>
                    <div style="font-weight: 800; font-size: 0.95rem; color: var(--text-main);">
                      ${isAr ? (req.recipientNameAr || req.providerNameAr) : (req.recipientNameEn || req.providerNameEn)}
                    </div>
                    <div style="font-size: 0.84rem; color: var(--brand-slate); margin-top: 2px;">
                      ${isAr ? req.purposeAr : req.purposeEn}
                    </div>
                    <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 2px;">
                      ${isAr ? 'البيانات المطلوبة: ' + (req.requestedDataAr) : 'Requested Data: ' + (req.requestedDataEn)}
                    </div>
                  </div>

                  <div style="display: flex; gap: 8px;">
                    <button class="btn btn-primary btn-sm" onclick="AkkedState.approveRequest('${req.id}'); AkkedApp.renderView(); AkkedApp.showToast(I18N.currentLang === 'ar' ? 'تمت الموافقة بنجاح' : 'Approved successfully', 'success');">
                      ${AkkedIcons.get('check', { size: 14, strokeWidth: 2.5 })}
                      <span>${isAr ? 'موافقة' : 'Approve'}</span>
                    </button>
                    <button class="btn btn-secondary btn-sm" onclick="AkkedState.rejectRequest('${req.id}'); AkkedApp.renderView(); AkkedApp.showToast(I18N.currentLang === 'ar' ? 'تم رفض الطلب' : 'Rejected', 'warning');">
                      <span>${isAr ? 'رفض' : 'Reject'}</span>
                    </button>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- 4 KPI Stat Cards with Verified Vector Outline Icons in One Row -->
        <div class="grid-container grid-cols-4 summary-kpi-row" style="margin-bottom: 28px;">
          <!-- Active Shares: Connected Share-Nodes Icon -->
          <div class="card summary-kpi-card" style="display: flex; align-items: center; gap: 16px;">
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
              <div style="font-size: 0.82rem; font-weight: 600; color: var(--text-muted); margin-bottom: 2px;">${I18N.t('statActiveShares')}</div>
              <div class="stat-kpi-number" style="font-size: 1.28rem; font-weight: 800; color: var(--brand-primary); line-height: 1.2;">${activeShares.length}</div>
            </div>
          </div>

          <!-- Expired Shares -->
          <div class="card summary-kpi-card" style="display: flex; align-items: center; gap: 16px;">
            <div class="stat-icon-container" style="background-color: var(--status-expired-bg); color: var(--status-expired); border: 1px solid var(--status-expired-border);">
              ${AkkedIcons.get('clock', { size: 22, strokeWidth: 2 })}
            </div>
            <div>
              <div style="font-size: 0.82rem; font-weight: 600; color: var(--text-muted); margin-bottom: 2px;">${I18N.t('statExpiredShares')}</div>
              <div class="stat-kpi-number" style="font-size: 1.28rem; font-weight: 800; color: var(--brand-primary); line-height: 1.2;">${expiredShares.length}</div>
            </div>
          </div>

          <!-- Organizations That Accessed Data -->
          <div class="card summary-kpi-card" style="display: flex; align-items: center; gap: 16px;">
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
              <div style="font-size: 0.82rem; font-weight: 600; color: var(--text-muted); margin-bottom: 2px;">${I18N.t('statAccessedEntities')}</div>
              <div class="stat-kpi-number" style="font-size: 1.28rem; font-weight: 800; color: var(--brand-primary); line-height: 1.2;">${uniqueEntitiesCount}</div>
            </div>
          </div>

          <!-- Privacy Protection Score -->
          <div class="card summary-kpi-card" style="display: flex; align-items: center; gap: 16px;">
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
              <div style="font-size: 0.82rem; font-weight: 600; color: var(--text-muted); margin-bottom: 2px;">${I18N.t('statPrivacyHealth')}</div>
              <div class="stat-gauge-wrap" style="position: relative; display: inline-flex; align-items: center; justify-content: center; width: 56px; height: 56px; flex-shrink: 0;">
                <svg width="56" height="56" viewBox="0 0 56 56" style="position: absolute; inset: 0; transform: rotate(-90deg); transform-origin: center; pointer-events: none;">
                  <circle cx="28" cy="28" r="25" stroke="var(--border-light)" stroke-width="2.5" fill="none" />
                  <circle cx="28" cy="28" r="25" stroke="var(--brand-accent)" stroke-width="2.5" fill="none" 
                    stroke-linecap="round" stroke-dasharray="157.08" stroke-dashoffset="9.42" />
                </svg>
                <span class="stat-kpi-number" style="position: relative; z-index: 2; display: flex; align-items: center; justify-content: center; font-size: 1.28rem; font-weight: 800; color: var(--brand-primary); line-height: 1; direction: ltr; margin: 0;">${avgPrivacyScore}%</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Shares Activity Section (Full Width) -->
        <div class="grid-container grid-cols-12 dashboard-main-grid">
          <!-- Recent Shares -->
          <div class="card dashboard-activity-col" style="grid-column: span 12; width: 100%;">
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
                               alt="${I18N.t('colRecipient')}" 
                               title="${I18N.t('colRecipient')}" 
                               aria-label="${I18N.t('colRecipient')}" 
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
                               alt="${I18N.t('colSharedData')}" 
                               title="${I18N.t('colSharedData')}" 
                               aria-label="${I18N.t('colSharedData')}" 
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
                                 alt="${I18N.t('colRecipient')}" 
                                 title="${I18N.t('colRecipient')}" 
                                 aria-label="${I18N.t('colRecipient')}" 
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
                        <span class="badge ${s.status === 'active' ? 'badge-active' : (s.status === 'expired' ? 'badge-expired' : 'badge-revoked')}">
                          ${s.status === 'active' ? (isAr ? 'مؤهل فقط' : 'Eligible only') : (s.status === 'expired' ? I18N.t('statusExpired') : I18N.t('statusRevoked'))}
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
                             alt="${I18N.t('colRecipient')}" 
                             width="15" height="15" 
                             style="width: 15px; height: 15px; object-fit: contain;">
                      </picture>
                      <span>${isAr ? s.recipientNameAr : s.recipientNameEn}</span>
                    </div>
                    <span class="badge ${s.status === 'active' ? 'badge-active' : (s.status === 'expired' ? 'badge-expired' : 'badge-revoked')}">
                      ${s.status === 'active' ? (isAr ? 'مؤهل فقط' : 'Eligible only') : (s.status === 'expired' ? I18N.t('statusExpired') : I18N.t('statusRevoked'))}
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
                        <img src="assets/eye-disclosed-slate.png" alt="${I18N.t('colSharedData')}" width="14" height="14" style="width: 14px; height: 14px; object-fit: contain;">
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
        </div>
      </div>
    `;
  }
};
