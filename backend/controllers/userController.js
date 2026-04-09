const User = require('../models/User');
const Team = require('../models/Team');
const Scan = require('../models/Scan');
const RemovalRequest = require('../models/RemovalRequest');

// Get all pending removal requests
exports.getRemovalRequests = async (req, res) => {
    try {
        const requests = await RemovalRequest.find({ status: 'pending' })
            .populate('teamId', 'name')
            .populate('requester', 'name email')
            .populate('userToRemove', 'name email');
        res.status(200).json({ success: true, requests });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Handle removal request (Approve/Reject)
exports.handleRemovalRequest = async (req, res) => {
    try {
        const { requestId, action } = req.body; // action: 'approve' or 'reject'
        const request = await RemovalRequest.findById(requestId);
        if (!request) return res.status(404).json({ success: false, message: 'Request not found' });

        if (action === 'approve') {
            const team = await Team.findById(request.teamId);
            if (team) {
                // Remove member from team members list
                team.members = team.members.filter(m => m.toString() !== request.userToRemove.toString());
                await team.save();

                // Reset user's teamId
                await User.findByIdAndUpdate(request.userToRemove, { teamId: null });
            }
            request.status = 'approved';
        } else {
            request.status = 'rejected';
        }

        await request.save();
        res.status(200).json({ success: true, message: `Request ${action}d successfully` });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password').populate('teamId');
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, phone, bio } = req.body;
    const updateData = { name, phone, bio };
    
    if (req.file) {
      updateData.profilePhoto = `/uploads/profiles/${req.file.filename}`;
    }

    const user = await User.findByIdAndUpdate(req.user.id, updateData, { new: true }).select('-password');
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Admin: Update any user badge/profile info
exports.adminUpdateUser = async (req, res) => {
    try {
        const { userId, name, role, attended } = req.body;
        const updateData = {};
        if (name !== undefined) updateData.name = name;
        if (role !== undefined) updateData.role = role;
        if (attended !== undefined) updateData.attended = attended;

        const user = await User.findByIdAndUpdate(userId, updateData, { new: true }).select('-password');
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });

        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getAdminStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments({ role: 'audience' });
        const attendedUsers = await User.countDocuments({ role: 'audience', attended: true });
        const totalTeams = await Team.countDocuments();
        
        // Bonus: Presence trend (last 24h)
        const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        const recentScans = await Scan.countDocuments({ timestamp: { $gte: dayAgo } });

        res.status(200).json({
            success: true,
            stats: {
                totalUsers,
                attendedUsers,
                totalTeams,
                recentScans
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getBadge = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('name role badgeShared');
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    
    const badgeDetails = {
      eventName: 'Carbo°RESET 2026',
      userName: user.name,
      role: user.role,
      isShared: user.badgeShared,
    };
    res.status(200).json({ success: true, badge: badgeDetails });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.markBadgeShared = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user.id, { badgeShared: true }, { returnDocument: 'after' });
    res.status(200).json({ success: true, message: 'Badge marked as shared', badgeShared: user.badgeShared });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').populate('teamId');
    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
