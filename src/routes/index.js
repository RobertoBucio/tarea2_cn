// src/routes/index.js
const express = require('express');
const router = express.Router();

// GET home page
router.get('/', (req, res) => {
  res.render('index'); // renderiza views/index.ejs
});

// si quieres manejar el POST del form directamente:
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  // valida, autentica o redirige...
  // por ahora return json para pruebas
  if (!email || !password) return res.status(400).json({ error: 'Faltan campos' });
  res.json({ email, password });
});

module.exports = router;
