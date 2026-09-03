/**
 * Akked AI Privacy Agent & Voice Assistant Component
 * Production-ready AI agent for data consent, dynamic state inspection,
 * intent recognition, Arabic TTS/STT, and multi-disability accessibility.
 */

window.AkkedVoiceAssistant = {
  isOpen: false,
  isMuted: false,
  isListening: false,
  isSpeaking: false,
  isUnderstanding: false,
  recognition: null,
  mediaStream: null,
  activeContextReqIndex: 0, // Current index among pending requests
  dialogueState: 'IDLE', // IDLE | PERMISSION_PROMPT | LISTENING | UNDERSTANDING | EXPLAINING | AWAITING_CONFIRMATION | TRACKING | COMPLETED | REJECTED
  monitoringStep: 1,
  currentTranscript: '',
  currentSpokenText: '',
  lastAssistantSpeech: '',
  silenceTimer: null,

  init() {
    this.setupKeyboardShortcuts();
    this.setupRecognition();
  },

  setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      const isAcc = AkkedState.settings.accessibility && AkkedState.settings.accessibility.enabled;
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;

      // Key "A" or "a" or "ش" launches the AI Accessibility Agent only if Universal Access is enabled
      const keyLower = e.key.toLowerCase();
      if (keyLower === 'a' || e.key === 'ش') {
        if (!isAcc) {
          return; // Do NOT activate mic if accessibility is disabled
        }
        e.preventDefault();
        if (!this.isOpen) {
          this.openHUD();
          if (!AkkedState.settings.accessibility.micPermissionGranted) {
            this.promptMicPermission();
          } else {
            this.startListening();
            this.announceCurrentPageAndActions();
          }
        } else {
          if (this.isMuted) {
            this.toggleMute();
          } else {
            this.startListening();
          }
        }
        return;
      }

      // Other accessibility shortcuts when enabled
      if (!isAcc) return;

      if (e.key === '1') {
        e.preventDefault();
        this.interpretAgentIntent('approve');
      } else if (e.key === '2') {
        e.preventDefault();
        this.interpretAgentIntent('reject');
      } else if (e.key === '3') {
        e.preventDefault();
        this.interpretAgentIntent('explain');
      } else if (e.key === '4') {
        e.preventDefault();
        this.interpretAgentIntent('repeat');
      } else if (e.key === ' ' && (this.isOpen || this.isListening)) {
        e.preventDefault();
        this.toggleMute();
      } else if (e.key === 'Escape' && this.isOpen) {
        e.preventDefault();
        this.closeHUD();
      }
    });
  },

  setupRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn('Web SpeechRecognition API unavailable; accessible visual and keyboard fallbacks active.');
      return;
    }

    try {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = true;
      this.recognition.maxAlternatives = 3;

      this.recognition.onstart = () => {
        this.isListening = true;
        this.isUnderstanding = false;
        this.clearSilenceTimer();
        this.updateUI();
      };

      this.recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          transcript += event.results[i][0].transcript;
        }
        this.currentTranscript = transcript.trim();
        this.updateUI();

        if (event.results[0] && event.results[0].isFinal) {
          this.processSpokenVoice(this.currentTranscript);
        }
      };

      this.recognition.onerror = (event) => {
        console.warn('Speech recognition status:', event.error);
        this.isListening = false;
        this.updateUI();
      };

      this.recognition.onend = () => {
        this.isListening = false;
        this.updateUI();

        if (this.currentTranscript && !this.isSpeaking && !this.isUnderstanding) {
          this.processSpokenVoice(this.currentTranscript);
        }

        if (AkkedState.settings.accessibility.enabled && !this.isMuted && !this.isSpeaking && !this.isUnderstanding) {
          setTimeout(() => {
            if (!this.isMuted && !this.isSpeaking && !this.isUnderstanding && AkkedState.settings.accessibility.enabled) {
              this.startListening();
            }
          }, 350);
        }
      };
    } catch (e) {
      console.warn('Speech recognition initialization error:', e);
    }
  },

  onAccessibilityEnabled() {
    this.renderPersistentBar();

    if (!AkkedState.settings.accessibility.micPermissionGranted) {
      this.promptMicPermission();
    } else {
      this.startListening();
      this.openHUD();
      this.announceCurrentPageAndActions();
    }
  },

  promptMicPermission() {
    this.dialogueState = 'PERMISSION_PROMPT';
    this.isOpen = true;
    this.renderHUD();

    const isAr = I18N.currentLang === 'ar';
    const permissionMsg = isAr
      ? 'أهلاً بك في نمط الوصول الشامل. لتمكين التحكم الصوتي الكامل في خصوصيتك، يرجى السماح باستخدام المايكروفون، أو اضغط زر A في أي وقت.'
      : 'Welcome to Universal Accessibility. To enable full voice privacy control, please allow microphone access, or press key A anytime.';
    this.speak(permissionMsg);
  },

  grantMicPermission() {
    AkkedState.settings.accessibility.micPermissionGranted = true;
    AkkedState.save();

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          this.mediaStream = stream;
          AkkedApp.showToast(I18N.currentLang === 'ar' ? 'تم منح إذن المايكروفون بنجاح' : 'Microphone permission granted', 'success');
          this.startListening();
          this.openHUD();
          this.announceCurrentPageAndActions();
        })
        .catch(err => {
          console.warn('Microphone permission fallback:', err);
          AkkedApp.showToast(I18N.currentLang === 'ar' ? 'تم تفعيل التحكم الصوتي' : 'Voice control active', 'success');
          this.startListening();
          this.openHUD();
          this.announceCurrentPageAndActions();
        });
    } else {
      this.startListening();
      this.openHUD();
      this.announceCurrentPageAndActions();
    }
  },

  denyMicPermission() {
    AkkedState.settings.accessibility.micPermissionGranted = false;
    AkkedState.save();
    AkkedApp.showToast(I18N.currentLang === 'ar' ? 'تم تعطيل المايكروفون — يمكنك استخدام أزرار الشاشة ولوحة المفاتيح' : 'Mic disabled — keyboard & visual controls active', 'info');
    this.closeHUD();
  },

  getCurrentContextReq() {
    const pending = AkkedState.getNewAndPendingRequests();
    if (pending.length === 0) return null;
    if (this.activeContextReqIndex >= pending.length) {
      this.activeContextReqIndex = 0;
    }
    return pending[this.activeContextReqIndex];
  },

  // Proactively inspect state and announce current page & available actions
  announceCurrentPageAndActions() {
    const isAr = I18N.currentLang === 'ar';
    const pending = AkkedState.getNewAndPendingRequests();
    const currentView = AkkedApp.currentView || 'dashboard';

    const pageNamesAr = {
      landing: 'الصفحة الرئيسية',
      dashboard: 'لوحة التحكم',
      shares: 'سجل المشاركات والإثباتات',
      verify: 'بوابة التحقق للجهات',
      settings: 'صفحة الإعدادات والوصول الشامل'
    };

    const currentPageName = isAr ? (pageNamesAr[currentView] || currentView) : currentView;

    let announcement = '';
    if (currentView === 'dashboard') {
      if (pending.length > 0) {
        const req = this.getCurrentContextReq();
        announcement = isAr
          ? `أنت الآن في لوحة التحكم. لديك ${pending.length} طلبات معلقة. الطلب الحالي من ${req.recipientNameAr || req.providerNameAr} للتحقق من ${req.purposeAr}. يمكنك قول: اشرح هذا الطلب، أو وافق، أو ارفض، أو انتقل إلى الطلب التالي، أو اقرأ التنبيهات.`
          : `You are on the Dashboard. You have ${pending.length} pending requests. Current request from ${req.recipientNameEn || req.providerNameEn} for ${req.purposeEn}. You can say: Explain this request, Approve, Reject, Next request, or Read alerts.`;
      } else {
        announcement = isAr
          ? `أنت الآن في لوحة التحكم. لا توجد أي طلبات معلقة حالياً. يمكنك قول: افتح المشاركات، أو اقرأ التنبيهات، أو ارجع للصفحة الرئيسية.`
          : `You are on the Dashboard. No pending requests. You can say: Open shares, Read alerts, or Go home.`;
      }
    } else if (currentView === 'shares') {
      const activeCount = AkkedState.shares.filter(s => s.status === 'active').length;
      announcement = isAr
        ? `أنت الآن في سجل المشاركات والإثباتات. لديك ${activeCount} إثباتات نشطة. يمكنك قول: افتح لوحة التحكم، أو اقرأ التنبيهات، أو ارجع للصفحة الرئيسية.`
        : `You are in Shares Registry. You have ${activeCount} active proofs. You can say: Open dashboard, Read alerts, or Go home.`;
    } else {
      announcement = isAr
        ? `أنت الآن في ${currentPageName}. يمكنك التنقل بقول: افتح لوحة التحكم، أو افتح المشاركات، أو ارجع للصفحة الرئيسية.`
        : `You are on ${currentPageName}. You can say: Open dashboard, Open shares, or Go home.`;
    }

    this.dialogueState = 'LISTENING';
    this.updateUI();

    this.speak(announcement, () => {
      this.startListening();
      this.armSilenceTimer();
    });
  },

  // Proactive inspection helper
  proactivelyInspectAndAnnounce() {
    this.announceCurrentPageAndActions();
  },

  cycleNextRequest() {
    const isAr = I18N.currentLang === 'ar';
    const pending = AkkedState.getNewAndPendingRequests();

    if (pending.length <= 1) {
      const msg = isAr ? 'لا يوجد طلب معلق آخر للانتقال إليه.' : 'No other pending request to cycle to.';
      this.speak(msg, () => {
        this.dialogueState = 'LISTENING';
        this.updateUI();
        this.startListening();
      });
      return;
    }

    this.activeContextReqIndex = (this.activeContextReqIndex + 1) % pending.length;
    const nextReq = pending[this.activeContextReqIndex];
    this.dialogueState = 'LISTENING';
    this.updateUI();

    const speech = isAr
      ? `الطلب التالي رقم ${this.activeContextReqIndex + 1} من ${nextReq.recipientNameAr || nextReq.providerNameAr} للتحقق من ${nextReq.purposeAr}. المطلوب: ${nextReq.requestedDataAr}. هل ترغب بالموافقة أو الرفض أو الشرح؟`
      : `Next request #${this.activeContextReqIndex + 1} from ${nextReq.recipientNameEn || nextReq.providerNameEn} for ${nextReq.purposeEn}. Required: ${nextReq.requestedDataEn}. Do you wish to approve, reject, or explain?`;

    this.speak(speech, () => {
      this.startListening();
      this.armSilenceTimer();
    });
  },

  // Interaction Model: Listen -> Transcribe -> Detect Intent -> Resolve Context -> Explain -> Confirm if sensitive -> Execute -> Verify -> Speak -> Update UI
  processSpokenVoice(text) {
    if (!text) return;
    const lower = text.toLowerCase().trim();
    this.currentTranscript = '';
    this.isUnderstanding = true;
    this.dialogueState = 'UNDERSTANDING';
    this.updateUI();

    // 1. Intent: Announce Page / Where Am I ("أين أنا؟", "ما الصفحة الحالية؟", "ما الإجراءات المتاحة؟")
    if (this.matchKeywords(lower, ['أين أنا', 'اين انا', 'ما الصفحة', 'وين انا', 'ما الإجراءات', 'ما الاجراءات', 'ماذا أفعل', 'where am i', 'what page', 'help'])) {
      this.isUnderstanding = false;
      this.announceCurrentPageAndActions();
      return;
    }

    // 2. Intent: Cycle Next Request ("انتقل إلى الطلب التالي", "الطلب التالي", "التالي")
    if (this.matchKeywords(lower, ['الطلب التالي', 'انتقل إلى الطلب', 'انتقل للطلب التالي', 'التالي', 'next request', 'next'])) {
      this.isUnderstanding = false;
      this.cycleNextRequest();
      return;
    }

    // 3. Intent: Check Pending / New Requests ("هل عندي طلبات جديدة؟", "اقرأ لي الطلبات")
    if (this.matchKeywords(lower, ['هل عندي طلبات', 'طلبات جديدة', 'اقرأ لي الطلبات', 'اقرا الطلبات', 'من طلب بياناتي', 'ما هي الطلبات', 'فحص الطلبات', 'طلباتي', 'new requests', 'pending requests', 'check requests'])) {
      this.handleQueryNewRequests();
      return;
    }

    // 4. Intent: Read Alerts ("اقرأ التنبيهات", "اقرأ لي التنبيهات")
    if (this.matchKeywords(lower, ['اقرأ التنبيهات', 'اقرا التنبيهات', 'اقرأ لي التنبيهات', 'ما هي التنبيهات', 'التنبيهات', 'سجل النشاط', 'alerts', 'read alerts', 'notifications'])) {
      this.handleQueryAlerts();
      return;
    }

    // 5. Intent: Query Expired Proofs ("ما الطلبات المنتهية؟", "الإثباتات المنتهية")
    if (this.matchKeywords(lower, ['الطلبات المنتهية', 'الإثباتات المنتهية', 'ما المنتهي', 'منتهية الصلاحية', 'expired', 'expired proofs'])) {
      this.handleQueryExpiredProofs();
      return;
    }

    // 6. Intent: Explain Specific / Current Request ("اشرح هذا الطلب", "اشرح لي الطلب", "اشرح أكثر")
    if (this.matchKeywords(lower, ['اشرح هذا الطلب', 'اشرح لي الطلب', 'اشرح الطلب', 'اشرح أكثر', 'اشرح', 'ما هي التفاصيل', 'المخاطر', 'وضح', 'explain', 'explain this request', 'details', 'risks', 'why'])) {
      this.interpretAgentIntent('explain');
      return;
    }

    // 7. Intent: Approve Request ("وافق", "وافق على الطلب", "نعم", "تأكيد")
    if (this.matchKeywords(lower, ['وافق على الطلب', 'وافق', 'موافق', 'أوافق', 'نعم', 'تأكيد', 'جدد', 'نعم اريد', 'اعتمد', 'approve', 'yes', 'confirm', 'proceed', 'renew'])) {
      this.interpretAgentIntent('approve');
      return;
    }

    // 8. Intent: Reject Request ("ارفض", "ارفض الطلب", "لا", "غير موافق", "إلغاء")
    if (this.matchKeywords(lower, ['ارفض الطلب', 'ارفض', 'أرفض', 'لا', 'غير موافق', 'إلغاء', 'تراجع', 'وقف', 'reject', 'no', 'deny', 'cancel'])) {
      this.interpretAgentIntent('reject');
      return;
    }

    // 9. Intent: Navigation Commands ("افتح المشاركات", "اقرأ التنبيهات", "ارجع للصفحة الرئيسية", "افتح لوحة التحكم", "افتح الإعدادات", "افتح بوابة التحقق")
    if (this.matchKeywords(lower, ['افتح المشاركات', 'المشاركات', 'سجل المشاركات', 'open shares', 'shares', 'my proofs'])) {
      this.handleNavigation('shares');
      return;
    }
    if (this.matchKeywords(lower, ['افتح لوحة التحكم', 'لوحة التحكم', 'open dashboard', 'dashboard', 'go to dashboard'])) {
      this.handleNavigation('dashboard');
      return;
    }
    if (this.matchKeywords(lower, ['افتح الإعدادات', 'الإعدادات', 'open settings', 'settings', 'go to settings'])) {
      this.handleNavigation('settings');
      return;
    }
    if (this.matchKeywords(lower, ['افتح بوابة التحقق', 'بوابة التحقق', 'التحقق', 'open verifier', 'verify'])) {
      this.handleNavigation('verify');
      return;
    }
    if (this.matchKeywords(lower, ['ارجع للصفحة الرئيسية', 'الصفحة الرئيسية', 'الرئيسية', 'home page', 'go home'])) {
      this.handleNavigation('landing');
      return;
    }

    // 10. Intent: Repeat Prompt ("كرر", "أعد", "ماذا قلت")
    if (this.matchKeywords(lower, ['كرر', 'أعد', 'اعد', 'إعادة', 'ماذا قلت', 'repeat', 'again', 'say again'])) {
      this.interpretAgentIntent('repeat');
      return;
    }

    // Unrecognized intent fallback
    this.handleUnrecognizedIntent();
  },

  matchKeywords(text, keywordsList) {
    return keywordsList.some(k => text.includes(k));
  },

  handleQueryNewRequests() {
    const isAr = I18N.currentLang === 'ar';
    const pending = AkkedState.getNewAndPendingRequests();

    if (pending.length === 0) {
      const msg = isAr 
        ? 'تم فحص النظام. لا توجد أي طلبات جديدة على بياناتك الشخصية حالياً.'
        : 'System check complete. There are no pending requests on your data right now.';
      this.speak(msg, () => {
        this.isUnderstanding = false;
        this.dialogueState = 'LISTENING';
        this.updateUI();
        this.startListening();
      });
      return;
    }

    const req = this.getCurrentContextReq();
    this.dialogueState = 'LISTENING';
    this.updateUI();

    const announcement = isAr 
      ? `لديك ${pending.length} طلبات معلقة. الطلب الحالي من ${req.recipientNameAr || req.providerNameAr} للتحقق من ${req.purposeAr}. المطلوب: ${req.requestedDataAr}. هل ترغب بالموافقة؟`
      : `You have ${pending.length} pending requests. Current request from ${req.recipientNameEn || req.providerNameEn} for ${req.purposeEn}. Required: ${req.requestedDataEn}. Do you wish to approve?`;
    
    this.speak(announcement, () => {
      this.isUnderstanding = false;
      this.startListening();
      this.armSilenceTimer();
    });
  },

  handleQueryAlerts() {
    const isAr = I18N.currentLang === 'ar';
    const unread = AkkedState.getUnreadAlerts();

    if (unread.length === 0) {
      const msg = isAr 
        ? 'جميع التنبيهات مقروءة ولا توجد أي إشعارات أمان غير مقروءة.'
        : 'All alerts are read. There are no unread security notices.';
      this.speak(msg, () => {
        this.isUnderstanding = false;
        this.dialogueState = 'LISTENING';
        this.updateUI();
        this.startListening();
      });
      return;
    }

    const top = unread[0];
    const msg = isAr
      ? `لديك تنبيه: ${top.titleAr}. ${top.descAr}`
      : `You have an alert: ${top.titleEn}. ${top.descEn}`;
    
    this.speak(msg, () => {
      this.isUnderstanding = false;
      this.dialogueState = 'LISTENING';
      this.updateUI();
      this.startListening();
    });
  },

  handleQueryExpiredProofs() {
    const isAr = I18N.currentLang === 'ar';
    const expired = AkkedState.getExpiredShares();

    const msg = isAr
      ? `لديك ${expired.length} إثباتات منتهية الصلاحية، منها إثبات الضمان لمركز صيانة الأجهزة المعتمد. كافة البيانات حُجبت وسُحبت الصلاحية تلقائياً.`
      : `You have ${expired.length} expired proofs. All access has been revoked and data masked.`;

    this.speak(msg, () => {
      this.isUnderstanding = false;
      this.dialogueState = 'LISTENING';
      this.updateUI();
      this.startListening();
    });
  },

  handleNavigation(viewId) {
    const isAr = I18N.currentLang === 'ar';
    this.isUnderstanding = false;
    this.closeHUD();
    AkkedApp.navigate(viewId);

    const viewNamesAr = {
      landing: 'الصفحة الرئيسية',
      dashboard: 'لوحة التحكم',
      settings: 'صفحة الإعدادات والوصول الشامل',
      shares: 'سجل المشاركات والإثباتات',
      verify: 'بوابة التحقق للجهات'
    };

    const msg = isAr 
      ? `تم الانتقال إلى ${viewNamesAr[viewId] || viewId}.`
      : `Navigated to ${viewId}.`;
    
    this.speak(msg);
  },

  interpretAgentIntent(action) {
    this.clearSilenceTimer();
    this.stopListening();
    this.isUnderstanding = false;
    const isAr = I18N.currentLang === 'ar';

    const req = this.getCurrentContextReq();

    if (action === 'repeat') {
      if (req) {
        const text = isAr ? req.spokenPromptAr : req.spokenPromptEn;
        this.speak(text, () => {
          this.dialogueState = 'LISTENING';
          this.updateUI();
          this.startListening();
          this.armSilenceTimer();
        });
      } else {
        this.speak(isAr ? 'لا يوجد طلب معلق لتكراره.' : 'No current request to repeat.', () => {
          this.dialogueState = 'LISTENING';
          this.updateUI();
          this.startListening();
        });
      }
      return;
    }

    if (action === 'explain') {
      if (req) {
        this.dialogueState = 'EXPLAINING';
        this.updateUI();

        const explainSpeech = isAr
          ? `الجهة الطالبة: ${req.recipientNameAr || req.providerNameAr} (${req.isTrusted ? 'جهة موثوقة' : 'جهة غير مسجلة'}). الغرض: ${req.purposeAr}. البيانات المطلوبة: ${req.requestedDataAr}. مدة الصلاحية: ${req.durationAr}. تقييم المخاطر: ${req.riskAr}. هل ترغب بالموافقة الآن؟`
          : `Requesting entity: ${req.recipientNameEn || req.providerNameEn}. Purpose: ${req.purposeEn}. Requested Data: ${req.requestedDataEn}. Expiry: ${req.durationEn}. Risk context: ${req.riskEn}. Do you wish to approve now?`;

        this.speak(explainSpeech, () => {
          this.dialogueState = 'LISTENING';
          this.updateUI();
          this.startListening();
          this.armSilenceTimer();
        });
      } else {
        this.speak(isAr ? 'لا توجد طلبات معلقة لشرح تفاصيلها.' : 'No pending requests to explain.', () => {
          this.dialogueState = 'LISTENING';
          this.updateUI();
          this.startListening();
        });
      }
      return;
    }

    if (action === 'approve') {
      if (!req) {
        this.speak(isAr ? 'لا توجد طلبات معلقة للموافقة عليها.' : 'No pending requests to approve.', () => {
          this.dialogueState = 'LISTENING';
          this.updateUI();
          this.startListening();
        });
        return;
      }

      // Check if Sensitive Confirmation is Required (Financial / Subscription)
      if (req.isSensitiveFinancial && this.dialogueState !== 'AWAITING_CONFIRMATION') {
        this.dialogueState = 'AWAITING_CONFIRMATION';
        this.updateUI();

        const sensitiveWarning = isAr
          ? `تنبيه أمان: هذا الإجراء يتضمن تفويضاً مالياً بقيمة ${req.amountAr}. هل تؤكد التنفيذ النهائي؟ قل نعم للمتابعة أو لا للتراجع.`
          : `Security Alert: This action involves a payment authorization of ${req.amountEn}. Do you confirm execution? Say Yes to proceed or No to cancel.`;

        this.speak(sensitiveWarning, () => {
          this.startListening();
          this.armSilenceTimer();
        });
        return;
      }

      // Process Data Sharing Approval
      if (req.type === 'data_sharing') {
        const result = AkkedState.approveRequest(req.id);
        this.dialogueState = 'COMPLETED';
        this.updateUI();

        const successSpeech = isAr
          ? `تم تسجيل موافقتك وإصدار إثبات مشفر بنجاح لـ "${req.recipientNameAr}".`
          : `Your consent was recorded, and minimal proof was issued successfully for "${req.recipientNameEn}".`;
        
        this.speak(successSpeech);
        AkkedApp.showToast(isAr ? 'تم إصدار الإثبات بنجاح بناءً على توجيهك الصوتي' : 'Proof issued successfully via voice consent', 'success');
      } else if (req.type === 'subscription_renewal') {
        this.dialogueState = 'TRACKING';
        this.monitoringStep = 1;
        this.updateUI();

        const initialSpeech = isAr 
          ? 'تم تسجيل موافقتك على طلب التجديد، وسأتابع حالة العملية.'
          : 'Your approval for renewal has been recorded, and I will monitor the process.';

        this.speak(initialSpeech, () => {
          AkkedState.processSubscriptionWorkflow(
            req.id,
            (stepNum) => {
              this.monitoringStep = stepNum;
              this.updateUI();
              if (stepNum === 1) {
                this.speak(isAr ? 'المرحلة الأولى: فحص أمان الاتصال وتشفير الهوية.' : 'Stage 1: Handshake & Identity encryption.');
              } else if (stepNum === 2) {
                this.speak(isAr ? 'المرحلة الثانية: توليد رمز تفويض مالي مشفر بحد أدنى.' : 'Stage 2: Deriving zero-exposure payment token.');
              } else if (stepNum === 3) {
                this.speak(isAr ? 'المرحلة الثالثة: إرسال تفويض التجديد إلى مزود الخدمة.' : 'Stage 3: Submitting renewal authorization to provider.');
              }
            },
            (completedTarget) => {
              this.monitoringStep = 4;
              this.dialogueState = 'COMPLETED';
              this.updateUI();

              const finalSpeech = isAr
                ? 'تم استلام التأكيد الرسمي من مزود الخدمة، واكتمل تجديد اشتراك ChatGPT وتوثيقه بنجاح.'
                : 'Official confirmation receipt received from provider. Subscription renewal completed and logged.';
              
              this.speak(finalSpeech);
              AkkedApp.showToast(isAr ? 'تم استلام التأكيد الرسمي وتوثيق التجديد' : 'Official confirmation verified and logged', 'success');
            }
          );
        });
      }
      return;
    }

    if (action === 'reject') {
      if (!req) {
        this.speak(isAr ? 'لا توجد طلبات معلقة لرفضها.' : 'No pending requests to reject.', () => {
          this.dialogueState = 'LISTENING';
          this.updateUI();
          this.startListening();
        });
        return;
      }

      AkkedState.rejectRequest(req.id);
      this.dialogueState = 'REJECTED';
      this.updateUI();

      const rejectSpeech = isAr
        ? 'تم تسجيل رفضك للطلب وحجب الصلاحية فوراً.'
        : 'Your rejection has been recorded and data access blocked immediately.';
      
      this.speak(rejectSpeech);
      AkkedApp.showToast(isAr ? 'تم رفض الطلب وحجب الوصول' : 'Request rejected and access blocked', 'warning');
      return;
    }
  },

  handleUnrecognizedIntent() {
    this.isUnderstanding = false;
    const isAr = I18N.currentLang === 'ar';
    const fallbackMsg = isAr
      ? 'عذراً، لم أفهم طلبك بدقة. يمكنك قول: اشرح هذا الطلب، أو وافق، أو ارفض، أو انتقل إلى الطلب التالي، أو اقرأ التنبيهات، أو افتح المشاركات.'
      : 'Sorry, I did not catch that clearly. You can say: Explain this request, Approve, Reject, Next request, Read alerts, or Open shares.';
    
    this.speak(fallbackMsg, () => {
      this.dialogueState = 'LISTENING';
      this.updateUI();
      this.startListening();
      this.armSilenceTimer();
    });
  },

  armSilenceTimer() {
    this.clearSilenceTimer();
    this.silenceTimer = setTimeout(() => {
      if (this.isListening && !this.isSpeaking && (this.dialogueState === 'LISTENING' || this.dialogueState === 'AWAITING_CONFIRMATION')) {
        const isAr = I18N.currentLang === 'ar';
        const gentleReminder = isAr
          ? 'هل أنت بحاجة للمزيد من الوقت؟ يمكنك قول نعم للموافقة، أو لا للرفض، أو اشرح لمعرفة التفاصيل.'
          : 'Need more time? You can say Yes to approve, No to reject, or Explain for full details.';
        this.speak(gentleReminder, () => {
          this.startListening();
        });
      }
    }, 9500);
  },

  clearSilenceTimer() {
    if (this.silenceTimer) {
      clearTimeout(this.silenceTimer);
      this.silenceTimer = null;
    }
  },

  speak(text, onEndCallback) {
    if (!('speechSynthesis' in window)) {
      if (onEndCallback) setTimeout(onEndCallback, 600);
      return;
    }

    try {
      this.stopListening();
      window.speechSynthesis.cancel();
      this.isSpeaking = true;
      this.currentSpokenText = text;
      this.lastAssistantSpeech = text;
      this.updateUI();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = I18N.currentLang === 'ar' ? 'ar-SA' : 'en-US';
      utterance.rate = (AkkedState.settings.accessibility && AkkedState.settings.accessibility.speechRate) || 1.0;

      const voices = window.speechSynthesis.getVoices();
      if (voices && voices.length > 0) {
        const langPrefix = I18N.currentLang === 'ar' ? 'ar' : 'en';
        const matchingVoice = voices.find(v => v.lang && v.lang.toLowerCase().startsWith(langPrefix));
        if (matchingVoice) utterance.voice = matchingVoice;
      }

      utterance.onend = () => {
        this.isSpeaking = false;
        this.updateUI();
        if (onEndCallback) onEndCallback();
      };

      utterance.onerror = () => {
        this.isSpeaking = false;
        this.updateUI();
        if (onEndCallback) onEndCallback();
      };

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      this.isSpeaking = false;
      this.updateUI();
      if (onEndCallback) onEndCallback();
    }
  },

  startListening() {
    if (this.isMuted || this.isSpeaking) return;
    if (this.recognition) {
      try {
        const isAr = I18N.currentLang === 'ar';
        this.recognition.lang = isAr ? 'ar-SA' : 'en-US';
        this.recognition.start();
        this.isListening = true;
        this.updateUI();
      } catch (e) {}
    }
  },

  stopListening() {
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (e) {}
    }
    this.isListening = false;
    this.updateUI();
  },

  toggleMute() {
    this.isMuted = !this.isMuted;
    AkkedState.settings.accessibility.isMuted = this.isMuted;
    AkkedState.save();

    if (this.isMuted) {
      this.stopListening();
      if (window.speechSynthesis) window.speechSynthesis.cancel();
      AkkedApp.showToast(I18N.currentLang === 'ar' ? 'تم إيقاف الاستماع مؤقتاً' : 'Listening paused', 'info');
    } else {
      AkkedApp.showToast(I18N.currentLang === 'ar' ? 'أستمع الآن...' : 'Listening now...', 'success');
      this.startListening();
    }
    this.updateUI();
  },

  exitAccessibilityMode() {
    this.teardown();
    AkkedState.settings.accessibility.enabled = false;
    AkkedState.save();
    AkkedState.applyAccessibilityMode();
    AkkedApp.renderView();
    AkkedApp.showToast(I18N.currentLang === 'ar' ? 'تم الخروج من نمط الوصول الشامل وإيقاف المايكروفون' : 'Universal Accessibility disabled & mic stopped', 'info');
  },

  teardown() {
    this.stopListening();
    this.clearSilenceTimer();
    if (window.speechSynthesis) window.speechSynthesis.cancel();

    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(track => track.stop());
      this.mediaStream = null;
    }

    this.isOpen = false;
    this.isListening = false;
    this.isSpeaking = false;
    this.isUnderstanding = false;

    const bar = document.getElementById('akked-persistent-accessibility-bar');
    if (bar) bar.remove();

    const hud = document.getElementById('akked-voice-hud-container');
    if (hud) hud.remove();
  },

  openHUD() {
    this.isOpen = true;
    this.renderHUD();
  },

  closeHUD() {
    this.isOpen = false;
    const hud = document.getElementById('akked-voice-hud-container');
    if (hud) hud.remove();
    this.renderPersistentBar();
  },

  updateUI() {
    this.renderPersistentBar();
    this.renderHUD();
  },

  renderPersistentBar() {
    const isAcc = AkkedState.settings.accessibility && AkkedState.settings.accessibility.enabled;
    let bar = document.getElementById('akked-persistent-accessibility-bar');

    if (!isAcc) {
      if (bar) bar.remove();
      return;
    }

    if (!bar) {
      bar = document.createElement('div');
      bar.id = 'akked-persistent-accessibility-bar';
      document.body.prepend(bar);
    }

    const isAr = I18N.currentLang === 'ar';
    const isMuted = this.isMuted;
    const isListening = this.isListening && !isMuted && !this.isSpeaking;
    const isUnderstanding = this.isUnderstanding;

    let statusText = isMuted 
      ? (isAr ? 'تم إيقاف الاستماع' : 'Microphone Paused') 
      : (isUnderstanding ? (isAr ? 'جارٍ فهم طلبك...' : 'Understanding your request...') : (isListening ? (isAr ? 'أستمع الآن...' : 'Listening now...') : (isAr ? 'جاهز للاستماع' : 'Ready')));

    bar.innerHTML = `
      <div class="voice-persistent-bar animate-fade-in" role="region" aria-label="Universal Accessibility Voice Controls">
        <div class="bar-left-status">
          <div class="bar-pulse-indicator ${isMuted ? 'bar-indicator-muted' : (isUnderstanding ? 'bar-indicator-understanding' : (isListening ? 'bar-indicator-listening' : 'bar-indicator-idle'))}"></div>
          <span class="bar-status-text" aria-live="polite">
            ${statusText}
          </span>
          <span class="badge" style="background: rgba(255,255,255,0.15); color: #FFF; font-size: 0.74rem; padding: 2px 6px; border-radius: 4px; margin-inline-start: 6px;">
            [Key A]
          </span>
        </div>

        <div class="bar-actions-group">
          <!-- Ask Question Action -->
          <button class="bar-action-btn bar-btn-open" onclick="AkkedVoiceAssistant.openHUD(); AkkedVoiceAssistant.announceCurrentPageAndActions();" title="${isAr ? 'فحص الطلبات' : 'Check Requests'}">
            <span style="display: inline-flex; align-items: center; gap: 6px;">${AkkedIcons.get('mic', { size: 14 })} <span>${isAr ? 'المساعد الصوتي (A)' : 'Voice Assistant (A)'}</span></span>
          </button>

          <!-- Pause / Mute Control -->
          <button class="bar-action-btn ${isMuted ? 'bar-btn-resume' : 'bar-btn-pause'}" onclick="AkkedVoiceAssistant.toggleMute()" title="${isMuted ? (isAr ? 'استئناف الاستماع' : 'Resume Mic') : (isAr ? 'إيقاف مؤقت للمايك' : 'Pause Mic')}">
            <span style="display: inline-flex; align-items: center; gap: 6px;">${AkkedIcons.get(isMuted ? 'play' : 'pause', { size: 13 })} <span>${isMuted ? (isAr ? 'استئناف' : 'Resume') : (isAr ? 'إيقاف مؤقت' : 'Pause')}</span></span>
          </button>

          <!-- Exit Accessibility Mode -->
          <button class="bar-action-btn bar-btn-exit" onclick="AkkedVoiceAssistant.exitAccessibilityMode()" title="${isAr ? 'الخروج من نمط الوصول الشامل' : 'Exit Universal Accessibility'}">
            <span style="display: inline-flex; align-items: center; gap: 6px;">${AkkedIcons.get('close', { size: 14 })} <span>${isAr ? 'الخروج' : 'Exit'}</span></span>
          </button>
        </div>
      </div>
    `;
  },

  renderHUD() {
    if (!this.isOpen) return;
    let hud = document.getElementById('akked-voice-hud-container');
    if (!hud) {
      hud = document.createElement('div');
      hud.id = 'akked-voice-hud-container';
      document.body.appendChild(hud);
    }

    const isAr = I18N.currentLang === 'ar';
    const isMuted = this.isMuted;
    const isListening = this.isListening && !isMuted && !this.isSpeaking;
    const isSpeaking = this.isSpeaking;
    const isUnderstanding = this.isUnderstanding;
    const state = this.dialogueState;
    const step = this.monitoringStep;

    const req = this.getCurrentContextReq();

    hud.innerHTML = `
      <div class="voice-hud-backdrop" onclick="if(event.target===this) AkkedVoiceAssistant.closeHUD()">
        <div class="voice-hud-panel animate-fade-in" role="dialog" aria-modal="true" aria-label="${isAr ? 'مساعد الخصوصية الصوتي' : 'Voice Privacy Assistant'}">
          
          <!-- Top HUD Header Bar -->
          <div class="voice-hud-topbar">
            <div style="display: flex; align-items: center; gap: 10px;">
              <div class="voice-hud-indicator-dot ${isMuted ? 'dot-muted' : (isUnderstanding ? 'dot-understanding' : (isListening ? 'dot-listening' : (isSpeaking ? 'dot-speaking' : 'dot-active')))}"></div>
              <div>
                <span class="voice-hud-title">${isAr ? 'مساعد أكد الصوتي للخصوصية' : 'Akked Voice Privacy Guardian'}</span>
                <span class="voice-hud-status-badge">
                  ${isMuted ? (isAr ? 'تم إيقاف الاستماع' : 'Paused') : (isSpeaking ? (isAr ? 'المساعد يتحدث الآن...' : 'Speaking...') : (isUnderstanding ? (isAr ? 'جارٍ فهم طلبك...' : 'Understanding...') : (isListening ? (isAr ? 'أستمع الآن...' : 'Listening now...') : (isAr ? 'جاهز للاستماع' : 'Ready'))))}
                </span>
              </div>
            </div>

            <div style="display: flex; gap: 6px;">
              <button class="voice-hud-icon-btn" onclick="AkkedVoiceAssistant.toggleMute()" title="${this.isMuted ? (isAr ? 'استئناف' : 'Resume') : (isAr ? 'إيقاف مؤقت' : 'Pause')}">
                ${AkkedIcons.get(this.isMuted ? 'play' : 'pause', { size: 14 })}
              </button>
              <button class="voice-hud-icon-btn" onclick="AkkedVoiceAssistant.closeHUD()" title="${isAr ? 'إغلاق' : 'Close'}">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
          </div>

          <!-- Permission Request State -->
          ${state === 'PERMISSION_PROMPT' ? `
            <div class="voice-permission-modal animate-fade-in">
              <div style="width: 56px; height: 56px; border-radius: 50%; background: var(--brand-primary-light); color: var(--brand-primary); display: flex; align-items: center; justify-content: center; margin: 0 auto 16px;">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
              </div>
              <h3 style="font-size: 1.18rem; font-weight: 800; color: var(--text-main); margin-bottom: 8px;">${isAr ? 'طلب إذن المايكروفون للتفاعل الصوتي' : 'Microphone Access Permission'}</h3>
              <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 14px;">
                ${isAr ? 'لتمكين التحكم الصوتي الكامل في خصوصيتك ومراجعة طلبات البيانات دون الحاجة للنقر، نحتاج إذن الوصول إلى المايكروفون. يمكنك أيضاً الضغط على زر A في أي وقت.' : 'To enable conversational privacy control without requiring manual clicks, Akked requests microphone permission. You can also press key A anytime.'}
              </p>
              <div style="display: flex; gap: 12px;">
                <button class="btn btn-primary" style="flex: 1; display: inline-flex; align-items: center; justify-content: center; gap: 8px;" onclick="AkkedVoiceAssistant.grantMicPermission()">
                  ${AkkedIcons.get('mic', { size: 16 })}
                  <span>${isAr ? 'السماح بتشغيل المايكروفون' : 'Allow Microphone'}</span>
                </button>
                <button class="btn btn-secondary" style="flex: 1;" onclick="AkkedVoiceAssistant.denyMicPermission()">
                  <span>${isAr ? 'متابعة بدون مايك (الوضع البصري)' : 'Continue Without Mic'}</span>
                </button>
              </div>
            </div>
          ` : `

            <!-- Central Voice Visualizer -->
            <div class="voice-visualizer-area">
              <div class="voice-mic-halo ${isMuted ? 'halo-muted' : (isUnderstanding ? 'halo-understanding' : (isListening ? 'halo-pulse' : (isSpeaking ? 'halo-speaking' : '')))}">
                <div class="voice-mic-center">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                    <line x1="12" y1="19" x2="12" y2="23"/>
                    <line x1="8" y1="23" x2="16" y2="23"/>
                  </svg>
                </div>
              </div>

              <!-- Sound Wave Bars -->
              <div class="voice-sound-waves ${isListening || isSpeaking ? 'waves-active' : ''}">
                <span class="sw-bar"></span>
                <span class="sw-bar"></span>
                <span class="sw-bar"></span>
                <span class="sw-bar"></span>
                <span class="sw-bar"></span>
                <span class="sw-bar"></span>
                <span class="sw-bar"></span>
              </div>

              <!-- Synchronized Live Captions / Speech Bubble -->
              <div class="voice-speech-bubble" role="alert" aria-live="polite">
                <p class="voice-prompt-text">
                  "${this.currentSpokenText || (isAr ? 'تحدث الآن وسأجيبك فوراً...' : 'Speak now and I will assist you...')}"
                </p>
              </div>

              <!-- Live Speech Recognition Transcribed Feedback -->
              ${this.currentTranscript ? `
                <div class="voice-transcript-badge animate-fade-in">
                  <span>${isAr ? 'تم رصد صوتك:' : 'Transcribed:'}</span>
                  <strong>"${this.currentTranscript}"</strong>
                </div>
              ` : ''}
            </div>

            <!-- Active Pending Request Card (if present) -->
            ${req && state !== 'COMPLETED' && state !== 'REJECTED' ? `
              <div class="voice-request-card animate-fade-in">
                <div class="request-service-header">
                  <div class="request-service-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                  </div>
                  <div>
                    <div style="font-weight: 800; font-size: 0.95rem; color: var(--text-main);">${isAr ? (req.recipientNameAr || req.providerNameAr) : (req.recipientNameEn || req.providerNameEn)}</div>
                    <div style="font-size: 0.78rem; color: var(--text-muted);">${isAr ? req.purposeAr : req.purposeEn}</div>
                  </div>
                  <div style="margin-inline-start: auto; text-align: end;">
                    <span class="badge ${req.isTrusted ? 'badge-active' : 'badge-warning'}">${req.isTrusted ? (isAr ? 'جهة موثوقة' : 'Trusted') : (isAr ? 'غير مسجلة' : 'Unregistered')}</span>
                  </div>
                </div>
              </div>
            ` : ''}

            <!-- Quick Action Command Shortcuts -->
            ${state === 'LISTENING' || state === 'UNDERSTANDING' || state === 'EXPLAINING' || state === 'AWAITING_CONFIRMATION' ? `
              <div class="voice-action-grid">
                <button class="voice-cmd-card cmd-yes" onclick="AkkedVoiceAssistant.interpretAgentIntent('approve')">
                  <div class="cmd-key-badge">1</div>
                  <div class="cmd-label">${isAr ? 'وافق على الطلب' : 'Approve (1)'}</div>
                </button>

                <button class="voice-cmd-card cmd-no" onclick="AkkedVoiceAssistant.interpretAgentIntent('reject')">
                  <div class="cmd-key-badge">2</div>
                  <div class="cmd-label">${isAr ? 'ارفض الطلب' : 'Reject (2)'}</div>
                </button>

                <button class="voice-cmd-card cmd-explain" onclick="AkkedVoiceAssistant.interpretAgentIntent('explain')">
                  <div class="cmd-key-badge">3</div>
                  <div class="cmd-label">${isAr ? 'اشرح هذا الطلب' : 'Explain (3)'}</div>
                </button>

                <button class="voice-cmd-card cmd-repeat" onclick="AkkedVoiceAssistant.cycleNextRequest()">
                  <div class="cmd-key-badge">4</div>
                  <div class="cmd-label">${isAr ? 'الطلب التالي' : 'Next Request'}</div>
                </button>
              </div>

              <div style="text-align: center; font-size: 0.8rem; color: var(--text-muted); margin: 6px 24px 16px; display: flex; align-items: center; justify-content: center; gap: 6px;">
                ${AkkedIcons.get('mic', { size: 15 })}
                <span>${isAr ? 'الأوامر الصوتية: "افتح المشاركات"، "اقرأ التنبيهات"، "انتقل إلى الطلب التالي"، "اشرح هذا الطلب"، "وافق"، "ارفض"، "ارجع للصفحة الرئيسية"' : 'Voice commands: "Open shares", "Read alerts", "Next request", "Explain this request", "Approve", "Reject", "Go home"'}</span>
              </div>
            ` : ''}

            <!-- Live Subscription Checkpoints Stepper (When Renewal Workflow is Active) -->
            ${state === 'TRACKING' || (state === 'COMPLETED' && req && req.type === 'subscription_renewal') ? `
              <div class="voice-monitoring-container animate-fade-in">
                <div class="monitoring-header">
                  <div>
                    <strong style="font-size: 0.95rem; color: var(--text-main); display: flex; align-items: center; gap: 6px;">
                      <span class="monitoring-live-icon"></span>
                      <span>${isAr ? 'المتابعة الحية لعملية التجديد' : 'Live Renewal Tracking'}</span>
                    </strong>
                    <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 2px;">${isAr ? 'تتبع مسار التفويض المشفر حتى استلام التأكيد الرسمي' : 'Tracking encrypted authorization until official receipt'}</div>
                  </div>
                  <span class="badge ${state === 'COMPLETED' ? 'badge-active' : 'badge-warning'}">
                    <span>${state === 'COMPLETED' ? (isAr ? 'تم استلام التأكيد الرسمي' : 'Confirmed') : (isAr ? 'جاري المعالجة والمتابعة...' : 'Processing...')}</span>
                  </span>
                </div>

                <!-- 4 Stages Timeline -->
                <div class="monitoring-stepper-timeline">
                  <div class="monitoring-step-row ${step >= 1 ? (step === 1 && state === 'TRACKING' ? 'step-active' : 'step-passed') : 'step-pending'}">
                    <div class="step-num-bubble">${step > 1 || state === 'COMPLETED' ? AkkedIcons.get('check', { size: 12, strokeWidth: 3 }) : '1'}</div>
                    <div class="step-content">
                      <div class="step-title">${isAr ? '1. فحص أمان الاتصال وتشفير الهوية' : '1. Security Handshake & Identity Encryption'}</div>
                    </div>
                  </div>

                  <div class="monitoring-step-row ${step >= 2 ? (step === 2 && state === 'TRACKING' ? 'step-active' : 'step-passed') : 'step-pending'}">
                    <div class="step-num-bubble">${step > 2 || state === 'COMPLETED' ? AkkedIcons.get('check', { size: 12, strokeWidth: 3 }) : '2'}</div>
                    <div class="step-content">
                      <div class="step-title">${isAr ? '2. توليد تفويض مالي مشفر بحد أدنى (Zero-Exposure)' : '2. Zero-Exposure Token Derivation'}</div>
                    </div>
                  </div>

                  <div class="monitoring-step-row ${step >= 3 ? (step === 3 && state === 'TRACKING' ? 'step-active' : 'step-passed') : 'step-pending'}">
                    <div class="step-num-bubble">${step > 3 || state === 'COMPLETED' ? AkkedIcons.get('check', { size: 12, strokeWidth: 3 }) : '3'}</div>
                    <div class="step-content">
                      <div class="step-title">${isAr ? '3. إرسال تفويض التجديد لمزود الخدمة' : '3. Submitting Renewal Authorization'}</div>
                    </div>
                  </div>

                  <div class="monitoring-step-row ${step >= 4 ? 'step-passed' : 'step-pending'}">
                    <div class="step-num-bubble">${state === 'COMPLETED' ? AkkedIcons.get('check', { size: 12, strokeWidth: 3 }) : '4'}</div>
                    <div class="step-content">
                      <div class="step-title">${isAr ? '4. استلام التأكيد الرسمي وتوثيق العملية' : '4. Official Confirmation Received & Logged'}</div>
                    </div>
                  </div>
                </div>

                ${state === 'COMPLETED' ? `
                  <div style="display: flex; justify-content: flex-end; margin-top: 12px;">
                    <button class="btn btn-primary btn-sm" onclick="AkkedVoiceAssistant.closeHUD()">
                      ${AkkedIcons.get('check', { size: 14, strokeWidth: 2.5 })}
                      <span>${isAr ? 'إغلاق المساعد' : 'Close Assistant'}</span>
                    </button>
                  </div>
                ` : ''}
              </div>
            ` : ''}

            <!-- Completed Data Sharing State -->
            ${state === 'COMPLETED' && (!req || req.type !== 'subscription_renewal') ? `
              <div style="text-align: center; padding: 18px 24px 22px; background: rgba(13, 130, 91, 0.05); border: 1px solid rgba(13, 130, 91, 0.2); border-radius: var(--radius-md); margin: 0 24px 18px;">
                <div style="color: var(--status-active); margin-bottom: 8px; display: flex; justify-content: center;">${AkkedIcons.get('check-circle', { size: 36 })}</div>
                <strong style="color: var(--status-active); font-size: 1rem;">${isAr ? 'تمت معالجة الطلب وتوثيق الإثبات المشفر بنجاح' : 'Request Processed & Proof Verified'}</strong>
                <div style="margin-top: 14px;">
                  <button class="btn btn-primary btn-sm" onclick="AkkedVoiceAssistant.closeHUD()">${isAr ? 'تم، إغلاق' : 'Done'}</button>
                </div>
              </div>
            ` : ''}

            <!-- Rejected State -->
            ${state === 'REJECTED' ? `
              <div style="text-align: center; padding: 18px 24px 22px; background: rgba(220, 38, 38, 0.04); border: 1px solid rgba(220, 38, 38, 0.2); border-radius: var(--radius-md); margin: 0 24px 18px;">
                <div style="color: var(--status-danger); margin-bottom: 8px; display: flex; justify-content: center;">${AkkedIcons.get('x-circle', { size: 36 })}</div>
                <strong style="color: var(--status-danger); font-size: 1rem;">${isAr ? 'تم رفض الطلب وحجب أي مشاركة بيانات فوراً' : 'Request Rejected & Access Blocked'}</strong>
                <div style="margin-top: 14px;">
                  <button class="btn btn-secondary btn-sm" onclick="AkkedVoiceAssistant.closeHUD()">${isAr ? 'إغلاق' : 'Close'}</button>
                </div>
              </div>
            ` : ''}
          `}

        </div>
      </div>
    `;
  }
};
