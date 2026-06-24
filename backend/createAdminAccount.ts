import dotenv from 'dotenv'
dotenv.config()
import { connectDb, sequelize } from './utils/db'
import bcrypt from 'bcrypt'
import User from './models/user'
import * as logger from './utils/logger'


const createAdminAccount = async (): Promise<void> => {
  try {
    // connecting to DB
    logger.info('Connecting to db...')
    await connectDb()
    logger.info('Connected to db!')

    // creating admin account
    const password = process.env.ADMIN_PSW
    if (!password) {
      logger.error('ADMIN_PSW is not defined in .env')
      return
    }

    logger.info('Checking if admin account already exists...')
    const existingAdmin = await User.findOne({ where: { role: 'ADMIN' } })
    if (existingAdmin) {
      logger.info('Admin account already exists, will stop creating admin account')
      return
    }

    logger.info('Password hashing...')
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    logger.info('Password hashed... ')

    logger.info('Making admin...')
    await User.create({
      username: 'admin',
      passwordHash: hashedPassword,
      role: 'ADMIN'
    })

    logger.info('Admin saved...')

    logger.info(' All done and dusted for the sake of the admin account!')

  } catch (error: any) {
    logger.error('Error creating admin account:', error.message)
  } finally {
    logger.info('Closing db connection...')
    await sequelize.close()
    logger.info('Db connection closed!')
  }
}

createAdminAccount()
