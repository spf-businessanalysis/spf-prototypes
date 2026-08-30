/**
 * SPF Saving System Mockup - Shared Logic
 */

document.addEventListener('DOMContentLoaded', function () {
    // 1. Initialize Layout (Navbar & Sidebar)
    initLayout();

    // 2. Initialize User Type Toggle
    initUserToggle();

    // 3. Initialize Notification Listener
    initNotifications();

    // 4. Highlight Active Sidebar Link
    highlightActiveLink();
});

function initLayout() {
    const navbarHTML = `
    <nav class="spf-navbar">
        <a href="index.html" class="navbar-brand">
            <div class="logo-placeholder"><i class="fas fa-shield-alt"></i></div>
            <div class="d-none d-md-block">صندوق الحماية الاجتماعية</div>
        </a>
        
        <div class="navbar-title d-none d-lg-block" id="pageTitle">
            <!-- Page Title Injected Here -->
        </div>

        <div class="navbar-actions">
            <div class="user-toggle me-3" id="globalUserToggle">
                <button class="toggle-btn active" data-role="saver">المدخر</button>
                <button class="toggle-btn" data-role="employer">صاحب العمل</button>
                <button class="toggle-btn" data-role="staff">موظف الصندوق</button>
            </div>

            <div class="notification-bell" id="notifBell">
                <i class="far fa-bell"></i>
                <span class="badge rounded-pill bg-danger">3</span>
                
                <div class="notification-panel" id="notifPanel">
                    <div class="panel-header">
                        <span>التنبيهات</span>
                        <a href="#" class="text-spf-dark text-decoration-none small">تحديد الكل كمقروء</a>
                    </div>
                    <div class="panel-body">
                        <div class="notif-item unread">
                            <div class="notif-title">تم إيداع مبلغ 100 ر.ع في حسابك</div>
                            <div class="notif-time">منذ 10 دقائق</div>
                        </div>
                        <div class="notif-item unread">
                            <div class="notif-title">تمت الموافقة على طلب صرف فائض الاشتراكات</div>
                            <div class="notif-time">منذ ساعتين</div>
                        </div>
                        <div class="notif-item unread">
                            <div class="notif-title">نسبة العائد السنوي لعام 2025 قيد المراجعة</div>
                            <div class="notif-time">منذ يوم واحد</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="user-badge ms-2">
                <span>أحمد البوسعيدي</span>
                <div class="user-avatar">أ</div>
            </div>
            
            <a href="index.html" class="nav-link">
                <i class="fas fa-home"></i>
            </a>
        </div>
    </nav>`;

    const sidebarHTML = `
    <aside class="spf-sidebar" id="mainSidebar">
        <div class="sidebar-header">القائمة الرئيسية</div>
        <ul class="sidebar-nav">
            <li class="nav-saver nav-employer nav-staff"><a href="index.html" id="link-index"><i class="fas fa-home"></i> الصفحة الرئيسية</a></li>
            <li class="nav-saver nav-employer nav-staff"><a href="01-dashboard.html" id="link-01"><i class="fas fa-th-large"></i> لوحة التحكم</a></li>
            <li class="nav-saver"><a href="02-registration.html" id="link-02"><i class="fas fa-user-plus"></i> التسجيل في النظام</a></li>
            
            <!-- Staff Specific Categories -->
            <li class="nav-staff sidebar-category-header mt-3">قسم النظم التكميلية</li>
            <li class="nav-employer nav-staff"><a href="03-registered-workers.html" id="link-03"><i class="fas fa-users"></i> العمال المسجلين</a></li>
            <li class="nav-saver nav-employer nav-staff"><a href="04-account-details.html" id="link-04"><i class="fas fa-info-circle"></i> تفاصيل الحساب</a></li>
            <li class="nav-staff"><a href="14-transaction-history.html" id="link-14-staff"><i class="fas fa-history"></i> سجل العمليات</a></li>

            <li class="nav-staff sidebar-category-header mt-3">موظفي الصرف</li>
            <li class="nav-staff"><a href="10-disbursement-processing.html" id="link-10"><i class="fas fa-tasks"></i> معالجة طلبات الصرف</a></li>

            <li class="nav-staff sidebar-category-header mt-3">موظفي الاستثمار</li>
            <li class="nav-staff"><a href="07-investment-return.html" id="link-07"><i class="fas fa-chart-line"></i> عائد الاستثمار</a></li>
            <li class="nav-staff"><a href="12-surplus-transfers.html" id="link-12"><i class="fas fa-exchange-alt"></i> تحويل الفائض</a></li>

            <li class="nav-staff sidebar-category-header mt-3">روابط عامة</li>
            <li class="nav-saver nav-employer"><a href="05-deposit.html" id="link-05"><i class="fas fa-hand-holding-usd"></i> الإيداع الإلكتروني</a></li>
            <li class="nav-saver"><a href="08-disbursement.html" id="link-08"><i class="fas fa-money-check-alt"></i> طلبات الصرف (المدخر)</a></li>
            <li class="nav-saver"><a href="06-obligations.html" id="link-06"><i class="fas fa-file-invoice-dollar"></i> سداد الالتزامات</a></li>
            <li class="nav-staff"><a href="09-mandatory-saving.html" id="link-09"><i class="fas fa-piggy-bank"></i> الادخار الإلزامي</a></li>
            <li class="nav-staff"><a href="11-optional-saving-inquiries.html" id="link-11"><i class="fas fa-circle-question"></i> استفسارات الادخار الاختياري</a></li>
            <li class="nav-saver"><a href="13-exit-system.html" id="link-13"><i class="fas fa-user-times"></i> الخروج من النظام</a></li>
            <li class="nav-saver nav-employer" id="li-14-saver"><a href="14-transaction-history.html" id="link-14"><i class="fas fa-history"></i> سجل المعاملات</a></li>
            <li class="nav-staff"><a href="15-reports.html" id="link-15"><i class="fas fa-chart-pie"></i> التقارير والتحليل</a></li>
        </ul>
    </aside>`;

    // Insert navbar and sidebar if placeholders exist
    const navbarPlaceholder = document.getElementById('navbarPlaceholder');
    const sidebarPlaceholder = document.getElementById('sidebarPlaceholder');

    if (navbarPlaceholder) navbarPlaceholder.innerHTML = navbarHTML;
    if (sidebarPlaceholder) sidebarPlaceholder.innerHTML = sidebarHTML;

    // Set page title from document title if header exists
    const pageTitleElem = document.getElementById('pageTitle');
    if (pageTitleElem) {
        pageTitleElem.innerText = document.title.split('-')[0].trim();
    }
}

function initUserToggle() {
    const toggleButtons = document.querySelectorAll('#globalUserToggle .toggle-btn');
    const savedRole = localStorage.getItem('spf-user-role') || 'saver';

    // Apply active class to the button matching saved role
    toggleButtons.forEach(btn => {
        if (btn.getAttribute('data-role') === savedRole) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }

        btn.addEventListener('click', function () {
            const role = this.getAttribute('data-role');
            localStorage.setItem('spf-user-role', role);

            // Highlight active button
            toggleButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Refresh UI or trigger callback
            applyRoleVisibility(role);

            // Broadcast event for page-specific logic
            const event = new CustomEvent('spfRoleChanged', { detail: { role: role } });
            document.dispatchEvent(event);
        });
    });

    // Initial application of visibility rules
    applyRoleVisibility(savedRole);
}

function applyRoleVisibility(role) {
    document.body.setAttribute('data-user-role', role);

    // Sidebar visibility
    const sidebar = document.getElementById('mainSidebar');
    if (sidebar) {
        sidebar.querySelectorAll('.sidebar-nav li').forEach(li => {
            if (li.classList.contains('nav-' + role)) {
                li.style.display = 'block';
            } else {
                li.style.display = 'none';
            }
        });

        // Handle specific case for link-14
        const li14Saver = document.getElementById('li-14-saver');
        if (li14Saver) {
            li14Saver.style.display = (role === 'saver' || role === 'employer') ? 'block' : 'none';
        }
    }

    // Role-specific sections in pages
    document.querySelectorAll('.role-section').forEach(section => {
        if (section.classList.contains('role-' + role)) {
            section.classList.remove('d-none');
        } else {
            section.classList.add('d-none');
        }
    });

    // Update role badges
    document.querySelectorAll('.current-role-badge').forEach(badge => {
        if (role === 'saver') {
            badge.className = 'current-role-badge badge user-type-badge saver';
            badge.innerText = 'المدخر';
        } else if (role === 'employer') {
            badge.className = 'current-role-badge badge user-type-badge employer';
            badge.innerText = 'صاحب العمل';
        } else {
            badge.className = 'current-role-badge badge user-type-badge staff';
            badge.innerText = 'موظف الصندوق';
        }
    });
}

function initNotifications() {
    const notifBell = document.getElementById('notifBell');
    const notifPanel = document.getElementById('notifPanel');

    if (notifBell && notifPanel) {
        notifBell.addEventListener('click', (e) => {
            e.stopPropagation();
            notifPanel.classList.toggle('show');
        });

        document.addEventListener('click', () => {
            notifPanel.classList.remove('show');
        });

        notifPanel.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
}

function highlightActiveLink() {
    const currentPath = window.location.pathname.split('/').pop();
    const activeLink = document.querySelector(`.sidebar-nav a[href="${currentPath}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// Global UI Helpers
window.spf = {
    showSuccess: function (message) {
        const modalId = 'successModal' + Date.now();
        const modalHTML = `
        <div class="modal fade" id="${modalId}" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-body text-center py-5">
                        <div class="mb-3 text-spf" style="font-size: 3rem;">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <h5 class="fw-800 mb-2">تمت العملية بنجاح</h5>
                        <p class="text-muted mb-4">${message}</p>
                        <button type="button" class="btn btn-spf px-5" data-bs-dismiss="modal">موافق</button>
                    </div>
                </div>
            </div>
        </div>`;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        const modal = new bootstrap.Modal(document.getElementById(modalId));
        modal.show();
    },

    showError: function (message) {
        const modalId = 'errorModal' + Date.now();
        const modalHTML = `
        <div class="modal fade" id="${modalId}" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content border-danger">
                    <div class="modal-body text-center py-5">
                        <div class="mb-3 text-danger" style="font-size: 3rem;">
                            <i class="fas fa-exclamation-circle"></i>
                        </div>
                        <h5 class="fw-800 mb-2">عذراً، حدث خطأ</h5>
                        <p class="text-muted mb-4">${message}</p>
                        <button type="button" class="btn btn-spf px-5" data-bs-dismiss="modal">موافق</button>
                    </div>
                </div>
            </div>
        </div>`;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        const modal = new bootstrap.Modal(document.getElementById(modalId));
        modal.show();
    },

    renderInquiries: function (inquiries) {
        if (!inquiries || !inquiries.length) return;

        const main = document.querySelector('main.spf-main');
        if (!main) return;

        const html = `
        <div class="inquiry-panel">
            <div class="inquiry-header">
                <i class="fas fa-question-circle"></i>
                <span>الاستفسارات والتوضيحات</span>
            </div>
            <div class="inquiry-body">
                <ul class="inquiry-list">
                    ${inquiries.map(item => `<li class="inquiry-item">${item}</li>`).join('')}
                </ul>
            </div>
        </div>`;

        main.insertAdjacentHTML('beforeend', html);
    }
};

// Handle Payment Method Fields Toggling
document.addEventListener('change', function (e) {
    if (e.target && e.target.name === 'paymentMethod') {
        const val = e.target.value;
        const grid = e.target.closest('.payment-methods-grid');
        const container = (grid && grid.parentElement) || e.target.closest('form') || document;
        const cardFields = container.querySelector('[id^="cardDetails"]');
        const walletFields = container.querySelector('[id^="walletDetails"]');

        // Handle Active Classes
        container.querySelectorAll('.payment-method-card').forEach(card => {
            card.classList.toggle('active', card.querySelector('input').checked);
        });

        // Toggle Fields
        if (cardFields) {
            cardFields.style.display = (val === 'card') ? 'block' : 'none';
        }
        if (walletFields) {
            walletFields.style.display = (val === 'wallet') ? 'block' : 'none';
        }
    }
});

// Initial Active State for payment cards
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.payment-method-card input:checked').forEach(input => {
        input.closest('.payment-method-card').classList.add('active');
    });
});
