import { router } from '../router.js';

export const ForgotPassword = {
  render: async () => `
    <div class="container" style="max-width: 480px; margin-top: 5rem;">
      <div class="card">
        <div style="text-align: center; margin-bottom: 2rem;">
            <div class="brand" style="justify-content: center; font-size: 2rem;">
                <div class="brand-dot"></div>
                CARBO°RESET
            </div>
            <p style="color: var(--text-muted); margin-top: 0.5rem;">Reset your account password</p>
        </div>
        
        <div id="forgot-alert"></div>
        
        <form id="forgotForm">
          <div class="form-group">
            <label>Email Address</label>
            <input type="email" id="email" required placeholder="you@domain.com">
            <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.5rem;">
                Enter the email associated with your account and we'll send you a reset link.
            </p>
          </div>
          <button type="submit" class="btn" style="width: 100%; margin-top: 1rem;">Send Reset Link</button>
        </form>
        
        <div style="text-align: center; margin-top: 2rem;">
          <a href="/login" data-link style="color: var(--primary-color); font-weight: 600; text-decoration: none; font-size: 0.9rem;">
            ← Back to Login
          </a>
        </div>
      </div>
    </div>
  `,
  afterRender: async () => {
    document.getElementById('forgotForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const alertBox = document.getElementById('forgot-alert');
      const submitBtn = e.target.querySelector('button');
      
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      try {
        const response = await fetch('http://localhost:5000/api/auth/forgot-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        });
        
        const data = await response.json();
        if (data.success) {
          alertBox.innerHTML = `<div class="alert alert-success">${data.message}</div>`;
        } else {
          alertBox.innerHTML = `<div class="alert alert-error">${data.message}</div>`;
        }
      } catch (error) {
        alertBox.innerHTML = `<div class="alert alert-error">Network error. Please check your connection.</div>`;
      } finally {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send Reset Link';
      }
    });
  }
};
