// Enhanced Signup Functionality
document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signupForm');
    const emailInput = document.getElementById('signupEmail');
    const phoneInput = document.getElementById('signupPhone');
    const passwordInput = document.getElementById('signupPassword');
    const confirmPasswordInput = document.getElementById('signupConfirmPassword');
    const phoneSignInInput = document.getElementById('phoneSignIn');
    const requestOtpBtn = document.querySelector('.btn-request-otp');
    const agreeTermsCheckbox = document.getElementById('agreeTerms');
    const successMessage = document.getElementById('successMessage');
    const googleBtn = document.querySelector('.google-btn');

    // Hide success message initially
    successMessage.style.display = 'none';

    // Real-time validation
    emailInput.addEventListener('input', function() {
        validateEmail(this.value);
    });

    phoneInput.addEventListener('input', function() {
        validatePhone(this.value);
    });

    passwordInput.addEventListener('input', function() {
        validatePassword(this.value);
    });

    confirmPasswordInput.addEventListener('input', function() {
        validateConfirmPassword(this.value);
    });

    // Form submission
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            performSignup();
        }
    });

    // Google Sign-up
    googleBtn.addEventListener('click', function() {
        initiateGoogleSignup();
    });

    // Request OTP
    requestOtpBtn.addEventListener('click', function() {
        requestOTP();
    });

    // Email validation
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFieldError(emailInput, 'Please enter a valid email address');
            return false;
        }
        clearFieldError(emailInput);
        return true;
    }

    // Phone validation
    function validatePhone(phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
            showFieldError(phoneInput, 'Please enter a valid phone number');
            return false;
        }
        clearFieldError(phoneInput);
        return true;
    }

    // Password validation
    function validatePassword(password) {
        if (password.length < 6) {
            showFieldError(passwordInput, 'Password must be at least 6 characters');
            return false;
        }
        if (!/(?=.*[a-z])/.test(password)) {
            showFieldError(passwordInput, 'Password must contain at least one lowercase letter');
            return false;
        }
        if (!/(?=.*[A-Z])/.test(password)) {
            showFieldError(passwordInput, 'Password must contain at least one uppercase letter');
            return false;
        }
        if (!/(?=.*\d)/.test(password)) {
            showFieldError(passwordInput, 'Password must contain at least one number');
            return false;
        }
        clearFieldError(passwordInput);
        return true;
    }

    // Confirm password validation
    function validateConfirmPassword(confirmPassword) {
        if (confirmPassword !== passwordInput.value) {
            showFieldError(confirmPasswordInput, 'Passwords do not match');
            return false;
        }
        clearFieldError(confirmPasswordInput);
        return true;
    }

    // Form validation
    function validateForm() {
        const isEmailValid = validateEmail(emailInput.value);
        const isPhoneValid = validatePhone(phoneInput.value);
        const isPasswordValid = validatePassword(passwordInput.value);
        const isConfirmPasswordValid = validateConfirmPassword(confirmPasswordInput.value);
        const isTermsAgreed = agreeTermsCheckbox.checked;
        
        if (!isTermsAgreed) {
            showFormError('Please agree to the Terms of Service and Privacy Policy');
            return false;
        }
        
        return isEmailValid && isPhoneValid && isPasswordValid && isConfirmPasswordValid;
    }

    // Show field error
    function showFieldError(input, message) {
        input.style.borderColor = '#e74c3c';
        input.style.boxShadow = '0 0 0 2px rgba(231, 76, 60, 0.2)';
        
        // Create or update error message
        let errorDiv = input.parentNode.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.textContent = message;
            errorDiv.style.display = 'block';
        }
    }

    // Clear field error
    function clearFieldError(input) {
        input.style.borderColor = '#ddd';
        input.style.boxShadow = 'none';
        
        const errorDiv = input.parentNode.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.style.display = 'none';
        }
    }

    // Show form error
    function showFormError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-error';
        errorDiv.textContent = message;
        errorDiv.style.background = '#e74c3c';
        errorDiv.style.color = 'white';
        errorDiv.style.padding = '10px';
        errorDiv.style.borderRadius = '5px';
        errorDiv.style.marginBottom = '20px';
        errorDiv.style.textAlign = 'center';
        
        // Insert before the form
        signupForm.parentNode.insertBefore(errorDiv, signupForm);
        
        // Remove after 5 seconds
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }

    // Perform signup
    async function performSignup() {
        const submitBtn = document.querySelector('.btn-continue');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.textContent = 'Creating Account...';
        submitBtn.disabled = true;
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Save user data to localStorage (demo)
            const userData = {
                email: emailInput.value,
                phone: phoneInput.value,
                password: passwordInput.value,
                fullName: '',
                age: '',
                dob: '',
                gender: '',
                bloodType: '',
                userType: 'patient'
            };
            
            const existingUsers = JSON.parse(localStorage.getItem('medicareUsers')) || [];
            existingUsers.push(userData);
            localStorage.setItem('medicareUsers', JSON.stringify(existingUsers));
            
            // Show success message
            showSuccessMessage('Account created successfully! Redirecting to complete your profile...');
            
            // Redirect to details page
            setTimeout(() => {
                window.location.href = 'details.html';
            }, 2000);
            
        } catch (error) {
            showFormError('An error occurred. Please try again.');
        } finally {
            // Reset button state
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }

    // Request OTP
    function requestOTP() {
        const phone = phoneSignInInput.value;
        
        if (!phone) {
            showFieldError(phoneSignInInput, 'Please enter your phone number');
            return;
        }
        
        if (!validatePhone(phone)) {
            return;
        }
        
        const originalText = requestOtpBtn.textContent;
        requestOtpBtn.textContent = 'Sending OTP...';
        requestOtpBtn.disabled = true;
        
        // Simulate OTP sending
        setTimeout(() => {
            // Generate random OTP
            const otp = Math.floor(100000 + Math.random() * 900000);
            
            // Show OTP input field
            showOTPInput(otp);
            
            requestOtpBtn.textContent = 'Resend OTP';
            requestOtpBtn.disabled = false;
        }, 2000);
    }

    // Show OTP input
    function showOTPInput(otp) {
        // Create OTP input section
        const otpSection = document.createElement('div');
        otpSection.className = 'otp-section';
        otpSection.innerHTML = `
            <div class="input-group">
                <i class="fas fa-key"></i>
                <input type="text" id="otpInput" placeholder="Enter 6-digit OTP" maxlength="6">
                <div class="error-message" id="otpError">Invalid OTP</div>
            </div>
            <button type="button" class="btn-verify-otp">Verify OTP</button>
            <p class="otp-info">OTP sent to ${phoneSignInInput.value} (Demo: ${otp})</p>
        `;
        
        // Insert after phone input
        phoneSignInInput.parentNode.parentNode.appendChild(otpSection);
        
        // Add OTP verification
        const verifyBtn = otpSection.querySelector('.btn-verify-otp');
        const otpInput = otpSection.querySelector('#otpInput');
        
        verifyBtn.addEventListener('click', function() {
            verifyOTP(otpInput.value, otp);
        });
        
        // Auto-focus OTP input
        otpInput.focus();
    }

    // Verify OTP
    function verifyOTP(inputOTP, actualOTP) {
        if (inputOTP === actualOTP.toString()) {
            showSuccessMessage('Phone verification successful!');
            // Enable form submission or proceed with phone sign-in
        } else {
            showFieldError(document.getElementById('otpInput'), 'Invalid OTP. Please try again.');
        }
    }

    // Show success message
    function showSuccessMessage(message) {
        successMessage.textContent = message;
        successMessage.style.display = 'block';
        successMessage.style.background = '#27ae60';
        successMessage.style.color = 'white';
    }

    // Google Sign-up
    function initiateGoogleSignup() {
        const googleBtn = document.querySelector('.google-btn');
        const originalText = googleBtn.textContent;
        
        googleBtn.textContent = 'Signing up...';
        googleBtn.disabled = true;
        
        setTimeout(() => {
            showSuccessMessage('Google sign-up successful! Redirecting to complete your profile...');
            setTimeout(() => {
                window.location.href = 'details.html';
            }, 2000);
        }, 2000);
    }

    // Add input focus effects
    const inputs = document.querySelectorAll('.input-group input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentNode.style.transform = 'scale(1.02)';
            this.parentNode.style.transition = 'transform 0.2s ease';
        });
        
        input.addEventListener('blur', function() {
            this.parentNode.style.transform = 'scale(1)';
        });
    });

    // Password strength indicator
    passwordInput.addEventListener('input', function() {
        const strength = calculatePasswordStrength(this.value);
        updatePasswordStrengthIndicator(strength);
    });

    // Calculate password strength
    function calculatePasswordStrength(password) {
        let score = 0;
        
        if (password.length >= 6) score++;
        if (password.length >= 8) score++;
        if (/(?=.*[a-z])/.test(password)) score++;
        if (/(?=.*[A-Z])/.test(password)) score++;
        if (/(?=.*\d)/.test(password)) score++;
        if (/(?=.*[!@#$%^&*])/.test(password)) score++;
        
        if (score <= 2) return 'weak';
        if (score <= 4) return 'medium';
        return 'strong';
    }

    // Update password strength indicator
    function updatePasswordStrengthIndicator(strength) {
        let indicator = passwordInput.parentNode.querySelector('.password-strength');
        
        if (!indicator) {
            indicator = document.createElement('div');
            indicator.className = 'password-strength';
            indicator.style.marginTop = '5px';
            indicator.style.fontSize = '0.8rem';
            passwordInput.parentNode.appendChild(indicator);
        }
        
        const colors = {
            weak: '#e74c3c',
            medium: '#f39c12',
            strong: '#27ae60'
        };
        
        const messages = {
            weak: 'Weak password',
            medium: 'Medium strength password',
            strong: 'Strong password'
        };
        
        indicator.textContent = messages[strength];
        indicator.style.color = colors[strength];
    }
});
