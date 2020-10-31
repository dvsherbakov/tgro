import { Document, Schema, Model, model } from 'mongoose'

export interface IUserModel extends Document {
  email: string;
  firstName: string;
  lastName: string;
}

const UserSchema = new Schema(
  {
    email: { type: String, unique: true, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  { timestamps: true, autoIndex: true }
)

export const UserModel: Model<IUserModel> = model<IUserModel>(
  'User',
  UserSchema
)
