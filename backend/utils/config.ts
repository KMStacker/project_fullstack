import dotenv from 'dotenv'
dotenv.config()

export const PORT = process.env.PORT
if (!PORT) {
  console.error('PORT is not defined in .env')
}

export const MONGODB_URI = process.env.MONGODB_URI
if (!MONGODB_URI) {
  console.error('MONGODB_URI is not defined in .env')
}

export const SECRET = process.env.SECRET
if (!SECRET) {
  console.error('SECRET is not defined in .env')
}

export const ADMIN_PSW = process.env.ADMIN_PSW
if (!ADMIN_PSW) {
  console.error('ADMIN_PSW is not defined in .env')
}
