"use strict";

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

const HERO_OUTCOMES = [
  ["سداد أسهل", "تقليل العوائق قبل أن تتحول الفاتورة إلى متأخرات"],
  ["معالجة أدق", "توجيه كل حالة وفق سبب التأخر وسلوك جهة العمل"],
  ["تصعيد متناسب", "استخدام الحظر تدريجياً وبعد استنفاد المعالجة المناسبة"]
];

const PRINCIPLES = [
  ["الوقاية قبل التصعيد", "فاتورة صحيحة، وتنبيه مبكر، وقنوات دفع سهلة تقلل التأخر من بدايته."],
  ["معالجة سبب التأخر", "نميز بين الخطأ والتعثر المؤقت وعدم الاستجابة، ونختار الإجراء المناسب لكل سبب."],
  ["التناسب والعدالة", "نربط شدة الإجراء بحجم المخاطر وسلوك جهة العمل، لا بمدة التأخر وحدها."],
  ["قرار بشري موثق", "يدعم النظام العمل المتكرر، بينما يعتمد المسؤول القرارات التي تؤثر في جهة العمل."],
  ["قياس الأثر والتحسين", "نقيس أثر كل تدخل على السداد والوقت وتجربة جهة العمل قبل توسيعه."]
];

const HEADLINE_METRICS = [
  ["53.8%", "القطاع الخاص", "من الفواتير سددت في الموعد"],
  ["10.1%", "القطاع الحكومي", "من الفواتير سددت في الموعد"],
  ["55.3%", "القطاع الحكومي", "من الفواتير سددت جزئياً"],
  ["13.46%", "المتأخرات الحكومية", "تجاوز عمرها 180 يوماً"]
];

const OUTCOMES = [
  {
    name: "القطاع الخاص",
    values: [["في الموعد", 53.8, "269,807"], ["بعد الموعد خلال الشهر", 16.8, "84,000"], ["في شهر لاحق", 0.02, "97"], ["سداد جزئي", 1.9, "9,454"], ["عدم السداد", 27.5, "137,809"]]
  },
  {
    name: "القطاع الحكومي",
    values: [["في الموعد", 10.1, "161"], ["بعد الموعد خلال الشهر", 9.3, "147"], ["في شهر لاحق", 0.8, "13"], ["سداد جزئي", 55.3, "878"], ["عدم السداد", 24.5, "390"]]
  }
];

const CURRENT_GAPS = [
  ["التصعيد", "يرتبط الحظر حالياً بمرور مدة محددة.", "قد تتلقى حالات مختلفة الإجراء نفسه.", "ربط التصعيد بصحة المبالغ المستحقة والاستجابة ودرجة المعالجة."],
  ["فهم سبب التأخر", "تتوزع الأسباب بين قنوات وفرق مختلفة.", "تتأخر معالجة الخطأ أو الدفعة غير المربوطة.", "مسارات واضحة للتصحيح والمطابقة والتظلم والتعثر."],
  ["التصنيف", "لا يوجد نموذج مبسط يجمع السلوك وحجم المبالغ المستحقة والأثر.", "يصعب ترتيب الحالات وتفسير سبب الأولوية.", "خمسة عوامل معلنة ودرجة قابلة للتفسير."],
  ["خطط السداد", "توجد خيارات ومسميات متقاربة.", "تختلف طريقة دراسة الطلب ومتابعته.", "مسار معياري وآخر استثنائي بضوابط وصلاحيات واضحة."],
  ["قياس النتائج", "تركز المتابعة على تنفيذ الإجراء.", "لا يظهر أثر كل تدخل في تحسن السداد.", "خط أساس ومؤشرات وقياس قبل التجربة وبعدها."]
];

const COLLECTION_FLOW = [
  ["إصدار صحيح", "يحسب النظام الاستحقاق من البيانات المسجلة ويتيح تصحيح الخطأ."],
  ["إشعار واضح", "تستلم جهة العمل المبلغ والموعد وطرق السداد وما يلزم عند وجود ملاحظة."],
  ["سداد مرن", "تختار الجهة القناة المناسبة أو تقدم طلب معالجة عند التعثر."],
  ["مطابقة وتسوية", "يربط النظام الدفعة بالفاتورة ويوجه الاستثناء فقط إلى الموظف."],
  ["إغلاق أو معالجة", "يغلق النظام الفاتورة، أو يوجهها إلى المسار المناسب إذا بقي رصيد."]
];

const CASE_ROUTES = [
  ["بيانات غير صحيحة", "التصحيح", "يراجع الفريق البيانات ويعيد النظام احتساب الفاتورة قبل أي متابعة."],
  ["دفعة غير مرتبطة", "المطابقة", "يتحقق الفريق من مرجع الدفع ويربطه بالفاتورة ويحدث الرصيد."],
  ["صعوبة مالية مؤقتة", "خطة السداد", "يدرس الموظف قدرة الجهة على دفع المتأخرات والفواتير الجديدة."],
  ["اعتراض موثق", "التظلم", "يفصل الصندوق المبلغ محل التظلم ويتابع الجزء غير المتنازع عليه."],
  ["عدم استجابة", "التصعيد", "يبدأ الإنذار ثم الحظر التدريجي بعد تحقق الشروط والاعتماد."]
];

const CLASSIFICATION_GATES = [
  "لا يوجد خطأ مؤثر في الفاتورة.",
  "اكتملت مطابقة الدفعات الواردة.",
  "لا يوجد تظلم مفتوح على المبلغ.",
  "لا توجد خطة سداد ملتزم بها."
];

const CLASSIFICATION_FACTORS = [
  ["الالتزام خلال آخر 6 أشهر", 30, "نسبة الفواتير التي سددتها الجهة كاملة وفي موعدها."],
  ["عمر المبالغ المستحقة", 25, "عمر أقدم مبلغ مستحق بعد استبعاد المبالغ غير المكتملة أو المتنازع عليها."],
  ["حجم المبالغ المستحقة نسبياً", 20, "قيمة المبالغ المستحقة مقارنة بمتوسط الاشتراكات الشهرية للجهة."],
  ["الاستجابة والمعالجة", 15, "استجابة الجهة للإشعارات وطلبها المعالجة والتزامها بخطة سابقة."],
  ["حجم المنشأة والأثر", 10, "عدد العاملين وأثر التصعيد في المؤمن عليهم واستمرارية المنشأة."]
];

const RISK_SEGMENTS = [
  ["منخفضة", "0–24", "تذكير آلي ومتابعة النتيجة دون تدخل الموظف.", "low"],
  ["متوسطة", "25–49", "تواصل موجه أو عرض خطة سداد مناسبة.", "medium"],
  ["مرتفعة", "50–74", "إنذار رسمي ومراجعة الموظف قبل نهاية المهلة.", "high"],
  ["حرجة", "75–100", "تطبيق مستوى الحظر المناسب آلياً بعد تحقق الشروط، مع توجيه الحالات الاستثنائية للمراجعة.", "critical"]
];

const ESCALATION_PRINCIPLES = [
  ["الزمن", "عامل يرفع أولوية المتابعة، لكنه لا يكفي وحده للحظر."],
  ["السلوك", "الاستجابة والوفاء بالوعود يوقفان التصعيد ويوجهان إلى المعالجة."],
  ["الأثر", "يختار الصندوق أضيق إجراء قادر على تحقيق السداد بأقل أثر جانبي."]
];

const RESTRICTION_STEPS = [
  { level: "المستوى 1", title: "التذكير والمساعدة", timing: "قبل الاستحقاق وحتى 30 يوماً", tone: "support", trigger: "فاتورة مستحقة أو تأخر حديث مع إمكانية السداد.", action: "يرسل النظام إشعاراً واضحاً ورابط السداد، ويوجه الأخطاء وطلبات المساعدة إلى المسار المختص.", scope: "لا يطبق أي حظر.", exit: "السداد أو قبول طلب المعالجة." },
  { level: "المستوى 2", title: "المتابعة الرسمية", timing: "بعد 30 يوماً", tone: "notice", trigger: "مبالغ مستحقة مؤكدة، وانتهاء التذكير، وعدم وجود تظلم أو خطة ملتزم بها.", action: "يرسل الصندوق إنذاراً يوضح المبلغ والمهلة وخيارات المعالجة والخطوة التالية.", scope: "لا يطبق حظر خلال المهلة.", exit: "السداد أو خطة معتمدة أو ثبوت سبب يستبعد التصعيد." },
  { level: "المستوى 3", title: "حظر محدود", timing: "بعد 60 يوماً", tone: "limited", trigger: "درجة مرتفعة أو حرجة، وانتهاء مهلة الإنذار دون سداد أو استجابة، وعدم وجود حالة تستبعد التصعيد.", action: "يطبق النظام آلياً حظراً على مجموعة محددة من المعاملات غير الضرورية وفق القواعد المعتمدة.", scope: "أضيق نطاق يحقق الغرض مع حماية الحقوق والخدمات الأساسية.", exit: "يرفع النظام الحظر عند السداد أو اعتماد خطة، ضمن مدة خدمة محددة." },
  { level: "المستوى 4", title: "حظر موسع", timing: "بعد مراجعة أثر المستوى السابق", tone: "expanded", trigger: "استمرار عدم الاستجابة، وعدم كفاية الحظر المحدود، ومراجعة الاستثناءات والأثر.", action: "يوسع صاحب الصلاحية نطاق الحظر ضمن الحدود القانونية والاتفاقات مع الجهات المنفذة.", scope: "خدمات إضافية محددة مسبقاً، دون تطبيق شامل تلقائي.", exit: "السداد أو تسوية معتمدة، ثم طلب إعادة التعامل ومتابعة تنفيذه." },
  { level: "المستوى 5", title: "المسار القانوني", timing: "للحالات المستمرة عالية الخطورة", tone: "legal", trigger: "ثبوت المبالغ المستحقة واستنفاد مسارات المعالجة والتصعيد وتوفر السند القانوني.", action: "تراجع الشؤون القانونية الملف وتحدد الإجراء النظامي المناسب.", scope: "الإجراء الذي يسمح به القانون وبعد استكمال الاعتمادات.", exit: "ينفذ القرار القانوني أو التسوية المعتمدة وتحدث حالة المبالغ المستحقة." }
];

const RESTRICTION_CONTROLS = [
  ["إشعار مسبق", "يعرف صاحب العمل المبلغ والمهلة وما سيحدث إذا لم يعالج الحالة."],
  ["حق المعالجة", "يمكن للجهة السداد أو التظلم أو طلب خطة قبل الانتقال إلى مستوى أعلى."],
  ["استثناءات معلنة", "يراجع الموظف الحالات ذات الأثر الاجتماعي أو التشغيلي المرتفع."],
  ["رفع سريع للحظر", "يحدد الصندوق مدة خدمة لإعادة التعامل بعد زوال السبب ويتابع الالتزام بها."],
  ["قرار وأثر موثقان", "يسجل النظام من اعتمد الإجراء وسببه ومدته ونتيجته."]
];

const PRIORITY_INITIATIVES = [
  ["01", "فاتورة صحيحة وتسوية أسرع", "يتحقق النظام من بيانات الفاتورة قبل إصدارها، ويستخدم مرجع دفع موحداً لربط الدفعات بالفواتير آلياً. ويتدخل الموظف فقط عندما يتعذر على النظام إتمام المطابقة.", "تقليل الدفعات غير المربوطة"],
  ["02", "بوابة دفع موحدة", "عرض جميع الفواتير والمبالغ المحدثة والسماح بسداد فاتورة واحدة أو عدة فواتير في عملية واحدة.", "رفع نجاح الدفع من أول محاولة"],
  ["03", "خصم مباشر بإشعار مسبق", "تنفيذ تجربة محدودة مع بنك واحد للفاتورة الشهرية أو قسط الخطة، ثم التوسع وفق النتائج.", "زيادة السداد في الموعد"],
  ["04", "ملف موحد للجهة", "جمع الفواتير والدفعات والتظلمات والخطط والإشعارات والقرارات في تسلسل واحد للموظف.", "خفض زمن معالجة الحالة"]
];

const PAYMENT_PLANS = [
  ["خطة معيارية", "للمبالغ المستحقة ضمن حد مالي ومدة معتمدين، مع دفعة أولى واستمرار سداد الفواتير الجديدة.", ["شروط موحدة", "اعتماد مبسط", "متابعة آلية للأقساط"]],
  ["خطة استثنائية", "للحالات التي تتجاوز الحدود المعيارية أو ترتبط بموسمية النشاط أو أثر اجتماعي مرتفع.", ["تحليل قدرة السداد", "مستندات داعمة", "اعتماد بصلاحية أعلى"]]
];

const BENCHMARKS = [
  { region: "ممارسة دولية", title: "الوقاية والتدخل المبكر", practice: "تبدأ إدارة المبالغ المستحقة قبل تراكمها من خلال صحة الفاتورة والتذكير والتواصل المستمر.", application: "تنبيهات قبل الاستحقاق وبعده، ومسار سريع لتصحيح الفاتورة وربط الدفعة.", source: "https://www.oecd.org/en/publications/successful-tax-debt-management_e8fdb816-en.html" },
  { region: "ممارسة دولية", title: "المعالجة حسب القدرة والسلوك", practice: "تختلف المعالجة بين جهة ترغب في السداد وتواجه تعثراً مؤقتاً وجهة لا تستجيب.", application: "خطة سداد لمن تثبت قدرته على دفع الأقساط والالتزامات الجديدة، وتصعيد أسرع عند عدم الاستجابة.", source: "https://www.gov.uk/hmrc-internal-manuals/debt-management-and-banking/dmbm800050" },
  { region: "ممارسة دولية", title: "اختيار الإجراء حسب حالة جهة العمل", practice: "لا تعامل جميع الجهات المتأخرة بالطريقة نفسها؛ بل يحدد الإجراء وفق سجل السداد وعمر المبالغ المستحقة وحجمها ومدى استجابة الجهة.", application: "يوجه نموذج العوامل الخمسة كل جهة إلى التذكير أو خطة السداد أو التصعيد، مع توضيح أسباب الاختيار للموظف.", source: "https://www.oecd.org/content/dam/oecd/en/publications/reports/2014/10/working-smarter-in-tax-debt-management_g1g496ee/9789264223257-en.pdf" },
  { region: "السعودية", title: "قناة دفع موحدة عبر البنوك", practice: "تتيح التأمينات الاجتماعية سداد الاشتراكات والمبالغ الأخرى من خلال نظام سداد عبر القنوات البنكية المختلفة.", application: "ربط كل فاتورة برقم دفع موحد يمكن استخدامه في البنوك وتعود نتيجته إلى نظام الصندوق آلياً.", source: "https://www.gosi.gov.sa/GOSIOnline/E-Services_Channels?locale=en_US" },
  { region: "ممارسة دولية", title: "ربط الاشتراكات بدورة الرواتب", practice: "يربط نظام حماية الأجور بيانات المنشآت بجهات مالية معتمدة لتنفيذ تحويلات الرواتب ومتابعتها. ولا يتوافر في المصادر الرسمية ما يؤكد خصم اشتراكات التقاعد ضمن عملية التحويل نفسها.", application: "دراسة إصدار أمر مالي موحد عند معالجة الرواتب: يحول صافي الرواتب إلى العاملين، ويوجه مبالغ الاشتراكات المستحقة إلى الصندوق، مع فصل الحسابات وإثبات كل عملية.", source: "https://www.mohre.gov.ae/ar/media-center/news/10/12/2025/mohre-launches-new-update-for-the-wage-protection-system" },
  { region: "البحرين", title: "الخصم المباشر لفاتورة الاشتراكات", practice: "يمكن لصاحب العمل تقديم طلب خصم مباشر لفاتورة الاشتراكات من الحساب البنكي.", application: "تجربة الخصم المباشر للفاتورة الشهرية أو قسط خطة السداد مع إشعار مسبق ومعالجة واضحة لتعذر الخصم.", source: "https://www.sio.gov.bh/en/direct-debit-installment" }
];

const KPIS = [
  ["السداد في الموعد", "نسبة الفواتير المسددة كاملة قبل تاريخ الاستحقاق.", "نتيجة"],
  ["معالجة المتأخرات", "قيمة المبالغ المحصلة من الرصيد المتأخر القائم خلال الفترة.", "نتيجة"],
  ["نجاح الدفع", "نسبة عمليات الدفع المكتملة من أول محاولة.", "تجربة"],
  ["المطابقة الآلية", "نسبة الدفعات المربوطة دون تدخل الموظف.", "كفاءة"],
  ["الالتزام بالخطط", "نسبة الخطط المنتظمة في الأقساط والفواتير الجديدة.", "نتيجة"],
  ["أثر الحظر", "السداد الناتج بعد كل مستوى مقابل الحالات المتضررة ومدة إعادة التعامل.", "أثر"]
];

const WAVES = [
  { number: "المرحلة 1", title: "تثبيت الأساس", summary: "نوثق الوضع القائم ونبني ما تحتاجه جميع التحسينات.", items: ["تثبيت خط الأساس ومصادر البيانات.", "توحيد أسباب التأخر وحالات الفاتورة.", "اعتماد شروط الاستبعاد وعوامل التصنيف."] },
  { number: "المرحلة 2", title: "التجربة المحددة", summary: "نجرب الإجراءات على نطاق يمكن قياسه وضبطه.", items: ["تجربة التذكيرات ومساري خطط السداد.", "اختبار نتائج التصنيف قبل تفعيل الحظر الآلي.", "تجربة بوابة الدفع والخصم المباشر."] },
  { number: "المرحلة 3", title: "التوسع والتحسين", summary: "نتوسع فيما أثبت أثره ونعالج ما لم يحقق النتيجة.", items: ["تطبيق مستويات الحظر بعد الاعتماد.", "التوسع مع البنوك والجهات الحكومية.", "مراجعة الأوزان والمدد كل ستة أشهر."] }
];

const DECISIONS = [
  ["عوامل التصنيف وأوزانها", "اعتماد العوامل الخمسة، وتعريف طريقة احتساب كل عامل وحدود الفئات الأربع."],
  ["مدد التصعيد", "تحديد مدد التذكير والإنذار ومتى تجوز مراجعة الحظر، بناءً على القانون والبيانات التشغيلية."],
  ["نطاق مستويات الحظر", "تحديد المعاملات التي يشملها كل مستوى والاستثناءات وصلاحية الاعتماد ومدة إعادة التعامل."],
  ["ضوابط خطط السداد", "تحديد الحد المالي والمدة والدفعة الأولى والمستندات وصلاحيات الخطة المعيارية والاستثنائية."],
  ["نطاق التجربة", "اختيار عينة الجهات أو نوع الفواتير ومدة التجربة والجهات المشاركة قبل التعميم."],
  ["مقاييس النجاح", "اعتماد خط الأساس والمستهدف ومصدر البيانات ومسؤول القياس ودورية عرض النتائج."],
  ["جاهزية جهات العمل للالتزامات الجديدة", "تحديد نطاق دراسة الأثر، والجهة المسؤولة عنها، ومعايير الجاهزية والفترة الانتقالية قبل فرض اشتراك جديد أو تعديل اشتراك قائم."]
];

function renderSimpleCards(selector, items, className) {
  $(selector).innerHTML = items.map((item, index) => `<article class="${className}"><div class="numbered-card-heading"><span class="card-index">${String(index + 1).padStart(2, "0")}</span><h4>${item[0]}</h4></div><p>${item[1]}</p></article>`).join("");
}

function renderHero() {
  $("#heroOutcomes").innerHTML = HERO_OUTCOMES.map(item => `<article><strong>${item[0]}</strong><span>${item[1]}</span></article>`).join("");
}

function renderMetrics() {
  $("#headlineMetrics").innerHTML = HEADLINE_METRICS.map(item => `<article class="metric-card"><span>${item[1]}</span><strong>${item[0]}</strong><p>${item[2]}</p></article>`).join("");
}

function renderOutcomes() {
  $("#outcomeChart").innerHTML = OUTCOMES.map(data => {
    const total = data.values.reduce((sum, item) => sum + item[1], 0);
    const segments = data.values.map((item, index) => `<i class="outcome-segment segment-${index + 1}" style="width:${item[1] / total * 100}%" title="${item[0]}: ${item[1]}%"></i>`).join("");
    const legend = data.values.map((item, index) => `<span class="legend-${index + 1}">${item[0]} <b>${item[1]}%</b></span>`).join("");
    return `<div class="outcome-row"><div class="outcome-title"><strong>${data.name}</strong></div><div class="outcome-bar" role="img" aria-label="نتائج السداد في ${data.name}">${segments}</div><div class="outcome-legend">${legend}</div></div>`;
  }).join("");
}

function renderCurrentGaps() {
  $("#currentGaps").innerHTML = CURRENT_GAPS.map(item => `<tr><th scope="row">${item[0]}</th><td>${item[1]}</td><td>${item[2]}</td><td class="target-cell">${item[3]}</td></tr>`).join("");
}

function renderFlow() {
  $("#collectionFlow").innerHTML = COLLECTION_FLOW.map((item, index) => `<article class="process-step"><div class="numbered-card-heading"><span class="step-number">${index + 1}</span><h4>${item[0]}</h4></div><p>${item[1]}</p></article>`).join("");
  $("#caseRoutes").innerHTML = CASE_ROUTES.map(item => `<article class="route-card"><span>${item[0]}</span><h4>${item[1]}</h4><p>${item[2]}</p></article>`).join("");
}

function renderClassification() {
  $("#classificationGates").innerHTML = CLASSIFICATION_GATES.map(item => `<li>${item}</li>`).join("");
  $("#classificationFactors").innerHTML = CLASSIFICATION_FACTORS.map(item => `<article class="factor-row"><div><strong>${item[0]}</strong><p>${item[2]}</p></div><div class="factor-visual"><span style="width:${item[1] / 30 * 100}%"></span></div><b>${item[1]}%</b></article>`).join("");
  $("#riskSegments").innerHTML = RISK_SEGMENTS.map(item => `<article class="segment-card" data-risk="${item[3]}"><span>${item[1]} درجة</span><h4>${item[0]}</h4><p>${item[2]}</p></article>`).join("");
}

function renderEscalation() {
  renderSimpleCards("#escalationPrinciples", ESCALATION_PRINCIPLES, "escalation-card");
  $("#restrictionLadder").innerHTML = RESTRICTION_STEPS.map((item, index) => `<button type="button" class="restriction-step" data-restriction="${index}" data-tone="${item.tone}" aria-pressed="${index === 0}"><span>${item.level}</span><strong>${item.title}</strong><small>${item.timing}</small></button>`).join("");
  renderRestrictionDetail(0);
  renderSimpleCards("#restrictionControls", RESTRICTION_CONTROLS, "control-card");
}

function renderRestrictionDetail(index) {
  const item = RESTRICTION_STEPS[index];
  $("#restrictionDetail").innerHTML = `<div class="detail-heading"><span>${item.level}</span><h3>${item.title}</h3></div><dl><dt>شروط الانتقال</dt><dd>${item.trigger}</dd><dt>الإجراء</dt><dd>${item.action}</dd><dt>نطاقه</dt><dd>${item.scope}</dd><dt>إيقاف التصعيد</dt><dd>${item.exit}</dd></dl>`;
}

function renderImprovements() {
  $("#priorityInitiatives").innerHTML = PRIORITY_INITIATIVES.map(item => `<article class="initiative-card"><div class="numbered-card-heading"><span class="initiative-number">${item[0]}</span><h4>${item[1]}</h4></div><p>${item[2]}</p><strong>مقياس مباشر: ${item[3]}</strong></article>`).join("");
  $("#paymentPlans").innerHTML = PAYMENT_PLANS.map(item => `<article class="plan-card"><h4>${item[0]}</h4><p>${item[1]}</p><ul>${item[2].map(point => `<li>${point}</li>`).join("")}</ul></article>`).join("");
  $("#benchmarks").innerHTML = BENCHMARKS.map(item => `<article class="benchmark-card"><div class="benchmark-top"><span class="benchmark-region">${item.region}</span><a class="source-link" href="${item.source}" target="_blank" rel="noopener noreferrer" aria-label="فتح المصدر الرسمي لممارسة ${item.title} في تبويب جديد" title="فتح المصدر الرسمي"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 5h5v5M19 5l-8 8M18 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg></a></div><h4>${item.title}</h4><p>${item.practice}</p><dl><dt>تطبيقها في الصندوق</dt><dd>${item.application}</dd></dl></article>`).join("");
}

function renderDelivery() {
  $("#kpis").innerHTML = KPIS.map(item => `<article class="kpi-card"><span>${item[2]}</span><h4>${item[0]}</h4><p>${item[1]}</p></article>`).join("");
  $("#implementationWaves").innerHTML = WAVES.map(item => `<article class="wave-card"><span>${item.number}</span><h4>${item.title}</h4><p>${item.summary}</p><ul>${item.items.map(point => `<li>${point}</li>`).join("")}</ul></article>`).join("");
}

function renderDecisions() {
  $("#decisionsList").innerHTML = DECISIONS.map((item, index) => `<li><span>${String(index + 1).padStart(2, "0")}</span><div><strong>${item[0]}</strong><p>${item[1]}</p></div></li>`).join("");
}

function setupNavigation() {
  const sections = $$("section[data-title]");
  const links = sections.map(section => `<li><a href="#${section.id}"><span>${section.dataset.number}</span><span>${section.dataset.title}</span></a></li>`).join("");
  $("#toc").innerHTML = links;
  $("#mobileToc").innerHTML = links;
  $("#mobileToc").addEventListener("click", () => { $(".mobile-toc").open = false; });

  const navLinks = new Map($$(".side-nav a").map(link => [link.getAttribute("href").slice(1), link]));
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(link => link.classList.remove("active"));
        navLinks.get(entry.target.id)?.classList.add("active");
      });
    }, { rootMargin: "-82px 0px -68% 0px" });
    sections.forEach(section => observer.observe(section));
  }

  window.addEventListener("scroll", () => {
    const root = document.documentElement;
    const available = root.scrollHeight - root.clientHeight;
    $("#readingProgress").style.width = `${available > 0 ? root.scrollTop / available * 100 : 0}%`;
  }, { passive: true });
}

function setupInteractions() {
  $("#restrictionLadder").addEventListener("click", event => {
    const button = event.target.closest("[data-restriction]");
    if (!button) return;
    $$("[data-restriction]").forEach(item => item.setAttribute("aria-pressed", String(item === button)));
    renderRestrictionDetail(Number(button.dataset.restriction));
  });
}

renderHero();
renderSimpleCards("#principles", PRINCIPLES, "principle-card");
renderMetrics();
renderOutcomes();
renderCurrentGaps();
renderFlow();
renderClassification();
renderEscalation();
renderImprovements();
renderDelivery();
renderDecisions();
setupNavigation();
setupInteractions();
