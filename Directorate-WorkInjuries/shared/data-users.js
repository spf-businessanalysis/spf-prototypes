/* ================================================================
   data-users.js — بيانات المستخدمين
   ================================================================ */

/* ================================================================
   User Availability Structure
   Each user object should include availability field with structure:
   availability: {
     status: 'متاح' | 'غير متاح',  // Current availability status
     note: '',                       // Optional note when unavailable
   }
   ================================================================ */

const USERS_DATA = {
  worker: {
    name: 'سالم بن ناصر الحارثي', civil: '9012345678', phone: '96898765432', email: 'salem.h@gmail.com',
    availability: { status: 'متاح', note: '' },
    employerHistory: [
      { name: 'مجموعة النور للإنشاءات ش.م.م', cr: '1234567', joinDate: '2019-03-01', endDate: null, current: true },
      { name: 'شركة الخليج للمقاولات', cr: '7654321', joinDate: '2015-06-01', endDate: '2019-02-28', current: false },
      { name: 'مؤسسة البناء الحديث', cr: '9876543', joinDate: '2012-01-01', endDate: '2015-05-31', current: false },
    ]
  },
  employer_delegate: {
    name: 'خالد بن سعيد البلوشي', civil: '9087654321', phone: '96891234567', email: 'khalid.b@company.com',
    availability: { status: 'متاح', note: '' },
    company: 'مجموعة النور للإنشاءات', cr: '1234567',
    sector: 'الإنشاءات والمقاولات',
    employerType: 'خاص',
    branches: [
      { id: 'BR-001', name: 'الفرع الرئيسي', state: 'مسقط', governorate: 'بوشر' },
      { id: 'BR-002', name: 'فرع صحار', state: 'شمال الباطنة', governorate: 'صحار' },
      { id: 'BR-003', name: 'فرع صلالة', state: 'ظفار', governorate: 'صلالة' },
    ]
  },
  injury_investigator: { name: 'عائشة بنت محمد الرواحي', civil: '9055551111', phone: '96895551111', employeeId: 'SPF-0342', availability: { status: 'متاح', note: '' } },
  injury_head: { name: 'يوسف بن علي الشيباني', civil: '9055552222', phone: '96895552222', employeeId: 'SPF-0210', availability: { status: 'متاح', note: '' } },
  od_investigator: { name: 'فاطمة بنت حمد الحجرية', civil: '9055553333', phone: '96895553333', employeeId: 'SPF-0387', availability: { status: 'متاح', note: '' } },
  od_head: { name: 'أحمد بن سليم المعمري', civil: '9055554444', phone: '96895554444', employeeId: 'SPF-0198', availability: { status: 'متاح', note: '' } },
  sickleave_employee: { name: 'مريم بنت سيف الكيومية', civil: '9055555555', phone: '96895555555', employeeId: 'SPF-0421', availability: { status: 'غير متاح', note: 'في اجتماع' } },
  sickleave_head: { name: 'حمد بن عيسى الغافري', civil: '9055556666', phone: '96895556666', employeeId: 'SPF-0156', availability: { status: 'متاح', note: '' } },
  disability_employee: { name: 'نورة بنت سالم الزدجالية', civil: '9055557777', phone: '96895557777', employeeId: 'SPF-0456', availability: { status: 'متاح', note: '' } },
  disability_head: { name: 'بدر بن خميس العبري', civil: '9055558888', phone: '96895558888', employeeId: 'SPF-0134', availability: { status: 'متاح', note: '' } },
  committees_employee: { name: 'سعاد بنت أحمد الريامية', civil: '9055559999', phone: '96895559999', employeeId: 'SPF-0512', availability: { status: 'متاح', note: '' } },
  committees_head: { name: 'محمد بن راشد الهنائي', civil: '9055550000', phone: '96895550000', employeeId: 'SPF-0089', availability: { status: 'متاح', note: '' } },
  licensing_employee: { name: 'هدى بنت ناصر الوهيبية', civil: '9066661111', phone: '96896661111', employeeId: 'SPF-0534', availability: { status: 'متاح', note: '' } },
  licensing_head: { name: 'طالب بن سعيد الحنبلي', civil: '9066662222', phone: '96896662222', employeeId: 'SPF-0067', availability: { status: 'متاح', note: '' } },
  licensed_institution: { name: 'مستشفى النور التخصصي', civil: '7000000001', phone: '96824567890', email: 'info@alnoor-hospital.om', licenseNo: 'LIC-ORG-2020-014', availability: { status: 'متاح', note: '' } },
  supervisory_committee: { name: 'د. سيف بن حمد المسكري', civil: '9066665555', phone: '96896665555', committeeId: 'SUP-COM-01', availability: { status: 'متاح', note: '' } },
  appeals_committee: { name: 'د. خالد بن سالم الهاشمي', civil: '9066666666', phone: '96896666666', committeeId: 'APP-COM-01', availability: { status: 'متاح', note: '' } },
  hospital_delegate: { name: 'منى بنت عبدالله الرحبية', civil: '9066663333', phone: '96896663333', email: 'mona@hospital.om', availability: { status: 'متاح', note: '' } },
  od_committee: { name: 'د. ناصر بن حمود الفارسي', civil: '9066671111', phone: '96896671111', committeeId: 'OD-COM-01', availability: { status: 'متاح', note: '' } },
  institution_rapporteur: { name: 'أنس بن خلفان الجابري', civil: '9066664444', phone: '96896664444', employeeId: 'SPF-0589', availability: { status: 'متاح', note: '' } },
  appeals_rapporteur: { name: 'ليلى بنت حمود الفارسية', civil: '9066667777', phone: '96896667777', employeeId: 'SPF-0611', availability: { status: 'متاح', note: '' } },
  supervisory_rapporteur: { name: 'مازن بن سعيد اللواتي', civil: '9066668888', phone: '96896668888', employeeId: 'SPF-0624', availability: { status: 'متاح', note: '' } },
  referral_coordinator: { name: 'عبدالله بن محمد العامري', civil: '9066669999', phone: '96896669999', employeeId: 'SPF-0645', availability: { status: 'متاح', note: '' } },
  direct_referral_employee: { name: 'ريم بنت عبدالله البلوشية', civil: '9055544332', phone: '96895554433', employeeId: 'SPF-0677', availability: { status: 'متاح', note: '' } },
  investigation_director: { name: 'سيف بن عبدالله الكندي', civil: '9055512345', phone: '96895512345', employeeId: 'SPF-0045', availability: { status: 'متاح', note: '' } },
  external_investigator: {
    name: 'مبارك بن حمد الرحبي', civil: '9077771111', phone: '96893331111', email: 'mubarak.r@safety-services.om',
    entityId: 'EXT-001', entityName: 'شركة خدمات الأمن والسلامة', entityCr: '1102233',
    availability: { status: 'متاح', note: '' },
  },
};

/* ================================================================
   Helper Functions for User Data
   ================================================================ */

/**
 * Get user by role key
 * @param {string} roleKey - The role key (e.g., 'worker', 'injury_investigator')
 * @returns {object|null} User object or null if not found
 */
function getUserByRole(roleKey) {
  return USERS_DATA[roleKey] || null;
}

/**
 * Get all users
 * @returns {object} All users object
 */
function getAllUsers() {
  return USERS_DATA;
}

/**
 * Validate user data structure
 * @param {object} user - User object to validate
 * @returns {object} Validation result with isValid and errors array
 */
function validateUserData(user) {
  const errors = [];

  if (!user.name || typeof user.name !== 'string') {
    errors.push('User name is required and must be a string');
  }

  if (!user.civil || typeof user.civil !== 'string') {
    errors.push('Civil ID is required and must be a string');
  }

  if (!user.phone || typeof user.phone !== 'string') {
    errors.push('Phone number is required and must be a string');
  }

  // Availability validation
  if (!user.availability || typeof user.availability !== 'object') {
    errors.push('Availability information is required');
  } else {
    if (!user.availability.status || !['متاح', 'غير متاح'].includes(user.availability.status)) {
      errors.push('Availability status must be either "متاح" or "غير متاح"');
    }
    if (user.availability.note !== undefined && typeof user.availability.note !== 'string') {
      errors.push('Availability note must be a string');
    }
  }

  return {
    isValid: errors.length === 0,
    errors: errors
  };
}

/* ================================================================
   Export for use in main data.js (Global Scope)
   ================================================================ */

// Make data available globally for browser loading
window.USERS_DATA = USERS_DATA;
window.getUserByRole = getUserByRole;
window.getAllUsers = getAllUsers;
window.validateUserData = validateUserData;
