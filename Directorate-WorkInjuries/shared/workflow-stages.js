/* ================================================================
   workflow-stages.js — تعريف مراحل سير العمل لكل نوع طلب
   ================================================================ */

const WORKFLOW_STAGES = {
  /* ── مراحل طلبات بدلات الانقطاع عن العمل ── */
  allowances: [
    {
      id: 'draft',
      name: 'مسودة',
      description: 'الطلب في مرحلة الإعداد',
      color: 'gray',
      icon: 'edit',
      nextStages: ['submitted'],
      previousStages: [],
    },
    {
      id: 'submitted',
      name: 'تم تقديم الطلب',
      description: 'تم تقديم الطلب بانتظار تعيين المحقق',
      color: 'blue',
      icon: 'send',
      nextStages: ['assigned', 'returned'],
      previousStages: ['draft'],
    },
    {
      id: 'assigned',
      name: 'تم تعيين المحقق',
      description: 'تم تعيين محقق للنظر في الطلب',
      color: 'purple',
      icon: 'user',
      nextStages: ['external_investigation', 'investigation', 'returned'],
      previousStages: ['submitted'],
    },
    {
      id: 'external_investigation',
      name: 'قيد التحقيق — جهة خارجية مخولة',
      description: 'الطلب لدى جهة خارجية مخولة لتنفيذ الزيارة الميدانية وجمع الاستدلالات وإعداد محضر التحقيق',
      color: 'orange',
      icon: 'search',
      nextStages: ['investigation'],
      previousStages: ['assigned', 'investigation'],
    },
    {
      id: 'investigation',
      name: 'قيد التحقيق',
      description: 'جارٍ التحقيق في الطلب',
      color: 'orange',
      icon: 'search',
      nextStages: ['head_review', 'external_investigation', 'returned', 'suspended'],
      previousStages: ['assigned', 'external_investigation'],
    },
    {
      id: 'head_review',
      name: 'مراجعة رئيس القسم',
      description: 'الطلب لدى رئيس القسم للمراجعة',
      color: 'yellow',
      icon: 'user-tie',
      nextStages: ['approved', 'rejected', 'returned', 'suspended'],
      previousStages: ['investigation'],
    },
    {
      id: 'sickleave_review',
      name: 'مراجعة قسم الإجازات',
      description: 'الطلب لدى قسم الإجازات المرضية',
      color: 'teal',
      icon: 'calendar',
      nextStages: ['sickleave_head_review', 'returned'],
      previousStages: ['head_review'],
    },
    {
      id: 'sickleave_head_review',
      name: 'مراجعة رئيس قسم الإجازات',
      description: 'الطلب لدى رئيس قسم الإجازات المرضية',
      color: 'cyan',
      icon: 'user-tie',
      nextStages: ['approved', 'rejected', 'returned'],
      previousStages: ['sickleave_review'],
    },
    {
      id: 'approved',
      name: 'معتمد',
      description: 'تم اعتماد الطلب',
      color: 'green',
      icon: 'check',
      nextStages: ['completed', 'appealed'],
      previousStages: ['head_review', 'sickleave_head_review'],
    },
    {
      id: 'rejected',
      name: 'مرفوض',
      description: 'تم رفض الطلب',
      color: 'red',
      icon: 'x',
      nextStages: ['appealed', 'completed'],
      previousStages: ['head_review', 'sickleave_head_review'],
    },
    {
      id: 'returned',
      name: 'معاد للاستيفاء',
      description: 'تم إعادة الطلب لاستيفاء البيانات',
      color: 'yellow',
      icon: 'refresh',
      nextStages: ['submitted', 'investigation'],
      previousStages: ['submitted', 'assigned', 'investigation', 'head_review', 'sickleave_review'],
    },
    {
      id: 'suspended',
      name: 'معلق',
      description: 'الطلب معلق مؤقتاً',
      color: 'gray',
      icon: 'pause',
      nextStages: ['investigation', 'head_review'],
      previousStages: ['investigation', 'head_review'],
    },
    {
      id: 'appealed',
      name: 'متظلم عليه',
      description: 'تم تقديم تظلم على القرار',
      color: 'orange',
      icon: 'shield',
      nextStages: ['completed', 'reconsidered'],
      previousStages: ['approved', 'rejected'],
    },
    {
      id: 'reconsidered',
      name: 'إعادة النظر',
      description: 'جارٍ إعادة النظر في التظلم',
      color: 'purple',
      icon: 'refresh',
      nextStages: ['approved', 'rejected', 'completed'],
      previousStages: ['appealed'],
    },
    {
      id: 'completed',
      name: 'مكتمل',
      description: 'تم إغلاق الطلب',
      color: 'gray',
      icon: 'archive',
      nextStages: [],
      previousStages: ['approved', 'rejected', 'appealed', 'reconsidered'],
    },
  ],

  /* ── مراحل طلبات منفعة الإعاقة ── */
  disability: [
    {
      id: 'draft',
      name: 'مسودة',
      description: 'الطلب في مرحلة الإعداد',
      color: 'gray',
      icon: 'edit',
      nextStages: ['submitted'],
      previousStages: [],
    },
    {
      id: 'submitted',
      name: 'تم تقديم الطلب',
      description: 'تم تقديم الطلب بانتظار المراجعة',
      color: 'blue',
      icon: 'send',
      nextStages: ['employee_review', 'returned'],
      previousStages: ['draft'],
    },
    {
      id: 'employee_review',
      name: 'مراجعة موظف القسم',
      description: 'الطلب لدى موظف قسم الإعاقة',
      color: 'purple',
      icon: 'user',
      nextStages: ['head_review', 'returned', 'suspended'],
      previousStages: ['submitted'],
    },
    {
      id: 'head_review',
      name: 'مراجعة رئيس القسم',
      description: 'الطلب لدى رئيس قسم الإعاقة',
      color: 'yellow',
      icon: 'user-tie',
      nextStages: ['approved', 'rejected', 'returned', 'suspended'],
      previousStages: ['employee_review'],
    },
    {
      id: 'approved',
      name: 'معتمد',
      description: 'تم اعتماد الطلب',
      color: 'green',
      icon: 'check',
      nextStages: ['active', 'appealed'],
      previousStages: ['head_review'],
    },
    {
      id: 'rejected',
      name: 'مرفوض',
      description: 'تم رفض الطلب',
      color: 'red',
      icon: 'x',
      nextStages: ['appealed', 'completed'],
      previousStages: ['head_review'],
    },
    {
      id: 'returned',
      name: 'معاد للاستيفاء',
      description: 'تم إعادة الطلب لاستيفاء البيانات',
      color: 'yellow',
      icon: 'refresh',
      nextStages: ['submitted', 'employee_review'],
      previousStages: ['submitted', 'employee_review', 'head_review'],
    },
    {
      id: 'suspended',
      name: 'معلق',
      description: 'الطلب معلق مؤقتاً',
      color: 'gray',
      icon: 'pause',
      nextStages: ['employee_review', 'head_review'],
      previousStages: ['employee_review', 'head_review'],
    },
    {
      id: 'active',
      name: 'نشط',
      description: 'المنفعة نشطة',
      color: 'green',
      icon: 'check-circle',
      nextStages: ['expired', 'reassessment'],
      previousStages: ['approved'],
    },
    {
      id: 'expired',
      name: 'منتهية',
      description: 'انتهت صلاحية البطاقة',
      color: 'red',
      icon: 'alert',
      nextStages: ['renewal', 'completed'],
      previousStages: ['active'],
    },
    {
      id: 'reassessment',
      name: 'إعادة التقييم',
      description: 'جارٍ إعادة تقييم الحالة',
      color: 'orange',
      icon: 'refresh',
      nextStages: ['active', 'expired', 'completed'],
      previousStages: ['active'],
    },
    {
      id: 'renewal',
      name: 'تجديد',
      description: 'طلب تجديد البطاقة',
      color: 'blue',
      icon: 'refresh',
      nextStages: ['submitted', 'active'],
      previousStages: ['expired'],
    },
    {
      id: 'appealed',
      name: 'متظلم عليه',
      description: 'تم تقديم تظلم على القرار',
      color: 'orange',
      icon: 'shield',
      nextStages: ['completed', 'reconsidered'],
      previousStages: ['approved', 'rejected'],
    },
    {
      id: 'reconsidered',
      name: 'إعادة النظر',
      description: 'جارٍ إعادة النظر في التظلم',
      color: 'purple',
      icon: 'refresh',
      nextStages: ['approved', 'rejected', 'completed'],
      previousStages: ['appealed'],
    },
    {
      id: 'completed',
      name: 'مكتمل',
      description: 'تم إغلاق الطلب',
      color: 'gray',
      icon: 'archive',
      nextStages: [],
      previousStages: ['rejected', 'appealed', 'reconsidered', 'expired'],
    },
  ],

  /* ── مراحل استعلامات تقاعد الأشخاص ذوي الإعاقة ── */
  disabilityRetirement: [
    {
      id: 'received',
      name: 'تم الاستلام',
      description: 'تم استلام الاستعلام من نظام المستحقات',
      color: 'blue',
      icon: 'inbox',
      nextStages: ['employee_review'],
      previousStages: [],
    },
    {
      id: 'employee_review',
      name: 'مراجعة موظف القسم',
      description: 'الاستعلام لدى موظف قسم الإعاقة والأمراض المستديمة',
      color: 'purple',
      icon: 'user',
      nextStages: ['head_review', 'suspended'],
      previousStages: ['received'],
    },
    {
      id: 'head_review',
      name: 'اعتماد رئيس القسم',
      description: 'الاستعلام لدى رئيس قسم الإعاقة والأمراض المستديمة',
      color: 'yellow',
      icon: 'user',
      nextStages: ['closed_approved', 'closed_rejected', 'suspended'],
      previousStages: ['employee_review'],
    },
    {
      id: 'suspended',
      name: 'معلّق',
      description: 'تم تعليق الاستعلام مؤقتاً',
      color: 'gray',
      icon: 'pause',
      nextStages: ['employee_review', 'head_review'],
      previousStages: ['employee_review', 'head_review'],
    },
    {
      id: 'closed_approved',
      name: 'إغلاق مع اعتماد الأهلية',
      description: 'تم إغلاق الاستعلام مع اعتماد أهلية التقاعد المبكر',
      color: 'green',
      icon: 'check',
      nextStages: [],
      previousStages: ['head_review'],
    },
    {
      id: 'closed_rejected',
      name: 'إغلاق مع رفض الأهلية',
      description: 'تم إغلاق الاستعلام مع رفض أهلية التقاعد المبكر',
      color: 'red',
      icon: 'x',
      nextStages: [],
      previousStages: ['head_review'],
    },
  ],

  /* ── مراحل طلبات الأمراض المستديمة ── */
  chronic: [
    {
      id: 'incoming',
      name: 'تشخيص وارد',
      description: 'تم استلام التشخيص من المستشفى',
      color: 'blue',
      icon: 'inbox',
      nextStages: ['submitted', 'rejected'],
      previousStages: [],
    },
    {
      id: 'submitted',
      name: 'تم تقديم الطلب',
      description: 'تم تقديم الطلب بانتظار المراجعة',
      color: 'purple',
      icon: 'send',
      nextStages: ['employee_review', 'returned'],
      previousStages: ['incoming'],
    },
    {
      id: 'employee_review',
      name: 'مراجعة موظف القسم',
      description: 'الطلب لدى موظف قسم الأمراض المستديمة',
      color: 'orange',
      icon: 'user',
      nextStages: ['head_review', 'returned', 'suspended'],
      previousStages: ['submitted'],
    },
    {
      id: 'head_review',
      name: 'مراجعة رئيس القسم',
      description: 'الطلب لدى رئيس قسم الأمراض المستديمة',
      color: 'yellow',
      icon: 'user-tie',
      nextStages: ['approved', 'rejected', 'returned', 'suspended'],
      previousStages: ['employee_review'],
    },
    {
      id: 'approved',
      name: 'معتمد',
      description: 'تم اعتماد الطلب',
      color: 'green',
      icon: 'check',
      nextStages: ['active', 'appealed'],
      previousStages: ['head_review'],
    },
    {
      id: 'rejected',
      name: 'مرفوض',
      description: 'تم رفض الطلب',
      color: 'red',
      icon: 'x',
      nextStages: ['appealed', 'completed'],
      previousStages: ['head_review'],
    },
    {
      id: 'returned',
      name: 'معاد للاستيفاء',
      description: 'تم إعادة الطلب لاستيفاء البيانات',
      color: 'yellow',
      icon: 'refresh',
      nextStages: ['submitted', 'employee_review'],
      previousStages: ['submitted', 'employee_review', 'head_review'],
    },
    {
      id: 'suspended',
      name: 'معلق',
      description: 'الطلب معلق مؤقتاً',
      color: 'gray',
      icon: 'pause',
      nextStages: ['employee_review', 'head_review'],
      previousStages: ['employee_review', 'head_review'],
    },
    {
      id: 'active',
      name: 'نشط',
      description: 'المنفعة نشطة',
      color: 'green',
      icon: 'check-circle',
      nextStages: ['reassessment', 'completed'],
      previousStages: ['approved'],
    },
    {
      id: 'reassessment',
      name: 'إعادة التقييم',
      description: 'جارٍ إعادة تقييم الحالة',
      color: 'orange',
      icon: 'refresh',
      nextStages: ['active', 'completed'],
      previousStages: ['active'],
    },
    {
      id: 'appealed',
      name: 'متظلم عليه',
      description: 'تم تقديم تظلم على القرار',
      color: 'orange',
      icon: 'shield',
      nextStages: ['completed', 'reconsidered'],
      previousStages: ['approved', 'rejected'],
    },
    {
      id: 'reconsidered',
      name: 'إعادة النظر',
      description: 'جارٍ إعادة النظر في التظلم',
      color: 'purple',
      icon: 'refresh',
      nextStages: ['approved', 'rejected', 'completed'],
      previousStages: ['appealed'],
    },
    {
      id: 'completed',
      name: 'مكتمل',
      description: 'تم إغلاق الطلب',
      color: 'gray',
      icon: 'archive',
      nextStages: [],
      previousStages: ['rejected', 'appealed', 'reconsidered', 'reassessment'],
    },
  ],

  /* ── مراحل طلبات التظلم ── */
  appeals: [
    {
      id: 'submitted',
      name: 'تم تقديم التظلم',
      description: 'تم تقديم التظلم بانتظار المراجعة',
      color: 'blue',
      icon: 'send',
      nextStages: ['employee_review', 'returned'],
      previousStages: [],
    },
    {
      id: 'employee_review',
      name: 'مراجعة موظف اللجان',
      description: 'التظلم لدى موظف قسم اللجان الطبية',
      color: 'purple',
      icon: 'user',
      nextStages: ['head_review', 'returned', 'suspended'],
      previousStages: ['submitted'],
    },
    {
      id: 'head_review',
      name: 'مراجعة رئيس القسم',
      description: 'التظلم لدى رئيس قسم اللجان الطبية',
      color: 'yellow',
      icon: 'user-tie',
      nextStages: ['committee_review', 'returned', 'suspended'],
      previousStages: ['employee_review'],
    },
    {
      id: 'committee_review',
      name: 'مراجعة لجنة التظلمات',
      description: 'التظلم لدى لجنة التظلمات',
      color: 'orange',
      icon: 'users',
      nextStages: ['session_scheduled', 'returned', 'suspended'],
      previousStages: ['head_review'],
    },
    {
      id: 'session_scheduled',
      name: 'جلسة مجدولة',
      description: 'تم جدولة جلسة لجنة التظلمات',
      color: 'teal',
      icon: 'calendar',
      nextStages: ['decision', 'cancelled'],
      previousStages: ['committee_review'],
    },
    {
      id: 'decision',
      name: 'صدر قرار',
      description: 'صدر قرار من لجنة التظلمات',
      color: 'yellow',
      icon: 'gavel',
      nextStages: ['approved', 'rejected', 'suspended'],
      previousStages: ['session_scheduled'],
    },
    {
      id: 'approved',
      name: 'معتمد',
      description: 'تم اعتماد التظلم',
      color: 'green',
      icon: 'check',
      nextStages: ['completed'],
      previousStages: ['decision'],
    },
    {
      id: 'rejected',
      name: 'مرفوض',
      description: 'تم رفض التظلم',
      color: 'red',
      icon: 'x',
      nextStages: ['completed'],
      previousStages: ['decision'],
    },
    {
      id: 'returned',
      name: 'معاد للاستيفاء',
      description: 'تم إعادة التظلم لاستيفاء البيانات',
      color: 'yellow',
      icon: 'refresh',
      nextStages: ['submitted', 'employee_review'],
      previousStages: ['submitted', 'employee_review', 'head_review', 'committee_review'],
    },
    {
      id: 'suspended',
      name: 'معلق',
      description: 'التظلم معلق مؤقتاً',
      color: 'gray',
      icon: 'pause',
      nextStages: ['employee_review', 'head_review', 'committee_review'],
      previousStages: ['employee_review', 'head_review', 'committee_review', 'decision'],
    },
    {
      id: 'cancelled',
      name: 'ملغي',
      description: 'تم إلغاء جلسة التظلم',
      color: 'gray',
      icon: 'x',
      nextStages: ['session_scheduled', 'completed'],
      previousStages: ['session_scheduled'],
    },
    {
      id: 'completed',
      name: 'مكتمل',
      description: 'تم إغلاق التظلم',
      color: 'gray',
      icon: 'archive',
      nextStages: [],
      previousStages: ['approved', 'rejected', 'cancelled'],
    },
  ],

  /* ── مراحل طلبات الترخيص والتجديد ── */
  licensing: [
    {
      id: 'draft',
      name: 'مسودة',
      description: 'الطلب في مرحلة الإعداد',
      color: 'gray',
      icon: 'edit',
      nextStages: ['submitted'],
      previousStages: [],
    },
    {
      id: 'submitted',
      name: 'تم تقديم الطلب',
      description: 'تم تقديم الطلب بانتظار المراجعة',
      color: 'blue',
      icon: 'send',
      nextStages: ['employee_review', 'returned'],
      previousStages: ['draft'],
    },
    {
      id: 'employee_review',
      name: 'مراجعة موظف التراخيص',
      description: 'الطلب لدى موظف قسم التراخيص',
      color: 'purple',
      icon: 'user',
      nextStages: ['head_review', 'returned', 'suspended'],
      previousStages: ['submitted'],
    },
    {
      id: 'head_review',
      name: 'مراجعة رئيس القسم',
      description: 'الطلب لدى رئيس قسم التراخيص',
      color: 'yellow',
      icon: 'user-tie',
      nextStages: ['committee_review', 'returned', 'suspended'],
      previousStages: ['employee_review'],
    },
    {
      id: 'committee_review',
      name: 'مراجعة اللجنة الإشرافية',
      description: 'الطلب لدى اللجنة الطبية الإشرافية',
      color: 'orange',
      icon: 'users',
      nextStages: ['session_scheduled', 'returned', 'suspended'],
      previousStages: ['head_review'],
    },
    {
      id: 'session_scheduled',
      name: 'جلسة مجدولة',
      description: 'تم جدولة جلسة اللجنة الإشرافية',
      color: 'teal',
      icon: 'calendar',
      nextStages: ['decision', 'cancelled'],
      previousStages: ['committee_review'],
    },
    {
      id: 'decision',
      name: 'صدر قرار',
      description: 'صدر قرار من اللجنة الإشرافية',
      color: 'yellow',
      icon: 'gavel',
      nextStages: ['approved', 'rejected', 'suspended'],
      previousStages: ['session_scheduled'],
    },
    {
      id: 'approved',
      name: 'معتمد',
      description: 'تم اعتماد الترخيص',
      color: 'green',
      icon: 'check',
      nextStages: ['active', 'appealed'],
      previousStages: ['decision'],
    },
    {
      id: 'rejected',
      name: 'مرفوض',
      description: 'تم رفض الترخيص',
      color: 'red',
      icon: 'x',
      nextStages: ['appealed', 'completed'],
      previousStages: ['decision'],
    },
    {
      id: 'returned',
      name: 'معاد للاستيفاء',
      description: 'تم إعادة الطلب لاستيفاء البيانات',
      color: 'yellow',
      icon: 'refresh',
      nextStages: ['submitted', 'employee_review'],
      previousStages: ['submitted', 'employee_review', 'head_review', 'committee_review'],
    },
    {
      id: 'suspended',
      name: 'معلق',
      description: 'الطلب معلق مؤقتاً',
      color: 'gray',
      icon: 'pause',
      nextStages: ['employee_review', 'head_review', 'committee_review'],
      previousStages: ['employee_review', 'head_review', 'committee_review', 'decision'],
    },
    {
      id: 'cancelled',
      name: 'ملغي',
      description: 'تم إلغاء جلسة الترخيص',
      color: 'gray',
      icon: 'x',
      nextStages: ['session_scheduled', 'completed'],
      previousStages: ['session_scheduled'],
    },
    {
      id: 'active',
      name: 'نشط',
      description: 'الترخيص نشط',
      color: 'green',
      icon: 'check-circle',
      nextStages: ['expiring', 'expired', 'renewal'],
      previousStages: ['approved'],
    },
    {
      id: 'expiring',
      name: 'قرب الانتهاء',
      description: 'الترخيص قرب الانتهاء',
      color: 'yellow',
      icon: 'alert',
      nextStages: ['expired', 'renewal', 'active'],
      previousStages: ['active'],
    },
    {
      id: 'expired',
      name: 'منتهي',
      description: 'انتهت صلاحية الترخيص',
      color: 'red',
      icon: 'alert',
      nextStages: ['renewal', 'completed'],
      previousStages: ['active', 'expiring'],
    },
    {
      id: 'renewal',
      name: 'تجديد',
      description: 'طلب تجديد الترخيص',
      color: 'blue',
      icon: 'refresh',
      nextStages: ['submitted', 'active'],
      previousStages: ['expiring', 'expired'],
    },
    {
      id: 'appealed',
      name: 'متظلم عليه',
      description: 'تم تقديم تظلم على القرار',
      color: 'orange',
      icon: 'shield',
      nextStages: ['completed', 'reconsidered'],
      previousStages: ['approved', 'rejected'],
    },
    {
      id: 'reconsidered',
      name: 'إعادة النظر',
      description: 'جارٍ إعادة النظر في التظلم',
      color: 'purple',
      icon: 'refresh',
      nextStages: ['approved', 'rejected', 'completed'],
      previousStages: ['appealed'],
    },
    {
      id: 'completed',
      name: 'مكتمل',
      description: 'تم إغلاق الطلب',
      color: 'gray',
      icon: 'archive',
      nextStages: [],
      previousStages: ['rejected', 'appealed', 'reconsidered', 'cancelled', 'expired'],
    },
  ],

  /* ── مراحل طلبات العرض على المؤسسات الصحية المرخصة ── */
  referrals: [
    {
      id: 'draft',
      name: 'مسودة',
      description: 'الطلب في مرحلة الإعداد',
      color: 'gray',
      icon: 'edit',
      nextStages: ['submitted'],
      previousStages: [],
    },
    {
      id: 'submitted',
      name: 'تم تقديم الطلب',
      description: 'تم تقديم طلب العرض على المؤسسات الصحية المرخصة',
      color: 'blue',
      icon: 'send',
      nextStages: ['direct_referral_review', 'returned'],
      previousStages: ['draft'],
    },
    {
      id: 'direct_referral_review',
      name: 'مراجعة موظف العرض المباشر',
      description: 'الطلب لدى موظف قسم اللجان الطبية',
      color: 'purple',
      icon: 'user',
      nextStages: ['coordinator_review', 'returned', 'suspended'],
      previousStages: ['submitted'],
    },
    {
      id: 'coordinator_review',
      name: 'مراجعة منسق الإحالات',
      description: 'الطلب لدى منسق الإحالات والتحويلات',
      color: 'orange',
      icon: 'user',
      nextStages: ['committee_review', 'returned', 'suspended'],
      previousStages: ['direct_referral_review'],
    },
    {
      id: 'committee_review',
      name: 'مراجعة قسم اللجان الطبية',
      description: 'الطلب لدى قسم اللجان الطبية',
      color: 'yellow',
      icon: 'users',
      nextStages: ['head_committee_review', 'returned', 'suspended'],
      previousStages: ['coordinator_review'],
    },
    {
      id: 'head_committee_review',
      name: 'مراجعة رئيس قسم اللجان',
      description: 'الطلب لدى رئيس قسم اللجان الطبية',
      color: 'cyan',
      icon: 'user-tie',
      nextStages: ['rapporteur_assignment', 'returned', 'suspended'],
      previousStages: ['committee_review'],
    },
    {
      id: 'rapporteur_assignment',
      name: 'إحالة المقرر',
      description: 'تمت الإحالة إلى مقرر المؤسسة الصحية',
      color: 'teal',
      icon: 'arrow-right',
      nextStages: ['session_scheduled', 'returned'],
      previousStages: ['head_committee_review'],
    },
    {
      id: 'session_scheduled',
      name: 'جلسة مجدولة',
      description: 'تم جدولة جلسة للعرض على المؤسسة الصحية',
      color: 'purple',
      icon: 'calendar',
      nextStages: ['decision', 'cancelled'],
      previousStages: ['rapporteur_assignment'],
    },
    {
      id: 'decision',
      name: 'صدر قرار',
      description: 'صدر قرار من المؤسسة الصحية المرخصة',
      color: 'yellow',
      icon: 'gavel',
      nextStages: ['approved', 'rejected', 'suspended'],
      previousStages: ['session_scheduled'],
    },
    {
      id: 'approved',
      name: 'معتمد',
      description: 'تم اعتماد قرار العرض',
      color: 'green',
      icon: 'check',
      nextStages: ['completed', 'appealed'],
      previousStages: ['decision'],
    },
    {
      id: 'rejected',
      name: 'مرفوض',
      description: 'تم رفض طلب العرض',
      color: 'red',
      icon: 'x',
      nextStages: ['completed', 'appealed'],
      previousStages: ['decision'],
    },
    {
      id: 'returned',
      name: 'معاد للاستيفاء',
      description: 'تم إعادة الطلب لاستيفاء البيانات',
      color: 'yellow',
      icon: 'refresh',
      nextStages: ['submitted', 'direct_referral_review', 'coordinator_review'],
      previousStages: ['submitted', 'direct_referral_review', 'coordinator_review', 'committee_review', 'head_committee_review', 'rapporteur_assignment'],
    },
    {
      id: 'suspended',
      name: 'معلق',
      description: 'الطلب معلق مؤقتاً',
      color: 'gray',
      icon: 'pause',
      nextStages: ['direct_referral_review', 'coordinator_review', 'committee_review', 'head_committee_review'],
      previousStages: ['direct_referral_review', 'coordinator_review', 'committee_review', 'head_committee_review', 'decision'],
    },
    {
      id: 'cancelled',
      name: 'ملغي',
      description: 'تم إلغاء جلسة العرض',
      color: 'gray',
      icon: 'x',
      nextStages: ['session_scheduled', 'completed'],
      previousStages: ['session_scheduled'],
    },
    {
      id: 'appealed',
      name: 'متظلم عليه',
      description: 'تم تقديم تظلم على القرار',
      color: 'orange',
      icon: 'shield',
      nextStages: ['completed', 'reconsidered'],
      previousStages: ['approved', 'rejected'],
    },
    {
      id: 'reconsidered',
      name: 'إعادة النظر',
      description: 'جارٍ إعادة النظر في التظلم',
      color: 'purple',
      icon: 'refresh',
      nextStages: ['approved', 'rejected', 'completed'],
      previousStages: ['appealed'],
    },
    {
      id: 'completed',
      name: 'مكتمل',
      description: 'تم إغلاق الطلب',
      color: 'gray',
      icon: 'archive',
      nextStages: [],
      previousStages: ['approved', 'rejected', 'appealed', 'reconsidered', 'cancelled'],
    },
  ],

  /* ── مراحل طلبات العرض على المؤسسات الصحية المرخصة ── */
  directReferral: [
    {
      id: 'submitted',
      name: 'تم تقديم الطلب',
      description: 'تم رفع الطلب بانتظار مراجعته من قسم اللجان الطبية',
      color: 'blue',
      icon: 'send',
      nextStages: ['committee_review', 'returned'],
      previousStages: [],
    },
    {
      id: 'committee_review',
      name: 'قسم اللجان الطبية',
      description: 'الطلب لدى موظف أو رئيس قسم اللجان الطبية للمراجعة والاعتماد',
      color: 'purple',
      icon: 'user',
      nextStages: ['institution_review', 'returned', 'suspended'],
      previousStages: ['submitted'],
    },
    {
      id: 'institution_review',
      name: 'العرض على المؤسسات الصحية المرخصة',
      description: 'تمت إحالة الطلب للمؤسسة الصحية المرخصة ومتابعة الجلسة والقرار',
      color: 'teal',
      icon: 'calendar',
      nextStages: ['completed'],
      previousStages: ['committee_review'],
    },
    {
      id: 'returned',
      name: 'معاد للاستيفاء',
      description: 'تمت إعادة الطلب لاستيفاء البيانات',
      color: 'yellow',
      icon: 'refresh',
      nextStages: ['submitted', 'committee_review'],
      previousStages: ['submitted', 'committee_review', 'institution_review'],
    },
    {
      id: 'suspended',
      name: 'معلق',
      description: 'الطلب معلق مؤقتاً لحين الاستئناف',
      color: 'gray',
      icon: 'pause',
      nextStages: ['committee_review', 'institution_review'],
      previousStages: ['committee_review', 'institution_review'],
    },
    {
      id: 'completed',
      name: 'مكتمل',
      description: 'تم تنفيذ قرار المؤسسة الصحية وإغلاق الإحالة',
      color: 'gray',
      icon: 'archive',
      nextStages: [],
      previousStages: ['decision_received'],
    },
  ],

  /* ── مراحل استعلامات تقاعد الأشخاص ذوي الإعاقة ── */
  disabilityRetirement: [
    {
      id: 'received',
      name: 'تم استلام الاستعلام',
      description: 'تم استلام الاستعلام من نظام المستحقات',
      color: 'blue',
      icon: 'inbox',
      nextStages: ['employee_review', 'returned'],
      previousStages: [],
    },
    {
      id: 'employee_review',
      name: 'مراجعة موظف القسم',
      description: 'الاستعلام لدى موظف قسم الإعاقة',
      color: 'purple',
      icon: 'user',
      nextStages: ['head_review', 'returned', 'suspended'],
      previousStages: ['received'],
    },
    {
      id: 'head_review',
      name: 'مراجعة رئيس القسم',
      description: 'الاستعلام لدى رئيس قسم الإعاقة',
      color: 'yellow',
      icon: 'user-tie',
      nextStages: ['approved', 'rejected', 'returned', 'suspended'],
      previousStages: ['employee_review'],
    },
    {
      id: 'approved',
      name: 'معتمد',
      description: 'تم اعتماد الاستعلام - مؤهل للتقاعد',
      color: 'green',
      icon: 'check',
      nextStages: ['completed'],
      previousStages: ['head_review'],
    },
    {
      id: 'rejected',
      name: 'مرفوض',
      description: 'تم رفض الاستعلام - غير مؤهل للتقاعد',
      color: 'red',
      icon: 'x',
      nextStages: ['completed'],
      previousStages: ['head_review'],
    },
    {
      id: 'returned',
      name: 'معاد للاستيفاء',
      description: 'تم إعادة الاستعلام لاستيفاء البيانات',
      color: 'yellow',
      icon: 'refresh',
      nextStages: ['received', 'employee_review'],
      previousStages: ['received', 'employee_review', 'head_review'],
    },
    {
      id: 'suspended',
      name: 'معلق',
      description: 'الاستعلام معلق مؤقتاً',
      color: 'gray',
      icon: 'pause',
      nextStages: ['employee_review', 'head_review'],
      previousStages: ['employee_review', 'head_review'],
    },
    {
      id: 'completed',
      name: 'مكتمل',
      description: 'تم إغلاق الاستعلام',
      color: 'gray',
      icon: 'archive',
      nextStages: [],
      previousStages: ['approved', 'rejected'],
    },
  ],
};

/* ================================================================
   Helper Functions for Workflow Stages
   ================================================================ */

/**
 * Get workflow stages by request type
 * @param {string} requestType - Type of request (allowances, disability, chronic, appeals, licensing, disabilityRetirement)
 * @returns {array} Array of workflow stages
 */
function getWorkflowStages(requestType) {
  return WORKFLOW_STAGES[requestType] || [];
}

window.WORKFLOW_STAGES = WORKFLOW_STAGES;
window.getWorkflowStages = getWorkflowStages;
window.getStageById = getStageById;
window.getCurrentStage = getCurrentStage;
window.getNextStages = getNextStages;
window.getPreviousStages = getPreviousStages;
window.isValidTransition = isValidTransition;

/**
 * Get stage by ID for a specific request type
 * @param {string} requestType - Type of request
 * @param {string} stageId - Stage ID
 * @returns {object|null} Stage object or null if not found
 */
function getStageById(requestType, stageId) {
  const stages = getWorkflowStages(requestType);
  return stages.find(stage => stage.id === stageId) || null;
}

/**
 * Get current stage for a request based on its status
 * @param {string} requestType - Type of request
 * @param {string} status - Current status
 * @returns {object|null} Current stage object or null if not found
 */
function getCurrentStage(requestType, status) {
  const stages = getWorkflowStages(requestType);
  return stages.find(stage => status.includes(stage.name)) || null;
}

/**
 * Get next possible stages for a request
 * @param {string} requestType - Type of request
 * @param {string} currentStageId - Current stage ID
 * @returns {array} Array of next possible stages
 */
function getNextStages(requestType, currentStageId) {
  const currentStage = getStageById(requestType, currentStageId);
  if (!currentStage) return [];

  const stages = getWorkflowStages(requestType);
  return currentStage.nextStages.map(nextStageId =>
    stages.find(stage => stage.id === nextStageId)
  ).filter(Boolean);
}

/**
 * Get previous possible stages for a request
 * @param {string} requestType - Type of request
 * @param {string} currentStageId - Current stage ID
 * @returns {array} Array of previous possible stages
 */
function getPreviousStages(requestType, currentStageId) {
  const currentStage = getStageById(requestType, currentStageId);
  if (!currentStage) return [];

  const stages = getWorkflowStages(requestType);
  return currentStage.previousStages.map(prevStageId =>
    stages.find(stage => stage.id === prevStageId)
  ).filter(Boolean);
}

/**
 * Check if a transition is valid
 * @param {string} requestType - Type of request
 * @param {string} fromStageId - Source stage ID
 * @param {string} toStageId - Target stage ID
 * @returns {boolean} True if transition is valid
 */
function isValidTransition(requestType, fromStageId, toStageId) {
  const nextStages = getNextStages(requestType, fromStageId);
  return nextStages.some(stage => stage.id === toStageId);
}

/* ================================================================
   Export for use in main data.js
   ================================================================ */

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    WORKFLOW_STAGES,
    getWorkflowStages,
    getStageById,
    getCurrentStage,
    getNextStages,
    getPreviousStages,
    isValidTransition,
  };
}
