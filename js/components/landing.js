/**
 * Akked Public Landing Page Component
 * Clean, human-designed bilingual presentation with seamless explainer video integration,
 * core value proposition, and direct accessible CTAs.
 */

window.AkkedLanding = {
  render() {
    const isAr = I18N.currentLang === 'ar';
    const isAuth = typeof AkkedApp !== 'undefined' && AkkedApp.isAuthenticated && AkkedApp.isAuthenticated();

    return `
      <div class="landing-page-view animate-fade-in" dir="${isAr ? 'rtl' : 'ltr'}">
        
        <!-- Public Navigation Bar for Landing Page -->
        <header class="landing-nav-header">
          <div class="landing-nav-container">
            <!-- Top-Right Brand Area (Official Logo on Start Side) -->
            <div class="landing-nav-start">
              <a href="#landing" onclick="event.preventDefault(); window.scrollTo({top: 0, behavior: 'smooth'});" class="landing-header-logo-link" aria-label="${I18N.t('brandName')}" title="${I18N.t('brandName')}">
                <img src="assets/akkid-symbol.png" alt="${I18N.t('brandName')}" class="landing-header-logo-img" width="44" height="44">
              </a>
            </div>

            <!-- Public Action Controls: Language, Theme, Auth Actions & Mobile Menu -->
            <div class="landing-nav-actions">
              <!-- Language Switcher -->
              <button class="header-btn" id="landing-lang-btn" onclick="AkkedApp.toggleLanguage()" title="${isAr ? 'English' : 'العربية'}" aria-label="${isAr ? 'English' : 'العربية'}">
                <svg class="akked-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                <span id="landing-lang-btn-text">${isAr ? 'English' : 'العربية'}</span>
              </button>

              <!-- Theme Switcher -->
              <button class="header-btn header-btn-icon landing-header-theme-btn" onclick="AkkedApp.toggleTheme()" title="${I18N.t('switchTheme')}" aria-label="${I18N.t('switchTheme')}">
                <svg class="akked-icon" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/></svg>
              </button>

              ${!isAuth ? `
                <!-- Desktop Public Auth Buttons: تسجيل الدخول & إنشاء حساب جديد -->
                <button type="button" id="landing-login-btn" class="btn btn-secondary landing-nav-login-btn" onclick="AkkedApp.navigate('login')" aria-label="${isAr ? 'تسجيل الدخول' : 'Log in'}">
                  <svg class="akked-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                    <polyline points="10 17 15 12 10 7"/>
                    <line x1="15" y1="12" x2="3" y2="12"/>
                  </svg>
                  <span id="landing-login-btn-text">${isAr ? 'تسجيل الدخول' : 'Log in'}</span>
                </button>

                <button type="button" id="landing-register-btn" class="btn btn-primary landing-nav-register-btn" onclick="AkkedApp.navigate('register')" aria-label="${isAr ? 'إنشاء حساب جديد' : 'Create Account'}">
                  <svg class="akked-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <line x1="19" y1="8" x2="19" y2="14"/>
                    <line x1="22" y1="11" x2="16" y2="11"/>
                  </svg>
                  <span id="landing-register-btn-text">${isAr ? 'إنشاء حساب جديد' : 'Create Account'}</span>
                </button>
              ` : `
                <!-- When authenticated, show navigation to Dashboard -->
                <button type="button" class="btn btn-primary landing-nav-login-btn" onclick="AkkedApp.navigate('dashboard')" aria-label="${isAr ? 'لوحة التحكم' : 'Dashboard'}">
                  <span>${isAr ? 'لوحة التحكم' : 'Dashboard'}</span>
                </button>
              `}

              <!-- Mobile Menu Toggle Button -->
              <button class="header-btn header-btn-icon landing-mobile-toggle-btn" onclick="AkkedLanding.toggleMobileMenu()" aria-label="${isAr ? 'قائمة التنقل' : 'Navigation Menu'}" aria-expanded="false">
                <svg class="akked-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
              </button>
            </div>
          </div>

          <!-- Mobile Dropdown Navigation Menu -->
          <div class="landing-mobile-menu" id="landing-mobile-menu" aria-hidden="true">
            <nav class="landing-mobile-nav-links">
              ${!isAuth ? `
                <a href="#login" class="landing-mobile-nav-link" onclick="event.preventDefault(); AkkedLanding.closeMobileMenu(); AkkedApp.navigate('login');">
                  <svg class="akked-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                    <polyline points="10 17 15 12 10 7"/>
                    <line x1="15" y1="12" x2="3" y2="12"/>
                  </svg>
                  <span id="mobile-menu-login-text">${isAr ? 'تسجيل الدخول' : 'Log in'}</span>
                </a>
                <a href="#register" class="landing-mobile-nav-link landing-mobile-nav-link-primary" onclick="event.preventDefault(); AkkedLanding.closeMobileMenu(); AkkedApp.navigate('register');">
                  <svg class="akked-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <line x1="19" y1="8" x2="19" y2="14"/>
                    <line x1="22" y1="11" x2="16" y2="11"/>
                  </svg>
                  <span id="mobile-menu-register-text">${isAr ? 'إنشاء حساب جديد' : 'Create Account'}</span>
                </a>
              ` : `
                <a href="#dashboard" class="landing-mobile-nav-link" onclick="event.preventDefault(); AkkedLanding.closeMobileMenu(); AkkedApp.navigate('dashboard');">
                  <span id="mobile-menu-dash-text">${isAr ? 'لوحة التحكم' : 'Dashboard'}</span>
                </a>
              `}
              <button type="button" class="landing-mobile-nav-link" onclick="AkkedLanding.closeMobileMenu(); AkkedApp.toggleTheme();" style="width: 100%; border: 1px solid var(--border-light); cursor: pointer; text-align: start;">
                <svg class="akked-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/></svg>
                <span id="mobile-menu-theme-text">${I18N.t('switchTheme')}</span>
              </button>
            </nav>
          </div>
        </header>

        <!-- Main Landing Content Flow -->
        <main class="landing-main-flow">

          <!-- 1. Official Logo, 2. Main Heading & Sentence, 3. Interactive Illustration -->
          <section class="landing-hero-section" id="landing-top">
            <div class="landing-hero-container">
              
              <!-- SECTION 1: LOGO (Top Center) -->
              <div class="landing-hero-logo-wrap">
                <img 
                  src="assets/akkid-logo.png" 
                  alt="أكّد" 
                  class="landing-hero-logo" 
                  width="118" 
                  height="163">
              </div>

              <!-- SECTION 2: MAIN MESSAGE (Directly Below Logo, Centered) -->
              <div class="landing-hero-text">
                <h1 class="landing-hero-title">
                  ${I18N.t('heroTitle')}
                </h1>
                <p class="landing-hero-subtitle">
                  ${I18N.t('heroSubtitle')}
                </p>
              </div>

              <!-- SECTION 3: INTERACTIVE ILLUSTRATION (Directly Below Main Message, Centered) -->
              <div class="landing-hero-visual" id="landing-hero-visual" aria-hidden="true">
                ${this.renderCharacterSvg(isAr)}
              </div>

            </div>
          </section>

          <!-- SECTION 4: INTRODUCTORY VIDEO (Directly Below Interactive Illustration) -->
          <section class="landing-section landing-video-section" id="landing-video-section" dir="${isAr ? 'rtl' : 'ltr'}">
            <div class="landing-section-header">
              <h2 class="video-section-heading">
                ${I18N.t('videoSectionTitle')}
              </h2>
              <p class="video-section-desc">
                ${I18N.t('videoSectionDesc')}
              </p>
            </div>
            <div class="landing-video-clean-wrapper">
              <div class="video-clean-media-container" id="video-media-container">
                <video 
                  id="akked-main-explainer-video" 
                  class="video-clean-element"
                  controls
                  preload="metadata"
                  playsinline
                  aria-label="${isAr ? 'تشغيل الفيديو التعريفي لمنصة أكّد' : 'Play Akked Explainer Video'}">
                  <source src="assets/WhatsApp%20Video%202026-09-03%20at%2011.46.38%20PM.mp4" type="video/mp4">
                  <source src="assets/WhatsApp Video 2026-09-03 at 11.46.38 PM.mp4" type="video/mp4">
                  <p style="padding: 24px; text-align: center; color: var(--text-muted);">
                    ${isAr ? 'متصفحك لا يدعم تشغيل الفيديو المباشر.' : 'Your browser does not support HTML5 video.'}
                  </p>
                </video>
              </div>
            </div>
          </section>

          <!-- SECTION 5: HOW AKKED WORKS (Directly Below Video) & SECTION 6: PRIMARY ACTION BUTTON -->
          <section class="landing-how-works-section" id="how-akked-works" dir="${isAr ? 'rtl' : 'ltr'}">
            <div class="how-works-container">
              <h2 class="how-works-heading" id="how-works-title">${isAr ? 'كيف تعمل أكّد؟' : 'How Akked Works'}</h2>
              <p class="how-works-subtitle" id="how-works-subtitle">${isAr ? 'ثلاث خطوات بسيطة لإثبات المطلوب دون مشاركة بياناتك الكاملة' : 'Three simple steps to prove what is required without sharing your complete personal data.'}</p>
              <div class="how-works-image-wrapper">
                <img 
                  id="how-works-img"
                  src="${isAr ? 'assets/how-akked-works.png' : 'assets/how-akked-works-en.jpg'}" 
                  alt="${isAr ? 'كيف تعمل أكّد؟ - ثلاث خطوات بسيطة لإثبات المطلوب دون مشاركة بياناتك الكاملة' : 'How Akked Works - Three simple steps to prove what is required without sharing your complete personal data.'}" 
                  class="how-works-img"
                  width="1024"
                  height="682"
                  loading="lazy">
              </div>

              <!-- SECTION 6: PRIMARY ACTION BUTTON (Bottom of Landing-Page Content) -->
              <div class="landing-bottom-cta">
                <button type="button" id="how-works-btn" class="btn btn-primary landing-primary-entry-btn" onclick="AkkedApp.navigate('login')" aria-label="${isAr ? 'الدخول إلى المنصة' : 'Enter the Platform'}">
                  ${isAr ? 'الدخول إلى المنصة' : 'Enter the Platform'}
                </button>
              </div>
            </div>
          </section>

        </main>

        <!-- Public Landing Footer -->
        <footer class="landing-footer">
          <div class="landing-footer-container">
            <div class="landing-footer-left">
              <div>
                <span style="font-weight: 800; color: var(--brand-primary); font-size: 1.05rem;">أكّد</span>
                <span style="color: var(--text-muted); font-size: 0.85rem; margin-inline-start: 8px;">— ${I18N.t('landingFooterTagline')}</span>
              </div>
            </div>

            <div class="landing-footer-center">
              <span>${I18N.t('landingFooterRights')}</span>
            </div>
          </div>
        </footer>

      </div>
    `;
  },

  toggleMobileMenu() {
    const menu = document.getElementById('landing-mobile-menu');
    const btn = document.querySelector('.landing-mobile-toggle-btn');
    if (!menu) return;
    const isOpen = menu.classList.toggle('open');
    menu.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    if (btn) btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  },

  closeMobileMenu() {
    const menu = document.getElementById('landing-mobile-menu');
    const btn = document.querySelector('.landing-mobile-toggle-btn');
    if (menu) {
      menu.classList.remove('open');
      menu.setAttribute('aria-hidden', 'true');
    }
    if (btn) btn.setAttribute('aria-expanded', 'false');
  },

  renderCharacterSvg(isAr = (typeof I18N !== 'undefined' && I18N.currentLang === 'ar')) {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 440" width="100%" height="100%" class="akked-hero-character-svg" aria-label="${isAr ? 'شخصية أكّد التوضيحية للتحقق الآمن' : 'Akked illustrative character for secure verification'}" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="blazerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#171A2E"/>
            <stop offset="100%" stop-color="#4F0D49"/>
          </linearGradient>
          <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#68145F"/>
            <stop offset="100%" stop-color="#4F0D49"/>
          </linearGradient>
          <linearGradient id="phoneScreenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#FFFFFF"/>
            <stop offset="100%" stop-color="#EEF0F4"/>
          </linearGradient>
          <linearGradient id="mintGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#55BFA3"/>
            <stop offset="100%" stop-color="#3FA68B"/>
          </linearGradient>
          <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="6" stdDeviation="10" flood-color="#171A2E" flood-opacity="0.12"/>
          </filter>
          <filter id="mintGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="4" flood-color="#55BFA3" flood-opacity="0.4"/>
          </filter>
        </defs>

        <!-- Ambient Backdrop Aura -->
        <circle cx="190" cy="220" r="160" fill="#EEF0F4" opacity="0.55"/>
        <circle cx="190" cy="220" r="130" fill="url(#purpleGrad)" opacity="0.06"/>

        <!-- Character Group Root -->
        <g id="hero-character-body" class="char-body-group">

          <!-- Torso & Shoulders (Gentle breathing movement) -->
          <g id="char-torso" class="char-torso-anim">
            <path d="M90 380 Q95 285 140 260 L240 260 Q285 285 290 380 L310 440 L70 440 Z" fill="url(#blazerGrad)" filter="url(#softShadow)"/>
            <path d="M152 260 L190 320 L228 260 Z" fill="#FFFFFF"/>
            <path d="M140 260 L180 345 L190 345 L152 260 Z" fill="#68145F"/>
            <path d="M240 260 L200 345 L190 345 L228 260 Z" fill="#4F0D49"/>
            <path d="M115 365 L145 365" stroke="#68145F" stroke-width="3" stroke-linecap="round" opacity="0.7"/>
          </g>

          <!-- Neck & Head Group (Gentle head tilt & breathing) -->
          <g id="char-head-group" class="char-head-anim">
            <path d="M172 230 L172 265 Q190 272 208 265 L208 230 Z" fill="#E5B895"/>
            <path d="M172 248 Q190 258 208 248 L208 265 Q190 272 172 265 Z" fill="#D49B74" opacity="0.4"/>

            <ellipse cx="190" cy="180" rx="42" ry="52" fill="#E5B895" filter="url(#softShadow)"/>
            <path d="M142 180 Q138 120 190 120 Q242 120 238 180 Q235 220 226 230 Q205 240 190 240 Q175 240 154 230 Q145 220 142 180 Z" fill="#171A2E"/>

            <circle cx="148" cy="182" r="9" fill="#E5B895"/>
            <circle cx="232" cy="182" r="9" fill="#E5B895"/>
            <circle cx="148" cy="182" r="5" fill="#D49B74" opacity="0.6"/>
            <circle cx="232" cy="182" r="5" fill="#D49B74" opacity="0.6"/>

            <ellipse cx="190" cy="184" rx="38" ry="46" fill="#E8BD9C"/>
            <path d="M144 165 Q155 130 190 128 Q228 126 236 160 Q225 145 198 142 Q168 138 148 160 Z" fill="#171A2E"/>
            <path d="M148 160 Q175 145 205 152 Q180 140 152 152 Z" fill="#4F0D49" opacity="0.6"/>

            <path d="M162 165 Q172 162 180 166" stroke="#171A2E" stroke-width="2.5" stroke-linecap="round" fill="none"/>
            <path d="M200 166 Q208 162 218 165" stroke="#171A2E" stroke-width="2.5" stroke-linecap="round" fill="none"/>

            <!-- Eyes (Calm Blinking Group) -->
            <g id="char-eyes" class="char-eyes-anim">
              <ellipse cx="171" cy="176" rx="4.5" ry="4.5" fill="#171A2E"/>
              <circle cx="172.5" cy="174.5" r="1.5" fill="#FFFFFF"/>
              
              <ellipse cx="209" cy="176" rx="4.5" ry="4.5" fill="#171A2E"/>
              <circle cx="210.5" cy="174.5" r="1.5" fill="#FFFFFF"/>

              <path d="M166 172 Q171 170 176 172" stroke="#171A2E" stroke-width="1.2" stroke-linecap="round" fill="none" opacity="0.5"/>
              <path d="M204 172 Q209 170 214 172" stroke="#171A2E" stroke-width="1.2" stroke-linecap="round" fill="none" opacity="0.5"/>
            </g>

            <path d="M189 178 L187 192 L193 192" stroke="#D49B74" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
            <path d="M178 205 Q190 214 202 205" stroke="#68145F" stroke-width="2.6" stroke-linecap="round" fill="none"/>
            <circle cx="162" cy="192" r="7" fill="#E08B8B" opacity="0.25"/>
            <circle cx="218" cy="192" r="7" fill="#E08B8B" opacity="0.25"/>
          </g>

          <!-- Arms & Smartphone Presentation Group -->
          <g id="char-arms-phone" class="char-arms-group">
            <path d="M100 370 Q110 310 145 315 L165 330 Q145 355 125 410 Z" fill="#171A2E"/>
            <path d="M280 370 Q270 310 235 315 L215 330 Q235 355 255 410 Z" fill="#171A2E"/>

            <!-- The Tablet Screen Container -->
            <g id="hero-smartphone" transform="translate(130, 268)" filter="url(#softShadow)">
              <!-- Tablet Outer Frame -->
              <rect x="0" y="0" width="124" height="160" rx="16" fill="#171A2E" stroke="#4F0D49" stroke-width="2.5"/>
              
              <!-- White Tablet Screen Glass -->
              <rect x="6" y="8" width="112" height="144" rx="11" fill="#FFFFFF"/>
              <rect x="6" y="8" width="112" height="144" rx="11" fill="url(#phoneScreenGrad)" opacity="0.6"/>

              <!-- Tablet Top Notch/Speaker -->
              <rect x="48" y="11" width="28" height="2.5" rx="1.2" fill="#171A2E" opacity="0.25"/>

              <!-- 4. Heading: «التحقق من بيانات الهوية» at Top Center with Generous Padding -->
              <g transform="translate(62, 17)">
                <!-- Mini Centered Akkid Shield Icon -->
                <path d="M-5 0 L0 -2.5 L5 0 L5 4.5 Q5 8 0 10.5 Q-5 8 -5 4.5 Z" fill="#68145F"/>
                <path d="M-2.5 4 L-0.8 5.8 L2.8 2.2" stroke="#FFFFFF" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                
                <!-- Heading Text strictly centered, RTL/LTR, with safe padding -->
                <text id="svg-char-title" x="0" y="16.5" font-family="${isAr ? 'Tajawal, sans-serif' : 'Inter, sans-serif'}" font-size="${isAr ? 6.4 : 5.8}" font-weight="800" fill="#171A2E" text-anchor="middle" direction="${isAr ? 'rtl' : 'ltr'}">${isAr ? 'التحقق من بيانات الهوية' : 'Identity verification'}</text>
              </g>

              <!-- Subtle Divider Line Centered -->
              <line x1="22" y1="41" x2="102" y2="41" stroke="#EEF0F4" stroke-width="1"/>

              <!-- 5. «البيانات الإضافية» in Center + 6. Clean Centered Bullet List of Small Dots -->
              <g id="phone-data-rows" class="phone-data-anim">
                <!-- Subheading «البيانات الإضافية» in Center -->
                <text id="svg-char-subheading" x="62" y="55" font-family="${isAr ? 'Tajawal, sans-serif' : 'Inter, sans-serif'}" font-size="${isAr ? 6.6 : 6.0}" font-weight="700" fill="#4F0D49" text-anchor="middle" direction="${isAr ? 'rtl' : 'ltr'}">${isAr ? 'البيانات الإضافية' : 'Additional data'}</text>
                
                <!-- Bullet Item 1 (Clean small dot + masked dots, perfectly centered) -->
                <g transform="translate(62, 68)">
                  <circle cx="-22" cy="-1.5" r="1.6" fill="#68145F"/>
                  <text x="2" y="1" font-family="monospace" font-size="7" font-weight="700" fill="#68145F" letter-spacing="1.5" text-anchor="middle">••••••••</text>
                </g>

                <!-- Bullet Item 2 (Clean small dot + masked dots, perfectly centered) -->
                <g transform="translate(62, 79)">
                  <circle cx="-22" cy="-1.5" r="1.6" fill="#68145F"/>
                  <text x="2" y="1" font-family="monospace" font-size="7" font-weight="700" fill="#68145F" letter-spacing="1.5" text-anchor="middle">••••••••</text>
                </g>

                <!-- Bullet Item 3 (Clean small dot + masked dots, perfectly centered) -->
                <g transform="translate(62, 90)">
                  <circle cx="-22" cy="-1.5" r="1.6" fill="#68145F"/>
                  <text x="2" y="1" font-family="monospace" font-size="7" font-weight="700" fill="#68145F" letter-spacing="1.5" text-anchor="middle">••••••••</text>
                </g>
              </g>

              <!-- Confirmation Mint Check Pop (Centered above result badge) -->
              <g id="phone-mint-check" class="phone-check-anim" transform="translate(62, 103)">
                <circle cx="0" cy="0" r="10" fill="#55BFA3" filter="url(#mintGlow)"/>
                <path d="M-3.5 0 L-1 2.5 L3.5 -2.5" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
              </g>

              <!-- 7. Green «مؤهل فقط» Result Centered, Fully Contained (No overlap with hands or frame) -->
              <g id="phone-result-badge" class="phone-result-anim" transform="translate(62, 116)">
                <rect x="-37" y="0" width="74" height="21" rx="10.5" fill="url(#mintGrad)" filter="url(#mintGlow)"/>
                <path d="M-23 10.5 L-19.5 14 L-13 7" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                <text id="svg-char-result" x="6" y="13.5" font-family="${isAr ? 'Tajawal, sans-serif' : 'Inter, sans-serif'}" font-size="${isAr ? 7.8 : 7.2}" font-weight="900" fill="#FFFFFF" text-anchor="middle" direction="${isAr ? 'rtl' : 'ltr'}">${isAr ? 'مؤهل فقط' : 'Eligible only'}</text>
              </g>
            </g>

            <!-- Left Hand -->
            <g id="char-hand-hold">
              <path d="M124 330 Q126 312 136 318 Q142 328 134 340 Z" fill="#E5B895"/>
              <ellipse cx="124" cy="350" rx="6" ry="12" fill="#D49B74"/>
            </g>

            <!-- Right Hand & Tapping Index Finger -->
            <g id="char-hand-tap" class="char-tap-anim">
              <ellipse cx="230" cy="340" rx="14" ry="10" fill="#E5B895"/>
              <path d="M224 332 L206 316 Q200 312 205 306 Q210 300 216 308 L228 325 Z" fill="#E5B895"/>
              <circle cx="204" cy="310" r="4.5" fill="#D49B74"/>
              <circle id="phone-tap-ripple" cx="204" cy="310" r="10" stroke="#55BFA3" stroke-width="1.5" fill="none" opacity="0" class="tap-ripple-anim"/>
            </g>
          </g>

        </g>
      </svg>
    `;
  },

  initHeroInteractions() {
    // Start character animation smoothly after load without delaying page paint
    setTimeout(() => {
      const visual = document.getElementById('landing-hero-visual');
      if (visual) {
        visual.classList.add('landing-hero-animated');
      }
    }, 150);

    // Setup single-trigger scroll reveal for cards and sections
    if ('IntersectionObserver' in window) {
      const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target); // Trigger each reveal only once
          }
        });
      }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
      });

      document.querySelectorAll('.landing-reveal-item').forEach(el => {
        revealObserver.observe(el);
      });
    } else {
      // Fallback for environments without IntersectionObserver
      document.querySelectorAll('.landing-reveal-item').forEach(el => {
        el.classList.add('is-revealed');
      });
    }

    // Listen for languageChanged event to update How It Works immediately in-place
    if (!this._langListenerAttached) {
      document.addEventListener('languageChanged', (e) => {
        const currentLang = e.detail && e.detail.lang ? e.detail.lang : (I18N.getLanguage ? I18N.getLanguage() : 'ar');
        this.updateHowItWorksLanguage(currentLang);
      });
      this._langListenerAttached = true;
    }
  },

  updateHowItWorksLanguage(lang) {
    this.updateLanguage(lang);
  },

  updateLanguage(lang) {
    const isAr = lang === 'ar';
    if (typeof I18N !== 'undefined') {
      I18N.currentLang = lang;
    }

    // 1. Update Document Direction
    document.documentElement.lang = lang;
    document.documentElement.dir = isAr ? 'rtl' : 'ltr';

    // 2. Update Header Language Button & Auth Actions
    const langBtnText = document.getElementById('landing-lang-btn-text');
    if (langBtnText) {
      langBtnText.textContent = isAr ? 'English' : 'العربية';
    }
    const langBtn = document.getElementById('landing-lang-btn');
    if (langBtn) {
      langBtn.setAttribute('title', isAr ? 'English' : 'العربية');
      langBtn.setAttribute('aria-label', isAr ? 'English' : 'العربية');
    }

    const loginBtn = document.getElementById('landing-login-btn');
    const loginBtnText = document.getElementById('landing-login-btn-text');
    if (loginBtn) {
      loginBtn.setAttribute('aria-label', isAr ? 'تسجيل الدخول' : 'Log in');
    }
    if (loginBtnText) {
      loginBtnText.textContent = isAr ? 'تسجيل الدخول' : 'Log in';
    }

    const regBtn = document.getElementById('landing-register-btn');
    const regBtnText = document.getElementById('landing-register-btn-text');
    if (regBtn) {
      regBtn.setAttribute('aria-label', isAr ? 'إنشاء حساب جديد' : 'Create Account');
    }
    if (regBtnText) {
      regBtnText.textContent = isAr ? 'إنشاء حساب جديد' : 'Create Account';
    }

    const mobLoginText = document.getElementById('mobile-menu-login-text');
    if (mobLoginText) mobLoginText.textContent = isAr ? 'تسجيل الدخول' : 'Log in';

    const mobRegText = document.getElementById('mobile-menu-register-text');
    if (mobRegText) mobRegText.textContent = isAr ? 'إنشاء حساب جديد' : 'Create Account';

    const mobThemeText = document.getElementById('mobile-menu-theme-text');
    if (mobThemeText) mobThemeText.textContent = I18N.t('switchTheme');

    // 3. Update Hero Section
    const heroTitle = document.querySelector('.landing-hero-title');
    if (heroTitle) heroTitle.textContent = I18N.t('heroTitle');

    const heroSubtitle = document.querySelector('.landing-hero-subtitle');
    if (heroSubtitle) heroSubtitle.textContent = I18N.t('heroSubtitle');

    const heroSection = document.querySelector('.landing-hero-section');
    if (heroSection) heroSection.setAttribute('dir', isAr ? 'rtl' : 'ltr');

    // 4. Update Interactive Character Illustration Tablet Screen
    const charTitle = document.getElementById('svg-char-title');
    if (charTitle) {
      charTitle.textContent = isAr ? 'التحقق من بيانات الهوية' : 'Identity verification';
      charTitle.setAttribute('direction', isAr ? 'rtl' : 'ltr');
      charTitle.setAttribute('font-family', isAr ? 'Tajawal, sans-serif' : 'Inter, sans-serif');
      charTitle.setAttribute('font-size', isAr ? '6.4' : '5.8');
    }

    const charSub = document.getElementById('svg-char-subheading');
    if (charSub) {
      charSub.textContent = isAr ? 'البيانات الإضافية' : 'Additional data';
      charSub.setAttribute('direction', isAr ? 'rtl' : 'ltr');
      charSub.setAttribute('font-family', isAr ? 'Tajawal, sans-serif' : 'Inter, sans-serif');
      charSub.setAttribute('font-size', isAr ? '6.6' : '6.0');
    }

    const charRes = document.getElementById('svg-char-result');
    if (charRes) {
      charRes.textContent = isAr ? 'مؤهل فقط' : 'Eligible only';
      charRes.setAttribute('direction', isAr ? 'rtl' : 'ltr');
      charRes.setAttribute('font-family', isAr ? 'Tajawal, sans-serif' : 'Inter, sans-serif');
      charRes.setAttribute('font-size', isAr ? '7.8' : '7.2');
    }

    // 5. Update Video Section
    const videoSection = document.querySelector('.landing-video-section');
    if (videoSection) videoSection.setAttribute('dir', isAr ? 'rtl' : 'ltr');

    const videoHeading = document.querySelector('.video-section-heading');
    if (videoHeading) videoHeading.textContent = I18N.t('videoSectionTitle');

    const videoDesc = document.querySelector('.video-section-desc');
    if (videoDesc) videoDesc.textContent = I18N.t('videoSectionDesc');

    const videoEl = document.getElementById('akked-main-explainer-video');
    if (videoEl) {
      videoEl.setAttribute('aria-label', isAr ? 'تشغيل الفيديو التعريفي لمنصة أكّد' : 'Play Akked Explainer Video');
    }

    // 6. Update How Akked Works Section
    const howSection = document.getElementById('how-akked-works');
    const title = document.getElementById('how-works-title');
    const subtitle = document.getElementById('how-works-subtitle');
    const img = document.getElementById('how-works-img');
    const btn = document.getElementById('how-works-btn');

    if (howSection) {
      howSection.setAttribute('dir', isAr ? 'rtl' : 'ltr');
    }
    if (title) {
      title.textContent = I18N.t('howItWorksTitle');
    }
    if (subtitle) {
      subtitle.textContent = I18N.t('howItWorksSubtitle');
    }
    if (img) {
      img.src = isAr ? 'assets/how-akked-works.png' : 'assets/how-akked-works-en.jpg';
      img.alt = `${I18N.t('howItWorksTitle')} - ${I18N.t('howItWorksSubtitle')}`;
    }
    if (btn) {
      btn.textContent = I18N.t('howItWorksBtn');
      btn.setAttribute('aria-label', I18N.t('howItWorksBtn'));
    }
  }
};
