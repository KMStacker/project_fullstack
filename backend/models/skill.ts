import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../utils/db'

export class Skill extends Model {
  public id!: number
  public name!: string
  public level!: string
  public usedOn!: string
}

Skill.init({
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
  usedOn: {
    type: DataTypes.TEXT,
    defaultValue: ''
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'skill'
})

export default Skill