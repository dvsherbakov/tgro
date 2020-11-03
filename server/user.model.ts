import { Document, Schema, Model, model } from 'mongoose'

export interface IUserInterface {
  email: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  password: string;
}

export interface IUserModel extends Document, IUserInterface {}

const UserSchema = new Schema(
  {
    email: { type: String, unique: true, required: true },
    firstName: { type: String, required: true },
    middleName: String,
    lastName: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true, autoIndex: true }
)

export const User: Model<IUserModel> = model<IUserModel>('User', UserSchema)
