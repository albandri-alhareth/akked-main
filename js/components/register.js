/**
 * Akked Platform - Dedicated Registration (Create Account) Page Component
 * Clean Arabic RTL registration prototype with input matching,
 * password visibility toggles, and safe prototype routing.
 */
window.AkkedRegister = {
  // Toggle password visibility
  togglePasswordVisibility(inputId, toggleBtnId) {
    const pwdInput = document.getElementById(inputId);
    const toggleBtn = document.getElementById(toggleBtnId);
    if (!pwdInput || !toggleBtn) return;

    const isPassword = pwdInput.type === 'password';
    pwdInput.type = isPassword ? 'text' : 'password';

    toggleBtn.setAttribute('aria-label', isPassword ? I18N.t('loginHidePassword') : I18N.t('loginShowPassword'));
    toggleBtn.title = isPassword ? I18N.t('loginHidePassword') : I18N.t('loginShowPassword');
    toggleBtn.innerHTML = isPassword
      ? '<svg class="akked-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>'
      : '<svg class="akked-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>';
  },

  // Form Validation & Safe Prototype Registration
  handleSubmit(event) {
    if (event) event.preventDefault();

    const nameInput = document.getElementById('register-name');
    const identifierInput = document.getElementById('register-identifier');
    const passwordInput = document.getElementById('register-password');
    const confirmInput = document.getElementById('register-password-confirm');

    const nameError = document.getElementById('register-name-error');
    const identifierError = document.getElementById('register-identifier-error');
    const passwordError = document.getElementById('register-password-error');
    const confirmError = document.getElementById('register-confirm-error');

    if (!nameInput || !identifierInput || !passwordInput || !confirmInput) return false;

    const nameVal = nameInput.value.trim();
    const identifierVal = identifierInput.value.trim();
    const passwordVal = passwordInput.value;
    const confirmVal = confirmInput.value;

    let isValid = true;

    // Reset previous error display
    [nameError, identifierError, passwordError, confirmError].forEach(el => {
      if (el) {
        el.textContent = '';
        el.style.display = 'none';
      }
    });
    [nameInput, identifierInput, passwordInput, confirmInput].forEach(el => {
      el.classList.remove('is-invalid');
    });

    // 1. Accept any non-empty name
    if (!nameVal) {
      isValid = false;
      nameInput.classList.add('is-invalid');
      if (nameError) {
        nameError.textContent = I18N.t('regErrName');
        nameError.style.display = 'flex';
      }
    }

    // 2. Accept any non-empty text as an email or mobile number
    if (!identifierVal) {
      isValid = false;
      identifierInput.classList.add('is-invalid');
      if (identifierError) {
        identifierError.textContent = I18N.t('regErrIdentifier');
        identifierError.style.display = 'flex';
      }
    }

    // 3. Accept any non-empty password
    if (!passwordVal || passwordVal.trim().length === 0) {
      isValid = false;
      passwordInput.classList.add('is-invalid');
      if (passwordError) {
        passwordError.textContent = I18N.t('regErrPassword');
        passwordError.style.display = 'flex';
      }
    }

    // 4. Require both password fields to match
    if (!confirmVal || confirmVal.trim().length === 0) {
      isValid = false;
      confirmInput.classList.add('is-invalid');
      if (confirmError) {
        confirmError.textContent = I18N.t('regErrConfirm');
        confirmError.style.display = 'flex';
      }
    } else if (passwordVal !== confirmVal) {
      isValid = false;
      confirmInput.classList.add('is-invalid');
      if (confirmError) {
        confirmError.textContent = I18N.t('regErrMismatch');
        confirmError.style.display = 'flex';
      }
    }

    if (!isValid) {
      if (nameInput.classList.contains('is-invalid')) nameInput.focus();
      else if (identifierInput.classList.contains('is-invalid')) identifierInput.focus();
      else if (passwordInput.classList.contains('is-invalid')) passwordInput.focus();
      else if (confirmInput.classList.contains('is-invalid')) confirmInput.focus();
      return false;
    }

    // Prototype Demonstration:
    // Do NOT store the entered name, email, mobile number or password
    nameInput.value = '';
    identifierInput.value = '';
    passwordInput.value = '';
    confirmInput.value = '';

    // Mark as signed in for prototype purposes
    if (typeof AkkedApp !== 'undefined' && AkkedApp.setAuthenticated) {
      AkkedApp.setAuthenticated(true);
    }

    if (typeof AkkedApp !== 'undefined' && AkkedApp.showToast) {
      AkkedApp.showToast(I18N.t('regSuccessToast'), 'success');
    }

    // Immediately navigate to existing dashboard
    if (typeof AkkedApp !== 'undefined' && AkkedApp.navigate) {
      AkkedApp.navigate('dashboard');
    }

    return false;
  },

  // Render Registration View
  render() {
    const isAr = (typeof I18N !== 'undefined' && I18N.currentLang === 'ar');

    return `
      <div class="login-page-view animate-fade-in" dir="${isAr ? 'rtl' : 'ltr'}">
        <div class="login-card-wrapper" style="max-width: 480px;">
          
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
            <h1 class="login-title">${I18N.t('regTitle')}</h1>
            <p class="login-subtitle">${I18N.t('regSubtitle')}</p>

            <!-- Registration Form -->
            <form id="akked-register-form" class="login-form" onsubmit="return AkkedRegister.handleSubmit(event);" novalidate>
              
              <!-- Field 1: Name -->
              <div class="form-group login-form-group">
                <label for="register-name" class="form-label login-label">
                  ${I18N.t('regName')}
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
                    id="register-name" 
                    name="name" 
                    class="form-input login-input" 
                    placeholder="${I18N.t('regNamePlaceholder')}" 
                    dir="auto"
                    autocomplete="name" 
                    required>
                </div>
                <div class="login-field-error" id="register-name-error" role="alert" aria-live="polite"></div>
              </div>

              <!-- Field 2: Email or Mobile -->
              <div class="form-group login-form-group">
                <label for="register-identifier" class="form-label login-label">
                  ${I18N.t('regIdentifier')}
                </label>
                <div class="login-input-wrapper">
                  <span class="login-input-icon" aria-hidden="true">
                    <svg class="akked-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </svg>
                  </span>
                  <input 
                    type="text" 
                    id="register-identifier" 
                    name="identifier" 
                    class="form-input login-input" 
                    placeholder="${I18N.t('regIdentifierPlaceholder')}" 
                    dir="auto"
                    autocomplete="username" 
                    required>
                </div>
                <div class="login-field-error" id="register-identifier-error" role="alert" aria-live="polite"></div>
              </div>

              <!-- Field 3: Password -->
              <div class="form-group login-form-group">
                <label for="register-password" class="form-label login-label">
                  ${I18N.t('regPassword')}
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
                    id="register-password" 
                    name="password" 
                    class="form-input login-input login-password-input" 
                    placeholder="••••••••" 
                    autocomplete="new-password" 
                    required>
                  <button 
                    type="button" 
                    id="register-password-toggle" 
                    class="password-visibility-btn" 
                    onclick="AkkedRegister.togglePasswordVisibility('register-password', 'register-password-toggle')" 
                    title="${I18N.t('loginShowPassword')}" 
                    aria-label="${I18N.t('loginShowPassword')}">
                    <svg class="akked-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  </button>
                </div>
                <div class="login-field-error" id="register-password-error" role="alert" aria-live="polite"></div>
              </div>

              <!-- Field 4: Confirm Password -->
              <div class="form-group login-form-group">
                <label for="register-password-confirm" class="form-label login-label">
                  ${I18N.t('regPasswordConfirm')}
                </label>
                <div class="login-input-wrapper">
                  <span class="login-input-icon" aria-hidden="true">
                    <svg class="akked-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                      <path d="m9 12 2 2 4-4"/>
                    </svg>
                  </span>
                  <input 
                    type="password" 
                    id="register-password-confirm" 
                    name="confirmPassword" 
                    class="form-input login-input login-password-input" 
                    placeholder="••••••••" 
                    autocomplete="new-password" 
                    required>
                  <button 
                    type="button" 
                    id="register-confirm-toggle" 
                    class="password-visibility-btn" 
                    onclick="AkkedRegister.togglePasswordVisibility('register-password-confirm', 'register-confirm-toggle')" 
                    title="${I18N.t('loginShowPassword')}" 
                    aria-label="${I18N.t('loginShowPassword')}">
                    <svg class="akked-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  </button>
                </div>
                <div class="login-field-error" id="register-confirm-error" role="alert" aria-live="polite"></div>
              </div>

              <!-- Primary Submit Button -->
              <button type="submit" id="register-submit-btn" class="btn btn-primary login-submit-btn" style="margin-top: 6px;">
                <span>${I18N.t('regSubmit')}</span>
                <svg class="akked-icon" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <line x1="19" y1="8" x2="19" y2="14"/>
                  <line x1="22" y1="11" x2="16" y2="11"/>
                </svg>
              </button>

            </form>

            <!-- Link: لديك حساب بالفعل؟ تسجيل الدخول -->
            <div class="login-register-link-container" style="margin-top: 20px; text-align: center;">
              <span style="font-size: 0.92rem; color: var(--text-muted);">${I18N.t('regHaveAccount')}</span>
              <a href="#login" class="login-register-action-link" onclick="event.preventDefault(); AkkedApp.navigate('login');" style="font-size: 0.92rem; font-weight: 700; color: var(--brand-primary); text-decoration: none; margin-inline-start: 6px;">
                ${I18N.t('regSignInLink')}
              </a>
            </div>

            <!-- Link: العودة إلى الصفحة الرئيسية -->
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
