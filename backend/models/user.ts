import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../utils/db'

export class User extends Model {
  public id!: number
  public username!: string
  public passwordHash!: string
  public role!: string
}

User.init({
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
  passwordHash: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  role: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: 'USER'
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'user'
})

export default User