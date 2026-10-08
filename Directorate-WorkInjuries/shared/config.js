/* ================================================================
   config.js — تعريف الأدوار والقوائم الجانبية
   ================================================================ */

const WI_CONFIG = {

  /* ── جدول الأدوار المرجعي ──
     1  العامل / المؤمن عليه / المواطن                   خارجي
     2  الشخص المفوض من جهة العمل                        خارجي
     3  موظف قسم التحقيق في إصابات العمل                 داخلي
     4  رئيس قسم التحقيق في إصابات العمل                 داخلي
     5  موظف قسم التحقيق في الأمراض المهنية              داخلي
     6  رئيس قسم التحقيق في الأمراض المهنية              داخلي
     7  موظف قسم الإجازات المرضية                        داخلي
     8  رئيس قسم الإجازات المرضية                        داخلي
     9  موظف قسم الإعاقة والأمراض المستديمة              داخلي
     10 رئيس قسم الإعاقة والأمراض المستديمة              داخلي
     11 موظف قسم اللجان الطبية                           داخلي
     12 رئيس قسم اللجان الطبية                           داخلي
     13 موظف قسم التراخيص والرقابة                       داخلي
     14 رئيس قسم التراخيص والرقابة                       داخلي
     15 المؤسسة الصحية المرخصة                           خارجي
     16 اللجنة الطبية الإشرافية                          خارجي
     17 لجنة التظلمات                                    خارجي
     18 مقرر المؤسسة الصحية المرخصة                     داخلي
     19 مقرر لجنة التظلمات                               داخلي
     20 مقرر اللجنة الطبية الإشرافية                    داخلي
     21 المفوض عن المستشفيات والمؤسسات الصحية المختلفة  خارجي
     22 لجنة الأمراض المهنية                             خارجي
     23 منسق الإحالات والتحويلات                        داخلي
  */

  roles: {

    'worker': {
      id: 1,
      nameAr: 'العامل / المؤمن عليه / المواطن',
      type: 'external',
      folder: 'worker',
      avatarInitials: 'عا',
      canCheckout: false,
      sidebar: [
        { label: 'لوحة البيانات', page: 'dashboard', icon: 'home', badge: null },
        { label: 'طلبات بدلات الانقطاع عن العمل', page: 'allowances-list', icon: 'list', badge: 'allowances' },
        { label: 'طلبات منفعة الإعاقة', page: 'disability-list', icon: 'list', badge: 'disability' },
        { label: 'طلبات العرض على المؤسسات الصحية المرخصة', page: 'referrals-list', icon: 'clipboard', badge: 'referrals' },
        { label: 'التشخيصات الواردة (الأمراض المستديمة)', page: 'chronic-incoming', icon: 'inbox', badge: 'chronic-incoming' },
        { label: 'طلبات الأمراض المستديمة', page: 'chronic-list', icon: 'list', badge: null },
        { label: 'التظلمات', page: 'appeals-list', icon: 'list', badge: null },
      ]
    },

    'employer-delegate': {
      id: 2,
      nameAr: 'الشخص المفوض من جهة العمل',
      type: 'external',
      folder: 'employer-delegate',
      avatarInitials: 'مج',
      canCheckout: false,
      sidebar: [
        { label: 'لوحة البيانات', page: 'dashboard', icon: 'home', badge: null },
        { label: 'طلبات بدلات الانقطاع عن العمل', page: 'allowances-list', icon: 'list', badge: 'allowances' },
        { label: 'طلبات العرض على المؤسسات الصحية المرخصة', page: 'referrals-list', icon: 'clipboard', badge: 'referrals' },
        { label: 'التظلمات', page: 'appeals-list', icon: 'list', badge: null },
      ]
    },

    'injury-investigator': {
      id: 3,
      nameAr: 'موظف قسم التحقيق في إصابات العمل',
      type: 'internal',
      folder: 'injury-investigator',
      avatarInitials: 'مح',
      canCheckout: true,
      sidebar: [
        { label: 'لوحة البيانات', page: 'dashboard', icon: 'home', badge: null },
        { label: 'طلبات بدلات الانقطاع عن العمل', page: 'allowances-list', icon: 'list', badge: 'allowances' },
        { label: 'الطلبات المعلّقة للنقاش', page: 'pending-discussion', icon: 'bell', badge: null },
        { label: 'استعلام التقارير الطبية', page: '../shared/medical-query', icon: 'search', badge: null },
      ]
    },

    'injury-head': {
      id: 4,
      nameAr: 'رئيس قسم التحقيق في إصابات العمل',
      type: 'internal',
      folder: 'injury-head',
      avatarInitials: 'رق',
      canCheckout: false,
      sidebar: [
        { label: 'لوحة البيانات', page: 'dashboard', icon: 'home', badge: null },
        { label: 'طلبات بدلات الانقطاع عن العمل', page: 'allowances-list', icon: 'list', badge: 'allowances' },
        { label: 'الطلبات المعلّقة للنقاش', page: 'pending-discussion', icon: 'bell', badge: null },
        { label: 'إعادة تخصيص الطلبات', page: 'reassignment', icon: 'switch', badge: null },
        { label: 'استعلام التقارير الطبية', page: '../shared/medical-query', icon: 'search', badge: null },
      ]
    },

    'od-investigator': {
      id: 5,
      nameAr: 'موظف قسم التحقيق في الأمراض المهنية',
      type: 'internal',
      folder: 'od-investigator',
      avatarInitials: 'مأ',
      canCheckout: true,
      sidebar: [
        { label: 'لوحة البيانات', page: 'dashboard', icon: 'home', badge: null },
        { label: 'طلبات بدلات الانقطاع عن العمل', page: 'allowances-list', icon: 'list', badge: 'allowances' },
        { label: 'الطلبات المعلّقة للنقاش', page: 'pending-discussion', icon: 'bell', badge: null },
        { label: 'استعلام التقارير الطبية', page: '../shared/medical-query', icon: 'search', badge: null },
      ]
    },

    'od-head': {
      id: 6,
      nameAr: 'رئيس قسم التحقيق في الأمراض المهنية',
      type: 'internal',
      folder: 'od-head',
      avatarInitials: 'رأ',
      canCheckout: false,
      sidebar: [
        { label: 'لوحة البيانات', page: 'dashboard', icon: 'home', badge: null },
        { label: 'طلبات بدلات الانقطاع عن العمل', page: 'allowances-list', icon: 'list', badge: 'allowances' },
        { label: 'الطلبات المعلّقة للنقاش', page: 'pending-discussion', icon: 'bell', badge: null },
        { label: 'إعادة تخصيص الطلبات', page: 'reassignment', icon: 'switch', badge: null },
        { label: 'استعلام التقارير الطبية', page: '../shared/medical-query', icon: 'search', badge: null },
      ]
    },

    'sickleave-employee': {
      id: 7,
      nameAr: 'موظف قسم الإجازات المرضية',
      type: 'internal',
      folder: 'sickleave-employee',
      avatarInitials: 'مإ',
      canCheckout: true,
      sidebar: [
        { label: 'لوحة البيانات', page: 'dashboard', icon: 'home', badge: null },
        { label: 'طلبات بدلات الانقطاع عن العمل', page: 'allowances-list', icon: 'list', badge: 'allowances' },
        { label: 'الطلبات المعلّقة للنقاش', page: 'pending-discussion', icon: 'bell', badge: null },
        { label: 'استعلام التقارير الطبية', page: '../shared/medical-query', icon: 'search', badge: null },
      ]
    },

    'sickleave-head': {
      id: 8,
      nameAr: 'رئيس قسم الإجازات المرضية',
      type: 'internal',
      folder: 'sickleave-head',
      avatarInitials: 'رإ',
      canCheckout: false,
      sidebar: [
        { label: 'لوحة البيانات', page: 'dashboard', icon: 'home', badge: null },
        { label: 'طلبات بدلات الانقطاع عن العمل', page: 'allowances-list', icon: 'list', badge: 'allowances' },
        { label: 'الطلبات المعلّقة للنقاش', page: 'pending-discussion', icon: 'bell', badge: null },
        { label: 'إعادة تخصيص الطلبات', page: 'reassignment', icon: 'switch', badge: null },
        { label: 'استعلام التقارير الطبية', page: '../shared/medical-query', icon: 'search', badge: null },
      ]
    },

    'disability-employee': {
      id: 9,
      nameAr: 'موظف قسم الإعاقة والأمراض المستديمة',
      type: 'internal',
      folder: 'disability-employee',
      avatarInitials: 'مع',
      canCheckout: true,
      sidebar: [
        { label: 'لوحة البيانات', page: 'dashboard', icon: 'home', badge: null },
        { label: 'طلبات منفعة الإعاقة', page: 'disability-list', icon: 'list', badge: 'disability' },
        { label: 'استعلام بطاقة الإعاقة', page: 'disability-card-query', icon: 'search', badge: null },
        { label: 'الحالات الواردة (الأمراض المستديمة)', page: 'chronic-incoming', icon: 'inbox', badge: 'chronic-incoming' },
        { label: 'طلبات الأمراض المستديمة', page: 'chronic-list', icon: 'list', badge: 'chronic' },
        { label: 'إعادة التقييم الدوري (الأمراض المستديمة)', page: 'chronic-reassessment', icon: 'refresh', badge: 'reassessment' },
        { label: 'استعلامات التقاعد', page: 'disability-retirement-list', icon: 'file', badge: 'retirement' },
        { label: 'استعلام التقارير الطبية', page: '../shared/medical-query', icon: 'search', badge: null },
      ]
    },

    'disability-head': {
      id: 10,
      nameAr: 'رئيس قسم الإعاقة والأمراض المستديمة',
      type: 'internal',
      folder: 'disability-head',
      avatarInitials: 'رع',
      canCheckout: false,
      sidebar: [
        { label: 'لوحة البيانات', page: 'dashboard', icon: 'home', badge: null },
        { label: 'طلبات منفعة الإعاقة', page: 'disability-list', icon: 'list', badge: 'disability' },
        { label: 'استعلام بطاقة الإعاقة', page: 'disability-card-query', icon: 'search', badge: null },
        { label: 'الحالات الواردة (الأمراض المستديمة)', page: 'chronic-incoming', icon: 'inbox', badge: 'chronic-incoming' },
        { label: 'طلبات الأمراض المستديمة', page: 'chronic-list', icon: 'list', badge: 'chronic' },
        { label: 'إعادة التقييم الدوري (الأمراض المستديمة)', page: 'chronic-reassessment', icon: 'refresh', badge: 'reassessment' },
        { label: 'استعلامات التقاعد', page: 'disability-retirement-list', icon: 'file', badge: 'retirement' },
        { label: 'إعادة تخصيص الطلبات', page: 'reassignment', icon: 'switch', badge: null },
        { label: 'استعلام التقارير الطبية', page: '../shared/medical-query', icon: 'search', badge: null },
      ]
    },

    'committees-employee': {
      id: 11,
      nameAr: 'موظف قسم اللجان الطبية',
      type: 'internal',
      folder: 'committees-employee',
      avatarInitials: 'مل',
      canCheckout: true,
      sidebar: [
        { label: 'لوحة البيانات', page: 'dashboard', icon: 'home', badge: null },
        { label: 'طلبات عرض المؤسسات الصحية الواردة', page: 'referrals-list', icon: 'inbox', badge: 'referrals' },
        { label: 'الحالات المحالة للمؤسسات الصحية', page: 'referred-list', icon: 'list', badge: null },
        { label: 'جلسات اللجان الطبية', page: 'sessions-list', icon: 'calendar', badge: null },
        { label: 'قرارات اللجان الطبية', page: 'committee-decisions', icon: 'gavel', badge: 'decisions' },
        { label: 'التظلمات', page: 'appeals-list', icon: 'list', badge: 'appeals' },
        { label: 'جلسات لجنة التظلمات', page: 'appeals-sessions-list', icon: 'calendar', badge: null },
        { label: 'استعلام التقارير الطبية', page: '../shared/medical-query', icon: 'search', badge: null },
      ]
    },

    'committees-head': {
      id: 12,
      nameAr: 'رئيس قسم اللجان الطبية',
      type: 'internal',
      folder: 'committees-head',
      avatarInitials: 'رل',
      canCheckout: false,
      sidebar: [
        { label: 'لوحة البيانات', page: 'dashboard', icon: 'home', badge: null },
        { label: 'طلبات عرض المؤسسات الصحية الواردة', page: 'referrals-list', icon: 'inbox', badge: 'referrals' },
        { label: 'الحالات المحالة للمؤسسات الصحية', page: 'referred-list', icon: 'list', badge: null },
        { label: 'جلسات اللجان الطبية', page: 'sessions-list', icon: 'calendar', badge: null },
        { label: 'قرارات اللجان الطبية', page: 'committee-decisions', icon: 'gavel', badge: 'decisions' },
        { label: 'التظلمات', page: 'appeals-list', icon: 'list', badge: 'appeals' },
        { label: 'جلسات لجنة التظلمات', page: 'appeals-sessions-list', icon: 'calendar', badge: null },
        { label: 'إعادة تخصيص الطلبات', page: 'reassignment', icon: 'switch', badge: null },
        { label: 'استعلام التقارير الطبية', page: '../shared/medical-query', icon: 'search', badge: null },
      ]
    },

    'licensing-employee': {
      id: 13,
      nameAr: 'موظف قسم التراخيص والرقابة',
      type: 'internal',
      folder: 'licensing-employee',
      avatarInitials: 'مت',
      canCheckout: true,
      sidebar: [
        { label: 'لوحة البيانات', page: 'dashboard', icon: 'home', badge: null },
        { label: 'طلبات وتراخيص المؤسسات الصحية', page: 'licensing-list', icon: 'list', badge: 'licensing' },
        { label: 'الزيارات الرقابية للمؤسسات الصحية', page: 'inspections-list', icon: 'clipboard', badge: null },
        { label: 'استعلام التقارير الطبية', page: '../shared/medical-query', icon: 'search', badge: null },
      ]
    },

    'licensing-head': {
      id: 14,
      nameAr: 'رئيس قسم التراخيص والرقابة',
      type: 'internal',
      folder: 'licensing-head',
      avatarInitials: 'رت',
      canCheckout: false,
      sidebar: [
        { label: 'لوحة البيانات', page: 'dashboard', icon: 'home', badge: null },
        { label: 'طلبات وتراخيص المؤسسات الصحية', page: 'licensing-list', icon: 'list', badge: 'licensing' },
        { label: 'الزيارات الرقابية للمؤسسات الصحية', page: 'inspections-list', icon: 'clipboard', badge: null },
        { label: 'إعادة تخصيص الطلبات', page: 'reassignment', icon: 'switch', badge: null },
        { label: 'استعلام التقارير الطبية', page: '../shared/medical-query', icon: 'search', badge: null },
      ]
    },

    'licensed-institution': {
      id: 15,
      nameAr: 'المؤسسة الصحية المرخصة',
      type: 'external',
      folder: 'licensed-institution',
      avatarInitials: 'مص',
      canCheckout: false,
      sidebar: [
        { label: 'لوحة البيانات', page: 'dashboard', icon: 'home', badge: null },
        { label: 'الجلسات الطبية المجدولة', page: 'sessions-list', icon: 'calendar', badge: 'sessions' },
      ]
    },

    'supervisory-committee': {
      id: 16,
      nameAr: 'اللجنة الطبية الإشرافية',
      type: 'external',
      folder: 'supervisory-committee',
      avatarInitials: 'لإ',
      canCheckout: false,
      sidebar: [
        { label: 'لوحة البيانات', page: 'dashboard', icon: 'home', badge: null },
        { label: 'طلبات وتراخيص المؤسسات الصحية', page: 'licensing-list', icon: 'list', badge: 'licensing' },
      ]
    },

    'appeals-committee': {
      id: 17,
      nameAr: 'لجنة التظلمات',
      type: 'external',
      folder: 'appeals-committee',
      avatarInitials: 'لت',
      canCheckout: false,
      sidebar: [
        { label: 'لوحة البيانات', page: 'dashboard', icon: 'home', badge: null },
        { label: 'جلسات التظلمات المجدولة', page: 'sessions-list', icon: 'calendar', badge: 'sessions' },
      ]
    },

    'institution-rapporteur': {
      id: 18,
      nameAr: 'مقرر المؤسسة الصحية المرخصة',
      type: 'internal',
      folder: 'institution-rapporteur',
      avatarInitials: 'مق',
      canCheckout: false,
      sidebar: [
        { label: 'لوحة البيانات', page: 'dashboard', icon: 'home', badge: null },
        { label: 'الجلسات الطبية', page: 'sessions-list', icon: 'calendar', badge: 'sessions' },
        { label: 'التوقيعات المعلّقة (القرارات الطبية)', page: 'signing', icon: 'pen', badge: 'signing' },
      ]
    },

    'appeals-rapporteur': {
      id: 19,
      nameAr: 'مقرر لجنة التظلمات',
      type: 'internal',
      folder: 'appeals-rapporteur',
      avatarInitials: 'قت',
      canCheckout: false,
      sidebar: [
        { label: 'لوحة البيانات', page: 'dashboard', icon: 'home', badge: null },
        { label: 'التظلمات الواردة', page: 'incoming-requests', icon: 'inbox', badge: 'incoming' },
        { label: 'جلسات التظلمات', page: 'sessions-list', icon: 'calendar', badge: 'sessions' },
        { label: 'التوقيعات المعلّقة (قرارات التظلمات)', page: 'signing', icon: 'pen', badge: 'signing' },
      ]
    },

    'supervisory-rapporteur': {
      id: 20,
      nameAr: 'مقرر اللجنة الطبية الإشرافية',
      type: 'internal',
      folder: 'supervisory-rapporteur',
      avatarInitials: 'قإ',
      canCheckout: false,
      sidebar: [
        { label: 'لوحة البيانات', page: 'dashboard', icon: 'home', badge: null },
        { label: 'طلبات الترخيص الواردة', page: 'incoming-requests', icon: 'inbox', badge: 'incoming' },
        { label: 'جلسات اللجنة الإشرافية', page: 'sessions-list', icon: 'calendar', badge: 'sessions' },
        { label: 'التوقيعات المعلّقة (قرارات التراخيص)', page: 'signing', icon: 'pen', badge: 'signing' },
      ]
    },

    'hospital-delegate': {
      id: 21,
      nameAr: 'المفوض عن المستشفيات والمؤسسات الصحية المختلفة',
      type: 'external',
      folder: 'hospital-delegate',
      avatarInitials: 'مس',
      canCheckout: false,
      sidebar: [
        { label: 'لوحة البيانات', page: 'dashboard', icon: 'home', badge: null },
        { label: 'طلبات ترخيص المؤسسة', page: 'licensing-list', icon: 'list', badge: null },
        { label: 'ملف المؤسسة الصحية', page: 'institution-file', icon: 'file', badge: null },
      ]
    },

    'od-committee': {
      id: 22,
      nameAr: 'لجنة الأمراض المهنية',
      type: 'external',
      folder: 'od-committee',
      avatarInitials: 'لأ',
      canCheckout: false,
      sidebar: [
        { label: 'لوحة البيانات', page: 'dashboard', icon: 'home', badge: null },
        { label: 'طلبات الأمراض المهنية الواردة', page: 'requests-list', icon: 'inbox', badge: null },
      ]
    },

    'investigation-director': {
      id: 23,
      nameAr: 'مدير دائرة التحقيق في إصابات العمل والأمراض المهنية',
      type: 'internal',
      folder: 'investigation-director',
      avatarInitials: 'مد',
      canCheckout: false,
      sidebar: [
        { label: 'لوحة البيانات', page: 'dashboard', icon: 'home', badge: null },
        { label: 'تعريف الجهات الخارجية المخولة', page: 'external-entities-list', icon: 'building', badge: null },
        { label: 'مستخدمو الجهات الخارجية', page: 'external-entity-users', icon: 'user', badge: null },
        { label: 'جهات العمل المستثناة', page: 'excluded-employers', icon: 'shield', badge: null },
        { label: 'متابعة أداء الجهات الخارجية', page: 'external-entities-performance', icon: 'chart', badge: null },
      ]
    },

    'external-investigator': {
      id: 24,
      nameAr: 'الجهة الخارجية المخولة بالتحقيق',
      type: 'external',
      folder: 'external-investigator',
      avatarInitials: 'جخ',
      canCheckout: true,
      sidebar: [
        { label: 'لوحة البيانات', page: 'dashboard', icon: 'home', badge: null },
        { label: 'قائمة طلبات التحقيق في إصابات العمل والأمراض المهنية', page: 'allowances-list', icon: 'list', badge: 'allowances' },
      ]
    },

  },

  /* ── ألوان حالات الطلبات ── */
  statusBadges: {
    'مسودة':                                                              'b-draft',
    'تم تقديم الطلب — بانتظار تعيين المحقق المختص':                      'b-submitted',
    'قيد التحقيق — إصابات العمل':                                        'b-invest',
    'قيد التحقيق — الأمراض المهنية':                                     'b-invest',
    'قيد التحقيق — جهة خارجية مخولة':                                    'b-invest',
    'بانتظار اعتماد رئيس قسم التحقيق في إصابات العمل':                   'b-phead',
    'بانتظار اعتماد رئيس قسم التحقيق في الأمراض المهنية':                'b-phead',
    'تم إعادة الطلب لاستيفاء البيانات':                                  'b-returned',
    'قيد المراجعة من موظف قسم الإجازات المرضية':                        'b-sick',
    'بانتظار اعتماد رئيس قسم الإجازات المرضية':                         'b-phead',
    'تم طلب العرض على المؤسسات الصحية المرخصة — بانتظار مراجعة موظف قسم اللجان الطبية': 'b-comm',
    'قيد المراجعة — قسم اللجان الطبية': 'b-comm',
    'بانتظار رأي لجنة الأمراض المهنية':                                    'b-comm',
    'تمت إعادة طلب العرض على المؤسسات الصحية المرخصة لاستيفاء البيانات': 'b-returned',
    'تم الموافقة على العرض على المؤسسات الصحية المرخصة — بانتظار إحالة المقرر': 'b-comm',
    'تم طلب العرض على المؤسسات الصحية المرخصة — بانتظار مراجعة رئيس قسم اللجان الطبية': 'b-phead',
    'تم طلب العرض على المؤسسات الصحية المرخصة — بانتظار مراجعة منسق الإحالات والتحويلات': 'b-comm',
    'تم الإحالة إلى مقرر المؤسسة الصحية المرخصة — بانتظار جدولة جلسة':  'b-referred',
    'تم جدولة جلسة للعرض على المؤسسة الصحية المرخصة':                   'b-session',
    'تم اتخاذ القرار من المؤسسة الصحية المرخصة — بانتظار التنفيذ':       'b-decided',
    'قيد المتابعة لدى منسق الإحالات والتحويلات':                         'b-comm',
    'قيد مراجعة منسق الإحالات والتحويلات':                              'b-comm',
    'تم طلب العرض على المؤسسات الصحية المرخصة — بانتظار مراجعة منسق الإحالات والتحويلات': 'b-submitted',
    'تمت متابعة الحالة مع المؤسسة الصحية — بانتظار انعقاد الجلسة':       'b-session',
    'تم استلام قرار المؤسسة الصحية — بانتظار استكمال التنفيذ':          'b-decided',
    'تم تنفيذ قرار المؤسسة الصحية وإغلاق الإحالة':                       'b-approved',
    'معلّق مؤقتاً':                                                       'b-returned',
    'معلّق مؤقتاً — بانتظار الاستئناف':                                  'b-returned',
    'تم استئناف المعالجة':                                                'b-comm',
    'منفذة':                                                              'b-approved',
    'قيد التنفيذ':                                                        'b-session',
    'معتمد':                                                              'b-approved',
    'تم رفض الطلب':                                                       'b-rejected',
    'تم إغلاق الطلب':                                                     'b-closed',
    'تم تقديم طلب منفعة الأشخاص ذوي الإعاقة — بانتظار مراجعة موظف قسم الإعاقة والأمراض المستديمة': 'b-submitted',
    'تم اعتماد الطلب — الصرف جارٍ':                                      'b-approved',
    'تم إيقاف الصرف — بطاقة الإعاقة منتهية أو ملغاة':                   'b-expired',
    'تم استلام التشخيص من المؤسسة الصحية المعالجة — بانتظار استكمال البيانات من المواطن': 'b-submitted',
    'تم تقديم طلب مرض مستديم — بانتظار مراجعة موظف قسم الإعاقة والأمراض المستديمة': 'b-submitted',
    'تم اعتماد الطلب — الصرف الدوري جارٍ':                               'b-approved',
    'قيد إعادة التقييم الدوري':                                          'b-sick',
    'إقرار عدم الرغبة في الاستمرار':                                      'b-closed',
    'بانتظار مراجعة رئيس قسم الإعاقة والأمراض المستديمة':                'b-phead',
    'تم استلام الاستعلام — بانتظار مراجعة موظف قسم الإعاقة والأمراض المستديمة': 'b-submitted',
    'بانتظار اعتماد رئيس قسم الإعاقة والأمراض المستديمة':                'b-phead',
    'تم إغلاق الاستعلام — مؤهل للتقاعد المبكر':                          'b-approved',
    'تم إغلاق الاستعلام — غير مؤهل للتقاعد المبكر':                      'b-rejected',
    'تم تقديم طلب التظلم — بانتظار مراجعة موظف قسم اللجان الطبية':       'b-submitted',
    'تم إعادة التظلم لاستيفاء البيانات':                                  'b-returned',
    'بانتظار اعتماد رئيس قسم اللجان الطبية':                             'b-phead',
    'تم إحالة التظلم إلى لجنة التظلمات — بانتظار جدولة جلسة':            'b-referred',
    'تم جدولة جلسة لجنة التظلمات':                                       'b-session',
    'تم اتخاذ القرار النهائي من لجنة التظلمات':                           'b-decided',
    'تم إغلاق التظلم':                                                    'b-closed',
    'تم تقديم طلب الترخيص / التجديد — بانتظار مراجعة موظف قسم التراخيص والرقابة': 'b-submitted',
    'تم إعادة الطلب لاستيفاء البيانات':                                   'b-returned',
    'بانتظار اعتماد رئيس قسم التراخيص والرقابة':                         'b-phead',
    'تم إحالة الطلب إلى اللجنة الطبية الإشرافية — بانتظار جدولة جلسة':   'b-referred',
    'تم جدولة جلسة اللجنة الطبية الإشرافية':                             'b-session',
    'تم اتخاذ القرار من اللجنة الطبية الإشرافية — بانتظار تنفيذ القرار':  'b-decided',
    'تم اعتماد الترخيص — الترخيص نشط':                                   'b-approved',
    'تم رفض الطلب':                                                       'b-rejected',
    'انتهت صلاحية الترخيص':                                              'b-expired',
    'مجدولة':                                                             'b-session',
    'منعقدة':                                                             'b-approved',
    'مغلقة':                                                              'b-closed',
    'مؤجلة':                                                              'b-returned',
    'بانتظار إكمال بيانات الجلسة':                                        'b-phead',
  },

  /* ── أنواع الإجراءات المتاحة — يُستخدم لتلوين الأزرار ── */
  actionStyles: {
    'حفظ كمسودة':                      'btn-ghost btn-sm',
    'إرسال الطلب':                     'btn-primary btn-sm',
    'إرسال':                            'btn-primary btn-sm',
    'حذف':                             'btn-danger btn-sm',
    'طلب استيفاء بيانات من مقدم الطلب': 'btn-warning btn-sm',
    'Send request to employer': 'btn-warning btn-sm',
    'Send request to insured': 'btn-warning btn-sm',
    'إعادة الطلب الى جهة العمل': 'btn-warning btn-sm',
    'اعادة الطلب الى المؤمن عليه': 'btn-warning btn-sm',
    'تحويل إلى قسم الأمراض المهنية':   'btn-secondary btn-sm',
    'تحويل إلى قسم إصابات العمل':      'btn-secondary btn-sm',
    'توصية بالموافقة وتوجيه لرئيس القسم': 'btn-accent btn-sm',
    'توصية بالرفض وتوجيه لرئيس القسم':    'btn-danger btn-sm',
    'اعتماد وتوجيه إلى قسم الإجازات المرضية': 'btn-accent btn-sm',
    'إعادة إلى موظف قسم التحقيق':      'btn-warning btn-sm',
    'رفض مع تحديد السبب':              'btn-danger btn-sm',
    'استيفاء البيانات المطلوبة وإعادة الإرسال': 'btn-primary btn-sm',
    'توصية بالموافقة مع ترشيح مؤسسة صحية مرخصة': 'btn-accent btn-sm',
    'توصية بالرفض':                    'btn-danger btn-sm',
    'توجيه إلى رئيس قسم الإجازات المرضية': 'btn-primary btn-sm',
    'إغلاق مع تحديد السبب':           'btn-ghost btn-sm',
    'اعتماد الفترات':                  'btn-accent btn-sm',
    'إعادة إلى موظف قسم الإجازات المرضية': 'btn-warning btn-sm',
    'طلب عرض على مؤسسة صحية مرخصة':   'btn-primary btn-sm',
    'إعادة للاستيفاء':                 'btn-warning btn-sm',
    'توصية برفض الإحالة مع تحديد السبب': 'btn-danger btn-sm',
    'توجيه إلى رئيس قسم اللجان الطبية مع تأكيد اختيار المؤسسة الصحية المرخصة': 'btn-primary btn-sm',
    'إعادة إلى موظف قسم اللجان الطبية': 'btn-warning btn-sm',
    'رفض الإحالة مع تحديد السبب':     'btn-danger btn-sm',
    'توجيه إلى مقرر المؤسسة الصحية المرخصة مع تأكيد المؤسسة المختارة': 'btn-accent btn-sm',
    'جدولة جلسة':                      'btn-primary btn-sm',
    'إعادة إلى موظف قسم اللجان الطبية': 'btn-warning btn-sm',
    'تأكيد حضور أطباء اللجنة':        'btn-secondary btn-sm',
    'إدخال قرار الجلسة':              'btn-primary btn-sm',
    'توقيع إلكتروني على القرار':       'btn-accent btn-sm',
    'التظلم على القرار':               'btn-warning btn-sm',
    'تأكيد تنفيذ القرار':              'btn-accent btn-sm',
    'طلب إضافة فترة جديدة':           'btn-secondary btn-sm',
    'تقديم تظلم':                      'btn-warning btn-sm',
    'اعتماد الطلب':                    'btn-accent btn-sm',
    'إعادة إلى موظف قسم الإعاقة والأمراض المستديمة': 'btn-warning btn-sm',
    'تعليق الصرف عند انتهاء أو إلغاء البطاقة': 'btn-warning btn-sm',
    'تجديد البطاقة والتحقق من وزارة التنمية الاجتماعية ثم تحريك الطلب تلقائياً إلى قيد المراجعة': 'btn-primary btn-sm',
    'إغلاق نهائي':                     'btn-ghost btn-sm',
    'استكمال البيانات وإرسال الطلب':   'btn-primary btn-sm',
    'الإقرار بعدم الرغبة في الاستمرار': 'btn-ghost btn-sm',
    'توجيه إلى رئيس القسم':           'btn-primary btn-sm',
    'توجيه إلى قسم اللجان الطبية':    'btn-secondary btn-sm',
    'جدولة موعد إعادة التقييم الدوري': 'btn-primary btn-sm',
    'تعليق الصرف مؤقتاً':             'btn-warning btn-sm',
    'استعلام نتيجة إعادة التقييم من وزارة الصحة': 'btn-secondary btn-sm',
    'استئناف الصرف بعد التحقق':       'btn-accent btn-sm',
    'إيقاف الصرف نهائياً مع تحديد السبب': 'btn-danger btn-sm',
    'تقديم التظلم':                    'btn-primary btn-sm',
    'إحالة للجنة التظلمات':           'btn-accent btn-sm',
    'رفض مع السبب':                    'btn-danger btn-sm',
    'تنفيذ القرار':                    'btn-accent btn-sm',
    'إحالة للجنة الإشرافية':          'btn-accent btn-sm',
    'تأكيد تنفيذ القرار وإصدار الترخيص': 'btn-accent btn-sm',
    'تقديم طلب تجديد قبل انتهاء الصلاحية': 'btn-primary btn-sm',
    'تقديم طلب جديد':                 'btn-secondary btn-sm',
    'تقديم طلب تجديد':                'btn-primary btn-sm',
    'توجيه الطلب إلى موظف قسم التحقيق': 'btn-accent btn-sm',
    'إعادة الطلب إلى الجهة الخارجية المخولة': 'btn-warning btn-sm'
  },
  /* ── تعيين الحالات لكل دور (المرحلة الحالية) ── */
  roleStages: {
    'external-investigator': ['قيد التحقيق — جهة خارجية مخولة'],
    'investigation-director': [],
    'injury-investigator': ['تم تقديم الطلب — بانتظار تعيين المحقق المختص', 'قيد التحقيق — إصابات العمل', 'تم إعادة الطلب لاستيفاء البيانات'],
    'injury-head': ['بانتظار اعتماد رئيس قسم التحقيق في إصابات العمل'],
    'od-investigator': ['تم تقديم الطلب — بانتظار تعيين المحقق المختص', 'قيد التحقيق — الأمراض المهنية'],
    'od-head': ['بانتظار اعتماد رئيس قسم التحقيق في الأمراض المهنية'],
    'sickleave-employee': ['قيد المراجعة من موظف قسم الإجازات المرضية'],
    'sickleave-head': ['بانتظار اعتماد رئيس قسم الإجازات المرضية'],
    'disability-employee': ['تم تقديم طلب منفعة الأشخاص ذوي الإعاقة — بانتظار مراجعة موظف قسم الإعاقة والأمراض المستديمة'],
    'disability-head': ['بانتظار اعتماد رئيس قسم الإعاقة والأمراض المستديمة', 'بانتظار مراجعة رئيس قسم الإعاقة والأمراض المستديمة'],
    'committees-employee': ['تم طلب العرض على المؤسسات الصحية المرخصة — بانتظار مراجعة موظف قسم اللجان الطبية', 'قيد المراجعة — قسم اللجان الطبية', 'تم تقديم طلب التظلم — بانتظار مراجعة موظف قسم اللجان الطبية', 'تم الموافقة على العرض على المؤسسات الصحية المرخصة — بانتظار إحالة المقرر'],
    'committees-head': ['بانتظار اعتماد رئيس قسم اللجان الطبية', 'تم طلب العرض على المؤسسات الصحية المرخصة — بانتظار مراجعة رئيس قسم اللجان الطبية', 'تم الموافقة على العرض على المؤسسات الصحية المرخصة — بانتظار إحالة المقرر'],
    'licensing-employee': ['تم تقديم طلب الترخيص / التجديد — بانتظار مراجعة موظف قسم التراخيص والرقابة'],
    'licensing-head': ['بانتظار اعتماد رئيس قسم التراخيص والرقابة'],
    'supervisory-committee': ['تم إحالة الطلب إلى اللجنة الطبية الإشرافية — بانتظار جدولة جلسة', 'تم جدولة جلسة اللجنة الطبية الإشرافية', 'تم اتخاذ القرار من اللجنة الطبية الإشرافية — بانتظار تنفيذ القرار'],
    'institution-rapporteur': ['مجدولة', 'بانتظار إكمال بيانات الجلسة'],
    'od-committee': ['بانتظار رأي لجنة الأمراض المهنية'],
    'referral-coordinator': ['تم طلب العرض على المؤسسات الصحية المرخصة — بانتظار مراجعة منسق الإحالات والتحويلات', 'قيد مراجعة منسق الإحالات والتحويلات', 'قيد المتابعة لدى منسق الإحالات والتحويلات', 'تمت متابعة الحالة مع المؤسسة الصحية — بانتظار انعقاد الجلسة', 'تم استلام قرار المؤسسة الصحية — بانتظار استكمال التنفيذ', 'معلّق مؤقتاً — بانتظار الاستئناف'],
  }
};
