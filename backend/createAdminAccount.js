require('dotenv').config()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('./models/user')
const logger = require('./utils/logger')


const createAdminAccount = async () => {
  try {
    // connecting to DB
    logger.info('Connecting to db...')
    await mongoose.connect(process.env.MONGODB_URI)
    logger.info('Connected to db!')

    // creating admin account
    const password = process.env.ADMIN_PSW

    if (!password) {
      logger.error('ADMIN_PSW is not defined in .env')
      return
    }

    logger.info('Checking if admin account already exists...')
    const existingAdmin = await User.findOne({ role: 'ADMIN' })
    if (existingAdmin) {
      logger.info('Admin account already exists, will stop creating admin account')
      return
    }

    logger.info('Password hashing...')
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    logger.info('Password hashed... ')

    logger.info('Making admin...')
    const admin = new User({
      username: 'admin',
      passwordHash: hashedPassword,
      role: 'ADMIN'
    })

    logger.info('Saving admin...')
    await admin.save()
    logger.info('Admin saved...')

    logger.info(' All done and dusted for the sake of the admin account!')

  } catch (error) {
    logger.error('Error creating admin account:', error.message)
  } finally {
    logger.info('Closing db connection...')
    mongoose.connection.close()
    logger.info('Db connection closed!')
  }
}

createAdminAccount()


