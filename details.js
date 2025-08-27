document.addEventListener('DOMContentLoaded', function() {
    const detailsForm = document.getElementById('DetailsForm');
    const successMessage = document.getElementById('successMessage');
    const userTypeSelect = document.getElementById('DocPatient');
    const doctorFields = document.getElementById('doctorFields');

    // Set background slideshow
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    setInterval(nextSlide, 5000);

    // Show doctor fields based on user type
    userTypeSelect.addEventListener('change', function() {
        if (this.value === 'doctor') {
            doctorFields.style.display = 'block';
        } else {
            doctorFields.style.display = 'none';
        }
    });

    // Form submission handling
    detailsForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Check if any users exist in local storage
        const userType = userTypeSelect.value;
        if (userType === 'doctor') {
            const specialty = document.getElementById('Specialty').value;
            const license = document.getElementById('MedicalLicense').value;

            if (!specialty || !license) {
                alert('Please fill in both Specialty and Medical License Number for doctors.');
                return; // Don't proceed if required fields are empty
            }
        }

        const users = JSON.parse(localStorage.getItem('medicareUsers')) || [];
        if (users.length === 0) {
            window.location.href = 'signup.html'; // Redirect if no users found
            return;
        }

        const currentUser = users[users.length - 1]; // Get last user

        // Populate user details from the form
        currentUser.fullName = document.getElementById('DetailsName').value;
        currentUser.age = document.getElementById('DetailsAge').value;
        currentUser.dob = document.getElementById('detailsDOB').value;
        currentUser.gender = document.getElementById('Gender').value;
        currentUser.bloodType = document.getElementById('BloodType').value;
        currentUser.userType = document.getElementById('DocPatient').value;

        // Only assign specialty and license if the user is a doctor
        if (userType === 'doctor') {
            currentUser.Specialty = document.getElementById('Specialty').value;
            currentUser.License = document.getElementById('MedicalLicense').value;
        } else {
            currentUser.Specialty = null; // Clear Specialty for patients
            currentUser.License = null;   // Clear License for patients
        }

        // Store updated user information in local storage
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        users[users.length - 1] = currentUser; // Update user array
        localStorage.setItem('medicareUsers', JSON.stringify(users));

        // Show loading state
        const submitBtn = document.querySelector('.btn-signup');
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving Details...';
        submitBtn.disabled = true;

        // Show success message
        successMessage.style.display = 'block';

        // Change button state
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Details Saved!';

        // Redirect to login page after a delay
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1500);
    });

    // Handle DOB input formatting
    const dobInput = document.getElementById('detailsDOB');
    dobInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 2) {
            value = value.substring(0, 2) + '-' + value.substring(2);
        }
        if (value.length > 5) {
            value = value.substring(0, 5) + '-' + value.substring(5, 9);
        }
        e.target.value = value;
    });

    // Pre-fill the form if user data exists
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.fullName) {
        document.getElementById('DetailsName').value = currentUser.fullName || '';
    }
});