import { Sequelize } from 'sequelize'
import { Umzug, SequelizeStorage } from 'umzug'
import * as config from './config'

export const sequelize = new Sequelize(config.MONGODB_URI || '', {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  logging: false
})

const runMigrations = async () => {
  const migrator = new Umzug({
    migrations: {
      glob: 'backend/migrations/*.js',
    },
    storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
    context: sequelize.getQueryInterface(),
    logger: console,
  })

  const migrations = await migrator.up()
  console.log('Migrations up to date', {
    files: migrations.map((mig) => mig.name),
  })
}

export const connectDb = async (): Promise<void> => {
  try {
    await sequelize.authenticate()
    await runMigrations()
    console.log('Connected to Postgres db')
  } catch (error) {
    console.error('Failed to connect to the database:', error)
    throw error
  }
}
