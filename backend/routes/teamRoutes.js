const express = require('express');
const router = express.Router();
const { createTeam, inviteMember, getTeam, getAllTeams, adminCreateTeam, importTeams, requestMemberRemoval } = require('../controllers/teamController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.get('/', verifyToken, isAdmin, getAllTeams);
router.get('/my-team', verifyToken, getTeam);
router.post('/', verifyToken, createTeam);
router.post('/invite', verifyToken, inviteMember);
router.post('/remove-request', verifyToken, requestMemberRemoval);
router.post('/admin-create', verifyToken, isAdmin, adminCreateTeam);
router.post('/import', verifyToken, isAdmin, upload.single('file'), importTeams);

module.exports = router;
