const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  mainImg: { type: String },
  carousel: { type: Array },
  sizes: { type: Array },
  category: { type: String },
  gender: { type: String },
  price: { type: Number },
  discount: { type: Number }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
