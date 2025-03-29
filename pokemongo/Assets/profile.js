document.addEventListener('DOMContentLoaded', () => {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    
    if (!userData || !userData.isLoggedIn) {
        window.location.href = 'login.html';
        return;
    }

    const usernameDisplay = document.getElementById('usernameDisplay');
    const emailDisplay = document.getElementById('emailDisplay');
    const playerIdDisplay = document.getElementById('playerIdDisplay');
    const lastLoginDisplay = document.getElementById('lastLoginDisplay');

    if (usernameDisplay) usernameDisplay.textContent = userData.username || 'Not set';
    if (emailDisplay) emailDisplay.textContent = userData.email || 'Not set';
    if (playerIdDisplay) playerIdDisplay.textContent = userData.playerId || 'Not set';
    if (lastLoginDisplay) lastLoginDisplay.textContent = userData.lastLogin || 'First time login';

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            // Clear session storage
            sessionStorage.removeItem('userData');
            // Redirect to home page
            window.location.href = '../index.html';
        });
    }
}); 