import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../utils/db'

export class Project extends Model {
  public id!: number
  public title!: string
  public description!: string
  public technologies!: string
  public githubUrl!: string
}

Project.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    defaultValue: ''
  },
  technologies: {
    type: DataTypes.TEXT,
    defaultValue: ''
  },
  githubUrl: {
    type: DataTypes.TEXT,
    defaultValue: ''
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'project'
})

export default Project