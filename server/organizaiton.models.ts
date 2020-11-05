import { Document, Schema, Model, model } from 'mongoose'
import { IAdressModel, IAdressInterface } from './adress.model'

export interface IOrganizationInterface {
  name: string;
  adress: IAdressInterface;
}
