"use strict";

// Collection framework v1.

const select = (selector, root) => (root || document).querySelector(selector);
const selectAll = (selector, root) => Array.from((root || document).querySelectorAll(selector));

const STATUS_LABELS = {
  current: ["مطبق حالياً", "status-current"],
  progress: ["قيد التطوير", "status-progress"],
  proposed: ["مقترح", "status-proposed"],
  review: ["يحتاج إلى تأكيد", "status-review"],
  legal: ["يحتاج إلى اعتماد", "status-legal"]
};

function statusBadge(key) {
  const item = STATUS_LABELS[key] || STATUS_LABELS.review;
  return "<span class=\"status " + item[1] + "\">" + item[0] + "</span>";
}

const GOALS = [
  ["الوقاية", "رفع نسبة السداد في الموعد", "منع نشوء التأخر قبل أن يتحول إلى متابعة."],
  ["سهولة السداد", "خيارات واضحة ومترابطة", "تمكين جهة العمل من اختيار الطريقة المناسبة."],
  ["دقة المطابقة", "تحديث الفاتورة دون تدخل يدوي", "ربط كل دفعة بالفاتورة وجهة العمل فوراً."],
  ["المعالجة", "إجراء يناسب سبب الحالة", "الفصل بين الخطأ والاعتراض والصعوبة وعدم التجاوب."]
];

const PRINCIPLES = [
  ["التيسير أولاً", "توفير فاتورة واضحة وتنبيه مبكر وطريقة سداد سهلة قبل التصعيد."],
  ["صحة المبلغ", "عدم اتخاذ إجراء قبل التأكد من البيانات والمبلغ والمطابقة."],
  ["اختلاف المعالجة", "اختيار الإجراء بحسب سبب التأخر، وليس بحسب مدة التأخر وحدها."],
  ["استمرار الالتزام", "أي خطة سداد للمتأخرات يجب أن تحافظ على سداد الفاتورة الجارية."],
  ["قرار موثق", "تسجيل السبب والإجراء وصاحب الاعتماد والنتيجة في ملف جهة العمل."],
  ["قياس النتيجة", "قياس السداد والمطابقة واستمرار الخطط، وليس قيمة التحصيل فقط."]
];

const HEADLINE_METRICS = [
  ["53.8%", "فواتير القطاع الخاص", "سددت في الموعد."],
  ["10.1%", "فواتير القطاع الحكومي", "سددت في الموعد."],
  ["55.3%", "فواتير القطاع الحكومي", "شهدت سداداً جزئياً."],
  ["13.46%", "المبالغ الحكومية القائمة", "تجاوز عمرها 180 يوماً."]
];

const OUTCOMES = {
  private: {
    name: "القطاع الخاص",
    total: "501,167 فاتورة",
    values: [
      ["سداد في الموعد", 53.8, "269,807"],
      ["سداد متأخر خلال الشهر", 16.8, "84,000"],
      ["سداد في شهر لاحق", 0.02, "97"],
      ["سداد جزئي", 1.9, "9,454"],
      ["غير مسدد", 27.5, "137,809"]
    ]
  },
  government: {
    name: "القطاع الحكومي",
    total: "1,589 فاتورة",
    values: [
      ["سداد في الموعد", 10.1, "161"],
      ["سداد متأخر خلال الشهر", 9.3, "147"],
      ["سداد في شهر لاحق", 0.8, "13"],
      ["سداد جزئي", 55.3, "878"],
      ["غير مسدد", 24.5, "390"]
    ]
  }
};

const CURRENT_METHODS = [
  ["إشعار السداد الشهري", "current", "إظهار التفاصيل قبل الإصدار وإتاحة التصحيح المبكر."],
  ["التحويل البنكي", "current", "الإبقاء عليه مع استخدام مرجع موحد يحدد جهة العمل والفواتير المسددة."],
  ["تقسيط المبالغ المستحقة", "current", "توحيد الشروط وربطه بسداد الفاتورة الجارية."],
  ["الإعفاء من بعض المبالغ", "current", "تحديد السند والشروط والصلاحية وعدم التكرار."],
  ["تأجيل إصدار الفاتورة", "current", "مراجعة الأساس القانوني واستبداله عند الحاجة بتأجيل السداد أو الإجراء."],
  ["الحظر الآلي بعد شهرين", "current", "استبدال التطبيق الموحد بمسار متدرج بعد اعتماد ضوابطه."],
  ["الخصم المباشر مع بنك مسقط", "progress", "تصميم التجربة من البداية بما يسمح بالتوسع إلى بنوك أخرى."],
  ["بوابة الدفع الخاصة بالصندوق", "proposed", "تسريع تطويرها وربطها بالمطابقة والسداد المتعدد."]
];

const IMPROVEMENTS = [
  ["فاتورة صحيحة من البداية", "إتاحة مراجعة العمال والأجور قبل تثبيت المبلغ."],
  ["مطابقة فورية", "منع بقاء دفعة معلقة بسبب مرجع ناقص أو غير صحيح."],
  ["سداد أسهل", "بوابة موحدة وخصم مباشر ورمز دفع وتحويل مرجعي."],
  ["معالجة السداد الجزئي", "تحديد سبب الفرق ووضع طريقة واضحة لتخصيص المبلغ."],
  ["تسوية الجهات الحكومية", "استخدام المقاصة عند اعتمادها بدلاً من تراكم المتأخرات."],
  ["تصعيد متناسب", "ربط الإجراء بسبب الحالة وثبات المبلغ والتجاوب السابق."]
];

const REQUIRED_JOURNEY = [
  ["تأكيد البيانات", "مراجعة العمال والأجور والفترات."],
  ["إصدار الفاتورة", "تثبيت المبلغ ورقم الفاتورة."],
  ["إشعار جهة العمل", "عرض القيمة والموعد وطرق السداد."],
  ["تنفيذ السداد", "اختيار القناة المناسبة ودفع المبلغ."],
  ["المطابقة والإغلاق", "تحديث الفاتورة وإرسال النتيجة."]
];

const OPTIONAL_JOURNEY = [
  ["تصحيح البيانات", "عند وجود عامل أو أجر أو فترة غير صحيحة."],
  ["تصحيح المطابقة", "عند وصول دفعة دون ارتباط واضح بالفاتورة."],
  ["خطة سداد", "عند وجود صعوبة مؤقتة وقدرة مثبتة على الالتزام."],
  ["اعتراض أو تظلم", "عند وجود خلاف موثق على جزء من المبلغ."],
  ["مقاصة أو تصعيد", "عند توفر مستحقات حكومية أو استمرار عدم التجاوب."]
];

const CASE_ROUTES = [
  ["01", "خطأ في الفاتورة", "بيانات عامل أو أجر أو فترة غير صحيحة.", "المسار: تصحيح البيانات وإعادة الاحتساب."],
  ["02", "دفعة غير مطابقة", "تم السداد ولم يظهر أثره على الفاتورة.", "المسار: المطابقة والتحقق من المرجع."],
  ["03", "صعوبة مالية مؤقتة", "توجد قدرة مستقبلية وتجاوب واضح.", "المسار: تقييم خطة سداد مناسبة."],
  ["04", "سداد جزئي متكرر", "يبقى جزء من الفاتورة مفتوحاً كل شهر.", "المسار: تحليل سبب الفرق وجدول تسوية."],
  ["05", "اعتراض موثق", "الخلاف على جزء محدد من المبلغ.", "المسار: فصل الجزء المعترض عليه ومراجعته."],
  ["06", "عدم تجاوب", "استمرار عدم السداد بعد الإشعار وإتاحة الخيارات.", "المسار: الإنذار ثم التصعيد المعتمد."]
];

const TARGET_METHODS = [
  ["DD", "الخصم المباشر", "خصم قيمة إشعار السداد أو القسط بعد إشعار مسبق.", "progress"],
  ["QR", "رمز دفع سريع", "يحمل رقم الفاتورة والمبلغ لتقليل أخطاء الإدخال.", "proposed"],
  ["MB", "سداد عدة فواتير", "اختيار مجموعة فواتير وتسديدها في عملية واحدة.", "proposed"],
  ["BT", "تحويل بنكي مرجعي", "استمرار التحويل مع مرجع موحد ومطابقة آلية.", "current"],
  ["SP", "بوابة الصندوق", "واجهة واحدة للفواتير والدفع والإيصالات والمتابعة.", "proposed"]
];

const DIRECT_DEBIT_FLOW = [
  ["اختيار الاستخدام", "فاتورة شهرية أو خطة سداد."],
  ["إنشاء التفويض", "تحديد الحساب والسقف والتاريخ."],
  ["اعتماد البنك", "مصادقة آمنة وإرجاع حالة التفويض."],
  ["إشعار مسبق", "إبلاغ جهة العمل بالمبلغ والموعد."],
  ["الخصم والمطابقة", "تنفيذ العملية وتحديث الفاتورة."],
  ["معالجة الفشل", "إشعار وإعادة محاولة ثم قناة بديلة."]
];

const BENCHMARKS = [
  {
    country: "السعودية",
    title: "مفوتر مركزي برقم سداد",
    detail: "ربط المبلغ بالجهة والفاتورة من خلال نظام سداد، مع إثبات مصرفي واضح.",
    use: "الفائدة للصندوق: مرجع موحد ومطابقة مباشرة.",
    source: "https://www.gosi.gov.sa/GOSIOnline/FAQ_Employer?locale=en_US"
  },
  {
    country: "الإمارات",
    title: "رفع الفواتير والتحويل في منصة واحدة",
    detail: "إتاحة معرفة المبلغ ورفع الفاتورة والتحويل الإلكتروني عبر منصة معاشي.",
    use: "الفائدة للصندوق: دمج بيانات الاشتراك مع الدفع.",
    source: "https://gpssa.gov.ae/pages/en/media-center/news/gpssa-explains-mechanism-pay-employer-contributions"
  },
  {
    country: "البحرين",
    title: "سقف وتاريخ يحددهما صاحب العمل",
    detail: "يستطيع صاحب العمل تحديد سقف الخصم وتاريخ التنفيذ ضمن فترة الفاتورة.",
    use: "الفائدة للصندوق: تفويض مرن يقلل رفض العمليات.",
    source: "https://www.sio.gov.bh/en/direct-debit-installment"
  },
  {
    country: "الإمارات – الجهات الاتحادية",
    title: "ربط الاشتراكات الشهرية بدورة الرواتب الحكومية",
    detail: "تحتسب حصة الموظف ضمن معالجة الراتب، وتثبت حصتا الموظف والجهة كالتزام مالي، ثم تحول الاشتراكات إلى هيئة المعاشات ضمن الموعد المحدد.",
    use: "الفائدة للصندوق: دراسة احتساب مستحقات موظفي الجهات الحكومية مع الرواتب وتسويتها مالياً بالتنسيق مع وزارة المالية، بدلاً من متابعة كل جهة بصورة منفصلة.",
    source: "https://mof.gov.ae/wp-content/uploads/2024/05/%D8%A7%D9%84%D8%AF%D9%84%D9%8A%D9%84-%D8%A7%D9%84%D8%AA%D8%B4%D8%BA%D9%8A%D9%84%D9%8A-%D9%84%D9%84%D8%A7%D8%AC%D8%B1%D8%A7%D8%A1%D8%A7%D8%AA-%D8%A7%D9%84%D9%85%D8%A7%D9%84%D9%8A%D8%A9-%D9%81%D9%8A-%D8%A7%D9%84%D8%AD%D9%83%D9%88%D9%85%D8%A9-%D8%A7%D9%84%D8%A7%D8%AA%D8%AD%D8%A7%D8%AF%D9%8A%D8%A9-%D8%A7%D9%84%D9%86%D9%87%D8%A7%D9%8A%D9%94%D9%8A-2024.pdf"
  },
  {
    country: "سنغافورة",
    title: "رمز دفع وتكامل مع الرواتب",
    detail: "رمز دفع يحمل بيانات العملية، وتحديث سريع للحالة، وإرسال من نظام الرواتب.",
    use: "الفائدة للصندوق: تقليل الإدخال اليدوي وتسريع المطابقة.",
    source: "https://www.cpf.gov.sg/employer/making-cpf-contributions/submitting-cpf-contributions-via-cpf-ezpay"
  },
  {
    country: "المملكة المتحدة",
    title: "خصم متغير وخطة سداد ذاتية",
    detail: "يتغير مبلغ الخصم حسب الإقرار، مع إشعار مسبق وإتاحة خطة دفع للمؤهلين.",
    use: "الفائدة للصندوق: خصم مرتبط بالمبلغ الفعلي ومعالجة مبكرة للصعوبة.",
    source: "https://www.gov.uk/pay-paye-tax/direct-debit"
  }
];

const FINANCIAL_TREATMENTS = [
  ["تقسيط المبالغ المستحقة", "توزيع المبلغ على دفعات مع استمرار الفاتورة الجارية.", "current", "توحيد الأهلية والمدة والاعتماد."],
  ["خطة تقترحها جهة العمل", "تحدد الجهة الدفعة الأولى والأقساط والتواريخ التي تناسب تدفقاتها.", "proposed", "تخضع للفحص الداخلي والاعتماد ولا تنفذ تلقائياً."],
  ["إعادة جدولة الخطة", "تعديل خطة قائمة عند حدوث تغير جوهري بعد التزام فعلي.", "proposed", "مرة محدودة وبسبب جديد مثبت."],
  ["خطة قصيرة للمبالغ المحدودة", "مسار مبسط للمبلغ الصغير والجهة ذات السجل المنتظم.", "proposed", "حد مالي ومدة قصيرة يحددان بالسياسة."],
  ["دمج عدة فواتير في خطة واحدة", "جمع الفواتير القائمة في جدول واضح بدلاً من خطط متفرقة.", "proposed", "تحديد ترتيب تخصيص كل دفعة."],
  ["خطة موسمية", "مواءمة الأقساط مع تدفقات نشاط موسمي مثبت.", "proposed", "إثبات النمط وعدم تأجيل الفاتورة الجارية."],
  ["تأجيل السداد في الحالات المحددة", "إيقاف المطالبة مؤقتاً على الجزء المرتبط باعتراض مقبول.", "legal", "التقيد بالحالات والمدد التي يسمح بها السند."],
  ["الإعفاء من مبالغ إضافية", "معالجة استثنائية ضمن أسباب وشروط وصلاحية معتمدة.", "legal", "لا يطبق كإعفاء عام أو متكرر."],
  ["استخدام الرصيد الزائد", "تسوية مبلغ زائد مؤكد مع فاتورة أخرى بموافقة واضحة.", "proposed", "مطابقة وأثر محاسبي قابل للتدقيق."]
];

const CUSTOM_PLAN_WORKFLOW = [
  {
    title: "اقتراح جهة العمل",
    summary: "تنشئ الجهة طلباً من حسابها في النظام.",
    items: ["اختيار الفواتير والمبلغ المشمول", "تحديد الدفعة الأولى وقيمة الأقساط وتواريخها", "إرفاق سبب الطلب والبيانات المؤيدة"]
  },
  {
    title: "الدراسة الداخلية",
    summary: "يفحص النظام الطلب ثم يراجعه المختص.",
    items: ["التحقق من المبلغ والسجل والخطط القائمة", "تقييم القدرة على سداد الخطة والفاتورة الجارية", "طلب معلومات إضافية أو رأي مالي وقانوني عند الحاجة"]
  },
  {
    title: "القرار والمتابعة",
    summary: "يصدر قرار واضح وتبدأ المتابعة بعد موافقة الجهة.",
    items: ["قبول الخطة أو تعديلها أو رفضها مع السبب", "اعتماد الجدول إلكترونياً من الطرفين", "متابعة الأقساط ومعالجة التعثر وفق الضوابط"]
  }
];

const RESTRICTION_STEPS = [
  {
    title: "الوقاية",
    period: "قبل الاستحقاق",
    action: "معاينة البيانات والفاتورة، ثم التذكير وإتاحة طرق السداد.",
    scope: "لا يوجد حظر.",
    reference: "إجراء تشغيلي يقترح اعتماده ضمن سياسة التحصيل."
  },
  {
    title: "المتابعة المبكرة",
    period: "من 1 إلى 30 يوماً",
    action: "إشعار رقمي، والتحقق من سبب التأخر، وتصحيح المطابقة عند الحاجة.",
    scope: "لا يوجد حظر.",
    reference: "إجراء تشغيلي داخلي."
  },
  {
    title: "الإنذار الرسمي",
    period: "من 31 إلى 60 يوماً",
    action: "تثبيت المبلغ وإرسال إنذار يوضح المهلة والخطوة التالية.",
    scope: "لا يوجد حظر قبل انتهاء المهلة.",
    reference: "صيغة الإنذار ومدته تحتاجان إلى اعتماد."
  },
  {
    title: "المستوى الأول",
    period: "من 61 إلى 90 يوماً",
    action: "طلب إيقاف تعامل محدد بعد التحقق من الشروط والتجاوب والاعتراضات.",
    scope: "نطاق محدود يحدد في الدليل المعتمد.",
    reference: "المادة 116 تدعم مبدأ طلب إيقاف التعامل، ولا تحدد هذا المستوى أو مدته."
  },
  {
    title: "المستوى الثاني",
    period: "من 91 إلى 180 يوماً",
    action: "توسيع الإجراء بعد مراجعة الحالة واعتماد صاحب الصلاحية.",
    scope: "نطاق أوسع يحدد بالسياسة والاتفاقات.",
    reference: "يحتاج إلى سياسة معتمدة وتكامل مع الجهات المعنية."
  },
  {
    title: "التنفيذ القانوني",
    period: "أكثر من 180 يوماً",
    action: "إحالة الملف المكتمل إلى المسار القانوني المختص.",
    scope: "وفق الإجراء والقرار القانوني المختص.",
    reference: "المادة 9 تقرر أولوية دين الصندوق، ولا تنشئ وحدها إجراء حجز مباشر."
  }
];

const SETOFF_WORKFLOW = [
  {
    title: "التحقق من المبالغ",
    summary: "تحديد طرفي المقاصة وقيمتها قبل بدء الإجراء.",
    items: ["رصد مستحق مؤكد لجهة العمل لدى الحكومة", "تثبيت دين الصندوق والمبلغ القابل للمقاصة", "استبعاد أي مبلغ غير مطابق أو محل اعتراض قائم"]
  },
  {
    title: "الإشعار والاعتماد",
    summary: "لا تنفذ المقاصة قبل استكمال الموافقات اللازمة.",
    items: ["إشعار جهة العمل بالمبلغ ومصدره", "إتاحة الاعتراض خلال المدة المعتمدة", "استكمال الرأي القانوني والموافقات المالية"]
  },
  {
    title: "التنفيذ والتسوية",
    summary: "تنفذ الجهات المعنية العملية ويغلق أثرها مالياً.",
    items: ["إرسال أمر المقاصة إلى الجهة الحكومية المختصة", "قيد المبلغ وتخصيصه على الفواتير", "إبلاغ جهة العمل وتحديث الرصيد وإغلاق الحالة"]
  }
];

const APPEAL_WORKFLOW = [
  {
    title: "استلام الاعتراض",
    summary: "تقدم جهة العمل طلباً مرتبطاً بفاتورة ومبلغ محددين.",
    items: ["اختيار الفاتورة والفترة وسبب الاعتراض", "رفع المستندات وإرسال الطلب", "فحص الاكتمال وإعادة الناقص للاستكمال"]
  },
  {
    title: "دراسة الاعتراض",
    summary: "تراجع الحالة دون تعطيل الجزء غير المعترض عليه.",
    items: ["فصل المبلغ المعترض عليه عن الواجب سداده", "مراجعة البيانات والمدفوعات وطريقة الاحتساب", "طلب رأي مختص أو معلومات إضافية عند الحاجة"]
  },
  {
    title: "القرار والتظلم",
    summary: "تبلغ جهة العمل بنتيجة واضحة وقابلة للمراجعة.",
    items: ["إصدار قرار مسبب بقبول الاعتراض أو رفضه", "إبلاغ جهة العمل بالنتيجة والأثر المالي", "إتاحة التظلم لدى المستوى الأعلى خلال المدة المعتمدة"]
  },
  {
    title: "التنفيذ والإغلاق",
    summary: "تنعكس النتيجة على الفاتورة ومسار التحصيل.",
    items: ["تعديل الفاتورة أو تثبيت المبلغ المستحق", "استئناف التحصيل أو إعادة أي إجراء مرتبط", "توثيق القرار والنتيجة وإغلاق الطلب"]
  }
];

const ROLES = [
  ["دائرة الاشتراكات", "ملكية سياسة التحصيل والحالات ومتابعة نتائج السداد.", "عدم جمع إنشاء الاستثناء واعتماده للشخص نفسه."],
  ["المطابقة المالية", "ربط المدفوعات بالفواتير ومعالجة المبالغ المعلقة والزائدة.", "مطابقة يومية وسجل واضح لكل تعديل."],
  ["الدائرة المالية", "التسوية البنكية والاسترداد والمقاصة المالية.", "فصل الإنشاء والمراجعة والاعتماد."],
  ["الشؤون القانونية", "مراجعة السند وصيغ الإنذار والحظر والمقاصة والتنفيذ.", "عدم بدء إجراء يحتاج سنداً قبل اعتماده."],
  ["تقنية المعلومات", "البوابة والتكاملات والتفويض والمطابقة وسجل الاستخدام.", "صلاحيات محددة وحماية البيانات واستمرارية الخدمة."],
  ["خدمة المتعاملين", "الإرشاد واستلام الملاحظات ومتابعة الاعتراض والتظلم.", "رسالة موحدة ومدة خدمة معلنة بعد اعتمادها."]
];

const KPIS = [
  ["السداد في الموعد", "نسبة الفواتير المكتملة قبل تاريخ الاستحقاق."],
  ["نجاح الدفع من أول محاولة", "نسبة العمليات الناجحة دون إعادة أو تدخل."],
  ["نجاح إعادة الخصم", "نسبة العمليات التي نجحت بعد محاولة لاحقة."],
  ["المطابقة الآلية", "نسبة الدفعات التي ارتبطت بالفاتورة فوراً."],
  ["زمن انعكاس السداد", "المدة من نجاح العملية إلى تحديث حالة الفاتورة."],
  ["استمرار خطط السداد", "نسبة الخطط المنتظمة مع سداد الفاتورة الجارية."],
  ["زمن معالجة الاعتراض", "المدة من اكتمال الطلب إلى القرار المسبب."],
  ["زمن رفع الحظر", "المدة من تحقق سبب الرفع إلى تحديث الجهات."]
];

const WAVES = [
  {
    number: "الموجة الأولى",
    title: "الفاتورة والدفع والمطابقة",
    items: ["مراجعة البيانات قبل الفاتورة", "تطوير بوابة الدفع والسداد المتعدد", "مرجع موحد للتحويل", "تجربة الخصم المباشر"]
  },
  {
    number: "الموجة الثانية",
    title: "المعالجات وإدارة الحالات",
    items: ["ملف موحد لجهة العمل", "رقمنة خطط السداد", "مسار الاعتراض والتظلم", "تفعيل مؤشرات الأداء"]
  },
  {
    number: "الموجة الثالثة",
    title: "التكامل والتصعيد",
    items: ["التوسع إلى عدة بنوك", "المقاصة الحكومية بعد اعتمادها", "التدرج في الحظر", "الربط مع الجهات المعنية"]
  }
];

const LAW_URL = "https://mjla.gov.om/laws/ar/1/show/198";
const REGULATION_URL = "https://www.mjla.gov.om/decisions/ar/1159/show/1830";

const LEGAL_ITEMS = [
  ["موعد سداد الاشتراكات", "المادة 58 من القانون", LAW_URL, "direct", "تحدد السداد خلال أول خمسة عشر يوماً من الشهر التالي.", "تطبيق الموعد كما ورد في القانون."],
  ["المبلغ الإضافي عند التأخر", "المادة 155 من القانون", LAW_URL, "direct", "تقرر مبلغاً إضافياً بنسبة 5.5% سنوياً يحسب تراكمياً.", "استخدام الوصف القانوني وعدم تسميته غرامة فقط."],
  ["التحويل وطرق السداد", "المادة 32 من اللائحة", REGULATION_URL, "direct", "تجيز التحويل المباشر وأي وسيلة أخرى يحددها الصندوق.", "اعتماد الوسائل وضوابط المطابقة من الصندوق."],
  ["الخصم المباشر ورمز الدفع", "المادة 32 من اللائحة", REGULATION_URL, "partial", "تسمح للصندوق بتحديد وسائل أخرى، لكنها لا تنظم تفاصيل التفويض.", "اعتماد الإطار المصرفي والتقني والعقدي."],
  ["الاعتراض على أجر الاشتراك", "المادة 34 من اللائحة", REGULATION_URL, "direct", "تسمح بالاعتراض خلال تسعين يوماً من تسجيل الأجر.", "ربط المسار بهذا النوع من الاعتراض فقط."],
  ["تأجيل السداد", "المادة 35 من اللائحة", REGULATION_URL, "direct", "تسمح بالتأجيل حتى تسعين يوماً في حالتين محددتين.", "عدم توسيع الحالات دون سند أو تعديل معتمد."],
  ["خطط السداد التي تقترحها جهة العمل وإعادة الجدولة", "لا يوجد نص مباشر في المواد التي تمت مراجعتها", REGULATION_URL, "none", "إتاحة تقديم الطلب لا تعني قبوله، والممارسة التشغيلية وحدها لا تكفي لتحديد الشروط والصلاحيات.", "تأكيد السند والسياسة ومعايير التقييم ومصفوفة الاعتماد."],
  ["الإعفاء من المبالغ الإضافية", "المادة 155 من القانون", LAW_URL, "partial", "تستثني الأسباب القهرية وفق ضوابط يضعها المجلس، ولا تقرر إعفاءً عاماً.", "تحديد الحالات والضوابط وصاحب الصلاحية."],
  ["إيقاف التعامل مع جهة العمل", "المادة 116 من اللائحة", REGULATION_URL, "partial", "تدعم طلب إيقاف التعامل في حالات محددة، ولا تحدد مستويات الحظر ومددها.", "اعتماد الدليل والمدد والجهات والتكاملات."],
  ["تجديد رخص العاملين لحسابهم الخاص", "المادة 50 من القانون", LAW_URL, "direct", "تنطبق على العاملين لحسابهم الخاص ومن في حكمهم.", "عدم استخدامها سنداً عاماً لحظر خدمات جميع جهات العمل."],
  ["المقاصة المالية الحكومية", "المادة 9 من القانون", LAW_URL, "partial", "تقرر أولوية دين الصندوق، ولا تنشئ وحدها مسار مقاصة تلقائياً.", "رأي قانوني واتفاق مع وزارة المالية والجهات المعنية."],
  ["مسار الاعتراض والتظلم العام", "لا يوجد مسار عام مباشر في المواد التي تمت مراجعتها", REGULATION_URL, "none", "توجد اعتراضات محددة، لكن المراحل العامة المقترحة تحتاج تنظيماً.", "اعتماد اختصاصات الجهات والمدد وأثر الاعتراض."]
];

const RATES = [
  ["كبار السن والعجز والوفاة", "7.5%", "—", "للعمانيين"],
  ["الجزء العام من الاشتراك", "11%", "—", "يحتاج مسمى الفرع إلى تأكيد"],
  ["إصابات العمل والأمراض المهنية", "1%", "1%", "لجميع العاملين"],
  ["الأمان الوظيفي", "1%", "—", "للعمانيين"],
  ["إجازة الأمومة", "1%", "1%", "لجميع العاملين"],
  ["الإجازات المرضية وغير الاعتيادية", "1%", "1%", "لجميع العاملين"],
  ["الادخار الإلزامي", "—", "9%", "من الأجر الأساسي لغير العمانيين"],
  ["الإجمالي الشهري المعروض", "22.5%", "11%", "يؤكد قبل الاعتماد"]
];

const RISKS = [
  ["حظر بسبب مبلغ غير ثابت", "اشتراط اكتمال المطابقة وفصل الجزء المعترض عليه قبل التصعيد."],
  ["فشل الخصم أو خصم مبلغ غير صحيح", "إشعار مسبق وسقف واضح وأكواد نتائج ومسار استرداد سريع."],
  ["دفعات معلقة دون مطابقة", "مرجع موحد ومطابقة يومية وقائمة استثناءات لها مالك ومدة."],
  ["خطط سداد غير قابلة للاستمرار", "تقييم القدرة واشتراط الفاتورة الجارية ومراجعة الالتزام."],
  ["تفاوت القرارات", "قواعد أهلية ومصفوفة صلاحيات وسجل لجميع القرارات السابقة."],
  ["تأخر رفع الحظر", "ربط سبب الرفع بالجهات آلياً ومراقبة زمن انعكاس التحديث."],
  ["تسرب البيانات المالية", "تقليل البيانات والصلاحيات والتشفير وسجل استخدام كامل."],
  ["تعطل قناة دفع واحدة", "قنوات بديلة وخطة استمرارية وتوسع تدريجي إلى عدة بنوك."]
];

function renderCards() {
  select("#goalCards").innerHTML = GOALS.map(function (item) {
    return "<article class=\"goal-card\"><span>" + item[0] + "</span><strong>" + item[1] + "</strong><p>" + item[2] + "</p></article>";
  }).join("");

  select("#principles").innerHTML = PRINCIPLES.map(function (item, index) {
    return "<article class=\"principle-card\"><span class=\"card-number\">" + (index + 1) + "</span><h4>" + item[0] + "</h4><p>" + item[1] + "</p></article>";
  }).join("");

  select("#headlineMetrics").innerHTML = HEADLINE_METRICS.map(function (item) {
    return "<article class=\"metric-card\"><span>" + item[1] + "</span><strong>" + item[0] + "</strong><p>" + item[2] + "</p></article>";
  }).join("");

  select("#improvementCards").innerHTML = IMPROVEMENTS.map(function (item) {
    return "<article class=\"plain-card\"><h4>" + item[0] + "</h4><p>" + item[1] + "</p></article>";
  }).join("");
}

function renderCurrentMethods() {
  select("#currentMethods").innerHTML = CURRENT_METHODS.map(function (item) {
    return "<tr><th scope=\"row\">" + item[0] + "</th><td>" + statusBadge(item[1]) + "</td><td>" + item[2] + "</td></tr>";
  }).join("");
}

function renderOutcome(sector) {
  const data = OUTCOMES[sector];
  const totalWidth = data.values.reduce(function (sum, item) { return sum + item[1]; }, 0);
  const segments = data.values.map(function (item) {
    const width = item[1] / totalWidth * 100;
    const label = item[1] >= 7 ? item[1] + "%" : "";
    return "<div class=\"outcome-segment\" style=\"width:" + width + "%\" title=\"" + item[0] + ": " + item[1] + "%، " + item[2] + " فاتورة\">" + label + "</div>";
  }).join("");
  const legend = data.values.map(function (item) {
    return "<span>" + item[0] + "<b>" + item[1] + "% · " + item[2] + "</b></span>";
  }).join("");
  select("#outcomeChart").innerHTML =
    "<div class=\"outcome-summary\"><strong>" + data.name + "</strong><span>" + data.total + "</span></div>" +
    "<div class=\"outcome-bar\" role=\"img\" aria-label=\"توزيع نتائج السداد في " + data.name + "\">" + segments + "</div>" +
    "<div class=\"outcome-legend\">" + legend + "</div>";
}

function renderJourney() {
  select("#requiredJourney").innerHTML = REQUIRED_JOURNEY.map(function (item, index) {
    return processStep(item, index);
  }).join("");

  select("#optionalJourney").innerHTML = OPTIONAL_JOURNEY.map(function (item) {
    return "<article class=\"optional-card\"><h4>" + item[0] + "</h4><p>" + item[1] + "</p></article>";
  }).join("");

  select("#caseRoutes").innerHTML = CASE_ROUTES.map(function (item) {
    return "<article class=\"case-card\"><span class=\"case-icon\">" + item[0] + "</span><div><h4>" + item[1] + "</h4><p>" + item[2] + "</p><span class=\"route\">" + item[3] + "</span></div></article>";
  }).join("");
}

function processStep(item, index) {
  return "<article class=\"process-step\"><span class=\"step-number\">" + (index + 1) + "</span><h4>" + item[0] + "</h4><p>" + item[1] + "</p></article>";
}

function workflowPhase(item, index) {
  const steps = item.items.map(function (step) {
    return "<li>" + step + "</li>";
  }).join("");
  return "<article class=\"workflow-phase\"><div class=\"workflow-heading\"><span>" + (index + 1) + "</span><h4>" + item.title + "</h4></div><p>" + item.summary + "</p><ul>" + steps + "</ul></article>";
}

function renderMethods() {
  select("#targetMethods").innerHTML = TARGET_METHODS.map(function (item) {
    return "<article class=\"method-card\"><span class=\"method-icon\">" + item[0] + "</span><h4>" + item[1] + "</h4><p>" + item[2] + "</p>" + statusBadge(item[3]) + "</article>";
  }).join("");

  select("#directDebitFlow").innerHTML = DIRECT_DEBIT_FLOW.map(function (item, index) {
    return processStep(item, index);
  }).join("");

  select("#benchmarks").innerHTML = BENCHMARKS.map(function (item) {
    return "<article class=\"benchmark-card\"><span class=\"country\">" + item.country + "</span><h4>" + item.title + "</h4><p>" + item.detail + "</p><p><strong>" + item.use + "</strong></p><a href=\"" + item.source + "\" target=\"_blank\" rel=\"noopener noreferrer\">المصدر الرسمي</a></article>";
  }).join("");
}

function renderTreatments() {
  select("#financialTreatments").innerHTML = FINANCIAL_TREATMENTS.map(function (item) {
    return "<article class=\"treatment-card\"><div class=\"card-top\"><h4>" + item[0] + "</h4>" + statusBadge(item[2]) + "</div><p>" + item[1] + "</p><span class=\"condition\">" + item[3] + "</span></article>";
  }).join("");

  select("#customPlanWorkflow").innerHTML = CUSTOM_PLAN_WORKFLOW.map(function (item, index) {
    return workflowPhase(item, index);
  }).join("");

  select("#restrictionLadder").innerHTML = RESTRICTION_STEPS.map(function (item, index) {
    return "<button class=\"restriction-step\" type=\"button\" data-restriction=\"" + index + "\" aria-pressed=\"" + (index === 0) + "\"><strong>" + item.title + "</strong><span>" + item.period + "</span></button>";
  }).join("");

  select("#setoffWorkflow").innerHTML = SETOFF_WORKFLOW.map(function (item, index) {
    return workflowPhase(item, index);
  }).join("");

  select("#appealWorkflow").innerHTML = APPEAL_WORKFLOW.map(function (item, index) {
    return workflowPhase(item, index);
  }).join("");

  showRestriction(0);
}

function showRestriction(index) {
  const item = RESTRICTION_STEPS[index];
  select("#restrictionDetail").innerHTML =
    "<h4>" + item.title + "</h4><dl>" +
    "<dt>الإجراء المقترح</dt><dd>" + item.action + "</dd>" +
    "<dt>نطاق الحظر</dt><dd>" + item.scope + "</dd>" +
    "<dt>الارتباط القانوني</dt><dd>" + item.reference + "</dd>" +
    "</dl>";
}

function renderGovernance() {
  select("#rolesTable").innerHTML = ROLES.map(function (item) {
    return "<tr><th scope=\"row\">" + item[0] + "</th><td>" + item[1] + "</td><td>" + item[2] + "</td></tr>";
  }).join("");

  select("#kpis").innerHTML = KPIS.map(function (item) {
    return "<article class=\"kpi-card\"><strong>" + item[0] + "</strong><span class=\"measure\">" + item[1] + "</span></article>";
  }).join("");

  select("#implementationWaves").innerHTML = WAVES.map(function (item) {
    const list = item.items.map(function (entry) { return "<li>" + entry + "</li>"; }).join("");
    return "<article class=\"wave-card\"><span class=\"wave-number\">" + item.number + "</span><h4>" + item.title + "</h4><ul>" + list + "</ul></article>";
  }).join("");
}

function legalSupport(type) {
  if (type === "direct") {
    return "<span class=\"legal-support legal-direct\">دعم مباشر</span>";
  }
  if (type === "partial") {
    return "<span class=\"legal-support legal-partial\">دعم جزئي</span>";
  }
  return "<span class=\"legal-support legal-none\">لا يوجد سند مباشر</span>";
}

function renderAppendices() {
  select("#legalTable").innerHTML = LEGAL_ITEMS.map(function (item) {
    return "<tr><th scope=\"row\">" + item[0] + "</th><td><a href=\"" + item[2] + "\" target=\"_blank\" rel=\"noopener noreferrer\">" + item[1] + "</a></td><td>" + legalSupport(item[3]) + "<p>" + item[4] + "</p></td><td>" + item[5] + "</td></tr>";
  }).join("");

  select("#ratesTable").innerHTML = RATES.map(function (item) {
    return "<tr><th scope=\"row\">" + item[0] + "</th><td>" + item[1] + "</td><td>" + item[2] + "</td><td>" + item[3] + "</td></tr>";
  }).join("");

  select("#riskList").innerHTML = RISKS.map(function (item) {
    return "<article class=\"risk-item\"><h4>" + item[0] + "</h4><p>" + item[1] + "</p></article>";
  }).join("");
}

function setupInteractions() {
  selectAll("[data-outcome-sector]").forEach(function (button) {
    button.addEventListener("click", function () {
      selectAll("[data-outcome-sector]").forEach(function (item) {
        item.setAttribute("aria-pressed", String(item === button));
      });
      renderOutcome(button.dataset.outcomeSector);
    });
  });

  select("#restrictionLadder").addEventListener("click", function (event) {
    const button = event.target.closest("[data-restriction]");
    if (!button) {
      return;
    }
    selectAll("[data-restriction]").forEach(function (item) {
      item.setAttribute("aria-pressed", String(item === button));
    });
    showRestriction(Number(button.dataset.restriction));
  });

  const popover = select("#questionPopover");
  let popoverTimer;

  function openQuestion(button) {
    clearTimeout(popoverTimer);
    popover.textContent = button.dataset.question;
    const rect = button.getBoundingClientRect();
    const width = Math.min(310, window.innerWidth - 24);
    let left = rect.left + rect.width / 2 - width / 2;
    left = Math.max(12, Math.min(left, window.innerWidth - width - 12));
    let top = rect.bottom + 10;
    if (top + 110 > window.innerHeight) {
      top = rect.top - 100;
    }
    popover.style.width = width + "px";
    popover.style.left = left + "px";
    popover.style.top = Math.max(12, top) + "px";
    popover.classList.add("visible");
  }

  function closeQuestion() {
    popoverTimer = setTimeout(function () {
      popover.classList.remove("visible");
    }, 120);
  }

  selectAll(".question-mark").forEach(function (button) {
    button.addEventListener("mouseenter", function () { openQuestion(button); });
    button.addEventListener("mouseleave", closeQuestion);
    button.addEventListener("focus", function () { openQuestion(button); });
    button.addEventListener("blur", closeQuestion);
    button.addEventListener("click", function () {
      if (popover.classList.contains("visible")) {
        popover.classList.remove("visible");
      } else {
        openQuestion(button);
      }
    });
  });

  select("#expandAll").addEventListener("click", function (event) {
    const button = event.currentTarget;
    const shouldOpen = button.getAttribute("aria-pressed") !== "true";
    selectAll(".appendix-panel").forEach(function (panel) {
      panel.open = shouldOpen;
    });
    button.setAttribute("aria-pressed", String(shouldOpen));
    button.textContent = shouldOpen ? "إغلاق الملاحق" : "فتح الملاحق";
  });

  const themeButton = select("#themeBtn");

  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    const dark = theme === "dark";
    themeButton.setAttribute("aria-pressed", String(dark));
    themeButton.textContent = dark ? "الوضع الفاتح" : "الوضع الداكن";
  }

  themeButton.addEventListener("click", function () {
    const current = document.documentElement.getAttribute("data-theme") || "light";
    const next = current === "dark" ? "light" : "dark";
    setTheme(next);
    try {
      localStorage.setItem("collection-theme", next);
    } catch (error) {
      return;
    }
  });

  try {
    const savedTheme = localStorage.getItem("collection-theme");
    if (savedTheme === "dark" || savedTheme === "light") {
      setTheme(savedTheme);
    }
  } catch (error) {
    setTheme("light");
  }
}

function setupNavigation() {
  const sections = selectAll("section[data-title]");
  const links = sections.map(function (section) {
    return "<li><a href=\"#" + section.id + "\"><span>" + section.dataset.number + "</span><span>" + section.dataset.title + "</span></a></li>";
  }).join("");

  select("#toc").innerHTML = links;
  select("#mobileToc").innerHTML = links;

  select("#mobileToc").addEventListener("click", function () {
    select(".mobile-toc").open = false;
  });

  const navLinks = new Map(selectAll(".side-nav a").map(function (link) {
    return [link.getAttribute("href").slice(1), link];
  }));

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) {
          return;
        }
        navLinks.forEach(function (link) { link.classList.remove("active"); });
        const active = navLinks.get(entry.target.id);
        if (active) {
          active.classList.add("active");
        }
      });
    }, { rootMargin: "-82px 0px -68% 0px", threshold: 0 });
    sections.forEach(function (section) { observer.observe(section); });
  }

  window.addEventListener("scroll", function () {
    const root = document.documentElement;
    const available = root.scrollHeight - root.clientHeight;
    const progress = available > 0 ? root.scrollTop / available * 100 : 0;
    select("#readingProgress").style.width = progress + "%";
  }, { passive: true });
}

renderCards();
renderCurrentMethods();
renderOutcome("private");
renderJourney();
renderMethods();
renderTreatments();
renderGovernance();
renderAppendices();
setupInteractions();
setupNavigation();
