function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    const arrow = document.getElementById("sidebar-arrow");
    sidebar.classList.toggle("collapsed");
    arrow.classList.toggle("fa-chevron-left");
    arrow.classList.toggle("fa-chevron-right");
  }
  

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Toastr notifications with enhanced options
    toastr.options = {
        "closeButton": true,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "preventDuplicates": true,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut",
        "tapToDismiss": false
    };

    // Initialize all modules
    initNavigation();
    initNotifications();
    initMessagesSystem();
    initPatientInteractions();
    initAppointmentActions();
    initPrescriptionActions();
    initSearchFunctionality();
    initSettings();
    initModals();
    initAnalytics();
    
    // Initialize calendar if on dashboard
    if (document.getElementById('dashboard-page')?.classList.contains('active-page')) {
        initCalendar();
    }
    
    // Initialize charts if on analytics
    if (document.getElementById('analytics-page')?.classList.contains('active-page')) {
        initCharts();
    }
});

// Module: Navigation System
function initNavigation() {
    const navLinks = document.querySelectorAll('nav ul li');
    const pageContents = document.querySelectorAll('.page-content');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            try {
                // Remove active classes
                navLinks.forEach(item => item.classList.remove('active'));
                pageContents.forEach(page => page.classList.remove('active-page'));
                
                // Add active class to clicked item
                this.classList.add('active');
                
                // Show corresponding page
                const pageId = this.getAttribute('data-page') + '-page';
                const targetPage = document.getElementById(pageId);
                if (!targetPage) {
                    throw new Error(`Target page not found: ${pageId}`);
                }
                
                targetPage.classList.add('active-page');
                
                // Initialize components if needed
                if (pageId === 'dashboard-page' && !window.calendar) {
                    initCalendar();
                }
                
                if (pageId === 'analytics-page') {
                    initCharts();
                }
                
                // Track navigation
                trackNavigation(this.getAttribute('data-page'));
            } catch (error) {
                console.error('Navigation error:', error);
                toastr.error('Failed to navigate. Please try again.');
            }
        });
    });
}

// Module: Notification System
function initNotifications() {
    const notificationBtn = document.querySelector('.notification-btn');
    if (!notificationBtn) return;
    
    notificationBtn.addEventListener('click', function() {
        fetchNotifications()
            .then(notifications => {
                if (notifications.length > 0) {
                    notifications.slice(0, 3).forEach(notification => {
                        toastr.info(notification.message, "Notification");
                    });
                } else {
                    toastr.info("You have no new notifications", "Notifications");
                }
                // Clear badge
                const badge = this.querySelector('.badge');
                if (badge) badge.style.display = 'none';
            })
            .catch(error => {
                console.error('Failed to fetch notifications:', error);
                toastr.error("Failed to load notifications");
            });
    });
}

// Module: Messages System
function initMessagesSystem() {
    const sendBtn = document.getElementById('send-message-btn');
    if (sendBtn) {
        sendBtn.addEventListener('click', function() {
            const messageInput = document.querySelector('.message-composer textarea');
            if (!messageInput || messageInput.value.trim() === '') {
                toastr.warning("Please enter a message");
                return;
            }
            
            const messageHistory = document.querySelector('.message-history');
            if (messageHistory) {
                const newMessage = document.createElement('div');
                newMessage.className = 'message sent';
                newMessage.innerHTML = `
                    <p>${messageInput.value}</p>
                    <span class="time">Just now</span>
                `;
                messageHistory.appendChild(newMessage);
                
                toastr.success("Message sent successfully");
                messageInput.value = '';
                
                // Scroll to bottom
                messageHistory.scrollTop = messageHistory.scrollHeight;
            }
        });
    }
    
    // Handle conversation switching
    const conversations = document.querySelectorAll('.conversation');
    conversations.forEach(conv => {
        conv.addEventListener('click', function() {
            conversations.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            
            const unreadCount = this.querySelector('.unread-count');
            if (unreadCount) {
                unreadCount.style.display = 'none';
            }
            
            // Update message header with patient info
            const patientName = this.querySelector('h4')?.textContent;
            const messageHeader = document.querySelector('.message-header .patient-info h4');
            if (messageHeader && patientName) {
                messageHeader.textContent = patientName;
            }
            
            // Clear and load new messages (in a real app, this would fetch from server)
            const messageHistory = document.querySelector('.message-history');
            if (messageHistory) {
                messageHistory.innerHTML = `
                    <div class="message received">
                        <p>Hello Doctor, I have a question about my treatment.</p>
                        <span class="time">Just now</span>
                    </div>
                `;
            }
        });
    });
}

// Module: Patient Interactions
function initPatientInteractions() {
    // Patient table interactions
    const patientRows = document.querySelectorAll('.patient-table tbody tr');
    patientRows.forEach(row => {
        row.addEventListener('click', function(e) {
            // Don't trigger if clicking on buttons
            if (!e.target.closest('.table-btn')) {
                const patientName = this.querySelector('.patient-avatar span').textContent;
                openPatientModal(this.getAttribute('data-patient-id'));
            }
        });
    });

    // View patient buttons
    const viewButtons = document.querySelectorAll('.table-btn.view');
    viewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const patientId = this.closest('tr').getAttribute('data-patient-id');
            const patientName = this.closest('tr').querySelector('.patient-avatar span').textContent;
            openPatientModal(patientId);
        });
    });

    // Message patient buttons
    const messageButtons = document.querySelectorAll('.table-btn.message');
    messageButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const patientId = this.closest('tr').getAttribute('data-patient-id');
            const patientName = this.closest('tr').querySelector('.patient-avatar span').textContent;
            
            // Switch to messages page and open conversation
            navigateToPage('messages');
            
            // Simulate opening conversation
            openConversation(patientId);
            toastr.info(`Opened message thread with ${patientName}`);
        });
    });

    // Edit patient buttons
    const editButtons = document.querySelectorAll('.table-btn.edit');
    editButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const patientId = this.closest('tr').getAttribute('data-patient-id');
            const patientName = this.closest('tr').querySelector('.patient-avatar span').textContent;
            toastr.info(`Editing patient: ${patientName}`);
            // In a real app, this would open an edit form
        });
    });

    // Add patient button
    document.getElementById('add-patient-btn')?.addEventListener('click', function() {
        toastr.success("Opening new patient form");
        // In a real app, this would open a form
    });
}

// Module: Appointment Actions
function initAppointmentActions() {
    // Appointment actions
    const approveButtons = document.querySelectorAll('.btn.approve');
    approveButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.appointment-card');
            const patientName = card.querySelector('.patient-info h4').textContent;
            toastr.success(`Appointment confirmed for ${patientName}`);
            card.style.opacity = '0.5';
            card.style.pointerEvents = 'none';
            this.textContent = 'Confirmed';
            this.style.backgroundColor = '#34a853';
            this.nextElementSibling.style.display = 'none'; // Hide reschedule button
            if (this.nextElementSibling.nextElementSibling) {
                this.nextElementSibling.nextElementSibling.style.display = 'none'; // Hide cancel button
            }
        });
    });

    const rescheduleButtons = document.querySelectorAll('.btn.reschedule');
    rescheduleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.appointment-card');
            const patientName = card.querySelector('.patient-info h4').textContent;
            toastr.warning(`Please select a new date and time for ${patientName}`);
            // In a real app, this would open a date picker
        });
    });

    const cancelButtons = document.querySelectorAll('.btn.cancel');
    cancelButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.appointment-card');
            const patientName = card.querySelector('.patient-info h4').textContent;
            toastr.error(`Appointment cancelled for ${patientName}`);
            card.style.opacity = '0.5';
            card.style.pointerEvents = 'none';
            this.textContent = 'Cancelled';
            this.style.backgroundColor = '#e94235';
            this.previousElementSibling.style.display = 'none'; // Hide reschedule button
            this.previousElementSibling.previousElementSibling.style.display = 'none'; // Hide approve button
        });
    });

    // New appointment button
    document.getElementById('new-appointment-btn')?.addEventListener('click', function() {
        toastr.info("Opening appointment scheduler");
        // In a real app, this would open a scheduler
    });
}

// Module: Prescription Actions
function initPrescriptionActions() {
    // Prescription actions
    const renewButtons = document.querySelectorAll('.table-btn.renew');
    renewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const patientName = row.querySelector('.patient-avatar span').textContent;
            const medication = row.querySelector('td:nth-child(3)').textContent;
            toastr.info(`Renewing prescription for ${patientName}: ${medication}`);
            // In a real app, this would open a renewal form
        });
    });

    const cancelPrescriptionButtons = document.querySelectorAll('.table-btn.cancel');
    cancelPrescriptionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const patientName = row.querySelector('.patient-avatar span').textContent;
            const medication = row.querySelector('td:nth-child(3)').textContent;
            toastr.warning(`Cancelled prescription for ${patientName}: ${medication}`);
            row.style.opacity = '0.6';
            row.querySelector('.status-badge').textContent = 'Cancelled';
            row.querySelector('.status-badge').className = 'status-badge alert';
        });
    });

    // New prescription button
    document.getElementById('new-prescription-btn')?.addEventListener('click', function() {
        openPrescriptionModal();
    });

    // Submit prescription
    document.getElementById('submit-prescription-btn')?.addEventListener('click', function() {
        const patientSelect = document.getElementById('prescription-patient');
        const medicationInput = document.getElementById('prescription-medication');
        
        if (patientSelect.value === 'Select Patient') {
            toastr.warning("Please select a patient");
            return;
        }
        
        if (medicationInput.value.trim() === '') {
            toastr.warning("Please enter a medication");
            return;
        }
        
        const patientName = patientSelect.options[patientSelect.selectedIndex].text.split(' (')[0];
        toastr.success(`Prescription created for ${patientName}: ${medicationInput.value}`);
        closeModal(document.getElementById('new-prescription-modal'));
    });
}

// Module: Search Functionality
function initSearchFunctionality() {
    // Search functionality
    const searchInputs = document.querySelectorAll('input[type="text"]');
    searchInputs.forEach(input => {
        input.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                const searchValue = this.value.trim();
                if (searchValue) {
                    toastr.info(`Searching for: ${searchValue}`);
                    // In a real app, this would filter results
                }
            }
        });
    });

    // Filter dropdown
    const filterSelect = document.querySelector('.filter-options select');
    if (filterSelect) {
        filterSelect.addEventListener('change', function() {
            toastr.info(`Filtering by: ${this.value}`);
            // In a real app, this would filter the table
        });
    }

    // Filter tabs
    const filterTabs = document.querySelectorAll('.filter-tab');
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            filterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            const filter = this.getAttribute('data-filter');
            toastr.info(`Showing ${filter} appointments`);
            // In a real app, this would filter appointments
        });
    });
}

// Module: Settings
function initSettings() {
    // --- Tab switching ---
    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabContents = document.querySelectorAll(".tab-content");

    tabButtons.forEach(button => {
        button.addEventListener("click", () => {
            const targetTab = button.getAttribute("data-tab");

            // Remove 'active' class from all buttons and tab contents
            tabButtons.forEach(btn => btn.classList.remove("active"));
            tabContents.forEach(tab => tab.classList.remove("active"));

            // Activate the clicked button and corresponding tab
            button.classList.add("active");
            document.querySelector(`.tab-content[data-tab="${targetTab}"]`)?.classList.add("active");
        });
    });

    // --- Profile form submission ---
    document.querySelector('.profile-form')?.addEventListener('submit', function(e) {
        e.preventDefault();
        const firstName = document.getElementById('first-name').value;
        const lastName = document.getElementById('last-name').value;
        const specialty = document.getElementById('specialty').value;
        toastr.success("Profile updated successfully");

        const doctorNameElements = document.querySelectorAll('.user-profile .name');
        doctorNameElements.forEach(el => {
            el.textContent = `Dr. ${firstName} ${lastName}`;
        });
    });

    // --- Password form submission ---
    document.querySelector('.password-form')?.addEventListener('submit', function(e) {
        e.preventDefault();
        const currentPassword = document.getElementById('current-password').value;
        const newPassword = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        if (newPassword !== confirmPassword) {
            toastr.error("Passwords do not match");
            return;
        }

        if (newPassword.length < 8) {
            toastr.warning("Password must be at least 8 characters");
            return;
        }

        toastr.success("Password changed successfully");
        e.target.reset();
    });

    // --- Two-factor authentication toggle ---
    const twoFactorToggle = document.querySelector('.two-factor input[type="checkbox"]');
    if (twoFactorToggle) {
        twoFactorToggle.addEventListener('change', function() {
            if (this.checked) {
                toastr.info("Two-factor authentication enabled. You'll need to complete setup.");
            } else {
                toastr.warning("Two-factor authentication disabled");
            }
        });
    }

    // --- Notification toggles ---
    document.querySelectorAll('.notification-options .switch input').forEach(toggle => {
        toggle.addEventListener('change', function() {
            const label = this.closest('.option').querySelector('span').textContent;
            const status = this.checked ? 'enabled' : 'disabled';
            toastr.info(`${label} notifications ${status}`);
        });
    });

    // --- Notification method toggles ---
    document.querySelectorAll('.notification-methods .switch input').forEach(toggle => {
        toggle.addEventListener('change', function() {
            const label = this.closest('.method').querySelector('span').textContent;
            const status = this.checked ? 'enabled' : 'disabled';
            toastr.info(`${label} ${status}`);
        });
    });

    // --- Preferences form ---
    document.querySelector('.preference-settings .primary-btn')?.addEventListener('click', function() {
        const theme = document.getElementById('theme-preference').value;
        const defaultView = document.getElementById('default-view').value;
        const appointmentDuration = document.getElementById('appointment-duration').value;
        toastr.success("Preferences saved successfully");

        if (theme === 'dark') {
            document.documentElement.style.setProperty('--bg-color', '#1a1a1a');
            document.documentElement.style.setProperty('--sidebar-bg', '#2d2d2d');
            document.documentElement.style.setProperty('--card-bg', '#2d2d2d');
            document.documentElement.style.setProperty('--text-color', '#ffffff');
            document.documentElement.style.setProperty('--text-light', '#b3b3b3');
            document.documentElement.style.setProperty('--border-color', '#444');
        } else if (theme === 'light') {
            document.documentElement.style.setProperty('--bg-color', '#f8f9fa');
        
            document.documentElement.style.setProperty('--sidebar-bg', '#ffffff');
            document.documentElement.style.setProperty('--card-bg', '#ffffff');
            document.documentElement.style.setProperty('--text-color', '#202124');
            document.documentElement.style.setProperty('--text-light', '#5f6368');
            document.documentElement.style.setProperty('--border-color', '#dadce0');
        }
    });
}


// Module: Modals
function initModals() {
    // Modal functionality
    const closeModalButtons = document.querySelectorAll('.close-modal');
    closeModalButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target);
        }
    });
}

// Module: Analytics
function initAnalytics() {
    // Timeframe selector
    document.getElementById('analytics-timeframe')?.addEventListener('change', function() {
        if (this.value === 'custom') {
            document.getElementById('custom-range-selector').style.display = 'flex';
        } else {
            document.getElementById('custom-range-selector').style.display = 'none';
            initCharts();
        }
    });
    
    // Apply custom date range
    document.getElementById('apply-analytics-range')?.addEventListener('click', function() {
        const startDate = document.getElementById('analytics-start-date').value;
        const endDate = document.getElementById('analytics-end-date').value;
        
        if (!startDate || !endDate) {
            toastr.warning("Please select both start and end dates");
            return;
        }
        
        initCharts();
    });

    // Initialize charts on page load if analytics is active
    if (document.getElementById('analytics-page')?.classList.contains('active-page')) {
        initCharts();
    }
}

// Calendar Initialization
function initCalendar() {
    const calendarEl = document.getElementById('calendar');
    if (!calendarEl) return;
    
    // Sample appointment data (in a real app, this would come from an API)
    const appointments = [
        {
            id: 'appt1',
            title: 'Sarah Williams - Follow-up',
            start: new Date(new Date().setHours(10, 0, 0, 0)),
            end: new Date(new Date().setHours(10, 30, 0, 0)),
            extendedProps: {
                patientId: '1001',
                type: 'followup',
                notes: 'Follow-up on hypertension medication',
                status: 'confirmed'
            },
            className: 'fc-event-followup'
        },
        {
            id: 'appt2',
            title: 'Michael Brown - Checkup',
            start: new Date(new Date().setDate(new Date().getDate() + 1)).setHours(14, 0, 0, 0),
            end: new Date(new Date().setDate(new Date().getDate() + 1)).setHours(14, 45, 0, 0),
            extendedProps: {
                patientId: '1002',
                type: 'checkup',
                notes: 'Diabetes management checkup',
                status: 'confirmed'
            },
            className: 'fc-event-checkup'
        },
        {
            id: 'appt3',
            title: 'Emily Davis - Consultation',
            start: new Date(new Date().setDate(new Date().getDate() + 2)).setHours(11, 30, 0, 0),
            end: new Date(new Date().setDate(new Date().getDate() + 2)).setHours(12, 15, 0, 0),
            extendedProps: {
                patientId: '1003',
                type: 'consultation',
                notes: 'Asthma symptoms consultation',
                status: 'pending'
            },
            className: 'fc-event-consultation'
        }
    ];

    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        },
        views: {
            timeGridWeek: {
                titleFormat: { year: 'numeric', month: 'short', day: 'numeric' }
            }
        },
        events: appointments,
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        navLinks: true,
        eventDisplay: 'block',
        eventTimeFormat: {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        },
        
        // Event interactions
        eventClick: function(info) {
            showAppointmentDetails(info.event);
        },
        
        dateClick: function(info) {
            openNewAppointmentModal(info.dateStr);
        },
        
        select: function(info) {
            openNewAppointmentModal(info.startStr, info.endStr);
        },
        
        eventDrop: function(info) {
            updateAppointmentTime(info.event);
        },
        
        eventResize: function(info) {
            updateAppointmentTime(info.event);
        }
    });

    calendar.render();
    window.calendar = calendar;
}

// Show appointment details modal
function showAppointmentDetails(event) {
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Appointment Details</h3>
                <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                <div class="appointment-detail">
                    <div class="detail-row">
                        <div class="detail-col">
                            <div class="detail-group">
                                <label>Patient</label>
                                <p>${event.title.split(' - ')[0]}</p>
                            </div>
                            <div class="detail-group">
                                <label>Type</label>
                                <p>${event.extendedProps.type}</p>
                            </div>
                            <div class="detail-group">
                                <label>Status</label>
                                <p class="status-badge ${event.extendedProps.status}">
                                    ${event.extendedProps.status}
                                </p>
                            </div>
                        </div>
                        <div class="detail-col">
                            <div class="detail-group">
                                <label>Date</label>
                                <p>${event.start.toLocaleDateString()}</p>
                            </div>
                            <div class="detail-group">
                                <label>Time</label>
                                <p>${event.start.toLocaleTimeString()} - ${event.end.toLocaleTimeString()}</p>
                            </div>
                        </div>
                    </div>
                    <div class="detail-group">
                        <label>Notes</label>
                        <p>${event.extendedProps.notes || 'No notes available'}</p>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn" id="edit-appointment-btn">Edit</button>
                <button class="btn primary-btn" id="view-patient-btn">View Patient</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal
    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.remove();
    });
    
    // View patient button
    modal.querySelector('#view-patient-btn').addEventListener('click', () => {
        openPatientModal(event.extendedProps.patientId);
        modal.remove();
    });
    
    // Edit appointment button
    modal.querySelector('#edit-appointment-btn').addEventListener('click', () => {
        openEditAppointmentModal(event);
        modal.remove();
    });
    
    // Close when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Open new appointment modal
function openNewAppointmentModal(startDate, endDate) {
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>New Appointment</h3>
                <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                <form id="new-appointment-form">
                    <div class="form-group">
                        <label for="appointment-patient">Patient</label>
                        <select id="appointment-patient">
                            <option>Select Patient</option>
                            <option value="1001">Sarah Williams (#1001)</option>
                            <option value="1002">Michael Brown (#1002)</option>
                            <option value="1003">Emily Davis (#1003)</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="appointment-type">Type</label>
                        <select id="appointment-type">
                            <option value="followup">Follow-up</option>
                            <option value="checkup">Checkup</option>
                            <option value="consultation">Consultation</option>
                            <option value="emergency">Emergency</option>
                        </select>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="appointment-date">Date</label>
                            <input type="date" id="appointment-date" value="${startDate ? startDate.split('T')[0] : ''}">
                        </div>
                        <div class="form-group">
                            <label for="appointment-time">Start Time</label>
                            <input type="time" id="appointment-time" value="${startDate ? startDate.split('T')[1].substring(0, 5) : '09:00'}">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="appointment-duration">Duration</label>
                            <select id="appointment-duration">
                                <option value="15">15 minutes</option>
                                <option value="30" selected>30 minutes</option>
                                <option value="45">45 minutes</option>
                                <option value="60">60 minutes</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="appointment-status">Status</label>
                            <select id="appointment-status">
                                <option value="confirmed">Confirmed</option>
                                <option value="pending">Pending</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="appointment-notes">Notes</label>
                        <textarea id="appointment-notes" placeholder="Appointment notes"></textarea>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn" id="cancel-appointment-btn">Cancel</button>
                <button class="btn primary-btn" id="save-appointment-btn">Save Appointment</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal
    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.remove();
    });
    
    modal.querySelector('#cancel-appointment-btn').addEventListener('click', () => {
        modal.remove();
    });
    
    // Save appointment
    modal.querySelector('#save-appointment-btn').addEventListener('click', () => {
        const patientSelect = modal.querySelector('#appointment-patient');
        const typeSelect = modal.querySelector('#appointment-type');
        const dateInput = modal.querySelector('#appointment-date');
        const timeInput = modal.querySelector('#appointment-time');
        const durationSelect = modal.querySelector('#appointment-duration');
        const statusSelect = modal.querySelector('#appointment-status');
        const notesInput = modal.querySelector('#appointment-notes');
        
        if (patientSelect.value === 'Select Patient') {
            toastr.warning("Please select a patient");
            return;
        }
        
        if (!dateInput.value || !timeInput.value) {
            toastr.warning("Please select date and time");
            return;
        }
        
        const patientName = patientSelect.options[patientSelect.selectedIndex].text.split(' (')[0];
        const startDateTime = new Date(`${dateInput.value}T${timeInput.value}`);
        const endDateTime = new Date(startDateTime.getTime() + parseInt(durationSelect.value) * 60000);
        
        const newEvent = {
            id: `appt-${Date.now()}`,
            title: `${patientName} - ${typeSelect.options[typeSelect.selectedIndex].text}`,
            start: startDateTime,
            end: endDateTime,
            extendedProps: {
                patientId: patientSelect.value,
                type: typeSelect.value,
                notes: notesInput.value,
                status: statusSelect.value
            },
            className: `fc-event-${typeSelect.value}`
        };
        
        window.calendar.addEvent(newEvent);
        toastr.success("Appointment created successfully");
        modal.remove();
    });
    
    // Close when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Update appointment time (for drag/drop and resize)
function updateAppointmentTime(event) {
    toastr.info(`Appointment updated to ${event.start.toLocaleString()}`, "Appointment Rescheduled");
    // In a real app, you would send this to your backend
    console.log('Updated appointment:', {
        id: event.id,
        start: event.start,
        end: event.end
    });
}

// Open patient modal
function openPatientModal(patientId) {
    const modal = document.getElementById('patient-details-modal');
    if (!modal) return;
    
    modal.classList.add('active');
    
    // Show loading state
    const modalBody = modal.querySelector('.modal-body');
    modalBody.innerHTML = `
        <div class="loading-spinner">
            <i class="fas fa-spinner fa-spin"></i>
            <p>Loading patient data...</p>
        </div>
    `;
    
    // Load patient data
    loadPatientData(patientId)
        .then(patient => {
            if (!patient) {
                throw new Error("Patient data not available");
            }
            
            modalBody.innerHTML = `
                <div class="patient-details">
                    <div class="detail-header">
                        <div class="patient-avatar">
                            <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(patient.name)}&background=1a73e8&color=fff" alt="${patient.name}">
                            <h3>${patient.name}</h3>
                            <span class="patient-id">ID: ${patientId}</span>
                        </div>
                    </div>
                    <div class="detail-row">
                        <div class="detail-col">
                            <div class="detail-group">
                                <label>Full Name</label>
                                <p>${patient.name}</p>
                            </div>
                            <div class="detail-group">
                                <label>Date of Birth</label>
                                <p>${patient.dob}</p>
                            </div>
                            <div class="detail-group">
                                <label>Gender</label>
                                <p>${patient.gender}</p>
                            </div>
                        </div>
                        <div class="detail-col">
                            <div class="detail-group">
                                <label>Contact</label>
                                <p>${patient.phone}</p>
                            </div>
                            <div class="detail-group">
                                <label>Email</label>
                                <p>${patient.email}</p>
                            </div>
                        </div>
                    </div>
                    <div class="medical-history">
                        <h4>Medical History</h4>
                        <ul>
                            ${patient.conditions.map(condition => `<li>${condition}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `;
        })
        .catch(error => {
            console.error('Error loading patient:', error);
            modalBody.innerHTML = `
                <div class="error-state">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p>Failed to load patient data</p>
                    <button class="btn primary-btn" onclick="openPatientModal('${patientId}')">
                        Retry
                    </button>
                </div>
            `;
        });
}

function openPrescriptionModal() {
    const modal = document.getElementById('new-prescription-modal');
    modal.classList.add('active');
    
    // Set default dates
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('prescription-start').value = today;
    
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1);
    document.getElementById('prescription-end').value = endDate.toISOString().split('T')[0];
}

function closeModal(modal) {
    modal.classList.remove('active');
}

function openConversation(conversationId) {
    // In a real app, we would fetch conversation data here
    console.log(`Opening conversation ${conversationId}`);
    
    // Update conversation header
    const conversation = document.querySelector(`.conversation[data-conversation-id="${conversationId}"]`);
    if (conversation) {
        const patientName = conversation.querySelector('h4').textContent;
        const messageHeader = document.querySelector('.message-header .patient-info h4');
        if (messageHeader) {
            messageHeader.textContent = patientName;
        }
    }
}

// Initialize charts
function initCharts() {
    try {
        // Show loading state
        const analyticsSection = document.getElementById('analytics-page');
        if (analyticsSection) {
            analyticsSection.classList.add('loading-charts');
        }

        // Get timeframe
        const timeframe = document.getElementById('analytics-timeframe')?.value || '30';
        let startDate, endDate;
        
        if (timeframe === 'custom') {
            startDate = document.getElementById('analytics-start-date')?.value;
            endDate = document.getElementById('analytics-end-date')?.value;
            if (!startDate || !endDate) {
                throw new Error('Custom date range not specified');
            }
        }

        // Fetch analytics data
        fetchAnalyticsData(timeframe, startDate, endDate)
            .then(data => {
                renderCharts(data);
                if (analyticsSection) {
                    analyticsSection.classList.remove('loading-charts');
                }
            })
            .catch(error => {
                console.error('Error loading analytics:', error);
                toastr.error('Failed to load analytics data');
                if (analyticsSection) {
                    analyticsSection.classList.remove('loading-charts');
                    analyticsSection.innerHTML = `
                        <div class="analytics-error">
                            <i class="fas fa-chart-line"></i>
                            <h3>Analytics Unavailable</h3>
                            <p>We couldn't load the analytics data at this time.</p>
                            <button class="btn primary" onclick="initCharts()">
                                <i class="fas fa-sync-alt"></i> Try Again
                            </button>
                        </div>
                    `;
                }
            });
    } catch (error) {
        console.error('Chart initialization error:', error);
        toastr.error('Failed to initialize charts');
    }
}

function renderCharts(data) {
    // Destroy existing charts if they exist
    if (window.appointmentsChart) window.appointmentsChart.destroy();
    if (window.demographicsChart) window.demographicsChart.destroy();
    if (window.prescriptionsChart) window.prescriptionsChart.destroy();

    // Appointments chart (line chart)
    const appointmentsCtx = document.getElementById('appointments-chart')?.getContext('2d');
    if (appointmentsCtx) {
        window.appointmentsChart = new Chart(appointmentsCtx, {
            type: 'line',
            data: {
                labels: data.appointments.labels,
                datasets: [{
                    label: 'Appointments',
                    data: data.appointments.data,
                    borderColor: '#1a73e8',
                    backgroundColor: 'rgba(26, 115, 232, 0.1)',
                    tension: 0.3,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
    
    // Demographics chart (doughnut chart)
    const demographicsCtx = document.getElementById('demographics-chart')?.getContext('2d');
    if (demographicsCtx) {
        window.demographicsChart = new Chart(demographicsCtx, {
            type: 'doughnut',
            data: {
                labels: data.demographics.labels,
                datasets: [{
                    data: data.demographics.data,
                    backgroundColor: [
                        '#1a73e8',
                        '#34a853',
                        '#f9ab00',
                        '#e94235'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right'
                    }
                }
            }
        });
    }
    
    // Prescriptions chart (bar chart)
    const prescriptionsCtx = document.getElementById('prescriptions-chart')?.getContext('2d');
    if (prescriptionsCtx) {
        window.prescriptionsChart = new Chart(prescriptionsCtx, {
            type: 'bar',
            data: {
                labels: data.prescriptions.labels,
                datasets: [{
                    label: 'Prescriptions',
                    data: data.prescriptions.data,
                    backgroundColor: '#1a73e8'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
}

// Utility Functions
function navigateToPage(page) {
    const navItem = document.querySelector(`nav ul li[data-page="${page}"]`);
    if (navItem) navItem.click();
}

function trackAction(category, action) {
    console.log(`Tracking: ${category} - ${action}`);
    // In a real app, this would send to analytics
}

function trackNavigation(page) {
    console.log(`Navigated to: ${page}`);
    // In a real app, this would track page navigation
}

function checkSession() {
    // In a real app, this would verify the user session
    console.log('Checking session validity');
}

// Mock API functions with enhanced error handling
async function fetchNotifications() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([
                { id: 1, message: "Patient Sarah Williams has completed her health survey", time: "10 mins ago" },
                { id: 2, message: "New lab results available for Michael Brown", time: "25 mins ago" },
                { id: 3, message: "Appointment reminder: Emily Davis at 2:30 PM", time: "1 hour ago" }
            ]);
        }, 500);
    });
}

async function fetchAnalyticsData(timeframe, startDate, endDate) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                appointments: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    data: [12, 19, 15, 22, 18, 25]
                },
                demographics: {
                    labels: ['18-30', '31-45', '46-60', '61+'],
                    data: [25, 35, 25, 15]
                },
                prescriptions: {
                    labels: ['Lisinopril', 'Metformin', 'Atorvastatin', 'Amlodipine', 'Albuterol'],
                    data: [24, 18, 12, 8, 6]
                }
            });
        }, 800);
    });
}

async function loadPatientData(patientId) {
    // This would fetch patient data from an API
    console.log(`Loading data for patient ID: ${patientId}`);
    
    // Mock data based on patient ID
    const mockPatients = {
        '1001': {
            name: 'Sarah Williams',
            dob: 'June 15, 1980',
            gender: 'Female',
            bloodType: 'A+',
            phone: '(555) 123-4567',
            email: 'sarah.williams@example.com',
            address: '123 Main St, Anytown, USA',
            insurance: 'Blue Cross Blue Shield',
            conditions: ['Hypertension', 'High Cholesterol', 'Migraines']
        },
        '1002': {
            name: 'Michael Brown',
            dob: 'March 22, 1965',
            gender: 'Male',
            bloodType: 'O-',
            phone: '(555) 987-6543',
            email: 'michael.brown@example.com',
            address: '456 Oak Ave, Somewhere, USA',
            insurance: 'Medicare',
            conditions: ['Type 2 Diabetes', 'Coronary Artery Disease', 'Hypertension']
        },
        '1003': {
            name: 'Emily Davis',
            dob: 'November 5, 1988',
            gender: 'Female',
            bloodType: 'B+',
            phone: '(555) 555-1212',
            email: 'emily.davis@example.com',
            address: '789 Pine Rd, Nowhere, USA',
            insurance: 'Aetna',
            conditions: ['Asthma', 'Seasonal Allergies']
        }
    };
    
    return Promise.resolve(mockPatients[patientId] || mockPatients['1001']);
}

async function createNewPrescription(patientId, medication) {
    // This would send prescription data to the server
    console.log(`Creating prescription for ${patientId}:`, medication);
    return Promise.resolve({ success: true });
}

async function sendMessage(patientId, message) {
    // This would send a message to the patient
    console.log(`Sending message to ${patientId}:`, message);
    return Promise.resolve({ success: true });
}



document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const doctorName = params.get('doctor') || 'Doctor\'s Name';
    const specialty = params.get('specialty') || 'General Physician';
    const photo = params.get('photo') || 'images/doctors/default.jpg';
  
    document.getElementById('doctorName').textContent = doctorName;
    document.getElementById('doctorSpecialty').textContent = specialty;
    document.getElementById('doctorPhoto').src = photo;
  });
  
  function sendMessage() {
    const input = document.getElementById('messageInput');
    const messageText = input.value.trim();
    if (messageText) {
      const chatBox = document.getElementById('chatBox');
      const message = document.createElement('div');
      message.className = 'message sent';
      message.textContent = messageText;
      chatBox.appendChild(message);
      input.value = '';
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  }
  function openChat(name, specialty, photo) {
    document.getElementById('doctorName').textContent = name;
    document.getElementById('doctorSpecialty').textContent = specialty;
    document.getElementById('doctorPhoto').src = photo;
  
    const chatBox = document.getElementById('chatBox');
    chatBox.innerHTML = ''; // Clear previous messages
  
    // Load new placeholder messages or real ones if available
    chatBox.innerHTML = `
      <div class="message received">Hi, this is ${name}. How can I help you?</div>
    `;
  }




  //logout 
document.addEventListener('DOMContentLoaded', function() {
    const logoutLinks = document.querySelectorAll('a[href="logout.html"]');
    
    logoutLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const confirmed = confirm('Do you really want to logout?');
            if (confirmed) {
                window.location.href = 'login.html';
            }
        });
    });
});
    



function startPatientChat(name, condition, photoUrl) {
    const url = `doc_messages.html?patient=${encodeURIComponent(name)}&condition=${encodeURIComponent(condition)}&photo=${encodeURIComponent(photoUrl)}`;
    window.location.href = url;
  }
  

  
  document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const patient = params.get("patient");
    const condition = params.get("condition");
    const photo = params.get("photo");
  
    if (patient) document.getElementById("doctorName").textContent = patient;
    if (condition) document.getElementById("doctorSpecialty").textContent = condition;
    if (photo) document.getElementById("doctorPhoto").src = photo;
  
    // Optional: Preload first message if coming via query
    if (patient && condition) {
      document.getElementById("chatBox").innerHTML = `
        <div class="message received">Hi ${patient.split(" ")[0]}, how can I help you with your ${condition} today?</div>
      `;
    }
  });
  
  


  function openChat(name, condition, photoUrl) {
    document.getElementById('doctorName').textContent = name;
    document.getElementById('doctorSpecialty').textContent = condition;
    document.getElementById('doctorPhoto').src = photoUrl;
  
    const chatBox = document.getElementById('chatBox');
    chatBox.innerHTML = `
      <div class="message received">Hi ${name.split(' ')[0]}, how can I help you regarding your ${condition} today?</div>
    `;
  }
  
  function sendMessage() {
    const input = document.getElementById('messageInput');
    const message = input.value.trim();
    if (message) {
      const chatBox = document.getElementById('chatBox');
      const newMsg = document.createElement('div');
      newMsg.className = 'message sent';
      newMsg.textContent = message;
      chatBox.appendChild(newMsg);
      input.value = '';
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  }
  