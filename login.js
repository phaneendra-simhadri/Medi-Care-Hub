document.addEventListener('DOMContentLoaded', function() {
  // Background slideshow
  const slides = document.querySelectorAll('.slide');
  let currentSlide = 0;
  function nextSlide() {
      slides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add('active');
  }
  setInterval(nextSlide, 5000);
  
  // Enhanced Login Functionality
  const loginForm = document.getElementById('loginForm');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const loginError = document.getElementById('loginError');
  const googleBtn = document.querySelector('.google-btn');

  // Hide error message initially
  loginError.style.display = 'none';

  // Real-time validation
  emailInput.addEventListener('input', function() {
      validateEmail(this.value);
  });

  passwordInput.addEventListener('input', function() {
      validatePassword(this.value);
  });

  // Form submission
  loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      if (validateForm()) {
          performLogin();
      }
  });

  // Google Sign-in
  googleBtn.addEventListener('click', function() {
      initiateGoogleSignIn();
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

  // Password validation
  function validatePassword(password) {
      if (password.length < 6) {
          showFieldError(passwordInput, 'Password must be at least 6 characters');
          return false;
      }
      clearFieldError(passwordInput);
      return true;
  }

  // Form validation
  function validateForm() {
      const isEmailValid = validateEmail(emailInput.value);
      const isPasswordValid = validatePassword(passwordInput.value);
      
      return isEmailValid && isPasswordValid;
  }

  // Show field error
  function showFieldError(input, message) {
      input.style.borderColor = '#e74c3c';
      input.style.boxShadow = '0 0 0 2px rgba(231, 76, 60, 0.2)';
      
      // Create or update error message
      let errorDiv = input.parentNode.querySelector('.field-error');
      if (!errorDiv) {
          errorDiv = document.createElement('div');
          errorDiv.className = 'field-error';
          errorDiv.style.color = '#e74c3c';
          errorDiv.style.fontSize = '0.8rem';
          errorDiv.style.marginTop = '5px';
          input.parentNode.appendChild(errorDiv);
      }
      errorDiv.textContent = message;
  }

  // Clear field error
  function clearFieldError(input) {
      input.style.borderColor = '#ddd';
      input.style.boxShadow = 'none';
      
      const errorDiv = input.parentNode.querySelector('.field-error');
      if (errorDiv) {
          errorDiv.remove();
      }
  }

  // Perform login
  async function performLogin() {
      const loginBtn = document.querySelector('.btn-login');
      const originalText = loginBtn.textContent;
      
      // Show loading state
      loginBtn.textContent = 'Signing in...';
      loginBtn.disabled = true;
      
      try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          // Check if user exists (demo logic)
          const email = emailInput.value;
          const password = passwordInput.value;
          
          if (email === 'demo@medicare.com' && password === 'demo123') {
              // Success - redirect to dashboard
              showSuccessMessage('Login successful! Redirecting...');
              setTimeout(() => {
                  window.location.href = 'index.html';
              }, 1000);
          } else if (email === 'doctor@medicare.com' && password === 'doctor123') {
              // Doctor login
              showSuccessMessage('Login successful! Redirecting to doctor dashboard...');
              setTimeout(() => {
                  window.location.href = 'doc_dashboard.html';
              }, 1000);
          } else {
              // Invalid credentials
              showLoginError('Invalid email or password. Please try again.');
          }
      } catch (error) {
          showLoginError('An error occurred. Please try again.');
      } finally {
          // Reset button state
          loginBtn.textContent = originalText;
          loginBtn.disabled = false;
      }
  }

  // Show login error
  function showLoginError(message) {
      loginError.textContent = message;
      loginError.style.display = 'block';
      loginError.style.background = '#e74c3c';
      loginError.style.color = 'white';
      
      // Hide after 5 seconds
      setTimeout(() => {
          loginError.style.display = 'none';
      }, 5000);
  }

  // Show success message
  function showSuccessMessage(message) {
      loginError.textContent = message;
      loginError.style.display = 'block';
      loginError.style.background = '#27ae60';
      loginError.style.color = 'white';
  }

  // Google Sign-in
  function initiateGoogleSignIn() {
      // Simulate Google sign-in
      const googleBtn = document.querySelector('.google-btn');
      const originalText = googleBtn.textContent;
      
      googleBtn.textContent = 'Signing in...';
      googleBtn.disabled = true;
      
      setTimeout(() => {
          showSuccessMessage('Google sign-in successful! Redirecting...');
          setTimeout(() => {
              window.location.href = 'index.html';
          }, 1000);
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

  // Add enter key support
  inputs.forEach(input => {
      input.addEventListener('keypress', function(e) {
          if (e.key === 'Enter') {
              e.preventDefault();
              loginForm.dispatchEvent(new Event('submit'));
          }
      });
  });
});

// Google Sign-in callback (if using Google Identity Services)
function onGoogleScriptLoad() {
    // Initialize Google Sign-in if needed
    console.log('Google Sign-in script loaded');
}