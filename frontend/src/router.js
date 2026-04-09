import { Home } from './pages/Home.js';
import { Login } from './pages/Login.js';
import { Register } from './pages/Register.js';
import { ForgotPassword } from './pages/ForgotPassword.js';
import { ResetPassword } from './pages/ResetPassword.js';
import { Profile } from './pages/Profile.js';
import { Dashboard } from './pages/Dashboard.js';
import { Agenda } from './pages/Agenda.js';

const routes = {
  '/': Home,
  '/login': Login,
  '/register': Register,
  '/forgot-password': ForgotPassword,
  '/reset-password': ResetPassword,
  '/profile': Profile,
  '/dashboard': Dashboard,
  '/agenda': Agenda,
};

export const router = async () => {
  const path = window.location.pathname;
  const page = routes[path] || Home;

  const app = document.getElementById('app');
  
  // Render navbar
  const { isAuthenticated, role } = window.checkAuth ? window.checkAuth() : { isAuthenticated: localStorage.getItem('token'), role: localStorage.getItem('role') };
  const navHTML = `
    <nav>
      <a href="/" class="brand" data-link style="display: flex; align-items: center; gap: 0.5rem; text-decoration: none;">
        <img src="http://localhost:5000/uploads/assets/logo-carbo.png" alt="Carbo°RESET" style="height: 38px;">
      </a>
      <div class="nav-links">
        <a href="/agenda" data-link>Agenda</a>
        ${isAuthenticated ? `
          ${role === 'admin' ? `<a href="/dashboard" data-link>Dashboard</a>` : `<a href="/profile" data-link>My Panel</a>`}
          <a href="#" onclick="window.logout(event)">Logout</a>
        ` : `
          <a href="/login" data-link>Login</a>
          <a href="/register" class="btn btn-outline" data-link>Register</a>
        `}
      </div>
    </nav>
  `;

  app.innerHTML = navHTML + '<div id="content"></div>';
  
  const content = document.getElementById('content');
  content.innerHTML = await page.render();
  if (page.afterRender) {
    await page.afterRender();
  }

  // Global logout handled in main.js
};
