const mongoose = require('mongoose')

const skillSchema = new mongoose.Schema({
  name: String,
  level: String,
  usedOn: String,
})

module.exports = mongoose.model('Skill', skillSchema)