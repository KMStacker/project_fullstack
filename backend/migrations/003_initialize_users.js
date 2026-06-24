const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('users', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
      },
      password_hash: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      role: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: 'USER'
      }
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('users')
  },
}