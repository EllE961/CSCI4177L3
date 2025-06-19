const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const { sequelize } = require('./models');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection and sync
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connected to PostgreSQL successfully');
    
    // Sync database (create tables)
    await sequelize.sync({ alter: true });
    console.log('✅ Database synchronized');
    
    // Seed initial data if needed
    await seedInitialData();
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
    process.exit(1);
  }
};

// Seed initial data function
const seedInitialData = async () => {
  try {
    const { Product } = require('./models');
    const count = await Product.count();
    
    if (count === 0) {
      const initialProducts = [
        {
          title: "MacBook Pro",
          image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400",
          description: "High-performance laptop for professionals",
          price: 1999.99
        },
        {
          title: "iPhone 15",
          image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400",
          description: "Latest smartphone with advanced features",
          price: 999.99
        },
        {
          title: "AirPods Pro",
          image: "https://images.unsplash.com/photo-1606220838315-056192d5e927?w=400",
          description: "Wireless earbuds with noise cancellation",
          price: 249.99
        }
      ];
      
      await Product.bulkCreate(initialProducts);
      console.log('📦 Initial products seeded successfully');
    }
  } catch (error) {
    console.error('❌ Error seeding initial data:', error.message);
  }
};

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ProdManager API',
      version: '1.0.0',
      description: 'Product Management API with JWT Authentication using PostgreSQL and Sequelize',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            id: {
              type: 'integer',
              description: 'The auto-generated id of the user',
            },
            name: {
              type: 'string',
              description: 'The user name',
              minLength: 2,
              maxLength: 50,
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'The user email',
            },
            password: {
              type: 'string',
              description: 'The user password',
              minLength: 6,
            },
          },
          example: {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            password: 'password123',
          },
        },
        Product: {
          type: 'object',
          required: ['title', 'description', 'price', 'image'],
          properties: {
            id: {
              type: 'integer',
              description: 'The auto-generated id of the product',
            },
            title: {
              type: 'string',
              description: 'The product title',
              maxLength: 100,
            },
            description: {
              type: 'string',
              description: 'The product description',
              maxLength: 500,
            },
            price: {
              type: 'number',
              format: 'float',
              description: 'The product price',
              minimum: 0,
            },
            image: {
              type: 'string',
              format: 'uri',
              description: 'The product image URL',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'The date the product was created',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'The date the product was last updated',
            },
          },
          example: {
            id: 1,
            title: 'MacBook Pro',
            description: 'High-performance laptop',
            price: 1999.99,
            image: 'https://example.com/image.jpg',
            createdAt: '2023-01-01T00:00:00.000Z',
            updatedAt: '2023-01-01T00:00:00.000Z',
          },
        },
        LoginRequest: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
            },
            password: {
              type: 'string',
            },
          },
        },
        RegisterRequest: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            name: {
              type: 'string',
            },
            email: {
              type: 'string',
              format: 'email',
            },
            password: {
              type: 'string',
            },
          },
        },
        AuthResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
            },
            message: {
              type: 'string',
            },
            data: {
              type: 'object',
              properties: {
                id: {
                  type: 'integer',
                },
                name: {
                  type: 'string',
                },
                email: {
                  type: 'string',
                },
                token: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./server.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Authentication]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       401:
 *         description: Invalid credentials
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products with pagination, sorting, and search
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number (default 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Items per page (default 10)
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Sort field (default createdAt)
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *         description: Sort order (default DESC)
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         description: Search keyword for title and description
 *     responses:
 *       200:
 *         description: Products fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *                 pagination:
 *                   type: object
 *                 message:
 *                   type: string
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, description, price, image]
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               image:
 *                 type: string
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get a product by id
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Product id
 *     responses:
 *       200:
 *         description: Product fetched successfully
 *       404:
 *         description: Product not found
 *   put:
 *     summary: Update a product by id
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Product id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               image:
 *                 type: string
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       404:
 *         description: Product not found
 *   delete:
 *     summary: Delete a product by id
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Product id
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 */

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

/**
 * @swagger
 * /api/ping:
 *   get:
 *     summary: Health check endpoint
 *     tags: [Health]
 *     security: []
 *     responses:
 *       200:
 *         description: Returns pong
 */
app.get('/api/ping', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'pong',
    timestamp: new Date().toISOString(),
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Start server
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📚 API Documentation: http://localhost:${PORT}/api-docs`);
  });
};

startServer(); 