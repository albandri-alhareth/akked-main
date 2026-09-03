/**
 * Akked Platform - Dedicated Login Page Component
 * Clean Arabic RTL authentication prototype with format validation,
 * password visibility toggle, future Nafath integration badge, and secure prototype routing.
 */
window.AkkedLogin = {
  // Toggle password visibility
  togglePasswordVisibility() {
    const pwdInput = document.getElementById('login-password');
    const toggleBtn = document.getElementById('login-password-toggle');
    if (!pwdInput || !toggleBtn) return;

    const isPassword = pwdInput.type === 'password';
    pwdInput.type = isPassword ? 'text' : 'password';

    toggleBtn.setAttribute('aria-label', isPassword ? I18N.t('loginShowPassword') : I18N.t('loginHidePassword'));
    toggleBtn.title = isPassword ? I18N.t('loginShowPassword') : I18N.t('loginHidePassword');
    toggleBtn.innerHTML = isPassword
      ? '<svg class="akked-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>'
      : '<svg class="akked-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>';
  },

  // Form Validation & Safe Prototype Navigation
  handleSubmit(event) {
    if (event) event.preventDefault();

    const identifierInput = document.getElementById('login-identifier');
    const passwordInput = document.getElementById('login-password');
    const identifierError = document.getElementById('login-identifier-error');
    const passwordError = document.getElementById('login-password-error');
    const submitBtn = document.getElementById('login-submit-btn');

    if (!identifierInput || !passwordInput) return false;

    const identifierVal = identifierInput.value.trim();
    const passwordVal = passwordInput.value;

    let isValid = true;

    // Reset previous error display
    if (identifierError) {
      identifierError.textContent = '';
      identifierError.style.display = 'none';
    }
    if (passwordError) {
      passwordError.textContent = '';
      passwordError.style.display = 'none';
    }
    identifierInput.classList.remove('is-invalid');
    passwordInput.classList.remove('is-invalid');

    // Only display an error when one of the fields is empty
    if (!identifierVal) {
      isValid = false;
      identifierInput.classList.add('is-invalid');
      if (identifierError) {
        identifierError.textContent = I18N.t('loginErrIdentifier');
        identifierError.style.display = 'flex';
      }
    }

    if (!passwordVal || passwordVal.trim().length === 0) {
      isValid = false;
      passwordInput.classList.add('is-invalid');
      if (passwordError) {
        identifierError && (passwordError.textContent = I18N.t('loginErrPassword'));
        passwordError.style.display = 'flex';
      }
    }

    if (!isValid) {
      if (identifierInput.classList.contains('is-invalid')) {
        identifierInput.focus();
      } else if (passwordInput.classList.contains('is-invalid')) {
        passwordInput.focus();
      }
      return false;
    }

    // Prototype Demonstration:
    // Do NOT store credentials, do NOT log in console, do NOT send to external service
    identifierInput.value = '';
    passwordInput.value = '';

    // Save harmless prototype authentication flag
    if (typeof AkkedApp !== 'undefined' && AkkedApp.setAuthenticated) {
      AkkedApp.setAuthenticated(true);
    }

    if (typeof AkkedApp !== 'undefined' && AkkedApp.showToast) {
      AkkedApp.showToast(I18N.t('loginSuccessToast'), 'success');
    }

    // Immediately navigate to existing dashboard
    if (typeof AkkedApp !== 'undefined' && AkkedApp.navigate) {
      AkkedApp.navigate('dashboard');
    }

    return false;
  },

  // Prototype Forgot Password Dialog
  showForgotDialog() {
    this.closeForgotDialog();

    const modal = document.createElement('div');
    modal.id = 'login-forgot-modal';
    modal.className = 'login-modal-backdrop animate-fade-in';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'forgot-dialog-title');

    modal.innerHTML = `
      <div class="login-modal-card animate-scale-up" onclick="event.stopPropagation()">
        <div class="login-modal-header">
          <div class="login-modal-icon-wrap">
            <svg class="akked-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </div>
          <h3 id="forgot-dialog-title" class="login-modal-title">${I18N.t('loginForgotTitle')}</h3>
        </div>
        <div class="login-modal-body">
          <p>${I18N.t('loginForgotBody')}</p>
        </div>
        <div class="login-modal-actions">
          <button type="button" class="btn btn-primary login-modal-btn" onclick="AkkedLogin.closeForgotDialog()">
            ${I18N.t('btnClose')}
          </button>
        </div>
      </div>
    `;

    modal.onclick = () => AkkedLogin.closeForgotDialog();
    document.body.appendChild(modal);

    this._handleKeydown = (e) => {
      if (e.key === 'Escape') {
        AkkedLogin.closeForgotDialog();
      }
    };
    document.addEventListener('keydown', this._handleKeydown);
  },

  closeForgotDialog() {
    const modal = document.getElementById('login-forgot-modal');
    if (modal) {
      modal.remove();
    }
    if (this._handleKeydown) {
      document.removeEventListener('keydown', this._handleKeydown);
      this._handleKeydown = null;
    }
  },

  // Render Dedicated Login View
  render() {
    const isAr = (typeof I18N !== 'undefined' && I18N.currentLang === 'ar');

    return `
      <div class="login-page-view animate-fade-in" dir="${isAr ? 'rtl' : 'ltr'}">
        <div class="login-card-wrapper">
          
          <div class="login-card">
            <!-- Akkid Official Logo Symbol (No duplicate text, no tagline) -->
            <div class="login-logo-container">
              <a href="#landing" onclick="event.preventDefault(); AkkedApp.navigate('landing');" aria-label="${I18N.t('loginBackHome')}" title="${I18N.t('loginBackHome')}">
                <img src="assets/akkid-new-logo.png" 
                     alt="أكّد" 
                     class="login-logo-img" 
                     width="78" 
                     height="78">
              </a>
            </div>

            <!-- Page Title -->
            <h1 class="login-title">${I18N.t('loginTitle')}</h1>
            <p class="login-subtitle">${I18N.t('loginSubtitle')}</p>

            <!-- Login Form -->
            <form id="akked-login-form" class="login-form" onsubmit="return AkkedLogin.handleSubmit(event);" novalidate>
              
              <!-- First Input: Email or Saudi Mobile -->
              <div class="form-group login-form-group">
                <label for="login-identifier" class="form-label login-label">
                  ${I18N.t('loginIdentifier')}
                </label>
                <div class="login-input-wrapper">
                  <span class="login-input-icon" aria-hidden="true">
                    <svg class="akked-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </span>
                  <input 
                    type="text" 
                    id="login-identifier" 
                    name="identifier" 
                    class="form-input login-input" 
                    placeholder="${I18N.t('loginIdentifierPlaceholder')}" 
                    dir="auto"
                    autocomplete="username" 
                    required>
                </div>
                <div class="login-field-error" id="login-identifier-error" role="alert" aria-live="polite"></div>
              </div>

              <!-- Second Input: Password -->
              <div class="form-group login-form-group">
                <label for="login-password" class="form-label login-label">
                  ${I18N.t('loginPassword')}
                </label>
                <div class="login-input-wrapper">
                  <span class="login-input-icon" aria-hidden="true">
                    <svg class="akked-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                  </span>
                  <input 
                    type="password" 
                    id="login-password" 
                    name="password" 
                    class="form-input login-input login-password-input" 
                    placeholder="••••••••" 
                    autocomplete="current-password" 
                    required>
                  <button 
                    type="button" 
                    id="login-password-toggle" 
                    class="password-visibility-btn" 
                    onclick="AkkedLogin.togglePasswordVisibility()" 
                    title="${I18N.t('loginShowPassword')}" 
                    aria-label="${I18N.t('loginShowPassword')}">
                    <svg class="akked-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  </button>
                </div>
                <div class="login-field-error" id="login-password-error" role="alert" aria-live="polite"></div>
                
                <!-- Clickable link directly below password field -->
                <div class="login-forgot-wrapper">
                  <a href="#forgot" class="login-forgot-link" onclick="event.preventDefault(); AkkedLogin.showForgotDialog();">
                    ${I18N.t('loginForgot')}
                  </a>
                </div>
              </div>

              <!-- Primary Submit Button -->
              <button type="submit" id="login-submit-btn" class="btn btn-primary login-submit-btn">
                <span>${I18N.t('loginBtn')}</span>
                <svg class="akked-icon" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                  <polyline points="10 17 15 12 10 7"/>
                  <line x1="15" y1="12" x2="3" y2="12"/>
                </svg>
              </button>

              <!-- Separator Containing: «أو» / «OR» -->
              <div class="login-separator" role="separator">
                <span>${isAr ? 'أو' : 'OR'}</span>
              </div>

              <!-- Disabled Secondary Button: Quick Login via Nafath -->
              <button 
                type="button" 
                class="btn login-nafath-btn" 
                disabled 
                aria-disabled="true" 
                title="${isAr ? 'خيار نفاذ مخصص للتكامل المستقبلي' : 'Nafath integration planned for future releases'}">
                <span class="nafath-btn-inner">
                  <svg class="akked-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    <path d="m9 12 2 2 4-4"/>
                  </svg>
                  <span>${isAr ? 'الدخول السريع عبر نفاذ' : 'Quick Login via Nafath'}</span>
                </span>
                <span class="nafath-soon-badge">${isAr ? 'قريبًا' : 'Soon'}</span>
              </button>

              <!-- Short note below Nafath button -->
              <p class="nafath-note">
                ${isAr ? 'خيار نفاذ مخصص للتكامل المستقبلي وغير مرتبط رسميًا في النسخة الحالية.' : 'Nafath integration is intended for future release and not linked in this prototype.'}
              </p>

            </form>

            <!-- Link below the form: ليس لديك حساب؟ إنشاء حساب جديد -->
            <div class="login-register-link-container" style="margin-top: 20px; text-align: center;">
              <span style="font-size: 0.92rem; color: var(--text-muted);">${I18N.t('loginNoAccount')}</span>
              <a href="#register" class="login-register-action-link" onclick="event.preventDefault(); AkkedApp.navigate('register');" style="font-size: 0.92rem; font-weight: 700; color: var(--brand-primary); text-decoration: none; margin-inline-start: 6px;">
                ${I18N.t('loginCreateAccount')}
              </a>
            </div>

            <!-- Return to Homepage Link -->
            <div class="login-back-wrapper">
              <a href="#landing" class="login-back-link" onclick="event.preventDefault(); AkkedApp.navigate('landing');">
                <svg class="akked-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
                <span>${I18N.t('loginBackHome')}</span>
              </a>
            </div>

          </div>

        </div>
      </div>
    `;
  }
};
