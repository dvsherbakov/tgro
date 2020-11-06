import { Document, Schema, Model, model } from 'mongoose'
import { IAdressInterface, AdressSchema } from './adress.model'

export interface IOrganizationInterface {
  name: string;
  adress: IAdressInterface;
}

export interface IOrganizationModel extends Document, IOrganizationInterface {}

export const OrganizationSchema = new Schema({
  name: String,
  adress: AdressSchema,
})

export const Organization: Model<IOrganizationModel> = model<IOrganizationModel>(
  'Organization',
  OrganizationSchema
)
