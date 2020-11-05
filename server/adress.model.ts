import { Document, Schema, Model, model } from 'mongoose'

export interface IAdressInterface {
  city: string;
  street?: string;
  home?: string;
  additional?: string;
}

export interface IAdressModel extends Document, IAdressInterface {}

const AdressSchema = new Schema({
  city: { type: String, required: true },
  street: String,
  home: String,
  additional: String,
})

export const Adress: Model<IAdressModel> = model<IAdressModel>(
  'Adress',
  AdressSchema
)
