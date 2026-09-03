/**
 * Akked Trusted Entities Component
 */

window.AkkedEntities = {
  render() {
    const isAr = I18N.currentLang === 'ar';
    const entities = AkkedState.entities || [];

    return `
      <div class="entities-view animate-fade-in">
        <!-- Header -->
        <div style="margin-bottom: 24px;">
          <h1 style="font-size: 1.6rem; font-weight: 800; color: var(--text-main);">${I18N.t('entitiesPageTitle')}</h1>
          <p style="font-size: 0.9rem; color: var(--text-muted); margin-top: 4px;">${I18N.t('entitiesPageSubtitle')}</p>
        </div>

        <!-- Entity Cards Grid -->
        <div class="grid-container grid-cols-2">
          ${entities.map(ent => `
            <div class="card" style="display: flex; flex-direction: column; justify-content: space-between; gap: 16px;">
              <div>
                <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; margin-bottom: 14px;">
                  <div style="display: flex; align-items: center; gap: 14px;">
                    <div style="width: 48px; height: 48px; border-radius: var(--radius-md); background: var(--brand-slate-light); display: flex; align-items: center; justify-content: center; border: 1px solid var(--brand-slate-border); flex-shrink: 0;" aria-label="${isAr ? 'الجهة الطالبة' : 'Requesting Organization'}" role="img">
                      <picture style="display: inline-flex; line-height: 0;">
                        <source srcset="assets/building-org-slate.webp" type="image/webp">
                        <img src="assets/building-org-slate.png" 
                             alt="${isAr ? 'الجهة الطالبة' : 'Requesting Organization'}" 
                             title="${isAr ? 'الجهة الطالبة' : 'Requesting Organization'}" 
                             aria-label="${isAr ? 'الجهة الطالبة' : 'Requesting Organization'}" 
                             width="24" 
                             height="24" 
                             style="width: 24px; height: 24px; object-fit: contain;">
                      </picture>
                    </div>
                    <div>
                      <div style="font-weight: 800; font-size: 1.05rem; color: var(--brand-slate);">
                        ${isAr ? ent.nameAr : ent.nameEn}
                      </div>
                      <div style="font-size: 0.8rem; color: var(--text-muted);">
                        ${isAr ? ent.categoryAr : ent.categoryEn}
                      </div>
                    </div>
                  </div>

                  <span class="badge badge-active">
                    <span>${ent.trustScore}% ${isAr ? 'موثوق' : 'Verified'}</span>
                  </span>
                </div>


                <div style="display: flex; align-items: center; justify-content: space-between; font-size: 0.82rem; color: var(--text-muted);">
                  <span>${I18N.t('entityTotalShares')}: <strong>${ent.totalShares}</strong></span>
                  <span style="color: var(--status-active); font-weight: 700;">
                    <span>${isAr ? 'ممتثل لنظام حماية البيانات (PDPL)' : 'PDPL Compliant'}</span>
                  </span>
                </div>
              </div>

              <div style="border-top: 1px solid var(--border-light); padding-top: 14px;">
                <button class="btn btn-secondary" style="width: 100%; display: inline-flex; align-items: center; justify-content: center; gap: 8px;" onclick="AkkedWizard.init(); AkkedWizard.selectedRecipientId = '${ent.id}'; AkkedApp.navigate('wizard');">
                  ${AkkedIcons.get('plus', { size: 15, strokeWidth: 2 })}
                  <span>${I18N.t('btnQuickShareToEntity')}</span>
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
};
