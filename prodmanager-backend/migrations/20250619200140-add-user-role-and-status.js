'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'role', {
      type: Sequelize.ENUM('user', 'admin'),
      allowNull: false,
      defaultValue: 'user',
      after: 'password'
    });

    await queryInterface.addColumn('Users', 'isActive', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      after: 'role'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'isActive');
    await queryInterface.removeColumn('Users', 'role');
    
    // Drop the ENUM type if it exists
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Users_role";');
  }
}; 