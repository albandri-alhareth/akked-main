/**
 * Akked Redaction & Privacy Engine
 * Handles OCR field mapping, purpose inference, minimum necessary recommendation, and privacy score calculation
 */

window.AkkedRedactionEngine = {
  /**
   * Defines purpose-based minimum field inference rules
   */
  purposeRules: {
    'purpose_age': {
      docType: 'national_id',
      recommendedAllowed: ['age_calc'],
      claimAr: 'المستخدم فوق 18 عاماً (مؤهل)',
      claimEn: 'User is Over 18 (Eligible)',
      rationalAr: 'للتحقق من السن القانوني، لا يحتاج المتجر لمعرفة رقم الهوية أو الاسم أو صورة الوجه.',
      rationalEn: 'To verify legal age, the store does not need your National ID, Name, or Photo.'
    },
    'purpose_salary': {
      docType: 'salary_cert',
      recommendedAllowed: ['status_active', 'salary_range'],
      claimAr: 'الحالة: على رأس العمل | الدخل: مؤهل ويتجاوز الحد الأدنى',
      claimEn: 'Status: Employed | Income: Eligible threshold met',
      rationalAr: 'لإثبات الملاءمة المالية، يكفي التحقق من سريان العمل ونطاق الراتب دون كشف الآيبان والتفاصيل.',
      rationalEn: 'To prove financial eligibility, active status and salary range are sufficient without exposing IBAN.'
    },
    'purpose_warranty': {
      docType: 'warranty_receipt',
      recommendedAllowed: ['item_name', 'serial_no', 'warranty_status'],
      claimAr: 'الضمان ساري للجهاز ورقم السيريال مطابق',
      claimEn: 'Warranty valid for device model and matching serial',
      rationalAr: 'لمطالبة الضمان، يحتاج مركز الصيانة فقط لموديل الجهاز والسيريال وسريان التاريخ دون بيانات الدفع.',
      rationalEn: 'For warranty claims, only device model, serial, and expiration date are required without payment info.'
    }
  },

  /**
   * Calculates the Privacy Protection Score (0 - 100)
   * Formula: Based on ratio of shielded high-risk PII to total sensitive fields
   */
  calculatePrivacyScore(doc, allowedFieldIds) {
    if (!doc || !doc.fields || doc.fields.length === 0) return 100;

    let totalWeight = 0;
    let shieldedWeight = 0;

    const weights = {
      'critical': 4,
      'high': 3,
      'medium': 2,
      'low': 1
    };

    doc.fields.forEach(field => {
      const weight = weights[field.piiLevel] || 1;
      totalWeight += weight;
      if (!allowedFieldIds.includes(field.id)) {
        shieldedWeight += weight;
      }
    });

    const score = Math.round((shieldedWeight / totalWeight) * 100);
    return Math.max(score, 60); // Base minimum protection
  },

  /**
   * Returns recommendation details based on selected purpose
   */
  getRecommendation(purposeId, docId) {
    const rule = this.purposeRules[purposeId];
    if (rule) {
      return rule;
    }
    // Default fallback
    return {
      recommendedAllowed: [],
      claimAr: 'تم تقليص البيانات للحد الأدنى المصرح به',
      claimEn: 'Data minimized to minimum authorized disclosure',
      rationalAr: 'تم حجب الحقول غير الضرورية للغرض المختار.',
      rationalEn: 'Non-essential fields were shielded for this purpose.'
    };
  }
};
