function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    const arrow = document.getElementById("sidebar-arrow");
    sidebar.classList.toggle("collapsed");
    arrow.classList.toggle("fa-chevron-left");
    arrow.classList.toggle("fa-chevron-right");
  }
  

  

// appointment page
let chatHistory = {};


// Function to open the popup
function openAppointmentPopup(doctorName, doctorImage, qualification) {
    document.getElementById("doctorName").innerText = doctorName;
    document.getElementById("appointmentPopup").style.display = "block";
    
    // Load previous messages
    loadChatHistory(doctorName);
}

// Function to close the popup
function closeAppointmentPopup() {
    document.getElementById("appointmentPopup").style.display = "none";
}

// Function to toggle between Book and Chat sections
function showTab(tab) {
    document.getElementById("bookTab").classList.remove("active");
    document.getElementById("chatTab").classList.remove("active");

    document.getElementById("bookSection").style.display = "none";
    document.getElementById("chatSection").style.display = "none";

    if (tab === "book") {
        document.getElementById("bookTab").classList.add("active");
        document.getElementById("bookSection").style.display = "block";
    } else {
        document.getElementById("chatTab").classList.add("active");
        document.getElementById("chatSection").style.display = "block";
    }
}

// Function to send a chat message
function sendMessage() {
    let doctorName = document.getElementById("doctorName").innerText;
    let message = document.getElementById("chat-box").value;
    
    if (!message.trim()) return;

    // Save to chat history
    if (!chatHistory[doctorName]) {
        chatHistory[doctorName] = [];
    }
    chatHistory[doctorName].push({ sender: "You", message });

    // Update chat window
    loadChatHistory(doctorName);

    // Clear input
    document.getElementById("chat-box").value = "";
}

// Function to load chat history
function loadChatHistory(doctorName) {
    let chatWindow = document.getElementById("chatWindow");
    chatWindow.innerHTML = "";

    if (chatHistory[doctorName]) {
        chatHistory[doctorName].forEach(chat => {
            let messageDiv = document.createElement("div");
            messageDiv.textContent = chat.sender + ": " + chat.message;
            chatWindow.appendChild(messageDiv);
        });
    }
}
// Function to filter doctors
  function filterDoctors() {
    const input = document.getElementById("doctorSearch").value.toLowerCase();
    const cards = document.querySelectorAll("#exploreDoctorGrid .doctor-card");

    cards.forEach(card => {
      const text = card.innerText.toLowerCase();
      card.style.display = text.includes(input) ? "block" : "none";
    });
  }
// visibility of the new doctor panels
  let visibleCount = 6;

  function loadMoreDoctors() {
    const allCards = document.querySelectorAll('.doctor-card');
    for (let i = visibleCount; i < visibleCount + 6; i++) {
      if (allCards[i]) allCards[i].style.display = 'block';
    }
    visibleCount += 6;
    if (visibleCount >= allCards.length) {
      document.getElementById('loadMoreBtn').style.display = 'none';
    }
  }
//   scroll bookmark
  function scrollToExploreDoctors(event) {
    event.preventDefault();
    const exploreSection = document.querySelector('.explore-doctors-section');
    if (exploreSection) {
      exploreSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
  
  




//home page - health metrics 
// Update progress bar and display value
function updateProgressBar(metricId, percentage) {
    percentage = Math.max(0, Math.min(100, percentage));
    const progressBar = document.getElementById(metricId);
    const valueDisplay = progressBar.parentElement.querySelector('.metric-value');    
    if (progressBar) {
        progressBar.style.width = `${percentage}%`;
        if (valueDisplay) valueDisplay.textContent = `${Math.round(percentage)}%`;        
        // Use the same gradient but adjust angle based on value
        const angle = 90 + (percentage * 0.9);
        progressBar.style.background = `linear-gradient(${angle}deg, #2c3e50, #1abc9c)`;
    }
}

// Handle click on progress bar
function handleProgressClick(event, metricId) {
    const progressBar = event.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickPosition = event.clientX - rect.left;
    const percentage = (clickPosition / rect.width) * 100;
    updateProgressBar(metricId, percentage);
}

// Make progress bars draggable
function setupDraggableProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    progressBars.forEach(bar => {
        let isDragging = false;
        const metricId = bar.querySelector('.progress-fill').id;
        
        bar.addEventListener('mousedown', (e) => {
            isDragging = true;
            handleProgressClick(e, metricId);
        });
        
        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                const rect = bar.getBoundingClientRect();
                const clickPosition = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
                const percentage = (clickPosition / rect.width) * 100;
                updateProgressBar(metricId, percentage);
            }
        });
        
        document.addEventListener('mouseup', () => {
            isDragging = false;
        });
    });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    setupDraggableProgressBars();

    updateProgressBar('blood-pressure', 0);
    updateProgressBar('metabolism', 0);
    updateProgressBar('stress-level', 0);
    updateProgressBar('sleep', 0);
});



//help & support page
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.closest('.faq-item');
        const icon = question.querySelector('.toggle-icon');
        
        faqItem.classList.toggle('active');
        icon.textContent = faqItem.classList.contains('active') ? '−' : '+';
    });
});







// billing page

  
  function showPaymentForm(id, amount) {
    document.getElementById('payment-popup').style.display = 'flex';
    document.getElementById('selected-amount').innerText = amount;
    document.getElementById('form-title').innerText = `Pay Bill #${id}`;
  }
  
  function closePopup() {
    document.getElementById('payment-popup').style.display = 'none';
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
  





// for appointment popup
      function openAppointmentPopup(doctorName) {
        document.getElementById('appointmentPopup').style.display = 'block';
        document.getElementById('doctorName').textContent = doctorName;
      }
      
      function closeAppointmentPopup() {
        document.getElementById('appointmentPopup').style.display = 'none';
      }
      
      function confirmAppointment() {
        const date = document.getElementById('appointment-date').value;
        const time = document.getElementById('appointment-time').value;
        const payment = document.getElementById('payment-method').value;
        const doctor = document.getElementById('doctorName').textContent;
      
        if (!date || !time) {
          alert("Please fill in both date and time.");
          return;
        }
      
        alert(`Appointment confirmed with ${doctor} on ${date} at ${time} via ${payment.toUpperCase()}`);
        closeAppointmentPopup();
      }
      

      function startChat(name, specialty) {
        const doctorData = {
          name: name,
          specialty: specialty
        };
        localStorage.setItem('selectedDoctor', JSON.stringify(doctorData));
        window.location.href = 'messages.html';
      }

      document.addEventListener('DOMContentLoaded', () => {
        const doctorData = JSON.parse(localStorage.getItem('selectedDoctor'));
        if (doctorData) {
          document.getElementById('doctorName').textContent = doctorData.name;
          document.getElementById('doctorSpecialty').textContent = doctorData.specialty;
          // Load messages related to the doctor here
        } else {
          // Handle the case where no doctor is selected
          alert('No doctor selected.');
        }
      });

      
      

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
      function startChat(doctorName, specialization) {
        const nameEncoded = encodeURIComponent(doctorName);
        const specEncoded = encodeURIComponent(specialization);
        window.location.href = `messages.html?doctor=${nameEncoded}&specialization=${specEncoded}`;
      }
 
      

      function getQueryParams() {
        const params = new URLSearchParams(window.location.search);
        return {
          doctor: params.get('doctor'),
          specialization: params.get('specialization')
        };
      }
      
      document.addEventListener("DOMContentLoaded", () => {
        const { doctor, specialization } = getQueryParams();
        if (doctor) {
          document.getElementById("chatDoctorName").textContent = doctor;
        }
        if (specialization) {
          document.getElementById("chatDoctorSpecialization").textContent = specialization;
        }
      });
      



      //home page 
document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const welcomeElement = document.querySelector('.content h1');
    const patientInfoElement = document.querySelector('.patient-info p');
    const profileDetails = document.querySelector('.profile-details');
    const profileImage = document.querySelector('.patient-photo');

    if (currentUser) {
        // Update welcome message
        if (currentUser.fullName) {
            welcomeElement.innerText = `Welcome ${currentUser.fullName}!`;
        } else {
            welcomeElement.innerText = `Welcome back!`;
        }

        // Update patient info in top bar
        let patientInfoText = currentUser.fullName || 'New User';
        if (currentUser.gender) {
            patientInfoText += ` | ${capitalizeFirstLetter(currentUser.gender)}`;
        }
        if (currentUser.bloodType) {
            patientInfoText += ` | ${currentUser.bloodType}`;
        }
        patientInfoElement.innerText = patientInfoText;

        // Update profile image if available (for Google users)
        if (currentUser.profileImage) {
            profileImage.src = currentUser.profileImage;
        }

        // Update profile details card
        if (profileDetails) {
            const values = profileDetails.querySelectorAll('.value');
            
            // Personal name
            if (values[0] && currentUser.fullName) {
                values[0].innerText = currentUser.fullName;
            }
            
            // Age/gender
            if (values[1]) {
                let ageGenderText = '';
                if (currentUser.age) ageGenderText += currentUser.age;
                if (currentUser.gender) ageGenderText += ` / ${capitalizeFirstLetter(currentUser.gender)}`;
                values[1].innerText = ageGenderText || '[Add age/gender]';
            }
            
            // Blood group
            if (values[4] && currentUser.bloodType) {
                values[4].innerText = currentUser.bloodType;
            }
        }
    } else {
        welcomeElement.innerText = `Welcome back!`;
        patientInfoElement.innerText = `New User`;
    }
});

function capitalizeFirstLetter(string) {
    return string ? string.charAt(0).toUpperCase() + string.slice(1) : '';
}


// health metrics 
// Update progress bar and display value
function updateProgressBar(metricId, percentage) {
    percentage = Math.max(0, Math.min(100, percentage));
    const progressBar = document.getElementById(metricId);
    const valueDisplay = progressBar.parentElement.querySelector('.metric-value');    
    if (progressBar) {
        progressBar.style.width = `${percentage}%`;
        if (valueDisplay) valueDisplay.textContent = `${Math.round(percentage)}%`;        
        // Use the same gradient but adjust angle based on value
        const angle = 90 + (percentage * 0.9);
        progressBar.style.background = `linear-gradient(${angle}deg, #2c3e50, #1abc9c)`;
    }
}

// Handle click on progress bar
function handleProgressClick(event, metricId) {
    const progressBar = event.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickPosition = event.clientX - rect.left;
    const percentage = (clickPosition / rect.width) * 100;
    updateProgressBar(metricId, percentage);
}

// Make progress bars draggable
function setupDraggableProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    progressBars.forEach(bar => {
        let isDragging = false;
        const metricId = bar.querySelector('.progress-fill').id;
        
        bar.addEventListener('mousedown', (e) => {
            isDragging = true;
            handleProgressClick(e, metricId);
        });
        
        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                const rect = bar.getBoundingClientRect();
                const clickPosition = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
                const percentage = (clickPosition / rect.width) * 100;
                updateProgressBar(metricId, percentage);
            }
        });
        
        document.addEventListener('mouseup', () => {
            isDragging = false;
        });
    });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    setupDraggableProgressBars();

    updateProgressBar('blood-pressure', 0);
    updateProgressBar('metabolism', 0);
    updateProgressBar('stress-level', 0);
    updateProgressBar('sleep', 0);
});

// new part...
document.addEventListener('DOMContentLoaded', function() {
    // Initialize metrics for each trial
    const metrics = JSON.parse(localStorage.getItem('healthMetrics')) || {
        trial1: { 
            bloodPressure: 0,
            metabolism: 0,
            stressLevel: 0,
            sleep: 0
        },
        trial2: { 
            bloodPressure: 0,
            metabolism: 0,
            stressLevel: 0,
            sleep: 0
        },
        trial3: { 
            bloodPressure: 0,
            metabolism: 0,
            stressLevel: 0,
            sleep: 0
        }
    };

    let activeTrial = 'trial1';

    // Initialize progress bars with saved values
    function initProgressBars() {
        updateProgressBars();
        updateMetricValueTexts();
        
        // Add click handlers to each progress bar
        document.querySelectorAll('.progress-bar').forEach(bar => {
            bar.addEventListener('click', function(e) {
                const rect = this.getBoundingClientRect();
                const pos = (e.clientX - rect.left) / rect.width;
                const percentage = Math.min(100, Math.max(0, Math.round(pos * 100)));
                
                // Get which metric this bar represents
                const metricType = this.closest('.metric').dataset.metric;
                
                // Update only the current metric for active trial
                metrics[activeTrial][metricType] = percentage;
                
                updateProgressBars();
                updateMetricValueTexts();
            });
        });
    }

    // Update all progress bars based on current trial
    function updateProgressBars() {
        document.querySelectorAll('.metric').forEach(metricEl => {
            const metricType = metricEl.dataset.metric;
            const fill = metricEl.querySelector('.progress-fill');
            fill.style.width = `${metrics[activeTrial][metricType]}%`;
        });
    }

    // Update all metric value texts
    function updateMetricValueTexts() {
        document.querySelectorAll('.metric').forEach(metricEl => {
            const metricType = metricEl.dataset.metric;
            const valueText = metricEl.querySelector('.metric-value');
            valueText.textContent = `${metrics[activeTrial][metricType]}%`;
        });
    }

    // Trial button handlers
    document.querySelectorAll('.trial-btn').forEach((btn, index) => {
        const trialKey = `trial${index + 1}`;
        
        btn.addEventListener('click', function() {
            activeTrial = trialKey;
            document.querySelectorAll('.trial-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            updateProgressBars();
            updateMetricValueTexts();
        });
    });

    // Save button
    document.querySelector('.trial-save-btn')?.addEventListener('click', function() {
        localStorage.setItem('healthMetrics', JSON.stringify(metrics));
        alert('Progress saved for all trials!');
    });

    // Reset button
    document.querySelector('.trial-reset-btn')?.addEventListener('click', function() {
        if (confirm('Reset ALL metrics for ALL trials to zero?')) {
            // Reset all metrics for all trials
            ['trial1', 'trial2', 'trial3'].forEach(trial => {
                Object.keys(metrics[trial]).forEach(metric => {
                    metrics[trial][metric] = 0;
                });
            });
            
            // Clear storage and update UI
            localStorage.removeItem('healthMetrics');
            updateUI();
        }
    });

    // Initialize on load
    document.querySelector('.trial-btn')?.classList.add('active');
    initProgressBars();
});


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