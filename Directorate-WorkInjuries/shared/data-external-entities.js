/* ================================================================
   data-external-entities.js — الجهات الخارجية المخولة بالتحقيق
   يغطي: تعريف الجهات، مستخدميها، جهات العمل المستثناة،
          قائمة التحقق الميدانية، وسجل المشاركة مع وزارة العمل
   ================================================================ */

/* ── الجهات الخارجية المخولة بالتحقيق ── */
const EXTERNAL_ENTITIES_DATA = [
  {
    id: 'EXT-001',
    name: 'شركة خدمات الأمن والسلامة',
    cr: '1102233',
    contractNo: 'CNT-2026-014',
    contractStart: '2026-01-01',
    contractEnd: '2027-12-31',
    contactPerson: 'سعيد بن مبارك الهنائي',
    phone: '96892223344',
    email: 'ops@safety-services.om',
    address: 'مسقط — الغبرة الشمالية',
    scope: 'كلاهما',
    /* الاختصاص في كل نطاق جغرافي على حدة */
    coverage: [
      { governorate: 'مسقط', wilayats: 'جميع الولايات', scope: 'كلاهما' },
      { governorate: 'شمال الباطنة', wilayats: 'صحار، لوى، شناص', scope: 'إصابات العمل' },
      { governorate: 'الداخلية', wilayats: 'نزوى، بهلاء', scope: 'الأمراض المهنية' },
    ],
    slaDays: 10,
    status: 'نشطة',
    activeFrom: '2026-01-01',
    notes: 'تخويل صادر بموافقة مجلس إدارة الصندوق',
  },
  {
    id: 'EXT-002',
    name: 'مكتب الاستدلالات الفنية',
    cr: '1105577',
    contractNo: 'CNT-2026-022',
    contractStart: '2026-04-01',
    contractEnd: '2027-03-31',
    contactPerson: 'هدى بنت علي الزدجالية',
    phone: '96892667788',
    email: 'info@tech-findings.om',
    address: 'ظفار — صلالة',
    scope: 'إصابات العمل',
    coverage: [
      { governorate: 'ظفار', wilayats: 'صلالة، طاقة، مرباط', scope: 'إصابات العمل' },
    ],
    slaDays: 12,
    status: 'موقوفة',
    activeFrom: '2026-04-01',
    notes: 'موقوفة مؤقتاً لحين تجديد العقد',
  },
];

/* ── تصنيفات الملاحظات التشغيلية على الجهات الخارجية ── */
const ENTITY_NOTE_CATEGORIES = [
  'الالتزام بالمهلة التعاقدية',
  'جودة محضر التحقيق',
  'الزيارات الميدانية والمعاينات',
  'استيفاء قائمة التحقق الميدانية',
  'التواصل والاستجابة',
  'سرية البيانات والالتزامات التعاقدية',
  'أخرى',
];

const ENTITY_NOTE_LEVELS = ['عادية', 'مهمة', 'حرجة'];

/* ── الملاحظات التشغيلية الموثقة على الجهات الخارجية ── */
const ENTITY_NOTES_DATA = [
  {
    id: 'ENN-0001', entityId: 'EXT-001',
    category: 'الالتزام بالمهلة التعاقدية',
    level: 'مهمة',
    requestId: 'WI-2025-001251',
    text: 'تجاوزت الجهة المهلة التعاقدية بيوم واحد في هذا الطلب (11 يوماً مقابل 10 أيام). تم التنبيه شفهياً على مسؤول التواصل بالجهة، ويلزم المتابعة في الطلبات القادمة.',
    author: 'سيف بن عبدالله الكندي',
    role: 'مدير دائرة التحقيق في إصابات العمل والأمراض المهنية',
    time: '2026-03-07 09:15',
  },
  {
    id: 'ENN-0002', entityId: 'EXT-001',
    category: 'الزيارات الميدانية والمعاينات',
    level: 'عادية',
    requestId: '',
    text: 'جودة توثيق الزيارات الميدانية مرتفعة من حيث المرفقات وأسماء من تمت مقابلتهم، ويُستحسن تعميم ذات المنهجية على بقية النطاقات الجغرافية للجهة.',
    author: 'سيف بن عبدالله الكندي',
    role: 'مدير دائرة التحقيق في إصابات العمل والأمراض المهنية',
    time: '2026-03-05 13:40',
  },
  {
    id: 'ENN-0003', entityId: 'EXT-002',
    category: 'سرية البيانات والالتزامات التعاقدية',
    level: 'حرجة',
    requestId: '',
    text: 'لم تُستكمل تعهدات السرية الموقعة من جميع مستخدمي الجهة، وقد أُوقفت الجهة لحين تجديد العقد واستكمال التعهدات.',
    author: 'سيف بن عبدالله الكندي',
    role: 'مدير دائرة التحقيق في إصابات العمل والأمراض المهنية',
    time: '2026-02-20 11:05',
  },
];

/* ── مستخدمو الجهات الخارجية — دور وظيفي واحد موحد ── */
const EXTERNAL_ENTITY_USERS_DATA = [
  {
    id: 'EXU-001', entityId: 'EXT-001',
    name: 'مبارك بن حمد الرحبي', civil: '9077771111', phone: '96893331111',
    email: 'mubarak.r@safety-services.om',
    status: 'نشط', createdBy: 'سيف بن عبدالله الكندي', createdDate: '2026-01-05',
  },
  {
    id: 'EXU-002', entityId: 'EXT-001',
    name: 'أمل بنت خالد البوسعيدية', civil: '9077772222', phone: '96893332222',
    email: 'amal.b@safety-services.om',
    status: 'نشط', createdBy: 'سيف بن عبدالله الكندي', createdDate: '2026-01-05',
  },
  {
    id: 'EXU-003', entityId: 'EXT-001',
    name: 'راشد بن سليمان العوفي', civil: '9077773333', phone: '96893333333',
    email: 'rashid.a@safety-services.om',
    status: 'موقوف', createdBy: 'سيف بن عبدالله الكندي', createdDate: '2026-02-11',
  },
  {
    id: 'EXU-004', entityId: 'EXT-002',
    name: 'سمية بنت ناصر المعشنية', civil: '9077774444', phone: '96893334444',
    email: 'sumaya.m@tech-findings.om',
    status: 'نشط', createdBy: 'سيف بن عبدالله الكندي', createdDate: '2026-04-03',
  },
];

/* ── جهات العمل المستثناة من التوجيه للجهات الخارجية ── */
const EXCLUDED_EMPLOYERS_DATA = [
  {
    cr: '2345678',
    name: 'شركة عُمان للحديد والصلب',
    reason: 'منشأة ذات طبيعة حساسة — يُعالج التحقيق داخلياً حصراً',
    date: '2026-02-18',
    addedBy: 'سيف بن عبدالله الكندي',
  },
];

/* ── بنود قائمة التحقق الميدانية ──
   تحدد نتيجتها خضوع الحالة للمشاركة مع وزارة العمل.
   القاعدة المبدئية: أي بند بالإجابة «لا» يجعل الحالة مستوفية لمعايير المشاركة.
   البنود والقاعدة بانتظار اعتماد دائرة التحقيق (نقطة مفتوحة رقم 10). */
const FIELD_VISIT_CHECKLIST = [
  { id: 'CL-1', text: 'توافر سياسة السلامة والصحة المهنية المعتمدة في موقع العمل' },
  { id: 'CL-2', text: 'توافر معدات الوقاية الشخصية وصلاحيتها للاستخدام' },
  { id: 'CL-3', text: 'وجود اللوحات التحذيرية وإرشادات السلامة في الموقع' },
  { id: 'CL-4', text: 'تدريب العامل على إجراءات السلامة الخاصة بمهمته' },
  { id: 'CL-5', text: 'سلامة الآلات والمعدات وانتظام صيانتها الدورية' },
  { id: 'CL-6', text: 'توافر مسؤول سلامة معتمد في موقع العمل' },
  { id: 'CL-7', text: 'تسجيل الحادثة في سجل الحوادث لدى المنشأة' },
];

/* ── سجل المشاركة مع وزارة العمل ── */
const MOL_SHARES_DATA = [
  {
    id: 'MOL-2026-0001',
    requestId: 'WI-2025-001198',
    sharedDate: '2026-03-04 10:22',
    sharedBy: 'يوسف بن علي الشيباني',
    status: 'تم الإرسال',
    fields: {
      visitDateTime: '2025-01-08 — 10:00',
      employer: 'شركة عُمان للحديد والصلب — س.ت 2345678',
      visitLocation: 'الفرع الرئيسي — شمال الباطنة (صحار)',
      visitNotes: 'لوحات التحذير غير مكتملة في محيط الآلة، ولم يُسجل الحادث في سجل حوادث المنشأة.',
    },
    failureReason: '',
  },
];

/* ================================================================
   دوال مساندة
   ================================================================ */

/* محافظة الطلب — تُقرأ من فرع المنشأة، وإلا تُستنتج من موقع العمل */
function getRequestGovernorate(req) {
  const branch = req?.employer?.branch || {};
  if (branch.state) return branch.state;
  const loc = String(req?.employer?.location || '');
  if (loc.includes('مسقط')) return 'مسقط';
  if (loc.includes('صحار') || loc.includes('لوى') || loc.includes('شناص')) return 'شمال الباطنة';
  if (loc.includes('نزوى') || loc.includes('بهلاء')) return 'الداخلية';
  if (loc.includes('صلالة') || loc.includes('طاقة')) return 'ظفار';
  return '';
}

/* هل جهة العمل مستثناة من التوجيه للجهات الخارجية؟ */
function isEmployerExcluded(req) {
  const cr = String(req?.employer?.cr || '');
  if (!cr) return false;
  return (window.EXCLUDED_EMPLOYERS_DATA || EXCLUDED_EMPLOYERS_DATA || [])
    .some(e => String(e.cr) === cr);
}

/* اختصاص الجهة في محافظة معينة — يرجع '' إذا لم تكن المحافظة ضمن نطاقها */
function getEntityScopeInGovernorate(entity, governorate) {
  const row = (entity?.coverage || []).find(c => c.governorate === governorate);
  return row ? row.scope : '';
}

/* هل نوع الطلب يطابق الاختصاص؟ */
function scopeMatchesRequestType(scope, requestType) {
  if (!scope) return false;
  if (scope === 'كلاهما') return true;
  if (scope === 'إصابات العمل') return requestType === 'إصابة عمل';
  if (scope === 'الأمراض المهنية') return requestType === 'مرض مهني';
  return false;
}

/* هل الطلب معروض على هذه الجهة الخارجية؟ */
function isRequestVisibleToEntity(req, entity) {
  if (!req || !entity) return false;
  if (entity.status !== 'نشطة') return false;
  if (isEmployerExcluded(req)) return false;
  const gov = getRequestGovernorate(req);
  if (!gov) return false;
  const scope = getEntityScopeInGovernorate(entity, gov);
  return scopeMatchesRequestType(scope, req.type);
}

/* الجهة الخارجية المرتبطة بمستخدم خارجي */
function getEntityOfUser(civilOrName) {
  const user = (window.EXTERNAL_ENTITY_USERS_DATA || EXTERNAL_ENTITY_USERS_DATA || [])
    .find(u => u.civil === civilOrName || u.name === civilOrName);
  if (!user) return null;
  return (window.EXTERNAL_ENTITIES_DATA || EXTERNAL_ENTITIES_DATA || [])
    .find(e => e.id === user.entityId) || null;
}

/* نتيجة قائمة التحقق — هل الحالة مستوفية لمعايير المشاركة مع وزارة العمل؟ */
function checklistTriggersMolShare(checklist) {
  if (!checklist || typeof checklist !== 'object') return false;
  return Object.values(checklist).some(v => v === 'لا');
}

/* هل الطلب مستوفٍ لمعايير المشاركة مع وزارة العمل؟ */
function isEligibleForMolShare(req) {
  return (req?.fieldVisits || []).some(v => checklistTriggersMolShare(v.checklist));
}

/* سجل مشاركة الطلب مع وزارة العمل */
function getMolShareForRequest(requestId) {
  return (window.MOL_SHARES_DATA || MOL_SHARES_DATA || [])
    .find(s => s.requestId === requestId) || null;
}

/* إحصاءات أداء جهة خارجية */
function getEntityPerformance(entityId, allowances) {
  const data = allowances || window.WI_DATA?.allowances || [];
  const rows = data.filter(r => r.externalEntity?.entityId === entityId);
  const open = rows.filter(r => r.status === 'قيد التحقيق — جهة خارجية مخولة').length;
  const returned = rows.filter(r => (r.externalEntity?.returnCount || 0) > 0).length;
  const done = rows.filter(r => r.externalEntity?.submittedDate).length;
  const late = rows.filter(r => (r.externalEntity?.elapsedDays || 0) > (r.externalEntity?.slaDays || 0)).length;
  const durations = rows
    .map(r => r.externalEntity?.elapsedDays)
    .filter(d => typeof d === 'number');
  const avg = durations.length
    ? Math.round((durations.reduce((a, b) => a + b, 0) / durations.length) * 10) / 10
    : 0;
  return {
    total: rows.length,
    open,
    done,
    late,
    returned,
    avgDays: avg,
    onTimeRate: done ? Math.round(((done - late) / done) * 100) : 0,
    returnRate: done ? Math.round((returned / done) * 100) : 0,
  };
}

/* ملاحظات جهة خارجية معينة، الأحدث أولاً */
function getEntityNotes(entityId) {
  const all = window.ENTITY_NOTES_DATA || ENTITY_NOTES_DATA || [];
  const rows = entityId ? all.filter(n => n.entityId === entityId) : all.slice();
  return rows.sort((a, b) => String(b.time).localeCompare(String(a.time)));
}

/* توثيق ملاحظة تشغيلية على جهة خارجية */
function addEntityNote({ entityId, category, level, requestId, text, author, role }) {
  const all = window.ENTITY_NOTES_DATA || ENTITY_NOTES_DATA;
  const note = {
    id: `ENN-${String(all.length + 1).padStart(4, '0')}`,
    entityId,
    category: category || 'أخرى',
    level: level || 'عادية',
    requestId: requestId || '',
    text,
    author,
    role,
    time: new Date().toISOString().slice(0, 16).replace('T', ' '),
  };
  all.push(note);
  return note;
}

window.ENTITY_NOTE_CATEGORIES = ENTITY_NOTE_CATEGORIES;
window.ENTITY_NOTE_LEVELS = ENTITY_NOTE_LEVELS;
window.ENTITY_NOTES_DATA = ENTITY_NOTES_DATA;
window.EXTERNAL_ENTITIES_DATA = EXTERNAL_ENTITIES_DATA;
window.EXTERNAL_ENTITY_USERS_DATA = EXTERNAL_ENTITY_USERS_DATA;
window.EXCLUDED_EMPLOYERS_DATA = EXCLUDED_EMPLOYERS_DATA;
window.FIELD_VISIT_CHECKLIST = FIELD_VISIT_CHECKLIST;
window.MOL_SHARES_DATA = MOL_SHARES_DATA;
