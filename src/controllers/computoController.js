const Computo = require('../models/Computo');

exports.createComputo = async (req, res) => {
  try {
    const computo = await Computo.create(req.body);
    res.status(201).json(computo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getComputos = async (req, res) => {
  const computos = await Computo.find();
  res.json(computos);
};

exports.getComputoById = async (req, res) => {
  const computo = await Computo.findById(req.params.id);
  if (!computo) return res.status(404).json({ message: 'No encontrado' });
  res.json(computo);
};

exports.updateComputo = async (req, res) => {
  const computo = await Computo.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(computo);
};

exports.deleteComputo = async (req, res) => {
  await Computo.findByIdAndDelete(req.params.id);
  res.json({ message: 'Computo eliminado' });
};
