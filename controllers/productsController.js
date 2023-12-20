const Products = require('../models/productsModel');

exports.getAllProducts = async (req, res) => {
  const products = await Products.find();
  try {
    res.status(200).json({
      status: "sucessful",
      data: {
        products
      }
    })
  } catch (err) {
    res.status(404).json({
      status: "Fail",
      message: err
    })
  }
}

exports.createProduct = async (req, res) => {
  const newProduct = await Products.create(req.body);
  try {
    res.status(200).json({
      status: "sucessful",
      data: {newProduct}
    })
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: err || 'error'
    })
  }
}

exports.updateProduct = async (req, res) => {
  try {
    const UpdatedProduct = await Products.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      status: "success",
      data: {
        UpdatedProduct
      }
    })
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: err || 'error'
    })
  }
 
}

exports.getProduct = async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);

    res.status(200).json({
      status: "success",
      data: {
        product
      }
    })
  } catch (err) {
    res.status(404).json({
      status: "Fail",
      message: err || 'error'
    })
  }
}

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Products.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
      data: {
        product: null
      }
    })
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: err || 'error'
    })
  }
}

