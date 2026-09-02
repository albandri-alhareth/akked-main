/**
 * Akked Central State Store & LocalStorage Persistence
 */

const SEED_SHARES = [
  {
    id: 'DEMO-018',
    docType: 'national_id',
    recipientId: 'recipient_store',
    recipientNameAr: 'متجر إلكتروني تجريبي',
    recipientNameEn: 'Demo E-Commerce Store',
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
    watermark: 'صادر حصرياً لـ: متجر إلكتروني تجريبي - التحقق من الأهلية العمرية',
    allowedFieldIds: ['age_calc']
  },
  {
    id: 'AKK-512',
    docType: 'salary_cert',
    recipientId: 'recipient_car_rental',
    recipientNameAr: 'شركة التأجير الوطنية',
    recipientNameEn: 'National Car Rental Co.',
    purposeId: 'purpose_salary',
    purposeNameAr: 'التحقق من ملاءمة التأجير والحد الأدنى للدخل',
    purposeNameEn: 'Rental Eligibility & Income Threshold',
    sharedClaimsAr: 'الحالة: نشط | الدخل: يتجاوز 12,000 ريال',
    sharedClaimsEn: 'Status: Active | Income: > 12,000 SAR',
    shieldedFieldsCount: 5,
    createdDate: '2026-09-01 14:15',
    expiryDate: '2026-09-08 14:15',
    status: 'active',
    sha256Hash: '8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4',
    watermark: 'صادر حصرياً لـ: شركة التأجير الوطنية',
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
    nameAr: 'متجر إلكتروني تجريبي',
    nameEn: 'Demo E-Commerce Store',
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
    id: 'recipient_real_estate',
    nameAr: 'منصة العقار الذكي',
    nameEn: 'Smart Real Estate Platform',
    categoryAr: 'عقارات وتأجير',
    categoryEn: 'Real Estate & Rental',
    icon: 'building',
    trustScore: 96,
    totalShares: 4,
    verifiedScopes: ['salary_threshold', 'active_lease'],
    privacyPolicyUrl: 'https://example.com/privacy',
    pdplCompliant: true
  },
  {
    id: 'recipient_car_rental',
    nameAr: 'شركة التأجير الوطنية',
    nameEn: 'National Car Rental Co.',
    categoryAr: 'تأجير مركبات',
    categoryEn: 'Vehicle Rental',
    icon: 'building',
    trustScore: 94,
    totalShares: 7,
    verifiedScopes: ['license_validity', 'employment_active'],
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
    descAr: 'قام "متجر إلكتروني تجريبي" بالتحقق من الإثبات DEMO-018 دون كشف رقم الهوية.',
    descEn: 'Demo E-Commerce Store verified proof DEMO-018 without reading your National ID.',
    timestamp: 'منذ 10 دقائق',
    read: false
  },
  {
    id: 'alt_02',
    type: 'expiry',
    titleAr: 'اقتراب انتهاء صلاحية إثبات',
    titleEn: 'Proof Expiry Notice',
    descAr: 'الإثبات DEMO-018 سينتهي تلقائياً خلال 35 دقيقة.',
    descEn: 'Proof DEMO-018 will automatically expire in 35 minutes.',
    timestamp: 'منذ 25 دقيقة',
    read: false
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

window.AkkedState = {
  shares: [],
  entities: [],
  alerts: [],
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
  settings: {
    strictMode: true,
    watermarkDensity: 'medium',
    defaultDuration: '1_hour',
    theme: 'light',
    teamMembers: [
      { nameAr: 'أثير الفهد', nameEn: 'Atheer Alfahad', email: 'atheer@example.com', role: 'Owner / Lead Architect' },
      { nameAr: 'البندري', nameEn: 'Albandri', email: 'albandri8.qq@gmail.com', role: 'Editor / Co-Author' },
      { nameAr: 'سارة الأسود', nameEn: 'Sara Alaswad', email: 'saraalaswad02@outlook.com', role: 'Editor / Co-Author' }
    ]
  },

  init() {
    // Load from localStorage or initialize with seed data
    try {
      const storedShares = localStorage.getItem('akked_shares');
      this.shares = storedShares ? JSON.parse(storedShares) : [...SEED_SHARES];

      const storedEntities = localStorage.getItem('akked_entities');
      this.entities = storedEntities ? JSON.parse(storedEntities) : [...SEED_ENTITIES];

      const storedAlerts = localStorage.getItem('akked_alerts');
      this.alerts = storedAlerts ? JSON.parse(storedAlerts) : [...SEED_ALERTS];

      const storedSettings = localStorage.getItem('akked_settings');
      if (storedSettings) {
        this.settings = { ...this.settings, ...JSON.parse(storedSettings) };
      }
    } catch (e) {
      console.error('State load error:', e);
      this.shares = [...SEED_SHARES];
      this.entities = [...SEED_ENTITIES];
      this.alerts = [...SEED_ALERTS];
    }
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

  addShare(newShare) {
    this.shares.unshift(newShare);
    this.alerts.unshift({
      id: 'alt_' + Date.now(),
      type: 'verification',
      titleAr: `تم إصدار إثبات جديد (${newShare.id})`,
      titleEn: `New Proof Issued (${newShare.id})`,
      descAr: `تم تقليص البيانات وتوليد إثبات مشفر لـ "${newShare.recipientNameAr}".`,
      descEn: `Minimization completed and proof issued for "${newShare.recipientNameEn}".`,
      timestamp: 'الآن',
      read: false
    });
    this.save();
    document.dispatchEvent(new CustomEvent('stateChanged'));
  },

  revokeShare(shareId) {
    const target = this.shares.find(s => s.id === shareId);
    if (target) {
      target.status = 'revoked';
      this.alerts.unshift({
        id: 'alt_' + Date.now(),
        type: 'revoked',
        titleAr: `تم إلغاء الإثبات (${shareId})`,
        titleEn: `Proof Revoked (${shareId})`,
        descAr: `تم سحب الصلاحية فوراً وتوقيف إمكانية التحقق من طرف المستلم.`,
        descEn: `Consent revoked. Credential verifications will now fail.`,
        timestamp: 'الآن',
        read: false
      });
      this.save();
      document.dispatchEvent(new CustomEvent('stateChanged'));
    }
  },

  purgeAllCache() {
    this.shares = [];
    this.alerts = [];
    localStorage.removeItem('akked_shares');
    localStorage.removeItem('akked_alerts');
    document.dispatchEvent(new CustomEvent('stateChanged'));
  },

  resetToDefaults() {
    this.shares = [...SEED_SHARES];
    this.entities = [...SEED_ENTITIES];
    this.alerts = [...SEED_ALERTS];
    this.save();
    document.dispatchEvent(new CustomEvent('stateChanged'));
  }
};
