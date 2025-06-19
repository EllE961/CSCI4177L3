const { Product } = require('../models');
const { Op } = require('sequelize');

// Get all products with pagination, sorting, and search
const getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const sort = req.query.sort || 'createdAt';
    const order = req.query.order || 'DESC';
    const keyword = req.query.keyword;

    // Build where clause for search
    const where = {};
    if (keyword) {
      where[Op.or] = [
        { title: { [Op.iLike]: `%${keyword}%` } },
        { description: { [Op.iLike]: `%${keyword}%` } }
      ];
    }

    // Build order clause
    const orderClause = [[sort, order.toUpperCase()]];

    // Get products with pagination
    const { count, rows } = await Product.findAndCountAll({
      where,
      limit,
      offset,
      order: orderClause,
    });

    // Calculate pagination info
    const totalPages = Math.ceil(count / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    res.status(200).json({
      success: true,
      data: rows,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: count,
        itemsPerPage: limit,
        hasNextPage,
        hasPrevPage
      },
      message: 'Products fetched successfully'
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching products',
      error: error.message
    });
  }
};

// Get single product by ID
const getProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      data: product,
      message: 'Product fetched successfully'
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching product',
      error: error.message
    });
  }
};

// Create new product
const createProduct = async (req, res) => {
  try {
    const { title, description, price, image } = req.body;

    // Basic validation
    if (!title || !description || price === undefined || !image) {
      return res.status(400).json({
        success: false,
        message: 'All fields (title, description, price, image) are required'
      });
    }

    const product = await Product.create({
      title,
      description,
      price: parseFloat(price),
      image
    });

    res.status(201).json({
      success: true,
      data: product,
      message: 'Product created successfully'
    });
  } catch (error) {
    console.error('Error creating product:', error);

    // Handle Sequelize validation errors
    if (error.name === 'SequelizeValidationError') {
      const validationErrors = error.errors.map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: validationErrors
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while creating product',
      error: error.message
    });
  }
};

// Update product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price, image } = req.body;

    // Basic validation
    if (!title || !description || price === undefined || !image) {
      return res.status(400).json({
        success: false,
        message: 'All fields (title, description, price, image) are required'
      });
    }

    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Update product
    await product.update({
      title,
      description,
      price: parseFloat(price),
      image
    });

    res.status(200).json({
      success: true,
      data: product,
      message: 'Product updated successfully'
    });
  } catch (error) {
    console.error('Error updating product:', error);

    // Handle Sequelize validation errors
    if (error.name === 'SequelizeValidationError') {
      const validationErrors = error.errors.map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: validationErrors
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while updating product',
      error: error.message
    });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    await product.destroy();

    res.status(200).json({
      success: true,
      data: product,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting product',
      error: error.message
    });
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
}; 