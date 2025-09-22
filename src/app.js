require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');

const authRoutes = require('./routes/authRoutes');
const computoRoutes = require('./routes/computoRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Conectar DB
connectDB();

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/computos', computoRoutes);

app.get('/', (req, res) => res.send('UGTO - API unificada: /api/auth /api/computos'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));