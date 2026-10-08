/* ================================================================
   data-allowances.js — طلبات بدلات الانقطاع عن العمل
   ================================================================ */

/* ================================================================
   Standard Template for Work Injury Allowances Request
   ================================================================ */

const ALLOWANCE_TEMPLATE = {
  // Basic Request Information
  id: '', // Unique request identifier (e.g., 'WI-2025-001234')
  type: '', // Request type: 'إصابة عمل' or 'مرض مهني'
  subtype: '', // Specific subtype
  isRelapse: '', // Relapse indicator: 'نعم' or 'لا'
  status: '', // Current status
  submitDate: '', // Submission date (YYYY-MM-DD)
  lastUpdate: '', // Last update date and time
  lastUpdatedBy: '', // Last updater name
  expectedClosureDate: '', // Expected closure date
  remainingDays: null, // Remaining days until closure

  // Applicant Information
  applicant: {
    name: '', // Full name
    civil: '', // Civil ID number
    role: '', // Role
    phone: '', // Phone number
    email: '', // Email address
    region: '', // Region
    wilayat: '', // Wilayat
    country: '', // Country
    civilExpiry: '', // Civil ID expiry date
    employeeId: '', // Employee ID (if applicable)
  },

  // Insured Person Information
  insured: {
    name: '', // Full name
    civil: '', // Civil ID number
    insurance: '', // Insurance number
    dob: '', // Date of birth
    gender: '', // Gender: 'ذكر' or 'أنثى'
    nationality: '', // Nationality
    insuranceStatus: '', // Insurance status
    regDate: '', // Registration date
    subType: '', // Subscription type
    phone: '', // Phone number
    email: '', // Email address
    civilExpiry: '', // Civil ID expiry date
  },

  // Employer Information
  employer: {
    name: '', // Name of employer
    cr: '', // Commercial registration number
    establishment: '', // Establishment number
    jobTitle: '', // Job title
    joinDate: '', // Date of joining
    location: '', // Work location
    sector: '', // Sector
    employerType: '', // Employer type
    branch: { // Branch information
      id: '', // Branch ID
      name: '', // Branch name
      state: '', // State
      governorate: '', // Governorate
    },
    phone: '', // Employer phone number
  },

  // Injury/Disease Information
  injury: {
    // For Work Injury
    caseType: '', // Type of case
    description: '', // Detailed description
    location: '', // Location where incident occurred
    bodyPart: '', // Body part injured
    witnesses: '', // Witnesses indicator
    witnessNames: '', // Names of witnesses
    incidentDate: '', // Date of incident
    insuredStatus: '', // Status of insured person
    accidentDirection: '', // Direction of accident

    // For Occupational Disease
    caseDescription: '', // Description of disease case
    chemicalAgents: '', // Chemical agents or causative factors
    exposureDuration: '', // Duration of occupational exposure
    firstSuspicion: '', // Date of first suspicion
    workEnvironment: '', // Description of work environment
  },

  // Investigation Report
  investigation: {
    summary: '', // Summary of investigation
    findings: '', // Findings from data verification
    employeeRecommendation: '', // Employee recommendation
    employeeNotes: '', // Notes from employee
    headDecision: '', // Decision from section head
    headNotes: '', // Notes from section head
  },

  // Field Visits
  // Each visit: { date, time, reason, staff, summary, results, attachments,
  //               locationType ('branch' | 'map'), branchId, branchName, coordinates,
  //               interviewees, notes, checklist: { 'CL-1': 'نعم' | 'لا' | 'لا ينطبق', ... } }
  fieldVisits: [], // Array of field visit objects

  // External authorised investigation entity
  externalEntity: null, // { entityId, entityName, checkedOutBy, checkedOutDate, slaDays, elapsedDays, submittedDate, returnCount, lastReturnNote }

  // Ministry of Labour sharing
  molShare: null, // { eligible, shared, sharedDate, sharedBy, shareId }

  // Sick Leave Periods
  sickLeavePeriods: [], // Array of sick leave period objects

  // Referral Information
  referral: {
    institution: '', // Name of licensed health institution
    rapporteur: '', // Name of rapporteur
    referralDate: '', // Date of referral
    reason: '', // Reason for referral
    referrer: '', // Referring entity
    notes: '', // Referral notes
  },

  // Session Information
  session: {
    id: '', // Session ID
    institution: '', // Health institution name
    date: '', // Session date
    time: '', // Session time
    quorum: false, // Quorum status
    members: [], // Array of committee members
  },

  // Committee Decision
  committeeDecision: {
    type: '', // Decision type
    date: '', // Decision date
    disabilityPercent: null, // Disability percentage
    sickLeavePeriod: '', // Recommended sick leave period
    content: '', // Detailed decision content
    signatories: [], // Array of signing member names
  },

  // Disbursement Information
  disbursement: {
    status: '', // Disbursement status
    periods: null, // Number of approved periods
    totalDays: null, // Total number of days
    totalAmount: null, // Total amount due
    lastDisbursement: '', // Date of last disbursement
    nextDisbursement: '', // Date of next disbursement
    stopReason: '', // Reason for stopping
  },

  // Attachments
  attachments: [], // Array of attachment objects

  // Notes
  notes: [], // Array of note objects

  // Timeline
  timeline: [], // Array of timeline event objects with structure: { action, actor, role, time, fromStatus, toStatus, note, type, phone (optional - for employee contact) }

  // Assignment Information
  assignedTo: '', // Name of assigned person
  checkedOutBy: '', // Name of person who checked out

  // Suspend/Resume Information
  suspended: false, // Whether request is currently suspended
  suspensionReason: '', // Reason for suspension
  suspensionNotes: '', // Additional notes about suspension
  suspendedBy: '', // Name of person who suspended the request
  suspendedDate: '', // Date when request was suspended
  resumedBy: '', // Name of person who resumed the request
  resumedDate: '', // Date when request was resumed

  // Return Information (for returned requests)
  returnReason: '', // Reason for returning request
};

/* ================================================================
   Helper Functions for Allowances Data
   ================================================================ */

/**
 * Create a new allowance request with default structure
 * @param {object} data - Request data to override defaults
 * @returns {object} Complete allowance request object
 */
function createAllowanceRequest(data = {}) {
  return {
    ...ALLOWANCE_TEMPLATE,
    ...data,
    applicant: { ...ALLOWANCE_TEMPLATE.applicant, ...data.applicant },
    insured: { ...ALLOWANCE_TEMPLATE.insured, ...data.insured },
    employer: { ...ALLOWANCE_TEMPLATE.employer, ...data.employer },
    injury: { ...ALLOWANCE_TEMPLATE.injury, ...data.injury },
    investigation: data.investigation ? { ...ALLOWANCE_TEMPLATE.investigation, ...data.investigation } : null,
    referral: data.referral ? { ...ALLOWANCE_TEMPLATE.referral, ...data.referral } : null,
    session: data.session ? { ...ALLOWANCE_TEMPLATE.session, ...data.session } : null,
    committeeDecision: data.committeeDecision ? { ...ALLOWANCE_TEMPLATE.committeeDecision, ...data.committeeDecision } : null,
    disbursement: data.disbursement ? { ...ALLOWANCE_TEMPLATE.disbursement, ...data.disbursement } : null,
  };
}

/**
 * Validate allowance request data
 * @param {object} request - Request object to validate
 * @returns {object} Validation result with isValid and errors array
 */
function validateAllowanceRequest(request) {
  const errors = [];

  // Required fields
  if (!request.id || typeof request.id !== 'string') {
    errors.push('Request ID is required and must be a string');
  }

  if (!request.type || !['إصابة عمل', 'مرض مهني'].includes(request.type)) {
    errors.push('Request type must be either "إصابة عمل" or "مرض مهني"');
  }

  if (!request.status || typeof request.status !== 'string') {
    errors.push('Request status is required and must be a string');
  }

  if (!request.submitDate || typeof request.submitDate !== 'string') {
    errors.push('Submit date is required and must be a string');
  }

  // Applicant validation
  if (!request.applicant || !request.applicant.name) {
    errors.push('Applicant name is required');
  }

  if (!request.applicant || !request.applicant.civil) {
    errors.push('Applicant civil ID is required');
  }

  // Insured validation
  if (!request.insured || !request.insured.name) {
    errors.push('Insured name is required');
  }

  if (!request.insured || !request.insured.civil) {
    errors.push('Insured civil ID is required');
  }

  // Employer validation
  if (!request.employer || !request.employer.name) {
    errors.push('Employer name is required');
  }

  if (!request.employer || !request.employer.cr) {
    errors.push('Employer CR number is required');
  }

  // Injury validation
  if (!request.injury || !request.injury.caseType) {
    errors.push('Injury case type is required');
  }

  if (!request.injury || !request.injury.description) {
    errors.push('Injury description is required');
  }

  // Type-specific validation
  if (request.type === 'إصابة عمل') {
    if (!request.injury.incidentDate) {
      errors.push('Incident date is required for work injury requests');
    }
  } else if (request.type === 'مرض مهني') {
    if (!request.injury.firstSuspicion) {
      errors.push('First suspicion date is required for occupational disease requests');
    }
  }

  return {
    isValid: errors.length === 0,
    errors: errors
  };
}

/**
 * Get allowance request by ID
 * @param {string} id - Request ID
 * @param {array} allowances - Array of allowance requests
 * @returns {object|null} Request object or null if not found
 */
function getAllowanceById(id, allowances) {
  return allowances.find(req => req.id === id) || null;
}

/**
 * Get allowance requests by type
 * @param {string} type - Request type ('إصابة عمل' or 'مرض مهني')
 * @param {array} allowances - Array of allowance requests
 * @returns {array} Filtered array of requests
 */
function getAllowancesByType(type, allowances) {
  return allowances.filter(req => req.type === type);
}

/**
 * Get allowance requests by status
 * @param {string} status - Request status
 * @param {array} allowances - Array of allowance requests
 * @returns {array} Filtered array of requests
 */
function getAllowancesByStatus(status, allowances) {
  return allowances.filter(req => req.status === status);
}

/* ================================================================
   Sample Data - Work Injury Allowances
   ================================================================ */

const ALLOWANCES_DATA = [
  {
    id: 'WI-2025-001234',
    type: 'إصابة عمل',
    subtype: 'حادث طريق',
    isRelapse: 'لا',
    status: 'قيد التحقيق — إصابات العمل',
    submitDate: '2025-01-10',
    lastUpdate: '2025-01-12 09:45',
    lastUpdatedBy: null,
    expectedClosureDate: null,
    remainingDays: null,
    applicant: { name: 'سالم بن ناصر الحارثي', civil: '9012345678', role: 'العامل / المؤمن عليه / المواطن', phone: '96898765432', email: 'salem.h@gmail.com', region: null, wilayat: null, country: null, civilExpiry: null, employeeId: null },
    insured: { name: 'سالم بن ناصر الحارثي', civil: '9012345678', insurance: 'IN-20190045678', dob: '1985-06-15', gender: 'ذكر', nationality: 'عُماني', insuranceStatus: 'نشط', regDate: '2019-03-01', subType: 'إلزامي', phone: '96898765432', email: 'salem.h@gmail.com', civilExpiry: null },
    employer: { name: 'مجموعة النور للإنشاءات ش.م.م', cr: '1234567', establishment: 'EST-0087654', jobTitle: 'مهندس مدني', joinDate: '2019-03-01', location: 'مسقط — الخوض', sector: 'الإنشاءات والمقاولات', employerType: 'خاص', branch: { id: 'BR-001', name: 'الفرع الرئيسي', state: 'مسقط', governorate: 'بوشر' }, phone: null },
    injury: { caseType: 'حادث طريق', description: 'تعرّض العامل لحادث مروري أثناء توجهه من محل إقامته إلى موقع العمل الصباح الباكر على طريق السيب — الخوض، إذ اصطدمت سيارته بمركبة أخرى أدت إلى إصابته في الكتف الأيسر وكسر في الضلوع.', location: 'طريق السيب — الخوض، أمام بوابة المنطقة الصناعية', bodyPart: 'الكتف الأيسر والضلوع', witnesses: 'نعم', witnessNames: 'محمد بن سالم الريامي — زميل عمل', incidentDate: '2025-01-09', insuredStatus: 'تحت العلاج', accidentDirection: 'السكن الدائم إلى مقر العمل', caseDescription: null, chemicalAgents: null, exposureDuration: null, firstSuspicion: null, workEnvironment: null },
    investigation: null,
    fieldVisits: [],
    sickLeavePeriods: [],
    referral: null,
    session: null,
    committeeDecision: null,
    disbursement: null,
    attachments: [
      { id: 'att1', type: 'تقرير طبي أولي', name: 'تقرير_مستشفى_خولة.pdf', uploadDate: '2025-01-10', uploadedBy: 'سالم الحارثي', role: 'العامل', size: '1.2 MB', icon: 'pdf' },
      { id: 'att2', type: 'تقرير الشرطة', name: 'تقرير_شرطة_السيب.pdf', uploadDate: '2025-01-10', uploadedBy: 'سالم الحارثي', role: 'العامل', size: '0.8 MB', icon: 'pdf' },
      { id: 'att3', type: 'كشف حضور وانصراف', name: 'كشف_الحضور_يناير.pdf', uploadDate: '2025-01-10', uploadedBy: 'سالم الحارثي', role: 'العامل', size: '0.5 MB', icon: 'pdf' },
    ],
    notes: [
      { id: 'n1', author: 'سالم الحارثي', role: 'العامل', text: 'تم إرفاق جميع المستندات المطلوبة. أرجو سرعة المعالجة نظراً للوضع الصحي.', time: '2025-01-10 10:30' }
    ],
    timeline: [
      { action: 'تم تقديم الطلب', actor: 'سالم بن ناصر الحارثي', role: 'العامل', time: '2025-01-10 10:15', fromStatus: '', toStatus: 'تم تقديم الطلب — بانتظار تعيين المحقق المختص', note: '', type: 'default' },
      { action: 'تم توجيه الطلب لقسم التحقيق في إصابات العمل', actor: 'النظام', role: 'آلي', time: '2025-01-10 10:16', fromStatus: 'تم تقديم الطلب — بانتظار تعيين المحقق المختص', toStatus: 'قيد التحقيق — إصابات العمل', note: 'تم توجيهه تلقائياً بناءً على نوع الطلب', type: 'default' },
      { action: 'تم حجز الطلب', actor: 'عائشة بنت محمد الرواحي', role: 'موظف قسم التحقيق في إصابات العمل', time: '2025-01-12 09:45', fromStatus: 'قيد التحقيق — إصابات العمل', toStatus: 'قيد التحقيق — إصابات العمل', note: '', type: 'default' },
    ],
    assignedTo: 'عائشة بنت محمد الرواحي',
    checkedOutBy: 'عائشة بنت محمد الرواحي',
    returnReason: null,
  },
  {
    id: 'WI-2025-001198',
    type: 'إصابة عمل',
    subtype: 'إصابة في موقع العمل',
    isRelapse: 'لا',
    status: 'بانتظار اعتماد رئيس قسم التحقيق في إصابات العمل',
    submitDate: '2025-01-05',
    lastUpdate: '2025-01-14 14:20',
    lastUpdatedBy: null,
    expectedClosureDate: null,
    remainingDays: null,
    applicant: { name: 'حمد بن سلطان العزري', civil: '9023456789', role: 'العامل / المؤمن عليه / المواطن', phone: '96899876543', email: 'hamad.a@mail.com', region: null, wilayat: null, country: null, civilExpiry: null, employeeId: null },
    insured: { name: 'حمد بن سلطان العزري', civil: '9023456789', insurance: 'IN-20170056789', dob: '1982-11-20', gender: 'ذكر', nationality: 'عُماني', insuranceStatus: 'نشط', regDate: '2017-07-01', subType: 'إلزامي', phone: '96899876543', email: 'hamad.a@mail.com', civilExpiry: null },
    employer: { name: 'شركة عُمان للحديد والصلب', cr: '2345678', establishment: 'EST-0054321', jobTitle: 'فني تشغيل آلات', joinDate: '2017-07-01', location: 'صحار — المنطقة الصناعية', sector: 'الإنشاءات والمقاولات', employerType: 'خاص', branch: { id: 'BR-001', name: 'الفرع الرئيسي', state: 'مسقط', governorate: 'بوشر' }, phone: null },
    injury: { caseType: 'إصابة في موقع العمل', description: 'أثناء تشغيل ماكينة القطع الثقيلة، انزلقت قطعة معدنية وأصابت يد العامل اليمنى مما أدى إلى كسر في أصابع السبابة والوسطى.', location: 'قاعة الإنتاج الرئيسية — خط إنتاج 3', bodyPart: 'اليد اليمنى', witnesses: 'نعم', witnessNames: 'سعيد بن خميس المحرزي — مشرف الإنتاج', incidentDate: '2025-01-04', insuredStatus: 'تحت العلاج', accidentDirection: null, caseDescription: null, chemicalAgents: null, exposureDuration: null, firstSuspicion: null, workEnvironment: null },
    investigation: {
      summary: 'بعد مراجعة المستندات المقدمة والاطلاع على تقرير السلامة والصحة المهنية وإفادة المشرف المباشر، تبيّن أن الحادثة وقعت أثناء ساعات العمل الرسمية وفي موقع العمل المعتمد. وأن العامل كان يؤدي مهامه الوظيفية المعتادة. لا يوجد ما يشير إلى إهمال أو مخالفة للتعليمات.',
      findings: 'الحادثة مستوفية لشروط إصابة العمل وفقاً للمادة (4) من اللائحة. لا توجد مؤشرات على تعمّد الإصابة أو تناول مواد مؤثرة على الوعي.',
      employeeRecommendation: 'موافقة',
      employeeNotes: 'يوصى بإحالة الطلب لقسم الإجازات المرضية بعد اعتماد رئيس القسم.',
      headNotes: null,
      headDecision: null,
    },
    fieldVisits: [
      { date: '2025-01-08', time: '10:00', reason: 'معاينة موقع الحادثة والتحقق من ملابسات الواقعة', staff: 'عائشة بنت محمد الرواحي، سليم بن راشد الغيلاني', locationType: 'branch', branchId: 'BR-001', branchName: 'الفرع الرئيسي — مسقط (بوشر)', coordinates: '', interviewees: 'مشرف الوردية، مسؤول السلامة بالمنشأة', summary: 'تم الاطلاع على موقع الحادثة وفحص الآلة المسببة للإصابة. تبيّن أن الآلة في وضع تشغيل اعتيادي وأن لوحات التحذير موجودة.', results: 'لا توجد مخالفات واضحة لمعايير السلامة في الموقع. الإصابة ناجمة عن ظرف طارئ غير متوقع.', notes: 'لوحات التحذير غير مكتملة في محيط الآلة، ولم يُسجل الحادث في سجل حوادث المنشأة.', checklist: { 'CL-1': 'نعم', 'CL-2': 'نعم', 'CL-3': 'لا', 'CL-4': 'نعم', 'CL-5': 'نعم', 'CL-6': 'نعم', 'CL-7': 'لا' }, attachments: ['صور_موقع_الحادثة.zip'] }
    ],
    sickLeavePeriods: [],
    referral: null,
    session: null,
    committeeDecision: null,
    disbursement: null,
    attachments: [
      { id: 'att4', type: 'تقرير طبي أولي', name: 'تقرير_مشفى_صحار.pdf', uploadDate: '2025-01-05', uploadedBy: 'حمد العزري', role: 'العامل', size: '0.9 MB', icon: 'pdf' },
      { id: 'att5', type: 'تقرير السلامة والصحة المهنية', name: 'تقرير_حادثة_صحار.pdf', uploadDate: '2025-01-06', uploadedBy: 'خالد البلوشي', role: 'الشخص المفوض من جهة العمل', size: '1.5 MB', icon: 'pdf' },
    ],
    notes: [
      { id: 'n1198-1', author: 'عائشة بنت محمد الرواحي', role: 'موظف قسم التحقيق في إصابات العمل', text: 'تم استكمال معاينة الموقع وإرفاق الصور المطلوبة. الحالة واضحة ومطابقة لشروط إصابة العمل.', time: '2025-01-14 14:00' }
    ],
    timeline: [
      { action: 'تم تقديم الطلب', actor: 'حمد بن سلطان العزري', role: 'العامل', time: '2025-01-05 08:30', fromStatus: '', toStatus: 'تم تقديم الطلب — بانتظار تعيين المحقق المختص', note: '', type: 'default' },
      { action: 'توجيه لقسم التحقيق في إصابات العمل', actor: 'النظام', role: 'آلي', time: '2025-01-05 08:31', fromStatus: 'تم تقديم الطلب — بانتظار تعيين المحقق المختص', toStatus: 'قيد التحقيق — إصابات العمل', note: '', type: 'default' },
      { action: 'إضافة زيارة ميدانية', actor: 'عائشة بنت محمد الرواحي', role: 'موظف قسم التحقيق في إصابات العمل', time: '2025-01-08 11:30', fromStatus: 'قيد التحقيق — إصابات العمل', toStatus: 'قيد التحقيق — إصابات العمل', note: 'تمت الزيارة الميدانية لمعاينة الموقع', type: 'default' },
      { action: 'رفع تقرير التحقيق لرئيس القسم', actor: 'عائشة بنت محمد الرواحي', role: 'موظف قسم التحقيق في إصابات العمل', time: '2025-01-14 14:20', fromStatus: 'قيد التحقيق — إصابات العمل', toStatus: 'بانتظار اعتماد رئيس قسم التحقيق في إصابات العمل', note: 'التوصية: موافقة على إصابة العمل', type: 'success' },
    ],
    assignedTo: 'عائشة بنت محمد الرواحي',
    checkedOutBy: 'عائشة بنت محمد الرواحي',
    returnReason: null,
  },
  createAllowanceRequest({
    id: 'WI-2025-001240',
    type: 'إصابة عمل',
    subtype: 'إصابة في موقع العمل',
    status: 'تم إعادة الطلب لاستيفاء البيانات',
    submitDate: '2025-01-16',
    lastUpdate: '2025-01-18 10:15',
    lastUpdatedBy: 'عائشة بنت محمد الرواحي',
    expectedClosureDate: '2025-01-29',
    applicant: { name: 'سالم بن ناصر الحارثي', civil: '9012345678', role: 'العامل / المؤمن عليه / المواطن', phone: '96898765432', email: 'salem.h@gmail.com', region: 'محافظة مسقط', wilayat: 'السيب', country: 'سلطنة عُمان' },
    insured: { name: 'سالم بن ناصر الحارثي', civil: '9012345678', insurance: 'IN-20190045678', dob: '1985-06-15', gender: 'ذكر', nationality: 'عُماني', insuranceStatus: 'نشط', regDate: '2019-03-01', subType: 'إلزامي', phone: '96898765432', email: 'salem.h@gmail.com' },
    employer: { name: 'مجموعة النور للإنشاءات ش.م.م', cr: '1234567', establishment: 'EST-0087654', jobTitle: 'مهندس مدني', joinDate: '2019-03-01', location: 'مسقط — الخوض', sector: 'الإنشاءات والمقاولات', employerType: 'خاص', phone: '96824001234' },
    injury: { caseType: 'إصابة في موقع العمل', description: 'يلزم استكمال تقرير جهة العمل وتحديث مدة الإجازة المرضية المرفقة.', location: 'موقع المشروع — الخوض', bodyPart: 'الركبة اليمنى', incidentDate: '2025-01-15', witnesses: 'نعم', witnessNames: 'محمد بن سالم الريامي' },
    attachments: [{ id: 'att240-1', type: 'تقرير طبي أولي', name: 'تقرير_مبدئي.pdf', uploadDate: '2025-01-16', uploadedBy: 'سالم بن ناصر الحارثي', role: 'العامل', size: '0.7 MB', icon: 'pdf' }],
    notes: [{ id: 'n240-1', author: 'عائشة بنت محمد الرواحي', role: 'موظف قسم التحقيق في إصابات العمل', text: 'يرجى تحديث تقرير جهة العمل وإرفاق نموذج الأجر.', time: '2025-01-18 10:15' }],
    timeline: [
      { action: 'تم تقديم الطلب', actor: 'سالم بن ناصر الحارثي', role: 'العامل', time: '2025-01-16 09:00', fromStatus: '', toStatus: 'تم تقديم الطلب — بانتظار تعيين المحقق المختص', note: '', type: 'default', phone: '96898765432' },
      { action: 'إعادة الطلب للاستيفاء', actor: 'عائشة بنت محمد الرواحي', role: 'موظف قسم التحقيق في إصابات العمل', time: '2025-01-18 10:15', fromStatus: 'قيد التحقيق — إصابات العمل', toStatus: 'تم إعادة الطلب لاستيفاء البيانات', note: 'الرجاء إرفاق تقرير جهة العمل وتحديث شهادة الأجر', type: 'warning', phone: '96895551111' },
    ],
    assignedTo: 'عائشة بنت محمد الرواحي',
    returnReason: 'إرفاق تقرير جهة العمل وتحديث شهادة الأجر وتحديد مدة الانقطاع الحالية.',
  }),
  createAllowanceRequest({
    id: 'WI-2025-001241',
    type: 'إصابة عمل',
    subtype: 'حادث طريق',
    status: 'تم إعادة الطلب لاستيفاء البيانات',
    submitDate: '2025-01-14',
    lastUpdate: '2025-01-17 13:40',
    lastUpdatedBy: 'عائشة بنت محمد الرواحي',
    expectedClosureDate: '2025-01-28',
    applicant: { name: 'خالد بن سعيد البلوشي', civil: '9087654321', role: 'الشخص المفوض من جهة العمل', phone: '96891234567', email: 'khalid.b@company.com', region: 'محافظة مسقط', wilayat: 'بوشر', country: 'سلطنة عُمان', employeeId: 'EMP-4471' },
    insured: { name: 'حمد بن سلطان العزري', civil: '9049911223', insurance: 'INS-998812', dob: '1988-04-09', gender: 'ذكر', nationality: 'عُماني', insuranceStatus: 'نشط', regDate: '2020-02-11', subType: 'إلزامي', phone: '96894550000', email: 'hamad.azri@mail.com' },
    employer: { name: 'مجموعة النور للإنشاءات', cr: '1234567', establishment: 'EST-2023', jobTitle: 'مشرف موقع', joinDate: '2020-02-11', location: 'صحار', sector: 'الإنشاءات والمقاولات', employerType: 'خاص', phone: '96824004567' },
    injury: { caseType: 'حادث طريق', description: 'بانتظار إضافة محضر الشرطة النهائي وبيانات الأجر.', location: 'طريق صحار الداخلي', bodyPart: 'الظهر', incidentDate: '2025-01-13', witnesses: 'لا' },
    attachments: [{ id: 'att241-1', type: 'خطاب جهة العمل', name: 'خطاب_المنشأة.pdf', uploadDate: '2025-01-14', uploadedBy: 'خالد بن سعيد البلوشي', role: 'الشخص المفوض من جهة العمل', size: '0.4 MB', icon: 'pdf' }],
    timeline: [
      { action: 'تم تقديم الطلب', actor: 'خالد بن سعيد البلوشي', role: 'الشخص المفوض من جهة العمل', time: '2025-01-14 08:25', fromStatus: '', toStatus: 'تم تقديم الطلب — بانتظار تعيين المحقق المختص', note: '', type: 'default', phone: '96891234567' },
      { action: 'إعادة الطلب للاستيفاء', actor: 'عائشة بنت محمد الرواحي', role: 'موظف قسم التحقيق في إصابات العمل', time: '2025-01-17 13:40', fromStatus: 'قيد التحقيق — إصابات العمل', toStatus: 'تم إعادة الطلب لاستيفاء البيانات', note: 'الرجاء استكمال محضر الشرطة وشهادة الأجر', type: 'warning', phone: '96895551111' },
    ],
    assignedTo: 'عائشة بنت محمد الرواحي',
    returnReason: 'استكمال محضر الشرطة النهائي وإرفاق شهادة الأجر للعامل.',
  }),
  createAllowanceRequest({
    id: 'WI-2025-001242',
    type: 'مرض مهني',
    subtype: 'فقدان سمع مهني',
    status: 'قيد التحقيق — الأمراض المهنية',
    submitDate: '2025-01-11',
    lastUpdate: '2025-01-15 11:20',
    lastUpdatedBy: 'فاطمة بنت حمد الحجرية',
    expectedClosureDate: '2025-01-30',
    applicant: { name: 'سيف بن راشد المحروقي', civil: '9011223344', role: 'العامل / المؤمن عليه / المواطن', phone: '96894443322', email: 'saif.m@sample.om', region: 'محافظة شمال الباطنة', wilayat: 'صحار', country: 'سلطنة عُمان' },
    insured: { name: 'سيف بن راشد المحروقي', civil: '9011223344', insurance: 'INS-332211', dob: '1991-11-02', gender: 'ذكر', nationality: 'عُماني', insuranceStatus: 'نشط', regDate: '2021-05-14', subType: 'إلزامي', phone: '96894443322', email: 'saif.m@sample.om' },
    employer: { name: 'شركة أطلس الصناعية', cr: '3344556', establishment: 'EST-8812', jobTitle: 'فني صيانة', joinDate: '2021-05-14', location: 'صحار', sector: 'الصناعة', employerType: 'خاص', phone: '96826770011' },
    injury: { caseType: 'مرض مهني', description: 'فقدان تدريجي في السمع نتيجة التعرض المستمر للضوضاء الصناعية.', caseDescription: 'اشتباه مرض مهني مرتبط ببيئة العمل', chemicalAgents: 'ضوضاء صناعية مرتفعة', exposureDuration: '4 سنوات', firstSuspicion: '2025-01-05', workEnvironment: 'ورشة صيانة خطوط الإنتاج', insuredStatus: 'تحت التقييم الطبي' },
    attachments: [{ id: 'att242-1', type: 'قياس سمع', name: 'نتيجة_قياس_السمع.pdf', uploadDate: '2025-01-11', uploadedBy: 'سيف بن راشد المحروقي', role: 'العامل', size: '0.6 MB', icon: 'pdf' }],
    notes: [{ id: 'n242-1', author: 'فاطمة بنت حمد الحجرية', role: 'موظف قسم التحقيق في الأمراض المهنية', text: 'تمت مباشرة التحقيق والطلب يحتاج رأياً فنياً من لجنة الأمراض المهنية.', time: '2025-01-15 11:20' }],
    timeline: [
      { action: 'تم تقديم الطلب', actor: 'سيف بن راشد المحروقي', role: 'العامل', time: '2025-01-11 08:40', fromStatus: '', toStatus: 'تم تقديم الطلب — بانتظار تعيين المحقق المختص', note: '', type: 'default', phone: '96894443322' },
      { action: 'توجيه لقسم التحقيق في الأمراض المهنية', actor: 'النظام', role: 'آلي', time: '2025-01-11 08:41', fromStatus: 'تم تقديم الطلب — بانتظار تعيين المحقق المختص', toStatus: 'قيد التحقيق — الأمراض المهنية', note: '', type: 'default' },
      { action: 'تم حجز الطلب', actor: 'فاطمة بنت حمد الحجرية', role: 'موظف قسم التحقيق في الأمراض المهنية', time: '2025-01-15 11:20', fromStatus: 'قيد التحقيق — الأمراض المهنية', toStatus: 'قيد التحقيق — الأمراض المهنية', note: 'بدء فحص بيئة العمل والمرفقات الطبية', type: 'info', phone: '96895553333' },
    ],
    assignedTo: 'فاطمة بنت حمد الحجرية',
    checkedOutBy: 'فاطمة بنت حمد الحجرية',
  }),
  createAllowanceRequest({
    id: 'WI-2025-001243',
    type: 'مرض مهني',
    subtype: 'التهاب جلدي مهني',
    status: 'بانتظار اعتماد رئيس قسم التحقيق في الأمراض المهنية',
    submitDate: '2025-01-08',
    lastUpdate: '2025-01-16 12:00',
    lastUpdatedBy: 'فاطمة بنت حمد الحجرية',
    expectedClosureDate: '2025-01-26',
    applicant: { name: 'مها بنت صالح العبرية', civil: '9032211456', role: 'العامل / المؤمن عليه / المواطن', phone: '96893334455', email: 'maha.abria@mail.com', region: 'محافظة الداخلية', wilayat: 'نزوى', country: 'سلطنة عُمان' },
    insured: { name: 'مها بنت صالح العبرية', civil: '9032211456', insurance: 'INS-771245', dob: '1993-09-10', gender: 'أنثى', nationality: 'عُمانية', insuranceStatus: 'نشط', regDate: '2022-01-10', subType: 'إلزامي', phone: '96893334455', email: 'maha.abria@mail.com' },
    employer: { name: 'مصنع الواحة للمنظفات', cr: '4433221', establishment: 'EST-1204', jobTitle: 'مشغلة خلط مواد', joinDate: '2022-01-10', location: 'نزوى', sector: 'الصناعة الكيميائية', employerType: 'خاص', phone: '96825440088' },
    injury: { caseType: 'مرض مهني', description: 'اشتباه التهاب جلدي مهني بسبب التعرض لمواد التنظيف المركزة.', caseDescription: 'طلب معتمد من الموظف بانتظار قرار رئيس القسم', chemicalAgents: 'مذيبات ومواد تنظيف مركزة', exposureDuration: 'عامان', firstSuspicion: '2025-01-03', workEnvironment: 'وحدة الخلط والتعبئة', insuredStatus: 'تحت العلاج' },
    investigation: { summary: 'اكتملت المعاينة الأولية وتمت مراجعة شهادات السلامة.', findings: 'يوجد ارتباط مرجح بين الأعراض والبيئة المهنية.', employeeRecommendation: 'موافقة', employeeNotes: 'يوصى بإحالة الملف إلى رئيس القسم لاعتماد النتيجة.', headDecision: null, headNotes: null },
    timeline: [
      { action: 'تم تقديم الطلب', actor: 'مها بنت صالح العبرية', role: 'العامل', time: '2025-01-08 10:20', fromStatus: '', toStatus: 'تم تقديم الطلب — بانتظار تعيين المحقق المختص', note: '', type: 'default', phone: '96893334455' },
      { action: 'رفع التوصية لرئيس القسم', actor: 'فاطمة بنت حمد الحجرية', role: 'موظف قسم التحقيق في الأمراض المهنية', time: '2025-01-16 12:00', fromStatus: 'قيد التحقيق — الأمراض المهنية', toStatus: 'بانتظار اعتماد رئيس قسم التحقيق في الأمراض المهنية', note: 'التوصية: اعتبار الحالة مرضاً مهنياً', type: 'success', phone: '96895553333' },
    ],
    assignedTo: 'فاطمة بنت حمد الحجرية',
    checkedOutBy: 'فاطمة بنت حمد الحجرية',
  }),
  createAllowanceRequest({
    id: 'WI-2025-001244',
    type: 'إصابة عمل',
    subtype: 'إصابة في موقع العمل',
    status: 'قيد المراجعة من موظف قسم الإجازات المرضية',
    submitDate: '2025-01-09',
    lastUpdate: '2025-01-18 09:45',
    lastUpdatedBy: 'مريم بنت سيف الكيومية',
    expectedClosureDate: '2025-01-25',
    applicant: { name: 'حمد بن سلطان العزري', civil: '9023456789', role: 'العامل / المؤمن عليه / المواطن', phone: '96899876543', email: 'hamad.a@mail.com', region: 'شمال الباطنة', wilayat: 'صحار', country: 'سلطنة عُمان' },
    insured: { name: 'حمد بن سلطان العزري', civil: '9023456789', insurance: 'IN-20170056789', dob: '1982-11-20', gender: 'ذكر', nationality: 'عُماني', insuranceStatus: 'نشط', regDate: '2017-07-01', subType: 'إلزامي', phone: '96899876543', email: 'hamad.a@mail.com' },
    employer: { name: 'شركة عُمان للحديد والصلب', cr: '2345678', establishment: 'EST-0054321', jobTitle: 'فني تشغيل آلات', joinDate: '2017-07-01', location: 'صحار — المنطقة الصناعية', sector: 'الصناعة', employerType: 'خاص', phone: '96826880099' },
    sickLeavePeriods: [{ from: '2025-01-10', to: '2025-01-24', days: 15, reason: 'إجازة مرضية أولى بعد الإصابة' }],
    timeline: [
      { action: 'إحالة إلى قسم الإجازات المرضية', actor: 'النظام', role: 'آلي', time: '2025-01-17 15:20', fromStatus: 'بانتظار اعتماد رئيس قسم التحقيق في إصابات العمل', toStatus: 'قيد المراجعة من موظف قسم الإجازات المرضية', note: 'تم اعتماد إصابة العمل وإحالة الملف لحساب بدل الانقطاع', type: 'success' },
      { action: 'بدء المراجعة', actor: 'مريم بنت سيف الكيومية', role: 'موظف قسم الإجازات المرضية', time: '2025-01-18 09:45', fromStatus: 'قيد المراجعة من موظف قسم الإجازات المرضية', toStatus: 'قيد المراجعة من موظف قسم الإجازات المرضية', note: 'مراجعة مدد الإجازة المرضية', type: 'info', phone: '96895555555' },
    ],
    assignedTo: 'مريم بنت سيف الكيومية',
    checkedOutBy: 'مريم بنت سيف الكيومية',
  }),
  createAllowanceRequest({
    id: 'WI-2025-001245',
    type: 'إصابة عمل',
    subtype: 'حادث طريق',
    status: 'بانتظار اعتماد رئيس قسم الإجازات المرضية',
    submitDate: '2025-01-07',
    lastUpdate: '2025-01-19 12:05',
    lastUpdatedBy: 'مريم بنت سيف الكيومية',
    expectedClosureDate: '2025-01-24',
    applicant: { name: 'سالم بن ناصر الحارثي', civil: '9012345678', role: 'العامل / المؤمن عليه / المواطن', phone: '96898765432', email: 'salem.h@gmail.com', region: 'مسقط', wilayat: 'السيب', country: 'سلطنة عُمان' },
    insured: { name: 'سالم بن ناصر الحارثي', civil: '9012345678', insurance: 'IN-20190045678', dob: '1985-06-15', gender: 'ذكر', nationality: 'عُماني', insuranceStatus: 'نشط', regDate: '2019-03-01', subType: 'إلزامي', phone: '96898765432', email: 'salem.h@gmail.com' },
    employer: { name: 'مجموعة النور للإنشاءات ش.م.م', cr: '1234567', establishment: 'EST-0087654', jobTitle: 'مهندس مدني', joinDate: '2019-03-01', location: 'مسقط — الخوض', sector: 'الإنشاءات والمقاولات', employerType: 'خاص', phone: '96824001234' },
    sickLeavePeriods: [{ from: '2025-01-08', to: '2025-01-20', days: 13, reason: 'إجازة علاجية موصى بها' }],
    timeline: [
      { action: 'رفع التوصية لرئيس القسم', actor: 'مريم بنت سيف الكيومية', role: 'موظف قسم الإجازات المرضية', time: '2025-01-19 12:05', fromStatus: 'قيد المراجعة من موظف قسم الإجازات المرضية', toStatus: 'بانتظار اعتماد رئيس قسم الإجازات المرضية', note: 'التوصية باعتماد بدل الانقطاع للفترة المحددة', type: 'success', phone: '96895555555' },
    ],
    assignedTo: 'مريم بنت سيف الكيومية',
    checkedOutBy: 'مريم بنت سيف الكيومية',
  }),
  createAllowanceRequest({
    id: 'WI-2025-001246',
    type: 'مرض مهني',
    subtype: 'حساسية تنفسية مهنية',
    status: 'بانتظار رأي لجنة الأمراض المهنية',
    submitDate: '2025-01-13',
    lastUpdate: '2025-01-20 10:30',
    lastUpdatedBy: 'أحمد بن سليم المعمري',
    expectedClosureDate: '2025-01-29',
    applicant: { name: 'راشد بن خميس السعدي', civil: '9061234567', role: 'العامل / المؤمن عليه / المواطن', phone: '96891112233', email: 'rashid.sadi@mail.com', region: 'محافظة الداخلية', wilayat: 'نزوى', country: 'سلطنة عُمان' },
    insured: { name: 'راشد بن خميس السعدي', civil: '9061234567', insurance: 'INS-661245', dob: '1987-07-18', gender: 'ذكر', nationality: 'عُماني', insuranceStatus: 'نشط', regDate: '2020-03-12', subType: 'إلزامي', phone: '96891112233', email: 'rashid.sadi@mail.com' },
    employer: { name: 'مصنع الوادي للدهانات', cr: '5522114', establishment: 'EST-7712', jobTitle: 'فني خلط', joinDate: '2020-03-12', location: 'نزوى', sector: 'الصناعة الكيميائية', employerType: 'خاص', phone: '96825441122' },
    injury: { caseType: 'مرض مهني', description: 'حالة محالة للجنة الأمراض المهنية لإبداء الرأي الفني الاستشاري.', caseDescription: 'تكرار أعراض تنفسية مرتبطة بالتعرض للدهانات والمذيبات', chemicalAgents: 'أبخرة مذيبات ودهانات', exposureDuration: '3 سنوات', firstSuspicion: '2025-01-06', workEnvironment: 'وحدة الخلط والرش', insuredStatus: 'تحت المتابعة الطبية' },
    attachments: [{ id: 'att246-1', type: 'تقرير طبي تخصصي', name: 'تقرير_أمراض_صدرية.pdf', uploadDate: '2025-01-13', uploadedBy: 'راشد بن خميس السعدي', role: 'العامل', size: '0.9 MB', icon: 'pdf' }],
    notes: [{ id: 'n246-1', author: 'أحمد بن سليم المعمري', role: 'رئيس قسم التحقيق في الأمراض المهنية', text: 'تمت إحالة الملف إلى لجنة الأمراض المهنية لإبداء الرأي الفني.', time: '2025-01-20 10:30' }],
    timeline: [
      { action: 'إحالة إلى لجنة الأمراض المهنية', actor: 'أحمد بن سليم المعمري', role: 'رئيس قسم التحقيق في الأمراض المهنية', time: '2025-01-20 10:30', fromStatus: 'بانتظار اعتماد رئيس قسم التحقيق في الأمراض المهنية', toStatus: 'بانتظار رأي لجنة الأمراض المهنية', note: 'يُطلب من اللجنة إبداء الرأي الفني الاستشاري', type: 'info', phone: '96895554444' },
    ],
    assignedTo: 'د. ناصر بن حمود الفارسي',
    checkedOutBy: null,
  }),

  /* ── طلب لدى جهة خارجية مخولة — قيد التحقيق ── */
  createAllowanceRequest({
    id: 'WI-2025-001250',
    type: 'إصابة عمل',
    subtype: 'إصابة في موقع العمل',
    status: 'قيد التحقيق — جهة خارجية مخولة',
    submitDate: '2026-03-02',
    lastUpdate: '2026-03-05 09:15',
    lastUpdatedBy: 'مبارك بن حمد الرحبي',
    expectedClosureDate: '2026-04-01',
    remainingDays: 18,
    applicant: { name: 'خالد بن سعيد البلوشي', civil: '9087654321', role: 'الشخص المفوض من جهة العمل', phone: '96891234567', email: 'khalid.b@company.com', region: 'محافظة مسقط', wilayat: 'بوشر', country: 'سلطنة عُمان' },
    insured: { name: 'عامر بن سيف الشكيلي', civil: '9033445566', insurance: 'INS-770112', dob: '1991-04-09', gender: 'ذكر', nationality: 'عُماني', insuranceStatus: 'نشط', regDate: '2018-09-01', subType: 'إلزامي', phone: '96897778899', email: 'amer.sh@mail.com' },
    employer: { name: 'مجموعة النور للإنشاءات ش.م.م', cr: '1234567', establishment: 'EST-0087654', jobTitle: 'فني كهرباء', joinDate: '2018-09-01', location: 'مسقط — الخوض', sector: 'الإنشاءات والمقاولات', employerType: 'خاص', branch: { id: 'BR-001', name: 'الفرع الرئيسي', state: 'مسقط', governorate: 'بوشر' }, phone: '96824112233' },
    injury: { caseType: 'إصابة في موقع العمل', description: 'سقوط من سقالة أثناء تمديد أسلاك الكهرباء في الطابق الثاني.', location: 'موقع مشروع الخوض — المبنى ب', bodyPart: 'الكتف الأيسر', witnesses: 'نعم', witnessNames: 'سالم بن محمد الحجري، عبدالله بن راشد البلوشي', incidentDate: '2026-02-28', insuredStatus: 'تحت العلاج' },
    investigation: { summary: 'قيد الإعداد من قبل الجهة الخارجية المخولة.', employeeRecommendation: '', employeeNotes: '' },
    fieldVisits: [
      {
        date: '2026-03-04', time: '09:30',
        reason: 'معاينة موقع الحادث والتحقق من إجراءات السلامة',
        staff: 'مبارك بن حمد الرحبي، أمل بنت خالد البوسعيدية',
        locationType: 'branch', branchId: 'BR-001', branchName: 'الفرع الرئيسي — مسقط (بوشر)', coordinates: '',
        interviewees: 'سالم بن محمد الحجري (شاهد)، عبدالله بن راشد البلوشي (مشرف الموقع)',
        summary: 'تمت معاينة السقالة المستخدمة وتبيّن عدم تثبيتها بالشكل المطلوب، وعدم توافر حزام أمان للعامل.',
        results: 'مخالفة واضحة لإجراءات السلامة من جانب صاحب العمل.',
        notes: 'السقالة غير مثبتة، ولا يتوفر حزام أمان، ولم تُسجل الحادثة في سجل حوادث المنشأة.',
        checklist: { 'CL-1': 'نعم', 'CL-2': 'لا', 'CL-3': 'نعم', 'CL-4': 'لا', 'CL-5': 'لا', 'CL-6': 'نعم', 'CL-7': 'لا' },
        attachments: ['صور_السقالة.zip'],
      }
    ],
    attachments: [
      { id: 'att250-1', type: 'تقرير طبي أولي', name: 'تقرير_مستشفى_الخوض.pdf', uploadDate: '2026-03-02', uploadedBy: 'خالد بن سعيد البلوشي', role: 'الشخص المفوض من جهة العمل', size: '1.1 MB', icon: 'pdf' },
      { id: 'att250-2', type: 'خطاب جهة العمل', name: 'خطاب_جهة_العمل.pdf', uploadDate: '2026-03-02', uploadedBy: 'خالد بن سعيد البلوشي', role: 'الشخص المفوض من جهة العمل', size: '0.4 MB', icon: 'pdf' },
    ],
    notes: [],
    timeline: [
      { action: 'تقديم الطلب', actor: 'خالد بن سعيد البلوشي', role: 'الشخص المفوض من جهة العمل', time: '2026-03-02 08:40', fromStatus: 'مسودة', toStatus: 'تم تقديم الطلب — بانتظار تعيين المحقق المختص', note: '', type: 'default' },
      { action: 'عرض الطلب على الجهات الخارجية المخولة', actor: 'النظام', role: 'النظام', time: '2026-03-02 08:41', fromStatus: 'تم تقديم الطلب — بانتظار تعيين المحقق المختص', toStatus: 'قيد التحقيق — جهة خارجية مخولة', note: 'مطابقة المحافظة: مسقط — الاختصاص: كلاهما', type: 'info' },
      { action: 'حجز الطلب', actor: 'مبارك بن حمد الرحبي', role: 'الجهة الخارجية المخولة بالتحقيق — شركة خدمات الأمن والسلامة', time: '2026-03-03 11:05', fromStatus: 'قيد التحقيق — جهة خارجية مخولة', toStatus: 'قيد التحقيق — جهة خارجية مخولة', note: '', type: 'default' },
      { action: 'إضافة زيارة ميدانية', actor: 'مبارك بن حمد الرحبي', role: 'الجهة الخارجية المخولة بالتحقيق — شركة خدمات الأمن والسلامة', time: '2026-03-04 14:20', fromStatus: 'قيد التحقيق — جهة خارجية مخولة', toStatus: 'قيد التحقيق — جهة خارجية مخولة', note: 'الحالة مستوفية لمعايير المشاركة مع وزارة العمل', type: 'warning' },
    ],
    externalEntity: {
      entityId: 'EXT-001', entityName: 'شركة خدمات الأمن والسلامة',
      checkedOutBy: 'مبارك بن حمد الرحبي', checkedOutDate: '2026-03-03',
      slaDays: 10, elapsedDays: 5,
      submittedDate: '', returnCount: 0, lastReturnNote: '',
    },
    molShare: { eligible: true, shared: false, sharedDate: '', sharedBy: '', shareId: '' },
    assignedTo: '',
    checkedOutBy: 'مبارك بن حمد الرحبي',
  }),

  /* ── طلب أنجزته جهة خارجية مخولة ورُفع لموظف قسم التحقيق للاطلاع ── */
  createAllowanceRequest({
    id: 'WI-2025-001251',
    type: 'إصابة عمل',
    subtype: 'حادث طريق',
    status: 'قيد التحقيق — إصابات العمل',
    submitDate: '2026-02-20',
    lastUpdate: '2026-03-06 13:40',
    lastUpdatedBy: 'أمل بنت خالد البوسعيدية',
    expectedClosureDate: '2026-03-22',
    remainingDays: 9,
    applicant: { name: 'سعاد بنت علي الحارثية', civil: '9044556677', role: 'العامل / المؤمن عليه / المواطن', phone: '96896665544', email: 'suad.h@mail.com', region: 'محافظة شمال الباطنة', wilayat: 'صحار', country: 'سلطنة عُمان' },
    insured: { name: 'سعاد بنت علي الحارثية', civil: '9044556677', insurance: 'INS-880345', dob: '1994-11-22', gender: 'أنثى', nationality: 'عُمانية', insuranceStatus: 'نشط', regDate: '2021-01-15', subType: 'إلزامي', phone: '96896665544', email: 'suad.h@mail.com' },
    employer: { name: 'شركة أطلس الصناعية', cr: '3344556', establishment: 'EST-8812', jobTitle: 'فنية مختبر', joinDate: '2021-01-15', location: 'صحار', sector: 'الصناعة', employerType: 'خاص', branch: { id: 'BR-002', name: 'فرع صحار', state: 'شمال الباطنة', governorate: 'صحار' }, phone: '96826334455' },
    injury: { caseType: 'حادث طريق', description: 'حادث مروري أثناء التوجه من محل الإقامة الدائم إلى مقر العمل.', location: 'طريق صحار — الباطنة السريع', bodyPart: 'الركبة اليمنى', witnesses: 'لا', witnessNames: '', incidentDate: '2026-02-18', accidentDirection: 'السكن الدائم إلى مقر العمل', insuredStatus: 'تحت العلاج' },
    investigation: {
      summary: 'تم التحقق من تقرير الشرطة ومن كشف الحضور والانصراف، وثبت أن الحادث وقع في المسار المعتاد وضمن الفترة الزمنية المعتادة للتوجه إلى العمل.',
      findings: 'لا توجد مخالفة من المؤمن عليه ولا من صاحب العمل.',
      employeeRecommendation: '', employeeNotes: '',
    },
    fieldVisits: [
      {
        date: '2026-03-01', time: '10:00',
        reason: 'التحقق من كشف الحضور والانصراف ومسار التوجه إلى العمل',
        staff: 'أمل بنت خالد البوسعيدية',
        locationType: 'map', branchId: '', branchName: '', coordinates: '24.3478, 56.7094',
        interviewees: 'مسؤول الموارد البشرية بالمنشأة',
        summary: 'تم الاطلاع على كشف الحضور والانصراف ومطابقته مع توقيت الحادث، ولا توجد ملاحظات على إجراءات السلامة.',
        results: 'الحادث ضمن المسار والفترة المعتادة.',
        notes: 'لا توجد ملاحظات على التزام المنشأة بإجراءات السلامة.',
        checklist: { 'CL-1': 'نعم', 'CL-2': 'نعم', 'CL-3': 'نعم', 'CL-4': 'نعم', 'CL-5': 'لا ينطبق', 'CL-6': 'نعم', 'CL-7': 'نعم' },
        attachments: ['كشف_الحضور_والانصراف.pdf'],
      }
    ],
    attachments: [
      { id: 'att251-1', type: 'تقرير الشرطة', name: 'تقرير_الشرطة_صحار.pdf', uploadDate: '2026-02-20', uploadedBy: 'سعاد بنت علي الحارثية', role: 'العامل', size: '0.8 MB', icon: 'pdf' },
      { id: 'att251-2', type: 'تقرير طبي أولي', name: 'تقرير_مستشفى_صحار.pdf', uploadDate: '2026-02-20', uploadedBy: 'سعاد بنت علي الحارثية', role: 'العامل', size: '1.0 MB', icon: 'pdf' },
    ],
    notes: [],
    timeline: [
      { action: 'تقديم الطلب', actor: 'سعاد بنت علي الحارثية', role: 'العامل / المؤمن عليه / المواطن', time: '2026-02-20 09:10', fromStatus: 'مسودة', toStatus: 'تم تقديم الطلب — بانتظار تعيين المحقق المختص', note: '', type: 'default' },
      { action: 'عرض الطلب على الجهات الخارجية المخولة', actor: 'النظام', role: 'النظام', time: '2026-02-20 09:11', fromStatus: 'تم تقديم الطلب — بانتظار تعيين المحقق المختص', toStatus: 'قيد التحقيق — جهة خارجية مخولة', note: 'مطابقة المحافظة: شمال الباطنة — الاختصاص: إصابات العمل', type: 'info' },
      { action: 'حجز الطلب', actor: 'أمل بنت خالد البوسعيدية', role: 'الجهة الخارجية المخولة بالتحقيق — شركة خدمات الأمن والسلامة', time: '2026-02-24 08:30', fromStatus: 'قيد التحقيق — جهة خارجية مخولة', toStatus: 'قيد التحقيق — جهة خارجية مخولة', note: '', type: 'default' },
      { action: 'إضافة زيارة ميدانية', actor: 'أمل بنت خالد البوسعيدية', role: 'الجهة الخارجية المخولة بالتحقيق — شركة خدمات الأمن والسلامة', time: '2026-03-01 12:00', fromStatus: 'قيد التحقيق — جهة خارجية مخولة', toStatus: 'قيد التحقيق — جهة خارجية مخولة', note: 'الحالة غير مستوفية لمعايير المشاركة مع وزارة العمل', type: 'default' },
      { action: 'توجيه الطلب إلى موظف قسم التحقيق', actor: 'أمل بنت خالد البوسعيدية', role: 'الجهة الخارجية المخولة بالتحقيق — شركة خدمات الأمن والسلامة', time: '2026-03-06 13:40', fromStatus: 'قيد التحقيق — جهة خارجية مخولة', toStatus: 'قيد التحقيق — إصابات العمل', note: 'اكتمل محضر التحقيق والزيارة الميدانية — مرفوع للاطلاع', type: 'success' },
    ],
    externalEntity: {
      entityId: 'EXT-001', entityName: 'شركة خدمات الأمن والسلامة',
      checkedOutBy: 'أمل بنت خالد البوسعيدية', checkedOutDate: '2026-02-24',
      slaDays: 10, elapsedDays: 11,
      submittedDate: '2026-03-06', returnCount: 0, lastReturnNote: '',
      insuredViolation: 'لا', insuredViolationType: '', employerViolation: 'لا',
    },
    molShare: { eligible: false, shared: false, sharedDate: '', sharedBy: '', shareId: '' },
    assignedTo: 'عائشة بنت محمد الرواحي',
    checkedOutBy: null,
  }),
  // Additional allowance requests would be added here with the same complete structure
];

/* ================================================================
   Export for use in main data.js (Global Scope)
   ================================================================ */

// Make data available globally for browser loading
window.ALLOWANCE_TEMPLATE = ALLOWANCE_TEMPLATE;
window.ALLOWANCES_DATA = ALLOWANCES_DATA;
window.createAllowanceRequest = createAllowanceRequest;
window.validateAllowanceRequest = validateAllowanceRequest;
window.getAllowanceById = getAllowanceById;
window.getAllowancesByType = getAllowancesByType;
window.getAllowancesByStatus = getAllowancesByStatus;
