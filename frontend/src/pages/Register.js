import { router } from '../router.js';

export const Register = {
  render: async () => `
    <div class="container" style="max-width: 480px; margin-top: 4rem;">
      <div class="card">
        <div style="text-align: center; margin-bottom: 2rem;">
            <div class="brand" style="justify-content: center; font-size: 2rem;">
                <div class="brand-dot"></div>
                CARBO°RESET
            </div>
            <p style="color: var(--text-muted); margin-top: 0.5rem;">Join the sustainable initiative</p>
        </div>
        
        <div id="register-alert"></div>
        
        <form id="registerForm">
          <div class="form-group">
            <label>Full Name</label>
            <input type="text" id="name" required placeholder="John Doe">
          </div>
          <div class="form-group">
            <label>Email Address</label>
            <input type="email" id="email" required placeholder="name@domain.com">
          </div>
          <div class="form-group">
            <label>Password</label>
            <input type="password" id="password" required placeholder="••••••••">
          </div>
          <button type="submit" class="btn" style="width: 100%; margin-top: 1rem;">Register Now</button>
        </form>
        
        <p style="text-align: center; margin-top: 2rem; color: var(--text-muted); font-size: 0.95rem;">
          Already have an account? 
          <a href="/login" data-link style="color: var(--primary-color); font-weight: 700; text-decoration: none;">
            Login
          </a>
        </p>
      </div>
    </div>
  `,
  afterRender: async () => {
    document.getElementById('registerForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const alertBox = document.getElementById('register-alert');
      const submitBtn = e.target.querySelector('button');
      
      submitBtn.disabled = true;
      submitBtn.textContent = 'Registering...';

      try {
        const response = await fetch('http://localhost:5000/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password, role: 'participant' })
        });
        
        const data = await response.json();
        if (data.success) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('role', data.user.role);
          localStorage.setItem('user', JSON.stringify(data.user));
          
          window.history.pushState(null, null, '/profile');
          router();
        } else {
          alertBox.innerHTML = `<div class="alert alert-error">${data.message}</div>`;
        }
      } catch (error) {
        alertBox.innerHTML = `<div class="alert alert-error">Network error. Is the server running?</div>`;
      } finally {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Register Now';
      }
    });
  }
};
