const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/computoController');
const authMiddleware = require('../middlewares/authMiddleware');

// CRUD (protegido)
router.post('/', authMiddleware, ctrl.create);
router.get('/', ctrl.list);
router.get('/:id', ctrl.getById);
router.put('/:id', authMiddleware, ctrl.update);
router.delete('/:id', authMiddleware, ctrl.remove);

module.exports = router;