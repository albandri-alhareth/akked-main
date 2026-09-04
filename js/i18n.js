/**
 * Akked i18n (Internationalization) Dictionary
 * Complete Arabic and English translations
 */

const translations = {
  ar: {
    // Brand
    brandName: 'أكّد',
    brandTagline: 'حارس البيانات الشخصية والموافقات',
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
    navMyData: 'خزانة بياناتي',
    navAlerts: 'التنبيهات وسجل النشاط',
    navSettings: 'الإعدادات',
    navVerifyPortal: 'بوابة التحقق للجهات',
    navLanding: 'الصفحة الرئيسية',
    createSecureShare: 'إنشاء مشاركة آمنة',
    navLogout: 'تسجيل الخروج',
    navLogin: 'تسجيل الدخول',
    navRegister: 'إنشاء حساب جديد',
    navEnterPlatform: 'الدخول إلى المنصة',
    quickActions: 'إجراءات سريعة',
    authSectionTitle: 'الحساب',

    // Header & Global
    searchPlaceholder: 'بحث في المشاركات أو الجهات...',
    activeLanguage: 'العربية',
    switchTheme: 'تبديل المظهر',
    themeLight: 'الوضع الفاتح',
    themeDark: 'الوضع الداكن',
    
    // Intro Section
    introHeading: 'شارك المطلوب فقط، واحفظ بياناتك الأخرى',
    btnCreateDemoProof: 'إنشاء إثبات',
    btnCreateProof: 'إنشاء إثبات',

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
    orChooseSample: 'أو اختر من النماذج الجاهزة للفحص السريع:',
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
    recipientStore: 'متجر إلكتروني',
    recipientRealEstate: 'المنصة العقار',
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
    btnQuickShareToEntity: 'إنشاء إثبات لهذه الجهة',

    // My Data Vault Page
    myDataPageTitle: 'خزنة بياناتي ورصد الانكشاف',
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

    // Redesigned Settings Page
    settingsPageTitle: 'إعدادات المنصة والحساب',
    settingsPageSubtitle: 'إدارة الملف الشخصي، تفضيلات الإشعارات، المظهر، وخيارات إمكانية الوصول والتسهيلات',
    settingsProfileTab: 'الملف الشخصي والحساب',
    settingsNotifTab: 'تفضيلات الإشعارات',
    settingsThemeTab: 'المظهر واللغة',
    settingsAccessTab: 'إمكانية الوصول (Accessibility)',
    
    // Settings - Profile Section
    profileTitle: 'الملف الشخصي وحساب المستخدم',
    profileSubtitle: 'معلومات الحساب ومعرف الخصوصية المشفر الخاص بك',
    profileFullName: 'الاسم الكامل',
    profileEmail: 'البريد الإلكتروني',
    profilePhone: 'رقم الجوال',
    profileRole: 'الدور / الصفة',
    profilePrivacyId: 'معرف الخصوصية الفريد (Privacy Key ID)',
    profileAccountStatus: 'حالة الحساب',
    profileVerifiedStatus: 'حساب مفعل وموثق محلياً',
    profileHardwareKey: 'بصمة المفتاح المشفر (WebCrypto SHA-256)',
    btnSaveProfile: 'حفظ بيانات الملف الشخصي',

    // Settings - Notification Preferences
    notifTitle: 'تفضيلات الإشعارات والتنبيهات',
    notifSubtitle: 'التحكم الدقيق في التنبيهات المباشرة والإشعارات الخارجية',
    notifInAppAlerts: 'تنبيهات التحقق داخل التطبيق',
    notifInAppAlertsDesc: 'استلام تنبيه فوري فور قيام أي جهة بالتحقق من أحد إثباتاتك النشطة.',
    notifExpiryReminders: 'تذكيرات اقتراب انتهاء الصلاحية',
    notifExpiryRemindersDesc: 'إرسال تنبيه قبل 30 دقيقة من انتهاء صلاحية أي مشاركة مفعلة.',
    notifRevocationAlerts: 'إشعارات سحب وإلغاء الصلاحية',
    notifRevocationAlertsDesc: 'تأكيد فوري عند إلغاء أو تعطيل أي إثبات رقمي.',
    notifPushExternal: 'الإشعارات الخارجية وتنبيهات المتصفح',
    notifPushExternalDesc: 'إرسال إشعارات خارجية عبر المتصفح لطلبات ومشاركات البيانات المهمة.',
    notifWeeklyDigest: 'التقرير الدوري لمستوى الخصوصية',
    notifWeeklyDigestDesc: 'ملخص أسبوعي بحالة الانكشاف والمشاركات النشطة والمنتهية.',

    // Settings - Appearance & Theme
    themeTitle: 'المظهر واللغة',
    themeSubtitle: 'تخصيص نمط العرض البصري ولغة المنصة',
    themeSelectionTitle: 'نمط المظهر (Theme):',
    themeLightName: 'المظهر النهاري (Light)',
    themeLightDesc: 'واجهة ناصعة بألوان مريحة وعالية التباين',
    themeDarkName: 'المظهر الليلي (Dark)',
    themeDarkDesc: 'واجهة داكنة مريحة للعين في الإضاءة الخافتة',
    languageSelectionTitle: 'لغة الواجهة:',
    languageSelectionDesc: 'التبديل الفوري بين اللغة العربية والإنجليزية مع تعديل اتجاه التنسيق بالكامل.',

    // Settings - Accessibility Mode
    accessTitle: 'نمط إمكانية الوصول والتسهيلات (Accessibility Mode)',
    accessSubtitle: 'دعم قارئات الشاشة، التباين العالي، الإشعارات الخارجية، والإعلانات الصوتية المنطوقة',
    accessMasterToggle: 'تفعيل نمط إمكانية الوصول الشامل',
    accessMasterToggleDesc: 'تفعيل التباين المرتفع، دعم قراءة الشاشة، والتسهيلات الصوتية عند تصفح المنصة.',
    accessAudioAnnouncements: 'الإعلانات الصوتية المنطوقة عند الدخول',
    accessAudioAnnouncementsDesc: 'قراءة ملخص صوتي فوري لحالة المشاركات النشطة والتنبيهات المهمة بصوت ناطق عند فتح المنصة.',
    accessExternalNotifs: 'الإشعارات الخارجية للطلبات الهامة',
    accessExternalNotifsDesc: 'إرسال إشعار نظام خارجي فوري لأي طلب مشاركة بيانات عالي الأهمية.',
    accessHighContrast: 'تعزيز التباين البصري والتركيز',
    accessHighContrastDesc: 'إظهار حدود واضحة ومؤشرات تركيز عالية التباين للتنقل بلوحة المفاتيح.',
    accessLargeText: 'تكبير خطوط القراءة',
    accessLargeTextDesc: 'زيادة حجم النصوص بنسبة 15% لتحسين وضوح القراءة.',
    btnTestSpeech: 'استمع للإعلان الصوتي الآن',
    speechAnnouncementPlaying: 'جاري تشغيل الإعلان الصوتي...',
    speechTestSample: 'مرحباً بك في منصة أكد. نمط إمكانية الوصول مفعّل. كافة معالجات البيانات تتم محلياً لحماية خصوصيتك.',

    // Settings - Voice Assistant & Microphone Controls
    accessMicVoiceAssistant: 'المساعد الصوتي التفاعلي والمايكروفون (Voice Assistant)',
    accessMicVoiceAssistantDesc: 'تشغيل المايكروفون تلقائياً والاستماع للأوامر الصوتية للتحقق من طلبات البيانات ومراجعة الموافقات وتجديد الاشتراكات.',
    btnLaunchVoiceAssistant: 'تشغيل المساعد الصوتي والمايك',
    voiceAssistantTitle: 'مساعد أكد الصوتي الذكي (Akked Voice Guardian)',
    voiceListeningPrompt: 'المايكروفون يستمع الآن... يمكنك الرد بصوتك: "نعم"، "لا"، "كرر"، أو "اشرح"',
    voiceStatusListening: 'جاري الاستماع لصوتك عبر المايكروفون...',
    voiceStatusSpeaking: 'المساعد يتحدث الآن...',
    voiceStatusIdle: 'جاهز للاستماع',
    voiceStatusProcessing: 'جاري معالجة الطلب ومراقبة الإجراءات...',

    // Microphone Permission Modal
    micPermissionTitle: 'طلب إذن تشغيل المايكروفون للتحكم الصوتي الشامل',
    micPermissionDesc: 'لتمكين التحكم الصوتي الكامل في خصوصيتك ومراجعة طلبات البيانات بدون الحاجة لاستخدام الفأرة أو الأزرار، نحتاج إذن الوصول إلى المايكروفون.',
    micPrivacyAssurance: 'ضمان الخصوصية: لا يتم تسجيل أو إرسال أي مقاطع صوتية لخوادم خارجية، وتتم كافة المعالجات محلياً في جهازك.',
    btnAllowMic: 'السماح بتشغيل المايكروفون',
    btnDenyMic: 'متابعة بدون مايك (الوضع البصري فقط)',
    micPermissionGrantedBadge: 'إذن المايكروفون مفعل',
    micPermissionDeniedBadge: 'المايكروفون متوقف (يتطلب إذناً)',

    // Persistent Voice Accessibility Bar
    barListeningNow: 'جاري الاستماع لصوتك عبر المايكروفون...',
    barPaused: 'المايكروفون متوقف مؤقتاً',
    btnPauseMic: 'إيقاف مؤقت',
    btnResumeMic: 'استئناف الاستماع',
    btnExitAccessibility: 'الخروج من نمط الوصول الشامل',
    liveCaptionsTitle: 'النصوص التوضيحية المباشرة (Live Captions)',
    scenarioSelectorLabel: 'اختبار سيناريوهات الطلبات الصوتية:',

    scenarioAgeTitle: '1. طلب التحقق من العمر (متجر إلكتروني)',
    scenarioSubscriptionTitle: '2. طلب تجديد اشتراك (ChatGPT)',
    scenarioRentalTitle: '3. طلب أهلية الدخل (المنصة العقار)',

    // Scenario 1: E-Commerce Age Verification
    voiceAgePrompt: 'لديك طلب من متجر إلكتروني للتحقق من العمر. المطلوب مشاركة نتيجة أنك فوق 18 عاماً فقط. هل توافق؟',
    voiceAgeConfirmSpeech: 'تم تأكيد موافقتك على مشاركة إثبات السن فقط، وجاري إصدار الإثبات المشفر.',
    voiceAgeExplain: 'المستلم هو متجر إلكتروني معتمد. الغرض هو التحقق من السن القانوني فقط. البيانات المطلوبة هي نتيجة أنك فوق 18 عاماً دون كشف بطاقة الهوية أو الاسم أو العنوان. الصلاحية تنتهي بعد 15 دقيقة، ومستوى المخاطر منخفض جداً ومتوافق مع نظام حماية البيانات. هل توافق؟',

    // Scenario 2: ChatGPT Subscription Renewal
    voiceRenewalPrompt: 'يوجد لديك طلب تجديد اشتراك في ChatGPT بقيمة 75 ريال. هل ترغب في التجديد؟',
    voiceRenewalConfirmSpeech: 'تم تسجيل موافقتك على طلب التجديد، وسأتابع حالة العملية.',
    voiceRenewalExplain: 'المستلم هو موقع ChatGPT ومزود الخدمة OpenAI. الغرض هو تجديد الاشتراك الشهري بقيمة 75 ريال. البيانات المطلوبة: رمز تفويض مالي مشفر بحد أدنى دون كشف رقم بطاقتك الائتمانية. هل توافق على المتابعة؟',
    chatGptService: 'موقع ChatGPT (OpenAI)',
    renewalAmountLabel: 'قيمة الاشتراك:',
    renewalAmountValue: '75.00 ريال سعودي / شهر',
    renewalExpiryLabel: 'تاريخ التجديد المستهدف:',

    // Scenario 3: Real Estate Platform Income Eligibility
    voiceRentalPrompt: 'لديك طلب من المنصة العقار للتحقق من الأهلية. المطلوب إثبات نطاق الدخل المطلوب للتعاقد دون كشف كشف الحساب البنكي. هل توافق؟',
    voiceRentalConfirmSpeech: 'تم تأكيد موافقتك على إثبات ملاءمة الدخل، وجاري إرسال الإثبات المشفر.',
    voiceRentalExplain: 'المستلم هو المنصة العقار. الغرض: إثبات استيفاء الحد الأدنى للدخل للتعاقد العقاري. البيانات: نتيجة تطابق الدخل مع الفئة المطلوبة فقط دون كشف الراتب الدقيق أو كشف الحساب البنكي. هل توافق؟',

    // Universal Conversational Responses
    voicePromptReject: 'تم تسجيل رفضك للطلب وحجب الصلاحية فوراً.',
    voiceMisunderstood: 'عذراً، لم أفهم ردك بدقة. يمكنك قول: هل عندي طلبات جديدة، أو اقرأ لي التنبيهات، أو وافق على الطلب، أو ارفض، أو اشرح أكثر.',
    voiceTimeoutGentle: 'هل أنت بحاجة للمزيد من الوقت؟ يمكنك قول نعم للموافقة، أو لا للرفض، أو اشرح لمعرفة التفاصيل.',
    voiceSensitivePrompt: 'تنبيه: هذا الإجراء يتضمن تفويضاً مالياً. هل تؤكد التنفيذ النهائي؟ قل نعم للمتابعة أو لا للتراجع.',
    voiceHeardText: 'تم رصد صوتك:',
    
    // Quick Action Voice Commands
    voiceCmdYes: 'نعم (Yes) [مفتاح 1]',
    voiceCmdNo: 'لا (No) [مفتاح 2]',
    voiceCmdExplain: 'اشرح التفاصيل (Explain) [مفتاح 3]',
    voiceCmdRepeat: 'كرر الطلب (Repeat) [مفتاح 4]',

    // Live Checkpoint Announcements & Stepper
    monitoringTitle: 'المراقبة الحية لعملية التجديد المشفر',
    monitoringSubtitle: 'تتبع مسار التفويض الآمن وتقليص بيانات الدفع حتى استلام التأكيد الرسمي',
    monitoringStep1: '1. فحص أمان الاتصال وتشفير الهوية الرقمية',
    monitoringStep1Desc: 'التحقق من شهادة SSL وبصمة التشفير الخاصة بموقع ChatGPT دون كشف الهوية الكاملة.',
    monitoringStep2: '2. استخلاص رمز الدفع بالحد الأدنى (Zero-Exposure Token)',
    monitoringStep2Desc: 'توليد تفويض مالي أحادي الاستخدام محجوب التفاصيل دون إرسال رقم البطاقة الائتمانية.',
    monitoringStep3: '3. إصدار تفويض الأمان المعتمد للموقع',
    monitoringStep3Desc: 'إرسال إشعار التجديد المصادق عليه وإغلاق قنوات الوصول الخارجية.',
    monitoringStep4: '4. استلام التأكيد الرسمي وتوثيق العملية في سجل الأمان',
    monitoringStep4Desc: 'تم استلام إشعار التأكيد من المزود وتمديد الاشتراك بنجاح.',
    checkpoint1Announce: 'المرحلة الأولى: جاري فحص أمان الاتصال والتحقق المشفر من الهوية.',
    checkpoint2Announce: 'المرحلة الثانية: جاري توليد تفويض مالي مشفر بحد أدنى.',
    checkpoint3Announce: 'المرحلة الثالثة: جاري إرسال تفويض التجديد إلى مزود الخدمة.',
    checkpoint4Announce: 'تم استلام التأكيد الرسمي من مزود الخدمة، واكتمل تجديد الاشتراك وتوثيقه بنجاح.',
    monitoringStatusActive: 'جاري المراقبة الفورية والمتابعة حتى استلام التأكيد الرسمي...',
    monitoringStatusComplete: 'تم استلام التأكيد الرسمي واكتملت الإجراءات بأمان تام',
    monitoringHashLabel: 'بصمة المعاملة المشفرة:',
    btnMinimizeVoice: 'تصغير المساعد',
    btnCloseVoice: 'إغلاق نافذة المساعد',

    // Landing Page
    landingHeadline: 'منصة أكّد',
    landingBtnLaunch: 'دخول لوحة التحكم — ابدأ الآن',
    landingBtnVerify: 'بوابة التحقق للجهات',
    
    // Landing Page - Video Section
    landingVideoTitle: 'شارك المطلوب فقط، واحفظ بياناتك الأخرى',
    landingVideoSubtitle: 'تعرف على كيفية عمل منصة أكد لتقليص مشاركة الوثائق وحماية الهوية الشخصية',

    // Landing Page - Use Cases
    landingUseCasesTitle: 'حلول عملية للقطاعات اليومية',
    landingUseCasesSubtitle: 'تكامل سريع يحقق الامتثال لمعايير الخصوصية في مختلف التعاملات',
    useCase1Title: 'المتاجر والمنصات الإلكترونية',
    useCase1Desc: 'التحقق من الأهلية العمرية للعميل دون طلب صورة بطاقة الهوية أو الاطلاع على السجل المدني.',
    useCase2Title: 'التأجير والخدمات العقارية',
    useCase2Desc: 'إثبات ملاءمة الراتب والوظيفة لعقد الإيجار دون كشف كشف الحساب البنكي أو رقم الآيبان.',
    useCase3Title: 'تأجير السيارات والتنقل',
    useCase3Desc: 'إثبات سريان رخصة القيادة والسن القانوني دون نسخ بطاقة الهوية وحفظ صورها.',
    useCase4Title: 'مراكز الصيانة والضمان',
    useCase4Desc: 'إثبات سريان الضمان والرقم التسلسلي للجهاز دون كشف السعر أو بيانات الفاتورة الشخصية.',

    // Landing Page - CTA Banner & Footer
    landingCtaTitle: 'ابدأ اليوم في حماية بياناتك ووثائقك الشخصية',
    landingCtaDesc: 'انضم لمنصة أكد وجرّب الإفصاح الانتقائي الذكي بنقرة واحدة.',
    landingFooterRights: 'جميع الحقوق محفوظة لمنصة أكد © 2026',
    landingFooterTagline: 'منصة أكّد لحماية البيانات الشخصية.',

    // Toasts & Dialogs
    copiedToClipboard: 'تم نسخ الرابط إلى الحافظة بنجاح!',
    proofRevokedToast: 'تم إلغاء الإثبات بنجاح ولن يتمكن المستلم من التحقق منه بعد الآن.',
    settingsSavedToast: 'تم حفظ تفضيلات الإعدادات بنجاح.',
    profileSavedToast: 'تم تحديث بيانات الملف الشخصي بنجاح.',
    confirmRevokeTitle: 'هل أنت متأكد من رغبتك في إلغاء هذا الإثبات؟',
    confirmRevokeDesc: 'بمجرد الإلغاء، سيتوقف رمز QR ورابط التحقق عن العمل فوراً ولن تتمكن الجهة من التحقق من صحته.',
    btnConfirmRevoke: 'نعم، قم بالإلغاء فوراً',
    btnCancel: 'تراجع',

    // Video Localization
    videoSectionTitle: 'تعرّف على أكّد',
    videoSectionDesc: 'شاهد كيف تحمي بياناتك وتشارك المطلوب فقط',
    videoPlayLabel: 'تشغيل الفيديو',
    videoReplayLabel: 'إعادة المشاهدة',
    videoSlogan: 'أثبت المطلوب، واحفظ الباقي',

    // Interactive Character Illustration inside Device Screen
    charTitle: 'التحقق من بيانات الهوية',
    charSubheading: 'البيانات الإضافية',
    charResult: 'مؤهل فقط',

    // Hero Section
    heroTitle: 'أثبت المطلوب، واحفظ الباقي',
    heroSubtitle: 'شارك المطلوب فقط، دون كشف بياناتك الأخرى',

    // Three-Phone Process Graphic
    howItWorksTitle: 'كيف تعمل أكّد؟',
    howItWorksSubtitle: 'ثلاث خطوات بسيطة لإثبات المطلوب دون مشاركة بياناتك الكاملة',
    howItWorksBtn: 'الدخول إلى المنصة',

    // Login Page
    loginTitle: 'تسجيل الدخول',
    loginSubtitle: 'الوصول الآمن لحسابك ولوحة التحكم في منصة أكّد',
    loginIdentifier: 'البريد الإلكتروني أو رقم الجوال',
    loginIdentifierPlaceholder: 'اكتب بريدك أو رقمك',
    loginPassword: 'كلمة المرور',
    loginForgot: 'نسيت كلمة المرور؟',
    loginBtn: 'تسجيل الدخول',
    loginNoAccount: 'ليس لديك حساب؟',
    loginCreateAccount: 'إنشاء حساب جديد',
    loginNafathBadge: 'التحقق عبر النفاذ الوطني الموحد قريباً',
    loginErrIdentifier: 'يرجى إدخال البريد الإلكتروني أو رقم الجوال',
    loginErrPassword: 'يرجى إدخال كلمة المرور',
    loginSuccessToast: 'تم تسجيل الدخول بنجاح. مرحباً بك في لوحة التحكم',
    loginShowPassword: 'إظهار كلمة المرور',
    loginHidePassword: 'إخفاء كلمة المرور',
    loginForgotTitle: 'استعادة كلمة المرور',
    loginForgotBody: 'سيتم توفير خدمة استعادة كلمة المرور قريبًا.',
    loginBackHome: 'العودة إلى الصفحة الرئيسية',

    // Registration Page
    regTitle: 'إنشاء حساب جديد',
    regSubtitle: 'انضم إلى منصة أكّد لحماية بياناتك ومشاركتها بأمان وسيادة تامة',
    regName: 'الاسم الكامل',
    regNamePlaceholder: 'اكتب اسمك الكامل',
    regIdentifier: 'البريد الإلكتروني أو رقم الجوال',
    regIdentifierPlaceholder: 'اكتب بريدك أو رقمك',
    regPassword: 'كلمة المرور',
    regPasswordConfirm: 'تأكيد كلمة المرور',
    regSubmit: 'إنشاء حساب جديد',
    regHaveAccount: 'لديك حساب بالفعل؟',
    regSignInLink: 'تسجيل الدخول',
    regErrName: 'يرجى إدخال الاسم',
    regErrIdentifier: 'يرجى إدخال البريد الإلكتروني أو رقم الجوال',
    regErrPassword: 'يرجى إدخال كلمة المرور',
    regErrConfirm: 'يرجى تأكيد كلمة المرور',
    regErrMismatch: 'كلمتا المرور غير متطابقتين',
    regSuccessToast: 'تم إنشاء الحساب بنجاح. مرحباً بك في لوحة التحكم',

    // Data Vault & Redaction Helpers
    redactedNotice: 'محجوب للحماية',
    protectedFieldNotice: '•••••••••••• (محمي)',
    unauthorizedDisclosure: 'غير مصرح بكشفه (محجوب)',
    issuedExclusivelyFor: 'صادر حصرياً لـ:',
    complianceNotice: 'متوافق مع نظام حماية البيانات الشخصية (PDPL)',
    activeSharesLinked: 'المشاركات النشطة المرتبطة:'
  },

  en: {
    // Brand
    brandName: 'Akked',
    brandTagline: 'Personal Data & Consent Guardian',
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
    navLanding: 'Home Page',
    createSecureShare: 'Create Secure Share',
    navLogout: 'Log Out',
    navLogin: 'Log in',
    navRegister: 'Create Account',
    navEnterPlatform: 'Enter Platform',
    quickActions: 'Quick Actions',
    authSectionTitle: 'Account',

    // Header & Global
    searchPlaceholder: 'Search shares, entities, or proofs...',
    activeLanguage: 'English',
    switchTheme: 'Switch Theme',
    themeLight: 'Light Mode',
    themeDark: 'Dark Mode',

    // Intro Section
    introHeading: 'Share only what is required. Keep everything else private.',
    btnCreateDemoProof: 'Create Proof',
    btnCreateProof: 'Create Proof',

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
    orChooseSample: 'Or choose a realistic pre-loaded template for instant testing:',
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
    recipientStore: 'E-Commerce Store',
    recipientRealEstate: 'Aqar Platform',
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
    beforeAfterDesc: 'Review what will be shielded before issuing the verified proof.',
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
    btnQuickShareToEntity: 'Issue Proof to Entity',

    // My Data Vault Page
    myDataPageTitle: 'My Data Vault & Exposure Monitor',
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

    // Redesigned Settings Page
    settingsPageTitle: 'Settings & Privacy Preferences',
    settingsPageSubtitle: 'Manage profile information, notification controls, color themes, and comprehensive accessibility options',
    settingsProfileTab: 'Account & Profile',
    settingsNotifTab: 'Notifications',
    settingsThemeTab: 'Appearance & Language',
    settingsAccessTab: 'Accessibility Mode',

    // Settings - Profile Section
    profileTitle: 'User Account & Profile',
    profileSubtitle: 'Your personal identification and cryptographic security identity',
    profileFullName: 'Full Name',
    profileEmail: 'Email Address',
    profilePhone: 'Phone Number',
    profileRole: 'Role / Designation',
    profilePrivacyId: 'Unique Privacy Key ID',
    profileAccountStatus: 'Account Status',
    profileVerifiedStatus: 'Locally Verified & Protected Account',
    profileHardwareKey: 'Cryptographic Key Digest (WebCrypto SHA-256)',
    btnSaveProfile: 'Save Profile Details',

    // Settings - Notification Preferences
    notifTitle: 'Notification & Alert Preferences',
    notifSubtitle: 'Granular control over real-time in-app alerts and external browser push notices',
    notifInAppAlerts: 'In-App Verification Alerts',
    notifInAppAlertsDesc: 'Receive immediate visual notifications whenever an organization checks your active proof.',
    notifExpiryReminders: 'Expiry Countdown Reminders',
    notifExpiryRemindersDesc: 'Send reminder notice 30 minutes before any active share reaches auto-expiration.',
    notifRevocationAlerts: 'Revocation Confirmations',
    notifRevocationAlertsDesc: 'Immediate confirmation alert whenever a digital proof is revoked.',
    notifPushExternal: 'External Browser Push Notifications',
    notifPushExternalDesc: 'Deliver external browser notifications for important incoming data-sharing requests.',
    notifWeeklyDigest: 'Periodic Privacy Compliance Digest',
    notifWeeklyDigestDesc: 'Weekly summary of your exposure health, active credentials, and expired records.',

    // Settings - Appearance & Theme
    themeTitle: 'Appearance & Language',
    themeSubtitle: 'Customize visual theme presentation and system language',
    themeSelectionTitle: 'Color Theme Mode:',
    themeLightName: 'Light Theme',
    themeLightDesc: 'Crisp, high-contrast surfaces tailored for well-lit environments',
    themeDarkName: 'Dark Theme',
    themeDarkDesc: 'Restrained deep palette engineered for low-light comfort',
    languageSelectionTitle: 'Interface Language:',
    languageSelectionDesc: 'Switch instantly between Arabic and English with full directional layout support.',

    // Settings - Accessibility Mode
    accessTitle: 'Accessibility Mode & Assistive Tools',
    accessSubtitle: 'Screen-reader optimizations, high-contrast focus rings, external notifications, and spoken audio announcements',
    accessMasterToggle: 'Enable Master Accessibility Mode',
    accessMasterToggleDesc: 'Activate enhanced contrast, screen-reader semantics, and audio assistance across the platform.',
    accessAudioAnnouncements: 'Spoken Audio Announcements on Entry',
    accessAudioAnnouncementsDesc: 'Speak an audio synthesized summary of active shares and important security notices when you open the app.',
    accessExternalNotifs: 'External Notifications for Critical Shares',
    accessExternalNotifsDesc: 'Deliver high-priority OS and browser alerts for critical data-sharing events.',
    accessHighContrast: 'Enhanced Focus Rings & High Contrast',
    accessHighContrastDesc: 'Display bold contrast boundaries and accessible outline indicators for keyboard navigation.',
    accessLargeText: 'Enlarged Text Scaling',
    accessLargeTextDesc: 'Scale text sizes up by 15% for optimal legibility.',
    btnTestSpeech: 'Test Spoken Announcement Now',
    speechAnnouncementPlaying: 'Playing spoken announcement...',
    speechTestSample: 'Welcome to Akked Privacy Guardian. Accessibility mode is active. All data processing executes locally on your device to safeguard your privacy.',

    // Settings - Voice Assistant & Microphone Controls
    accessMicVoiceAssistant: 'Interactive Voice Assistant & Microphone (Voice Assistant)',
    accessMicVoiceAssistantDesc: 'Automatically activates microphone and listens for voice commands to check data requests, review past authorizations, and approve renewals.',
    btnLaunchVoiceAssistant: 'Launch Voice Assistant & Mic',
    voiceAssistantTitle: 'Akked Privacy Voice Guardian',
    voiceListeningPrompt: 'Microphone is active & listening... You can speak: "Yes", "No", "Repeat", or "Explain"',
    voiceStatusListening: 'Listening to your voice via microphone...',
    voiceStatusSpeaking: 'Assistant is speaking...',
    voiceStatusIdle: 'Ready to listen',
    voiceStatusProcessing: 'Processing request & monitoring renewal procedures...',

    // Microphone Permission Modal
    micPermissionTitle: 'Microphone Access Permission for Universal Accessibility',
    micPermissionDesc: 'To enable voice-operated privacy control and conversational data reviews without requiring manual clicks, Akked requests microphone access.',
    micPrivacyAssurance: 'Privacy Guarantee: No voice audio is ever recorded or uploaded to remote servers; all processing is executed locally in your browser.',
    btnAllowMic: 'Allow Microphone Access',
    btnDenyMic: 'Continue Without Mic (Visual Only)',
    micPermissionGrantedBadge: 'Microphone Permission Granted',
    micPermissionDeniedBadge: 'Microphone Inactive (Permission Needed)',

    // Persistent Voice Accessibility Bar
    barListeningNow: 'Listening to your voice via microphone...',
    barPaused: 'Microphone paused',
    btnPauseMic: 'Pause Mic',
    btnResumeMic: 'Resume Listening',
    btnExitAccessibility: 'Exit Universal Accessibility',
    liveCaptionsTitle: 'Live Captions & Audio Transcript',
    scenarioSelectorLabel: 'Test Conversational Voice Scenarios:',

    // Conversational Scenarios
    scenarioAgeTitle: '1. Age Verification Request (E-Commerce Store)',
    scenarioSubscriptionTitle: '2. Subscription Renewal Request (ChatGPT)',
    scenarioRentalTitle: '3. Lease Qualification (Aqar Platform)',

    // Scenario 1: E-Commerce Age Verification
    voiceAgePrompt: 'You have a request from an E-Commerce Store for age verification. Required: sharing only the result that you are over 18. Do you agree?',
    voiceAgeConfirmSpeech: 'Your approval to share age proof only is confirmed. Issuing encrypted minimal proof.',
    voiceAgeExplain: 'Recipient is a verified E-Commerce Store. Purpose: verifying legal age for purchase. Requested data: boolean claim (over 18: true) without exposing ID, name, or address. Validity: 15 minutes. Risk level: lowest, PDPL compliant. Do you agree?',

    // Scenario 2: ChatGPT Subscription Renewal
    voiceRenewalPrompt: 'You have a subscription renewal request for ChatGPT for 75 SAR. Would you like to renew?',
    voiceRenewalConfirmSpeech: 'Your approval for the renewal request has been recorded, and I will monitor the process status.',
    voiceRenewalExplain: 'Recipient is ChatGPT (OpenAI). Purpose: monthly subscription renewal for 75 SAR. Requested data: zero-exposure encrypted token without raw card details. Do you agree to proceed?',
    chatGptService: 'ChatGPT (OpenAI)',
    renewalAmountLabel: 'Renewal Amount:',
    renewalAmountValue: '75.00 SAR / Month',
    renewalExpiryLabel: 'Target Renewal Date:',

    // Scenario 3: Real Estate Lease Qualification
    voiceRentalPrompt: 'You have a request from Aqar Platform to verify lease eligibility. Required: proving income bracket without disclosing bank statements. Do you agree?',
    voiceRentalConfirmSpeech: 'Your approval for income qualification proof is confirmed. Sending verified assertion.',
    voiceRentalExplain: 'Recipient is Aqar Platform. Purpose: verifying income threshold for lease contracting. Data: category compliance result only without exact income or bank statement. Do you agree?',

    // Universal Conversational Responses
    voicePromptReject: 'Your rejection has been recorded and data access blocked immediately.',
    voiceMisunderstood: 'Sorry, I did not catch that clearly. You can ask: Do I have new requests, read alerts, approve, reject, or explain.',
    voiceTimeoutGentle: 'Need more time? You can say Yes to approve, No to reject, Repeat, or Explain.',
    voiceSensitivePrompt: 'Notice: this action involves a financial authorization. Do you confirm execution? Say Yes to proceed or No to cancel.',
    voiceHeardText: 'Detected Voice Input:',
    
    // Quick Action Voice Commands
    voiceCmdYes: 'Yes [Key 1]',
    voiceCmdNo: 'No [Key 2]',
    voiceCmdExplain: 'Explain Details [Key 3]',
    voiceCmdRepeat: 'Repeat Request [Key 4]',

    // Live Checkpoint Announcements & Stepper
    monitoringTitle: 'Live Real-Time Renewal Monitoring',
    monitoringSubtitle: 'Tracking encrypted payment authorization and zero-exposure tokenization until official receipt',
    monitoringStep1: '1. Security Handshake & Cryptographic Identity Check',
    monitoringStep1Desc: 'Validating SSL certificate and cryptographic hash for ChatGPT without exposing unredacted PII.',
    monitoringStep2: '2. Zero-Exposure Payment Token Derivation',
    monitoringStep2Desc: 'Generating a one-time masked payment authorization token without sending credit card numbers.',
    monitoringStep3: '3. Issuing Verified Authorization to ChatGPT',
    monitoringStep3Desc: 'Delivering the authenticated renewal proof and closing external network ports.',
    monitoringStep4: '4. Official Confirmation Received & Recorded',
    monitoringStep4Desc: 'Official confirmation receipt received from provider and renewal extended successfully.',
    checkpoint1Announce: 'Stage 1: Validating security handshake and cryptographic identity.',
    checkpoint2Announce: 'Stage 2: Deriving zero-exposure masked payment token.',
    checkpoint3Announce: 'Stage 3: Submitting renewal authorization to service provider.',
    checkpoint4Announce: 'Official confirmation receipt received from provider. Subscription renewal completed and logged securely.',
    monitoringStatusActive: 'Active real-time monitoring in progress until official confirmation...',
    monitoringStatusComplete: 'Official confirmation received and procedures completed securely',
    monitoringHashLabel: 'Cryptographic Process Hash:',
    btnMinimizeVoice: 'Minimize Assistant',
    btnCloseVoice: 'Close Assistant',

    // Landing Page
    landingHeadline: 'Akked Platform',
    landingBtnLaunch: 'Launch Dashboard — Get Started',
    landingBtnVerify: 'Verifier Portal for Organizations',

    // Landing Page - Video Section
    landingVideoTitle: 'Share Only What’s Needed, Protect the Rest',
    landingVideoSubtitle: 'Learn how Akked enables minimal verifiable assertions without raw document leakage',

    // Landing Page - Use Cases
    landingUseCasesTitle: 'Trusted Solutions Across Real-World Sectors',
    landingUseCasesSubtitle: 'Instant compliance with data privacy standards across everyday digital interactions',
    useCase1Title: 'E-Commerce & Digital Services',
    useCase1Desc: 'Verify age eligibility without requesting full National ID copies or reading raw identification numbers.',
    useCase2Title: 'Real Estate & Rental Leases',
    useCase2Desc: 'Prove income qualification and lease suitability without exposing bank statements or IBAN details.',
    useCase3Title: 'Car Rental & Mobility',
    useCase3Desc: 'Prove valid driving license status and age threshold without storing photocopies of personal cards.',
    useCase4Title: 'Service Centers & Warranty',
    useCase4Desc: 'Validate warranty status and serial numbers without disclosing purchase price or personal invoice PII.',

    // Landing Page - CTA Banner & Footer
    landingCtaTitle: 'Take Sovereign Control Over Your Personal Documents Today',
    landingCtaDesc: 'Experience seamless, purpose-limited data sharing powered by Akked.',
    landingFooterRights: 'All Rights Reserved. Akked Platform © 2026',
    landingFooterTagline: 'Akked Privacy Platform.',

    // Toasts & Dialogs
    copiedToClipboard: 'Verification link copied to clipboard!',
    proofRevokedToast: 'Proof revoked successfully. The recipient can no longer verify it.',
    settingsSavedToast: 'Preferences saved successfully.',
    profileSavedToast: 'Profile details updated successfully.',
    confirmRevokeTitle: 'Are you sure you want to revoke this proof?',
    confirmRevokeDesc: 'Once revoked, the QR code and verification link will immediately fail verification.',
    btnConfirmRevoke: 'Yes, Revoke Now',
    btnCancel: 'Cancel',

    // Video Localization
    videoSectionTitle: 'Discover Akked',
    videoSectionDesc: 'See how Akked protects your data and shares only what is required.',
    videoPlayLabel: 'Play video',
    videoReplayLabel: 'Replay Video',
    videoSlogan: 'Prove what is required, protect the rest.',

    // Interactive Character Illustration inside Device Screen
    charTitle: 'Identity verification',
    charSubheading: 'Additional data',
    charResult: 'Eligible only',

    // Hero Section
    heroTitle: 'Prove What Is Required, Protect the Rest',
    heroSubtitle: 'Share only what is required without revealing your other personal data.',

    // Three-Phone Process Graphic
    howItWorksTitle: 'How Akked Works',
    howItWorksSubtitle: 'Three simple steps to prove what is required without sharing your complete personal data.',
    howItWorksBtn: 'Enter the Platform',

    // Login Page
    loginTitle: 'Sign In',
    loginSubtitle: 'Secure access to your account and dashboard on Akked Platform',
    loginIdentifier: 'Email or Mobile Number',
    loginIdentifierPlaceholder: 'Enter your email or mobile',
    loginPassword: 'Password',
    loginForgot: 'Forgot password?',
    loginBtn: 'Sign In',
    loginNoAccount: 'Don\'t have an account?',
    loginCreateAccount: 'Create a new account',
    loginNafathBadge: 'Verification via National Single Sign-On coming soon',
    loginErrIdentifier: 'Please enter your email or mobile number',
    loginErrPassword: 'Please enter your password',
    loginSuccessToast: 'Signed in successfully. Welcome to the dashboard',
    loginShowPassword: 'Show password',
    loginHidePassword: 'Hide password',
    loginForgotTitle: 'Password Recovery',
    loginForgotBody: 'Password recovery service will be available soon.',
    loginBackHome: 'Back to Home',

    // Registration Page
    regTitle: 'Create New Account',
    regSubtitle: 'Join Akked Platform to protect and share your data with total sovereignty',
    regName: 'Full Name',
    regNamePlaceholder: 'Enter your full name',
    regIdentifier: 'Email or Mobile Number',
    regIdentifierPlaceholder: 'Enter your email or mobile',
    regPassword: 'Password',
    regPasswordConfirm: 'Confirm Password',
    regSubmit: 'Create Account',
    regHaveAccount: 'Already have an account?',
    regSignInLink: 'Sign In',
    regErrName: 'Please enter your name',
    regErrIdentifier: 'Please enter your email or mobile number',
    regErrPassword: 'Please enter your password',
    regErrConfirm: 'Please confirm your password',
    regErrMismatch: 'Passwords do not match',
    regSuccessToast: 'Account created successfully. Welcome to the dashboard',

    // Data Vault & Redaction Helpers
    redactedNotice: 'Hidden for Privacy',
    protectedFieldNotice: '•••••••••••• (Protected)',
    unauthorizedDisclosure: 'Unauthorized to disclose (Redacted)',
    issuedExclusivelyFor: 'Issued Exclusively For:',
    complianceNotice: 'Compliant with Personal Data Protection Law (PDPL)',
    activeSharesLinked: 'Active Shares Linked:'
  }
};

window.I18N = {
  currentLang: 'ar',
  
  getLanguage() {
    return this.currentLang || (typeof localStorage !== 'undefined' ? localStorage.getItem('akked_lang') : 'ar') || 'ar';
  },
  
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
