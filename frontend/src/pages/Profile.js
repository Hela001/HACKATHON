export const Profile = {
  render: async () => `
    <div class="container" style="margin-top: 2rem;">
      <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 2.5rem;">
        <div>
          <h1 style="color: var(--primary-dark); font-size: 2.5rem; letter-spacing: -1px;">Mon Espace Carbo</h1>
          <p style="color: var(--text-muted);">Gérez votre profil, votre équipe et votre badge digital.</p>
        </div>
        <div style="display: flex; gap: 1rem;">
           <button class="btn" id="openSelfScannerBtn" style="background: var(--gradient-main); border: none;">
              <span>📸</span> Pointer mon Arrivée
           </button>
           <button class="btn btn-outline" id="openEditProfile">
              <span>⚙️</span> Modifier le Profil
           </button>
        </div>
      </div>

      <div style="display: flex; flex-direction: column; gap: 3rem;">
        
        <!-- PREMIUM VIP BADGE -->
        <div style="display: flex; justify-content: center; width: 100%; margin-bottom: 2rem;">
           <div class="badge-card" style="
              position: relative;
              background: linear-gradient(135deg, rgba(6, 78, 59, 0.95), rgba(16, 185, 129, 0.85));
              backdrop-filter: blur(20px);
              -webkit-backdrop-filter: blur(20px);
              border: 1px solid rgba(255, 255, 255, 0.2);
              border-radius: 24px;
              box-shadow: 0 25px 50px -12px rgba(6, 78, 59, 0.5), inset 0 0 0 1px rgba(255,255,255,0.1);
              overflow: hidden;
              width: 100%;
              max-width: 750px;
              display: grid;
              grid-template-columns: 1fr 280px;
              min-height: 280px;
              color: white;
           ">
              
              <!-- Left Section -->
              <div style="padding: 2.5rem; display: flex; flex-direction: column; justify-content: space-between; position: relative;">
                 <!-- Decorative elements -->
                 <div style="position: absolute; top: -50px; left: -50px; width: 150px; height: 150px; background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 60%); border-radius: 50%;"></div>
                 <div style="position: absolute; bottom: 10%; right: 10%; width: 250px; height: 250px; background: radial-gradient(circle, rgba(16,185,129,0.3) 0%, transparent 70%); border-radius: 50%; pointer-events: none;"></div>

                 <div style="display: flex; align-items: flex-start; justify-content: space-between; z-index: 1;">
                    <img src="http://localhost:5000/uploads/assets/logo-carbo.png" alt="Carbo Logo" style="height: 45px; filter: brightness(0) invert(1) drop-shadow(0 2px 4px rgba(0,0,0,0.2));">
                    <img src="http://localhost:5000/uploads/assets/logo-esprit.webp" alt="Esprit Logo" style="height: 40px; background: white; padding: 5px 10px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
                 </div>
                 
                 <div style="z-index: 1; margin-top: auto; padding-top: 2rem;">
                    <div style="font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 4px; color: rgba(255,255,255,0.7); margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
                       <span style="display:inline-block; width: 8px; height: 8px; background: #34d399; border-radius: 50%; box-shadow: 0 0 10px #34d399;"></span>
                       OFFICIAL PASS
                    </div>
                    <h2 id="badgeName" style="font-size: 2.4rem; font-weight: 900; letter-spacing: -1px; margin-bottom: 0.5rem; text-shadow: 0 2px 10px rgba(0,0,0,0.2); line-height: 1.1;">...</h2>
                    <div id="badgeRole" style="font-size: 1.1rem; font-weight: 500; color: #a7f3d0; margin-bottom: 1.5rem; letter-spacing: 1px;">...</div>
                 </div>

                 <div style="display: flex; gap: 2rem; z-index: 1;">
                    <div>
                        <div style="font-size: 0.7rem; text-transform: uppercase; color: rgba(255,255,255,0.6); font-weight: 700; letter-spacing: 1px;">Dates</div>
                        <div style="font-weight: 800; font-size: 1.1rem; text-shadow: 0 1px 2px rgba(0,0,0,0.2);">22-23 AVR 2026</div>
                    </div>
                    <div>
                        <div style="font-size: 0.7rem; text-transform: uppercase; color: rgba(255,255,255,0.6); font-weight: 700; letter-spacing: 1px;">Lieu</div>
                        <div style="font-weight: 800; font-size: 1.1rem; text-shadow: 0 1px 2px rgba(0,0,0,0.2);">ESPRIT, Tunis</div>
                    </div>
                 </div>
              </div>

              <!-- Right Section (QR and Photo) -->
              <div style="background: rgba(0, 0, 0, 0.2); padding: 2.5rem; display: flex; flex-direction: column; justify-content: center; align-items: center; border-left: 1px solid rgba(255,255,255,0.1); position: relative;">
                 <div class="badge-photo-frame" id="badgePhotoFrame" style="width: 140px; height: 140px; border-radius: 50%; border: 4px solid rgba(255,255,255,0.9); overflow: hidden; box-shadow: 0 15px 35px rgba(0,0,0,0.4), inset 0 0 10px rgba(0,0,0,0.5); background: linear-gradient(135deg, #f3f4f6, #d1d5db); position: relative; margin-bottom: 1.5rem;">
                    <img src="" id="badgePhoto" style="display:none; width:100%; height:100%; object-fit:cover;">
                    <div id="badgeInitials" style="font-size: 3rem; font-weight: 900; color: var(--primary-dark); width:100%; height:100%; display:flex; align-items:center; justify-content:center; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">...</div>
                 </div>
                 
                 <div style="position: relative; padding: 6px; background: white; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.3); transition: transform 0.3s ease;">
                    <div id="qrContainer" style="width: 80px; height: 80px; display: flex; align-items: center; justify-content: center;"></div>
                 </div>
              </div>
           </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: start;">
           <button class="btn" id="shareBadgeBtn" style="width: 100%; height: 60px; font-size: 1.1rem; box-shadow: var(--shadow-lg);">
              <span>↗</span> Partager mon Badge sur LinkedIn
           </button>
           
           <div class="card" style="background: var(--gradient-main); color: white; border: none; box-shadow: var(--shadow-lg);">
              <h3 style="color: white; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
                 <span style="font-size: 1.5rem;">🌍</span> Inscription Officielle
              </h3>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                 <div>
                    <div style="font-size: 0.75rem; text-transform: uppercase; opacity: 0.8;">Événement</div>
                    <div style="font-weight: 700;">Carbo°RESET 2026</div>
                 </div>
                 <div>
                    <div style="font-size: 0.75rem; text-transform: uppercase; opacity: 0.8;">Statut</div>
                    <div style="font-weight: 700;">✅ Inscrit & Confirmé</div>
                 </div>
              </div>
           </div>
        </div>

        <div style="display: grid; grid-template-columns: 1.5fr 1fr; gap: 3rem;">
           <!-- TEAM CARD -->
           <div class="card">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                 <h3 style="color: var(--primary-dark);">👥 Mon Équipe</h3>
                 <div id="teamTag"></div>
              </div>
              <div id="teamSection">
                 <div id="noTeam" style="display: none; text-align: center; padding: 2rem;">
                    <button class="btn" id="createTeamBtn">Créer une Équipe</button>
                 </div>
                 <div id="teamActive" style="display: none;">
                    <h4 id="teamNameView" style="font-size: 1.25rem; font-weight: 800; color: var(--primary-color); margin-bottom: 1rem;">...</h4>
                    <div id="memberList"></div>
                    <div style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--border-color);">
                       <form id="inviteForm" style="display: flex; gap: 0.5rem;">
                          <input type="email" id="inviteEmail" required placeholder="email@exemple.com" style="flex: 1;">
                          <button type="submit" class="btn">Inviter</button>
                       </form>
                       <div id="inviteAlert" style="margin-top: 0.5rem;"></div>
                    </div>
                 </div>
              </div>
           </div>

           <!-- MODERN EVALUATION -->
           <div class="evaluation-card">
              <h3 style="color: var(--primary-dark); margin-bottom: 0.5rem; text-align: center;">⭐ Votre Avis</h3>
              <p style="color: var(--text-muted); font-size: 0.85rem; text-align: center; margin-bottom: 1.5rem;">Aidez-nous à améliorer l'expérience Carbo</p>
              
              <div id="feedbackResult"></div>
              <form id="feedbackForm">
                 <div class="star-rating">
                    <input type="radio" id="star5" name="rating" value="5"><label for="star5">★</label>
                    <input type="radio" id="star4" name="rating" value="4"><label for="star4">★</label>
                    <input type="radio" id="star3" name="rating" value="3"><label for="star3">★</label>
                    <input type="radio" id="star2" name="rating" value="2"><label for="star2">★</label>
                    <input type="radio" id="star1" name="rating" value="1"><label for="star1">★</label>
                 </div>
                 <textarea id="comments" rows="3" placeholder="Qu'avez-vous pensé de l'événement ?" style="width: 100%; padding: 1rem; border-radius: 12px; border: 1px solid var(--border-color); margin-bottom: 1.5rem; font-family: inherit; resize: none;"></textarea>
                 <button type="submit" class="btn" style="width: 100%; height: 50px; font-weight: 700;">Envoyer l'évaluation</button>
              </form>
           </div>
        </div>
      </div>
    </div>

    <!-- MODALS -->
    <div id="editProfileModal" class="modal-backdrop" style="display: none;">
       <div class="modal">
          <h2 style="margin-bottom: 1.5rem; color: var(--primary-dark);">Modifier le Profil</h2>
          <form id="editProfileForm">
             <div class="form-group" style="text-align: center;">
                <label>Photo de Profil (Format Badge)</label>
                <div style="margin-bottom: 1rem; display: flex; flex-direction: column; align-items: center;">
                   <div id="photoPreview" style="width: 100px; height: 100px; border-radius: 50%; background: #eee; overflow: hidden; margin-bottom: 0.5rem; border: 2px solid var(--primary-color);">
                      <img src="" style="width: 100%; height: 100%; object-fit: cover; display: none;">
                   </div>
                   <input type="file" id="editPhoto" accept="image/*" style="font-size: 0.75rem;">
                </div>
             </div>
             <div class="form-group">
                <label>Nom Complet</label>
                <input type="text" id="editName" required>
             </div>
             <div class="form-group">
                <label>Téléphone</label>
                <input type="text" id="editPhone">
             </div>
             <div class="form-group">
                <label>Bio (Visible par l'admin)</label>
                <textarea id="editBio" rows="2"></textarea>
             </div>
             <div style="display: flex; gap: 1rem; margin-top: 1rem;">
                <button type="button" class="btn btn-outline" style="flex: 1;" id="closeEditModal">Annuler</button>
                <button type="submit" class="btn" style="flex: 1;">Enregistrer</button>
             </div>
          </form>
       </div>
    </div>

    <!-- SOCIAL SHARE PREVIEW MODAL -->
    <div id="socialShareModal" class="modal-backdrop" style="display: none; z-index: 1005;">
       <div class="modal" style="max-width: 600px; padding: 0; background: #f3f2ef; overflow: hidden; border-radius: 12px;">
          <div style="background: white; padding: 1rem 1.5rem; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e0e0e0;">
             <h3 style="margin: 0; font-size: 1.1rem; color: #000000e6;">Aperçu du Post LinkedIn</h3>
             <button class="btn btn-outline" id="closeShareModal" style="padding: 0.3rem 0.6rem; border: none; font-size: 1.2rem;">&times;</button>
          </div>
          
          <div style="padding: 1rem;">
             <div style="background: white; border-radius: 8px; border: 1px solid #e0e0e0; box-shadow: 0 0 0 1px rgba(0,0,0,0.15), 0 2px 3px rgba(0,0,0,0.2);">
                <!-- Card Header -->
                <div style="padding: 0.75rem 1rem; display: flex; align-items: center; gap: 0.75rem;">
                   <div id="shareAvatar" style="width: 48px; height: 48px; border-radius: 50%; background: #eee; overflow: hidden; border: 1px solid #e0e0e0;"></div>
                   <div>
                      <div id="shareName" style="font-weight: 600; font-size: 0.9rem; color: #000000e6;">...</div>
                      <div style="font-size: 0.75rem; color: #00000099;">Participant à Carbo°RESET 2026 • À l'instant</div>
                   </div>
                </div>
                
                <!-- Card Text -->
                <div style="padding: 0 1rem 1rem 1rem; font-size: 0.85rem; color: #000000e6; line-height: 1.4;">
                   🚀 Je suis ravi d'annoncer ma participation au <b>Carbo°RESET 2026</b> à l'ESPRIT Tunis ! <br><br>
                   Prêt à relever le défi de la transition carbone avec les meilleurs innovateurs. Rejoignez-nous pour construire un avenir durable ! <br><br>
                   <span style="color: #0a66c2; font-weight: 600;">#CarboRESET2026 #Sustainability #Innovation #ESPRIT #GreenTech</span>
                </div>
                
                <!-- Visual Preview Image (generated card-like look) -->
                <div style="position: relative; background: var(--primary-dark); height: 250px; display: flex; overflow: hidden;">
                   <div style="position: absolute; top: 0; right: 0; bottom: 0; left: 0; background: linear-gradient(45deg, #064E3B 0%, #065F46 100%); opacity: 0.8;"></div>
                   <div style="position: relative; z-index: 1; width: 100%; padding: 2rem; display: flex; flex-direction: column; justify-content: center; align-items: center; color: white;">
                      <div style="display: flex; gap: 1rem; margin-bottom: 1rem;">
                         <img src="http://localhost:5000/uploads/assets/logo-carbo.png" style="height: 35px; filter: brightness(0) invert(1);">
                         <img src="http://localhost:5000/uploads/assets/logo-esprit.webp" style="height: 32px;">
                      </div>
                      <div style="font-size: 2rem; font-weight: 900; letter-spacing: -1px; text-align: center; line-height: 1.1;">SUMMIT 2026</div>
                      <div style="margin-top: 1rem; font-size: 0.9rem; letter-spacing: 2px; opacity: 0.8;">PARTICIPANT OFFICIEL</div>
                      <div style="margin-top: 0.5rem; color: #10B981; font-weight: 800; border-top: 1px solid rgba(255,255,255,0.2); padding-top: 0.5rem;">TUNISIA • 22-23 AVRIL</div>
                   </div>
                </div>
             </div>
          </div>
          
          <div style="padding: 1rem 1.5rem; background: white; border-top: 1px solid #e0e0e0; display: flex; gap: 1rem;">
             <button class="btn btn-outline" style="flex: 1;" id="copyPostTextBtn">Copier le Texte</button>
             <button class="btn" style="flex: 1.5; background: #0a66c2; border-color: #0a66c2;" id="confirmSocialShare">Partager maintenant</button>
          </div>
       </div>
    </div>

    <div id="createTeamModal" class="modal-backdrop" style="display: none;">
       <div class="modal">
          <h2 style="margin-bottom: 1.5rem; color: var(--primary-dark);">Créer votre Équipe</h2>
          <div id="createTeamStatus"></div>
          <form id="createTeamForm">
             <div class="form-group">
                <label>Nom de la nouvelle équipe</label>
                <input type="text" id="newTeamName" required placeholder="Ex: Les Innovateurs Verts" style="margin-bottom: 0.5rem;">
                <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 2rem;">Choisissez un nom percutant. Vous pourrez inviter vos coéquipiers juste après.</p>
             </div>
             <div style="display: flex; gap: 1rem;">
                <button type="button" class="btn btn-outline" style="flex: 1;" id="closeTeamModal">Annuler</button>
                <button type="submit" class="btn" style="flex: 1;" id="submitTeamBtn">Créer</button>
             </div>
          </form>
       </div>
    </div>

    <div id="selfScannerModal" class="modal-backdrop" style="display: none; z-index: 1000;">
       <div class="modal" style="max-width: 500px;">
          <h2 style="margin-bottom: 1rem; color: var(--primary-dark);">📸 Scannez l'Entrée</h2>
          <div id="scannerStatus"></div>
          <div id="qr-reader" style="width: 100%; border-radius: 12px; overflow: hidden; margin-bottom: 1.5rem;"></div>
          <button class="btn btn-outline" style="width: 100%;" id="closeSelfScanner">Annuler</button>
       </div>
    </div>

    <div id="removalReasonModal" class="modal-backdrop" style="display: none; z-index: 1000;">
       <div class="modal">
          <h2 style="margin-bottom: 1.5rem; color: var(--primary-dark);">Justification de Suppression</h2>
          <div id="removalStatus"></div>
          <form id="removalReasonForm">
             <input type="hidden" id="userToRemoveId">
             <textarea id="removalReason" rows="3" required placeholder="Motif de suppression..." style="margin-bottom: 1.5rem;"></textarea>
             <div style="display: flex; gap: 1rem;">
                <button type="button" class="btn btn-outline" style="flex: 1;" id="closeRemovalModal">Annuler</button>
                <button type="submit" class="btn" style="flex: 1; background: var(--error); border-color: var(--error);">Envoyer</button>
             </div>
          </form>
       </div>
    </div>
  `,
  afterRender: async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    let currentUser = null;

    const loadProfile = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/users/profile', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.success) {
                const u = data.user;
                currentUser = u;
                
                document.getElementById('badgeName').textContent = u.name;
                document.getElementById('badgeRole').textContent = u.role === 'admin' ? 'Organisateur' : 'Participant';
                
                const photoEl = document.getElementById('badgePhoto');
                const initialsEl = document.getElementById('badgeInitials');
                const previewImg = document.querySelector('#photoPreview img');
                
                if (u.profilePhoto) {
                    photoEl.src = `http://localhost:5000${u.profilePhoto}`;
                    photoEl.style.display = 'block';
                    initialsEl.style.display = 'none';
                    previewImg.src = `http://localhost:5000${u.profilePhoto}`;
                    previewImg.style.display = 'block';
                } else {
                    photoEl.style.display = 'none';
                    initialsEl.style.display = 'flex';
                    initialsEl.textContent = u.name.split(' ').map(n=>n[0]).join('').toUpperCase().slice(0,2);
                    previewImg.style.display = 'none';
                }

                document.getElementById('editName').value = u.name;
                document.getElementById('editPhone').value = u.phone || '';
                document.getElementById('editBio').value = u.bio || '';
            }
        } catch (e) { console.error(e); }
    };

    const loadTeamData = async () => {
        if (!currentUser) return;
        try {
            const res = await fetch('http://localhost:5000/api/teams/my-team', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.success) {
                const team = data.team;
                const isLeader = team.leader && team.leader._id ? team.leader._id === currentUser._id : false;
                document.getElementById('noTeam').style.display = 'none';
                document.getElementById('teamActive').style.display = 'block';
                document.getElementById('teamNameView').textContent = team.name;
                document.getElementById('teamTag').innerHTML = `<span style="background:rgba(16,185,129,0.1); color:var(--primary-color); padding:0.4rem 1rem; border-radius:99px; font-size:0.8rem; font-weight:800; border:1px solid rgba(16,185,129,0.2);">ACTIVE TEAM</span>`;
                
                const membersHtml = team.members.map(m => `
                    <div class="member-compact-card">
                        <div style="display:flex; align-items:center; gap:1rem;">
                            <div class="member-avatar">
                                ${m.profilePhoto ? `<img src="http://localhost:5000${m.profilePhoto}">` : `<span>${m.name[0]}</span>`}
                            </div>
                            <div>
                                <div style="font-weight:700; font-size:0.95rem; color:var(--primary-dark);">${m.name} ${m._id === currentUser._id ? '<span style="color:var(--primary-color); font-size:0.75rem;">(VOUS)</span>' : ''}</div>
                                <div style="font-size:0.75rem; color:var(--text-muted); opacity:0.8;">${m.email}</div>
                            </div>
                        </div>
                        <div style="display:flex; align-items:center; gap:1rem;">
                            ${m.attended ? '<span class="presence-badge present">PRÉSENT</span>' : '<span class="presence-badge">À VENIR</span>'}
                            ${m._id !== currentUser._id ? `
                                <button onclick="window.openRemovalRequest('${m._id}', '${m.name}')" class="btn-icon-delete" title="Retirer">
                                   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                </button>
                            ` : ''}
                        </div>
                    </div>
                `).join('');
                document.getElementById('memberList').innerHTML = membersHtml;
            } else {
                document.getElementById('noTeam').style.display = 'block';
                document.getElementById('teamActive').style.display = 'none';
            }
        } catch (e) { 
            console.error('Team Load Error:', e);
            document.getElementById('noTeam').style.display = 'block'; 
        }
    };

    const loadPageData = async () => {
        await loadProfile();
        await loadTeamData();
        loadQR();
    };

    const loadQR = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/events/qr', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.success) {
                document.getElementById('qrContainer').innerHTML = `<img src="${data.qrCode}" style="width:100%; height:100%; border-radius:4px;">`;
            }
        } catch (e) { console.error(e); }
    };

    // Events
    document.getElementById('openEditProfile').onclick = () => document.getElementById('editProfileModal').style.display = 'flex';
    document.getElementById('closeEditModal').onclick = () => document.getElementById('editProfileModal').style.display = 'none';

    document.getElementById('editProfileForm').onsubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', document.getElementById('editName').value);
        formData.append('phone', document.getElementById('editPhone').value);
        formData.append('bio', document.getElementById('editBio').value);
        
        const photo = document.getElementById('editPhoto').files[0];
        if (photo) formData.append('photo', photo);

        try {
            const res = await fetch('http://localhost:5000/api/users/profile', {
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${token}` },
                body: formData
            });
            if (res.ok) {
                document.getElementById('editProfileModal').style.display = 'none';
                loadProfile();
            }
        } catch (e) { console.error(e); }
    };

    document.getElementById('shareBadgeBtn').onclick = () => {
        const modal = document.getElementById('socialShareModal');
        document.getElementById('shareName').textContent = currentUser?.name || 'Utilisateur';
        const avatarContainer = document.getElementById('shareAvatar');
        if (currentUser?.profilePhoto) {
            avatarContainer.innerHTML = `<img src="http://localhost:5000${currentUser.profilePhoto}" style="width:100%; height:100%; object-fit:cover;">`;
        } else {
            avatarContainer.innerHTML = `<div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; font-weight:800; color:#0a66c2; background:#eef3f8;">${currentUser?.name[0]}</div>`;
        }
        modal.style.display = 'flex';
    };

    document.getElementById('closeShareModal').onclick = () => document.getElementById('socialShareModal').style.display = 'none';

    const shareText = `🚀 Je suis ravi d'annoncer ma participation au Carbo°RESET 2026 à l'ESPRIT Tunis ! Prêt à relever le défi de la transition carbone avec les meilleurs innovateurs. Rejoignez-nous pour construire un avenir durable ! #CarboRESET2026 #Sustainability #Innovation #ESPRIT #GreenTech`;

    document.getElementById('copyPostTextBtn').onclick = async () => {
        await navigator.clipboard.writeText(shareText);
        const btn = document.getElementById('copyPostTextBtn');
        const oldText = btn.textContent;
        btn.textContent = 'Copié ! ✅';
        setTimeout(() => btn.textContent = oldText, 2000);
    };

    document.getElementById('confirmSocialShare').onclick = async () => {
        const shareData = {
            title: 'Badge Officiel Carbo°RESET 2026',
            text: shareText,
            url: window.location.origin
        };
        try {
            await fetch('http://localhost:5000/api/users/badge/shared', { method: 'POST', headers: { 'Authorization': `Bearer ${token}` } });
            if (navigator.share) await navigator.share(shareData);
            else { 
                await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`); 
                alert('Lien et message copiés ! Vous pouvez maintenant les coller sur LinkedIn.'); 
            }
            document.getElementById('socialShareModal').style.display = 'none';
        } catch (e) { console.error(e); }
    };

    // Feedback Form (Star Rating)
    document.getElementById('feedbackForm').onsubmit = async (e) => {
        e.preventDefault();
        const rating = document.querySelector('input[name="rating"]:checked')?.value;
        const comments = document.getElementById('comments').value;
        
        if (!rating) { alert('Veuillez sélectionner une note.'); return; }

        try {
            const res = await fetch('http://localhost:5000/api/feedback', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ rating, comments })
            });
            if (res.ok) {
                document.getElementById('feedbackResult').innerHTML = `
                    <div style="text-align:center; padding:1rem; background:rgba(16,185,129,0.1); border-radius:12px; color:var(--success); border:1px solid var(--success); margin-bottom:1rem;">
                       <b>✨ Merci !</b> Votre avis a été enregistré.
                    </div>
                `;
                document.getElementById('feedbackForm').style.display = 'none';
            }
        } catch (e) { console.error(e); }
    };

    const selfScannerModal = document.getElementById('selfScannerModal');
    document.getElementById('openSelfScannerBtn').onclick = async () => {
        selfScannerModal.style.display = 'flex';
        const scanner = new Html5Qrcode("qr-reader");
        const onScanSuccess = async (text) => {
            await scanner.stop();
            const res = await fetch('http://localhost:5000/api/events/self-checkin', {
                method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ code: text })
            });
            const d = await res.json();
            if (d.success) { alert(d.message); selfScannerModal.style.display = 'none'; loadProfile(); }
        };
        scanner.start({ facingMode: "environment" }, { fps: 10, qrbox: 250 }, onScanSuccess).catch(e => {
            alert("Erreur Caméra. Veuillez autoriser l'accès.");
        });
    };
    document.getElementById('closeSelfScanner').onclick = () => selfScannerModal.style.display = 'none';

    document.getElementById('inviteForm').onsubmit = async (e) => {
        e.preventDefault();
        const email = document.getElementById('inviteEmail').value.trim();
        const alertBox = document.getElementById('inviteAlert');
        const btn = e.target.querySelector('button');
        
        try {
            btn.disabled = true;
            btn.textContent = '...';
            const res = await fetch('http://localhost:5000/api/teams/invite', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ email })
            });
            const data = await res.json();
            if (data.success) {
                alertBox.innerHTML = '<div style="color:var(--success); font-size:0.8rem; margin-top:0.5rem;">✅ Invitation envoyée !</div>';
                document.getElementById('inviteEmail').value = '';
                loadTeamData();
            } else {
                alertBox.innerHTML = `<div style="color:var(--error); font-size:0.8rem; margin-top:0.5rem;">⚠️ ${data.message}</div>`;
            }
        } catch (e) {
            console.error(e);
        } finally {
            btn.disabled = false;
            btn.textContent = 'Inviter';
        }
    };

    const createTeamModal = document.getElementById('createTeamModal');
    
    document.getElementById('createTeamBtn').onclick = () => {
        createTeamModal.style.display = 'flex';
    };
    
    document.getElementById('closeTeamModal').onclick = () => {
        createTeamModal.style.display = 'none';
        document.getElementById('newTeamName').value = '';
        document.getElementById('createTeamStatus').innerHTML = '';
    };

    document.getElementById('createTeamForm').onsubmit = async (e) => {
        e.preventDefault();
        const name = document.getElementById('newTeamName').value.trim();
        const statusBox = document.getElementById('createTeamStatus');
        const btn = document.getElementById('submitTeamBtn');
        
        if (!name) return;
        
        try {
            btn.disabled = true;
            btn.textContent = 'Création...';
            
            const res = await fetch('http://localhost:5000/api/teams', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ name })
            });
            const data = await res.json();
            
            if (data.success || res.ok) {
                createTeamModal.style.display = 'none';
                loadTeamData();
            } else {
                 statusBox.innerHTML = `<div class="alert alert-error" style="margin-bottom:1rem; font-size:0.8rem;">⚠️ ${data.message || 'Erreur lors de la création'}</div>`;
            }
        } catch (e) { 
            console.error(e);
            statusBox.innerHTML = `<div class="alert alert-error" style="margin-bottom:1rem; font-size:0.8rem;">⚠️ Erreur réseau : Impossible de contacter le serveur.</div>`;
        } finally {
            btn.disabled = false;
            btn.textContent = 'Créer';
        }
    };

    document.getElementById('removalReasonForm').onsubmit = async (e) => {
        e.preventDefault();
        const reason = document.getElementById('removalReason').value;
        const userToRemoveId = document.getElementById('userToRemoveId').value;
        try {
            const res = await fetch('http://localhost:5000/api/teams/remove-request', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ userToRemoveId, reason })
            });
            if (res.ok) {
                document.getElementById('removalReasonModal').style.display = 'none';
                alert('Demande de suppression envoyée à l\'admin.');
            }
        } catch (e) { console.error(e); }
    };

    window.openRemovalRequest = (userId) => {
        document.getElementById('userToRemoveId').value = userId;
        document.getElementById('removalReasonModal').style.display = 'flex';
    };
    document.getElementById('closeRemovalModal').onclick = () => document.getElementById('removalReasonModal').style.display = 'none';

    loadPageData();
  }
};
