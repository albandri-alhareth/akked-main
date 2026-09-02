/**
 * Akked System & Privacy Settings Component
 */

window.AkkedSettings = {
  activeTab: 'privacy',

  render() {
    const isAr = I18N.currentLang === 'ar';
    const settings = AkkedState.settings;

    return `
      <div class="settings-view animate-fade-in" style="max-width: 860px; margin: 0 auto;">
        <!-- Header -->
        <div style="margin-bottom: 24px;">
          <h1 style="font-size: 1.6rem; font-weight: 800; color: var(--text-main);">${I18N.t('settingsPageTitle')}</h1>
          <p style="font-size: 0.9rem; color: var(--text-muted); margin-top: 4px;">${I18N.t('settingsPageSubtitle')}</p>
        </div>

        <!-- Settings Tabs -->
        <div style="display: flex; gap: 8px; margin-bottom: 24px; flex-wrap: wrap;">
          <button class="btn ${this.activeTab === 'privacy' ? 'btn-primary' : 'btn-secondary'} btn-sm" onclick="AkkedSettings.setTab('privacy')">
            ${AkkedIcons.get('shield-check', { size: 14 })}
            <span>${I18N.t('tabPrivacy')}</span>
          </button>
          <button class="btn ${this.activeTab === 'team' ? 'btn-primary' : 'btn-secondary'} btn-sm" onclick="AkkedSettings.setTab('team')">
            ${AkkedIcons.get('users', { size: 14 })}
            <span>${isAr ? 'فريق العمل وصلاحيات التعديل' : 'Team & Collaborators'}</span>
          </button>
          <button class="btn ${this.activeTab === 'general' ? 'btn-primary' : 'btn-secondary'} btn-sm" onclick="AkkedSettings.setTab('general')">
            ${AkkedIcons.get('settings', { size: 14 })}
            <span>${I18N.t('tabGeneral')}</span>
          </button>
          <button class="btn ${this.activeTab === 'security' ? 'btn-primary' : 'btn-secondary'} btn-sm" onclick="AkkedSettings.setTab('security')">
            ${AkkedIcons.get('key', { size: 14 })}
            <span>${I18N.t('tabSecurity')}</span>
          </button>
        </div>

        <!-- Privacy Tab Content -->
        ${this.activeTab === 'privacy' ? `
          <div class="card" style="padding: 28px; margin-bottom: 24px;">
            <h2 style="font-size: 1.15rem; font-weight: 700; color: var(--text-main); margin-bottom: 20px;">
              ${I18N.t('tabPrivacy')}
            </h2>

            <!-- Strict Mode Toggle -->
            <div style="display: flex; align-items: center; justify-content: space-between; padding: 16px 0; border-bottom: 1px solid var(--border-light);">
              <div style="max-width: 580px;">
                <div style="font-weight: 700; color: var(--text-main); font-size: 0.95rem;">${I18N.t('strictModeToggle')}</div>
                <div style="font-size: 0.82rem; color: var(--text-muted); margin-top: 2px;">${I18N.t('strictModeDesc')}</div>
              </div>
              <input type="checkbox" id="setting-strict" ${settings.strictMode ? 'checked' : ''} style="width: 22px; height: 22px; accent-color: var(--brand-primary); cursor: pointer;" onchange="AkkedSettings.updateStrict(this.checked)">
            </div>

            <!-- Watermark Density Setting -->
            <div style="padding: 20px 0; border-bottom: 1px solid var(--border-light);">
              <div style="font-weight: 700; color: var(--text-main); font-size: 0.95rem; margin-bottom: 8px;">${I18N.t('watermarkDensitySetting')}</div>
              <div style="display: flex; gap: 12px; flex-wrap: wrap;">
                <label style="display: flex; align-items: center; gap: 8px; font-size: 0.88rem; cursor: pointer;">
                  <input type="radio" name="watermarkDensity" value="medium" ${settings.watermarkDensity === 'medium' ? 'checked' : ''} onchange="AkkedSettings.updateDensity(this.value)">
                  <span>${I18N.t('mediumWatermark')}</span>
                </label>
                <label style="display: flex; align-items: center; gap: 8px; font-size: 0.88rem; cursor: pointer;">
                  <input type="radio" name="watermarkDensity" value="dense" ${settings.watermarkDensity === 'dense' ? 'checked' : ''} onchange="AkkedSettings.updateDensity(this.value)">
                  <span>${I18N.t('denseWatermark')}</span>
                </label>
                <label style="display: flex; align-items: center; gap: 8px; font-size: 0.88rem; cursor: pointer;">
                  <input type="radio" name="watermarkDensity" value="subtle" ${settings.watermarkDensity === 'subtle' ? 'checked' : ''} onchange="AkkedSettings.updateDensity(this.value)">
                  <span>${I18N.t('subtleWatermark')}</span>
                </label>
              </div>
            </div>

            <!-- Default Expiration -->
            <div style="padding: 20px 0;">
              <div style="font-weight: 700; color: var(--text-main); font-size: 0.95rem; margin-bottom: 8px;">${I18N.t('defaultDurationSetting')}</div>
              <select class="btn btn-secondary" onchange="AkkedSettings.updateDefaultDuration(this.value)">
                <option value="5_min" ${settings.defaultDuration === '5_min' ? 'selected' : ''}>${I18N.t('duration5Min')}</option>
                <option value="1_hour" ${settings.defaultDuration === '1_hour' ? 'selected' : ''}>${I18N.t('duration1Hour')}</option>
                <option value="24_hours" ${settings.defaultDuration === '24_hours' ? 'selected' : ''}>${I18N.t('duration24Hours')}</option>
                <option value="7_days" ${settings.defaultDuration === '7_days' ? 'selected' : ''}>${I18N.t('duration7Days')}</option>
              </select>
            </div>
          </div>
        ` : (this.activeTab === 'team' ? `
          <div class="card" style="padding: 28px; margin-bottom: 24px;">
            <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-bottom: 20px;">
              <div>
                <h2 style="font-size: 1.15rem; font-weight: 700; color: var(--text-main);">
                  ${isAr ? 'أعضاء فريق المشروع وصلاحيات التعديل' : 'Project Team & Editor Permissions'}
                </h2>
                <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 2px;">
                  ${isAr ? 'تم منح صلاحيات التعديل الكاملة والمشاركة للأعضاء التاليين:' : 'Full edit and sharing access granted to the following team members:'}
                </p>
              </div>
              <button class="btn btn-secondary btn-sm" onclick="AkkedSettings.copyInviteLink()">
                ${AkkedIcons.get('copy', { size: 14 })}
                <span>${isAr ? 'نسخ دعوة المشروع' : 'Copy Project Invite'}</span>
              </button>
            </div>

            <div style="display: flex; flex-direction: column; gap: 12px;">
              ${(settings.teamMembers || []).map(m => `
                <div style="display: flex; align-items: center; justify-content: space-between; padding: 14px 18px; border-radius: var(--radius-md); border: 1px solid var(--border-card); background: var(--bg-card); flex-wrap: wrap; gap: 10px;">
                  <div style="display: flex; align-items: center; gap: 12px;">
                    <div style="width: 40px; height: 40px; border-radius: 50%; background: var(--brand-slate); color: #FFF; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.95rem;">
                      ${m.nameAr.charAt(0)}
                    </div>
                    <div>
                      <div style="font-weight: 700; color: var(--text-main); font-size: 0.95rem;">
                        ${isAr ? m.nameAr : m.nameEn}
                      </div>
                      <div style="font-size: 0.8rem; color: var(--text-muted); font-family: monospace;">
                        ${m.email}
                      </div>
                    </div>
                  </div>

                  <div style="display: flex; align-items: center; gap: 8px;">
                    <span class="badge badge-active" style="display: inline-flex; align-items: center; gap: 6px;">
                      ${AkkedIcons.get('check', { size: 12, strokeWidth: 2.5 })}
                      <span>${isAr ? 'صلاحية تعديل ومشاركة كاملة' : 'Full Edit & Share Access'}</span>
                    </span>
                    <span style="font-size: 0.78rem; color: var(--brand-slate); font-weight: 700;">
                      ${m.role}
                    </span>
                  </div>
                </div>
              `).join('')}
            </div>

            <div style="margin-top: 20px; background: var(--brand-surface-subtle); border-radius: var(--radius-md); padding: 14px; border: 1px solid var(--border-light); font-size: 0.82rem; color: var(--text-muted); display: flex; align-items: flex-start; gap: 8px;">
              <span style="color: var(--brand-slate); padding-top: 2px;">${AkkedIcons.get('info', { size: 14 })}</span>
              <div>
                ${isAr ? 'يمكن لزميلاتك في الفريق فتح الموقع عبر الرابط المحلي أو استيراد حزمة الكود المعدة:' : 'Your teammates can access the live platform or download the source code zip bundle:'}
                <div style="font-family: monospace; font-weight: 700; color: var(--brand-slate); margin-top: 4px;">
                  http://192.168.8.34:8000
                </div>
              </div>
            </div>
          </div>
        ` : (this.activeTab === 'general' ? `
          <div class="card" style="padding: 28px; margin-bottom: 24px;">
            <h2 style="font-size: 1.15rem; font-weight: 700; color: var(--text-main); margin-bottom: 20px;">
              ${I18N.t('tabGeneral')}
            </h2>

            <div style="display: flex; align-items: center; justify-content: space-between; padding: 16px 0; border-bottom: 1px solid var(--border-light);">
              <div>
                <div style="font-weight: 700; color: var(--text-main); font-size: 0.95rem;">${isAr ? 'لغة الواجهة (Language)' : 'Interface Language'}</div>
                <div style="font-size: 0.82rem; color: var(--text-muted); margin-top: 2px;">${isAr ? 'التبديل الفوري بين العربية (RTL) والإنجليزية (LTR)' : 'Switch instantly between Arabic (RTL) and English (LTR)'}</div>
              </div>
              <button class="btn btn-secondary" style="display: inline-flex; align-items: center; gap: 8px;" onclick="AkkedApp.toggleLanguage()">
                ${AkkedIcons.get('globe', { size: 15 })}
                <span>${I18N.currentLang === 'ar' ? 'English (LTR)' : 'العربية (RTL)'}</span>
              </button>
            </div>

            <div style="display: flex; align-items: center; justify-content: space-between; padding: 16px 0;">
              <div>
                <div style="font-weight: 700; color: var(--text-main); font-size: 0.95rem;">${isAr ? 'المظهر (Theme)' : 'Color Theme'}</div>
                <div style="font-size: 0.82rem; color: var(--text-muted); margin-top: 2px;">${isAr ? 'الوضع الداكن والفاتح المتناسق مع الهوية' : 'Dark Mode / Light Mode with brand palette'}</div>
              </div>
              <button class="btn btn-secondary" style="display: inline-flex; align-items: center; gap: 8px;" onclick="AkkedApp.toggleTheme()">
                ${AkkedIcons.get('theme-toggle', { size: 15 })}
                <span>${I18N.t('switchTheme')}</span>
              </button>
            </div>
          </div>
        ` : `
          <div class="card" style="padding: 28px; margin-bottom: 24px;">
            <h2 style="font-size: 1.15rem; font-weight: 700; color: var(--text-main); margin-bottom: 20px;">
              ${I18N.t('tabSecurity')}
            </h2>

            <div style="background-color: var(--brand-surface-subtle); padding: 16px; border-radius: var(--radius-md); border: 1px solid var(--border-light); margin-bottom: 20px;">
              <div style="font-weight: 700; color: var(--brand-slate); margin-bottom: 4px;">WebCrypto Hardware Sandbox</div>
              <p style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.4;">
                ${isAr ? 'يتم توليد البصمات والمفاتيح محلياً عبر واجهة Web Cryptography API دون الاعتماد على مفاتيح سحابية.' : 'Keys and proof hashes are generated using the native Web Cryptography API locally on your device.'}
              </p>
            </div>

            <div style="padding-top: 10px;">
              <button class="btn btn-outline-danger" style="display: inline-flex; align-items: center; gap: 8px;" onclick="AkkedSettings.confirmResetAll()">
                ${AkkedIcons.get('alert-triangle', { size: 14 })}
                <span>${I18N.t('btnResetAll')}</span>
              </button>
            </div>
          </div>
        `)}

        <div style="display: flex; justify-content: flex-end;">
          <button class="btn btn-primary btn-lg" style="display: inline-flex; align-items: center; gap: 8px;" onclick="AkkedSettings.savePreferences()">
            ${AkkedIcons.get('check', { size: 16, strokeWidth: 2.5 })}
            <span>${I18N.t('btnSaveSettings')}</span>
          </button>
        </div>
      </div>
    `;
  },

  copyInviteLink() {
    const isAr = I18N.currentLang === 'ar';
    const inviteText = isAr 
      ? `مرحباً! تمت دعوتكم للمشاركة في مشروع: "أكد (Akked) - حارس البيانات والموافقات".\n\nرابط الموقع المباشر: http://192.168.8.34:8000\nملف المشروع الكامل (ZIP): akked_project.zip`
      : `Hello! You've been invited to collaborate on: "Akked - Personal Data & Consent Guardian".\n\nLive Link: http://192.168.8.34:8000\nSource Zip Bundle: akked_project.zip`;
    
    navigator.clipboard.writeText(inviteText).then(() => {
      AkkedApp.showToast(I18N.t('copiedToClipboard'), 'success');
    }).catch(() => {});
  },

  setTab(tab) {
    this.activeTab = tab;
    AkkedApp.renderView();
  },

  updateStrict(checked) {
    AkkedState.settings.strictMode = checked;
  },

  updateDensity(val) {
    AkkedState.settings.watermarkDensity = val;
  },

  updateDefaultDuration(val) {
    AkkedState.settings.defaultDuration = val;
  },

  savePreferences() {
    AkkedState.save();
    AkkedApp.showToast(I18N.t('settingsSavedToast'), 'success');
  },

  confirmResetAll() {
    const isAr = I18N.currentLang === 'ar';
    AkkedApp.openModal(`
      <div style="text-align: center; padding: 10px;">
        <div style="margin-bottom: 14px; color: var(--status-danger);">${AkkedIcons.get('alert-triangle', { size: 36 })}</div>
        <h3 style="font-size: 1.3rem; font-weight: 800; color: var(--status-danger); margin-bottom: 8px;">
          ${isAr ? 'إعادة ضبط المصنع؟' : 'Factory Reset All Data?'}
        </h3>
        <p style="font-size: 0.92rem; color: var(--text-muted); margin-bottom: 24px;">
          ${isAr ? 'سيتم استعادة البيانات والتهيئات الافتراضية للنظام.' : 'This will reset all data back to factory demo settings.'}
        </p>
        <div style="display: flex; justify-content: center; gap: 12px;">
          <button class="btn btn-secondary" onclick="AkkedApp.closeModal()">${I18N.t('btnCancel')}</button>
          <button class="btn btn-primary" style="background-color: var(--status-danger);" onclick="AkkedState.resetToDefaults(); AkkedApp.closeModal(); AkkedApp.showToast('تمت إعادة التعيين بنجاح', 'info'); AkkedApp.renderView();">
            ${isAr ? 'نعم، أعد التعيين' : 'Yes, Reset'}
          </button>
        </div>
      </div>
    `);
  }
};
