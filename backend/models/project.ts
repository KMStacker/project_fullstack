import mongoose from 'mongoose'

export interface IProject {
  title: string
  description: string
  technologies: string
  githubUrl: string
}

const projectSchema = new mongoose.Schema<IProject>({
  title: String,
  description: String,
  technologies: String,
  githubUrl: String,
})

export default mongoose.model<IProject>('Project', projectSchema)