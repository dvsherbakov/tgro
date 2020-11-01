import { v4 as uuid } from 'uuid'
import { sign } from 'jsonwebtoken'
import * as config from 'config'

import { Token, TokenInterface } from './token.model'

const tokens: any = config.get('jwt.token')
const secret: any = config.get('jwt.secret')

const generateAccessToken = (userId: string) => {
  const payload = {
    userId,
    type: tokens.access.type,
  }
  const options = { expiresIn: tokens.access.expiresIn }
  return sign(payload, secret, options)
}

const generateRefreshToken = () => {
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

const replaceDbRefreshToken = async (tokenId: string, userId: string) => {
  await Token.findOneAndRemove({ userId }).exec()
  Token.create({ tokenId, userId })
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  replaceDbRefreshToken,
}
