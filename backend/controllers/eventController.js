const Event = require('../models/Event');
const User = require('../models/User');
const Scan = require('../models/Scan');
const qrcode = require('qrcode');

exports.getProgramme = async (req, res) => {
  try {
    let event = await Event.findOne();
    if (!event) {
      // Mock data based on the concept note
      event = new Event({
        title: 'Carbo°RESET 2026',
        programme: [
          { time: '09:00', title: 'Accueil & Inscription', speakers: [], description: 'Badges and coffee' },
          { time: '09:30', title: 'Cérémonie d\'ouverture', speakers: ['Organizers'], description: 'Introduction to Carbo°RESET' },
        ]
      });
      await event.save();
    }
    res.status(200).json({ success: true, event });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.generateAttendanceQR = async (req, res) => {
  try {
    const userId = req.user.id;
    // The QR code contains the user ID as its data
    const qrCodeDataURL = await qrcode.toDataURL(userId);
    res.status(200).json({ success: true, qrCode: qrCodeDataURL });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.scanAttendanceQR = async (req, res) => {
  try {
    const { scannedUserId } = req.body;
    
    const user = await User.findById(scannedUserId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (user.attended) {
      return res.status(400).json({ success: false, message: 'User already checked in' });
    }

    user.attended = true;
    await user.save();

    // Record the scan in history
    const scan = new Scan({
      userId: user._id,
      adminId: req.user.id,
      location: 'Main Entrance'
    });
    await scan.save();

    res.status(200).json({ success: true, message: 'Attendance marked successfully', user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};const MASTER_CODE = 'CARBO_RESET_2026_ENTRY';

exports.selfCheckIn = async (req, res) => {
  try {
    const { code } = req.body;
    
    if (code !== MASTER_CODE) {
      return res.status(400).json({ success: false, message: 'Code QR invalide pour cet événement.' });
    }

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });

    if (user.attended) {
      return res.status(200).json({ success: true, message: 'Vous êtes déjà marqué comme présent.', user });
    }

    user.attended = true;
    await user.save();

    // Record the scan in history
    const scan = new Scan({
      userId: user._id,
      adminId: null, // Self scan
      location: 'Self-Checkin Zone'
    });
    await scan.save();

    res.status(200).json({ success: true, message: 'Pointage réussi ! Bienvenue à Carbo°RESET 2026.', user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
