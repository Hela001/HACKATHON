const express = require('express');
const router = express.Router();
const { getAgenda, createAgendaItem, importAgenda, deleteAgendaItem } = require('../controllers/agendaController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.get('/', getAgenda);
router.post('/', verifyToken, isAdmin, createAgendaItem);
router.post('/import', verifyToken, isAdmin, upload.single('file'), importAgenda);
router.delete('/:id', verifyToken, isAdmin, deleteAgendaItem);

module.exports = router;
