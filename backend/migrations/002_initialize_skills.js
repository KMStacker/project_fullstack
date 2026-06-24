const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('skills', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      level: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      used_on: {
        type: DataTypes.TEXT,
        defaultValue: ''
      }
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('skills')
  },
}