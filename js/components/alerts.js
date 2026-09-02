/**
 * Akked Security Alerts & Activity Timeline Component
 */

window.AkkedAlerts = {
  render() {
    const isAr = I18N.currentLang === 'ar';
    const alerts = AkkedState.alerts || [];

    return `
      <div class="alerts-view animate-fade-in" style="max-width: 860px; margin: 0 auto;">
        <!-- Header -->
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; margin-bottom: 24px;">
          <div>
            <h1 style="font-size: 1.6rem; font-weight: 800; color: var(--text-main); display: flex; align-items: center; gap: 10px;">
              <picture style="display: inline-flex; line-height: 0;">
                <source srcset="assets/history-activity-slate.webp" type="image/webp">
                <img src="assets/history-activity-slate.png" 
                     alt="${isAr ? 'أحدث الأنشطة والموافقات' : 'Recent Activity'}" 
                     title="${isAr ? 'أحدث الأنشطة والموافقات' : 'Recent Activity'}" 
                     aria-label="${isAr ? 'أحدث الأنشطة والموافقات' : 'Recent Activity'}" 
                     width="26" 
                     height="26" 
                     style="width: 26px; height: 26px; object-fit: contain;">
              </picture>
              <span>${I18N.t('alertsPageTitle')}</span>
            </h1>
            <p style="font-size: 0.9rem; color: var(--text-muted); margin-top: 4px;">${I18N.t('alertsPageSubtitle')}</p>
          </div>
          <button class="btn btn-secondary btn-sm" style="display: inline-flex; align-items: center; gap: 6px;" onclick="AkkedAlerts.markAllRead()">
            ${AkkedIcons.get('check', { size: 14, strokeWidth: 2.5 })}
            <span>${I18N.t('btnMarkAllRead')}</span>
          </button>
        </div>

        <!-- Timeline Card -->
        <div class="card" style="padding: 24px;">
          <div class="activity-timeline">
            ${alerts.length === 0 ? `
              <div style="text-align: center; padding: 40px 20px; color: var(--text-muted);">
                <div style="margin-bottom: 8px; color: var(--brand-slate);">${AkkedIcons.get('bell', { size: 36 })}</div>
                <div style="font-weight: 700;">${isAr ? 'لا توجد تنبيهات جديدة' : 'No alerts recorded'}</div>
              </div>
            ` : alerts.map(alt => {
              let icon = AkkedIcons.get('bell', { size: 18 });
              let iconBg = 'var(--brand-surface-tint)';
              let iconColor = 'var(--brand-slate)';

              if (alt.type === 'verification') {
                icon = AkkedIcons.get('shield-check', { size: 18 });
                iconBg = 'var(--status-active-bg)';
                iconColor = 'var(--status-active)';
              } else if (alt.type === 'expiry') {
                icon = AkkedIcons.get('clock', { size: 18 });
                iconBg = 'var(--status-expired-bg)';
                iconColor = 'var(--status-expired)';
              } else if (alt.type === 'revoked') {
                icon = AkkedIcons.get('ban', { size: 18 });
                iconBg = 'var(--status-expired-bg)';
                iconColor = 'var(--status-expired)';
              } else if (alt.type === 'security') {
                icon = AkkedIcons.get('shield-alert', { size: 18 });
                iconBg = 'var(--brand-surface-tint)';
                iconColor = 'var(--brand-slate)';
              }

              return `
                <div class="timeline-item" style="opacity: ${alt.read ? '0.75' : '1'};">
                  <div class="timeline-icon-wrap" style="background-color: ${iconBg}; color: ${iconColor}; display: flex; align-items: center; justify-content: center;">
                    ${icon}
                  </div>
                  <div class="timeline-content">
                    <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px;">
                      <div class="timeline-title">${isAr ? alt.titleAr : alt.titleEn}</div>
                      <span class="timeline-meta">${alt.timestamp}</span>
                    </div>
                    <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 4px; line-height: 1.4;">
                      ${isAr ? alt.descAr : alt.descEn}
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;
  },

  markAllRead() {
    AkkedState.alerts.forEach(a => a.read = true);
    AkkedState.save();
    AkkedApp.renderView();
    AkkedApp.updateNotificationBadge();
  }
};
