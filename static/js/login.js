document.addEventListener('DOMContentLoaded', () => {
    // Dark mode toggle functionality
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;
    
    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        darkModeToggle.checked = true;
    } else if (savedTheme === 'light') {
        body.classList.remove('dark-mode');
        darkModeToggle.checked = false;
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // If no saved preference, use system preference
        body.classList.add('dark-mode');
        darkModeToggle.checked = true;
    }

    // Toggle theme when the switch is clicked
    darkModeToggle.addEventListener('change', () => {
        if (darkModeToggle.checked) {
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    });

    // Form submission handler
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        // Here you would normally send the login data to your server
        console.log('Login attempt:', { username, password });
        
        // For demonstration purposes only - reset form
        // In a real application, you would validate the credentials
        // and redirect the user or show an error message
        alert('Login submitted! This is a demo.');
        loginForm.reset();
    });
});