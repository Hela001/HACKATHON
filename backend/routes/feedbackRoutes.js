const express = require('express');
const router = express.Router();
const { submitFeedback, getAllFeedback } = require('../controllers/feedbackController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

router.post('/', verifyToken, submitFeedback);
router.get('/', verifyToken, isAdmin, getAllFeedback);

module.exports = router;
