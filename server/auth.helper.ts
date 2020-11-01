import { v4 as uuid } from 'uuid'
import { sign } from 'jsonwebtoken'
import * as config from 'config'

import { Token, ITokensInterface } from './token.model'

const tokens: ITokensInterface = config.get('jwt.token')
const secret: any = config.get('jwt.secret')

export const generateAccessToken = (userId: string) => {
  const payload = {
    userId,
    type: tokens.access.type,
  }
  const options = { expiresIn: tokens.access.expiresIn }
  return sign(payload, secret, options)
}

export const generateRefreshToken = () => {
  const payload = {
    id: uuid(),
    type: tokens.refresh.type,
  }
  const options = { expiresIn: tokens.refresh.expiresIn }
  return {
    id: payload.id,
    token: sign(payload, secret, options),
  }
}

export const replaceDbRefreshToken = async (
  tokenId: string,
  userId: string
) => {
  await Token.findOneAndRemove({ userId }).exec()
  Token.create({ tokenId, userId })
}
