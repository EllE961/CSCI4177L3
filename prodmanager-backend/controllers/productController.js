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
    
    // Pass error to error handler middleware
    throw error;
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
    
    // Pass error to error handler middleware
    throw error;
  }
};

// Create new product
const createProduct = async (req, res) => {
  try {
    const { title, description, price, image } = req.body;

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
    
    // Pass error to error handler middleware
    throw error;
  }
};

// Update product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price, image } = req.body;

    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Update product with provided fields
    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (price !== undefined) updateData.price = parseFloat(price);
    if (image !== undefined) updateData.image = image;

    await product.update(updateData);

    res.status(200).json({
      success: true,
      data: product,
      message: 'Product updated successfully'
    });
  } catch (error) {
    console.error('Error updating product:', error);
    
    // Pass error to error handler middleware
    throw error;
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
    
    // Pass error to error handler middleware
    throw error;
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
}; 