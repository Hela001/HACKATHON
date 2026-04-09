export const Dashboard = {
  render: async () => `
    <div class="container" style="margin-top: 2rem;">
      <h1 style="color: var(--primary-dark); margin-bottom: 2rem;">Tableau de Bord Administrateur</h1>
      
      <!-- STATS GRID -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-value" id="totalParticipants">0</div>
          <div class="stat-label">Inscrits</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" id="presentCount">0</div>
          <div class="stat-label">Présents</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" id="teamCount">0</div>
          <div class="stat-label">Équipes</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" id="recentActivity">0</div>
          <div class="stat-label">Check-ins Récents</div>
        </div>
      </div>

      <!-- TABS -->
      <div class="tabs">
        <div class="tab active" data-tab="participants">Participants</div>
        <div class="tab" data-tab="teams">Équipes</div>
        <div class="tab" data-tab="feedback">Evaluations</div>
        <div class="tab" data-tab="requests">Modération <span id="requestCountBadge" style="background:var(--error); color:white; padding:2px 6px; border-radius:99px; font-size:10px; display:none;">0</span></div>
        <div class="tab" data-tab="planning">Planning</div>
        <div class="tab" data-tab="setup">Configuration QR</div>
      </div>

      <div id="tabContent" class="card">
        <div id="listContent"></div>
      </div>
    </div>

    <!-- ADMIN CREATE AGENDA MODAL -->
    <div id="adminCreateAgendaModal" class="modal-backdrop" style="display: none; z-index: 1003;">
       <div class="modal">
          <h2 style="margin-bottom: 1.5rem; color: var(--primary-dark);">➕ Ajouter une Session</h2>
          <div id="adminAgendaStatus"></div>
          <form id="adminAgendaForm">
             <div class="form-group">
                <label>Titre de la Session</label>
                <input type="text" id="agendaTitle" required placeholder="Ex: Cérémonie d'ouverture">
             </div>
             <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                <div class="form-group">
                   <label>Début</label>
                   <input type="time" id="agendaStart" required>
                </div>
                <div class="form-group">
                   <label>Fin</label>
                   <input type="time" id="agendaEnd" required>
                </div>
             </div>
             <div class="form-group">
                <label>Section / Scène</label>
                <input type="text" id="agendaSection" placeholder="Ex: Main Stage">
             </div>
             <div class="form-group">
                <label>Speaker</label>
                <input type="text" id="agendaSpeaker" placeholder="Nom du Speaker">
             </div>
             <div class="form-group">
                <label>Tags (séparés par virgule)</label>
                <input type="text" id="agendaTags" placeholder="Keynote, Workshop...">
             </div>
             <div style="display: flex; gap: 1rem; margin-top: 1rem;">
                <button type="button" class="btn btn-outline" style="flex: 1;" id="closeAdminAgendaModal">Annuler</button>
                <button type="submit" class="btn" style="flex: 1;">Ajouter</button>
             </div>
          </form>
       </div>
    </div>

    <!-- IMPORT AGENDA MODAL -->
    <div id="importAgendaModal" class="modal-backdrop" style="display: none; z-index: 1003;">
       <div class="modal">
          <h2 style="margin-bottom: 1.5rem; color: var(--primary-dark);">📥 Importer Planning Excel</h2>
          <div id="importAgendaStatus"></div>
          <form id="importAgendaForm">
             <div class="form-group">
                <label>Fichier Planning (.xlsx)</label>
                <input type="file" id="importAgendaFile" accept=".xlsx" required>
             </div>
             <div style="display: flex; gap: 1rem; margin-top: 1rem;">
                <button type="button" class="btn btn-outline" style="flex: 1;" id="closeImportAgendaModal">Annuler</button>
                <button type="submit" class="btn" style="flex: 1;" id="submitImportAgendaBtn">Importer</button>
             </div>
          </form>
       </div>
    </div>

    <!-- TEAM DETAILS MODAL -->
    <div id="teamDetailsModal" class="modal-backdrop" style="display: none; z-index: 1000;">
       <div class="modal" style="max-width: 800px; width: 90%;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
             <h2 id="modalTeamName" style="color: var(--primary-dark); margin: 0;">Détails de l'Équipe</h2>
             <button class="btn btn-outline" id="closeTeamDetails" style="padding: 0.5rem;">Fermer</button>
          </div>
          <div id="modalTeamContent"></div>
       </div>
    </div>

    <!-- ADMIN EDIT USER MODAL -->
    <div id="adminEditUserModal" class="modal-backdrop" style="display: none; z-index: 1002;">
       <div class="modal">
          <h2 style="margin-bottom: 1.5rem; color: var(--primary-dark);">✏️ Modifier le Participant</h2>
          <div id="adminEditUserStatus"></div>
          <form id="adminEditUserForm">
             <input type="hidden" id="editUserId">
             <div class="form-group">
                <label>Nom Complet</label>
                <input type="text" id="adminEditName" required>
             </div>
             <div class="form-group">
                <label>Rôle (Badge)</label>
                <select id="adminEditRole">
                   <option value="participant">Participant</option>
                   <option value="admin">Organisateur</option>
                </select>
             </div>
             <div class="form-group" style="display: flex; align-items: center; gap: 0.5rem;">
                <input type="checkbox" id="adminEditAttended" style="width: auto;">
                <label style="margin: 0;">Présence Validée (Check-in)</label>
             </div>
             <div style="display: flex; gap: 1rem; margin-top: 2rem;">
                <button type="button" class="btn btn-outline" style="flex: 1;" id="closeAdminEditUserModal">Annuler</button>
                <button type="submit" class="btn" style="flex: 1;">Enregistrer</button>
             </div>
          </form>
       </div>
    </div>

    <!-- ADD TEAM MODAL -->
    <div id="adminCreateTeamModal" class="modal-backdrop" style="display: none; z-index: 1001;">
       <div class="modal">
          <h2 style="margin-bottom: 1.5rem; color: var(--primary-dark);">➕ Ajouter une Équipe</h2>
          <div id="adminCreateStatus"></div>
          <form id="adminCreateTeamForm">
             <div class="form-group">
                <label>Nom de l'Équipe</label>
                <input type="text" id="adminTeamName" required placeholder="Ex: Eco Warriors">
             </div>
             <div class="form-group">
                <label>Email du Leader</label>
                <input type="email" id="adminLeaderEmail" required>
             </div>
             <div class="form-group">
                <label>Membres (emails séparés par virgule)</label>
                <textarea id="adminMemberEmails" rows="2"></textarea>
             </div>
             <div style="display: flex; gap: 1rem;">
                <button type="button" class="btn btn-outline" style="flex: 1;" id="closeAdminCreateModal">Annuler</button>
                <button type="submit" class="btn" style="flex: 1;">Créer</button>
             </div>
          </form>
       </div>
    </div>

    <!-- IMPORT MODAL -->
    <div id="importTeamsModal" class="modal-backdrop" style="display: none; z-index: 1001;">
       <div class="modal">
          <h2 style="margin-bottom: 1.5rem; color: var(--primary-dark);">📥 Importer depuis Excel</h2>
          <div id="importStatus"></div>
          <form id="importTeamsForm">
             <div class="form-group">
                <label>Fichier (.xlsx)</label>
                <input type="file" id="importFile" accept=".xlsx" required>
             </div>
             <div style="display: flex; gap: 1rem;">
                <button type="button" class="btn btn-outline" style="flex: 1;" id="closeImportModal">Annuler</button>
                <button type="submit" class="btn" style="flex: 1;" id="submitImportBtn">Importer</button>
             </div>
          </form>
       </div>
    </div>
  `,
  afterRender: async () => {
    const token = localStorage.getItem('token');
    const tabs = document.querySelectorAll('.tab');
    const listContent = document.getElementById('listContent');
    let currentTeams = [];

    const loadStats = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/users/admin/stats', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.success) {
                document.getElementById('totalParticipants').textContent = data.stats.totalUsers;
                document.getElementById('presentCount').textContent = data.stats.attendedUsers;
                document.getElementById('teamCount').textContent = data.stats.totalTeams;
                document.getElementById('recentActivity').textContent = data.stats.recentScans;
            }
            const reqRes = await fetch('http://localhost:5000/api/users/admin/removal-requests', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const reqData = await reqRes.json();
            const badge = document.getElementById('requestCountBadge');
            if (reqData.success && reqData.requests.length > 0) {
                badge.textContent = reqData.requests.length;
                badge.style.display = 'inline';
            } else badge.style.display = 'none';
        } catch (e) { console.error(e); }
    };

    const loadParticipants = async () => {
        listContent.innerHTML = 'Chargement...';
        try {
            const res = await fetch('http://localhost:5000/api/users', { headers: { 'Authorization': `Bearer ${token}` } });
            const data = await res.json();
            if (data.success) {
                let html = `
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Nom</th>
                                <th>Email</th>
                                <th>Équipe</th>
                                <th>Présence</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                `;
                data.users.forEach(u => {
                    html += `
                        <tr>
                            <td style="font-weight:600;">${u.name}</td>
                            <td>${u.email}</td>
                            <td>${u.teamId ? u.teamId.name : '<span style="color:#ccc;">Aucune</span>'}</td>
                            <td><span style="color:${u.attended ? 'var(--success)' : '#ccc'}; font-weight:700;">${u.attended ? '✅' : '○'}</span></td>
                            <td><button class="btn btn-outline" style="padding:0.3rem 0.6rem; font-size:0.75rem;" onclick="window.openEditUser('${u._id}', '${u.name}', '${u.role}', ${u.attended})">✏️</button></td>
                        </tr>
                    `;
                });
                html += '</tbody></table>';
                listContent.innerHTML = html;
            }
        } catch (e) { console.error(e); }
    };

    const loadTeams = async () => {
        listContent.innerHTML = 'Chargement...';
        try {
            const res = await fetch('http://localhost:5000/api/teams', { headers: { 'Authorization': `Bearer ${token}` } });
            const data = await res.json();
            if (data.success) {
                currentTeams = data.teams;
                let html = `
                    <div style="display:flex; gap:1rem; margin-bottom:1rem;">
                       <button class="btn" onclick="window.openAdminCreate()">➕ Équipe</button>
                       <button class="btn btn-outline" onclick="window.openImport()">📥 Import</button>
                    </div>
                    <table class="data-table"><thead><tr><th>Nom</th><th>Leader</th><th>Membres</th><th>Actions</th></tr></thead><tbody>
                `;
                data.teams.forEach(t => {
                    html += `
                        <tr>
                            <td>${t.name}</td>
                            <td>${t.leader?.name || '---'}</td>
                            <td>${t.members?.length || 0}</td>
                            <td><button class="btn" style="padding:0.3rem 0.6rem; font-size:0.75rem;" onclick="window.showTeamDetails('${t._id}')">👁️ Détails</button></td>
                        </tr>
                    `;
                });
                html += '</tbody></table>';
                listContent.innerHTML = html;
            }
        } catch (e) { console.error(e); }
    };

    const loadRemovalRequests = async () => {
        listContent.innerHTML = 'Chargement...';
        try {
            const res = await fetch('http://localhost:5000/api/users/admin/removal-requests', { headers: { 'Authorization': `Bearer ${token}` } });
            const data = await res.json();
            if (data.success) {
                if (data.requests.length === 0) { listContent.innerHTML = '<p>Aucune requête.</p>'; return; }
                let html = '<div style="display:flex; flex-direction:column; gap:1rem;">';
                data.requests.forEach(r => {
                    html += `
                        <div class="card" style="border:1px solid var(--border-color); padding:1rem; box-shadow:none;">
                           <div style="display:flex; justify-content:space-between;">
                              <div><b>${r.requester?.name}</b> veut retirer <b>${r.userToRemove?.name}</b></div>
                              <div>
                                 <button class="btn" style="background:var(--success); border-color:var(--success); padding:0.3rem 0.6rem;" onclick="window.handleRemoval('${r._id}', 'approve')">✅</button>
                                 <button class="btn" style="background:var(--error); border-color:var(--error); padding:0.3rem 0.6rem;" onclick="window.handleRemoval('${r._id}', 'reject')">❌</button>
                              </div>
                           </div>
                           <div style="margin-top:0.5rem; font-style:italic;">"${r.reason}"</div>
                        </div>
                    `;
                });
                listContent.innerHTML = html + '</div>';
            }
        } catch (e) { console.error(e); }
    };

    window.openEditUser = (id, name, role, attended) => {
        document.getElementById('editUserId').value = id;
        document.getElementById('adminEditName').value = name;
        document.getElementById('adminEditRole').value = role;
        document.getElementById('adminEditAttended').checked = attended;
        document.getElementById('adminEditUserModal').style.display = 'flex';
        document.getElementById('adminEditUserStatus').innerHTML = '';
    };

    document.getElementById('adminEditUserForm').onsubmit = async (e) => {
        e.preventDefault();
        const body = {
            userId: document.getElementById('editUserId').value,
            name: document.getElementById('adminEditName').value,
            role: document.getElementById('adminEditRole').value,
            attended: document.getElementById('adminEditAttended').checked
        };
        const res = await fetch('http://localhost:5000/api/users/admin/update-user', {
            method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify(body)
        });
        if (res.ok) { document.getElementById('adminEditUserModal').style.display = 'none'; loadParticipants(); loadStats(); }
    };

    document.getElementById('adminCreateTeamForm').onsubmit = async (e) => {
        e.preventDefault();
        const status = document.getElementById('adminCreateStatus');
        const btn = e.target.querySelector('button[type="submit"]');
        const oldBtnText = btn.textContent;

        const body = {
            name: document.getElementById('adminTeamName').value.trim(),
            leaderEmail: document.getElementById('adminLeaderEmail').value.trim(),
            memberEmails: document.getElementById('adminMemberEmails').value.split(',').map(m => m.trim()).filter(m => m)
        };

        if (!body.name || !body.leaderEmail) {
            status.innerHTML = '<div class="alert alert-error">Le nom et l\'email du leader sont requis.</div>';
            return;
        }

        try {
            btn.textContent = 'Création...';
            btn.disabled = true;
            status.innerHTML = '';

            const res = await fetch('http://localhost:5000/api/teams/admin-create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(body)
            });
            const data = await res.json();
            
            if (data.success) {
                status.innerHTML = '<div class="alert alert-success">Équipe créée avec succès !</div>';
                setTimeout(() => {
                    document.getElementById('adminCreateTeamModal').style.display = 'none';
                    document.getElementById('adminCreateTeamForm').reset();
                    status.innerHTML = '';
                    loadTeams();
                    loadStats();
                }, 1500);
            } else {
                status.innerHTML = `<div class="alert alert-error">${data.message || 'Erreur lors de la création'}</div>`;
            }
        } catch (err) {
            status.innerHTML = '<div class="alert alert-error">Erreur de connexion au serveur.</div>';
        } finally {
            btn.textContent = oldBtnText;
            btn.disabled = false;
        }
    };

    window.showTeamDetails = (id) => {
       const team = currentTeams.find(t => t._id === id);
       document.getElementById('modalTeamName').textContent = team.name;
       document.getElementById('modalTeamContent').innerHTML = team.members.map(m => `
          <div style="padding:1rem; border-bottom:1px solid #eee;">
             <b>${m.name}</b> (${m.email}) - ${m.attended ? '✅' : '○'}
          </div>
       `).join('');
       document.getElementById('teamDetailsModal').style.display = 'flex';
    };

    window.openAdminCreate = () => document.getElementById('adminCreateTeamModal').style.display = 'flex';
    window.openImport = () => document.getElementById('importTeamsModal').style.display = 'flex';

    document.getElementById('closeTeamDetails').onclick = () => document.getElementById('teamDetailsModal').style.display = 'none';
    document.getElementById('closeAdminEditUserModal').onclick = () => document.getElementById('adminEditUserModal').style.display = 'none';
    document.getElementById('closeAdminCreateModal').onclick = () => document.getElementById('adminCreateTeamModal').style.display = 'none';
    document.getElementById('closeImportModal').onclick = () => document.getElementById('importTeamsModal').style.display = 'none';

    const loadAgenda = async () => {
        listContent.innerHTML = '<div style="text-align:center; padding:2rem;">Chargement du planning...</div>';
        try {
            const res = await fetch('http://localhost:5000/api/agenda');
            if (!res.ok) throw new Error(`Erreur ${res.status}`);
            const data = await res.json();
            if (data.success) {
                if (data.items.length === 0) {
                    listContent.innerHTML = `
                        <div style="text-align:center; padding:3rem;">
                           <p style="color:var(--text-muted); margin-bottom:1rem;">Aucune session n'a encore été ajoutée.</p>
                           <div style="display:flex; justify-content:center; gap:1rem;">
                              <button class="btn" onclick="window.openAdminAgenda()">➕ Ajouter Session</button>
                              <button class="btn btn-outline" onclick="window.openImportAgenda()">📥 Import Planning</button>
                           </div>
                        </div>
                    `;
                    return;
                }
                let html = `
                    <div style="display:flex; gap:1rem; margin-bottom:1.5rem;">
                       <button class="btn" onclick="window.openAdminAgenda()">➕ Ajouter Session</button>
                       <button class="btn btn-outline" onclick="window.openImportAgenda()">📥 Import Planning</button>
                    </div>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Heure</th>
                                <th>Session</th>
                                <th>Section</th>
                                <th>Speaker</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                `;
                data.items.forEach(item => {
                    html += `
                        <tr>
                            <td><b>${item.startTime} - ${item.endTime}</b></td>
                            <td>${item.title} ${item.tags.map(t => `<span style="font-size:0.6rem; padding:2px 5px; background:#eee; border-radius:4px; margin-left:4px;">${t}</span>`).join('')}</td>
                            <td>${item.section}</td>
                            <td>${item.speakerName || '---'}</td>
                            <td>
                                <button class="btn btn-outline" style="padding:0.3rem 0.6rem; font-size:0.75rem; border-color:var(--error); color:var(--error);" onclick="window.deleteAgendaItem('${item._id}')">🗑️</button>
                            </td>
                        </tr>
                    `;
                });
                html += '</tbody></table>';
                listContent.innerHTML = html;
            }
        } catch (e) { 
            listContent.innerHTML = `<div class="alert alert-error"><b>Erreur API</b>: Impossible de joindre le serveur.<br><small>${e.message}</small></div>`;
        }
    };

    window.openAdminAgenda = () => {
        document.getElementById('adminCreateAgendaModal').style.display = 'flex';
        document.getElementById('adminAgendaStatus').innerHTML = '';
        document.getElementById('adminAgendaForm').reset();
    };

    window.openImportAgenda = () => {
        document.getElementById('importAgendaModal').style.display = 'flex';
        document.getElementById('importAgendaStatus').innerHTML = '';
        document.getElementById('importAgendaForm').reset();
    };

    document.getElementById('closeAdminAgendaModal').onclick = () => document.getElementById('adminCreateAgendaModal').style.display = 'none';
    document.getElementById('closeImportAgendaModal').onclick = () => document.getElementById('importAgendaModal').style.display = 'none';

    document.getElementById('adminAgendaForm').onsubmit = async (e) => {
        e.preventDefault();
        const body = {
            title: document.getElementById('agendaTitle').value,
            startTime: document.getElementById('agendaStart').value,
            endTime: document.getElementById('agendaEnd').value,
            section: document.getElementById('agendaSection').value,
            speakerName: document.getElementById('agendaSpeaker').value,
            tags: document.getElementById('agendaTags').value.split(',').map(t => t.trim()).filter(t => t),
            date: '2026-04-22' // Default for now
        };
        try {
            const res = await fetch('http://localhost:5000/api/agenda', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(body)
            });
            if (res.ok) {
                document.getElementById('adminCreateAgendaModal').style.display = 'none';
                loadAgenda();
            }
        } catch (e) { console.error(e); }
    };

    document.getElementById('importAgendaForm').onsubmit = async (e) => {
        e.preventDefault();
        const file = document.getElementById('importAgendaFile').files[0];
        const formData = new FormData();
        formData.append('file', file);

        const status = document.getElementById('importAgendaStatus');
        status.innerHTML = 'Importation en cours...';

        try {
            const res = await fetch('http://localhost:5000/api/agenda/import', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
                body: formData
            });
            const data = await res.json();
            if (data.success) {
                status.innerHTML = `<div class="alert alert-success">${data.message}</div>`;
                setTimeout(() => { document.getElementById('importAgendaModal').style.display = 'none'; loadAgenda(); }, 1500);
            }
        } catch (e) { status.innerHTML = 'Erreur lors de l\'import.'; }
    };

    window.deleteAgendaItem = async (id) => {
        if (!confirm('Supprimer cette session ?')) return;
        try {
            const res = await fetch(`http://localhost:5000/api/agenda/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) loadAgenda();
        } catch (e) { console.error(e); }
    };

    const loadSetup = () => {
        listContent.innerHTML = `
            <div style="text-align: center; padding: 2rem;">
                <img src="http://localhost:5000/uploads/assets/logo-carbo.png" style="height: 60px; margin-bottom: 1.5rem;">
                <h2 style="color: var(--primary-dark); margin-bottom: 1rem;">Configuration du Check-in QR</h2>
                <p style="color: var(--text-muted); max-width: 500px; margin: 0 auto 2rem;">
                    Utilisez cette section pour configurer les paramètres de scan et de présence au Carbo°RESET 2026.
                </p>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; max-width: 800px; margin: 0 auto; text-align: left;">
                    <div class="card" style="border: 1px solid var(--border-color); padding: 1.5rem;">
                        <h3 style="font-size: 1.1rem; margin-bottom: 1rem;">Paramètres de Session</h3>
                        <div class="form-group">
                            <label>Nom de l'Événement</label>
                            <input type="text" value="Carbo°RESET 2026" readonly>
                        </div>
                        <div class="form-group">
                            <label>Lieu</label>
                            <input type="text" value="ESPRIT Tunis" readonly>
                        </div>
                    </div>
                    
                    <div class="card" style="border: 1px solid var(--border-color); padding: 1.5rem;">
                        <h3 style="font-size: 1.1rem; margin-bottom: 1rem;">Statistiques de Pointage</h3>
                        <div style="font-size: 2.5rem; font-weight: 800; color: var(--primary-color);" id="setupPresentCount">--</div>
                        <div style="color: var(--text-muted); font-size: 0.9rem;">Participants pointés aujourd'hui</div>
                        <button class="btn" style="margin-top: 1.5rem; width: 100%;" onclick="location.reload()">Rafraîchir les données</button>
                    </div>
                </div>
            </div>
        `;
        // Sync count
        document.getElementById('setupPresentCount').textContent = document.getElementById('presentCount').textContent;
    };

    tabs.forEach(tab => {
        tab.onclick = () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const type = tab.dataset.tab;
            if (type === 'participants') loadParticipants();
            else if (type === 'teams') loadTeams();
            else if (type === 'requests') loadRemovalRequests();
            else if (type === 'planning') loadAgenda();
            else if (type === 'setup') loadSetup();
        };
    });

    loadStats();
    loadParticipants();
  }
};
