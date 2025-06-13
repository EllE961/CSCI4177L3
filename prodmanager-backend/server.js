const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const Product = require("./models/Product");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Connected to MongoDB successfully");
    // Seed some initial data if the collection is empty
    seedInitialData();
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  });

// Seed initial data function
const seedInitialData = async () => {
  try {
    const count = await Product.countDocuments();
    if (count === 0) {
      const initialProducts = [
        {
          title: "MacBook Pro",
          image:
            "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400",
          description: "High-performance laptop for professionals",
          price: 1999.99,
        },
        {
          title: "iPhone 15",
          image:
            "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400",
          description: "Latest smartphone with advanced features",
          price: 999.99,
        },
        {
          title: "AirPods Pro",
          image:
            "https://images.unsplash.com/photo-1606220838315-056192d5e927?w=400",
          description: "Wireless earbuds with noise cancellation",
          price: 249.99,
        },
      ];

      await Product.insertMany(initialProducts);
      console.log("📦 Initial products seeded successfully");
    }
  } catch (error) {
    console.error("❌ Error seeding initial data:", error.message);
  }
};

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ProdManager API",
      version: "1.0.0",
      description: "Product Management API for MERN stack application",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: "Development server",
      },
    ],
  },
  apis: ["./server.js"], // Path to the API docs
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - title
 *         - image
 *         - description
 *         - price
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the product
 *         title:
 *           type: string
 *           description: The product title
 *         image:
 *           type: string
 *           description: The product image URL
 *         description:
 *           type: string
 *           description: The product description
 *         price:
 *           type: number
 *           description: The product price
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the product was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the product was last updated
 *       example:
 *         _id: "507f1f77bcf86cd799439011"
 *         title: "MacBook Pro"
 *         image: "https://example.com/image.jpg"
 *         description: "High-performance laptop"
 *         price: 1999.99
 *         createdAt: "2023-01-01T00:00:00.000Z"
 *         updatedAt: "2023-01-01T00:00:00.000Z"
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Returns the list of all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: The list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: products,
      message: "Products fetched successfully",
      count: products.length,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching products",
      error: error.message,
    });
  }
});

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get a product by id
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product id
 *     responses:
 *       200:
 *         description: The product by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: The product was not found
 */
app.get("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID format",
      });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
      message: "Product fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching product",
      error: error.message,
    });
  }
});

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - image
 *               - description
 *               - price
 *             properties:
 *               title:
 *                 type: string
 *               image:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       201:
 *         description: The product was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request
 */
app.post("/api/products", async (req, res) => {
  try {
    const { title, image, description, price } = req.body;

    // Basic validation (Mongoose will also validate)
    if (!title || !image || !description || price === undefined) {
      return res.status(400).json({
        success: false,
        message: "All fields (title, image, description, price) are required",
      });
    }

    const newProduct = new Product({
      title,
      image,
      description,
      price: parseFloat(price),
    });

    const savedProduct = await newProduct.save();

    res.status(201).json({
      success: true,
      data: savedProduct,
      message: "Product created successfully",
    });
  } catch (error) {
    console.error("Error creating product:", error);

    // Handle Mongoose validation errors
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: validationErrors,
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error while creating product",
      error: error.message,
    });
  }
});

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update a product by id
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               image:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: The product was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: The product was not found
 *       400:
 *         description: Bad request
 */
app.put("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, image, description, price } = req.body;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID format",
      });
    }

    // Basic validation
    if (!title || !image || !description || price === undefined) {
      return res.status(400).json({
        success: false,
        message: "All fields (title, image, description, price) are required",
      });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        title,
        image,
        description,
        price: parseFloat(price),
      },
      {
        new: true, // Return the updated document
        runValidators: true, // Run schema validators
      }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: updatedProduct,
      message: "Product updated successfully",
    });
  } catch (error) {
    console.error("Error updating product:", error);

    // Handle Mongoose validation errors
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: validationErrors,
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error while updating product",
      error: error.message,
    });
  }
});

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Remove a product by id
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product id
 *     responses:
 *       200:
 *         description: The product was deleted
 *       404:
 *         description: The product was not found
 */
app.delete("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID format",
      });
    }

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: deletedProduct,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({
      success: false,
      message: "Server error while deleting product",
      error: error.message,
    });
  }
});

/**
 * @swagger
 * /api/ping:
 *   get:
 *     summary: Health check endpoint that returns "pong"
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Returns pong
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 timestamp:
 *                   type: string
 */
app.get("/api/ping", (req, res) => {
  res.status(200).json({
    success: true,
    message: "pong",
    timestamp: new Date().toISOString(),
  });
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "ProdManager API is running!",
    timestamp: new Date().toISOString(),
    database:
      mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "API endpoint not found",
  });
});

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("\n🛑 Received SIGINT. Shutting down gracefully...");
  await mongoose.connection.close();
  console.log("📦 MongoDB connection closed.");
  process.exit(0);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 ProdManager API running on port ${PORT}`);
  console.log(`📖 Swagger Documentation: http://localhost:${PORT}/api-docs`);
  console.log(`🏥 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`📡 Ping Check: http://localhost:${PORT}/api/ping`);
});
