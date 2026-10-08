/* ================================================================
   utils.js — Shared utility functions (event handlers, modals,
              upload, dashboard enhancements, search/filter logic)
   These are pure utilities with no role-specific panel content.
   ================================================================ */

/* ── متغير الطلب الحالي ── */
let currentRequestId = null;
let currentRequestTypeFilter = 'all';

/* ── Request Type Filter Handling ── */
function updateRequestTypeFilter(value) {
  currentRequestTypeFilter = value;
  // Trigger re-render by calling the page-specific update function if it exists
  if (typeof window.handleRequestTypeFilterChange === 'function') {
    window.handleRequestTypeFilterChange(value);
  }
}

function getRequestTypeFilter() {
  return currentRequestTypeFilter;
}

function resetRequestTypeFilter() {
  currentRequestTypeFilter = 'all';
  const select = document.getElementById('request-type-filter');
  if (select) select.value = 'all';
}

/* ── تنسيق حجم الملف ── */
function formatFileSize(bytes) {
  if (!bytes) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  let size = bytes;
  let i = 0;
  while (size >= 1024 && i < units.length - 1) { size /= 1024; i++; }
  return `${size.toFixed(size >= 10 || i === 0 ? 0 : 1)} ${units[i]}`;
}

/* ═══════════════════════════════════════════════════════════════
   تنفيذ الإجراءات (decision panel buttons)
   ═══════════════════════════════════════════════════════════════ */
function executeAction(action) {
  const needsConfirm = action.includes('رفض') || action.includes('إغلاق') || action.includes('إلغاء') || action.includes('إيقاف');
  const isPositive   = action.includes('اعتماد') || action.includes('موافقة') || action.includes('تنفيذ');
  if (needsConfirm) {
    confirmAction({
      title: 'تأكيد الإجراء',
      msg: `هل أنت متأكد من تنفيذ الإجراء التالي؟<br><br><strong>${action}</strong>`,
      confirmLabel: action,
      confirmClass: 'btn-danger',
      onConfirm: () => { showToast(`تم تنفيذ: ${action}`, 's'); setTimeout(() => window.location.reload(), 1500); }
    });
  } else {
    showToast(`تم تنفيذ: ${action}`, isPositive ? 's' : 'i');
    setTimeout(() => window.location.reload(), 1500);
  }
}

/* ═══════════════════════════════════════════════════════════════
   الملاحظات التشغيلية
   ═══════════════════════════════════════════════════════════════ */
function quickAddNote() {
  const inp = document.getElementById('quick-note-input');
  if (!inp || !inp.value.trim()) { showToast('يرجى كتابة الملاحظة', 'w'); return; }
  showToast('تم حفظ الملاحظة', 's');
  inp.value = '';
}

function toggleOperationalNotes(card) {
  if (!card) return;
  const willExpand = card.classList.contains('collapsed');
  card.classList.toggle('collapsed', !willExpand);
  card.classList.toggle('expanded', willExpand);
}

function placeAndCollapseOperationalNotes() {
  const content = document.getElementById('app-content');
  if (!content) return;
  const decisionPanel = content.querySelector('.dp');
  const notesCards    = content.querySelectorAll('.op-notes-card');
  notesCards.forEach((card) => {
    if (card.dataset.notesInit !== '1') {
      card.classList.add('collapsed');
      card.classList.remove('expanded');
      card.dataset.notesInit = '1';
    }
    if (decisionPanel && card.previousElementSibling !== decisionPanel) {
      decisionPanel.insertAdjacentElement('afterend', card);
    }
  });
}

(function setupOperationalNotesObserver() {
  const run = () => setTimeout(placeAndCollapseOperationalNotes, 0);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
  else run();
  const observer = new MutationObserver(() => run());
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();

/* ═══════════════════════════════════════════════════════════════
   استعلام التقارير الطبية (وزارة الصحة)
   ═══════════════════════════════════════════════════════════════ */
function runMedicalQuery(civilId) {
  const resultsEl = document.getElementById('mq-results');
  if (!resultsEl) return;
  resultsEl.innerHTML = `<div class="loading">${ICONS.clock} جارٍ الاستعلام من وزارة الصحة...</div>`;
  setTimeout(() => {
    resultsEl.innerHTML = `
      <div class="flbl" style="margin-bottom:8px">نتائج الاستعلام — ${civilId}</div>
      <div class="tbl-wrap">
        <table class="dtbl">
          <thead><tr><th>رقم التقرير</th><th>الجهة الصحية</th><th>التاريخ</th><th>نوع التقرير</th><th>التشخيص</th><th>أيام الإجازة</th><th></th></tr></thead>
          <tbody>
            <tr><td style="font-family:monospace">RPT-2024-089123</td><td>مستشفى السلطاني</td><td>2024-12-10</td><td>إجازة مرضية</td><td>الربو الحاد</td><td>14 يوم</td><td><button class="ibtn" onclick="openMedicalReportDetails('RPT-2024-089123')">${ICONS.eye}</button></td></tr>
            <tr><td style="font-family:monospace">RPT-2024-076540</td><td>مستشفى خولة</td><td>2024-10-05</td><td>فحص دوري</td><td>وظائف الرئة</td><td>—</td><td><button class="ibtn" onclick="openMedicalReportDetails('RPT-2024-076540')">${ICONS.eye}</button></td></tr>
            <tr><td style="font-family:monospace">RPT-2024-063211</td><td>مستشفى الرحمة الخاص</td><td>2024-07-22</td><td>تقرير متابعة</td><td>ضغط الدم المرتفع</td><td>7 أيام</td><td><button class="ibtn" onclick="openMedicalReportDetails('RPT-2024-063211')">${ICONS.eye}</button></td></tr>
          </tbody>
        </table>
      </div>`;
  }, 1200);
}

function openMedicalReportDetails(reportId) {
  openModal({
    title: `تفاصيل التقرير الطبي — ${reportId}`,
    size: 'md-lg',
    body: `
      <div class="card" style="border:none;box-shadow:none">
        <div style="background:var(--g50);padding:16px;border-radius:12px;margin-bottom:16px;display:flex;justify-content:space-between;align-items:center">
          <div>
            <div style="font-size:12px;color:var(--text3)">الجهة المصدرة</div>
            <div style="font-size:16px;font-weight:700;color:var(--primary)">مستشفى السلطاني — مسقط</div>
          </div>
          <div style="text-align:left">
            <div style="font-size:12px;color:var(--text3)">تاريخ الإصدار</div>
            <div style="font-size:14px;font-weight:600">10 ديسمبر 2024</div>
          </div>
        </div>
        <div class="fg fg-3" style="margin-bottom:20px">
          <div class="fgrp"><label class="flbl">رقم التقرير</label><div class="fro">${reportId}</div></div>
          <div class="fgrp"><label class="flbl">اسم المريض</label><div class="fro">${WI_DATA.users.worker.name}</div></div>
          <div class="fgrp"><label class="flbl">الرقم المدني</label><div class="fro">${WI_DATA.users.worker.civil}</div></div>
        </div>
        <div class="divider"></div>
        <div class="fg fg-2">
          <div class="fgrp"><label class="flbl">التشخيص الطبي (ICD-10)</label><div class="fro">J45.909 - Asthma, unspecified</div></div>
          <div class="fgrp"><label class="flbl">الفترة الممنوحة</label><div class="fro">14 يوم (من 2024-12-10 إلى 2024-12-23)</div></div>
        </div>
        <div class="fgrp" style="margin-top:16px">
          <label class="flbl">خلاصة الحالة الطبية والتوصيات</label>
          <div class="fro" style="line-height:1.8;height:auto;padding:12px">
            تمت معاينة المريض في وحدة الطوارئ حيث كان يعاني من نوبة ربو حادة وضيق في التنفس. تم إعطاء العلاج اللازم. الحالة تستدعي الراحة التامة لمدة أسبوعين. سيتم مراجعة الحالة في العيادة الخارجية بعد أسبوع.
          </div>
        </div>
        <div style="margin-top:20px;padding:12px;border:1px dashed var(--border);border-radius:8px;display:flex;align-items:center;gap:12px">
          <div style="width:40px;height:40px;border-radius:50%;background:var(--s100);color:var(--s700);display:flex;align-items:center;justify-content:center">${ICONS.check}</div>
          <div>
            <div style="font-size:13px;font-weight:700">التوقيع الإلكتروني معتمد</div>
            <div style="font-size:11px;color:var(--text3)">د. أحمد بن عبدالله الحوسني — استشاري أول أمراض صدرية</div>
          </div>
        </div>
      </div>`,
    footer: `
      <button class="btn btn-secondary btn-sm" onclick="showToast('جارٍ طباعة التقرير...','i')">${ICONS.download} طباعة التقرير</button>
      <button class="btn btn-ghost btn-sm" onclick="closeModal()">إغلاق</button>`
  });
}

/* ═══════════════════════════════════════════════════════════════
   رفع الملفات (Modern Multi-File Upload)
   ═══════════════════════════════════════════════════════════════ */
function renderModernUploadComponent({ idPrefix = 'up', title = 'إرفاق المستندات', subTitle = 'يمكنك اختيار عدة ملفات معاً (PDF, Word, صور...)' }) {
  const containerId = `${idPrefix}-container`;
  const inputId     = `${idPrefix}-input`;
  const listId      = `${idPrefix}-list`;
  return `
    <div class="dz-container" id="${containerId}">
      <div class="dz-box" onclick="document.getElementById('${inputId}').click()">
        <div class="dz-box-icon">${ICONS.upload}</div>
        <div class="dz-box-text">اسحب الملفات هنا أو انقر للاختيار</div>
        <div class="dz-box-sub">${subTitle}</div>
        <input type="file" id="${inputId}" class="fc" multiple style="display:none" onchange="handleModernFileUpload(this, '${listId}')">
      </div>
      <div class="dz-list" id="${listId}"></div>
    </div>`;
}

function handleModernFileUpload(input, listId) {
  const listEl = document.getElementById(listId);
  if (!listEl) return;
  const files = Array.from(input.files);
  if (!files.length) return;
  files.forEach(file => {
    const fileId = 'f-' + Math.random().toString(36).substr(2, 9);
    const item   = document.createElement('div');
    item.className = 'dz-item';
    item.id = fileId;
    const ext   = file.name.split('.').pop().toLowerCase();
    const isImg = ['jpg', 'jpeg', 'png', 'gif'].includes(ext);
    item.innerHTML = `
      <div class="dz-item-icon">${isImg ? ICONS.eye : ICONS.file}</div>
      <div class="dz-item-info">
        <div class="dz-item-name" title="${file.name}">${file.name}</div>
        <div class="dz-item-size">${formatFileSize(file.size)}</div>
      </div>
      <button type="button" class="ibtn d" onclick="this.closest('.dz-item').remove()" title="حذف">${ICONS.trash}</button>`;
    listEl.appendChild(item);
  });
  showToast(`تمت إضافة ${files.length} ملف(ات)`, 's');
  input.value = '';
}

function handleFileUpload(input) {
  if (input.files.length > 0) showToast(`تم رفع الملف: ${input.files[0].name}`, 's');
}

function renderDecisionFiles(input) {
  const listEl = document.getElementById('decision-files-list');
  if (!listEl) return;
  const files = Array.from(input?.files || []);
  if (!files.length) { listEl.innerHTML = ''; return; }
  listEl.innerHTML = files.map((file) => {
    const ext  = (file.name.split('.').pop() || '').toUpperCase();
    const type = ext || (file.type ? file.type.split('/').pop().toUpperCase() : 'FILE');
    return `
      <div class="decision-file-item">
        <div class="decision-file-main">
          <span class="decision-file-title">${file.name}</span>
          <span class="decision-file-type">${type}</span>
        </div>
        <div class="decision-file-meta">${formatFileSize(file.size)}</div>
      </div>`;
  }).join('');
}

/* ═══════════════════════════════════════════════════════════════
   نوافذ الإضافة المشتركة
   ═══════════════════════════════════════════════════════════════ */
function openAddAttachmentModal() {
  openModal({
    title: 'إضافة مرفق',
    body: `
      <div class="fg" style="gap:14px">
        <div class="fgrp">
          <label class="flbl">نوع المرفق <span class="req">*</span></label>
          <select class="fc">
            <option>تقرير طبي</option><option>تقرير شرطة</option><option>كشف حضور وانصراف</option>
            <option>صور</option><option>تسجيل صوتي</option><option>فيديو</option><option>وثيقة رسمية</option><option>مستند آخر</option>
          </select>
        </div>
        <div class="fgrp">
          <label class="flbl">الملف <span class="req">*</span></label>
          <input type="file" class="fc" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.mp3,.wav,.mp4">
          <div class="fhint">PDF, Word, صور, MP3, WAV, MP4 — الحجم الأقصى 20 ميغابايت</div>
        </div>
      </div>`,
    footer: `<button class="btn btn-primary" onclick="closeModal();showToast('تم رفع المرفق بنجاح','s')">رفع المرفق</button><button class="btn btn-ghost" onclick="closeModal()">إلغاء</button>`
  });
}

function openAddSickLeaveModal() {
  openModal({
    title: 'إضافة فترة إجازة مرضية',
    body: `
      <div class="fg fg-2" style="gap:14px">
        <div class="fgrp"><label class="flbl">من تاريخ <span class="req">*</span></label><input type="date" class="fc"></div>
        <div class="fgrp"><label class="flbl">إلى تاريخ <span class="req">*</span></label><input type="date" class="fc"></div>
        <div class="fgrp"><label class="flbl">الجهة الصحية المصدرة</label><select class="fc"><option>مستشفى السلطاني</option><option>مستشفى خولة</option><option>مستشفى الرحمة الخاص</option><option>عيادة أخرى</option></select></div>
        <div class="fgrp"><label class="flbl">رقم التقرير الطبي</label><input type="text" class="fc" placeholder="RPT-2024-XXXXXX"></div>
        <div class="fgrp span-full"><label class="flbl">ملاحظات</label><textarea class="fc" rows="2" placeholder="ملاحظات إضافية حول الفترة..."></textarea></div>
      </div>`,
    footer: `<button class="btn btn-primary" onclick="closeModal();showToast('تم إضافة فترة الإجازة المرضية','s')">حفظ الفترة</button><button class="btn btn-ghost" onclick="closeModal()">إلغاء</button>`
  });
}

function openOriginalRequest(id) {
  showToast(`فتح الطلب الأصلي ${id} في نافذة جديدة`, 'i');
}

/* ═══════════════════════════════════════════════════════════════
   الزيارات الميدانية
   ═══════════════════════════════════════════════════════════════ */
let visitStaffState = [];

function renderVisitStaffTable() {
  const container = document.getElementById('visit-staff-table-container');
  if (!container) return;
  const internalUsers = Object.values(WI_DATA.users).filter(u => u.employeeId);
  container.innerHTML = `
    <table class="dtbl" style="margin-bottom:8px;font-size:12.5px">
      <thead><tr><th>الموظف</th><th style="width:40px"></th></tr></thead>
      <tbody>
        ${visitStaffState.length === 0
          ? '<tr><td colspan="2" style="text-align:center;color:var(--text3);padding:10px">لم يتم إضافة موظفين بعد</td></tr>'
          : visitStaffState.map((name, i) => `<tr><td>${name}</td><td><button class="ibtn d" onclick="removeVisitStaff(${i})">${ICONS.trash}</button></td></tr>`).join('')}
      </tbody>
    </table>
    <div style="display:flex;gap:8px">
      <select class="fc" id="add-staff-select" style="flex:1">
        <option value="">-- اختر موظفاً لإضافته --</option>
        ${internalUsers.map(u => `<option value="${u.name}">${u.name} (${u.employeeId})</option>`).join('')}
      </select>
      <button class="btn btn-secondary btn-sm" style="white-space:nowrap" onclick="addVisitStaff()">${ICONS.plus} إضافة</button>
    </div>`;
}

function addVisitStaff() {
  const sel = document.getElementById('add-staff-select');
  if (!sel || !sel.value) return;
  if (visitStaffState.includes(sel.value)) { showToast('الموظف مضاف مسبقاً', 'w'); return; }
  visitStaffState.push(sel.value);
  renderVisitStaffTable();
}

function removeVisitStaff(index) {
  visitStaffState.splice(index, 1);
  renderVisitStaffTable();
}

/* بطاقة عرض زيارة ميدانية — تُستخدم في شاشات قسم التحقيق والجهة الخارجية المخولة */
function renderFieldVisitCard(v) {
  const items = window.FIELD_VISIT_CHECKLIST || [];
  const hasChecklist = v.checklist && Object.keys(v.checklist).length;
  const eligible = typeof checklistTriggersMolShare === 'function' && checklistTriggersMolShare(v.checklist);
  const locationText = v.locationType === 'map'
    ? `تحديد على الخريطة — ${v.coordinates || '—'}`
    : (v.branchName || v.branchId || '—');
  return `
    <div style="border-right:3px solid var(--accent);background:var(--g50);padding:14px;border-radius:10px;margin-bottom:12px">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px">
        <div>
          <div style="font-size:11px;color:var(--text3);font-weight:600">${formatDate(v.date)}${v.time ? ` — ${v.time}` : ''}</div>
          <div style="font-size:14px;font-weight:700;color:var(--primary);margin-top:2px">${normalizeDisplay(v.reason)}</div>
        </div>
        <span style="font-size:10px;display:flex;align-items:center;gap:4px;color:var(--success);font-weight:700"><span style="width:6px;height:6px;background:var(--success);border-radius:50%"></span> تم التنفيذ</span>
      </div>
      <div class="fg fg-2" style="gap:10px">
        <div class="fgrp"><label class="flbl" style="margin-bottom:2px">موقع الزيارة</label><div style="font-size:12.5px;color:var(--text2)">${locationText}</div></div>
        <div class="fgrp"><label class="flbl" style="margin-bottom:2px">الموظفون القائمون</label><div style="font-size:12.5px;color:var(--text2)">${normalizeDisplay(v.staff)}</div></div>
        <div class="fgrp span-full"><label class="flbl" style="margin-bottom:2px">من تمت مقابلتهم</label><div style="font-size:12.5px;color:var(--text2)">${normalizeDisplay(v.interviewees)}</div></div>
      </div>
      <div class="fgrp" style="margin-top:8px"><label class="flbl" style="margin-bottom:2px">ملخص الزيارة والنتائج</label><div style="font-size:13px;color:var(--text1);line-height:1.6">${normalizeDisplay(v.summary)}</div></div>
      ${v.notes ? `<div class="fgrp" style="margin-top:8px"><label class="flbl" style="margin-bottom:2px">ملاحظات الزيارة</label><div style="font-size:13px;color:var(--text1);line-height:1.6">${v.notes}</div></div>` : ''}
      ${hasChecklist ? `
      <div style="margin-top:12px;border-top:1px dashed var(--border);padding-top:10px">
        <label class="flbl" style="margin-bottom:6px">قائمة التحقق الميدانية</label>
        <table class="dtbl" style="font-size:12px;background:#fff">
          <thead><tr><th>البند</th><th style="width:110px">الإجابة</th></tr></thead>
          <tbody>
            ${items.map(it => {
              const val = v.checklist[it.id] || '—';
              const cls = val === 'لا' ? 'b-rejected' : val === 'نعم' ? 'b-approved' : 'b-draft';
              return `<tr><td>${it.text}</td><td><span class="badge ${cls}">${val}</span></td></tr>`;
            }).join('')}
          </tbody>
        </table>
        <div style="margin-top:8px;font-size:11.5px;color:${eligible ? 'var(--warning)' : 'var(--text3)'};font-weight:600">
          ${eligible
            ? 'الحالة مستوفية لمعايير المشاركة مع وزارة العمل — تتم المشاركة بعد اعتماد رئيس قسم التحقيق.'
            : 'الحالة غير مستوفية لمعايير المشاركة مع وزارة العمل.'}
        </div>
      </div>` : ''}
    </div>`;
}

/* موقع الزيارة — إما فرع المنشأة أو تحديده على الخريطة */
function toggleVisitLocationMode(mode) {
  const branchBox = document.getElementById('visit-location-branch');
  const mapBox = document.getElementById('visit-location-map');
  if (!branchBox || !mapBox) return;
  branchBox.style.display = mode === 'branch' ? '' : 'none';
  mapBox.style.display = mode === 'map' ? '' : 'none';
}

function renderVisitChecklist() {
  const items = window.FIELD_VISIT_CHECKLIST || [];
  if (!items.length) return '';
  return `
    <div class="fgrp span-full" style="border-top:1px dashed var(--border);padding-top:14px">
      <label class="flbl" style="color:var(--primary);font-weight:700">قائمة التحقق الميدانية</label>
      <div style="font-size:11.5px;color:var(--text3);margin-bottom:10px">
        تحدد نتيجة هذه القائمة خضوع الحالة للمشاركة مع وزارة العمل — أي بند بالإجابة «لا» يجعل الحالة مستوفية لمعايير المشاركة.
      </div>
      <table class="dtbl" style="font-size:12.5px">
        <thead><tr><th>البند</th><th style="width:150px">الإجابة</th></tr></thead>
        <tbody>
          ${items.map(it => `
          <tr>
            <td>${it.text}</td>
            <td>
              <select class="fc" id="chk-${it.id}" onchange="updateVisitChecklistHint()">
                <option value="نعم">نعم</option>
                <option value="لا">لا</option>
                <option value="لا ينطبق">لا ينطبق</option>
              </select>
            </td>
          </tr>`).join('')}
        </tbody>
      </table>
      <div id="visit-checklist-hint" style="margin-top:10px"></div>
    </div>`;
}

function updateVisitChecklistHint() {
  const box = document.getElementById('visit-checklist-hint');
  if (!box) return;
  const items = window.FIELD_VISIT_CHECKLIST || [];
  const failed = items.filter(it => document.getElementById(`chk-${it.id}`)?.value === 'لا');
  box.innerHTML = failed.length
    ? `<div class="alert alert-w">${ICONS.warn}<span>الحالة مستوفية لمعايير المشاركة مع وزارة العمل (${failed.length} بند بالإجابة «لا») — تتم المشاركة بعد اعتماد رئيس قسم التحقيق.</span></div>`
    : `<div class="alert alert-i">${ICONS.info}<span>الحالة غير مستوفية لمعايير المشاركة مع وزارة العمل.</span></div>`;
}

function openAddVisitModal() {
  visitStaffState = [];
  const req = (WI_DATA.allowances || []).find(r => r.id === window.currentRequestId) || null;
  const branches = (WI_DATA.users?.employer_delegate?.branches) || [];
  openModal({
    title: 'إضافة زيارة ميدانية جديدة',
    size: 'md-lg',
    body: `
      <div class="fg fg-2" style="gap:14px">
        <div class="fgrp"><label class="flbl">تاريخ الزيارة <span class="req">*</span></label><input type="date" class="fc" value="${new Date().toISOString().split('T')[0]}"></div>
        <div class="fgrp"><label class="flbl">وقت الزيارة</label><input type="time" class="fc" value="09:00"></div>
        <div class="fgrp span-full"><label class="flbl">سبب الزيارة / الغرض <span class="req">*</span></label><textarea class="fc" rows="2" placeholder="مثال: معاينة موقع الحادث، التحقق من الشهود..."></textarea></div>

        <div class="fgrp span-full" style="border-top:1px dashed var(--border);padding-top:14px">
          <label class="flbl">موقع الزيارة <span class="req">*</span></label>
          <div style="display:flex;gap:16px;margin-bottom:10px;font-size:12.5px">
            <label style="display:flex;align-items:center;gap:6px;cursor:pointer">
              <input type="radio" name="visit-loc-mode" value="branch" checked onchange="toggleVisitLocationMode('branch')"> اختيار فرع المنشأة
            </label>
            <label style="display:flex;align-items:center;gap:6px;cursor:pointer">
              <input type="radio" name="visit-loc-mode" value="map" onchange="toggleVisitLocationMode('map')"> تحديد الموقع على الخريطة
            </label>
          </div>
          <div id="visit-location-branch">
            <select class="fc" id="visit-branch">
              <option value="">-- اختر الفرع --</option>
              ${branches.map(b => `<option value="${b.id}">${b.id} — ${b.name} — ${b.state}${b.governorate ? ' (' + b.governorate + ')' : ''}</option>`).join('')}
            </select>
          </div>
          <div id="visit-location-map" style="display:none">
            <div style="background:var(--g50);border:1px dashed var(--border);border-radius:10px;padding:18px;text-align:center;color:var(--text3);font-size:12px">
              ${ICONS.map} تحديد الموقع على الخريطة
            </div>
            <div class="fg fg-2" style="gap:10px;margin-top:10px">
              <div class="fgrp"><label class="flbl">دائرة العرض</label><input class="fc" id="visit-lat" placeholder="23.5880"></div>
              <div class="fgrp"><label class="flbl">خط الطول</label><input class="fc" id="visit-lng" placeholder="58.3829"></div>
            </div>
          </div>
        </div>

        <div class="fgrp span-full">
          <label class="flbl">الموظفون القائمون بالزيارة <span class="req">*</span></label>
          <div id="visit-staff-table-container"></div>
        </div>
        <div class="fgrp span-full"><label class="flbl">من تمت مقابلتهم أثناء الزيارة</label><textarea class="fc" id="visit-interviewees" rows="2" placeholder="الاسم والصفة لكل شخص تمت مقابلته..."></textarea></div>
        <div class="fgrp span-full"><label class="flbl">ملخص الزيارة والنتائج</label><textarea class="fc" rows="4" placeholder="اكتب ملخصاً لما تم خلال الزيارة..."></textarea></div>
        <div class="fgrp span-full"><label class="flbl">ملاحظات الزيارة</label><textarea class="fc" id="visit-notes" rows="3" placeholder="الملاحظات التي قد تُشارك مع وزارة العمل عند استيفاء معايير المشاركة..."></textarea></div>
        ${renderVisitChecklist()}
        <div class="fgrp span-full">
          <label class="flbl">مرفقات الزيارة (صور، تقارير، وثائق)</label>
          ${renderModernUploadComponent({ idPrefix: 'visit-att', subTitle: 'يمكن رفع عدة صور أو مستندات PDF' })}
        </div>
      </div>`,
    footer: `<button class="btn btn-primary" onclick="saveFieldVisit()">حفظ الزيارة</button><button class="btn btn-ghost" onclick="closeModal()">إلغاء</button>`
  });
  setTimeout(() => { renderVisitStaffTable(); updateVisitChecklistHint(); }, 0);
}

function saveFieldVisit() {
  const items = window.FIELD_VISIT_CHECKLIST || [];
  const failed = items.filter(it => document.getElementById(`chk-${it.id}`)?.value === 'لا');
  closeModal();
  if (failed.length) {
    showToast('تم حفظ الزيارة الميدانية — الحالة مستوفية لمعايير المشاركة مع وزارة العمل بعد اعتماد رئيس القسم', 'w', 5000);
  } else {
    showToast('تم حفظ الزيارة الميدانية وتحديث السجل', 's');
  }
}

/* ═══════════════════════════════════════════════════════════════
   البحث والتصفية الموحدة
   ═══════════════════════════════════════════════════════════════ */
let globalSearchTimer = null;
function handleGlobalSearch(val, callback) {
  clearTimeout(globalSearchTimer);
  globalSearchTimer = setTimeout(() => { if (callback) callback(val); }, 400);
}
function noopUnifiedSearch() {}
function noopUnifiedToggleAll() {}

function getItemRequestNumber(item) {
  return item?.id || item?.requestId || item?.refId || item?.originalRequestId || '';
}
function getItemStatus(item) {
  return item?.status || item?.requestStatus || '';
}
function getItemSubmitDate(item) {
  return item?.submitDate || item?.requestSubmitDate || item?.date || item?.provenDate || item?.lastUpdate || '';
}
function getSubmittedByName(item) {
  return item?.submittedBy || item?.applicant?.name || item?.delegate?.name || item?.applicantName || item?.insured?.name || item?.institution?.name || '—';
}
function getCurrentRoleUser(role) {
  const key = String(role || '').replace(/-/g, '_');
  return WI_DATA.users?.[key] || null;
}
function findUserByName(name) {
  if (!name) return null;
  return Object.values(WI_DATA.users || {}).find((user) => user?.name === name) || null;
}
function getAvailabilityAwareRoster(seedList = []) {
  return seedList.map((seed) => {
    const user = seed.roleKey ? getCurrentRoleUser(String(seed.roleKey).replace(/_/g, '-')) : findUserByName(seed.name);
    const availability = user?.availability || null;
    const status = availability?.status || (seed.available === false ? 'غير متاح' : 'متاح');
    return {
      ...seed,
      roleKey: seed.roleKey || '',
      name: user?.name || seed.name || '—',
      employeeId: user?.employeeId || seed.employeeId || seed.id || '—',
      load: Number(seed.load || 0),
      availabilityStatus: status,
      available: status === 'متاح',
      availabilityNote: availability?.note || seed.availabilityNote || '',
    };
  });
}
function isVisibleForRole(role, item) {
  const roleConfig = WI_CONFIG.roles?.[role] || {};
  const roleUser = getCurrentRoleUser(role);
  const status = getItemStatus(item);
  const stages = WI_CONFIG.roleStages?.[role] || [];
  const assignedToMe = !!roleUser?.name && (item?.assignedTo === roleUser.name || item?.checkedOutBy === roleUser.name);
  const pendingForRole = stages.some(stage => status === stage || status.includes(stage) || stage.includes(status));

  /* الجهة الخارجية المخولة بالتحقيق — العرض جماعي وليس إسناداً فردياً:
     تظهر الطلبات تلقائياً وفق تطابق المحافظة مع النطاق الجغرافي للجهة،
     وتطابق نوع الطلب مع اختصاص الجهة في تلك المحافظة تحديداً،
     مع استثناء جهات العمل المدرجة في قائمة الجهات المستثناة. */
  if (role === 'external-investigator') {
    const entity = typeof getEntityOfUser === 'function'
      ? getEntityOfUser(roleUser?.civil || roleUser?.name)
      : null;
    if (!entity) return false;
    if (typeof isRequestVisibleToEntity !== 'function') return false;
    if (!isRequestVisibleToEntity(item, entity)) return false;
    /* الطلبات التي عملت عليها الجهة تبقى ظاهرة لها للاطلاع */
    if (item?.externalEntity?.entityId === entity.id) return true;
    return pendingForRole;
  }

  if (roleConfig.type === 'external') {
    if (!roleUser) return true;
    const civil = roleUser.civil;
    const companyCr = roleUser.cr || roleUser.companyCr;
    const companyName = roleUser.company;
    const ownCivil = civil && (
      item?.applicant?.civil === civil ||
      item?.insured?.civil === civil ||
      item?.delegate?.civil === civil ||
      item?.civil === civil
    );
    const ownCompany = (companyCr && (item?.employer?.cr === companyCr || item?.institution?.cr === companyCr))
      || (companyName && (item?.employer?.name || '').includes(companyName));
    return ownCivil || ownCompany || pendingForRole || assignedToMe;
  }

  return pendingForRole || assignedToMe;
}

function getFilteredData({ role, data, query = '', showAll = false, requestTypeFilter = '' }) {
  const q = String(query || '').toLowerCase().trim();
  return (data || []).filter(r => {
    const searchText = [
      getItemRequestNumber(r),
      getItemStatus(r),
      getItemSubmitDate(r),
      getSubmittedByName(r),
      r?.insured?.name,
      r?.insured?.civil,
      r?.applicant?.civil,
      r?.delegate?.civil,
      r?.employer?.name,
      r?.employer?.cr,
      r?.institution?.name,
      r?.institution?.cr,
      r?.requestType,
      r?.type,
      r?.subtype,
      r?.diagnosis,
    ].filter(Boolean).join(' ').toLowerCase();
    const matchesSearch = !q || searchText.includes(q);
    if (!matchesSearch) return false;

    // Request type filtering
    if (requestTypeFilter && requestTypeFilter !== 'all') {
      const requestType = (r?.requestType || r?.type || '').toLowerCase();
      const filterType = requestTypeFilter.toLowerCase();
      if (!requestType.includes(filterType)) return false;
    }

    return showAll || isVisibleForRole(role, r);
  });
}

function renderUnifiedFilterBar({ onSearch = 'noopUnifiedSearch', onToggleAll = 'noopUnifiedToggleAll', isAllVisible = false, includeToggle = true, requestPlaceholder = 'WI-2025-001234', includeRequestTypeFilter = false, requestTypeOptions = [], includeCivilSearch = true, includeCommercialRegisterSearch = true } = {}) {
  const requestTypeOptionsHtml = includeRequestTypeFilter && requestTypeOptions.length > 0
    ? `
        <div class="fgrp" style="margin:0">
          <label class="flbl">نوع الطلب</label>
          <select class="fc" id="request-type-filter" onchange="updateRequestTypeFilter(this.value)">
            <option value="all">الكل</option>
            ${requestTypeOptions.map(opt => `<option value="${opt.value}">${opt.label}</option>`).join('')}
          </select>
        </div>`
    : '';

  const searchColumns = [
    '1.15fr',
    includeCivilSearch ? '1fr' : null,
    includeCommercialRegisterSearch ? '1fr' : null,
    includeRequestTypeFilter ? '1fr' : null,
    '0.9fr',
    '0.9fr',
    '1.2fr',
    'auto',
  ].filter(Boolean).join(' ');

  const civilSearchHtml = includeCivilSearch
    ? `
        <div class="fgrp" style="margin:0">
          <label class="flbl">Ø§Ù„Ø±Ù‚Ù… Ø§Ù„Ù…Ø¯Ù†ÙŠ</label>
          <input type="text" class="fc" placeholder="9012345678">
        </div>`
    : '';

  const commercialRegisterSearchHtml = includeCommercialRegisterSearch
    ? `
        <div class="fgrp" style="margin:0">
          <label class="flbl">Ø±Ù‚Ù… Ø§Ù„Ø³Ø¬Ù„ Ø§Ù„ØªØ¬Ø§Ø±ÙŠ</label>
          <input type="text" class="fc" placeholder="1234567">
        </div>`
    : '';

  return `
    <div class="filters unified-filter-panel" style="margin-bottom:20px;display:flex;flex-direction:column;gap:12px;padding:16px;background:var(--g50);border:1px solid var(--border);border-radius:14px">
      <div class="unified-filter-row" style="display:grid;grid-template-columns:${searchColumns};gap:12px;align-items:end">
        <div class="fgrp" style="margin:0">
          <label class="flbl">رقم الطلب</label>
          <input type="text" class="fc" id="global-search-input" placeholder="${requestPlaceholder}" oninput="handleGlobalSearch(this.value, ${onSearch})">
        </div>
        <div class="fgrp" style="margin:0">
          <label class="flbl">الرقم المدني</label>
          <input type="text" class="fc" placeholder="9012345678">
        </div>
        <div class="fgrp" style="margin:0">
          <label class="flbl">رقم السجل التجاري</label>
          <input type="text" class="fc" placeholder="1234567">
        </div>
        ${requestTypeOptionsHtml}
        <div class="fgrp" style="margin:0">
          <label class="flbl">من تاريخ</label>
          <input type="date" class="fc">
        </div>
        <div class="fgrp" style="margin:0">
          <label class="flbl">إلى تاريخ</label>
          <input type="date" class="fc">
        </div>
        <div class="fgrp" style="margin:0">
          <label class="flbl">الحالة</label>
          <select class="fc"><option>جميع الحالات</option></select>
        </div>
        ${includeToggle ? `
        <div style="display:flex;align-items:center;gap:12px;justify-content:flex-end;padding-bottom:6px">
          <label class="switch-container" style="display:flex;align-items:center;gap:10px;cursor:pointer;white-space:nowrap" onclick="${onToggleAll}()">
            <span style="font-size:12.5px;font-weight:700;color:var(--text2)">عرض كافة الطلبات</span>
            <div class="switch ${isAllVisible ? 'active' : ''}" style="width:42px;height:22px;background:${isAllVisible ? 'var(--primary)' : '#cbd5e1'};border-radius:20px;position:relative;transition:.3s">
              <div style="width:16px;height:16px;background:#fff;border-radius:50%;position:absolute;top:3px;${isAllVisible ? 'right:23px' : 'right:3px'};transition:.3s;box-shadow:0 1px 3px rgba(0,0,0,0.1)"></div>
            </div>
          </label>
        </div>` : '<div></div>'}
      </div>
    </div>`;
}

function renderPendingDiscussionPage(role, {
  title = 'الطلبات المعلّقة للنقاش',
  subtitle = 'الطلبات التي تم تعليمها أو ترشيحها لمناقشتها في الاجتماع الأسبوعي',
  detailPage = 'allowances-details.html',
  nextMeeting = '2026-05-04',
} = {}) {
  const accessible = getFilteredData({ role, data: WI_DATA.allowances || [], showAll: false });
  const flagged = accessible.filter((item) => item.discussionFlagged);
  const candidates = accessible.slice(0, 6);

  getContent().innerHTML = `
    <div class="pg-head">
      <div>
        <h1>${title}</h1>
        <p>${subtitle}</p>
      </div>
    </div>

    <div class="alert alert-i">
      ${ICONS.bell}
      <div>
        <strong>الاجتماع الأسبوعي القادم:</strong> ${formatDate(nextMeeting)} — الغرض من هذه الشاشة هو إظهار الحالات المقترحة للنقاش دون تغيير مسار الطلب الحالي.
      </div>
    </div>

    <div class="card" style="margin-bottom:18px">
      <div class="pb" style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px">
        <div class="fgrp" style="margin:0">
          <label class="flbl">هدف الشاشة</label>
          <div class="fro">تجميع الحالات التي تحتاج مناقشة جماعية أو رأياً إضافياً قبل استكمال الإجراء.</div>
        </div>
        <div class="fgrp" style="margin:0">
          <label class="flbl">إجراءات هذا الدور</label>
          <div class="fro">عرض الحالة، ووسم أي طلب متاح لهذا الدور بأنه <strong>للنقاش</strong> ليدرج في الاجتماع القادم.</div>
        </div>
        <div class="fgrp" style="margin:0">
          <label class="flbl">ملاحظة Prototype</label>
          <div class="fro">زر <strong>تعليم للنقاش</strong> هنا لإظهار القابلية فقط، وليس لتفعيل منطق تشغيلي كامل في هذه المرحلة.</div>
        </div>
      </div>
    </div>

    <div class="stats-grid" style="margin-bottom:18px">
      <div class="scard p"><div class="sc-lbl">طلبات هذا الدور</div><div class="sc-val">${accessible.length}</div><div class="sc-sub">طلبات متاحة ضمن صلاحية الدور</div></div>
      <div class="scard w"><div class="sc-lbl">معلّمة للنقاش</div><div class="sc-val">${flagged.length}</div><div class="sc-sub">ستعرض في الاجتماع الأسبوعي</div></div>
      <div class="scard i"><div class="sc-lbl">قابلة للوسم</div><div class="sc-val">${candidates.length}</div><div class="sc-sub">أمثلة على حالات يمكن تعليمها للنقاش</div></div>
    </div>

    <div class="card" style="margin-bottom:18px">
      <div class="ph">
        <h3><div class="pico or">${ICONS.bell}</div>الطلبات المعلّقة / المعلّمة للنقاش</h3>
        <span style="font-size:12px;color:var(--text3)">${flagged.length} طلب</span>
      </div>
      <div class="pb-0">
        <div class="tbl-wrap">
          <table class="dtbl">
            <thead>
              <tr>
                <th>رقم الطلب</th>
                <th>المؤمن عليه</th>
                <th>النوع</th>
                <th>الحالة الحالية</th>
                <th>المسؤول الحالي</th>
                <th>سبب النقاش</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              ${flagged.length ? flagged.map((item) => `
                <tr>
                  <td style="font-family:monospace;font-weight:700;color:var(--primary)">${item.id}</td>
                  <td>${item.insured?.name || '—'}</td>
                  <td>${item.type || '—'}${item.subtype ? ` — ${item.subtype}` : ''}</td>
                  <td>${statusBadge(item.status)}</td>
                  <td>${item.assignedTo || item.checkedOutBy || '—'}</td>
                  <td style="font-size:12px">${item.discussionReason || 'وجود تعارض أو حاجة لرأي جماعي قبل استكمال الإجراء'}</td>
                  <td><a href="${detailPage}?id=${item.id}" class="btn btn-secondary btn-xs">عرض</a></td>
                </tr>`).join('') : `
                <tr><td colspan="7" style="text-align:center;padding:30px;color:var(--text3)">لا توجد طلبات معلّمة للنقاش حالياً، لكن القدرة ظاهرة أدناه على الطلبات المتاحة.</td></tr>
              `}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="ph">
        <h3><div class="pico bl">${ICONS.list}</div>طلبات متاحة يمكن تعليمها للنقاش</h3>
        <span style="font-size:12px;color:var(--text3)">أمثلة توضيحية للقدرة المتاحة لهذا الدور</span>
      </div>
      <div class="pb-0">
        <div class="tbl-wrap">
          <table class="dtbl">
            <thead>
              <tr>
                <th>رقم الطلب</th>
                <th>المؤمن عليه</th>
                <th>النوع</th>
                <th>الحالة الحالية</th>
                <th>المسؤول الحالي</th>
                <th>إظهار القابلية</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              ${candidates.length ? candidates.map((item) => `
                <tr>
                  <td style="font-family:monospace;font-weight:700;color:var(--primary)">${item.id}</td>
                  <td>${item.insured?.name || '—'}</td>
                  <td>${item.type || '—'}${item.subtype ? ` — ${item.subtype}` : ''}</td>
                  <td>${statusBadge(item.status)}</td>
                  <td>${item.assignedTo || item.checkedOutBy || '—'}</td>
                  <td>
                    <button class="btn ${item.discussionFlagged ? 'btn-warning' : 'btn-secondary'} btn-xs" onclick="showToast('إظهار قابلية تعليم الطلب للنقاش ضمن هذا الدور فقط','i')">
                      ${ICONS.bell} ${item.discussionFlagged ? 'معلّم للنقاش' : 'تعليم للنقاش'}
                    </button>
                  </td>
                  <td><a href="${detailPage}?id=${item.id}" class="btn btn-secondary btn-xs">عرض</a></td>
                </tr>`).join('') : `
                <tr><td colspan="7" style="text-align:center;padding:30px;color:var(--text3)">لا توجد طلبات متاحة لهذا الدور في عينة البيانات الحالية</td></tr>
              `}
            </tbody>
          </table>
        </div>
      </div>
    </div>`;
}

function getInstitutionReferralStageKey(status = '') {
  const text = String(status || '');
  if (text.includes('بانتظار مراجعة موظف قسم اللجان الطبية') || text.includes('بانتظار مراجعة رئيس قسم اللجان الطبية')) {
    return 'pending-review';
  }
  if (text.includes('بانتظار إحالة المقرر') || text.includes('متابعة الحالة مع المؤسسة الصحية')) {
    return 'coordination';
  }
  if (text.includes('جدولة جلسة') || text.includes('جلسة')) {
    return 'scheduled';
  }
  if (text.includes('تم اتخاذ القرار') || text.includes('تم استلام قرار المؤسسة الصحية')) {
    return 'decision';
  }
  return 'other';
}

function getInstitutionReferralStageLabel(stageKey) {
  const labels = {
    'pending-review': 'بانتظار المراجعة',
    coordination: 'قيد التنسيق',
    scheduled: 'جلسة مجدولة',
    decision: 'صدر قرار',
    other: 'مسار آخر',
  };
  return labels[stageKey] || 'مسار آخر';
}

function getInstitutionReferralOwnerLabel(status = '') {
  const text = String(status || '');
  if (text.includes('بانتظار مراجعة موظف قسم اللجان الطبية')) return 'موظف قسم اللجان الطبية';
  if (text.includes('بانتظار مراجعة رئيس قسم اللجان الطبية')) return 'رئيس قسم اللجان الطبية';
  if (text.includes('بانتظار إحالة المقرر')) return 'مقرر المؤسسة الصحية';
  if (text.includes('متابعة الحالة مع المؤسسة الصحية')) return 'منسق الإحالات / المؤسسة الصحية';
  if (text.includes('جدولة جلسة')) return 'المؤسسة الصحية';
  if (text.includes('تم اتخاذ القرار') || text.includes('تم استلام قرار المؤسسة الصحية')) return 'التنفيذ / الجهة المختصة';
  return '—';
}

function getInstitutionReferralNextStepLabel(status = '') {
  const text = String(status || '');
  if (text.includes('بانتظار مراجعة موظف قسم اللجان الطبية')) return 'التحقق من الملف وإضافة التوصية';
  if (text.includes('بانتظار مراجعة رئيس قسم اللجان الطبية')) return 'اعتماد المسار أو توجيه الملاحظات';
  if (text.includes('بانتظار إحالة المقرر')) return 'ربط الطلب بمقرر المؤسسة وتأكيد الجهة';
  if (text.includes('متابعة الحالة مع المؤسسة الصحية')) return 'التأكد من تثبيت الجلسة ومتابعة الرد';
  if (text.includes('جدولة جلسة')) return 'متابعة انعقاد الجلسة ونتيجتها';
  if (text.includes('تم اتخاذ القرار') || text.includes('تم استلام قرار المؤسسة الصحية')) return 'استكمال التنفيذ وربط القرار';
  return 'متابعة الحالة';
}

function getInstitutionReferralCases() {
  const allowanceStatuses = [
    'بانتظار مراجعة موظف قسم اللجان الطبية',
    'تم طلب العرض على المؤسسات الصحية المرخصة — بانتظار مراجعة موظف قسم اللجان الطبية',
    'تم إرسال قرار المؤسسة الصحية المرخصة — بانتظار مراجعة موظف قسم اللجان الطبية',
    'تم طلب العرض على المؤسسات الصحية المرخصة — بانتظار مراجعة رئيس قسم اللجان الطبية',
    'تم الموافقة على العرض على المؤسسات الصحية المرخصة — بانتظار إحالة المقرر',
    'تم الإحالة إلى مقرر المؤسسة الصحية المرخصة — بانتظار جدولة جلسة',
    'تم جدولة جلسة للعرض على المؤسسة الصحية المرخصة',
    'تم اتخاذ القرار من المؤسسة الصحية المرخصة — بانتظار التنفيذ',
  ];
  const directReferralStatuses = [
    'تم طلب العرض على المؤسسات الصحية المرخصة — بانتظار مراجعة موظف قسم اللجان الطبية',
    'تم طلب العرض على المؤسسات الصحية المرخصة — بانتظار مراجعة رئيس قسم اللجان الطبية',
    'تم الموافقة على العرض على المؤسسات الصحية المرخصة — بانتظار إحالة المقرر',
    'تمت متابعة الحالة مع المؤسسة الصحية — بانتظار انعقاد الجلسة',
    'تم استلام قرار المؤسسة الصحية — بانتظار استكمال التنفيذ',
  ];

  const cases = [];

  (WI_DATA.allowances || []).forEach((req) => {
    if (!allowanceStatuses.some((status) => req.status === status || String(req.status || '').includes(status))) return;
    cases.push({
      id: req.id,
      requestType: req.type ? `${req.type}${req.subtype ? ` — ${req.subtype}` : ''}` : (req.requestType || 'بدلات انقطاع'),
      beneficiaryName: req.insured?.name || req.applicant?.name || '—',
      institutionName: req.referral?.institution || req.assignedInstitution || 'مؤسسة صحية مرخصة',
      referralDate: req.referral?.date || req.lastUpdate || req.submitDate || '',
      sessionDate: req.sessionDate || req.referral?.sessionDate || '',
      status: req.status,
      remainingDays: req.remainingDays,
      suspended: req.suspended,
      sourceFlow: 'بدلات الانقطاع',
      currentOwner: getInstitutionReferralOwnerLabel(req.status),
      nextStep: getInstitutionReferralNextStepLabel(req.status),
      stageKey: getInstitutionReferralStageKey(req.status),
      entityType: 'allowance',
      raw: req,
    });
  });

  (WI_DATA.referrals || []).forEach((req) => {
    if (!directReferralStatuses.some((status) => req.status === status || String(req.status || '').includes(status))) return;
    cases.push({
      id: req.id,
      requestType: req.requestType || 'عرض على المؤسسات الصحية المرخصة',
      beneficiaryName: req.insured?.name || req.applicant?.name || '—',
      institutionName: req.assignedInstitution || req.referral?.preferredInstitution || 'مؤسسة صحية مرخصة',
      referralDate: req.referral?.date || req.lastUpdate || req.submitDate || '',
      sessionDate: req.sessionDate || req.referral?.sessionDate || '',
      status: req.status,
      remainingDays: req.remainingDays,
      suspended: req.suspended,
      sourceFlow: 'طلبات العرض على المؤسسات الصحية المرخصة',
      currentOwner: getInstitutionReferralOwnerLabel(req.status),
      nextStep: getInstitutionReferralNextStepLabel(req.status),
      stageKey: getInstitutionReferralStageKey(req.status),
      entityType: 'direct-referral',
      raw: req,
    });
  });

  return cases.sort((a, b) => new Date(b.referralDate || b.sessionDate || 0) - new Date(a.referralDate || a.sessionDate || 0));
}

function filterInstitutionReferralCases(cases, { tab = 'all', query = '', requestTypeFilter = 'all' } = {}) {
  const q = String(query || '').toLowerCase().trim();
  return (cases || []).filter((item) => {
    if (tab !== 'all' && item.stageKey !== tab) return false;
    if (requestTypeFilter && requestTypeFilter !== 'all') {
      const typeText = String(item.requestType || '').toLowerCase();
      if (!typeText.includes(String(requestTypeFilter).toLowerCase())) return false;
    }
    if (!q) return true;
    const haystack = [
      item.id,
      item.requestType,
      item.beneficiaryName,
      item.institutionName,
      item.status,
      item.currentOwner,
      item.nextStep,
      item.sourceFlow,
    ].filter(Boolean).join(' ').toLowerCase();
    return haystack.includes(q);
  });
}

function findRequestByIdAcrossScopes(id) {
  if (!id) return null;
  return WI_DATA.referrals.find((r) => r.id === id)
    || WI_DATA.allowances.find((r) => r.id === id)
    || WI_DATA.disability.find((r) => r.id === id)
    || WI_DATA.appeals.find((r) => r.id === id)
    || WI_DATA.licensing.find((r) => r.id === id)
    || WI_DATA.disabilityRetirement.find((r) => r.id === id)
    || null;
}

function getRequestHrefById(id) {
  const record = findRequestByIdAcrossScopes(id);
  if (!record) return '';
  if (WI_DATA.referrals.includes(record)) return `../referral-coordinator/referrals-details.html?id=${id}`;
  if (WI_DATA.appeals.includes(record)) return `../committees-employee/appeals-details.html?id=${id}`;
  if (WI_DATA.disability.includes(record)) return `../disability-employee/disability-details.html?id=${id}`;
  if (WI_DATA.disabilityRetirement.includes(record)) return `../disability-employee/disability-retirement-details.html?id=${id}`;
  if (WI_DATA.licensing.includes(record)) return `../licensing-employee/licensing-details.html?id=${id}`;
  return '';
}

function buildSuspendResumeNote({ action, actorRole, reason, notes, fromStatus, toStatus }) {
  return {
    action,
    actor: getCurrentUserData()?.name || 'مستخدم النظام',
    role: actorRole || WI_CONFIG.roles?.[CURRENT_ROLE]?.nameAr || 'مستخدم النظام',
    time: new Date().toISOString().slice(0, 16).replace('T', ' '),
    fromStatus,
    toStatus,
    note: `${reason}${notes ? ` — ${notes}` : ''}`,
    type: action.includes('استئناف') ? 'success' : 'warning',
    phone: getCurrentUserPhone(),
  };
}

function suspendRecord(record, { status = 'معلّق مؤقتاً — بانتظار الاستئناف', roleLabel = '' } = {}) {
  if (!record) return;
  openModal({
    title: 'تعليق الطلب',
    body: `
      <div class="fg" style="gap:14px">
        <div class="fgrp">
          <label class="flbl">سبب التعليق <span class="req">*</span></label>
          <input class="fc" id="suspend-reason-input" placeholder="اكتب سبب التعليق">
        </div>
        <div class="fgrp">
          <label class="flbl">ملاحظات التعليق <span class="req">*</span></label>
          <textarea class="fc" id="suspend-notes-input" rows="4" placeholder="اشرح تفاصيل التعليق والإجراء المطلوب"></textarea>
        </div>
      </div>`,
    footer: `<button class="btn btn-warning" onclick="confirmSuspendRecord('${record.id}','${status}','${roleLabel.replace(/'/g, "\\'")}')">تعليق الطلب</button><button class="btn btn-ghost" onclick="closeModal()">إلغاء</button>`
  });
}

function confirmSuspendRecord(id, status, roleLabel) {
  const record = findRequestByIdAcrossScopes(id);
  if (!record) return;
  const reason = (document.getElementById('suspend-reason-input')?.value || '').trim();
  const notes = (document.getElementById('suspend-notes-input')?.value || '').trim();
  if (!reason || !notes) {
    showToast('سبب التعليق وملاحظات التعليق حقول إلزامية', 'w');
    return;
  }
  const fromStatus = record.status || '—';
  record.suspended = true;
  record.suspensionReason = reason;
  record.suspensionNotes = notes;
  record.suspendedBy = getCurrentUserData()?.name || '';
  record.suspendedDate = new Date().toISOString().slice(0, 10);
  record.status = status;
  record.timeline = record.timeline || [];
  record.timeline.push(buildSuspendResumeNote({
    action: 'تعليق الطلب',
    actorRole: roleLabel,
    reason,
    notes,
    fromStatus,
    toStatus: status,
  }));
  closeModal();
  showToast('تم تعليق الطلب', 's');
  setTimeout(() => window.location.reload(), 800);
}

function resumeRecord(record, { resumeStatus = '', roleLabel = '' } = {}) {
  if (!record) return;
  openModal({
    title: 'استئناف الطلب',
    body: `
      <div class="fgrp">
        <label class="flbl">ملاحظات الاستئناف <span class="req">*</span></label>
        <textarea class="fc" id="resume-notes-input" rows="4" placeholder="اشرح ما الذي تم استكماله أو تغييره"></textarea>
      </div>`,
    footer: `<button class="btn btn-primary" onclick="confirmResumeRecord('${record.id}','${resumeStatus || ''}','${roleLabel.replace(/'/g, "\\'")}')">استئناف الطلب</button><button class="btn btn-ghost" onclick="closeModal()">إلغاء</button>`
  });
}

function confirmResumeRecord(id, resumeStatus, roleLabel) {
  const record = findRequestByIdAcrossScopes(id);
  if (!record) return;
  const notes = (document.getElementById('resume-notes-input')?.value || '').trim();
  if (!notes) {
    showToast('ملاحظات الاستئناف حقل إلزامي', 'w');
    return;
  }
  const fromStatus = record.status || '—';
  const toStatus = resumeStatus || record.previousStatusBeforeSuspend || 'تم استئناف المعالجة';
  record.suspended = false;
  record.resumedBy = getCurrentUserData()?.name || '';
  record.resumedDate = new Date().toISOString().slice(0, 10);
  record.status = toStatus;
  record.timeline = record.timeline || [];
  record.timeline.push(buildSuspendResumeNote({
    action: 'استئناف الطلب',
    actorRole: roleLabel,
    reason: 'تمت معالجة سبب التعليق',
    notes,
    fromStatus,
    toStatus,
  }));
  closeModal();
  showToast('تم استئناف الطلب', 's');
  setTimeout(() => window.location.reload(), 800);
}

function renderDisabilityCardPanel(card, { showSourceBreakdown = true } = {}) {
  if (!card) return '';
  const disabilities = Array.isArray(card.disabilities) ? card.disabilities : [];
  const socialDisabilities = disabilities.filter((item) => item.source === 'MOSD');
  const healthDisabilities = disabilities.filter((item) => item.source === 'MOH');
  const sourceSummary = [
    socialDisabilities.length ? `وزارة التنمية الاجتماعية: ${socialDisabilities.map((item) => item.name).join('، ')}` : '',
    healthDisabilities.length ? `وزارة الصحة: ${healthDisabilities.map((item) => item.name).join('، ')}` : '',
  ].filter(Boolean);

  return `
    <div class="card card-ro">
      <div class="ph"><h3><div class="pico pu">${ICONS.shield}</div>بيانات بطاقة الإعاقة <span style="font-size:10px;color:var(--text3)">(وزارة التنمية الاجتماعية + وزارة الصحة)</span></h3></div>
      <div class="pb">
        <div class="fg fg-3">
          <div class="fgrp"><label class="flbl">حالة البطاقة</label><div class="fro"><span class="badge ${card.status === 'سارية' ? 'b-card-valid' : card.status === 'منتهية' ? 'b-card-expired' : 'b-card-cancelled'}">${card.status || '—'}</span></div></div>
          <div class="fgrp"><label class="flbl">رقم البطاقة</label><div class="fro" style="font-family:monospace">${card.number || '—'}</div></div>
          <div class="fgrp"><label class="flbl">تاريخ الإصدار</label><div class="fro">${formatDate(card.issueDate)}</div></div>
          <div class="fgrp"><label class="flbl">تاريخ التفعيل</label><div class="fro">${formatDate(card.activationDate)}</div></div>
          <div class="fgrp"><label class="flbl">تاريخ الانتهاء</label><div class="fro">${formatDate(card.expiryDate)}</div></div>
          <div class="fgrp"><label class="flbl">تاريخ ثبوت الإعاقة</label><div class="fro">${formatDate(card.provenDate)}</div></div>
          <div class="fgrp span-full"><label class="flbl">ملخص الإعاقات</label><div class="fro">${sourceSummary.join(' — ') || '—'}</div></div>
          <div class="fgrp span-full"><label class="flbl">تفصيل الإعاقات المسجلة</label><div class="fro" style="height:auto">
            ${disabilities.length ? disabilities.map((item, index) => `
              <div style="padding:10px 0;${index ? 'border-top:1px solid var(--border);' : ''}">
                <strong>${item.name || '—'}</strong>
                <div style="font-size:12px;color:var(--text3)">المصدر: ${item.source === 'MOSD' ? 'وزارة التنمية الاجتماعية' : item.source === 'MOH' ? 'وزارة الصحة' : '—'} · الدرجة: ${item.level || '—'} · تاريخ الفحص: ${formatDate(item.examinationDate)}</div>
              </div>`).join('') : '—'}
          </div></div>
          ${showSourceBreakdown ? `<div class="fgrp"><label class="flbl">آخر تحقق تلقائي</label><div class="fro">${card.lastCheck || '—'}</div></div>` : ''}
        </div>
      </div>
    </div>`;
}

function renderInsuredSummaryCards(civil, currentId = '') {
  if (!civil) return '';
  const activeBenefits = WI_DATA.disability.filter((item) => item.applicant?.civil === civil && !item.status.includes('إيقاف'));
  const activePaidBenefits = WI_DATA.disability.filter((item) => item.applicant?.civil === civil && item.disbursement?.approved);
  const allowanceRequests = WI_DATA.allowances.filter((item) => item.applicant?.civil === civil || item.insured?.civil === civil);
  const appeals = WI_DATA.appeals.filter((item) => item.applicant?.civil === civil || item.insured?.civil === civil || item.originalRequestId === currentId);
  const referrals = WI_DATA.referrals.filter((item) => item.applicant?.civil === civil || item.insured?.civil === civil);
  const cards = [
    { key: 'disability-active', label: 'طلبات منفعة الإعاقة النشطة', items: activeBenefits, icon: ICONS.shield },
    { key: 'disability-paid', label: 'المنافع المصروفة حالياً', items: activePaidBenefits, icon: ICONS.check },
    { key: 'allowances', label: 'طلبات بدل الانقطاع', items: allowanceRequests, icon: ICONS.medical },
    { key: 'appeals', label: 'التظلمات', items: appeals, icon: ICONS.note },
    { key: 'referrals', label: 'طلبات العرض على المؤسسات الصحية المرخصة', items: referrals, icon: ICONS.building },
  ];

  return `
    <div class="card">
      <div class="ph"><h3><div class="pico bl">${ICONS.chart}</div>ملخص طلبات المؤمن عليه المرتبطة</h3></div>
      <div class="pb">
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:12px">
          ${cards.map((card) => `
            <button
              type="button"
              onclick="openInsuredSummaryModal('${card.key}', '${civil}', '${currentId}')"
              style="border:1px solid var(--border);border-radius:16px;padding:16px;background:linear-gradient(180deg,#fff,rgba(18,168,101,.03));text-align:right;cursor:pointer;display:grid;gap:10px;box-shadow:0 10px 24px rgba(15,23,42,.04)"
            >
              <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:10px">
                <div style="font-size:12px;color:var(--text3);line-height:1.8">${card.label}</div>
                <div style="width:38px;height:38px;border-radius:12px;background:rgba(18,168,101,.1);color:var(--primary);display:flex;align-items:center;justify-content:center;flex-shrink:0">${card.icon}</div>
              </div>
              <div style="display:flex;align-items:end;justify-content:space-between;gap:10px">
                <div style="font-size:30px;font-weight:800;color:var(--primary);line-height:1">${card.items.length}</div>
                <div style="font-size:11px;color:var(--text2)">عرض السجلات</div>
              </div>
            </button>`).join('')}
        </div>
      </div>
    </div>`;
}

function getInsuredSummaryCardsData(civil, currentId = '') {
  if (!civil) return [];

  const activeBenefits = WI_DATA.disability.filter((item) => item.applicant?.civil === civil && !item.status.includes('إيقاف'));
  const activePaidBenefits = WI_DATA.disability.filter((item) => item.applicant?.civil === civil && item.disbursement?.approved);
  const allowanceRequests = WI_DATA.allowances.filter((item) => item.applicant?.civil === civil || item.insured?.civil === civil);
  const appeals = WI_DATA.appeals.filter((item) => item.applicant?.civil === civil || item.insured?.civil === civil || item.originalRequestId === currentId);
  const referrals = WI_DATA.referrals.filter((item) => item.applicant?.civil === civil || item.insured?.civil === civil);

  return [
    { key: 'disability-active', label: 'طلبات منفعة الإعاقة النشطة', items: activeBenefits, columns: ['رقم الطلب', 'المؤمن عليه', 'الحالة', 'تاريخ التقديم'] },
    { key: 'disability-paid', label: 'المنافع المصروفة حالياً', items: activePaidBenefits, columns: ['رقم الطلب', 'المؤمن عليه', 'حالة الصرف', 'آخر صرف'] },
    { key: 'allowances', label: 'طلبات بدل الانقطاع', items: allowanceRequests, columns: ['رقم الطلب', 'نوع الحالة', 'الحالة', 'تاريخ التقديم'] },
    { key: 'appeals', label: 'التظلمات', items: appeals, columns: ['رقم التظلم', 'الطلب الأصلي', 'الحالة', 'تاريخ التقديم'] },
    { key: 'referrals', label: 'طلبات العرض على المؤسسات الصحية المرخصة', items: referrals, columns: ['رقم الطلب', 'المؤمن عليه', 'الحالة', 'تاريخ التقديم'] },
  ];
}

function openInsuredSummaryModal(cardKey, civil, currentId = '') {
  const card = getInsuredSummaryCardsData(civil, currentId).find((item) => item.key === cardKey);
  if (!card) return;

  openModal({
    title: card.label,
    size: 'md-lg',
    body: `
      <div style="display:grid;gap:14px">
        <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;padding:14px 16px;border:1px solid var(--border);border-radius:14px;background:var(--g50)">
          <div>
            <div style="font-size:12px;color:var(--text3)">عدد السجلات المرتبطة</div>
            <div style="font-size:28px;font-weight:800;color:var(--primary)">${card.items.length}</div>
          </div>
          <div style="font-size:12px;color:var(--text2);line-height:1.8">يعرض الجدول أدناه سجلات تجريبية مرتبطة بالمؤمن عليه نفسه لتمكين المراجعة السريعة.</div>
        </div>
        <div class="tbl-wrap">
          <table class="dtbl">
            <thead><tr>${card.columns.map((label) => `<th>${label}</th>`).join('')}</tr></thead>
            <tbody>
              ${card.items.length ? card.items.map((item) => renderInsuredSummaryModalRow(card.key, item)).join('') : `<tr><td colspan="${card.columns.length}" style="text-align:center;color:var(--text3)">لا توجد سجلات مرتبطة</td></tr>`}
            </tbody>
          </table>
        </div>
      </div>`,
    footer: `<button class="btn btn-ghost" onclick="closeModal()">إغلاق</button>`,
  });
}

function renderInsuredSummaryModalRow(cardKey, item) {
  if (cardKey === 'disability-active' || cardKey === 'disability-paid') {
    return `
      <tr>
        <td style="font-family:monospace">${item.id || '—'}</td>
        <td>${item.insured?.name || item.applicant?.name || '—'}</td>
        <td>${cardKey === 'disability-paid' ? statusBadge(item.disbursement?.status || 'مصروفة') : statusBadge(item.status)}</td>
        <td>${cardKey === 'disability-paid' ? formatDate(item.disbursement?.lastDisbursement) : formatDate(item.submitDate)}</td>
      </tr>`;
  }

  if (cardKey === 'allowances') {
    return `
      <tr>
        <td style="font-family:monospace">${item.id || '—'}</td>
        <td>${item.type || item.injury?.caseType || '—'}</td>
        <td>${statusBadge(item.status)}</td>
        <td>${formatDate(item.submitDate)}</td>
      </tr>`;
  }

  if (cardKey === 'appeals') {
    return `
      <tr>
        <td style="font-family:monospace">${item.id || '—'}</td>
        <td style="font-family:monospace">${item.originalRequestId || '—'}</td>
        <td>${statusBadge(item.status)}</td>
        <td>${formatDate(item.submitDate || item.date)}</td>
      </tr>`;
  }

  if (cardKey === 'referrals') {
    return `
      <tr>
        <td style="font-family:monospace">${item.id || '—'}</td>
        <td>${item.insured?.name || item.applicant?.name || '—'}</td>
        <td>${statusBadge(item.status)}</td>
        <td>${formatDate(item.submitDate)}</td>
      </tr>`;
  }

  return `
    <tr>
      <td style="font-family:monospace">${item.id || '—'}</td>
      <td>${statusBadge(item.status || '—')}</td>
    </tr>`;
}

function renderDirectReferralSummaryCard(req, { variant = 'internal' } = {}) {
  if (!req) return '';
  if (variant === 'worker') {
    return `
      <div class="card">
        <div class="pb">
          <div class="req-summary-grid">
            <div><div class="flbl" style="margin-bottom:4px">الحالة</div>${statusBadge(req.status)}</div>
            <div><div class="flbl" style="margin-bottom:4px">نوع الحالة</div><div style="font-size:12px;color:var(--text2)">${req.referral?.requestCategory || '—'}</div></div>
            <div><div class="flbl" style="margin-bottom:4px">المؤسسة المفضلة</div><div style="font-size:12px;color:var(--text2)">${req.referral?.preferredInstitution || '—'}</div></div>
            <div><div class="flbl" style="margin-bottom:4px">الموظف المسؤول</div><div style="font-size:12px;color:var(--text2)">${req.assignedTo || '—'}</div></div>
          </div>
        </div>
      </div>`;
  }

  if (variant === 'employer') {
    return `
      <div class="card">
        <div class="pb">
          <div class="fg fg-2">
            <div class="fgrp"><label class="flbl">العامل</label><div class="fro">${req.insured?.name || '—'}</div></div>
            <div class="fgrp"><label class="flbl">الحالة</label><div class="fro">${statusBadge(req.status)}</div></div>
            <div class="fgrp"><label class="flbl">نوع الحالة</label><div class="fro">${req.referral?.requestCategory || '—'}</div></div>
            <div class="fgrp"><label class="flbl">المؤسسة المفضلة</label><div class="fro">${req.referral?.preferredInstitution || '—'}</div></div>
          </div>
        </div>
      </div>`;
  }

  return `
    <div class="card"><div class="ph"><h3><div class="pico bl">${ICONS.user}</div>بيانات مقدم الطلب والمؤمن عليه</h3></div><div class="pb"><div class="fg fg-2">
      <div class="fgrp"><label class="flbl">مقدم الطلب</label><div class="fro">${req.applicant?.name || '—'}</div></div>
      <div class="fgrp"><label class="flbl">صفة مقدم الطلب</label><div class="fro">${req.applicant?.role || '—'}</div></div>
      <div class="fgrp"><label class="flbl">المؤمن عليه</label><div class="fro">${req.insured?.name || '—'}</div></div>
      <div class="fgrp"><label class="flbl">رقم الهاتف</label><div class="fro">${req.applicant?.phone || req.insured?.phone || '—'}</div></div>
    </div></div></div>
    <div class="card"><div class="ph"><h3><div class="pico tl">${ICONS.building}</div>بيانات جهة العمل</h3></div><div class="pb"><div class="fg fg-2">
      <div class="fgrp"><label class="flbl">اسم الجهة</label><div class="fro">${req.employer?.name || '—'}</div></div>
      <div class="fgrp"><label class="flbl">السجل التجاري</label><div class="fro">${req.employer?.cr || '—'}</div></div>
    </div></div></div>`;
}

function renderDirectReferralReasonCard(req) {
  if (!req) return '';
  return `
    <div class="card"><div class="ph"><h3><div class="pico or">${ICONS.note}</div>سبب الطلب والملاحظات</h3></div><div class="pb">
      <div class="fgrp"><label class="flbl">سبب الطلب</label><div class="fro">${req.referral?.reason || '—'}</div></div>
      <div class="fgrp"><label class="flbl">الملاحظات</label><div class="fro">${req.referral?.notes || '—'}</div></div>
    </div></div>`;
}

function renderInfoCard({ title, icon = ICONS.info, iconClass = 'bl', columns = 'fg fg-3', fields = [], cardClass = 'card' } = {}) {
  if (!fields.length) return '';
  return `
    <div class="${cardClass}">
      <div class="ph"><h3><div class="pico ${iconClass}">${icon}</div>${title}</h3></div>
      <div class="pb">
        <div class="${columns}">
          ${fields.map((field) => `
            <div class="fgrp${field.spanFull ? ' span-full' : ''}">
              <label class="flbl">${field.label}</label>
              <div class="fro"${field.mono ? ' style="font-family:monospace"' : ''}>${field.value ?? '—'}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>`;
}

function joinDisplayValues(values = [], separator = ' — ') {
  const normalized = values
    .map((value) => {
      if (value == null) return '';
      if (typeof value === 'string') return value.trim();
      return String(value).trim();
    })
    .filter(Boolean);
  return normalized.length ? normalized.join(separator) : '—';
}

function renderApplicantProfileCard(applicant = {}, {
  title = 'بيانات مقدم الطلب',
  cardClass = 'card',
  includeRole = true,
  includeExtraPhones = false,
  includeIdentity = false,
  includeLocation = true,
  includeCountry = true,
  includeCivilExpiry = false,
  includeAddress = false,
  extraFields = [],
} = {}) {
  const fields = [];

  if (includeRole) {
    fields.push({ label: 'صفة مقدم الطلب', value: applicant.role || '—' });
  }

  fields.push(
    { label: 'الاسم الكامل', value: applicant.name || '—' },
    { label: 'الرقم المدني', value: applicant.civil || '—', mono: true },
    { label: 'رقم الهاتف', value: normalizeDisplay(applicant.phone, '96890000000') },
    { label: 'البريد الإلكتروني', value: normalizeDisplay(applicant.email, 'noreply@spf-proto.om') },
  );

  if (includeExtraPhones) {
    fields.push(
      { label: 'رقم الهاتف 1', value: normalizeDisplay(applicant.phone1, normalizeDisplay(applicant.phone, '96890000000')) },
      { label: 'رقم الهاتف 2', value: normalizeDisplay(applicant.phone2) },
    );
  }

  if (includeIdentity) {
    fields.push(
      { label: 'تاريخ الميلاد', value: formatDate(applicant.dob) },
      { label: 'الجنس', value: applicant.gender || '—' },
      { label: 'الجنسية', value: applicant.nationality || '—' },
    );
  }

  if (includeCivilExpiry) {
    fields.push({ label: 'تاريخ انتهاء البطاقة الشخصية', value: formatDate(applicant.civilExpiry) });
  }

  if (includeLocation) {
    fields.push({ label: 'المحافظة / الولاية', value: joinDisplayValues([applicant.region, applicant.wilayat]) });
  }

  if (includeCountry) {
    fields.push({ label: 'الدولة', value: applicant.country || '—' });
  }

  if (includeAddress) {
    fields.push({ label: 'العنوان', value: applicant.address || '—', spanFull: true });
  }

  return renderInfoCard({
    title,
    icon: ICONS.user,
    iconClass: 'bl',
    columns: 'fg fg-3',
    cardClass,
    fields: [...fields, ...extraFields],
  });
}

function renderBenefitInsuranceCard(insurance = {}, {
  title = 'بيانات التأمين',
  cardClass = 'card card-ro',
  applicant = {},
  includeContact = false,
  fixedInsuranceType = 'تأمين العاملين في القطاع الخاص',
  fixedSchemeCategory = 'داخل السلطنة - القطاع الخاص',
  otherBenefitsLabel = 'منافع أخرى',
  extraFields = [],
} = {}) {
  const status = insurance.status || insurance.insuranceStatus || '—';
  const statusBadgeHtml = status === '—'
    ? '—'
    : `<span class="badge ${status === 'نشط' ? 'b-approved' : 'b-rejected'}">${status}</span>`;

  const fields = [
    { label: 'الحالة التأمينية', value: statusBadgeHtml },
    { label: 'نوع التأمين', value: insurance.insuranceType || fixedInsuranceType || '—' },
    { label: 'نوع الاشتراك', value: normalizeDisplay(insurance.subType) },
    { label: 'فئة النظام', value: insurance.schemeCategory || fixedSchemeCategory || '—' },
    { label: 'تاريخ التسجيل فى الصندوق', value: formatDate(insurance.regDate) },
  ];

  if (includeContact) {
    fields.push(
      { label: 'رقم الهاتف', value: normalizeDisplay(applicant.phone, '96890000000') },
      { label: 'البريد الإلكتروني', value: normalizeDisplay(applicant.email, 'noreply@spf-proto.om') },
    );
  }

  fields.push({ label: otherBenefitsLabel, value: insurance.otherBenefits || '—' });

  return renderInfoCard({
    title,
    icon: ICONS.shield,
    iconClass: 'gr',
    columns: 'fg fg-3',
    cardClass,
    fields: [...fields, ...extraFields],
  });
}

function renderChronicBenefitCard(chronic = {}, {
  title = 'بيانات المرض المستديم',
  cardClass = 'card card-ro',
  extraFields = [],
} = {}) {
  const medications = Array.isArray(chronic.medications)
    ? chronic.medications.filter(Boolean).join('، ')
    : normalizeDisplay(chronic.medications);

  return renderInfoCard({
    title,
    icon: ICONS.medical,
    iconClass: 'rd',
    columns: 'fg fg-3',
    cardClass,
    fields: [
      { label: 'المرض المستديم', value: chronic.chronicDisease || '—' },
      { label: 'تاريخ التشخيص / الثبوت', value: formatDate(chronic.diagnosisDate) },
      { label: 'المسار', value: chronic.path || '—' },
      { label: 'درجة الشدة', value: chronic.severity || '—' },
      { label: 'آخر تقييم', value: formatDate(chronic.lastAssessment) },
      { label: 'التقييم القادم', value: formatDate(chronic.nextAssessment) },
      { label: 'العلاج الحالي', value: chronic.treatment || '—', spanFull: true },
      { label: 'الأدوية', value: medications || '—', spanFull: true },
      { label: 'المضاعفات / الحالة العامة', value: chronic.complications || '—', spanFull: true },
      ...extraFields,
    ],
  });
}

function renderReferralApplicantCard(applicant = {}) {
  return renderInfoCard({
    title: 'بيانات مقدم الطلب',
    icon: ICONS.user,
    iconClass: 'bl',
    columns: 'fg fg-3',
    fields: [
      { label: 'الاسم الكامل', value: applicant.name || '—' },
      { label: 'الرقم المدني', value: applicant.civil || '—', mono: true },
      { label: 'الدور', value: applicant.role || '—' },
      { label: 'رقم الهاتف', value: applicant.phone || '—' },
      { label: 'البريد الإلكتروني', value: applicant.email || '—' },
      { label: 'المنطقة', value: applicant.region || '—' },
    ],
  });
}

function renderReferralInsuredCard(insured = {}, { extended = false } = {}) {
  const fields = [
    { label: 'الاسم الكامل', value: insured.name || '—' },
    { label: 'الرقم المدني', value: insured.civil || '—', mono: true },
    { label: 'رقم التأمين', value: insured.insurance || '—', mono: true },
    { label: 'تاريخ الميلاد', value: formatDate(insured.dob) },
    { label: 'الجنس', value: insured.gender || '—' },
    { label: 'الجنسية', value: insured.nationality || '—' },
  ];

  if (extended) {
    fields.push(
      { label: 'الحالة التأمينية', value: insured.insuranceStatus || '—' },
      { label: 'تاريخ التسجيل', value: formatDate(insured.regDate) },
      { label: 'نوع الاشتراك', value: insured.subType || '—' },
      { label: 'رقم الهاتف', value: insured.phone || '—' },
      { label: 'البريد الإلكتروني', value: insured.email || '—' },
    );
  }

  return renderInfoCard({
    title: 'بيانات المؤمن عليه',
    icon: ICONS.user,
    iconClass: 'bl',
    columns: 'fg fg-3',
    fields,
  });
}

function renderReferralEmployerCard(employer = {}, { extended = false } = {}) {
  const fields = [
    { label: 'اسم جهة العمل', value: employer.name || '—' },
    { label: 'السجل التجاري', value: employer.cr || '—', mono: true },
    { label: 'رقم المنشأة', value: employer.establishment || '—', mono: true },
    { label: 'المسمى الوظيفي', value: employer.jobTitle || '—' },
    { label: 'تاريخ الالتحاق', value: formatDate(employer.joinDate) },
    { label: 'الموقع', value: employer.location || '—' },
  ];

  if (extended) {
    fields.push(
      { label: 'القطاع', value: employer.sector || '—' },
      { label: 'نوع جهة العمل', value: employer.employerType || '—' },
      { label: 'رقم الهاتف', value: employer.phone || '—' },
    );
  }

  return renderInfoCard({
    title: 'بيانات جهة العمل',
    icon: ICONS.building,
    iconClass: 'bl',
    columns: 'fg fg-2',
    fields,
  });
}

function renderDirectReferralDetailsCard(referral = {}) {
  return renderInfoCard({
    title: 'بيانات العرض المباشر',
    icon: ICONS.clipboard,
    iconClass: 'bl',
    columns: 'fg fg-2',
    fields: [
      { label: 'سبب طلب العرض', value: referral.reason || '—' },
      { label: 'نوع الحالة', value: referral.requestCategory || '—' },
      { label: 'المؤسسة المفضلة', value: referral.preferredInstitution || '—' },
      { label: 'نوع المؤسسة', value: referral.institutionType || '—' },
      { label: 'ملاحظات إضافية', value: referral.notes || '—', spanFull: true },
    ],
  });
}

function renderDirectReferralFollowUpCard(req = {}) {
  return renderInfoCard({
    title: 'متابعة المؤسسة الصحية والقرار',
    icon: ICONS.calendar,
    iconClass: 'bl',
    columns: 'fg fg-3',
    fields: [
      { label: 'المؤسسة الصحية', value: req.assignedInstitution || req.referral?.preferredInstitution || '—' },
      { label: 'رقم الجلسة', value: req.sessionId || '—', mono: true },
      { label: 'تاريخ الجلسة', value: formatDate(req.sessionDate) },
      { label: 'تاريخ القرار', value: formatDate(req.decisionDate) },
      { label: 'حالة التنفيذ', value: statusBadge(req.committeeDecision?.executionStatus || (req.committeeDecision ? 'قيد التنفيذ' : '—')) },
      { label: 'ملخص قرار المؤسسة الصحية', value: req.committeeDecision?.summary || 'لم يتم استلام القرار بعد', spanFull: true },
    ],
  });
}

function renderActionButtonsPanel(actions = [], {
  title = 'الإجراءات المتاحة',
  description = 'يمكنك تنفيذ أحد الإجراءات التالية على هذا الطلب. سيتم تسجيل الإجراء في سجل الإجراءات.',
  icon = ICONS.pen,
  iconClass = 'bl',
  cardClass = 'dp',
} = {}) {
  return `
    <div class="card ${cardClass}">
      <div class="ph"><h3><div class="pico ${iconClass}">${icon}</div>${title}</h3></div>
      <div class="pb">
        ${description ? `<div class="alert alert-i" style="margin-bottom:16px">${ICONS.info}<span>${description}</span></div>` : ''}
        <div style="display:flex;flex-direction:column;gap:10px">
          ${actions.map((action) => `
            <button class="btn ${action.class || 'btn-secondary'} btn-sm" onclick="${action.fn || ''}">
              ${action.icon || ''} ${action.label}
            </button>
          `).join('')}
        </div>
      </div>
    </div>`;
}

function getCommitteeDecisionsData() {
  const decisions = [];

  function pushDecision(req, meta = {}) {
    const decision = req.committeeDecision || req.decision;
    if (!decision?.type) return;
    const linkedAppeals = WI_DATA.appeals.filter((appeal) => appeal.originalRequestId === req.id);
    decisions.push({
      decisionId: decision.id || (meta.decisionPrefix ? `${meta.decisionPrefix}-${req.id}` : `DEC-${req.id}`),
      sourceType: meta.sourceType || 'request',
      requestType: meta.requestType || req.requestType || req.type || req.originalRequestType || 'طلب',
      committeeType: meta.committeeType || 'اللجان الطبية',
      requestId: req.id,
      beneficiaryName: meta.beneficiaryName || req.insured?.name || req.applicant?.name || req.institution?.name || req.employer?.name || '—',
      decisionType: decision.type,
      decisionDate: decision.date || req.lastUpdate || req.submitDate,
      status: decision.executionStatus || (decision.executed ? 'منفذة' : 'قيد التنفيذ'),
      hasAppeal: linkedAppeals.length > 0,
      appealCount: linkedAppeals.length,
      linkedAppeals,
      details: decision,
      record: req,
    });
  }

  (WI_DATA.referrals || []).forEach((req) => {
    pushDecision(req, {
      sourceType: 'directReferral',
      requestType: req.requestType || req.referral?.requestCategory || 'عرض على المؤسسات الصحية المرخصة',
      committeeType: 'اللجان الطبية',
      decisionPrefix: 'DEC-REF',
      beneficiaryName: req.insured?.name || req.applicant?.name || '—',
    });
  });

  (WI_DATA.licensing || []).forEach((req) => {
    pushDecision(req, {
      sourceType: 'licensing',
      requestType: 'ترخيص',
      committeeType: 'اللجنة الطبية الإشرافية',
      decisionPrefix: 'DEC-LIC',
      beneficiaryName: req.institution?.name || req.applicant?.name || 'مؤسسة صحية',
    });
  });

  (WI_DATA.allowances || []).forEach((req) => {
    pushDecision(req, {
      sourceType: 'allowances',
      requestType: req.type || 'بدلات انقطاع عن العمل',
      committeeType: 'اللجان الطبية',
      decisionPrefix: 'DEC-WI',
      beneficiaryName: req.insured?.name || req.applicant?.name || '—',
    });
  });

  (WI_DATA.chronic || []).forEach((req) => {
    pushDecision(req, {
      sourceType: 'chronic',
      requestType: 'أمراض مستديمة',
      committeeType: 'اللجان الطبية',
      decisionPrefix: 'DEC-CHR',
      beneficiaryName: req.insured?.name || req.applicant?.name || '—',
    });
  });
  return decisions.sort((a, b) => new Date(b.decisionDate) - new Date(a.decisionDate));
}

function openCommitteeDecisionDetailsModal(decisionId) {
  const decision = getCommitteeDecisionsData().find((item) => item.decisionId === decisionId);
  if (!decision) return;
  openModal({
    title: `تفاصيل القرار ${decision.decisionId}`,
    size: 'md-lg',
    body: `
      <div class="fg fg-2">
        <div class="fgrp"><label class="flbl">رقم القرار</label><div class="fro" style="font-family:monospace">${decision.decisionId}</div></div>
        <div class="fgrp"><label class="flbl">رقم الطلب</label><div class="fro" style="font-family:monospace">${decision.requestId}</div></div>
        <div class="fgrp"><label class="flbl">المستفيد</label><div class="fro">${decision.beneficiaryName}</div></div>
        <div class="fgrp"><label class="flbl">نوع الطلب</label><div class="fro">${decision.requestType}</div></div>
        <div class="fgrp"><label class="flbl">اللجنة / الجهة</label><div class="fro">${decision.committeeType}</div></div>
        <div class="fgrp"><label class="flbl">نوع القرار</label><div class="fro">${decision.decisionType}</div></div>
        <div class="fgrp"><label class="flbl">تاريخ القرار</label><div class="fro">${formatDate(decision.decisionDate)}</div></div>
        <div class="fgrp"><label class="flbl">الحالة التنفيذية</label><div class="fro">${statusBadge(decision.status)}</div></div>
        <div class="fgrp span-full"><label class="flbl">نص القرار</label><div class="fro">${decision.details?.summary || decision.details?.details || decision.details?.content || '—'}</div></div>
        <div class="fgrp span-full"><label class="flbl">التظلمات المرتبطة</label><div class="fro">${decision.linkedAppeals.length ? decision.linkedAppeals.map((appeal) => `${appeal.id} — ${appeal.status}`).join('<br>') : 'لا توجد تظلمات مرتبطة'}</div></div>
      </div>`,
    footer: `
      <button class="btn btn-secondary btn-sm" onclick="window.location.href='${getRequestHrefById(decision.requestId) || '#'}'">${ICONS.eye} عرض الطلب الأصلي</button>
      <button class="btn btn-ghost" onclick="closeModal()">إغلاق</button>`
  });
}

function viewCommitteeDecisionAppeals(decisionId) {
  const decision = getCommitteeDecisionsData().find((item) => item.decisionId === decisionId);
  if (!decision) return;
  openModal({
    title: `سجل التظلمات — ${decision.decisionId}`,
    body: `
      <div class="tbl-wrap">
        <table class="dtbl">
          <thead><tr><th>رقم التظلم</th><th>الحالة</th><th>تاريخ التقديم</th></tr></thead>
          <tbody>
            ${decision.linkedAppeals.length ? decision.linkedAppeals.map((appeal) => `
              <tr>
                <td style="font-family:monospace">${appeal.id}</td>
                <td>${statusBadge(appeal.status)}</td>
                <td>${formatDate(appeal.submitDate)}</td>
              </tr>`).join('') : '<tr><td colspan="3" style="text-align:center;color:var(--text3)">لا توجد تظلمات</td></tr>'}
          </tbody>
        </table>
      </div>`,
    footer: `<button class="btn btn-ghost" onclick="closeModal()">إغلاق</button>`
  });
}

function initiateAppealFromDecision(decisionId) {
  const decision = getCommitteeDecisionsData().find((item) => item.decisionId === decisionId);
  if (!decision) return;
  const existing = WI_DATA.appeals.find((appeal) => appeal.originalRequestId === decision.requestId);
  if (existing) {
    showToast(`يوجد تظلم مرتبط بالفعل: ${existing.id}`, 'i');
    return;
  }
  const appealId = `APP-2025-${String(WI_DATA.appeals.length + 68).padStart(6, '0')}`;
  const newAppeal = createAppealRequest({
    id: appealId,
    originalRequestId: decision.requestId,
    originalRequestType: decision.requestType || 'قرار لجنة',
    status: 'تم تقديم طلب التظلم — بانتظار مراجعة موظف قسم اللجان الطبية',
    submitDate: new Date().toISOString().slice(0, 10),
    lastUpdate: new Date().toISOString().slice(0, 16).replace('T', ' '),
    lastUpdatedBy: getCurrentUserData()?.name || '',
    applicant: {
      name: decision.record?.applicant?.name || decision.beneficiaryName,
      civil: decision.record?.applicant?.civil || decision.record?.insured?.civil || '',
      role: decision.record?.applicant?.role || 'مقدم الطلب',
      phone: decision.record?.applicant?.phone || decision.record?.insured?.phone || '',
      email: decision.record?.applicant?.email || decision.record?.insured?.email || '',
    },
    insured: { ...(decision.record?.insured || {}) },
    employer: { ...(decision.record?.employer || {}) },
    decision: {
      type: decision.decisionType,
      date: decision.decisionDate,
      issuer: 'اللجان الطبية',
      details: decision.details?.summary || decision.details?.details || 'قرار لجنة طبية مرتبط بطلب عرض على المؤسسات الصحية المرخصة',
      knowledgeDate: new Date().toISOString().slice(0, 10),
    },
    appealReason: 'تظلم على قرار اللجنة الطبية المرتبط بطلب العرض على المؤسسات الصحية المرخصة',
    appealDetails: 'تم إنشاء تظلم تجريبي من شاشة قرارات اللجان الطبية لربط القرار بسجل التظلمات.',
    timeline: [
      {
        action: 'تقديم التظلم',
        actor: getCurrentUserData()?.name || 'مستخدم النظام',
        role: WI_CONFIG.roles?.[CURRENT_ROLE]?.nameAr || 'مستخدم النظام',
        time: new Date().toISOString().slice(0, 16).replace('T', ' '),
        fromStatus: '',
        toStatus: 'تم تقديم طلب التظلم — بانتظار مراجعة موظف قسم اللجان الطبية',
        note: `تم إنشاء التظلم من سياق القرار ${decision.decisionId}`,
        type: 'info',
        phone: getCurrentUserPhone(),
      }
    ],
  });
  WI_DATA.appeals.unshift(newAppeal);
  showToast(`تم إنشاء التظلم ${appealId}`, 's');
}

/* ═══════════════════════════════════════════════════════════════
   Dashboard Enhancement (charts, current-work table)
   ═══════════════════════════════════════════════════════════════ */
function bucketEntries(entries, getter) {
  const map = new Map();
  entries.forEach(e => { const key = getter(e) || 'أخرى'; map.set(key, (map.get(key) || 0) + 1); });
  return [...map.entries()].map(([label, value]) => ({ label, value })).sort((a, b) => b.value - a.value);
}

function pickChartPalette(count) {
  const p = ['#0a5c36','#12a865','#c7a94e','#0f6f8f','#c0392b','#7c3aed','#0f766e','#b45309'];
  return Array.from({ length: count }, (_, i) => p[i % p.length]);
}

function normalizeDateKey(value) {
  if (!value) return null;
  const raw = String(value).trim();
  if (/^\d{4}-\d{2}-\d{2}/.test(raw)) return raw.slice(0, 7);
  return null;
}

function buildMonthBuckets(entries, dateGetter) {
  const m = new Map();
  entries.forEach(e => { const k = normalizeDateKey(dateGetter(e)); if (k) m.set(k, (m.get(k) || 0) + 1); });
  return [...m.entries()].sort((a,b) => a[0].localeCompare(b[0])).slice(-6).map(([label, value]) => ({ label, value }));
}

function findRequestById(id) {
  return findRequestByIdAcrossScopes(id);
}

function getDashboardEntityName(item) {
  return item.insured?.name || item.applicant?.name || item.institution?.name || item.delegate?.name || item.name || item.id || '—';
}
function getDashboardDate(item)     { return item.submitDate || item.date || item.lastUpdate || null; }
function getDashboardCategory(item) { return item.type || item.requestType || item.originalRequestType || item.institution || item.subtype || 'أخرى'; }

function getRoleDataset(role) {
  const users = WI_DATA.users;
  const workerCivil   = users.worker?.civil;
  const employerCivil = users.employer_delegate?.civil;
  const licensingStatuses = ['تم إحالة الطلب إلى اللجنة الطبية الإشرافية — بانتظار جدولة جلسة','تم جدولة جلسة اللجنة الطبية الإشرافية','تم اتخاذ القرار من اللجنة الطبية الإشرافية — بانتظار تنفيذ القرار','تم اعتماد الترخيص — الترخيص نشط','مسودة','تم تقديم طلب الترخيص / التجديد — بانتظار مراجعة موظف قسم التراخيص والرقابة','بانتظار اعتماد رئيس قسم التراخيص والرقابة'];
  switch (role) {
    case 'worker':           return { scopeLabel: 'طلباتك الحالية', entries: [...WI_DATA.allowances.filter(r => r.applicant?.civil === workerCivil || r.insured?.civil === workerCivil), ...WI_DATA.disability.filter(r => r.applicant?.civil === workerCivil), ...WI_DATA.appeals.filter(r => r.applicant?.civil === workerCivil)] };
    case 'employer-delegate':return { scopeLabel: 'طلبات جهة العمل', entries: [...WI_DATA.allowances.filter(r => r.employer?.cr === users.employer_delegate?.cr), ...WI_DATA.appeals.filter(a => a.applicant?.civil === employerCivil)] };
    case 'injury-investigator': return { scopeLabel: 'ملف إصابات العمل', entries: WI_DATA.allowances.filter(r => r.type === 'إصابة عمل') };
    case 'injury-head':      return { scopeLabel: 'طلبات إصابات العمل', entries: WI_DATA.allowances.filter(r => r.type === 'إصابة عمل') };
    case 'od-investigator':  return { scopeLabel: 'ملف الأمراض المهنية', entries: WI_DATA.allowances.filter(r => r.type === 'مرض مهني') };
    case 'od-head':          return { scopeLabel: 'طلبات الأمراض المهنية', entries: WI_DATA.allowances.filter(r => r.type === 'مرض مهني') };
    case 'sickleave-employee':
    case 'sickleave-head':   return { scopeLabel: 'طلبات الإجازات المرضية', entries: WI_DATA.allowances.filter(r => r.status.includes('الإجازات المرضية') || (r.sickLeavePeriods && r.sickLeavePeriods.length)) };
    case 'disability-employee':
    case 'disability-head':  return { scopeLabel: 'طلبات منفعة الإعاقة', entries: WI_DATA.disability };
    case 'committees-employee':
    case 'committees-head':  return { scopeLabel: 'ملفات اللجان الطبية', entries: [...WI_DATA.allowances.filter(r => r.status.includes('اللجان الطبية') || r.status.includes('المؤسسات الصحية المرخصة')), ...WI_DATA.appeals] };
    case 'licensing-employee':
    case 'licensing-head':
    case 'hospital-delegate':
    case 'supervisory-committee':
    case 'supervisory-rapporteur': return { scopeLabel: 'طلبات التراخيص', entries: WI_DATA.licensing.filter(r => licensingStatuses.includes(r.status) || r.status) };
    case 'licensed-institution':
    case 'institution-rapporteur': return { scopeLabel: 'الجلسات الطبية', entries: WI_DATA.sessions };
    case 'appeals-committee':
    case 'appeals-rapporteur':     return { scopeLabel: 'ملفات التظلمات', entries: WI_DATA.appeals };
    case 'referral-coordinator': return { scopeLabel: 'إحالات المؤسسات الصحية', entries: [...WI_DATA.referrals, ...WI_DATA.appeals] };
    default: return { scopeLabel: 'الملفات الحالية', entries: [] };
  }
}

function renderDashboardDonutChart(items, title, centerLabel) {
  if (!items.length) return '';
  const total = items.reduce((s, i) => s + i.value, 0);
  const radius = 44, circumference = 2 * Math.PI * radius;
  let offset = 0;
  const colors = pickChartPalette(items.length);
  const segments = items.map((item, idx) => {
    const arc = (item.value / total) * circumference;
    const seg = `<circle cx="70" cy="70" r="${radius}" fill="none" stroke="${colors[idx]}" stroke-width="14" stroke-linecap="round" stroke-dasharray="${arc} ${circumference}" stroke-dashoffset="${-offset}" transform="rotate(-90 70 70)"></circle>`;
    offset += arc;
    return seg;
  }).join('');
  return `
    <div class="chart-card">
      <div class="chart-head"><h3>${title}</h3><span>${total} عنصر</span></div>
      <div class="chart-donut-wrap">
        <svg class="chart-donut" viewBox="0 0 140 140" aria-hidden="true">
          <circle cx="70" cy="70" r="${radius}" fill="none" stroke="#e5efe9" stroke-width="14"></circle>
          ${segments}
        </svg>
        <div class="chart-donut-center"><strong>${total}</strong><span>${centerLabel}</span></div>
      </div>
      <div class="chart-legend">
        ${items.map((item, idx) => `<div class="chart-legend-item"><span class="chart-swatch" style="background:${colors[idx]}"></span><span class="chart-legend-label">${item.label}</span><strong>${item.value}</strong></div>`).join('')}
      </div>
    </div>`;
}

function renderDashboardBars(items, title, mode = 'value') {
  if (!items.length) return '';
  const max = Math.max(...items.map(i => i.value), 1);
  return `
    <div class="chart-card">
      <div class="chart-head"><h3>${title}</h3><span>${items.length} فئة</span></div>
      <div class="chart-bars ${mode === 'months' ? 'months' : ''}">
        ${items.map((item, idx) => `
          <div class="chart-bar-row">
            <div class="chart-bar-meta"><span>${item.label}</span><strong>${item.value}</strong></div>
            <div class="chart-bar-track"><div class="chart-bar-fill" style="width:${(item.value/max)*100}%;background:${pickChartPalette(items.length)[idx]}"></div></div>
          </div>`).join('')}
      </div>
    </div>`;
}

function renderDashboardInsights(role) {
  const { scopeLabel, entries } = getRoleDataset(role);
  if (!entries.length) return '';
  const statusBuckets   = bucketEntries(entries, i => i.status).slice(0, 5);
  const categoryBuckets = bucketEntries(entries, i => getDashboardCategory(i)).slice(0, 5);
  const monthBuckets    = buildMonthBuckets(entries, i => getDashboardDate(i));
  if (!statusBuckets.length && !categoryBuckets.length && !monthBuckets.length) return '';
  return `
    <div class="dashboard-insights">
      ${renderDashboardDonutChart(statusBuckets,   `توزيع الحالات — ${scopeLabel}`, 'حالة')}
      ${renderDashboardBars(categoryBuckets, `التوزيع حسب النوع — ${scopeLabel}`)}
      ${renderDashboardBars(monthBuckets,    'الحركة الزمنية لآخر 6 أشهر', 'months')}
    </div>`;
}

function buildCurrentWorkTable(rows) {
  return `
    <div class="card dashboard-card-wide dashboard-current-work">
      <div class="ph"><h3><div class="pico bl">${ICONS.lock}</div>الطلبات الجاري العمل عليها حاليا</h3></div>
      <div class="pb-0">
        <div class="tbl-wrap">
          <table class="dtbl">
            <thead><tr><th>رقم الطلب</th><th>صاحب الطلب / الجهة</th><th>الحالة الحالية</th><th>آخر تحديث</th><th></th></tr></thead>
            <tbody>
              ${rows.map(row => `
                <tr>
                  <td style="font-family:monospace;font-weight:700;color:var(--primary)">${row.id}</td>
                  <td>${row.name}</td>
                  <td>${row.statusHtml}</td>
                  <td style="font-size:12px;color:var(--text3)">${row.lastUpdate || '—'}</td>
                  <td><a class="btn btn-primary btn-xs" href="${row.href}">فتح التفاصيل</a></td>
                </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>`;
}

function replaceCheckedOutSummary(content) {
  const alerts = [...content.querySelectorAll('.alert')].filter(a => a.textContent.includes('الطلبات التي حجزتها حالياً') || a.textContent.includes('الطلبات الجاري العمل عليها حاليا'));
  alerts.forEach((alert) => {
    const anchors = [...alert.querySelectorAll('a[href]')];
    if (!anchors.length) { alert.innerHTML = alert.innerHTML.replace('الطلبات التي حجزتها حالياً', 'الطلبات الجاري العمل عليها حاليا'); return; }
    const rows = anchors.map((anchor) => {
      const id  = anchor.textContent.trim();
      const req = findRequestById(id);
      return { id, href: anchor.getAttribute('href'), name: req ? getDashboardEntityName(req) : '—', statusHtml: req ? statusBadge(req.status || '—') : '—', lastUpdate: req ? (req.lastUpdate || req.submitDate || '—') : '—' };
    });
    const wrapper = document.createElement('div');
    wrapper.innerHTML = buildCurrentWorkTable(rows);
    alert.replaceWith(wrapper.firstElementChild);
  });
}

function normalizeDashboardTableWidths(content) {
  [...content.children].forEach((child) => {
    if (child.tagName === 'DIV' && (child.getAttribute('style') || '').includes('display:grid')) {
      child.classList.add('dashboard-auto-grid');
      child.querySelectorAll('.card').forEach((card) => { if (card.querySelector('.dtbl')) card.classList.add('dashboard-card-wide'); });
    }
  });
}

let dashboardEnhanceQueued = false;
function enhanceDashboardContent() {
  if (typeof CURRENT_PAGE === 'undefined' || CURRENT_PAGE !== 'dashboard') return;
  const content = getContent();
  if (!content || !content.children.length) return;
  replaceCheckedOutSummary(content);
  normalizeDashboardTableWidths(content);
  const statsGrid = content.querySelector('.stats-grid');
  if (statsGrid && !content.querySelector('.dashboard-insights')) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = renderDashboardInsights(CURRENT_ROLE);
    if (wrapper.firstElementChild) statsGrid.insertAdjacentElement('afterend', wrapper.firstElementChild);
  }
}

function queueDashboardEnhancement() {
  if (dashboardEnhanceQueued) return;
  dashboardEnhanceQueued = true;
  setTimeout(() => { dashboardEnhanceQueued = false; enhanceDashboardContent(); }, 0);
}

function enhanceListContent() {
  if (typeof CURRENT_PAGE === 'undefined') return;
  const page = String(CURRENT_PAGE || '');
  if (!page.includes('list')) return;
  const content = getContent();
  if (!content) return;
  if (content.querySelector('.unified-filter-panel')) return;
  const existingFilters = content.querySelector('.filters');
  if (!existingFilters) return;
  const wrapper = document.createElement('div');
  wrapper.innerHTML = renderUnifiedFilterBar({ onSearch: 'noopUnifiedSearch', onToggleAll: 'noopUnifiedToggleAll', isAllVisible: false });
  const unified = wrapper.firstElementChild;
  if (!unified) return;
  existingFilters.replaceWith(unified);
}

(function setupDashboardObserver() {
  const run = () => { queueDashboardEnhancement(); enhanceListContent(); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
  else run();
  const observer = new MutationObserver(() => { if (typeof CURRENT_PAGE !== 'undefined' && CURRENT_PAGE === 'dashboard') run(); });
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();

/* حجز الطلب / تحرير الطلب helpers (used by investigator pages) */
function doCheckout() {
  confirmAction({
    title: 'حجز الطلب',
    msg: 'هل تريد حجز هذا الطلب للعمل عليه؟ لن يتمكن موظف آخر من اتخاذ إجراء حتى يتم تحريره.',
    confirmLabel: 'نعم، احجز الطلب',
    confirmClass: 'btn-primary',
    onConfirm: () => { showToast('تم حجز الطلب بنجاح', 's'); setTimeout(() => window.location.reload(), 1200); }
  });
}

function doCheckin() {
  confirmAction({
    title: 'تحرير الطلب',
    msg: 'هل تريد تحرير هذا الطلب؟ سيتمكن الآخرون من العمل عليه بعد التحرير.',
    confirmLabel: 'نعم، حرّر الطلب',
    confirmClass: 'btn-secondary',
    onConfirm: () => { showToast('تم تحرير الطلب', 'i'); setTimeout(() => window.location.reload(), 1200); }
  });
}
