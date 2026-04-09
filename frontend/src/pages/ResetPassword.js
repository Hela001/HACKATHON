import { router } from '../router.js';

export const ResetPassword = {
  render: async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email');
    
    return `
      <div class="container" style="max-width: 480px; margin-top: 5rem;">
        <div class="card">
            <div style="text-align: center; margin-bottom: 2rem;">
                <div class="brand" style="justify-content: center; font-size: 2rem;">
                    <div class="brand-dot"></div>
                    CARBO°RESET
                </div>
                <h3 style="margin-top: 1rem;">Set New Password</h3>
                <p style="color: var(--text-muted); font-size: 0.9rem;">Update password for <b>${email || 'your account'}</b></p>
            </div>
            
            <div id="reset-alert"></div>
            
            <form id="resetForm">
                <input type="hidden" id="resetEmail" value="${email}">
                <div class="form-group">
                    <label>New Password</label>
                    <input type="password" id="newPassword" required placeholder="••••••••" minlength="4">
                </div>
                <div class="form-group">
                    <label>Confirm New Password</label>
                    <input type="password" id="confirmPassword" required placeholder="••••••••" minlength="4">
                </div>
                <button type="submit" class="btn" style="width: 100%; margin-top: 1rem;">Update Password</button>
            </form>
            
            <div style="text-align: center; margin-top: 2rem;">
                <a href="/login" data-link style="color: var(--primary-color); font-weight: 600; text-decoration: none; font-size: 0.9rem;">
                    Return to Login
                </a>
            </div>
        </div>
      </div>
    `;
  },
  afterRender: async () => {
    const form = document.getElementById('resetForm');
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('resetEmail').value;
      const newPassword = document.getElementById('newPassword').value;
      const confirmPassword = document.getElementById('confirmPassword').value;
      const alertBox = document.getElementById('reset-alert');
      const submitBtn = e.target.querySelector('button');
      
      if (newPassword !== confirmPassword) {
          alertBox.innerHTML = `<div class="alert alert-error">Passwords do not match.</div>`;
          return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = 'Updating...';

      try {
        const response = await fetch('http://localhost:5000/api/auth/reset-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, newPassword })
        });
        
        const data = await response.json();
        if (data.success) {
          alertBox.innerHTML = `<div class="alert alert-success">${data.message} Redirecting to login...</div>`;
          setTimeout(() => {
              window.history.pushState(null, null, '/login');
              router();
          }, 2500);
        } else {
          alertBox.innerHTML = `<div class="alert alert-error">${data.message}</div>`;
        }
      } catch (error) {
        alertBox.innerHTML = `<div class="alert alert-error">Network error. Is the server running?</div>`;
      } finally {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Update Password';
      }
    });
  }
};
