/**
 * Akked Realistic Sample Documents & OCR Data Structures
 * Provides simulated OCR extraction coordinates and rich graphic document templates
 */

window.AkkedSampleDocs = [
  {
    id: 'national_id',
    nameAr: 'الهوية الوطنية السعودية',
    nameEn: 'Saudi National ID Card',
    category: 'identity',
    type: 'ID_CARD',
    dimensions: { width: 640, height: 400 },
    fields: [
      { id: 'full_name', nameAr: 'الاسم الكامل', nameEn: 'Full Name', value: 'أثير فهد الرويلي', piiLevel: 'high', x: 280, y: 110, w: 220, h: 32 },
      { id: 'id_number', nameAr: 'رقم الهوية الوطنية', nameEn: 'National ID Number', value: '1098472918', piiLevel: 'critical', x: 280, y: 160, w: 180, h: 32 },
      { id: 'dob', nameAr: 'تاريخ الميلاد', nameEn: 'Date of Birth', value: '1418/07/15 هـ (1997/11/24 م)', piiLevel: 'high', x: 280, y: 210, w: 230, h: 32 },
      { id: 'age_calc', nameAr: 'حساب العمر الفعلي', nameEn: 'Calculated Age', value: '28 سنة (> 18 عاماً)', piiLevel: 'low', x: 280, y: 255, w: 160, h: 28, isDerived: true },
      { id: 'pob', nameAr: 'مكان الميلاد', nameEn: 'Place of Birth', value: 'الرياض', piiLevel: 'medium', x: 280, y: 295, w: 120, h: 28 },
      { id: 'photo', nameAr: 'الصورة الشخصية', nameEn: 'Portrait Photo', value: '[صورة شخصية]', piiLevel: 'critical', x: 40, y: 90, w: 160, h: 200, isImage: true },
      { id: 'barcode_qr', nameAr: 'الباركود والرمز الأمني', nameEn: 'Security 2D Barcode', value: '[تشفير حكومي]', piiLevel: 'high', x: 40, y: 310, w: 160, h: 50 }
    ],
    renderSVG(isRedacted = false, allowedFieldIds = ['age_calc'], watermarkText = '') {
      const isArabic = (window.I18N && window.I18N.currentLang === 'ar');
      
      let fieldsHtml = '';
      this.fields.forEach(f => {
        const isShielded = isRedacted && !allowedFieldIds.includes(f.id);
        
        if (f.isImage) {
          if (isShielded) {
            fieldsHtml += `
              <rect x="${f.x}" y="${f.y}" width="${f.w}" height="${f.h}" fill="#1E2238" rx="8" />
              <text x="${f.x + f.w/2}" y="${f.y + f.h/2}" fill="#50BE9B" font-size="13" font-weight="bold" text-anchor="middle" dominant-baseline="middle">محجوب للحماية</text>
            `;
          } else {
            fieldsHtml += `
              <rect x="${f.x}" y="${f.y}" width="${f.w}" height="${f.h}" fill="#E2E8F0" rx="8" stroke="#CBD5E1" stroke-width="2"/>
              <circle cx="${f.x + f.w/2}" cy="${f.y + 70}" r="40" fill="#94A3B8"/>
              <path d="M${f.x + 20} ${f.y + f.h - 10} Q ${f.x + f.w/2} ${f.y + 110} ${f.x + f.w - 20} ${f.y + f.h - 10}" fill="#94A3B8"/>
            `;
          }
        } else if (f.id === 'barcode_qr') {
          if (isShielded) {
            fieldsHtml += `<rect x="${f.x}" y="${f.y}" width="${f.w}" height="${f.h}" fill="#1E2238" rx="4" />`;
          } else {
            fieldsHtml += `
              <rect x="${f.x}" y="${f.y}" width="${f.w}" height="${f.h}" fill="#0F172A" rx="4" />
              <line x1="${f.x+10}" y1="${f.y+10}" x2="${f.x+f.w-10}" y2="${f.y+10}" stroke="#FFFFFF" stroke-dasharray="4,2" stroke-width="6"/>
              <line x1="${f.x+10}" y1="${f.y+25}" x2="${f.x+f.w-10}" y2="${f.y+25}" stroke="#FFFFFF" stroke-dasharray="6,3" stroke-width="6"/>
              <line x1="${f.x+10}" y1="${f.y+40}" x2="${f.x+f.w-10}" y2="${f.y+40}" stroke="#FFFFFF" stroke-dasharray="2,4" stroke-width="6"/>
            `;
          }
        } else {
          const label = isArabic ? f.nameAr : f.nameEn;
          if (isShielded) {
            fieldsHtml += `
              <text x="${f.x}" y="${f.y}" font-size="12" fill="#64748B" font-family="Tajawal, sans-serif">${label}:</text>
              <rect x="${f.x}" y="${f.y + 4}" width="${f.w}" height="22" fill="#1E2238" rx="4" />
              <text x="${f.x + 10}" y="${f.y + 19}" fill="#50BE9B" font-size="11" font-weight="bold" font-family="Tajawal, sans-serif">•••••••••••• (محمي)</text>
            `;
          } else {
            fieldsHtml += `
              <text x="${f.x}" y="${f.y}" font-size="12" fill="#475569" font-family="Tajawal, sans-serif">${label}:</text>
              <text x="${f.x}" y="${f.y + 20}" font-size="15" font-weight="bold" fill="#0F172A" font-family="Tajawal, sans-serif">${f.value}</text>
            `;
          }
        }
      });

      let watermarkSvg = '';
      if (watermarkText) {
        watermarkSvg = `
          <g transform="rotate(-25 320 200)" opacity="0.16">
            <text x="320" y="160" font-size="24" font-weight="900" fill="#5A1854" text-anchor="middle" font-family="Tajawal, sans-serif">${watermarkText}</text>
            <text x="320" y="210" font-size="16" font-weight="bold" fill="#5E6A91" text-anchor="middle" font-family="Tajawal, sans-serif">صادر عبر منصة أكد للخصوصية - مؤقت</text>
          </g>
        `;
      }

      return `
        <svg viewBox="0 0 640 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="background: linear-gradient(135deg, #F8FAFC 0%, #EDF2F7 100%); border-radius: 16px; border: 2px solid #CBD5E1; box-shadow: 0 8px 24px rgba(0,0,0,0.08);">
          <!-- ID Card Background Header -->
          <rect x="0" y="0" width="640" height="70" fill="#5A1854" />
          <circle cx="590" cy="35" r="22" fill="#50BE9B" opacity="0.3"/>
          <text x="320" y="32" font-size="18" font-weight="900" fill="#FFFFFF" text-anchor="middle" font-family="Tajawal, sans-serif">المملكة العربية السعودية - الهوية الوطنية</text>
          <text x="320" y="52" font-size="12" fill="#E7E8EF" text-anchor="middle" font-family="Outfit, sans-serif">KINGDOM OF SAUDI ARABIA - NATIONAL IDENTITY</text>
          
          <!-- Inner Decorative Security Patterns -->
          <path d="M 0 350 Q 320 300 640 350" fill="none" stroke="#50BE9B" stroke-width="2" opacity="0.4"/>
          <path d="M 0 370 Q 320 320 640 370" fill="none" stroke="#5A1854" stroke-width="1.5" opacity="0.2"/>

          <!-- Render All Fields -->
          ${fieldsHtml}
          
          <!-- Watermark Layer -->
          ${watermarkSvg}
        </svg>
      `;
    }
  },

  {
    id: 'salary_cert',
    nameAr: 'شهادة تعريف بالراتب',
    nameEn: 'Salary Certificate',
    category: 'financial',
    type: 'FINANCIAL_PROOF',
    dimensions: { width: 640, height: 420 },
    fields: [
      { id: 'employee_name', nameAr: 'اسم الموظف', nameEn: 'Employee Name', value: 'أثير فهد الرويلي', piiLevel: 'high', x: 260, y: 120, w: 220, h: 28 },
      { id: 'employer', nameAr: 'جهة العمل', nameEn: 'Employer', value: 'شركة التقنية المتقدمة المحدودة', piiLevel: 'medium', x: 260, y: 165, w: 260, h: 28 },
      { id: 'job_title', nameAr: 'المسمى الوظيفي', nameEn: 'Job Title', value: 'كبير مهندسي البرمجيات', piiLevel: 'medium', x: 260, y: 210, w: 200, h: 28 },
      { id: 'status_active', nameAr: 'حالة العمل', nameEn: 'Employment Status', value: 'على رأس العمل (نشط)', piiLevel: 'low', x: 260, y: 255, w: 180, h: 28 },
      { id: 'salary_range', nameAr: 'نطاق الراتب المؤهل', nameEn: 'Salary Threshold', value: 'يتجاوز 12,000 ريال شهرياً', piiLevel: 'low', x: 260, y: 300, w: 220, h: 28, isDerived: true },
      { id: 'exact_salary', nameAr: 'الراتب الأساسي والبدلات التفصيلية', nameEn: 'Exact Total Salary', value: '18,450.00 ريال سعودي', piiLevel: 'critical', x: 260, y: 345, w: 200, h: 28 },
      { id: 'iban', nameAr: 'رقم الحساب البنكي (IBAN)', nameEn: 'IBAN Number', value: 'SA44 8000 0412 6080 1012 3456', piiLevel: 'critical', x: 40, y: 345, w: 190, h: 28 }
    ],
    renderSVG(isRedacted = false, allowedFieldIds = ['status_active', 'salary_range'], watermarkText = '') {
      const isArabic = (window.I18N && window.I18N.currentLang === 'ar');
      let fieldsHtml = '';

      this.fields.forEach(f => {
        const isShielded = isRedacted && !allowedFieldIds.includes(f.id);
        const label = isArabic ? f.nameAr : f.nameEn;

        if (isShielded) {
          fieldsHtml += `
            <text x="${f.x}" y="${f.y}" font-size="11" fill="#64748B" font-family="Tajawal, sans-serif">${label}:</text>
            <rect x="${f.x}" y="${f.y + 4}" width="${f.w}" height="22" fill="#1E2238" rx="4" />
            <text x="${f.x + 8}" y="${f.y + 19}" fill="#50BE9B" font-size="11" font-weight="bold" font-family="Tajawal, sans-serif">غير مصرح بكشفه (محجوب)</text>
          `;
        } else {
          fieldsHtml += `
            <text x="${f.x}" y="${f.y}" font-size="11" fill="#475569" font-family="Tajawal, sans-serif">${label}:</text>
            <text x="${f.x}" y="${f.y + 19}" font-size="14" font-weight="bold" fill="#0F172A" font-family="Tajawal, sans-serif">${f.value}</text>
          `;
        }
      });

      let watermarkSvg = '';
      if (watermarkText) {
        watermarkSvg = `
          <g transform="rotate(-25 320 210)" opacity="0.16">
            <text x="320" y="190" font-size="24" font-weight="900" fill="#5A1854" text-anchor="middle" font-family="Tajawal, sans-serif">${watermarkText}</text>
            <text x="320" y="235" font-size="16" font-weight="bold" fill="#5E6A91" text-anchor="middle" font-family="Tajawal, sans-serif">للتحقق من الملاءمة المالية فقط</text>
          </g>
        `;
      }

      return `
        <svg viewBox="0 0 640 420" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="background: #FFFFFF; border-radius: 16px; border: 2px solid #E2E8F0; box-shadow: 0 8px 24px rgba(0,0,0,0.08);">
          <!-- Header -->
          <rect x="0" y="0" width="640" height="75" fill="#5E6A91" />
          <rect x="0" y="70" width="640" height="5" fill="#50BE9B" />
          <text x="320" y="38" font-size="18" font-weight="900" fill="#FFFFFF" text-anchor="middle" font-family="Tajawal, sans-serif">شهادة تعريف بالراتب والملاءمة المالية</text>
          <text x="320" y="58" font-size="12" fill="#E7E8EF" text-anchor="middle" font-family="Outfit, sans-serif">OFFICIAL SALARY CERTIFICATE</text>

          <!-- Company Stamp Simulation -->
          <circle cx="120" cy="200" r="55" fill="none" stroke="#5A1854" stroke-width="2" stroke-dasharray="6,4" opacity="0.4"/>
          <text x="120" y="195" font-size="11" font-weight="bold" fill="#5A1854" text-anchor="middle" opacity="0.6">إدارة الموارد البشرية</text>
          <text x="120" y="215" font-size="10" fill="#5A1854" text-anchor="middle" opacity="0.6">معتمد إلكترونياً</text>

          ${fieldsHtml}
          ${watermarkSvg}
        </svg>
      `;
    }
  },

  {
    id: 'warranty_receipt',
    nameAr: 'فاتورة شراء وضمان إلكتروني',
    nameEn: 'Invoice & Warranty',
    category: 'assets',
    type: 'PURCHASE_PROOF',
    dimensions: { width: 640, height: 380 },
    fields: [
      { id: 'item_name', nameAr: 'اسم الجهاز والموديل', nameEn: 'Device Model', value: 'MacBook Pro 16" M3 Max', piiLevel: 'low', x: 260, y: 110, w: 260, h: 28 },
      { id: 'serial_no', nameAr: 'الرقم التسلسلي للجهاز', nameEn: 'Serial Number', value: 'C02G89X2MD6R', piiLevel: 'low', x: 260, y: 155, w: 200, h: 28 },
      { id: 'warranty_status', nameAr: 'حالة وسريان الضمان', nameEn: 'Warranty Status', value: 'ساري حتى 2027/12/31 م', piiLevel: 'low', x: 260, y: 200, w: 220, h: 28 },
      { id: 'customer_name', nameAr: 'اسم العميل المشتري', nameEn: 'Customer Name', value: 'أثير فهد الرويلي', piiLevel: 'high', x: 260, y: 245, w: 200, h: 28 },
      { id: 'payment_card', nameAr: 'رقم البطاقة وتفاصيل الدفع', nameEn: 'Credit Card Details', value: 'بطاقة فيزا منتهية بـ (9421) - 14,899 ريال', piiLevel: 'critical', x: 260, y: 290, w: 260, h: 28 },
      { id: 'address', nameAr: 'عنوان التوصيل الشخصي', nameEn: 'Home Delivery Address', value: 'حي النرجس، شارع 45، الرياض', piiLevel: 'high', x: 260, y: 335, w: 240, h: 28 }
    ],
    renderSVG(isRedacted = false, allowedFieldIds = ['item_name', 'serial_no', 'warranty_status'], watermarkText = '') {
      const isArabic = (window.I18N && window.I18N.currentLang === 'ar');
      let fieldsHtml = '';

      this.fields.forEach(f => {
        const isShielded = isRedacted && !allowedFieldIds.includes(f.id);
        const label = isArabic ? f.nameAr : f.nameEn;

        if (isShielded) {
          fieldsHtml += `
            <text x="${f.x}" y="${f.y}" font-size="11" fill="#64748B" font-family="Tajawal, sans-serif">${label}:</text>
            <rect x="${f.x}" y="${f.y + 4}" width="${f.w}" height="22" fill="#1E2238" rx="4" />
            <text x="${f.x + 8}" y="${f.y + 19}" fill="#50BE9B" font-size="11" font-weight="bold" font-family="Tajawal, sans-serif">بيانات شخصية محجوبة</text>
          `;
        } else {
          fieldsHtml += `
            <text x="${f.x}" y="${f.y}" font-size="11" fill="#475569" font-family="Tajawal, sans-serif">${label}:</text>
            <text x="${f.x}" y="${f.y + 19}" font-size="14" font-weight="bold" fill="#0F172A" font-family="Tajawal, sans-serif">${f.value}</text>
          `;
        }
      });

      let watermarkSvg = '';
      if (watermarkText) {
        watermarkSvg = `
          <g transform="rotate(-25 320 190)" opacity="0.16">
            <text x="320" y="170" font-size="22" font-weight="900" fill="#5A1854" text-anchor="middle" font-family="Tajawal, sans-serif">${watermarkText}</text>
            <text x="320" y="210" font-size="15" font-weight="bold" fill="#5E6A91" text-anchor="middle" font-family="Tajawal, sans-serif">للتحقق من الضمان لدى مركز الصيانة</text>
          </g>
        `;
      }

      return `
        <svg viewBox="0 0 640 380" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="background: #FFFFFF; border-radius: 16px; border: 2px solid #E2E8F0; box-shadow: 0 8px 24px rgba(0,0,0,0.08);">
          <rect x="0" y="0" width="640" height="70" fill="#1E293B" />
          <text x="320" y="35" font-size="18" font-weight="900" fill="#50BE9B" text-anchor="middle" font-family="Tajawal, sans-serif">فاتورة شراء وبطاقة ضمان رسمي</text>
          <text x="320" y="55" font-size="11" fill="#94A3B8" text-anchor="middle" font-family="Outfit, sans-serif">PURCHASE INVOICE & OFFICIAL WARRANTY</text>

          <rect x="40" y="100" width="180" height="150" fill="#F8FAFC" rx="8" stroke="#CBD5E1"/>
          <rect x="95" y="125" width="70" height="42" rx="4" fill="none" stroke="#5E6A91" stroke-width="2.5"/>
          <line x1="85" y1="172" x2="175" y2="172" stroke="#5E6A91" stroke-width="3" stroke-linecap="round"/>
          <text x="130" y="194" font-size="12" font-weight="bold" fill="#475569" text-anchor="middle">جهاز إلكتروني معتمد</text>
          <text x="130" y="214" font-size="11" fill="#50BE9B" text-anchor="middle">ضمان سنتين ساري</text>

          ${fieldsHtml}
          ${watermarkSvg}
        </svg>
      `;
    }
  }
];
