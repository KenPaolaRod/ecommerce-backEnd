const express = require('express');
const productController = require('./../controllers/productsController');

const router = express.Router();

router.route('/').get(productController.getAllProducts).post(productController.createProduct);
router.route('/:id').patch(productController.updateProduct).get(productController.getProduct).delete(productController.deleteProduct)

module.exports = router