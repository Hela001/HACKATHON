const express = require('express');
const router = express.Router();
const { getProgramme, generateAttendanceQR, scanAttendanceQR, selfCheckIn } = require('../controllers/eventController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

router.get('/programme', getProgramme);
router.get('/qr', verifyToken, generateAttendanceQR);
router.post('/qr/scan', verifyToken, isAdmin, scanAttendanceQR);
router.post('/self-checkin', verifyToken, selfCheckIn);

module.exports = router;
