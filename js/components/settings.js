/**
 * Akked Settings Component - Redesigned
 * Contains:
 * 1. User Account / Profile
 * 2. Notification Preferences with enable/disable controls
 * 3. Light Mode / Dark Mode switcher
 * 4. Accessibility Mode (Spoken announcements, external notifications, contrast aids)
 */

window.AkkedSettings = {
  activeTab: 'profile',

  render() {
    const isAr = I18N.currentLang === 'ar';
    const settings = AkkedState.settings;
    const profile = settings.profile || {};
    const notifs = settings.notifications || {};
    const access = settings.accessibility || {};
    const currentTheme = settings.theme || 'light';

    return `
      <div class="settings-view animate-fade-in" style="max-width: 900px; margin: 0 auto;">
        
        <!-- Header -->
        <div style="margin-bottom: 24px;">
          <h1 style="font-size: 1.6rem; font-weight: 800; color: var(--text-main);">${I18N.t('settingsPageTitle')}</h1>
          <p style="font-size: 0.9rem; color: var(--text-muted); margin-top: 4px;">${I18N.t('settingsPageSubtitle')}</p>
        </div>

        <!-- Clean Navigation Tabs -->
        <div class="settings-nav-tabs" style="display: flex; gap: 8px; margin-bottom: 26px; flex-wrap: wrap;">
          <button class="btn ${this.activeTab === 'profile' ? 'btn-primary' : 'btn-secondary'} btn-sm" onclick="AkkedSettings.setTab('profile')">
            ${AkkedIcons.get('user-check', { size: 15 })}
            <span>${I18N.t('settingsProfileTab')}</span>
          </button>
          
          <button class="btn ${this.activeTab === 'notifications' ? 'btn-primary' : 'btn-secondary'} btn-sm" onclick="AkkedSettings.setTab('notifications')">
            ${AkkedIcons.get('bell', { size: 15 })}
            <span>${I18N.t('settingsNotifTab')}</span>
          </button>

          <button class="btn ${this.activeTab === 'theme' ? 'btn-primary' : 'btn-secondary'} btn-sm" onclick="AkkedSettings.setTab('theme')">
            ${AkkedIcons.get('theme-toggle', { size: 15 })}
            <span>${I18N.t('settingsThemeTab')}</span>
          </button>

          <button class="btn ${this.activeTab === 'accessibility' ? 'btn-primary' : 'btn-secondary'} btn-sm" onclick="AkkedSettings.setTab('accessibility')">
            ${AkkedIcons.get('shield-check', { size: 15 })}
            <span>${I18N.t('settingsAccessTab')}</span>
          </button>
        </div>

        <!-- Tab 1: User Account / Profile -->
        ${this.activeTab === 'profile' ? `
          <div class="card settings-card animate-fade-in" style="padding: 28px; margin-bottom: 24px;">
            <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--border-light); padding-bottom: 18px; margin-bottom: 22px; flex-wrap: wrap; gap: 14px;">
              <div style="display: flex; align-items: center; gap: 16px;">
                <!-- Profile Picture Upload (Clean Circular Area with Attached Purple Icon) -->
                <div class="profile-pic-upload-container">
                  <input 
                    type="file" 
                    id="profile-pic-file-input" 
                    accept="image/png, image/jpeg, image/webp, image/*" 
                    style="display: none;" 
                    onchange="AkkedSettings.handleAvatarUpload(event)" 
                    aria-label="${isAr ? 'إضافة صورة شخصية' : 'Add profile picture'}">
                  <button 
                    type="button" 
                    class="profile-pic-upload-btn" 
                    id="profile-pic-upload-btn"
                    onclick="document.getElementById('profile-pic-file-input').click()" 
                    aria-label="${isAr ? 'إضافة صورة شخصية' : 'Add profile picture'}" 
                    title="${isAr ? 'إضافة صورة شخصية' : 'Add profile picture'}">
                    ${profile.avatarUrl ? `
                      <img src="${profile.avatarUrl}" alt="${isAr ? 'صورة الملف الشخصي' : 'Profile Picture'}" class="profile-pic-img">
                    ` : `
                      <img src="assets/profile-user-icon.png" alt="${isAr ? 'إضافة صورة شخصية' : 'Add profile picture'}" class="profile-pic-default-icon">
                    `}
                  </button>
                </div>
                <div>
                  <h2 style="font-size: 1.15rem; font-weight: 800; color: var(--text-main); margin-bottom: 2px;">
                    ${(isAr ? profile.nameAr : profile.nameEn) || (isAr ? 'الملف الشخصي' : 'User Profile')}
                  </h2>
                  <div style="font-size: 0.84rem; color: var(--text-muted);">
                    ${profile.email || (isAr ? 'لم يُسجل بريد إلكتروني بعد' : 'No email address')}
                  </div>
                </div>
              </div>

              <div style="display: flex; align-items: center; gap: 8px;">
                <span class="badge badge-active">
                  <span>${I18N.t('profileVerifiedStatus')}</span>
                </span>
              </div>
            </div>

            <!-- Profile Form (No fake values, exact placeholders) -->
            <div class="grid-container grid-cols-2" style="gap: 18px; margin-bottom: 22px;">
              <div>
                <label style="display: block; font-size: 0.85rem; font-weight: 700; color: var(--text-main); margin-bottom: 6px;">
                  ${I18N.t('profileFullName')}
                </label>
                <input type="text" id="prof-name" class="settings-input" placeholder="${isAr ? 'اكتب اسمك' : 'Enter your name'}" value="${(isAr ? profile.nameAr : profile.nameEn) || ''}" oninput="AkkedSettings.updateProfileField('name', this.value)">
              </div>

              <div>
                <label style="display: block; font-size: 0.85rem; font-weight: 700; color: var(--text-main); margin-bottom: 6px;">
                  ${I18N.t('profileEmail')}
                </label>
                <input type="email" id="prof-email" class="settings-input" placeholder="${isAr ? 'اكتب بريدك' : 'Enter your email'}" value="${profile.email || ''}" oninput="AkkedSettings.updateProfileField('email', this.value)">
              </div>

              <div>
                <label style="display: block; font-size: 0.85rem; font-weight: 700; color: var(--text-main); margin-bottom: 6px;">
                  ${I18N.t('profilePhone')}
                </label>
                <input type="tel" id="prof-phone" class="settings-input settings-phone-input" placeholder="${isAr ? 'الرقم' : 'Enter your phone'}" value="${profile.phone || ''}" oninput="AkkedSettings.updateProfileField('phone', this.value)" dir="rtl" style="text-align: right; direction: rtl; unicode-bidi: plaintext; padding-right: 16px;">
              </div>

              <div>
                <label style="display: block; font-size: 0.85rem; font-weight: 700; color: var(--text-main); margin-bottom: 6px;">
                  ${I18N.t('profileRole')}
                </label>
                <input type="text" id="prof-role" class="settings-input" placeholder="${isAr ? 'اكتب صفتك أو تخصصك' : 'Enter your role'}" value="${(isAr ? profile.roleAr : profile.roleEn) || ''}" oninput="AkkedSettings.updateProfileField('role', this.value)">
              </div>
            </div>

            <!-- Security Key Fingerprint Box -->
            <div style="background: var(--brand-surface-subtle); border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 16px; margin-bottom: 24px;">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px; flex-wrap: wrap; gap: 8px;">
                <span style="font-size: 0.85rem; font-weight: 700; color: var(--brand-slate); display: inline-flex; align-items: center; gap: 6px;">
                  ${AkkedIcons.get('key', { size: 14 })}
                  <span>${I18N.t('profilePrivacyId')}</span>
                </span>
                <span style="font-family: monospace; font-size: 0.82rem; font-weight: 700; color: var(--brand-primary); background: var(--brand-primary-light); padding: 2px 8px; border-radius: var(--radius-sm);">
                  ${profile.privacyId || 'AKD-9942-PRIV-SA'}
                </span>
              </div>
              <div style="font-size: 0.78rem; color: var(--text-muted); font-family: monospace; word-break: break-all;">
                ${I18N.t('profileHardwareKey')}: <strong>${profile.keyFingerprint || 'SHA256:7e91a0c4f8d2e8b15a3c9e6f217d84b0'}</strong>
              </div>
            </div>

            <div style="display: flex; justify-content: flex-end;">
              <button class="btn btn-primary" onclick="AkkedSettings.saveProfile()">
                ${AkkedIcons.get('check', { size: 16, strokeWidth: 2.5 })}
                <span>${I18N.t('btnSaveProfile')}</span>
              </button>
            </div>
          </div>
        ` : ''}

        <!-- Tab 2: Notification Preferences -->
        ${this.activeTab === 'notifications' ? `
          <div class="card settings-card animate-fade-in" style="padding: 28px; margin-bottom: 24px;">
            <div style="border-bottom: 1px solid var(--border-light); padding-bottom: 14px; margin-bottom: 20px;">
              <h2 style="font-size: 1.15rem; font-weight: 800; color: var(--text-main); margin-bottom: 2px;">
                ${I18N.t('notifTitle')}
              </h2>
              <p style="font-size: 0.85rem; color: var(--text-muted);">${I18N.t('notifSubtitle')}</p>
            </div>

            <div class="settings-toggle-list" style="display: flex; flex-direction: column; gap: 18px;">
              
              <!-- Toggle 1: In-App Alerts -->
              <div class="settings-toggle-row">
                <div class="toggle-text-area">
                  <div class="toggle-title">${I18N.t('notifInAppAlerts')}</div>
                  <div class="toggle-desc">${I18N.t('notifInAppAlertsDesc')}</div>
                </div>
                <label class="switch-toggle-label">
                  <input type="checkbox" ${notifs.inAppAlerts ? 'checked' : ''} onchange="AkkedSettings.updateNotifSetting('inAppAlerts', this.checked)">
                  <span class="switch-toggle-slider"></span>
                </label>
              </div>

              <!-- Toggle 2: Expiry Reminders -->
              <div class="settings-toggle-row">
                <div class="toggle-text-area">
                  <div class="toggle-title">${I18N.t('notifExpiryReminders')}</div>
                  <div class="toggle-desc">${I18N.t('notifExpiryRemindersDesc')}</div>
                </div>
                <label class="switch-toggle-label">
                  <input type="checkbox" ${notifs.expiryReminders ? 'checked' : ''} onchange="AkkedSettings.updateNotifSetting('expiryReminders', this.checked)">
                  <span class="switch-toggle-slider"></span>
                </label>
              </div>

              <!-- Toggle 3: Revocation Alerts -->
              <div class="settings-toggle-row">
                <div class="toggle-text-area">
                  <div class="toggle-title">${I18N.t('notifRevocationAlerts')}</div>
                  <div class="toggle-desc">${I18N.t('notifRevocationAlertsDesc')}</div>
                </div>
                <label class="switch-toggle-label">
                  <input type="checkbox" ${notifs.revocationAlerts ? 'checked' : ''} onchange="AkkedSettings.updateNotifSetting('revocationAlerts', this.checked)">
                  <span class="switch-toggle-slider"></span>
                </label>
              </div>

              <!-- Toggle 4: External Push Notifications -->
              <div class="settings-toggle-row">
                <div class="toggle-text-area">
                  <div class="toggle-title" style="display: inline-flex; align-items: center; gap: 6px;">
                    <span>${I18N.t('notifPushExternal')}</span>
                    <span class="badge badge-active" style="font-size: 0.72rem; padding: 2px 6px;">Web Push</span>
                  </div>
                  <div class="toggle-desc">${I18N.t('notifPushExternalDesc')}</div>
                </div>
                <label class="switch-toggle-label">
                  <input type="checkbox" ${notifs.pushNotifications ? 'checked' : ''} onchange="AkkedSettings.updatePushSetting(this.checked)">
                  <span class="switch-toggle-slider"></span>
                </label>
              </div>

              <!-- Toggle 5: Weekly Privacy Digest -->
              <div class="settings-toggle-row">
                <div class="toggle-text-area">
                  <div class="toggle-title">${I18N.t('notifWeeklyDigest')}</div>
                  <div class="toggle-desc">${I18N.t('notifWeeklyDigestDesc')}</div>
                </div>
                <label class="switch-toggle-label">
                  <input type="checkbox" ${notifs.weeklyDigest ? 'checked' : ''} onchange="AkkedSettings.updateNotifSetting('weeklyDigest', this.checked)">
                  <span class="switch-toggle-slider"></span>
                </label>
              </div>
            </div>

            <div style="display: flex; justify-content: flex-end; margin-top: 24px; padding-top: 16px; border-top: 1px solid var(--border-light);">
              <button class="btn btn-primary" onclick="AkkedSettings.saveAll()">
                ${AkkedIcons.get('check', { size: 16, strokeWidth: 2.5 })}
                <span>${I18N.t('btnSaveSettings')}</span>
              </button>
            </div>
          </div>
        ` : ''}

        <!-- Tab 3: Appearance & Language -->
        ${this.activeTab === 'theme' ? `
          <div class="card settings-card animate-fade-in" style="padding: 28px; margin-bottom: 24px;">
            <div style="border-bottom: 1px solid var(--border-light); padding-bottom: 14px; margin-bottom: 22px;">
              <h2 style="font-size: 1.15rem; font-weight: 800; color: var(--text-main); margin-bottom: 2px;">
                ${I18N.t('themeTitle')}
              </h2>
              <p style="font-size: 0.85rem; color: var(--text-muted);">${I18N.t('themeSubtitle')}</p>
            </div>

            <!-- Theme Mode Cards -->
            <div style="margin-bottom: 28px;">
              <label style="display: block; font-size: 0.95rem; font-weight: 800; color: var(--text-main); margin-bottom: 14px;">
                ${I18N.t('themeSelectionTitle')}
              </label>

              <div class="grid-container grid-cols-2" style="gap: 16px;">
                <!-- Light Theme Option Card -->
                <div class="theme-choice-card ${currentTheme === 'light' ? 'selected' : ''}" onclick="AkkedSettings.selectTheme('light')">
                  <div class="theme-card-preview preview-light">
                    <div class="theme-preview-topbar"></div>
                    <div class="theme-preview-body">
                      <div class="preview-mock-bar" style="width: 40%; background: #5A1854;"></div>
                      <div class="preview-mock-bar" style="width: 70%; background: #E7E8EF;"></div>
                    </div>
                  </div>
                  <div class="theme-choice-info">
                    <div style="display: flex; align-items: center; justify-content: space-between;">
                      <strong style="color: var(--text-main); font-size: 0.95rem;">${I18N.t('themeLightName')}</strong>
                      ${currentTheme === 'light' ? `<span class="badge badge-active">${isAr ? 'المفعل' : 'Active'}</span>` : ''}
                    </div>
                    <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 4px;">
                      ${I18N.t('themeLightDesc')}
                    </div>
                  </div>
                </div>

                <!-- Dark Theme Option Card -->
                <div class="theme-choice-card ${currentTheme === 'dark' ? 'selected' : ''}" onclick="AkkedSettings.selectTheme('dark')">
                  <div class="theme-card-preview preview-dark">
                    <div class="theme-preview-topbar dark-topbar"></div>
                    <div class="theme-preview-body dark-body">
                      <div class="preview-mock-bar" style="width: 40%; background: #852C7C;"></div>
                      <div class="preview-mock-bar" style="width: 70%; background: #272D42;"></div>
                    </div>
                  </div>
                  <div class="theme-choice-info">
                    <div style="display: flex; align-items: center; justify-content: space-between;">
                      <strong style="color: var(--text-main); font-size: 0.95rem;">${I18N.t('themeDarkName')}</strong>
                      ${currentTheme === 'dark' ? `<span class="badge badge-active">${isAr ? 'المفعل' : 'Active'}</span>` : ''}
                    </div>
                    <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 4px;">
                      ${I18N.t('themeDarkDesc')}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Interface Language Section -->
            <div style="padding-top: 20px; border-top: 1px solid var(--border-light);">
              <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 14px;">
                <div>
                  <div style="font-weight: 800; font-size: 0.95rem; color: var(--text-main);">
                    ${I18N.t('languageSelectionTitle')}
                  </div>
                  <div style="font-size: 0.82rem; color: var(--text-muted); margin-top: 2px;">
                    ${I18N.t('languageSelectionDesc')}
                  </div>
                </div>

                <div style="display: flex; gap: 8px;">
                  <button class="btn ${isAr ? 'btn-primary' : 'btn-secondary'}" onclick="I18N.setLanguage('ar')">
                    <span>العربية</span>
                  </button>
                  <button class="btn ${!isAr ? 'btn-primary' : 'btn-secondary'}" onclick="I18N.setLanguage('en')">
                    <span>English</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ` : ''}

        <!-- Tab 4: Accessibility Mode & Assistive Tools -->
        ${this.activeTab === 'accessibility' ? `
          <div class="card settings-card animate-fade-in" style="padding: 28px; margin-bottom: 24px;">
            <div style="border-bottom: 1px solid var(--border-light); padding-bottom: 14px; margin-bottom: 22px;">
              <h2 style="font-size: 1.15rem; font-weight: 800; color: var(--text-main); margin-bottom: 2px;">
                ${I18N.t('accessTitle')}
              </h2>
              <p style="font-size: 0.85rem; color: var(--text-muted);">${I18N.t('accessSubtitle')}</p>
            </div>

            <!-- Master Toggle Banner -->
            <div style="background: ${access.enabled ? 'var(--brand-primary-light)' : 'var(--brand-surface-subtle)'}; border: 1.5px solid ${access.enabled ? 'var(--brand-primary-border)' : 'var(--border-light)'}; border-radius: var(--radius-md); padding: 18px; margin-bottom: 24px; display: flex; align-items: center; justify-content: space-between; gap: 16px;">
              <div>
                <div class="access-title-row" style="font-weight: 800; font-size: 1.05rem; color: ${access.enabled ? 'var(--brand-primary)' : 'var(--text-main)'}; margin-bottom: 4px;">
                  <span class="access-icon-container">${AkkedIcons.get('shield-check', { size: 24, className: 'access-setting-icon' })}</span>
                  <span>${I18N.t('accessMasterToggle')}</span>
                </div>
                <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.4; padding-inline-start: 42px;">
                  ${I18N.t('accessMasterToggleDesc')}
                </p>
              </div>

              <label class="switch-toggle-label">
                <input type="checkbox" id="access-master-switch" ${access.enabled ? 'checked' : ''} onchange="AkkedSettings.toggleMasterAccessibility(this.checked)">
                <span class="switch-toggle-slider"></span>
              </label>
            </div>

            <!-- Detailed Accessibility Controls (Active when Master is enabled) -->
            <div class="accessibility-subcontrols" style="opacity: ${access.enabled ? '1' : '0.55'}; pointer-events: ${access.enabled ? 'auto' : 'none'}; display: flex; flex-direction: column; gap: 18px; transition: opacity var(--transition-base);">
              
              <!-- Voice Assistant & Microphone Listening Control -->
              <div class="settings-toggle-row">
                <div class="toggle-text-area">
                  <div class="toggle-title access-title-row">
                    <span class="access-icon-container">${AkkedIcons.get('mic', { size: 24, className: 'access-setting-icon' })}</span>
                    <span>${I18N.t('accessMicVoiceAssistant')}</span>
                    <span class="badge badge-active" style="font-size: 0.72rem; padding: 2px 6px;">AI Mic Voice</span>
                  </div>
                  <div class="toggle-desc" style="padding-inline-start: 42px;">${I18N.t('accessMicVoiceAssistantDesc')}</div>
                </div>
                <button class="btn btn-primary btn-sm" style="flex-shrink: 0;" onclick="AkkedVoiceAssistant.openHUD(); AkkedVoiceAssistant.proactivelyAnnounceRequests();">
                  <span>${I18N.t('btnLaunchVoiceAssistant')}</span>
                </button>
              </div>

              <!-- Audio Speech Announcements on Entry -->
              <div class="settings-toggle-row">
                <div class="toggle-text-area">
                  <div class="toggle-title access-title-row">
                    <span class="access-icon-container">${AkkedIcons.get('volume', { size: 24, className: 'access-setting-icon' })}</span>
                    <span>${I18N.t('accessAudioAnnouncements')}</span>
                  </div>
                  <div class="toggle-desc" style="padding-inline-start: 42px;">${I18N.t('accessAudioAnnouncementsDesc')}</div>
                </div>
                <label class="switch-toggle-label">
                  <input type="checkbox" ${access.spokenAnnouncements ? 'checked' : ''} onchange="AkkedSettings.updateAccessSetting('spokenAnnouncements', this.checked)">
                  <span class="switch-toggle-slider"></span>
                </label>
              </div>

              <!-- External Notifications for Critical Sharing Requests -->
              <div class="settings-toggle-row">
                <div class="toggle-text-area">
                  <div class="toggle-title access-title-row">
                    <span class="access-icon-container">${AkkedIcons.get('bell', { size: 24, className: 'access-setting-icon' })}</span>
                    <span>${I18N.t('accessExternalNotifs')}</span>
                  </div>
                  <div class="toggle-desc" style="padding-inline-start: 42px;">${I18N.t('accessExternalNotifsDesc')}</div>
                </div>
                <label class="switch-toggle-label">
                  <input type="checkbox" ${access.externalNotifs ? 'checked' : ''} onchange="AkkedSettings.updateAccessSetting('externalNotifs', this.checked)">
                  <span class="switch-toggle-slider"></span>
                </label>
              </div>

              <!-- High Contrast Focus Rings -->
              <div class="settings-toggle-row">
                <div class="toggle-text-area">
                  <div class="toggle-title access-title-row">
                    <span class="access-icon-container"><img src="assets/eye-focus-purple.png" alt="" class="access-setting-icon eye-focus-setting-icon" width="24" height="24" aria-hidden="true"></span>
                    <span>${I18N.t('accessHighContrast')}</span>
                  </div>
                  <div class="toggle-desc" style="padding-inline-start: 42px;">${I18N.t('accessHighContrastDesc')}</div>
                </div>
                <label class="switch-toggle-label">
                  <input type="checkbox" ${access.highContrast ? 'checked' : ''} onchange="AkkedSettings.updateAccessSetting('highContrast', this.checked)">
                  <span class="switch-toggle-slider"></span>
                </label>
              </div>

              <!-- Enlarged Accessible Font Scaling -->
              <div class="settings-toggle-row">
                <div class="toggle-text-area">
                  <div class="toggle-title access-title-row">
                    <span class="access-icon-container"><img src="assets/text-size-purple.png" alt="" class="access-setting-icon text-size-setting-icon" width="24" height="24" aria-hidden="true"></span>
                    <span>${I18N.t('accessLargeText')}</span>
                  </div>
                  <div class="toggle-desc" style="padding-inline-start: 42px;">${I18N.t('accessLargeTextDesc')}</div>
                </div>
                <label class="switch-toggle-label">
                  <input type="checkbox" ${access.largeText ? 'checked' : ''} onchange="AkkedSettings.updateAccessSetting('largeText', this.checked)">
                  <span class="switch-toggle-slider"></span>
                </label>
              </div>

              <!-- Interactive Test Speech Synthesis Control -->
              <div style="background: var(--brand-surface-subtle); border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 18px; margin-top: 10px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 14px;">
                <div>
                  <div class="access-title-row" style="font-weight: 700; color: var(--text-main); font-size: 0.95rem; margin-bottom: 2px;">
                    <span class="access-icon-container">${AkkedIcons.get('volume', { size: 24, className: 'access-setting-icon' })}</span>
                    <span>${isAr ? 'اختبار قارئ الشاشة والإعلان الصوتي' : 'Test Screen Reader & Audio Announcement'}</span>
                  </div>
                  <div style="font-size: 0.8rem; color: var(--text-muted); padding-inline-start: 42px;">
                    ${isAr ? 'تجربة النطق الصوتي الفوري عبر محرك Web Speech Synthesis' : 'Preview synthetic spoken voice audio via browser Speech Synthesis'}
                  </div>
                </div>

                <button class="btn btn-secondary" style="display: inline-flex; align-items: center; gap: 8px;" onclick="AkkedSettings.testSpeechAnnouncement()">
                  ${AkkedIcons.get('volume', { size: 16 })}
                  <span>${I18N.t('btnTestSpeech')}</span>
                </button>
              </div>
            </div>

            <div style="display: flex; justify-content: flex-end; margin-top: 24px; padding-top: 16px; border-top: 1px solid var(--border-light);">
              <button class="btn btn-primary" onclick="AkkedSettings.saveAll()">
                ${AkkedIcons.get('check', { size: 16, strokeWidth: 2.5 })}
                <span>${I18N.t('btnSaveSettings')}</span>
              </button>
            </div>
          </div>
        ` : ''}

      </div>
    `;
  },

  setTab(tab) {
    this.activeTab = tab;
    AkkedApp.renderView();
  },

  updateProfileField(field, value) {
    if (!AkkedState.settings.profile) {
      AkkedState.settings.profile = {};
    }
    const isAr = I18N.currentLang === 'ar';
    if (field === 'name') {
      if (isAr) AkkedState.settings.profile.nameAr = value;
      else AkkedState.settings.profile.nameEn = value;
    } else if (field === 'role') {
      if (isAr) AkkedState.settings.profile.roleAr = value;
      else AkkedState.settings.profile.roleEn = value;
    } else {
      AkkedState.settings.profile[field] = value;
    }
  },

  handleAvatarUpload(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      AkkedApp.showToast(I18N.currentLang === 'ar' ? 'يرجى اختيار ملف صورة صالح' : 'Please select a valid image file', 'warning');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (!AkkedState.settings.profile) {
        AkkedState.settings.profile = {};
      }
      AkkedState.settings.profile.avatarUrl = e.target.result;
      AkkedState.save();
      const container = document.getElementById('view-container');
      if (container && AkkedApp.currentView === 'settings') {
        AkkedApp.renderView();
      }
      AkkedApp.showToast(I18N.currentLang === 'ar' ? 'تم تحديث الصورة الشخصية بنجاح' : 'Profile picture updated successfully', 'success');
    };
    reader.readAsDataURL(file);
    try {
      event.target.value = '';
    } catch (err) {}
  },

  saveProfile() {
    const nameInput = document.getElementById('prof-name');
    const emailInput = document.getElementById('prof-email');
    const phoneInput = document.getElementById('prof-phone');
    const roleInput = document.getElementById('prof-role');

    if (nameInput) this.updateProfileField('name', nameInput.value.trim());
    if (emailInput) this.updateProfileField('email', emailInput.value.trim());
    if (phoneInput) this.updateProfileField('phone', phoneInput.value.trim());
    if (roleInput) this.updateProfileField('role', roleInput.value.trim());

    AkkedState.save();
    AkkedApp.showToast(I18N.currentLang === 'ar' ? 'تم حفظ بيانات الملف الشخصي بنجاح' : 'Profile information saved successfully', 'success');
    const container = document.getElementById('view-container');
    if (container && AkkedApp.currentView === 'settings') {
      AkkedApp.renderView();
    }
  },

  updateNotifSetting(key, checked) {
    if (!AkkedState.settings.notifications) {
      AkkedState.settings.notifications = {};
    }
    AkkedState.settings.notifications[key] = checked;
  },

  updatePushSetting(checked) {
    this.updateNotifSetting('pushNotifications', checked);
    if (checked && 'Notification' in window && Notification.permission !== 'granted') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          AkkedState.triggerExternalNotification(
            I18N.currentLang === 'ar' ? 'منصة أكد: تم تفعيل الإشعارات الخارجية' : 'Akked: External Notifications Enabled',
            I18N.currentLang === 'ar' ? 'ستصلك تنبيهات فورية عند التحقق من الإثباتات' : 'You will receive alerts when credentials are checked'
          );
        }
      });
    }
  },

  selectTheme(theme) {
    AkkedApp.applyTheme(theme);
    this.render();
    AkkedApp.renderView();
  },

  toggleMasterAccessibility(enabled) {
    if (!AkkedState.settings.accessibility) {
      AkkedState.settings.accessibility = {};
    }
    AkkedState.settings.accessibility.enabled = enabled;
    AkkedState.applyAccessibilityMode();
    AkkedState.save();
    AkkedApp.renderView();

    if (enabled) {
      AkkedApp.showToast(
        I18N.currentLang === 'ar' ? 'تم تفعيل نمط إمكانية الوصول والتسهيلات وتشغيل المساعد الصوتي' : 'Accessibility Mode & Voice Assistant Enabled',
        'success'
      );
      setTimeout(() => {
        if (window.AkkedVoiceAssistant) {
          AkkedVoiceAssistant.startRenewalFlow();
        }
      }, 500);
    }
  },

  updateAccessSetting(key, checked) {
    if (!AkkedState.settings.accessibility) {
      AkkedState.settings.accessibility = {};
    }
    AkkedState.settings.accessibility[key] = checked;
    AkkedState.applyAccessibilityMode();
  },

  testSpeechAnnouncement() {
    const isAr = I18N.currentLang === 'ar';
    const sampleText = I18N.t('speechTestSample');
    AkkedApp.showToast(I18N.t('speechAnnouncementPlaying'), 'info');
    AkkedState.speakText(sampleText);
  },

  saveAll() {
    AkkedState.save();
    AkkedState.applyAccessibilityMode();
    AkkedApp.showToast(I18N.t('settingsSavedToast'), 'success');
  }
};
