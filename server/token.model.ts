import { Document, Schema, Model, model } from 'mongoose'

export interface ITokenModel extends Document {
  tokenId: string;
  userId: string;
}

export interface TokenAccess {
  type: string;
  expiresIn: string;
}

export interface TokenInterface {
  access: TokenAccess;
}

const TokenSchema = new Schema(
  {
    tokenId: { type: String, required: true },
    userId: { type: String, required: true },
  },
  { timestamps: true, autoIndex: true }
)

export const Token: Model<ITokenModel> = model<ITokenModel>(
  'Token',
  TokenSchema
)
