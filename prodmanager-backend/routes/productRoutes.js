const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');

// Apply auth middleware to all product routes
router.use(authMiddleware);

// GET /api/products - Get all products with pagination, sorting, and search
router.get('/', getProducts);

// GET /api/products/:id - Get single product
router.get('/:id', getProduct);

// POST /api/products - Create new product
router.post('/', createProduct);

// PUT /api/products/:id - Update product
router.put('/:id', updateProduct);

// DELETE /api/products/:id - Delete product
router.delete('/:id', deleteProduct);

module.exports = router; 