require('dotenv').config()

const PORT = process.env.PORT
if (!PORT) {
  console.error('PORT is not defined in .env')
}

module.exports = { PORT }