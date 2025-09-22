const mongoose = require('mongoose');

const ComputoSchema = new mongoose.Schema({
marca: { type: String, required: true },
modelo: { type: String, required: true },
descripcion: { type: String },
precio: { type: Number, required: true },
stock: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Computo', ComputoSchema);