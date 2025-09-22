const express = require('express');
const router = express.Router();
const protect = require('../middlewares/authMiddleware');
const {
  createComputo,
  getComputos,
  getComputoById,
  updateComputo,
  deleteComputo
} = require('../controllers/computoController');

router.get('/', getComputos);
router.post('/', protect, createComputo);
router.get('/:id', getComputoById);
router.put('/:id', protect, updateComputo);
router.delete('/:id', protect, deleteComputo);

module.exports = router;
