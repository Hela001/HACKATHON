export const Home = {
  render: async () => `
    <div class="hero-section">
      <div class="container">
        <div class="brand" style="justify-content: center; font-size: 3rem; margin-bottom: 1.5rem;">
          <div class="brand-dot" style="width: 20px; height: 20px;"></div>
          CARBO°RESET
        </div>
        <h1>Sustainable Event Management</h1>
        <p>
          Join <b>Carbo°RESET 2026</b>, the premier summit for sustainable innovation and carbon reduction strategies. 
          Manage your attendance, access your badge, and contribute to a greener future.
        </p>
        <div style="display: flex; gap: 1rem; justify-content: center;">
          <a href="/register" class="btn" style="padding: 1rem 2rem; font-size: 1.1rem;" data-link>Register Now</a>
          <a href="/login" class="btn btn-outline" style="padding: 1rem 2rem; font-size: 1.1rem;" data-link>Login to Dashboard</a>
        </div>
      </div>
    </div>
    
    <div class="container" style="margin-top: -4rem;">
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
        <div class="card" style="text-align: center;">
          <div style="font-size: 2.5rem; margin-bottom: 1rem;">🍃</div>
          <h3 style="margin-bottom: 1rem; color: var(--primary-dark);">Sustainable Badge</h3>
          <p style="color: var(--text-muted); font-size: 0.95rem;">Generate your digital badge and share your commitment to sustainability on social media.</p>
        </div>
        <div class="card" style="text-align: center;">
          <div style="font-size: 2.5rem; margin-bottom: 1rem;">📅</div>
          <h3 style="margin-bottom: 1rem; color: var(--primary-dark);">Live Programme</h3>
          <p style="color: var(--text-muted); font-size: 0.95rem;">Stay updated with the real-time event schedule, keynote speakers, and interactive workshops.</p>
        </div>
        <div class="card" style="text-align: center;">
          <div style="font-size: 2.5rem; margin-bottom: 1rem;">✅</div>
          <h3 style="margin-bottom: 1rem; color: var(--primary-dark);">Smart Attendance</h3>
          <p style="color: var(--text-muted); font-size: 0.95rem;">Verified attendance tracking via secure QR code scanning at the event venue.</p>
        </div>
      </div>
    </div>

    <div class="container" style="margin-top: 4rem; text-align: center; border-top: 1px solid var(--border-color); padding-top: 4rem;">
        <h2 style="margin-bottom: 1rem; color: var(--primary-dark);">About the Event</h2>
        <p style="color: var(--text-muted); max-width: 800px; margin: 0 auto;">
            Carbo°RESET is dedicated to bringing together leaders, innovators, and enthusiasts to discuss 
            and implement practical solutions for carbon neutralization in the modern industrial landscape.
        </p>
    </div>
  `
};
