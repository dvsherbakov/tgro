import { Document, Schema, Model, model } from 'mongoose'
import { IAdressInterface } from './adress.model'

export interface IOrganizationInterface {
  name: string;
  adress: IAdressInterface;
}

export interface IOrganizationModel extends Document, IOrganizationInterface {}

export const OrganizationSchema = new Schema({
  name: { type: String, unique: true },
  adress: { type: Schema.Types.ObjectId, ref: 'Adress' },
})

export const Organization: Model<IOrganizationModel> = model<IOrganizationModel>(
  'Organization',
  OrganizationSchema
)
