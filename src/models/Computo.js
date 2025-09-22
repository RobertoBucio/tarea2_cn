const mongoose = require('mongoose');

const computoSchema = new mongoose.Schema({
  marca: String,
  modelo: String,
  descripcion: String,
  precio: Number,
  stock: Number
}, { timestamps: true });

module.exports = mongoose.model('Computo', computoSchema);
