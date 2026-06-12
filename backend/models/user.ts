import mongoose from 'mongoose'

export interface IUser {
  username: string
  passwordHash: string
  role: 'USER' | 'ADMIN'
}

const userSchema = new mongoose.Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },
  passwordHash: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: ['USER', 'ADMIN'],
    default: 'USER'
  }
})

userSchema.set('toJSON', {
  transform: (_document, returnedObject: any) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model<IUser>('User', userSchema)

export default User