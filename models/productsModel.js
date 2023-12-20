const mongoose = require("mongoose");

const productsScheme = new mongoose.Schema({
  title: {
    type: String,
    require: [true, 'A product must have a title']
  },
  description: {
    type: String,
    require: [true, 'A product must have a description']
  },
  colors:{
    type: [String],
    require: [true, 'A product must have a color']
  },
  sizes:{
    type: [String],
    require: [true, 'A product must have a size']
  },
  category: {
    type: String,
    require: [true, 'A product must have a size']
  }, 
  stock: {
    type: String,
    require: [true, 'A product must have a stock']
  },
  price:{
    type: Number,
    require: [true, 'A product must have a price']
  },
  pictures:{
    type: [String],
    default: 'https://codigogenesis.com/genesis/2022/04/imagen-placeholder-por-defecto-WooCommerce.png' ,
    require: [true, 'A product must have at least one picture']
  }
});

const Products = mongoose.model('Products', productsScheme);

module.exports = Products;