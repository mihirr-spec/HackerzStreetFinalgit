// DOM Elements
const darkModeCheckbox = document.getElementById('dark-mode-checkbox');
const darkModeLabel = document.querySelector('.dark-mode-label');
const togglePasswordIcons = document.querySelectorAll('.toggle-password');
const registrationForm = document.getElementById('registration-form');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');

// Error message elements
const usernameError = document.getElementById('username-error');
const emailError = document.getElementById('email-error');
const passwordError = document.getElementById('password-error');
const confirmPasswordError = document.getElementById('confirm-password-error');

// Check for saved user preference in localStorage and apply on page load
document.addEventListener('DOMContentLoaded', () => {
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'enabled') {
        document.body.classList.add('dark-mode');
        darkModeCheckbox.checked = true;
        darkModeLabel.querySelector('.toggle-text').textContent = 'Light Mode';
    }
});

// Dark Mode Toggle Functionality
darkModeCheckbox.addEventListener('change', () => {
    if (darkModeCheckbox.checked) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'enabled');
        darkModeLabel.querySelector('.toggle-text').textContent = 'Light Mode';
    } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'disabled');
        darkModeLabel.querySelector('.toggle-text').textContent = 'Dark Mode';
    }
});

// Toggle Password Visibility
togglePasswordIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        const targetId = icon.getAttribute('data-target');
        const inputField = document.getElementById(targetId);
        
        if (inputField.type === 'password') {
            inputField.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            inputField.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    });
});

// Form Validation
registrationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let isValid = true;
    
    // Reset error messages
    usernameError.textContent = '';
    emailError.textContent = '';
    passwordError.textContent = '';
    confirmPasswordError.textContent = '';
    
    // Username validation
    if (usernameInput.value.trim() === '') {
        usernameError.textContent = 'Username is required';
        isValid = false;
    } else if (usernameInput.value.length < 3) {
        usernameError.textContent = 'Username must be at least 3 characters';
        isValid = false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput.value.trim() === '') {
        emailError.textContent = 'Email is required';
        isValid = false;
    } else if (!emailRegex.test(emailInput.value)) {
        emailError.textContent = 'Please enter a valid email address';
        isValid = false;
    }
    
    // Password validation
    if (passwordInput.value === '') {
        passwordError.textContent = 'Password is required';
        isValid = false;
    } else if (passwordInput.value.length < 8) {
        passwordError.textContent = 'Password must be at least 8 characters';
        isValid = false;
    }
    
    // Confirm password validation
    if (confirmPasswordInput.value === '') {
        confirmPasswordError.textContent = 'Please confirm your password';
        isValid = false;
    } else if (confirmPasswordInput.value !== passwordInput.value) {
        confirmPasswordError.textContent = 'Passwords do not match';
        isValid = false;
    }
    
    // If form is valid, submit
    if (isValid) {
        // Here you would typically send the form data to your server
        // For now, we'll just show an alert
        alert('Registration successful! Welcome to Swasthya Sathi.');
        registrationForm.reset();
    }
});

// Real-time validation feedback
usernameInput.addEventListener('blur', () => {
    if (usernameInput.value.trim() === '') {
        usernameError.textContent = 'Username is required';
    } else if (usernameInput.value.length < 3) {
        usernameError.textContent = 'Username must be at least 3 characters';
    } else {
        usernameError.textContent = '';
    }
});

emailInput.addEventListener('blur', () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput.value.trim() === '') {
        emailError.textContent = 'Email is required';
    } else if (!emailRegex.test(emailInput.value)) {
        emailError.textContent = 'Please enter a valid email address';
    } else {
        emailError.textContent = '';
    }
});

passwordInput.addEventListener('blur', () => {
    if (passwordInput.value === '') {
        passwordError.textContent = 'Password is required';
    } else if (passwordInput.value.length < 8) {
        passwordError.textContent = 'Password must be at least 8 characters';
    } else {
        passwordError.textContent = '';
    }
});

confirmPasswordInput.addEventListener('blur', () => {
    if (confirmPasswordInput.value === '') {
        confirmPasswordError.textContent = 'Please confirm your password';
    } else if (confirmPasswordInput.value !== passwordInput.value) {
        confirmPasswordError.textContent = 'Passwords do not match';
    } else {
        confirmPasswordError.textContent = '';
    }
});