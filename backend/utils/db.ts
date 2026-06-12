import mongoose from 'mongoose'
import * as config from './config'

export const connectDb = async (): Promise<void> => {
  if (config.MONGODB_URI) {
    console.log('Connecting to db:', config.MONGODB_URI.substring(0, 14), '...', config.MONGODB_URI.substring(40))
    await mongoose.connect(config.MONGODB_URI)
    console.log('Connected to db')
  } else {
    console.error('MONGODB_URI is not defined in .env')
  }
}
