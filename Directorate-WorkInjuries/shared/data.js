/* ================================================================
   data.js — بيانات العينة الواقعية (Main Data File)
   ================================================================ */

/* ================================================================
   Import from modular data files (Global Scope)
   These files are loaded as regular scripts and make data available globally
   ================================================================ */

// Note: Variables are already declared in modular data files
// We access them directly from window object to avoid redeclaration conflicts

/* ================================================================
   Main Data Object
   ================================================================ */

const WI_DATA = {
  /* ── المستخدمون ── */
  users: window.USERS_DATA || {},

  /* ── طلبات بدلات الانقطاع عن العمل ── */
  allowances: window.ALLOWANCES_DATA || [],

  /* ── الجهات الخارجية المخولة بالتحقيق ── */
  externalEntities: window.EXTERNAL_ENTITIES_DATA || [],
  externalEntityUsers: window.EXTERNAL_ENTITY_USERS_DATA || [],
  entityNotes: window.ENTITY_NOTES_DATA || [],
  excludedEmployers: window.EXCLUDED_EMPLOYERS_DATA || [],
  molShares: window.MOL_SHARES_DATA || [],

  /* ── طلبات منفعة الإعاقة ── */
  disability: window.DISABILITY_DATA || [],

  /* ── طلبات الأمراض المستديمة ── */
  chronic: window.CHRONIC_DATA || [],

  /* ── التشخيصات الواردة للأمراض المستديمة ── */
  chronicIncoming: window.CHRONIC_INCOMING_DATA || [],

  /* ── طلبات التظلم ── */
  appeals: window.APPEALS_DATA || [],

  /* ── طلبات الترخيص والتجديد ── */
  licensing: window.LICENSING_DATA || [],

  /* ── جلسات اللجان الطبية ── */
  sessions: window.SESSIONS_DATA || [],

  /* ── استعلامات تقاعد الأشخاص ذوي الإعاقة ── */
  disabilityRetirement: window.DISABILITY_RETIREMENT_DATA || [],

  /* ── طلبات العرض على المؤسسات الصحية المرخصة ── */
  referrals: window.REFERRALS_DATA || [],

  /* ── مؤشرات لوحات البيانات ── */
  dashboardStats: {
    'external-investigator': [
      { label: 'الطلبات المعروضة ضمن نطاق الاختصاص', value: 2, type: 'p' },
      { label: 'الطلبات التي حجزتها', value: 1, type: 'i' },
      { label: 'طلبات وجّهتها إلى قسم التحقيق', value: 1, type: 's' },
      { label: 'طلبات أُعيدت إلى الجهة بملاحظة', value: 0, type: 'w' },
    ],
    'investigation-director': [
      { label: 'الجهات الخارجية المخولة النشطة', value: 1, type: 'p' },
      { label: 'مستخدمو الجهات الخارجية النشطون', value: 3, type: 'i' },
      { label: 'جهات العمل المستثناة', value: 1, type: 'w' },
      { label: 'طلبات لدى الجهات الخارجية حالياً', value: 1, type: 's' },
    ],
    'injury-investigator': [
      { label: 'الطلبات الجديدة في انتظار التحقيق', value: 7, type: 'p' },
      { label: 'الطلبات التي حجزتها (حجز الطلب)', value: 3, type: 'i' },
      { label: 'طلبات مُعادة لي من الرئيس', value: 1, type: 'd' },
      { label: 'طلبات أرسلتها للرئيس هذا الأسبوع', value: 5, type: 's' },
    ],
    'injury-head': [
      { label: 'بانتظار قراري', value: 5, type: 'p' },
      { label: 'طلبات اعتمدتها هذا الشهر', value: 18, type: 's' },
      { label: 'طلبات رُفضت هذا الشهر', value: 2, type: 'd' },
      { label: 'طلبات أعدتها للموظفين', value: 3, type: 'w' },
    ],
    'od-investigator': [
      { label: 'الطلبات الجديدة في انتظار التحقيق', value: 4, type: 'p' },
      { label: 'الطلبات التي حجزتها', value: 1, type: 'i' },
      { label: 'حالات محالة للجنة الأمراض المهنية', value: 1, type: 'w' },
      { label: 'زيارات ميدانية مجدولة', value: 2, type: 's' },
    ],
    'od-head': [
      { label: 'طلبات بانتظار اعتمادي', value: 3, type: 'p' },
      { label: 'طلبات اعتمدتها هذا الشهر', value: 7, type: 's' },
      { label: 'طلبات رُفضت هذا الشهر', value: 1, type: 'd' },
      { label: 'طلبات محالة للجنة الأمراض المهنية', value: 1, type: 'w' },
    ],
    'sickleave-employee': [
      { label: 'الطلبات قيد المراجعة', value: 10, type: 'p' },
      { label: 'فترات إجازة أضفتها هذا الأسبوع', value: 12, type: 's' },
      { label: 'طلبات في انتظار استعلام وزارة الصحة', value: 4, type: 'i' },
      { label: 'طلبات محالة للجان الطبية', value: 2, type: 'pu' },
    ],
    'sickleave-head': [
      { label: 'فترات إجازة بانتظار اعتمادي', value: 6, type: 'p' },
      { label: 'إجمالي الأيام المعتمدة هذا الشهر', value: 145, type: 's' },
      { label: 'طلبات مُعادة للمراجعة', value: 2, type: 'w' },
      { label: 'متوسط وقت المعالجة (أيام)', value: 1.5, type: 'i' },
    ],
    'disability-employee': [
      { label: 'طلبات منفعة الإعاقة الجديدة', value: 6, type: 'p' },
      { label: 'حالات أمراض مستديمة واردة', value: 3, type: 'i' },
      { label: 'طلبات بانتظار الاعتماد', value: 8, type: 'w' },
      { label: 'حالات إعادة تقييم مستحقة', value: 5, type: 'd' },
    ],
    'disability-head': [
      { label: 'طلبات بانتظار اعتمادي', value: 8, type: 'p' },
      { label: 'طلبات اعتمدتها هذا الشهر', value: 12, type: 's' },
      { label: 'طلبات رُفضت هذا الشهر', value: 1, type: 'd' },
      { label: 'حالات إعادة تقييم معتمدة', value: 4, type: 'w' },
    ],
    'committees-employee': [
      { label: 'طلبات قيد المراجعة', value: 15, type: 'p' },
      { label: 'جلسات مجدولة هذا الأسبوع', value: 4, type: 's' },
      { label: 'طلبات محالة للجلسات', value: 8, type: 'pu' },
      { label: 'طلبات تظلم واردة', value: 3, type: 'i' },
    ],
    'committees-head': [
      { label: 'طلبات بانتظار اعتمادي', value: 10, type: 'p' },
      { label: 'جلسات اعتمدتها هذا الشهر', value: 6, type: 's' },
      { label: 'طلبات رُفضت هذا الشهر', value: 2, type: 'd' },
      { label: 'طلبات تظلم معتمدة', value: 3, type: 'w' },
    ],
    'licensing-employee': [
      { label: 'طلبات ترخيص جديدة', value: 5, type: 'p' },
      { label: 'طلبات تجديد', value: 3, type: 's' },
      { label: 'طلبات بانتظار المراجعة', value: 7, type: 'w' },
      { label: 'تراخيص تنتهي قريباً', value: 2, type: 'd' },
    ],
    'licensing-head': [
      { label: 'طلبات بانتظار اعتمادي', value: 6, type: 'p' },
      { label: 'تراخيص اعتمدتها هذا الشهر', value: 4, type: 's' },
      { label: 'طلبات رُفضت هذا الشهر', value: 1, type: 'd' },
      { label: 'تراخيص تجديدت', value: 2, type: 'w' },
    ],
    'referral-coordinator': [
      { label: 'الإحالات الواردة اليوم', value: 12, type: 'p' },
      { label: 'القرارات المعلقة', value: 5, type: 'w' },
      { label: 'التظلمات الجديدة', value: 3, type: 'd' },
      { label: 'الإحالات المنفذة هذا الأسبوع', value: 28, type: 's' },
    ],
  },
};

function firstDefined(...values) {
  return values.find((value) => value !== undefined && value !== null && value !== '');
}

const allowanceTemplateRef = window.ALLOWANCE_TEMPLATE || {};
const appealTemplateRef = window.APPEAL_TEMPLATE || {};
const chronicTemplateRef = window.CHRONIC_TEMPLATE || {};
const disabilityTemplateRef = window.DISABILITY_TEMPLATE || {};
const disabilityRetirementTemplateRef = window.DISABILITY_RETIREMENT_TEMPLATE || {};
const licensingTemplateRef = window.LICENSING_TEMPLATE || {};
const referralTemplateRef = window.REFERRAL_TEMPLATE || {};

const createAllowanceRecord = typeof window.createAllowanceRequest === 'function'
  ? window.createAllowanceRequest
  : (data = {}) => ({ ...allowanceTemplateRef, ...data });
const createAppealRecord = typeof window.createAppealRequest === 'function'
  ? window.createAppealRequest
  : (data = {}) => ({ ...appealTemplateRef, ...data });
const createChronicRecord = typeof window.createChronicRequest === 'function'
  ? window.createChronicRequest
  : (data = {}) => ({ ...chronicTemplateRef, ...data });
const createDisabilityRecord = typeof window.createDisabilityRequest === 'function'
  ? window.createDisabilityRequest
  : (data = {}) => ({ ...disabilityTemplateRef, ...data });
const createDisabilityRetirementRecord = typeof window.createDisabilityRetirementInquiry === 'function'
  ? window.createDisabilityRetirementInquiry
  : (data = {}) => ({ ...disabilityRetirementTemplateRef, ...data });
const createLicensingRecord = typeof window.createLicensingRequest === 'function'
  ? window.createLicensingRequest
  : (data = {}) => ({ ...licensingTemplateRef, ...data });
const createReferralRecord = typeof window.createDirectReferralRequest === 'function'
  ? window.createDirectReferralRequest
  : (data = {}) => ({ ...referralTemplateRef, ...data });
const createSessionRecord = typeof window.createSession === 'function'
  ? window.createSession
  : (data = {}) => ({ ...(window.SESSION_TEMPLATE || {}), ...data });

function ensureText(value, fallback = 'غير متوفر') {
  return firstDefined(value, fallback);
}

function ensureNumber(value, fallback = 0) {
  return typeof value === 'number' && !Number.isNaN(value) ? value : fallback;
}

function ensureBoolean(value, fallback = false) {
  return typeof value === 'boolean' ? value : fallback;
}

function addDays(dateText, days = 7) {
  if (!dateText) return '';
  const base = new Date(dateText);
  if (Number.isNaN(base.getTime())) return '';
  base.setDate(base.getDate() + days);
  return base.toISOString().slice(0, 10);
}

function datePart(dateTimeText) {
  if (!dateTimeText) return '';
  return String(dateTimeText).split(' ')[0];
}

function buildBranch(branch = {}, employer = {}) {
  return {
    id: ensureText(branch?.id, `BR-${String(employer?.cr || '0000').slice(-4)}`),
    name: ensureText(branch?.name, employer?.location ? `فرع ${employer.location}` : 'الفرع الرئيسي'),
    state: ensureText(branch?.state, employer?.location || 'غير محدد'),
    governorate: ensureText(branch?.governorate, employer?.location || 'غير محدد'),
  };
}

function normalizeAttachment(att = {}, index = 0, defaults = {}) {
  const ext = ensureText(att.icon, 'pdf') === 'file' ? 'pdf' : ensureText(att.icon, 'pdf');
  return {
    id: ensureText(att.id, `${defaults.prefix || 'att'}-${index + 1}`),
    type: ensureText(att.type, defaults.type || 'مستند داعم'),
    name: ensureText(att.name, `${defaults.namePrefix || 'مرفق'}_${index + 1}.pdf`),
    uploadDate: ensureText(att.uploadDate, defaults.uploadDate || defaults.baseDate || '2025-01-01'),
    uploadedBy: ensureText(att.uploadedBy, defaults.uploadedBy || 'النظام'),
    role: ensureText(att.role, defaults.role || 'نظام'),
    size: ensureText(att.size, defaults.size || '0.8 MB'),
    icon: ext,
  };
}

function ensureMinimumAttachments(attachments = [], defaults = {}) {
  const normalized = (Array.isArray(attachments) ? attachments : []).map((att, index) => normalizeAttachment(att, index, defaults));
  while (normalized.length < 2) {
    normalized.push(normalizeAttachment({}, normalized.length, {
      ...defaults,
      type: normalized.length === 0 ? (defaults.type || 'مستند أساسي') : (defaults.secondaryType || 'مستند داعم'),
      namePrefix: defaults.namePrefix || 'مرفق',
    }));
  }
  return normalized;
}

function normalizeSickLeavePeriods(periods = [], context = {}) {
  const source = Array.isArray(periods) && periods.length ? periods : [{
    from: context.baseDate || context.incidentDate || '2025-01-01',
    to: addDays(context.baseDate || context.incidentDate || '2025-01-01', 14),
    days: 14,
    reason: 'فترة علاجية مبدئية',
  }];

  return source.map((period, index) => ({
    from: ensureText(period.from, context.baseDate || context.incidentDate || '2025-01-01'),
    to: ensureText(period.to, addDays(period.from || context.baseDate || '2025-01-01', 14)),
    days: ensureNumber(period.days, 14),
    reason: ensureText(period.reason, 'إجازة مرضية مرتبطة بالحالة'),
    status: ensureText(period.status, index === 0 ? 'معتمدة' : 'قيد الدراسة'),
    addedBy: ensureText(period.addedBy, context.addedBy || 'موظف قسم الإجازات المرضية'),
    addedDate: ensureText(period.addedDate, context.addedDate || context.baseDate || '2025-01-01'),
  }));
}

function normalizeSuspendResumeFields(record = {}) {
  record.suspended = ensureBoolean(record.suspended, false);
  record.suspensionReason = ensureText(record.suspensionReason, 'لا يوجد');
  record.suspensionNotes = ensureText(record.suspensionNotes, 'لا توجد ملاحظات');
  record.suspendedBy = ensureText(record.suspendedBy, 'غير منطبق');
  record.suspendedDate = ensureText(record.suspendedDate, datePart(record.lastUpdate || record.submitDate || record.receivedDate) || '2025-01-01');
  record.resumedBy = ensureText(record.resumedBy, 'غير منطبق');
  record.resumedDate = ensureText(record.resumedDate, datePart(record.lastUpdate || record.submitDate || record.receivedDate) || '2025-01-01');
  return record;
}

function normalizeAllowanceRequest(record = {}) {
  const req = createAllowanceRecord(record);
  req.isRelapse = ensureText(req.isRelapse, 'لا');
  req.lastUpdatedBy = ensureText(req.lastUpdatedBy, req.assignedTo || req.checkedOutBy || 'النظام');
  req.expectedClosureDate = ensureText(req.expectedClosureDate, addDays(req.submitDate, 14));
  req.remainingDays = ensureNumber(req.remainingDays, 7);
  req.applicant.region = ensureText(req.applicant.region, 'محافظة مسقط');
  req.applicant.wilayat = ensureText(req.applicant.wilayat, 'السيب');
  req.applicant.country = ensureText(req.applicant.country, 'سلطنة عُمان');
  req.applicant.civilExpiry = ensureText(req.applicant.civilExpiry, addDays(req.submitDate, 365 * 3));
  req.applicant.employeeId = ensureText(req.applicant.employeeId, `EMP-${String(req.applicant.civil || req.id).slice(-4)}`);
  req.insured.civilExpiry = ensureText(req.insured.civilExpiry, req.applicant.civilExpiry);
  req.employer.phone = ensureText(req.employer.phone, '96824000000');
  req.employer.branch = buildBranch(req.employer.branch, req.employer);
  req.injury.caseType = ensureText(req.injury.caseType, req.type);
  req.injury.description = ensureText(req.injury.description, req.injury.caseDescription || `تم توثيق ${req.type} وإرفاق البيانات الداعمة للحالة.`);
  req.injury.insuredStatus = ensureText(req.injury.insuredStatus, 'على رأس العمل');
  const workCase = req.type === 'إصابة عمل';
  if (workCase) {
    req.injury.location = ensureText(req.injury.location, req.employer.location || 'موقع العمل الرئيسي');
    req.injury.bodyPart = ensureText(req.injury.bodyPart, 'الطرف العلوي');
    req.injury.witnesses = ensureText(req.injury.witnesses, 'نعم');
    req.injury.witnessNames = ensureText(req.injury.witnessNames, 'زميل مباشر بالموقع');
    req.injury.incidentDate = ensureText(req.injury.incidentDate, req.submitDate);
    req.injury.accidentDirection = ensureText(req.injury.accidentDirection, 'أثناء تنفيذ مهام العمل');
    req.injury.caseDescription = ensureText(req.injury.caseDescription, 'غير منطبق');
    req.injury.chemicalAgents = ensureText(req.injury.chemicalAgents, 'غير منطبق');
    req.injury.exposureDuration = ensureText(req.injury.exposureDuration, 'غير منطبق');
    req.injury.firstSuspicion = ensureText(req.injury.firstSuspicion, req.submitDate);
    req.injury.workEnvironment = ensureText(req.injury.workEnvironment, 'غير منطبق');
  } else {
    req.injury.location = ensureText(req.injury.location, 'غير منطبق');
    req.injury.bodyPart = ensureText(req.injury.bodyPart, 'غير منطبق');
    req.injury.witnesses = ensureText(req.injury.witnesses, 'غير منطبق');
    req.injury.witnessNames = ensureText(req.injury.witnessNames, 'غير منطبق');
    req.injury.incidentDate = ensureText(req.injury.incidentDate, req.submitDate);
    req.injury.accidentDirection = ensureText(req.injury.accidentDirection, 'غير منطبق');
    req.injury.caseDescription = ensureText(req.injury.caseDescription, req.injury.description);
    req.injury.chemicalAgents = ensureText(req.injury.chemicalAgents, 'مواد مهيجة في بيئة العمل');
    req.injury.exposureDuration = ensureText(req.injury.exposureDuration, 'سنتان');
    req.injury.firstSuspicion = ensureText(req.injury.firstSuspicion, req.submitDate);
    req.injury.workEnvironment = ensureText(req.injury.workEnvironment, req.employer.location || 'بيئة عمل مغلقة');
  }
  req.investigation = {
    ...(allowanceTemplateRef.investigation || {}),
    ...(req.investigation || {}),
    summary: ensureText(req.investigation?.summary, 'تمت مراجعة الطلب والتحقق من المستندات الأولية للحالة.'),
    findings: ensureText(req.investigation?.findings, 'البيانات متوافقة مع السجلات الأساسية للمؤمن عليه وجهة العمل.'),
    employeeRecommendation: ensureText(req.investigation?.employeeRecommendation, 'قيد التقييم'),
    employeeNotes: ensureText(req.investigation?.employeeNotes, 'لا توجد ملاحظات إضافية حالياً.'),
    headDecision: ensureText(req.investigation?.headDecision, 'لم يصدر بعد'),
    headNotes: ensureText(req.investigation?.headNotes, 'بانتظار مراجعة رئيس القسم.'),
  };
  req.referral = {
    ...(allowanceTemplateRef.referral || {}),
    ...(req.referral || {}),
    institution: ensureText(req.referral?.institution, 'مؤسسة صحية مرخصة معتمدة'),
    rapporteur: ensureText(req.referral?.rapporteur, 'سيتم التحديد عند الإحالة'),
    referralDate: ensureText(req.referral?.referralDate, datePart(req.lastUpdate) || req.submitDate),
    date: ensureText(req.referral?.date, req.referral?.referralDate || datePart(req.lastUpdate) || req.submitDate),
    reason: ensureText(req.referral?.reason, 'استكمال التقييم الطبي والفني للحالة عند الحاجة.'),
    referrer: ensureText(req.referral?.referrer, req.lastUpdatedBy),
    notes: ensureText(req.referral?.notes, 'لا توجد ملاحظات إضافية على الإحالة.'),
  };
  req.session = {
    ...(allowanceTemplateRef.session || {}),
    ...(req.session || {}),
    id: ensureText(req.session?.id, `SES-${String(req.id).slice(-4)}`),
    institution: ensureText(req.session?.institution, req.referral.institution),
    date: ensureText(req.session?.date, addDays(req.submitDate, 10)),
    time: ensureText(req.session?.time, '10:00'),
    quorum: ensureBoolean(req.session?.quorum, true),
    members: Array.isArray(req.session?.members) && req.session.members.length ? req.session.members : [{ name: 'عضو اللجنة الطبي', specialty: 'طب مهني', role: 'رئيس', attendance: 'مجدول' }],
  };
  req.committeeDecision = {
    ...(allowanceTemplateRef.committeeDecision || {}),
    ...(req.committeeDecision || {}),
    type: ensureText(req.committeeDecision?.type, 'لم يصدر قرار بعد'),
    date: ensureText(req.committeeDecision?.date, addDays(req.submitDate, 12)),
    disabilityPercent: typeof req.committeeDecision?.disabilityPercent === 'number' ? req.committeeDecision.disabilityPercent : 0,
    sickLeavePeriod: ensureText(req.committeeDecision?.sickLeavePeriod, 'لم تحدد'),
    content: ensureText(req.committeeDecision?.content, 'بانتظار استكمال المسار النظامي قبل إصدار القرار النهائي.'),
    signatories: Array.isArray(req.committeeDecision?.signatories) && req.committeeDecision.signatories.length ? req.committeeDecision.signatories : ['عضو اللجنة الطبي'],
  };
  req.disbursement = {
    ...(allowanceTemplateRef.disbursement || {}),
    ...(req.disbursement || {}),
    status: ensureText(req.disbursement?.status, 'قيد الاحتساب'),
    periods: ensureNumber(req.disbursement?.periods, 0),
    totalDays: ensureNumber(req.disbursement?.totalDays, 0),
    totalAmount: typeof req.disbursement?.totalAmount === 'number' ? req.disbursement.totalAmount : 0,
    lastDisbursement: ensureText(req.disbursement?.lastDisbursement, req.submitDate),
    nextDisbursement: ensureText(req.disbursement?.nextDisbursement, addDays(req.submitDate, 30)),
    stopReason: ensureText(req.disbursement?.stopReason, 'لا يوجد'),
  };
  req.sickLeavePeriods = normalizeSickLeavePeriods(req.sickLeavePeriods, {
    baseDate: req.submitDate,
    incidentDate: req.injury.incidentDate,
    addedBy: req.assignedTo || 'موظف قسم الإجازات المرضية',
    addedDate: datePart(req.lastUpdate) || req.submitDate,
  });
  req.attachments = ensureMinimumAttachments(req.attachments, {
    prefix: `att-${req.id}`,
    namePrefix: `مرفقات_${req.id}`,
    uploadDate: req.submitDate,
    uploadedBy: req.applicant?.name || req.insured?.name || 'النظام',
    role: req.applicant?.role || 'العامل',
    type: 'مستند أساسي',
    secondaryType: 'مستند داعم',
    icon: 'pdf',
  });
  req.returnReason = ensureText(req.returnReason, 'لا يوجد');
  return normalizeSuspendResumeFields(req);
}

function normalizeAppealRequest(record = {}) {
  const req = createAppealRecord(record);
  req.lastUpdatedBy = ensureText(req.lastUpdatedBy, req.assignedTo || 'النظام');
  req.expectedClosureDate = ensureText(req.expectedClosureDate, addDays(req.submitDate, 21));
  req.remainingDays = ensureNumber(req.remainingDays, 12);
  req.employer.sector = ensureText(req.employer.sector, 'القطاع الخاص');
  req.employer.employerType = ensureText(req.employer.employerType, 'خاص');
  req.employer.branch = buildBranch(req.employer.branch, req.employer);
  req.additionalNotes = ensureText(req.additionalNotes, 'لا توجد ملاحظات إضافية.');
  req.session = {
    ...(appealTemplateRef.session || {}),
    ...(req.session || {}),
    id: ensureText(req.session?.id, `APP-SES-${String(req.id).slice(-4)}`),
    institution: ensureText(req.session?.institution, 'لجنة التظلمات'),
    date: ensureText(req.session?.date, addDays(req.submitDate, 8)),
    time: ensureText(req.session?.time, '11:00'),
    quorum: ensureBoolean(req.session?.quorum, true),
    members: Array.isArray(req.session?.members) && req.session.members.length ? req.session.members : [{ name: 'عضو لجنة التظلمات', specialty: 'قانوني', role: 'عضو', attendance: 'مجدول' }],
  };
  req.finalDecision = {
    ...(appealTemplateRef.finalDecision || {}),
    ...(req.finalDecision || {}),
    type: ensureText(req.finalDecision?.type, 'لم يصدر قرار نهائي بعد'),
    date: ensureText(req.finalDecision?.date, addDays(req.submitDate, 15)),
    content: ensureText(req.finalDecision?.content, 'بانتظار نظر لجنة التظلمات في الملف واستكمال المتطلبات.'),
    signatories: Array.isArray(req.finalDecision?.signatories) && req.finalDecision.signatories.length ? req.finalDecision.signatories : ['عضو لجنة التظلمات'],
    effect: ensureText(req.finalDecision?.effect, 'لا يوجد أثر تنفيذي حتى تاريخه'),
  };
  req.attachments = ensureMinimumAttachments(req.attachments, {
    prefix: `att-${req.id}`,
    namePrefix: `مرفقات_${req.id}`,
    uploadDate: req.submitDate,
    uploadedBy: req.applicant?.name || 'النظام',
    role: req.applicant?.role || 'مقدم التظلم',
    type: 'مستند التظلم',
    secondaryType: 'تقرير داعم',
    icon: 'pdf',
  });
  return normalizeSuspendResumeFields(req);
}

function normalizeChronicRequest(record = {}) {
  const req = createChronicRecord(record);
  req.lastUpdatedBy = ensureText(req.lastUpdatedBy, req.assignedTo || 'النظام');
  req.expectedClosureDate = ensureText(req.expectedClosureDate, addDays(req.submitDate, 14));
  req.remainingDays = ensureNumber(req.remainingDays, 9);
  req.disbursement = {
    ...(chronicTemplateRef.disbursement || {}),
    ...(req.disbursement || {}),
    approved: ensureBoolean(req.disbursement?.approved, false),
    approvalDate: ensureText(req.disbursement?.approvalDate, req.submitDate),
    monthlyDay: ensureNumber(req.disbursement?.monthlyDay, 25),
    status: ensureText(req.disbursement?.status, 'قيد المراجعة'),
    expiryDate: ensureText(req.disbursement?.expiryDate, addDays(req.submitDate, 365)),
    stopReason: ensureText(req.disbursement?.stopReason, 'لا يوجد'),
    lastCheck: ensureText(req.disbursement?.lastCheck, datePart(req.lastUpdate) || req.submitDate),
  };
  req.referral = {
    institution: ensureText(req.referral?.institution, 'مؤسسة صحية مرخصة'),
    reason: ensureText(req.referral?.reason, 'يستخدم عند الحاجة لعرض الحالة على مؤسسة صحية خاصة.'),
    date: ensureText(req.referral?.date, req.submitDate),
    notes: ensureText(req.referral?.notes, 'لا توجد ملاحظات إحالة حالياً.'),
  };
  req.session = {
    id: ensureText(req.session?.id, `CHR-SES-${String(req.id).slice(-4)}`),
    institution: ensureText(req.session?.institution, 'لجنة الأمراض المستديمة'),
    date: ensureText(req.session?.date, addDays(req.submitDate, 7)),
    time: ensureText(req.session?.time, '10:30'),
    quorum: ensureBoolean(req.session?.quorum, true),
    members: Array.isArray(req.session?.members) && req.session.members.length ? req.session.members : ['عضو لجنة طبية'],
  };
  req.committeeDecision = {
    type: ensureText(req.committeeDecision?.type, 'لم يصدر قرار بعد'),
    date: ensureText(req.committeeDecision?.date, addDays(req.submitDate, 10)),
    content: ensureText(req.committeeDecision?.content, 'بانتظار تقييم اللجنة الطبية المختصة.'),
  };
  req.attachments = ensureMinimumAttachments(req.attachments, {
    prefix: `att-${req.id}`,
    namePrefix: `مرفقات_${req.id}`,
    uploadDate: req.submitDate,
    uploadedBy: req.applicant?.name || 'النظام',
    role: req.applicant?.role || 'المواطن',
    type: 'تقرير طبي',
    secondaryType: 'نتائج فحوصات',
    icon: 'pdf',
  });
  return req;
}

function normalizeDisabilityRequest(record = {}) {
  const req = createDisabilityRecord(record);
  req.lastUpdatedBy = ensureText(req.lastUpdatedBy, req.assignedTo || 'النظام');
  req.expectedClosureDate = ensureText(req.expectedClosureDate, addDays(req.submitDate, 10));
  req.remainingDays = ensureNumber(req.remainingDays, 6);
  req.card.lastCheck = ensureText(req.card.lastCheck, datePart(req.lastUpdate) || req.submitDate);
  req.disbursement = {
    ...(disabilityTemplateRef.disbursement || {}),
    ...(req.disbursement || {}),
    approved: ensureBoolean(req.disbursement?.approved, false),
    approvalDate: ensureText(req.disbursement?.approvalDate, req.submitDate),
    monthlyDay: ensureNumber(req.disbursement?.monthlyDay, 25),
    status: ensureText(req.disbursement?.status, 'قيد المراجعة'),
    expiryDate: ensureText(req.disbursement?.expiryDate, req.card.expiryDate),
    stopReason: ensureText(req.disbursement?.stopReason, 'لا يوجد'),
    lastCheck: ensureText(req.disbursement?.lastCheck, req.card.lastCheck),
  };
  req.attachments = ensureMinimumAttachments(req.attachments, {
    prefix: `att-${req.id}`,
    namePrefix: `مرفقات_${req.id}`,
    uploadDate: req.submitDate,
    uploadedBy: req.applicant?.name || 'النظام',
    role: req.applicant?.role || 'المواطن',
    type: 'صورة بطاقة الإعاقة',
    secondaryType: 'تقرير طبي',
    icon: 'pdf',
  });
  return normalizeSuspendResumeFields(req);
}

function normalizeDisabilityRetirementInquiry(record = {}) {
  const req = createDisabilityRetirementRecord(record);
  req.lastUpdatedBy = ensureText(req.lastUpdatedBy, req.assignedTo || 'النظام');
  req.expectedClosureDate = ensureText(req.expectedClosureDate, addDays(req.receivedDate, 5));
  req.remainingDays = ensureNumber(req.remainingDays, 3);
  req.employeeRecommendation = {
    type: ensureText(req.employeeRecommendation?.type, 'قيد الدراسة'),
    date: ensureText(req.employeeRecommendation?.date, req.receivedDate),
    issuer: ensureText(req.employeeRecommendation?.issuer, req.assignedTo || 'موظف القسم'),
    details: ensureText(req.employeeRecommendation?.details, 'بانتظار استكمال دراسة الملف وإصدار التوصية.'),
    retirementEligible: ensureBoolean(req.employeeRecommendation?.retirementEligible, false),
  };
  req.headDecision = {
    type: ensureText(req.headDecision?.type, 'بانتظار الاعتماد'),
    date: ensureText(req.headDecision?.date, datePart(req.lastUpdate) || req.receivedDate),
    issuer: ensureText(req.headDecision?.issuer, 'رئيس القسم المختص'),
    details: ensureText(req.headDecision?.details, 'لم يصدر القرار النهائي بعد.'),
    retirementEligible: ensureBoolean(req.headDecision?.retirementEligible, false),
  };
  req.closedBy = ensureText(req.closedBy, 'غير منطبق');
  req.closedDate = ensureText(req.closedDate, req.expectedClosureDate);
  req.workflowType = ensureText(req.workflowType, 'disabilityRetirement');
  req.slaDays = ensureNumber(req.slaDays, 5);
  req.decision = {
    ...(disabilityRetirementTemplateRef.decision || {}),
    ...(req.decision || {}),
    type: ensureText(req.decision?.type, 'قيد المراجعة'),
    date: ensureText(req.decision?.date, req.expectedClosureDate),
    issuer: ensureText(req.decision?.issuer, 'قسم الإعاقة والأمراض المستديمة'),
    details: ensureText(req.decision?.details, 'لم يصدر القرار النهائي بعد.'),
    retirementEligible: ensureBoolean(req.decision?.retirementEligible, false),
    retirementDate: ensureText(req.decision?.retirementDate, req.retirementDate || req.expectedClosureDate),
    pensionAmount: typeof req.decision?.pensionAmount === 'number' ? req.decision.pensionAmount : 0,
  };
  req.attachments = ensureMinimumAttachments(req.attachments, {
    prefix: `att-${req.id}`,
    namePrefix: `مرفقات_${req.id}`,
    uploadDate: req.receivedDate,
    uploadedBy: req.applicant?.name || 'نظام المستحقات',
    role: 'نظام',
    type: 'بطاقة إعاقة',
    secondaryType: 'تقرير طبي',
    icon: 'pdf',
  });
  return normalizeSuspendResumeFields(req);
}

function normalizeLicensingRequest(record = {}) {
  const req = createLicensingRecord(record);
  req.lastUpdatedBy = ensureText(req.lastUpdatedBy, req.assignedTo || 'النظام');
  req.expectedClosureDate = ensureText(req.expectedClosureDate, addDays(req.submitDate, 14));
  req.remainingDays = ensureNumber(req.remainingDays, 8);
  req.institution.crExpiry = ensureText(req.institution.crExpiry, addDays(req.submitDate, 365));
  req.institution.currentLicenseNo = ensureText(req.institution.currentLicenseNo, req.requestType === 'تجديد' ? `LIC-${String(req.id).slice(-4)}` : 'طلب جديد');
  req.verification = {
    ...(licensingTemplateRef.verification || {}),
    ...(req.verification || {}),
    totalDoctors: ensureNumber(req.verification?.totalDoctors, Array.isArray(req.doctors) ? req.doctors.length : 0),
    confirmedDoctors: ensureNumber(req.verification?.confirmedDoctors, Array.isArray(req.doctors) ? req.doctors.length : 0),
    minMet: ensureBoolean(req.verification?.minMet, (Array.isArray(req.doctors) ? req.doctors.length : 0) >= 3),
    duplicates: Array.isArray(req.verification?.duplicates) ? req.verification.duplicates : [],
  };
  req.session = {
    id: ensureText(req.session?.id, `LIC-SES-${String(req.id).slice(-4)}`),
    institution: ensureText(req.session?.institution, req.institution.name),
    date: ensureText(req.session?.date, addDays(req.submitDate, 9)),
    time: ensureText(req.session?.time, '11:00'),
    quorum: ensureBoolean(req.session?.quorum, true),
    members: Array.isArray(req.session?.members) && req.session.members.length ? req.session.members : ['عضو اللجنة الطبية الإشرافية'],
  };
  req.committeeDecision = {
    type: ensureText(req.committeeDecision?.type, 'بانتظار قرار اللجنة'),
    date: ensureText(req.committeeDecision?.date, addDays(req.submitDate, 11)),
    content: ensureText(req.committeeDecision?.content, 'سيتم تحديث القرار بعد انعقاد اللجنة الطبية الإشرافية.'),
    signatories: Array.isArray(req.committeeDecision?.signatories) ? req.committeeDecision.signatories : [],
  };
  req.activeLicense = {
    number: ensureText(req.activeLicense?.number, `LIC-INST-${String(req.id).slice(-4)}`),
    issueDate: ensureText(req.activeLicense?.issueDate, req.submitDate),
    expiryDate: ensureText(req.activeLicense?.expiryDate, addDays(req.submitDate, 365 * 3)),
    months: ensureNumber(req.activeLicense?.months, 36),
  };
  req.attachments = ensureMinimumAttachments(req.attachments, {
    prefix: `att-${req.id}`,
    namePrefix: `مرفقات_${req.id}`,
    uploadDate: req.submitDate,
    uploadedBy: req.delegate?.name || 'النظام',
    role: req.delegate?.role || 'المفوض',
    type: 'السجل التجاري',
    secondaryType: 'مستند ترخيص',
    icon: 'pdf',
  });
  return normalizeSuspendResumeFields(req);
}

function normalizeReferralRequest(record = {}) {
  const req = createReferralRecord(record);
  req.checkedOutBy = ensureText(req.checkedOutBy, 'غير محجوز');
  req.expectedClosureDate = ensureText(req.expectedClosureDate, addDays(req.submitDate, req.slaDays || 7));
  req.remainingDays = ensureNumber(req.remainingDays, 5);
  req.assignedInstitution = ensureText(req.assignedInstitution, req.referral?.preferredInstitution || 'مؤسسة صحية مرخصة');
  req.assignedCommittee = ensureText(req.assignedCommittee, 'قسم اللجان الطبية');
  req.sessionId = ensureText(req.sessionId, `REF-SES-${String(req.id).slice(-4)}`);
  req.sessionDate = ensureText(req.sessionDate, addDays(req.submitDate, 6));
  req.decisionDate = ensureText(req.decisionDate, addDays(req.submitDate, 8));
  req.committeeDecision = {
    type: ensureText(req.committeeDecision?.type, 'بانتظار قرار اللجنة'),
    date: ensureText(req.committeeDecision?.date, req.decisionDate),
    summary: ensureText(req.committeeDecision?.summary, 'سيتم تحديث القرار بعد دراسة الملف.'),
    executionStatus: ensureText(req.committeeDecision?.executionStatus, 'قيد المتابعة'),
    executed: ensureBoolean(req.committeeDecision?.executed, false),
  };
  req.suspensionReason = ensureText(req.suspensionReason, 'لا يوجد');
  req.suspensionNotes = ensureText(req.suspensionNotes, 'لا توجد ملاحظات');
  req.suspendedBy = ensureText(req.suspendedBy, 'غير منطبق');
  req.suspendedDate = ensureText(req.suspendedDate, req.submitDate);
  req.resumedBy = ensureText(req.resumedBy, 'غير منطبق');
  req.resumedDate = ensureText(req.resumedDate, req.submitDate);
  req.attachments = ensureMinimumAttachments(req.attachments, {
    prefix: `att-${req.id}`,
    namePrefix: `مرفقات_${req.id}`,
    uploadDate: req.submitDate,
    uploadedBy: req.applicant?.name || 'النظام',
    role: req.applicant?.role || 'مقدم الطلب',
    type: 'تقرير طبي',
    secondaryType: 'خطاب داعم',
    icon: 'file',
  });
  return req;
}

function normalizeSessionRecord(record = {}) {
  const session = createSessionRecord(record);
  session.minutes = ensureText(session.minutes, 'تم إنشاء الجلسة ولم يدوّن المحضر بعد.');
  return session;
}

function normalizeAllSeedData() {
  WI_DATA.allowances = (WI_DATA.allowances || []).map(normalizeAllowanceRequest);
  WI_DATA.appeals = (WI_DATA.appeals || []).map(normalizeAppealRequest);
  WI_DATA.chronic = (WI_DATA.chronic || []).map(normalizeChronicRequest);
  WI_DATA.disability = (WI_DATA.disability || []).map(normalizeDisabilityRequest);
  WI_DATA.disabilityRetirement = (WI_DATA.disabilityRetirement || []).map(normalizeDisabilityRetirementInquiry);
  WI_DATA.licensing = (WI_DATA.licensing || []).map(normalizeLicensingRequest);
  WI_DATA.referrals = (WI_DATA.referrals || []).map(normalizeReferralRequest);
  WI_DATA.sessions = (WI_DATA.sessions || []).map(normalizeSessionRecord);

  window.ALLOWANCES_DATA = WI_DATA.allowances;
  window.APPEALS_DATA = WI_DATA.appeals;
  window.CHRONIC_DATA = WI_DATA.chronic;
  window.DISABILITY_DATA = WI_DATA.disability;
  window.DISABILITY_RETIREMENT_DATA = WI_DATA.disabilityRetirement;
  window.LICENSING_DATA = WI_DATA.licensing;
  window.REFERRALS_DATA = WI_DATA.referrals;
  window.SESSIONS_DATA = WI_DATA.sessions;
}

normalizeAllSeedData();

function ensureDemoCheckedOutCoverage() {
  const users = WI_DATA.users || {};
  const byId = (collection, id) => (collection || []).find((item) => item.id === id) || null;
  const assignCheckout = (record, userKey, extras = {}) => {
    const user = users[userKey];
    if (!record || !user) return;
    record.checkedOutBy = user.name;
    if (!record.assignedTo) record.assignedTo = user.name;
    Object.assign(record, extras);
  };

  // Internal operational roles that should always open at least one actionable record
  // already under their responsibility during prototype walkthroughs.
  assignCheckout(byId(WI_DATA.allowances, 'WI-2025-001198'), 'injury_head', {
    assignedTo: users.injury_head?.name || null,
  });
  assignCheckout(byId(WI_DATA.allowances, 'WI-2025-001243'), 'od_head', {
    assignedTo: users.od_head?.name || null,
  });
  assignCheckout(byId(WI_DATA.allowances, 'WI-2025-001245'), 'sickleave_head', {
    assignedTo: users.sickleave_head?.name || null,
  });
  assignCheckout(byId(WI_DATA.referrals, 'REF-2025-000123'), 'referral_coordinator', {
    assignedTo: users.referral_coordinator?.name || null,
  });

  // Committee / rapporteur walkthrough coverage
  assignCheckout(byId(WI_DATA.allowances, 'WI-2025-001246'), 'od_committee', {
    assignedTo: users.od_committee?.name || null,
  });
  assignCheckout(byId(WI_DATA.appeals, 'APP-2025-000069'), 'appeals_rapporteur', {
    assignedTo: users.appeals_rapporteur?.name || null,
  });
  assignCheckout(byId(WI_DATA.licensing, 'LIC-2025-001606'), 'supervisory_rapporteur', {
    assignedTo: users.supervisory_rapporteur?.name || null,
  });
  assignCheckout(byId(WI_DATA.sessions, 'SES-2025-0112'), 'institution_rapporteur');
  assignCheckout(byId(WI_DATA.sessions, 'SES-2025-0115'), 'licensed_institution');
  assignCheckout(byId(WI_DATA.sessions, 'SES-2025-0101'), 'supervisory_committee');
  assignCheckout(byId(WI_DATA.sessions, 'SES-2025-0120'), 'appeals_committee');
  assignCheckout(byId(WI_DATA.licensing, 'LIC-2025-001605'), 'hospital_delegate');

  // Sample requests to demonstrate "mark for discussion" capability on related internal pages.
  const discussionSeeds = [
    { id: 'WI-2025-001198', reason: 'الحالة تحتاج مناقشة التوصية قبل اعتماد رئيس القسم.' },
    { id: 'WI-2025-001243', reason: 'يوجد جانب فني يحتاج رأياً جماعياً قبل قرار رئيس القسم.' },
    { id: 'WI-2025-001245', reason: 'مراجعة فترات الإجازة المرضية تستدعي مناقشة داخلية.' },
  ];
  discussionSeeds.forEach(({ id, reason }) => {
    const record = byId(WI_DATA.allowances, id);
    if (!record) return;
    record.discussionFlagged = true;
    record.discussionReason = reason;
  });
}

ensureDemoCheckedOutCoverage();

/* ================================================================
   Make data available globally for browser loading
   ================================================================ */

// Main data object
window.WI_DATA = WI_DATA;

// Templates (already available from modular files, but ensure they exist)
if (!window.ALLOWANCE_TEMPLATE) window.ALLOWANCE_TEMPLATE = {};
if (!window.DISABILITY_TEMPLATE) window.DISABILITY_TEMPLATE = {};
if (!window.CHRONIC_TEMPLATE) window.CHRONIC_TEMPLATE = {};
if (!window.APPEAL_TEMPLATE) window.APPEAL_TEMPLATE = {};
if (!window.LICENSING_TEMPLATE) window.LICENSING_TEMPLATE = {};
if (!window.SESSION_TEMPLATE) window.SESSION_TEMPLATE = {};
if (!window.DISABILITY_RETIREMENT_TEMPLATE) window.DISABILITY_RETIREMENT_TEMPLATE = {};

// Data arrays (already available from modular files, but ensure they exist)
if (!window.USERS_DATA) window.USERS_DATA = {};
if (!window.ALLOWANCES_DATA) window.ALLOWANCES_DATA = [];
if (!window.DISABILITY_DATA) window.DISABILITY_DATA = [];
if (!window.CHRONIC_DATA) window.CHRONIC_DATA = [];
if (!window.CHRONIC_INCOMING_DATA) window.CHRONIC_INCOMING_DATA = [];
if (!window.APPEALS_DATA) window.APPEALS_DATA = [];
if (!window.LICENSING_DATA) window.LICENSING_DATA = [];
if (!window.SESSIONS_DATA) window.SESSIONS_DATA = [];
if (!window.DISABILITY_RETIREMENT_DATA) window.DISABILITY_RETIREMENT_DATA = [];
if (!window.REFERRALS_DATA) window.REFERRALS_DATA = [];

// User functions (already available from modular files, but ensure they exist)
if (!window.getUserByRole) window.getUserByRole = () => null;
if (!window.getAllUsers) window.getAllUsers = () => [];
if (!window.validateUserData) window.validateUserData = () => ({ isValid: true, errors: [] });

// Allowance functions (already available from modular files, but ensure they exist)
if (!window.createAllowanceRequest) window.createAllowanceRequest = () => ({});
if (!window.validateAllowanceRequest) window.validateAllowanceRequest = () => ({ isValid: true, errors: [] });
if (!window.getAllowanceById) window.getAllowanceById = () => null;
if (!window.getAllowancesByStatus) window.getAllowancesByStatus = () => [];
if (!window.getAllowancesByType) window.getAllowancesByType = () => [];

// Disability functions (already available from modular files, but ensure they exist)
if (!window.createDisabilityRequest) window.createDisabilityRequest = () => ({});
if (!window.validateDisabilityRequest) window.validateDisabilityRequest = () => ({ isValid: true, errors: [] });
if (!window.getDisabilityById) window.getDisabilityById = () => null;
if (!window.getDisabilitiesByStatus) window.getDisabilitiesByStatus = () => [];
if (!window.isCardExpiringSoon) window.isCardExpiringSoon = () => false;

// Chronic functions (already available from modular files, but ensure they exist)
if (!window.createChronicRequest) window.createChronicRequest = () => ({});
if (!window.validateChronicRequest) window.validateChronicRequest = () => ({ isValid: true, errors: [] });
if (!window.getChronicById) window.getChronicById = () => null;
if (!window.getChronicByStatus) window.getChronicByStatus = () => [];
if (!window.isReassessmentDue) window.isReassessmentDue = () => false;

// Appeal functions (already available from modular files, but ensure they exist)
if (!window.createAppealRequest) window.createAppealRequest = () => ({});
if (!window.validateAppealRequest) window.validateAppealRequest = () => ({ isValid: true, errors: [] });
if (!window.getAppealById) window.getAppealById = () => null;
if (!window.getAppealsByOriginalRequestId) window.getAppealsByOriginalRequestId = () => [];
if (!window.getAppealsByStatus) window.getAppealsByStatus = () => [];
if (!window.checkAppealDeadline) window.checkAppealDeadline = () => ({ isValid: true, daysRemaining: 0 });

// Licensing functions (already available from modular files, but ensure they exist)
if (!window.createLicensingRequest) window.createLicensingRequest = () => ({});
if (!window.validateLicensingRequest) window.validateLicensingRequest = () => ({ isValid: true, errors: [] });
if (!window.getLicensingById) window.getLicensingById = () => null;
if (!window.getLicensingByStatus) window.getLicensingByStatus = () => [];
if (!window.getLicensingByType) window.getLicensingByType = () => [];
if (!window.isMinDoctorsMet) window.isMinDoctorsMet = () => true;
if (!window.checkDuplicateDoctors) window.checkDuplicateDoctors = () => false;

// Session functions (already available from modular files, but ensure they exist)
if (!window.createSession) window.createSession = () => ({});
if (!window.validateSession) window.validateSession = () => ({ isValid: true, errors: [] });
if (!window.getSessionById) window.getSessionById = () => null;
if (!window.getSessionsByStatus) window.getSessionsByStatus = () => [];
if (!window.getSessionsByInstitution) window.getSessionsByInstitution = () => [];
if (!window.hasQuorum) window.hasQuorum = () => true;
if (!window.getSessionCompletionPercentage) window.getSessionCompletionPercentage = () => 0;
if (!window.isSessionUpcoming) window.isSessionUpcoming = () => false;
if (!window.isSessionToday) window.isSessionToday = () => false;

// Disability retirement functions (already available from modular files, but ensure they exist)
if (!window.createDisabilityRetirementInquiry) window.createDisabilityRetirementInquiry = () => ({});
if (!window.validateDisabilityRetirementInquiry) window.validateDisabilityRetirementInquiry = () => ({ isValid: true, errors: [] });
if (!window.getDisabilityRetirementById) window.getDisabilityRetirementById = () => null;
if (!window.getDisabilityRetirementByStatus) window.getDisabilityRetirementByStatus = () => [];
if (!window.isRetirementInquiryApproachingDeadline) window.isRetirementInquiryApproachingDeadline = () => false;
