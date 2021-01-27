import { Document, Schema, Model, model } from 'mongoose'
import { IOrganizationInterface } from './organizaiton.model'

export interface IUserInterface {
  email: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  password: string;
  organization?: { type: Schema.Types.ObjectId, ref: 'Organization' };
}

export interface IUserModel extends Document, IUserInterface {}

const UserSchema = new Schema(
  {
    email: { type: String, unique: true, required: true },
    firstName: { type: String, required: true },
    middleName: String,
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    organization: { type: Schema.Types.ObjectId, ref: 'Organization' },
  },
  { timestamps: true, autoIndex: true }
)

export const User: Model<IUserModel> = model<IUserModel>('User', UserSchema)
