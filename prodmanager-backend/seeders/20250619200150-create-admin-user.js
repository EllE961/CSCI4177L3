'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    // Hash the password
    const hashedPassword = await bcrypt.hash('Admin123!', 12);
    
    // Check if admin user already exists
    const existingUser = await queryInterface.sequelize.query(
      'SELECT email FROM "Users" WHERE email = :email',
      {
        replacements: { email: 'admin@prodmanager.com' },
        type: Sequelize.QueryTypes.SELECT
      }
    );

    if (existingUser.length === 0) {
      await queryInterface.bulkInsert('Users', [{
        name: 'Admin User',
        email: 'admin@prodmanager.com',
        password: hashedPassword,
        role: 'admin',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', {
      email: 'admin@prodmanager.com'
    }, {});
  }
}; 