import { router } from '../router.js';

export const Login = {
  render: async () => `
    <div class="container" style="max-width: 480px; margin-top: 5rem;">
      <div class="card">
        <div style="text-align: center; margin-bottom: 2rem;">
            <div class="brand" style="justify-content: center; font-size: 2rem;">
                <div class="brand-dot"></div>
                CARBO°RESET
            </div>
            <p style="color: var(--text-muted); margin-top: 0.5rem;">Access your event dashboard</p>
        </div>
        
        <div id="login-alert"></div>
        
        <form id="loginForm">
          <div class="form-group">
            <label>Email Address</label>
            <input type="email" id="email" required placeholder="name@domain.com">
          </div>
          <div class="form-group">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                <label style="margin-bottom: 0;">Password</label>
                <a href="/forgot-password" data-link style="color: var(--primary-color); font-size: 0.8rem; font-weight: 600; text-decoration: none;">
                    Forgot Password?
                </a>
            </div>
            <input type="password" id="password" required placeholder="••••••••">
          </div>
          <button type="submit" class="btn" style="width: 100%; margin-top: 1rem;">Login</button>
        </form>
        
        <p style="text-align: center; margin-top: 2rem; color: var(--text-muted); font-size: 0.95rem;">
          Don't have an account? 
          <a href="/register" data-link style="color: var(--primary-color); font-weight: 700; text-decoration: none;">
            Register now
          </a>
        </p>
      </div>
    </div>
  `,
  afterRender: async () => {
    document.getElementById('loginForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const alertBox = document.getElementById('login-alert');
      const submitBtn = e.target.querySelector('button');
      
      submitBtn.disabled = true;
      submitBtn.textContent = 'Connexion...';

      try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        if (data.success) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('role', data.user.role);
          localStorage.setItem('user', JSON.stringify(data.user));
          
          window.history.pushState(null, null, data.user.role === 'admin' ? '/dashboard' : '/profile');
          router();
        } else {
          alertBox.innerHTML = `<div class="alert alert-error">Email ou mot de passe incorrect. Veuillez réessayer.</div>`;
        }
      } catch (error) {
        alertBox.innerHTML = `<div class="alert alert-error">Erreur réseau. Le serveur est-il lancé ?</div>`;
      } finally {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Se connecter';
      }
    });
  }
};
