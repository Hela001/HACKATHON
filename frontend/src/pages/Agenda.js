export const Agenda = {
  render: async () => `
    <div class="container" style="margin-top: 2rem; max-width: 900px;">
      <div style="text-align: center; margin-bottom: 3rem;">
        <h1 style="color: var(--primary-dark); font-size: 2.5rem; letter-spacing: -1px;">Agenda Carbo°RESET 2026</h1>
        <p style="color: var(--text-muted);">Explorez le programme complet et ne ratez aucune session.</p>
      </div>

      <div id="agendaTimeline" style="position: relative; padding-left: 120px;">
         <div style="position: absolute; left: 110px; top: 0; bottom: 0; width: 2px; background: #E5E7EB; z-index: 1;"></div>
         <div id="agendaItemsList"></div>
      </div>
    </div>

    <style>
      .timeline-item {
        position: relative;
        margin-bottom: 3rem;
        animation: slideUp 0.6s cubic-bezier(0.23, 1, 0.32, 1);
      }
      .timeline-time {
        position: absolute;
        left: -120px;
        width: 100px;
        text-align: right;
        font-weight: 800;
        color: var(--primary-dark);
        font-size: 1.1rem;
      }
      .timeline-dot {
        position: absolute;
        left: -16px;
        top: 6px;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background: var(--primary-color);
        border: 3px solid #fff;
        z-index: 2;
        box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.1);
      }
      .timeline-content {
        background: #fff;
        padding: 1.5rem;
        border-radius: 16px;
        border: 1px solid var(--border-color);
        transition: all 0.3s ease;
      }
      .timeline-content:hover {
        transform: translateX(10px);
        box-shadow: var(--shadow-lg);
        border-color: var(--primary-color);
      }
      .agenda-tag {
        display: inline-block;
        padding: 0.25rem 0.75rem;
        border-radius: 99px;
        font-size: 0.7rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-right: 0.5rem;
        margin-bottom: 0.5rem;
      }
      .tag-section { background: rgba(59, 130, 246, 0.1); color: #2563EB; }
      .tag-type { background: rgba(16, 185, 129, 0.1); color: #059669; }
      
      @keyframes slideUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
    </style>
  `,
  afterRender: async () => {
    const list = document.getElementById('agendaItemsList');
    const loadData = async () => {
        try {
            list.innerHTML = '<div style="text-align:center; padding:3rem; color:var(--text-muted);">Chargement du programme...</div>';
            const res = await fetch('http://localhost:5000/api/agenda');
            if (!res.ok) throw new Error(`Erreur Serveur (${res.status})`);
            
            const data = await res.json();
            
            if (data.success && data.items.length > 0) {
                list.innerHTML = data.items.map(item => `
                    <div class="timeline-item">
                       <div class="timeline-time">${item.startTime}</div>
                       <div class="timeline-dot"></div>
                       <div class="timeline-content">
                          <div style="display: flex; flex-wrap: wrap; margin-bottom: 0.75rem;">
                             <span class="agenda-tag tag-section">${item.section}</span>
                             ${item.tags.map(tag => `<span class="agenda-tag tag-type">${tag}</span>`).join('')}
                          </div>
                          <h3 style="color: var(--primary-dark); font-size: 1.35rem; margin-bottom: 0.5rem; font-weight: 800;">${item.title}</h3>
                          <div style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1rem;">${item.startTime} - ${item.endTime}</div>
                          
                          ${item.speakerName ? `
                            <div style="display: flex; align-items: center; gap: 1rem; padding-top: 1rem; border-top: 1px solid #F3F4F6;">
                               <div style="width: 45px; height: 45px; border-radius: 50%; background: #F3F4F6; display: flex; align-items: center; justify-content: center; font-weight: 800; color: var(--primary-dark);">
                                  ${item.speakerName[0]}
                               </div>
                               <div>
                                  <div style="font-weight: 700; color: var(--primary-dark);">${item.speakerName}</div>
                                  <div style="font-size: 0.8rem; color: var(--text-muted);">${item.speakerRole || 'Intervenant'}</div>
                               </div>
                            </div>
                          ` : ''}
                       </div>
                    </div>
                `).join('');
            } else {
                list.innerHTML = `
                    <div style="text-align:center; padding:3rem; color:var(--text-muted);">
                       <div style="font-size: 3rem; margin-bottom: 1rem;">⏳</div>
                       <div>Le planning sera bientôt disponible.</div>
                       <button class="btn btn-outline" style="margin-top: 1.5rem;" onclick="location.reload()">Rafraîchir</button>
                    </div>
                `;
            }
        } catch (e) {
            console.error('Fetch Error:', e);
            list.innerHTML = `
                <div style="text-align:center; padding:3rem; color:var(--error);">
                   <div style="font-size: 3rem; margin-bottom: 1rem;">⚠️</div>
                   <b>Erreur lors du chargement.</b><br>
                   <p style="font-size:0.8rem; opacity:0.7; margin-top:0.5rem;">Détails: ${e.message}</p>
                   <button class="btn" style="margin-top:1.5rem; background:var(--error); border-color:var(--error);" onclick="location.reload()">Réessayer</button>
                </div>
            `;
        }
    };
    loadData();
  }
};
