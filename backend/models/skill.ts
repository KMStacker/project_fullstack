import mongoose from 'mongoose'

export interface ISkill {
  name: string
  level: string
  usedOn: string
}

const skillSchema = new mongoose.Schema<ISkill>({
  name: String,
  level: String,
  usedOn: String,
})

export default mongoose.model<ISkill>('Skill', skillSchema)