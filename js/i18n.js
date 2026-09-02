/**
 * Akked i18n (Internationalization) Dictionary
 * Complete Arabic (RTL) and English (LTR) translations
 */

const translations = {
  ar: {
    // Brand
    brandName: 'أكّد',
    brandTagline: 'أثبت المطلوب، واحفظ الباقي',
    brandSub: 'حارس البيانات الشخصية والموافقات',
    provenOnly: 'تم إثبات الأهلية',
    noExtraData: 'لم تتم مشاركة أي بيانات إضافية',
    privacyFirst: 'خصوصيتك أولاً',
    minNecessary: 'الحد الأدنى فقط',
    fastAndSecure: 'سريع وآمن',
    youControl: 'أنت المتحكم',

    // Sidebar & Navigation
    navDashboard: 'لوحة التحكم',
    navShares: 'المشاركات والإثباتات',
    navTrustedEntities: 'الجهات الموثوقة',
    navMyData: 'خزنة بياناتي',
    navAlerts: 'التنبيهات وسجل النشاط',
    navSettings: 'الإعدادات',
    navVerifyPortal: 'بوابة التحقق للجهات',
    createSecureShare: 'إنشاء مشاركة آمنة',

    // Header & Global
    // Header & Global
    searchPlaceholder: 'بحث في المشاركات أو الجهات...',
    activeLanguage: 'العربية',
    switchTheme: 'تبديل المظهر',
    
    // Intro Section (Section 6)
    introHeading: 'شارك المطلوب فقط، واحفظ بياناتك الأخرى',
    introDesc: 'راجع ما ستشاركه قبل إصدار إثبات تجريبي محدود الغرض والمدة.',
    btnCreateDemoProof: 'إنشاء إثبات تجريبي',
    btnSeeHowItWorks: 'عرض آلية العمل',

    // Dashboard Stats
    statActiveShares: 'المشاركات النشطة',
    statExpiredShares: 'المشاركات المنتهية',
    statAccessedEntities: 'الجهات التي اطلعت على البيانات',
    statProtectedFields: 'الجهات التي اطلعت على البيانات',
    statPrivacyHealth: 'مؤشر حماية الخصوصية',
    recentActivityTitle: 'أحدث الأنشطة والموافقات',
    recentActivity: 'أحدث الأنشطة والموافقات',
    viewAllShares: 'عرض كافة المشاركات',

    // Shares Table
    sharesPageTitle: 'سجل المشاركات والإثباتات',
    sharesPageSubtitle: 'تحكم كامل في كافة الوثائق والإثباتات التي قمت بمشاركتها مع إمكانية الإلغاء الفوري',
    filterAll: 'الكل',
    filterActive: 'نشط',
    filterExpired: 'منتهي',
    filterRevoked: 'ملغي',
    colRecipient: 'الجهة الطالبة',
    requestingOrg: 'الجهة الطالبة',
    colPurpose: 'الغرض المصرح به',
    colSharedData: 'البيانات المكشوفة فقط',
    disclosedDataOnly: 'البيانات المكشوفة فقط',
    disclosedData: 'البيانات المكشوفة',
    hiddenData: 'البيانات المخفية',
    digitalProof: 'الإثبات الرقمي',
    colCreatedDate: 'تاريخ الإنشاء',
    colExpiryDate: 'تاريخ وساعة الانتهاء',
    colStatus: 'الحالة',
    colActions: 'الإجراءات',
    actionViewDetails: 'معاينة الإثبات',
    actionRevoke: 'إلغاء الصلاحية فوراً',
    actionCopyLink: 'نسخ رابط التحقق',
    actionDownload: 'تحميل الوثيقة الآمنة',
    statusActive: 'نشط',
    statusExpired: 'منتهي',
    statusRevoked: 'تم الإلغاء',
    noSharesFound: 'لا توجد مشاركات مطابقة لخيارات البحث.',

    // Wizard (Create Share)
    wizardTitle: 'معالج إنشاء المشاركة الآمنة',
    wizardSubtitle: 'شارك فقط الحد الأدنى من المعلومات للغرض والجهة المحددة',
    step1: 'اختيار الوثيقة',
    step2: 'الجهة والغرض',
    step3: 'تقليص البيانات',
    step4: 'المعاينة التفاعلية',
    step5: 'فحص الأمان والعلامة',
    step6: 'إصدار الإثبات',

    // Wizard Step 1
    uploadBoxTitle: 'اسحب وأفلت وثيقتك هنا، أو استعرض من جهازك',
    uploadBoxHint: 'يدعم صور (PNG, JPG) وملفات PDF. المعالجة تتم داخل متصفحك محلياً ولا نرفع المستند لخوادمنا.',
    orChooseSample: 'أو اختر من النماذج التجريبية الجاهزة للفحص السريع:',
    sampleNationalId: 'الهوية الوطنية السعودية',
    sampleSalaryCert: 'شهادة تعريف بالراتب',
    sampleRentalContract: 'عقد إيجار موثق',
    sampleWarrantyReceipt: 'فاتورة شراء وضمان إلكتروني',

    // Wizard Step 2
    selectRecipientTitle: 'حدد الجهة المستلمة:',
    selectPurposeTitle: 'حدد الغرض الحصري للمشاركة:',
    purposeAgeCheck: 'التحقق من الأهلية العمرية (فوق 18 عاماً)',
    purposeSalaryCheck: 'التحقق من الحد الأدنى للراتب وملاءمة الإيجار',
    purposeWarrantyCheck: 'التحقق من سريان الضمان والرقم التسلسلي',
    recipientStore: 'متجر إلكتروني تجريبي',
    recipientRealEstate: 'منصة العقار الذكي',
    recipientCarRental: 'شركة التأجير الوطنية',
    recipientServiceCenter: 'مركز صيانة الأجهزة المعتمد',

    // Wizard Step 3
    aiAnalysisTitle: 'تحليل وتقليص البيانات وفق الغرض المحدد',
    aiAnalysisDesc: 'فحص الحقول لتحديد البيانات المطلوبة للغرض بدقة وحجب ما عداها.',
    detectedFieldsCount: 'تم تحديد {count} حقول في الوثيقة',
    minNecessaryRecommendation: 'توصية الحد الأدنى: إظهار إثبات الأهلية فقط وحجب {shieldedCount} حقول شخصية.',
    fieldStatusShielded: 'محجوب (بيانات محمية)',
    fieldStatusNecessary: 'مصرح به ومطلوب فقط',

    // Wizard Step 4 (Before/After)
    beforeAfterTitle: 'المعاينة التفاعلية: الأصلية مقابل الآمنة',
    beforeAfterDesc: 'اسحب الشريط لمقارنة الوثيقة الأصلية المحتوية على كافة بياناتك بالنسخة المحمية التي ستصل للمستلم.',
    labelOriginal: 'الوثيقة الكاملة (قبل التقليص)',
    labelProtected: 'النسخة الآمنة (بعد التقليص)',
    redactionTypeSelect: 'نمط الحجب:',
    redactionModeBlackout: 'تعتيم كامل (Blackout)',
    redactionModeBlur: 'تشويش رقمي (Blur)',
    redactionModePixelate: 'تقطيع بكسلي (Pixelate)',
    redactionModeTokenize: 'استبدال رمزي (Mask/Token)',

    // Wizard Step 5 (Safety Check & Expiry)
    safetyTitle: 'فحص الأمان وإعدادات الحماية',
    privacyScoreLabel: 'معدل حماية الخصوصية',
    privacyScoreDesc: 'تم حجب كافة البيانات الحساسة غير اللازمة للغرض بنجاح.',
    selectDurationTitle: 'مدة صلاحية الإثبات (إلغاء ذاتي):',
    duration5Min: '5 دقائق (فحص فوري)',
    duration1Hour: 'ساعة واحدة',
    duration24Hours: '24 ساعة',
    duration7Days: '7 أيام',
    duration30Days: '30 يوماً',
    watermarkOptionsTitle: 'العلامة المائية المخصصة:',
    watermarkNotice: 'ستتم طباعة علامة مائية غير قابلة للإزالة باسم الجهة وتاريخ الانتهاء لمنع إعادة التوجيه أو الاستخدام غير المصرح به.',

    // Wizard Step 6 (Result)
    proofSuccessTitle: 'تم إصدار الإثبات الآمن بنجاح!',
    proofSuccessSub: 'المستخدم فوق 18 عاماً فقط',
    proofIdLabel: 'رقم الإثبات الموثق:',
    tamperHashLabel: 'البصمة الرقمية للتحقق:',
    proofReadyNotice: 'تم تقليص البيانات وتوليد إثبات رقمي محدد الغرض والمدة.',
    btnCopyProofLink: 'نسخ رابط المشاركة',
    btnDownloadProtectedDoc: 'تحميل الوثيقة المحمية',
    btnVerifyNow: 'فحص في بوابة التحقق',
    btnDone: 'العودة للوحة التحكم',

    // Recipient Verification Portal
    verifyPortalTitle: 'بوابة التحقق الرسمية للمستلمين والجهات',
    verifyPortalSubtitle: 'تحقق من صحة الإثباتات والوثائق المصدرة عبر منصة أكد دون الاطلاع على البيانات الحساسة المحجوبة',
    inputProofIdPlaceholder: 'أدخل رقم الإثبات (مثال: DEMO-018)...',
    btnCheckProof: 'التحقق من الإثبات',
    verifiedClaimTitle: 'نتيجة التحقق المعتمدة:',
    claimStatusValid: 'إثبات معتمد وموثق',
    claimStatusExpired: 'هذا الإثبات انتهت صلاحيته ولا يمكن قبوله',
    claimStatusRevoked: 'تم إلغاء هذا الإثبات من قبل صاحبه',
    verifiedForRecipient: 'صادر حصرياً للجهة:',
    verifiedPurpose: 'الغرض المصرح به:',
    verifiedExpiry: 'ينتهي في:',
    dataIntegrityCheck: 'فحص مطابقة الإثبات:',
    dataIntegrityPass: 'سليم وموثق (لم يتم رصد أي تعديل في الإثبات المصرح به)',

    // Trusted Entities Page
    entitiesPageTitle: 'دليل الجهات الموثوقة والمصرح لها',
    entitiesPageSubtitle: 'الجهات التي تدعم التحقق بالحد الأدنى من البيانات والامتثال لمعايير الخصوصية',
    entityTrustScore: 'مستوى التزام الخصوصية',
    entityTotalShares: 'مشاركات سابقة',
    entityPermittedScopes: 'الأغراض المدعومة',
    btnQuickShareToEntity: 'إنشاء إثبات لهذه الجهة',

    // My Data Vault Page
    myDataPageTitle: 'خزنة بياناتي ورصد الانكشاف',
    myDataPageSubtitle: 'استعراض فئات البيانات الشخصية ومستوى انكشافها عبر المشاركات النشطة مع ضمانات عدم التخزين الخارجي',
    localVaultBadge: 'تخزين محلي مؤقت فقط (Zero-Knowledge)',
    btnClearCache: 'مسح كافة الآثار والذاكرة المؤقتة (Zero-Trace Purge)',
    categoryIdentity: 'بيانات الهوية والميلاد',
    categoryFinancial: 'البيانات المالية والراتب',
    categoryResidency: 'العنوان وعقود السكن',
    categoryAssets: 'فواتير الأجهزة والضمان',
    exposureHigh: 'انكشاف مرتفع',
    exposureSafe: 'محمي بالكامل',
    exposureModerate: 'مشارك بحد أدنى',

    // Alerts Page
    alertsPageTitle: 'مركز التنبيهات وسجل الأمان',
    alertsPageSubtitle: 'مراقبة فورية لعمليات التحقق وانتهاء الصلاحيات والأنشطة المشبوهة',
    btnMarkAllRead: 'تحديد الكل كمقروء',
    alertTypeExpiry: 'تنبيه انتهاء صلاحية',
    alertTypeVerification: 'تم التحقق من إثبات',
    alertTypeRevoked: 'تم إلغاء صلاحية',
    alertTypeSecurity: 'تحذير أمان أو محاولة دخول',

    // Settings Page
    settingsPageTitle: 'إعدادات المنصة والخصوصية',
    settingsPageSubtitle: 'تخصيص تفضيلات التعتيم، اللغات، ومفاتيح التشفير الشخصية',
    tabGeneral: 'عام واللغة',
    tabPrivacy: 'سياسات الخصوصية والتقليص',
    tabSecurity: 'الأمان والبصمات',
    defaultDurationSetting: 'المدة الافتراضية لصلاحية الإثباتات:',
    strictModeToggle: 'تفعيل نمط الحجب الفائق تلقائياً (Strict Masking)',
    strictModeDesc: 'حجب كافة الحقول غير المذكورة صراحة في الغرض دون استثناء.',
    watermarkDensitySetting: 'كثافة العلامة المائية على المستند:',
    denseWatermark: 'علامة مائية قطبية مشددة',
    mediumWatermark: 'علامة مائية متوسطة (موصى به)',
    subtleWatermark: 'علامة مائية خفيفة',
    btnSaveSettings: 'حفظ التفضيلات',
    btnResetAll: 'إعادة ضبط المصنع ومسح البيانات',

    // Toasts & Dialogs
    copiedToClipboard: 'تم نسخ الرابط إلى الحافظة بنجاح!',
    proofRevokedToast: 'تم إلغاء الإثبات بنجاح ولن يتمكن المستلم من التحقق منه بعد الآن.',
    cacheClearedToast: 'تم مسح كافة البيانات المؤقتة والآثار من المتصفح بالكامل.',
    settingsSavedToast: 'تم حفظ إعدادات الخصوصية بنجاح.',
    confirmRevokeTitle: 'هل أنت متأكد من رغبتك في إلغاء هذا الإثبات؟',
    confirmRevokeDesc: 'بمجرد الإلغاء، سيتوقف رمز QR ورابط التحقق عن العمل فوراً ولن تتمكن الجهة من التحقق من صحته.',
    btnConfirmRevoke: 'نعم، قم بالإلغاء فوراً',
    btnCancel: 'تراجع',
    legalDisclaimer: 'تنويه: هذا الإثبات هو إقرار خصوصية رقمي مشفر تم توليده بموافقة صاحب البيانات، ولا يدعي التوثيق الحكومي الرسمي ما لم يتوفر ربط مباشر بالجهة المصدرة.'
  },

  en: {
    // Brand
    brandName: 'Akked',
    brandTagline: 'Prove what’s needed, protect the rest',
    brandSub: 'Personal Data & Consent Guardian',
    provenOnly: 'Eligibility Proven',
    noExtraData: 'No extra data was shared',
    privacyFirst: 'Privacy First',
    minNecessary: 'Minimum Necessary Data',
    fastAndSecure: 'Fast & Secure',
    youControl: 'You Decide & Control',

    // Sidebar & Navigation
    navDashboard: 'Dashboard',
    navShares: 'Shares & Proofs',
    navTrustedEntities: 'Trusted Entities',
    navMyData: 'My Data Vault',
    navAlerts: 'Alerts & Activity',
    navSettings: 'Settings',
    navVerifyPortal: 'Verifier Portal',
    createSecureShare: 'Create Secure Share',

    // Header & Global
    searchPlaceholder: 'Search shares, entities, or proofs...',
    activeLanguage: 'English',
    switchTheme: 'Switch Theme',

    // Intro Section (Section 6)
    introHeading: 'Share only what is required. Keep everything else private.',
    introDesc: 'Review what will be shared before issuing a purpose-limited, time-limited demo proof.',
    btnCreateDemoProof: 'Create Demo Proof',
    btnSeeHowItWorks: 'See How It Works',

    // Dashboard Stats
    statActiveShares: 'Active Shares',
    statExpiredShares: 'Expired Shares',
    statAccessedEntities: 'Organizations that accessed data',
    statProtectedFields: 'Organizations that accessed data',
    statPrivacyHealth: 'Privacy Protection Score',
    recentActivityTitle: 'Recent Activity and Approvals',
    recentActivity: 'Recent Activity and Approvals',
    viewAllShares: 'View All Shares',

    // Shares Table
    sharesPageTitle: 'Shares & Proofs Registry',
    sharesPageSubtitle: 'Complete sovereign control over every credential and proof shared, with one-click revocation.',
    filterAll: 'All',
    filterActive: 'Active',
    filterExpired: 'Expired',
    filterRevoked: 'Revoked',
    colRecipient: 'Requesting Organization',
    requestingOrg: 'Requesting Organization',
    colPurpose: 'Authorized Purpose',
    colSharedData: 'Disclosed Data Only',
    disclosedDataOnly: 'Disclosed Data Only',
    disclosedData: 'Disclosed Data',
    hiddenData: 'Hidden Data',
    digitalProof: 'Digital Proof',
    colCreatedDate: 'Created Date',
    colExpiryDate: 'Expiry Timestamp',
    colStatus: 'Status',
    colActions: 'Actions',
    actionViewDetails: 'View Proof Card',
    actionRevoke: 'Revoke Immediately',
    actionCopyLink: 'Copy Verification Link',
    actionDownload: 'Download Secure Copy',
    statusActive: 'Active',
    statusExpired: 'Expired',
    statusRevoked: 'Revoked',
    noSharesFound: 'No shares found matching your filters.',

    // Wizard (Create Share)
    wizardTitle: 'Secure Share Creation Wizard',
    wizardSubtitle: 'Share only the minimum information necessary for a specific purpose and recipient.',
    step1: 'Select Document',
    step2: 'Recipient & Purpose',
    step3: 'Data Minimization',
    step4: 'Before/After Preview',
    step5: 'Safety & Watermark',
    step6: 'Issue Proof',

    // Wizard Step 1
    uploadBoxTitle: 'Drag and drop your document here, or browse files',
    uploadBoxHint: 'Supports PNG, JPG, and PDF. Processing runs entirely within your browser locally.',
    orChooseSample: 'Or choose a realistic pre-loaded demo template for instant testing:',
    sampleNationalId: 'Saudi National ID',
    sampleSalaryCert: 'Salary & Employment Certificate',
    sampleRentalContract: 'Certified Rental Lease',
    sampleWarrantyReceipt: 'Electronic Invoice & Warranty',

    // Wizard Step 2
    selectRecipientTitle: 'Select Authorized Recipient:',
    selectPurposeTitle: 'Select Purpose of Disclosure:',
    purposeAgeCheck: 'Age Eligibility Verification (18+ Only)',
    purposeSalaryCheck: 'Income Threshold & Lease Suitability',
    purposeWarrantyCheck: 'Warranty Validity & Serial Number Check',
    recipientStore: 'Demo E-Commerce Store',
    recipientRealEstate: 'Smart Real Estate Platform',
    recipientCarRental: 'National Car Rental Co.',
    recipientServiceCenter: 'Authorized Electronics Service',

    // Wizard Step 3
    aiAnalysisTitle: 'Data Minimization & Purpose-Limited Disclosure',
    aiAnalysisDesc: 'Evaluating document fields to identify authorized claims and shield all unnecessary personal data.',
    detectedFieldsCount: '{count} document fields identified',
    minNecessaryRecommendation: 'Minimization Recommendation: Disclose only 1 minimal claim and shield {shieldedCount} redundant fields.',
    fieldStatusShielded: 'Shielded (Protected Data)',
    fieldStatusNecessary: 'Authorized & Required Only',

    // Wizard Step 4 (Before/After)
    beforeAfterTitle: 'Interactive Preview: Original vs. Protected',
    beforeAfterDesc: 'Review what will be shielded before issuing the verified demo proof.',
    labelOriginal: 'Full Document (Before)',
    labelProtected: 'Protected Proof (After)',
    redactionTypeSelect: 'Mask Style:',
    redactionModeBlackout: 'Blackout Mask',
    redactionModeBlur: 'Gaussian Blur',
    redactionModePixelate: 'Pixelation',
    redactionModeTokenize: 'Mask / Tokenize',

    // Wizard Step 5 (Safety Check & Expiry)
    safetyTitle: 'Safety Scan & Dynamic Watermark Configuration',
    privacyScoreLabel: 'Privacy Protection Level',
    privacyScoreDesc: 'All redundant personal identifiable information has been successfully masked.',
    selectDurationTitle: 'Proof Validity Duration (Auto-Expiry):',
    duration5Min: '5 Minutes (Instant Check)',
    duration1Hour: '1 Hour',
    duration24Hours: '24 Hours',
    duration7Days: '7 Days',
    duration30Days: '30 Days',
    watermarkOptionsTitle: 'Recipient-Locked Watermark:',
    watermarkNotice: 'A dynamic watermark with recipient name and expiry timestamp will be embedded to prevent unauthorized re-sharing.',

    // Wizard Step 6 (Result)
    proofSuccessTitle: 'Secure Proof Generated Successfully!',
    proofSuccessSub: 'User is Over 18 Years Old',
    proofIdLabel: 'Verifiable Proof ID:',
    tamperHashLabel: 'Digital Proof Digest:',
    proofReadyNotice: 'Data was minimized and issued with a purpose-limited proof.',
    btnCopyProofLink: 'Copy Share Link',
    btnDownloadProtectedDoc: 'Download Watermarked Copy',
    btnVerifyNow: 'Open in Verifier Portal',
    btnDone: 'Back to Dashboard',

    // Recipient Verification Portal
    verifyPortalTitle: 'Recipient Verification Portal',
    verifyPortalSubtitle: 'Verify proofs issued via Akked without accessing unnecessary raw PII.',
    inputProofIdPlaceholder: 'Enter Proof ID (e.g. DEMO-018)...',
    btnCheckProof: 'Verify Credential',
    verifiedClaimTitle: 'Verified Assertion Result:',
    claimStatusValid: 'Valid & Verified Assertion',
    claimStatusExpired: 'This proof has expired and is no longer valid',
    claimStatusRevoked: 'This proof has been revoked by the data owner',
    verifiedForRecipient: 'Issued Exclusively For:',
    verifiedPurpose: 'Permitted Purpose:',
    verifiedExpiry: 'Expires At:',
    dataIntegrityCheck: 'Proof Verification Check:',
    dataIntegrityPass: 'Verified Match (No alterations detected)',

    // Trusted Entities Page
    entitiesPageTitle: 'Trusted & Verified Entities Directory',
    entitiesPageSubtitle: 'Organizations adhering to minimum data disclosure policies and PDPL privacy standards.',
    entityTrustScore: 'Privacy Compliance Rating',
    entityTotalShares: 'Past Interactions',
    entityPermittedScopes: 'Allowed Purpose Scopes',
    btnQuickShareToEntity: 'Issue Proof to Entity',

    // My Data Vault Page
    myDataPageTitle: 'My Data Vault & Exposure Monitor',
    myDataPageSubtitle: 'Overview of personal data categories and their exposure across active shares. Zero raw files stored remotely.',
    localVaultBadge: 'Local Ephemeral Cache Only (Zero-Knowledge)',
    btnClearCache: 'Purge All Local Cache & Artifacts (Zero-Trace Purge)',
    categoryIdentity: 'Identity & Birth Data',
    categoryFinancial: 'Financial & Salary Data',
    categoryResidency: 'Address & Lease Contracts',
    categoryAssets: 'Purchase & Warranty Invoices',
    exposureHigh: 'High Exposure',
    exposureSafe: 'Fully Shielded',
    exposureModerate: 'Minimally Disclosed',

    // Alerts Page
    alertsPageTitle: 'Security Alerts & Audit Log',
    alertsPageSubtitle: 'Real-time telemetry on verifications, countdowns, and potential security events.',
    btnMarkAllRead: 'Mark All as Read',
    alertTypeExpiry: 'Expiry Warning',
    alertTypeVerification: 'Verification Event',
    alertTypeRevoked: 'Proof Revocation',
    alertTypeSecurity: 'Security / Access Alert',

    // Settings Page
    settingsPageTitle: 'System & Privacy Settings',
    settingsPageSubtitle: 'Configure redaction strictness, languages, and personal encryption keys.',
    tabGeneral: 'General & Language',
    tabPrivacy: 'Privacy & Minimization Rules',
    tabSecurity: 'Security & Keypairs',
    defaultDurationSetting: 'Default Validity Duration:',
    strictModeToggle: 'Enable Strict Redaction Mode (Auto-Mask All Unlisted PII)',
    strictModeDesc: 'Automatically redacts any field not explicitly requested by the selected purpose.',
    watermarkDensitySetting: 'Embedded Watermark Density:',
    denseWatermark: 'Dense Diagonal Watermark',
    mediumWatermark: 'Medium Watermark (Recommended)',
    subtleWatermark: 'Subtle Minimal Watermark',
    btnSaveSettings: 'Save Preferences',
    btnResetAll: 'Factory Reset & Wipe All Vault Data',

    // Toasts & Dialogs
    copiedToClipboard: 'Verification link copied to clipboard!',
    proofRevokedToast: 'Proof revoked successfully. The recipient can no longer verify it.',
    cacheClearedToast: 'All cached artifacts and memory purged completely.',
    settingsSavedToast: 'Privacy preferences saved successfully.',
    confirmRevokeTitle: 'Are you sure you want to revoke this proof?',
    confirmRevokeDesc: 'Once revoked, the QR code and verification link will immediately fail verification.',
    btnConfirmRevoke: 'Yes, Revoke Now',
    btnCancel: 'Cancel',
    legalDisclaimer: 'Disclaimer: This proof is a user-consented, cryptographically signed personal assertion. It does not claim government-document authenticity unless an official issuer integration exists.'
  }
};

window.I18N = {
  currentLang: 'ar',
  
  t(key, params = {}) {
    const langDict = translations[this.currentLang] || translations.ar;
    let text = langDict[key] || translations.en[key] || key;
    
    Object.keys(params).forEach(k => {
      text = text.replace(new RegExp(`\\{${k}\\}`, 'g'), params[k]);
    });
    
    return text;
  },
  
  setLanguage(lang) {
    if (lang === 'ar' || lang === 'en') {
      this.currentLang = lang;
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
      localStorage.setItem('akked_lang', lang);
      document.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
    }
  },
  
  init() {
    const urlParams = new URLSearchParams(window.location.search);
    const paramLang = urlParams.get('lang');
    const savedLang = (paramLang === 'ar' || paramLang === 'en') ? paramLang : (localStorage.getItem('akked_lang') || 'ar');
    this.setLanguage(savedLang);
  }
};
