import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../utils/db'
import User from './user'

export class Comment extends Model {
  declare id: number
  declare content: string
  declare userId: number
  declare createdAt: Date
}

Comment.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' }
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'comment'
})

Comment.belongsTo(User, { foreignKey: 'userId', as: 'user' })

export default Comment