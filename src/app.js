const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/database');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conectar MongoDB
connectDB();

// Configurar EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

// Rutas
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/computos', require('./routes/computoRoutes'));

// Rutas para renderizar EJS
app.get('/', (req, res) => res.render('index'));
app.get('/register', (req, res) => res.render('register'));
app.get('/computos', (req, res) => res.render('computos'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
