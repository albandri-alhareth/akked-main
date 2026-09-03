/**
 * Akked Central State Store & LocalStorage Persistence
 */

const SEED_SHARES = [
  {
    id: 'DEMO-018',
    docType: 'national_id',
    recipientId: 'recipient_store',
    recipientNameAr: 'متجر إلكتروني',
    recipientNameEn: 'E-Commerce Store',
    purposeId: 'purpose_age',
    purposeNameAr: 'التحقق من الأهلية العمرية (فوق 18 عاماً)',
    purposeNameEn: 'Age Eligibility Verification (18+ Only)',
    sharedClaimsAr: 'مؤهل: المستخدم فوق 18 عاماً فقط',
    sharedClaimsEn: 'Eligible: User is Over 18 Only',
    shieldedFieldsCount: 6,
    createdDate: '2026-09-02 11:30',
    expiryDate: '2026-09-02 12:30',
    status: 'active', // active | expired | revoked
    sha256Hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    watermark: 'صادر حصرياً لـ: متجر إلكتروني - التحقق من الأهلية العمرية',
    allowedFieldIds: ['age_calc']
  },
  {
    id: 'AKK-512',
    docType: 'salary_cert',
    recipientId: 'recipient_aqar',
    recipientNameAr: 'المنصة العقار',
    recipientNameEn: 'Aqar Platform',
    purposeId: 'purpose_salary',
    purposeNameAr: 'التحقق من الأهلية للتعاقد العقاري والحد الأدنى للدخل',
    purposeNameEn: 'Real Estate Lease Qualification & Income Threshold',
    sharedClaimsAr: 'الحالة: مؤهل | نطاق الدخل: الفئة المعتمدة',
    sharedClaimsEn: 'Status: Eligible | Income: Verified Bracket',
    shieldedFieldsCount: 5,
    createdDate: '2026-09-01 14:15',
    expiryDate: '2026-09-08 14:15',
    status: 'active',
    sha256Hash: '8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4',
    watermark: 'صادر حصرياً لـ: المنصة العقار',
    allowedFieldIds: ['status_active', 'salary_range']
  },
  {
    id: 'EXP-094',
    docType: 'warranty_receipt',
    recipientId: 'recipient_service_center',
    recipientNameAr: 'مركز صيانة الأجهزة المعتمد',
    recipientNameEn: 'Authorized Electronics Service',
    purposeId: 'purpose_warranty',
    purposeNameAr: 'التحقق من سريان الضمان والرقم التسلسلي',
    purposeNameEn: 'Warranty Validity & Serial Check',
    sharedClaimsAr: 'سريان الضمان والرقم التسلسلي للجهاز',
    sharedClaimsEn: 'Warranty Status & Serial Number Only',
    shieldedFieldsCount: 3,
    createdDate: '2026-08-20 09:00',
    expiryDate: '2026-08-27 09:00',
    status: 'expired',
    sha256Hash: 'ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb',
    watermark: 'صادر حصرياً لـ: مركز صيانة الأجهزة المعتمد',
    allowedFieldIds: ['item_name', 'serial_no', 'warranty_status']
  }
];

const SEED_ENTITIES = [
  {
    id: 'recipient_store',
    nameAr: 'متجر إلكتروني',
    nameEn: 'E-Commerce Store',
    categoryAr: 'تجارة إلكترونية',
    categoryEn: 'E-Commerce',
    icon: 'building',
    trustScore: 98,
    totalShares: 12,
    verifiedScopes: ['age_verification'],
    privacyPolicyUrl: 'https://example.com/privacy',
    pdplCompliant: true
  },
  {
    id: 'recipient_aqar',
    nameAr: 'المنصة العقار',
    nameEn: 'Aqar Platform',
    categoryAr: 'عقارات وتأجير',
    categoryEn: 'Real Estate & Rental',
    icon: 'building',
    trustScore: 96,
    totalShares: 8,
    verifiedScopes: ['salary_threshold', 'active_lease'],
    privacyPolicyUrl: 'https://example.com/privacy',
    pdplCompliant: true
  },
  {
    id: 'recipient_service_center',
    nameAr: 'مركز صيانة الأجهزة المعتمد',
    nameEn: 'Authorized Electronics Service',
    categoryAr: 'خدمات وصيانة',
    categoryEn: 'Technical Services',
    icon: 'building',
    trustScore: 99,
    totalShares: 3,
    verifiedScopes: ['warranty_check', 'serial_lookup'],
    privacyPolicyUrl: 'https://example.com/privacy',
    pdplCompliant: true
  }
];

const SEED_ALERTS = [
  {
    id: 'alt_01',
    type: 'verification',
    titleAr: 'تم التحقق من إثبات العمر',
    titleEn: 'Age Proof Verified Successfully',
    descAr: 'قام "متجر إلكتروني" بالتحقق من الإثبات DEMO-018 دون كشف رقم الهوية.',
    descEn: 'E-Commerce Store verified proof DEMO-018 without reading your National ID.',
    timestamp: 'منذ 10 دقائق',
    read: false
  },
  {
    id: 'alt_02',
    type: 'expiry',
    titleAr: 'انتهاء صلاحية إثبات الضمان',
    titleEn: 'Warranty Proof Expired',
    descAr: 'انتهت صلاحية الإثبات EXP-094 لـ "مركز صيانة الأجهزة المعتمد" وحُجبت بياناته.',
    descEn: 'Proof EXP-094 for Authorized Electronics Service has expired.',
    timestamp: 'منذ يومين',
    read: true
  },
  {
    id: 'alt_03',
    type: 'security',
    titleAr: 'فحص تكامل أمني ناجح',
    titleEn: 'Tamper Integrity Audit Passed',
    descAr: 'تمت مطابقة بصمة SHA-256 محلياً لجميع الإثباتات النشطة بنجاح.',
    descEn: 'SHA-256 local hash verified with zero tamper anomalies.',
    timestamp: 'منذ 3 ساعات',
    read: true
  }
];

const SEED_PENDING_REQUESTS = [
  {
    id: 'REQ-AGE-01',
    type: 'data_sharing',
    category: 'age_verification',
    status: 'AWAITING_USER_DECISION', // NEW | PENDING_REVIEW | AWAITING_USER_DECISION | APPROVED | REJECTED | PROCESSING | COMPLETED | FAILED | EXPIRED | CANCELLED
    recipientId: 'recipient_store',
    recipientNameAr: 'متجر إلكتروني',
    recipientNameEn: 'E-Commerce Store',
    purposeAr: 'التحقق من بلوغ السن القانوني (فوق 18 عاماً)',
    purposeEn: 'Legal age verification (18+)',
    requestedDataAr: 'نتيجة أنك فوق 18 عاماً فقط (بدون كشف رقم الهوية أو الاسم أو العنوان)',
    requestedDataEn: 'Over 18 claim only (no ID, name, or address exposed)',
    durationAr: '15 دقيقة (إثبات رقمي أحادي الاستخدام)',
    durationEn: '15 Minutes (One-time digital proof)',
    riskLevel: 'low',
    riskAr: 'مستوى منخفض جداً — تشفير محلي 100% ومتوافق مع PDPL',
    riskEn: 'Lowest Risk — 100% Local Cryptography & PDPL Compliant',
    isTrusted: true,
    spokenPromptAr: 'لديك طلب جديد من متجر إلكتروني للتحقق من العمر. المطلوب مشاركة نتيجة أنك فوق 18 عاماً فقط. هل ترغب بالموافقة؟',
    spokenPromptEn: 'You have a new request from an E-Commerce Store for age verification. Required: sharing only the result that you are over 18. Do you wish to approve?'
  },
  {
    id: 'REQ-AQAR-02',
    type: 'data_sharing',
    category: 'lease_qualification',
    status: 'PENDING_REVIEW',
    recipientId: 'recipient_aqar',
    recipientNameAr: 'المنصة العقار',
    recipientNameEn: 'Aqar Platform',
    purposeAr: 'التحقق من الأهلية للتعاقد العقاري والحد الأدنى للدخل',
    purposeEn: 'Real Estate Lease Qualification',
    requestedDataAr: 'إثبات نطاق الدخل المطلوب دون كشف كشف الحساب البنكي أو رقم الآيبان',
    requestedDataEn: 'Income bracket qualification without exposing bank statements or IBAN',
    durationAr: '24 ساعة',
    durationEn: '24 Hours',
    riskLevel: 'low',
    riskAr: 'مستوى منخفض — حجب الراتب الدقيق وتشفير النطاق',
    riskEn: 'Low Risk — Masked exact salary & zero IBAN exposure',
    isTrusted: true,
    spokenPromptAr: 'لديك طلب من المنصة العقار للتحقق من الأهلية. المطلوب إثبات نطاق الدخل المطلوب للتعاقد دون كشف كشف الحساب البنكي. هل توافق؟',
    spokenPromptEn: 'You have a request from Aqar Platform for lease qualification. Required: income bracket proof without exposing bank statements. Do you wish to approve?'
  },
  {
    id: 'REQ-SUB-CHATGPT',
    type: 'subscription_renewal',
    category: 'financial_subscription',
    status: 'NEW',
    serviceName: 'ChatGPT',
    providerNameAr: 'OpenAI / ChatGPT',
    providerNameEn: 'OpenAI / ChatGPT',
    amountAr: '75.00 ريال سعودي / شهر',
    amountEn: '75.00 SAR / Month',
    purposeAr: 'تجديد الاشتراك الشهري لخدمة الذكاء الاصطناعي',
    purposeEn: 'Monthly subscription renewal for AI service',
    requestedDataAr: 'رمز تفويض مالي مشفر بحد أدنى دون كشف بطاقتك الائتمانية',
    requestedDataEn: 'Masked zero-exposure payment token without exposing credit card details',
    durationAr: 'شهر واحد قابل للتجديد',
    durationEn: '1 Month Renewable',
    riskLevel: 'moderate',
    riskAr: 'تفويض مالي مشفر — يتطلب تأكيداً صوتياً صريحاً',
    riskEn: 'Encrypted financial authorization — requires explicit confirmation',
    isSensitiveFinancial: true,
    isTrusted: true,
    spokenPromptAr: 'يوجد لديك طلب تجديد اشتراك في ChatGPT بقيمة 75 ريال. هل ترغب في التجديد؟',
    spokenPromptEn: 'You have a subscription renewal request for ChatGPT for 75 SAR. Would you like to renew?'
  }
];

const DEFAULT_SETTINGS = {
  theme: 'light',
  strictMode: true,
  watermarkDensity: 'medium',
  defaultDuration: '1_hour',
  profile: {
    nameAr: '',
    nameEn: '',
    email: '',
    phone: '',
    avatarUrl: '',
    roleAr: '',
    roleEn: '',
    privacyId: 'AKD-9942-PRIV-SA',
    verified: true,
    hardwareKeyFingerprint: 'SHA256:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069'
  },
  notifications: {
    inAppAlerts: true,
    expiryReminders: true,
    revocationAlerts: true,
    pushNotifications: true,
    weeklyDigest: false
  },
  accessibility: {
    enabled: false,
    micPermissionGranted: false,
    spokenAnnouncements: true,
    liveCaptions: true,
    externalNotifs: true,
    highContrast: false,
    largeText: false,
    activeScenario: 'chatgpt', // age | chatgpt | rental
    speechRate: 1.0,
    isMuted: false
  },
  teamMembers: []
};

window.AkkedState = {
  shares: [],
  entities: [],
  alerts: [],
  pendingRequests: [],
  currentWizard: {
    step: 1,
    selectedDoc: null,
    uploadedFile: null,
    recipient: null,
    purpose: null,
    allowedFields: [],
    redactionStyle: 'blackout',
    duration: '1_hour',
    generatedProof: null
  },
  settings: { ...DEFAULT_SETTINGS },

  init() {
    // Load from localStorage or initialize with seed data
    try {
      const storedShares = localStorage.getItem('akked_shares');
      this.shares = storedShares ? JSON.parse(storedShares) : [...SEED_SHARES];

      const storedEntities = localStorage.getItem('akked_entities');
      this.entities = storedEntities ? JSON.parse(storedEntities) : [...SEED_ENTITIES];

      const storedAlerts = localStorage.getItem('akked_alerts');
      this.alerts = storedAlerts ? JSON.parse(storedAlerts) : [...SEED_ALERTS];

      const storedPending = localStorage.getItem('akked_pending_requests');
      this.pendingRequests = storedPending ? JSON.parse(storedPending) : JSON.parse(JSON.stringify(SEED_PENDING_REQUESTS));

      const storedSettings = localStorage.getItem('akked_settings');
      if (storedSettings) {
        this.settings = { ...DEFAULT_SETTINGS, ...JSON.parse(storedSettings) };
        if (storedSettings.accessibility) {
          this.settings.accessibility = { ...DEFAULT_SETTINGS.accessibility, ...this.settings.accessibility };
        }
      } else {
        this.settings = JSON.parse(JSON.stringify(DEFAULT_SETTINGS));
      }

      // Sanitize profile to ensure no fake/fictional personal information remains
      if (this.settings && this.settings.profile) {
        const p = this.settings.profile;
        if (p.email && (p.email.includes('example.com') || p.email.includes('atheer') || p.email.includes('altree'))) {
          p.email = '';
        }
        if (p.nameAr && (p.nameAr.includes('أثير') || p.nameAr.includes('محمد بن علي'))) {
          p.nameAr = '';
        }
        if (p.nameEn && p.nameEn.toLowerCase().includes('atheer')) {
          p.nameEn = '';
        }
        if (p.phone && (p.phone.includes('+966 50 123 4567') || p.phone.includes('0501234567'))) {
          p.phone = '';
        }
      }
    } catch (e) {
      console.error('State load error:', e);
      this.shares = [...SEED_SHARES];
      this.entities = [...SEED_ENTITIES];
      this.alerts = [...SEED_ALERTS];
      this.pendingRequests = JSON.parse(JSON.stringify(SEED_PENDING_REQUESTS));
      this.settings = JSON.parse(JSON.stringify(DEFAULT_SETTINGS));
    }

    // Apply accessibility root classes if enabled
    this.applyAccessibilityMode();
  },

  save() {
    try {
      localStorage.setItem('akked_shares', JSON.stringify(this.shares));
      localStorage.setItem('akked_entities', JSON.stringify(this.entities));
      localStorage.setItem('akked_alerts', JSON.stringify(this.alerts));
      localStorage.setItem('akked_settings', JSON.stringify(this.settings));
    } catch (e) {
      console.error('State save error:', e);
    }
  },

  applyAccessibilityMode() {
    const isAcc = !!(this.settings && this.settings.accessibility && this.settings.accessibility.enabled);
    if (isAcc) {
      document.documentElement.setAttribute('data-accessibility', 'true');
      if (this.settings.accessibility.largeText) {
        document.documentElement.setAttribute('data-text-large', 'true');
      } else {
        document.documentElement.removeAttribute('data-text-large');
      }
      if (this.settings.accessibility.highContrast) {
        document.documentElement.setAttribute('data-high-contrast', 'true');
      } else {
        document.documentElement.removeAttribute('data-high-contrast');
      }

      // Trigger Voice Assistant Activation
      if (window.AkkedVoiceAssistant) {
        AkkedVoiceAssistant.onAccessibilityEnabled();
      }
    } else {
      document.documentElement.removeAttribute('data-accessibility');
      document.documentElement.removeAttribute('data-text-large');
      document.documentElement.removeAttribute('data-high-contrast');

      // Complete Normal Mode Isolation: Teardown Voice Engine & Audio Streams
      if (window.AkkedVoiceAssistant) {
        AkkedVoiceAssistant.teardown();
      }
    }
  },

  addShare(newShare) {
    this.shares.unshift(newShare);
    const newAlert = {
      id: 'alt_' + Date.now(),
      type: 'verification',
      titleAr: `تم إصدار إثبات جديد (${newShare.id})`,
      titleEn: `New Proof Issued (${newShare.id})`,
      descAr: `تم تقليص البيانات وتوليد إثبات مشفر لـ "${newShare.recipientNameAr}".`,
      descEn: `Minimization completed and proof issued for "${newShare.recipientNameEn}".`,
      timestamp: 'الآن',
      read: false
    };
    this.alerts.unshift(newAlert);
    this.save();
    document.dispatchEvent(new CustomEvent('stateChanged'));

    // If accessibility mode / external notifications enabled, trigger notification & audio
    if (this.settings.accessibility && this.settings.accessibility.enabled) {
      if (this.settings.accessibility.externalNotifs) {
        this.triggerExternalNotification(
          I18N.currentLang === 'ar' ? newAlert.titleAr : newAlert.titleEn,
          I18N.currentLang === 'ar' ? newAlert.descAr : newAlert.descEn
        );
      }
      if (this.settings.accessibility.spokenAnnouncements) {
        this.speakText(
          I18N.currentLang === 'ar'
            ? `تنبيه أمان: تم إصدار إثبات جديد للجهة ${newShare.recipientNameAr}.`
            : `Security Notice: A new proof was generated for ${newShare.recipientNameEn}.`
        );
      }
    }
  },

  revokeShare(shareId) {
    const target = this.shares.find(s => s.id === shareId);
    if (target) {
      target.status = 'revoked';
      const newAlert = {
        id: 'alt_' + Date.now(),
        type: 'revoked',
        titleAr: `تم إلغاء الإثبات (${shareId})`,
        titleEn: `Proof Revoked (${shareId})`,
        descAr: `تم سحب الصلاحية فوراً وتوقيف إمكانية التحقق من طرف المستلم.`,
        descEn: `Consent revoked. Credential verifications will now fail.`,
        timestamp: 'الآن',
        read: false
      };
      this.alerts.unshift(newAlert);
      this.save();
      document.dispatchEvent(new CustomEvent('stateChanged'));

      if (this.settings.accessibility && this.settings.accessibility.enabled && this.settings.accessibility.spokenAnnouncements) {
        this.speakText(
          I18N.currentLang === 'ar'
            ? `تم إلغاء الإثبات ${shareId} بنجاح وسحب الصلاحية فوراً.`
            : `Proof ${shareId} has been revoked successfully.`
        );
      }
    }
  },

  triggerExternalNotification(title, body) {
    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        try {
          new Notification(title, {
            body: body,
            icon: 'assets/akkid-logo.png'
          });
        } catch (e) {
          console.warn('Push notification error:', e);
        }
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            try {
              new Notification(title, {
                body: body,
                icon: 'assets/akkid-logo.png'
              });
            } catch (e) {}
          }
        });
      }
    }
  },

  speakText(text) {
    if (!('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel(); // Stop any pending speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = I18N.currentLang === 'ar' ? 'ar-SA' : 'en-US';
      utterance.rate = (this.settings.accessibility && this.settings.accessibility.speechRate) || 1.0;
      utterance.pitch = 1.0;

      // Try to find a natural matching voice
      const voices = window.speechSynthesis.getVoices();
      if (voices && voices.length > 0) {
        const langPrefix = I18N.currentLang === 'ar' ? 'ar' : 'en';
        const matchingVoice = voices.find(v => v.lang && v.lang.toLowerCase().startsWith(langPrefix));
        if (matchingVoice) {
          utterance.voice = matchingVoice;
        }
      }

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis error:', e);
    }
  },

  getPendingRequests() {
    return this.pendingRequests || [];
  },

  getNewAndPendingRequests() {
    return (this.pendingRequests || []).filter(r => ['NEW', 'PENDING_REVIEW', 'AWAITING_USER_DECISION'].includes(r.status));
  },

  getPendingDataRequests() {
    return (this.pendingRequests || []).filter(r => r.type === 'data_sharing');
  },

  getPendingSubscriptionRequests() {
    return (this.pendingRequests || []).filter(r => r.type === 'subscription_renewal' && r.status !== 'COMPLETED' && r.status !== 'FAILED');
  },

  getExpiredShares() {
    return (this.shares || []).filter(s => s.status === 'expired');
  },

  getUnreadAlerts() {
    return (this.alerts || []).filter(a => !a.read);
  },

  approveRequest(reqId) {
    const idx = (this.pendingRequests || []).findIndex(r => r.id === reqId);
    if (idx === -1) return null;

    const req = this.pendingRequests[idx];

    if (req.type === 'data_sharing') {
      const isAqar = req.id === 'REQ-AQAR-02' || (req.recipientNameAr && req.recipientNameAr.includes('عقار'));
      const newShare = {
        id: (isAqar ? 'AQR-' : 'AKD-') + Math.floor(100 + Math.random() * 900),
        docType: isAqar ? 'salary_cert' : 'national_id',
        recipientId: req.recipientId || (isAqar ? 'recipient_aqar' : 'recipient_store'),
        recipientNameAr: req.recipientNameAr,
        recipientNameEn: req.recipientNameEn,
        purposeId: isAqar ? 'purpose_salary' : 'purpose_age',
        purposeNameAr: req.purposeAr,
        purposeNameEn: req.purposeEn,
        sharedClaimsAr: req.requestedDataAr,
        sharedClaimsEn: req.requestedDataEn,
        shieldedFieldsCount: isAqar ? 5 : 8,
        createdDate: 'الآن',
        expiryDate: req.durationAr || 'بعد 15 دقيقة',
        status: 'active',
        sha256Hash: 'a78912e104b99c75a34e02194f1b88e14cb7261' + Math.floor(Math.random() * 100),
        watermark: `صادر حصرياً لـ: ${req.recipientNameAr} - ${req.purposeAr}`
      };

      this.shares.unshift(newShare);
      this.pendingRequests.splice(idx, 1);

      const alertItem = {
        id: 'alt_' + Date.now(),
        type: 'verification',
        titleAr: `تمت الموافقة على مشاركة إثبات لـ "${req.recipientNameAr}"`,
        titleEn: `Proof sharing approved for "${req.recipientNameEn}"`,
        descAr: `تم إصدار إثبات مجرد بنجاح بموجب موافقتك الصريحة.`,
        descEn: `Minimal proof issued upon explicit user consent.`,
        timestamp: 'الآن',
        read: false
      };
      this.alerts.unshift(alertItem);
      this.save();
      document.dispatchEvent(new CustomEvent('stateChanged'));
      return { type: 'data_sharing', share: newShare, request: req };
    }

    return null;
  },

  rejectRequest(reqId) {
    const idx = (this.pendingRequests || []).findIndex(r => r.id === reqId);
    if (idx === -1) return null;

    const req = this.pendingRequests[idx];
    req.status = 'REJECTED';
    this.pendingRequests.splice(idx, 1);

    const alertItem = {
      id: 'alt_' + Date.now(),
      type: 'revoked',
      titleAr: `تم رفض طلب "${req.recipientNameAr || req.serviceName}"`,
      titleEn: `Request rejected for "${req.recipientNameEn || req.serviceName}"`,
      descAr: `تم حجب صلاحية الوصول وإلغاء الطلب فوراً بموجب توجيهك.`,
      descEn: `Access blocked and request rejected upon user direction.`,
      timestamp: 'الآن',
      read: false
    };
    this.alerts.unshift(alertItem);
    this.save();
    document.dispatchEvent(new CustomEvent('stateChanged'));
    return req;
  },

  processSubscriptionWorkflow(subId, onStepCallback, onCompleteCallback) {
    const target = (this.pendingRequests || []).find(r => r.id === subId);
    if (!target) return;

    target.status = 'PROCESSING';
    this.save();
    document.dispatchEvent(new CustomEvent('stateChanged'));

    // Step 1: Security Handshake & Validation
    if (onStepCallback) onStepCallback(1);

    setTimeout(() => {
      // Step 2: Zero-Exposure Tokenization
      if (onStepCallback) onStepCallback(2);
    }, 2800);

    setTimeout(() => {
      // Step 3: Dispatching to Provider
      if (onStepCallback) onStepCallback(3);
    }, 5600);

    setTimeout(() => {
      // Step 4: Official Confirmed Receipt Received
      target.status = 'COMPLETED';
      const alertItem = {
        id: 'alt_' + Date.now(),
        type: 'verification',
        titleAr: `تم تأكيد تجديد اشتراك ${target.serviceName} بنجاح`,
        titleEn: `${target.serviceName} Renewal Confirmed Successfully`,
        descAr: `تم استلام إشعار التأكيد الرسمي من ${target.providerNameAr} وتمديد الاشتراك لشهر إضافي.`,
        descEn: `Official confirmation receipt verified from ${target.providerNameEn}.`,
        timestamp: 'الآن',
        read: false
      };
      this.alerts.unshift(alertItem);
      this.save();
      document.dispatchEvent(new CustomEvent('stateChanged'));

      if (onCompleteCallback) onCompleteCallback(target);
    }, 8500);
  },

  resetToDefaults() {
    this.shares = [...SEED_SHARES];
    this.entities = [...SEED_ENTITIES];
    this.alerts = [...SEED_ALERTS];
    this.pendingRequests = JSON.parse(JSON.stringify(SEED_PENDING_REQUESTS));
    this.settings = JSON.parse(JSON.stringify(DEFAULT_SETTINGS));
    this.save();
    this.applyAccessibilityMode();
    document.dispatchEvent(new CustomEvent('stateChanged'));
  }
};
