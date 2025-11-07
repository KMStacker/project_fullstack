require('dotenv').config()

const PORT = process.env.PORT
if (!PORT) {
  console.error('PORT is not defined in .env')
}

const MONGODB_URI = process.env.MONGODB_URI
if (!MONGODB_URI) {
  console.error('MONGODB_URI is not defined in .env')
}

const SECRET = process.env.SECRET
if (!SECRET) {
  console.error('SECRET is not defined in .env')
}

const ADMIN_PSW = process.env.ADMIN_PSW
if (!ADMIN_PSW) {
  console.error('ADMIN_PSW is not defined in .env')
}


module.exports = { PORT, MONGODB_URI, SECRET, ADMIN_PSW }