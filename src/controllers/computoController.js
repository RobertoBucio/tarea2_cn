const Computo = require('../models/Computo');

exports.create = async (req, res) => {
    try {
        const body = req.body;
        const c = new Computo(body);
        await c.save();
        res.status(201).json({ ok: true, data: c });
    } catch (err) {
        console.error(err);
        res.status(500).json({ ok: false, error: 'Error creando computo' });
    }
};

exports.list = async (req, res) => {
    try {
        const items = await Computo.find();
        res.json({ ok: true, data: items });
    } catch (err) {
        console.error(err);
        res.status(500).json({ ok: false, error: 'Error listando computos' });
    }
};

exports.getById = async (req, res) => {
    try {
        const item = await Computo.findById(req.params.id);
        if (!item) return res.status(404).json({ ok: false, error: 'No encontrado' });
        res.json({ ok: true, data: item });
    } catch (err) {
        console.error(err);
        res.status(500).json({ ok: false, error: 'Error obteniendo computo' });
    }
};

exports.update = async (req, res) => {
    try {
        const item = await Computo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!item) return res.status(404).json({ ok: false, error: 'No encontrado' });
        res.json({ ok: true, data: item });
    } catch (err) {
        console.error(err);
        res.status(500).json({ ok: false, error: 'Error actualizando computo' });
    }
};

exports.remove = async (req, res) => {
    try {
        const item = await Computo.findByIdAndDelete(req.params.id);
        if (!item) return res.status(404).json({ ok: false, error: 'No encontrado' });
        res.json({ ok: true, data: item });
    } catch (err) {
        console.error(err);
        res.status(500).json({ ok: false, error: 'Error eliminando computo' });
    }
};