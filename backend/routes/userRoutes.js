const express = require('express');
const router = express.Router();
const { getProfile, updateProfile, getBadge, markBadgeShared, getAllUsers, getAdminStats, getRemovalRequests, handleRemovalRequest, adminUpdateUser } = require('../controllers/userController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: 'uploads/profiles/',
  filename: (req, file, cb) => {
    cb(null, `${req.user.id}-${Date.now()}${path.extname(file.originalname)}`);
  }
});
const upload = multer({ storage });

router.get('/profile', verifyToken, getProfile);
router.put('/profile', verifyToken, upload.single('photo'), updateProfile);
router.get('/badge', verifyToken, getBadge);
router.post('/badge/shared', verifyToken, markBadgeShared);
router.get('/admin/stats', verifyToken, isAdmin, getAdminStats);
router.get('/admin/removal-requests', verifyToken, isAdmin, getRemovalRequests);
router.post('/admin/removal-requests/handle', verifyToken, isAdmin, handleRemovalRequest);
router.post('/admin/update-user', verifyToken, isAdmin, adminUpdateUser);
router.get('/', verifyToken, isAdmin, getAllUsers);

module.exports = router;
