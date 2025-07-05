const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');
const { 
  authMiddleware, 
  requireUserOrAdmin, 
  requireAdmin 
} = require('../middleware/authMiddleware');
const { 
  validateProduct, 
  validateProductUpdate, 
  validateId, 
  validateProductQuery 
} = require('../middleware/validationMiddleware');
const { asyncHandler } = require('../middleware/errorMiddleware');

// GET /api/products - Get all products with pagination, sorting, and search (public)
router.get('/', validateProductQuery, asyncHandler(getProducts));

// GET /api/products/:id - Get single product (public)
router.get('/:id', validateId, asyncHandler(getProduct));

// POST /api/products - Create new product (authenticated users only)
router.post('/', authMiddleware, requireUserOrAdmin, validateProduct, asyncHandler(createProduct));

// PUT /api/products/:id - Update product (authenticated users only)
router.put('/:id', authMiddleware, requireUserOrAdmin, validateId, validateProductUpdate, asyncHandler(updateProduct));

// DELETE /api/products/:id - Delete product (admin only)
router.delete('/:id', authMiddleware, requireAdmin, validateId, asyncHandler(deleteProduct));

module.exports = router; 