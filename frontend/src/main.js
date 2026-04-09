import './style.css';
import { router } from './router.js';

// Auth State Check
window.checkAuth = () => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');
    return { isAuthenticated: !!token, role: userRole };
};

// Global Logout
window.logout = (e) => {
    if(e) e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    window.history.pushState(null, null, '/login');
    router();
};

// Listen to navigation events
window.addEventListener('popstate', router);
window.addEventListener('DOMContentLoaded', router);

// Setup generic event listener for navigation links
document.body.addEventListener('click', e => {
  const link = e.target.closest('[data-link]');
  if (link) {
    e.preventDefault();
    history.pushState(null, null, link.href);
    router();
  }
});
