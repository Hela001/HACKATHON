const Team = require('../models/Team');
const User = require('../models/User');
const RemovalRequest = require('../models/RemovalRequest');
const sendEmail = require('../utils/sendEmail');

// Request member removal (Any Member)
exports.requestMemberRemoval = async (req, res) => {
    try {
        const { userToRemoveId, reason } = req.body;
        const team = await Team.findOne({ members: req.user.id });
        
        if (!team) {
            return res.status(403).json({ success: false, message: 'You must be a team member to request removals' });
        }

        if (!team.members.includes(userToRemoveId)) {
            return res.status(400).json({ success: false, message: 'User is not a member of your team' });
        }

        if (userToRemoveId === req.user.id) {
            return res.status(400).json({ success: false, message: 'You cannot remove yourself this way' });
        }

        // Check for existing pending request
        const existing = await RemovalRequest.findOne({ 
            teamId: team._id, 
            userToRemove: userToRemoveId, 
            status: 'pending' 
        });

        if (existing) {
            return res.status(400).json({ success: false, message: 'A removal request is already pending for this member' });
        }

        const request = new RemovalRequest({
            teamId: team._id,
            requester: req.user.id,
            userToRemove: userToRemoveId,
            reason
        });

        await request.save();
        res.status(201).json({ success: true, message: 'Removal request submitted to admin for approval' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Create a new team
exports.createTeam = async (req, res) => {
  try {
    const { name } = req.body;
    const existingTeam = await Team.findOne({ name });
    if (existingTeam) {
      return res.status(400).json({ success: false, message: 'Team name already exists' });
    }

    const team = new Team({
      name,
      leader: req.user.id,
      members: [req.user.id]
    });

    await team.save();

    // Update user with teamId
    await User.findByIdAndUpdate(req.user.id, { teamId: team._id });

    res.status(201).json({ success: true, team });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Invite a member to the team
exports.inviteMember = async (req, res) => {
  try {
    const { email } = req.body;
    const team = await Team.findOne({ members: req.user.id });
    if (!team) {
      return res.status(404).json({ success: false, message: 'Team not found or you are not a member' });
    }

    // Check if user already exists
    let user = await User.findOne({ email });
    
    if (!user) {
        // Create a placeholder user
        // Note: In production, generate a random temporary password or invite link
        const tempPassword = Math.random().toString(36).slice(-8);
        user = new User({
            name: email.split('@')[0],
            email,
            password: tempPassword, // Will be hashed by pre-save
            isInvited: true,
            teamId: team._id
        });
        await user.save();
        
        // Send email invitation
        const joinLink = `http://localhost:5173/reset-password?email=${email}`; // Reusing reset for setup
        const html = `
            <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                <h2 style="color: #064E3B;">Invitation Carbo°RESET</h2>
                <p>Hello,</p>
                <p>You have been invited to join the team <b>${team.name}</b> for the Carbo°RESET 2026 hackathon!</p>
                <p>Click below to complete your registration and set your password:</p>
                <a href="${joinLink}" style="background: #059669; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0;">Join the Team</a>
                <p>If you have any questions, contact your team leader.</p>
            </div>
        `;
        
        sendEmail({
            email,
            subject: `Invitation to join team ${team.name} - Carbo°RESET`,
            html
        }).catch(err => console.error('Invitation Email Error:', err));
    } else {
        // User exists, check if already in a team
        if (user.teamId) {
            return res.status(400).json({ success: false, message: 'User is already in a team' });
        }
        user.teamId = team._id;
        await user.save();
    }

    // Add to pending or members
    if (!team.members.includes(user._id)) {
        team.members.push(user._id);
        await team.save();
    }

    res.status(200).json({ success: true, message: 'Invite sent successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get team details
exports.getTeam = async (req, res) => {
  try {
    const team = await Team.findOne({ members: req.user.id })
      .populate('leader', 'name email')
      .populate('members', 'name email attended');
    
    if (!team) {
      return res.status(404).json({ success: false, message: 'No team found' });
    }
    
    res.status(200).json({ success: true, team });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

// Get all teams (Admin only)
exports.getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find()
      .populate('leader', 'name email phone')
      .populate('members', 'name email phone bio attended');
    res.status(200).json({ success: true, teams });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Helper to send invitation emails
const sendInvitationEmail = async (email, teamName, isLeader = false) => {
    const joinLink = `http://localhost:5173/reset-password?email=${email}`;
    const html = `
        <div style="font-family: sans-serif; padding: 30px; border: 1px solid #e1e8f0; border-radius: 16px; max-width: 600px; margin: auto;">
            <div style="text-align: center; margin-bottom: 2rem;">
                <h1 style="color: #064E3B; margin-bottom: 0.5rem;">Carbo°RESET 2026</h1>
                <div style="height: 2px; background: #10B981; width: 60px; margin: auto;"></div>
            </div>
            <p>Bonjour,</p>
            <p>Vous avez été ajouté à l'événement <b>Carbo°RESET 2026</b> en tant que membre de l'équipe <b>${teamName}</b> ${isLeader ? '(Leader)' : ''}.</p>
            <p>Pour accéder à votre espace participant et générer votre badge premium, veuillez cliquer sur le bouton ci-dessous pour configurer votre mot de passe :</p>
            <div style="text-align: center; margin: 30px 0;">
                <a href="${joinLink}" style="background: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 700; display: inline-block;">Accéder à mon Espace</a>
            </div>
            <p style="color: #64748b; font-size: 0.85rem;">Si vous avez des questions, rendez-vous sur le site officiel de l'événement.</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 2rem 0;">
            <p style="font-size: 0.75rem; color: #94a3b8; text-align: center;">© 2026 Carbo°RESET • Transition Carbone & Innovation</p>
        </div>
    `;
    
    try {
        await sendEmail({
            email,
            subject: `Votre accès Carbo°RESET 2026 - Équipe ${teamName}`,
            html
        });
    } catch (e) {
        console.error(`Failed to send email to ${email}:`, e.message);
    }
};

// Admin: Create team manually
exports.adminCreateTeam = async (req, res) => {
    try {
        const { name, leaderEmail, memberEmails } = req.body;
        
        // 1. Check if team name already exists
        const existingTeam = await Team.findOne({ name });
        if (existingTeam) {
            return res.status(400).json({ success: false, message: `L'équipe "${name}" existe déjà.` });
        }

        let leaderCreated = false;
        let leader = await User.findOne({ email: leaderEmail });
        if (!leader) {
            leader = new User({ 
                name: leaderEmail.split('@')[0], 
                email: leaderEmail, 
                password: Math.random().toString(36).slice(-10),
                isInvited: true 
            });
            await leader.save();
            leaderCreated = true;
        } else if (leader.teamId) {
            return res.status(400).json({ success: false, message: `Le leader (${leaderEmail}) appartient déjà à une équipe.` });
        }

        const team = new Team({
            name,
            leader: leader._id,
            members: [leader._id]
        });

        if (leaderCreated) sendInvitationEmail(leaderEmail, name, true);

        // Add members
        if (memberEmails && memberEmails.length > 0) {
            for (const email of memberEmails) {
                let memberCreated = false;
                let member = await User.findOne({ email });
                if (!member) {
                    member = new User({ 
                        name: email.split('@')[0], 
                        email, 
                        password: Math.random().toString(36).slice(-10),
                        isInvited: true 
                    });
                    await member.save();
                    memberCreated = true;
                }
                if (!team.members.includes(member._id)) team.members.push(member._id);
                member.teamId = team._id;
                await member.save();
                if (memberCreated) sendInvitationEmail(email, name, false);
            }
        }

        leader.teamId = team._id;
        await leader.save();
        await team.save();

        res.status(201).json({ success: true, team });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Admin: Bulk Import from Excel
exports.importTeams = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });

        const filePath = req.file.path;
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const rows = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

        let createdCount = 0;
        let errors = [];

        for (const row of rows) {
            try {
                const name = row['Nom Équipe'] || row['Team Name'];
                const leaderEmail = row['Email Leader'] || row['Leader Email'];
                const memberString = row['Membres'] || row['Members'] || '';
                const memberEmails = memberString.split(',').map(e => e.trim()).filter(e => e);

                if (!name || !leaderEmail) continue;

                await bulkCreateTeam(name, leaderEmail, memberEmails);
                createdCount++;
            } catch (e) {
                errors.push(`${row['Nom Équipe']}: ${e.message}`);
            }
        }

        fs.unlinkSync(filePath);
        res.status(200).json({ 
            success: true, 
            message: `${createdCount} teams imported successfully`,
            errors: errors.length > 0 ? errors : null
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Helper for bulk creation
async function bulkCreateTeam(name, leaderEmail, memberEmails) {
    let leaderCreated = false;
    let leader = await User.findOne({ email: leaderEmail });
    if (!leader) {
        leader = new User({ 
            name: leaderEmail.split('@')[0], 
            email: leaderEmail, 
            password: Math.random().toString(36).slice(-10),
            isInvited: true 
        });
        await leader.save();
        leaderCreated = true;
    }

    let team = await Team.findOne({ name });
    if (team) throw new Error('Team already exists');

    team = new Team({ name, leader: leader._id, members: [leader._id] });
    if (leaderCreated) sendInvitationEmail(leaderEmail, name, true);

    for (const email of memberEmails) {
        let memberCreated = false;
        let member = await User.findOne({ email });
        if (!member) {
            member = new User({ 
                name: email.split('@')[0], 
                email, 
                password: Math.random().toString(36).slice(-10),
                isInvited: true 
            });
            await member.save();
            memberCreated = true;
        }
        if (!team.members.includes(member._id)) team.members.push(member._id);
        member.teamId = team._id;
        await member.save();
        if (memberCreated) sendInvitationEmail(email, name, false);
    }

    leader.teamId = team._id;
    await leader.save();
    await team.save();
}
