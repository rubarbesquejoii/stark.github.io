function checkAuth() {
    console.log('Checking auth status...');
    const userData = JSON.parse(sessionStorage.getItem('userData') || '{}');
    const isAuthenticated = userData.isLoggedIn === true;
    
    updateAuthUI(isAuthenticated, userData);
    
    return isAuthenticated;
}

function updateAuthUI(isAuthenticated, userData) {
    const authBtn = document.querySelector('.auth-btn');
    const cartLink = document.querySelector('.cart-link');
    
    if (isAuthenticated && userData) {
        console.log('User is authenticated:', userData.email);
        if (authBtn) {
            authBtn.textContent = userData.email;
            authBtn.href = 'auth/profile.html';
            authBtn.classList.add('authenticated');
        }
        if (cartLink) {
            cartLink.style.display = 'flex';
        }
    } else {
        console.log('User is not authenticated');
        if (authBtn) {
            authBtn.textContent = 'Sign In';
            authBtn.href = 'auth/login.html';
            authBtn.classList.remove('authenticated');
        }
        if (cartLink) {
            cartLink.style.display = 'none';
        }
    }
}

function handleLogin(event) {
    event.preventDefault();
    console.log('Login attempted');
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    const emailError = validateEmail(email);
    if (emailError) {
        document.getElementById('emailError').textContent = emailError;
        return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
        document.getElementById('passwordError').textContent = passwordError;
        return;
    }

    const userData = {
        email,
        playerId: generatePlayerId(),
        isLoggedIn: true,
        lastLogin: getCurrentTimestamp()
    };

    sessionStorage.setItem('userData', JSON.stringify(userData));

    showModal(
        'Login Successful!',
        'Welcome back to Pokémon GO Web Store!'
    );

    setTimeout(() => {
        window.location.href = '../index.html';
    }, 2000);
}

function handleSignup(event) {
    event.preventDefault();
    console.log('Signup attempted');
    
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

    const usernameError = validateUsername(username);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword(password, confirmPassword);

    if (usernameError) document.getElementById('usernameError').textContent = usernameError;
    if (emailError) document.getElementById('emailError').textContent = emailError;
    if (passwordError) document.getElementById('passwordError').textContent = passwordError;
    if (confirmPasswordError) document.getElementById('confirmPasswordError').textContent = confirmPasswordError;

    if (!usernameError && !emailError && !passwordError && !confirmPasswordError) {
        const playerId = generatePlayerId();
        const userData = {
            username,
            email,
            playerId,
            isLoggedIn: true,
            lastLogin: getCurrentTimestamp()
        };

        sessionStorage.setItem('userData', JSON.stringify(userData));

        showModal(
            'Account Created Successfully!',
            `Your Player ID is: ${playerId}\n\nPlease save this ID for future reference.`
        );

        setTimeout(() => {
            window.location.href = '../index.html';
        }, 3000);
    }
}

function handleLogout(event) {
    event.preventDefault();
    console.log('Logout attempted');
    
    sessionStorage.removeItem('userData');
    
    window.location.href = '../index.html';
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing auth...');
    
    checkAuth();
    
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }
    
    const logoutButton = document.querySelector('.logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', handleLogout);
    }
});

const modal = document.getElementById('messageModal');
const modalTitle = document.getElementById('modalTitle');
const modalMessage = document.getElementById('modalMessage');
const closeBtn = document.querySelector('.modal-close');

const showModal = (title, message) => {
    if (modalTitle) modalTitle.textContent = title;
    if (modalMessage) modalMessage.textContent = message;
    if (modal) modal.classList.add('show');
};

const hideModal = () => {
    if (modal) modal.classList.remove('show');
};

if (closeBtn) {
    closeBtn.addEventListener('click', hideModal);
}

if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            hideModal();
        }
    });
}

const validateUsername = (username) => {
    if (username.length < 3) {
        return 'Username must be at least 3 characters long';
    }
    if (username.length > 20) {
        return 'Username must be less than 20 characters';
    }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        return 'Username can only contain letters, numbers, and underscores';
    }
    return '';
};

const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return 'Please enter a valid email address';
    }
    return '';
};

const validatePassword = (password) => {
    if (password.length < 8) {
        return 'Password must be at least 8 characters long';
    }
    if (!/[A-Z]/.test(password)) {
        return 'Password must contain at least one uppercase letter';
    }
    if (!/[a-z]/.test(password)) {
        return 'Password must contain at least one lowercase letter';
    }
    if (!/[0-9]/.test(password)) {
        return 'Password must contain at least one number';
    }
    if (!/[!@#$%^&*]/.test(password)) {
        return 'Password must contain at least one special character (!@#$%^&*)';
    }
    return '';
};

const validateConfirmPassword = (password, confirmPassword) => {
    if (password !== confirmPassword) {
        return 'Passwords do not match';
    }
    return '';
};

const generatePlayerId = () => {
    const numbers = Array.from({ length: 12 }, () => Math.floor(Math.random() * 10));
    return numbers.join('').replace(/(\d{4})/g, '$1 ').trim();
};

const getCurrentTimestamp = () => {
    return new Date().toLocaleString();
}; 