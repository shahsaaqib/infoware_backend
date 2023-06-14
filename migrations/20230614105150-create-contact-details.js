'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('contactDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      empId: {
        allowNull: false,
        onDelete: 'cascade',
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Employees',
          },
          key: 'id',
        },
      },
      contactNumber: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
      relationship: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('contactDetails');
  },
};
