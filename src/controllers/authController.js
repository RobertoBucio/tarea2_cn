const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    const payload = { id: user._id, email: user.email, role: user.role };
    return jwt.sign(payload, process.env.JWT_SECRET || 'change_this_secret', { expiresIn: process.env.TOKEN_EXPIRES_IN || '7d' });
};

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) return res.status(400).json({ ok: false, error: 'Faltan campos' });  

        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ ok: false, error: 'Usuario ya existe' });

        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);

        const user = new User({ name, email, password: hashed });
        await user.save();

        const token = generateToken(user);
        res.status(201).json({ ok: true, data: { user: { id: user._id, name: user.name, email: user.email }, token } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ ok: false, error: 'Error del servidor' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ ok: false, error: 'Faltan campos' });

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ ok: false, error: 'Credenciales inválidas' });
        
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ ok: false, error: 'Credenciales inválidas' });


        const token = generateToken(user);
        res.json({ ok: true, data: { user: { id: user._id, name: user.name, email: user.email }, token } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ ok: false, error: 'Error del servidor' });
    }
};

exports.me = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json({ ok: true, data: user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ ok: false, error: 'Error del servidor' });
    }
};