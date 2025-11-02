const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  technologies: String,
  githubUrl: String,
})

module.exports = mongoose.model('Project', projectSchema)