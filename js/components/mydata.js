/**
 * Akked My Data Vault & Exposure Monitor Component
 */

window.AkkedMyData = {
  render() {
    const isAr = I18N.currentLang === 'ar';
    const categories = [
      {
        id: 'cat_identity',
        name: I18N.t('categoryIdentity'),
        icon: AkkedIcons.get('id-card', { size: 24 }),
        itemsAr: ['رقم الهوية الوطنية', 'الاسم الكامل', 'تاريخ الميلاد', 'الصورة الشخصية'],
        itemsEn: ['National ID Number', 'Full Name', 'Date of Birth', 'Personal Photo'],
        exposureLevel: 'safe',
        activeSharesCount: 1,
        descAr: 'تم حجب كافة التفاصيل وتوليد إثبات عمري مجرد فقط.',
        descEn: 'All raw PII masked; only abstract boolean age claim disclosed.'
      },
      {
        id: 'cat_financial',
        name: I18N.t('categoryFinancial'),
        icon: AkkedIcons.get('credit-card', { size: 24 }),
        itemsAr: ['رقم الآيبان البنكي', 'تفاصيل الراتب الدقيق', 'البطاقة الائتمانية'],
        itemsEn: ['Bank IBAN', 'Exact Salary Details', 'Credit Card'],
        exposureLevel: 'moderate',
        activeSharesCount: 1,
        descAr: 'مشارك بنطاق مالي عام لإثبات الملاءمة دون كشف تفاصيل الحساب.',
        descEn: 'Disclosed as eligibility threshold range without exposing IBAN.'
      },
      {
        id: 'cat_residency',
        name: I18N.t('categoryResidency'),
        icon: AkkedIcons.get('building', { size: 24 }),
        itemsAr: ['العنوان الوطني', 'عقد الإيجار السكني', 'رقم المبنى'],
        itemsEn: ['National Address', 'Residential Lease', 'Building Number'],
        exposureLevel: 'safe',
        activeSharesCount: 0,
        descAr: 'لا توجد أي مشاركات نشطة تكشف عنوان السكن حالياً.',
        descEn: 'Zero active shares exposing your residential address.'
      },
      {
        id: 'cat_assets',
        name: I18N.t('categoryAssets'),
        icon: AkkedIcons.get('file-check', { size: 24 }),
        itemsAr: ['الرقم التسلسلي للجهاز', 'فواتير الشراء والضمان'],
        itemsEn: ['Device Serial Number', 'Purchase Invoices & Warranty'],
        exposureLevel: 'safe',
        activeSharesCount: 0,
        descAr: 'المشاركة السابقة انتهت صلاحيتها ولم تعد قابلة للفحص.',
        descEn: 'Previous warranty share has expired.'
      }
    ];

    return `
      <div class="mydata-view animate-fade-in">
        <!-- Page Header -->
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; margin-bottom: 24px;">
          <div>
            <h1 style="font-size: 1.6rem; font-weight: 800; color: var(--text-main);">${I18N.t('myDataPageTitle')}</h1>
          </div>
        </div>

        <!-- Categories Exposure Grid -->
        <div class="grid-container grid-cols-2">
          ${categories.map(cat => `
            <div class="card" style="display: flex; flex-direction: column; justify-content: space-between; gap: 16px;">
              <div>
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
                  <div style="display: flex; align-items: center; gap: 10px;">
                    <span style="color: var(--brand-slate); display: flex; align-items: center;">${cat.icon}</span>
                    <span style="font-weight: 800; font-size: 1.05rem; color: var(--text-main);">${cat.name}</span>
                  </div>
                  <span class="badge ${cat.exposureLevel === 'safe' ? 'badge-active' : 'badge-warning'}">
                    ${cat.exposureLevel === 'safe' ? I18N.t('exposureSafe') : I18N.t('exposureModerate')}
                  </span>
                </div>

                <div style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.4; margin-bottom: 14px;">
                  ${isAr ? cat.descAr : cat.descEn}
                </div>

                <!-- Sub items chips -->
                <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                  ${(isAr ? cat.itemsAr : cat.itemsEn).map(it => `
                    <span style="background: var(--brand-surface-subtle); border: 1px solid var(--border-light); font-size: 0.76rem; padding: 4px 10px; border-radius: var(--radius-sm); color: var(--text-muted); display: inline-flex; align-items: center; gap: 6px;">
                      <picture style="display: inline-flex; line-height: 0;">
                        <source srcset="assets/eye-hidden-purple.webp" type="image/webp">
                        <img src="assets/eye-hidden-purple.png" 
                             alt="${isAr ? 'البيانات المخفية' : 'Hidden Data'}" 
                             title="${isAr ? 'البيانات المخفية' : 'Hidden Data'}" 
                             aria-label="${isAr ? 'البيانات المخفية' : 'Hidden Data'}" 
                             width="13" 
                             height="13" 
                             style="width: 13px; height: 13px; object-fit: contain;">
                      </picture>
                      <span>${it}</span>
                    </span>
                  `).join('')}
                </div>
              </div>

              <div style="border-top: 1px solid var(--border-light); padding-top: 12px; display: flex; align-items: center; justify-content: space-between; font-size: 0.8rem; color: var(--text-muted);">
                <span>${isAr ? 'المشاركات النشطة المرتبطة:' : 'Active Shares Linked:'} <strong>${cat.activeSharesCount}</strong></span>
                <span style="color: var(--status-active); font-weight: 700;">
                  <span>${isAr ? 'محمي ومحجوب' : 'Protected'}</span>
                </span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
};
