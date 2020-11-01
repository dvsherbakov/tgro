import * as bCrypt from 'bcrypt'
import {
  verify,
  TokenExpiredError,
  JsonWebTokenError,
  Secret,
} from 'jsonwebtoken'
import { Request, Response } from 'express'

import { User } from './user.model'
import { Token } from './token.model'
import * as config from 'config'

const secret: Secret = config.get('jwt.secret')
import {
  generateAccessToken,
  generateRefreshToken,
  replaceDbRefreshToken,
} from './auth.helper'

const updateToken = async (userId: string) => {
  const accessToken = generateAccessToken(userId)
  const refreshToken = generateRefreshToken()

  await replaceDbRefreshToken(refreshToken.id, userId)
  return { accessToken, refreshToken: refreshToken.token, userId }
}

export const signIn = (req: Request, res: Response) => {
  const { email, password } = req.body
  User.findOne({ email })
    .exec()
    .then((user) => {
      if (!user) {
        res.status(401).json({ message: 'User does not exists!' })
      }
      const isValid = bCrypt.compareSync(password, user.password)
      if (isValid) {
        updateToken(user._id).then((tokens) => res.json(tokens))
      } else {
        res.status(401).json({ message: 'Invalid credetials!' })
      }
    })
    .catch((err) => res.status(500).json({ message: err.message }))
}

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lastName } = req.body
    const candidate = await User.findOne({ email })
    if (candidate) {
      res.status(400).json({ message: 'Такой пользователь уже существует' })
      return
    }

    const hashedPassword = await bCrypt.hash(password, 12)
    const user = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    })

    await user.save()

    res.status(201).json({ message: 'Пользователь создан' })
  } catch (e) {
    return res.status(500).json({
      // message: 'Что-то пошло не так, попробуйте снова',
      message: e.message,
    })
  }
}

export const refreshTokens = (req: Request, res: Response) => {
  const { refreshToken } = req.body
  let payload

  try {
    payload = verify(refreshToken, secret)

    if (payload.type !== 'refresh') {
      res.status(400).json({ message: 'Invalid token!', payload })
      return
    }
  } catch (e) {
    if (e instanceof TokenExpiredError) {
      res.status(400).json({
        message: 'Token expired!',
        addition: 'instanceof jwt.TokenExpiredError',
      })
      return
    } else if (e instanceof JsonWebTokenError) {
      res.status(400).json({
        message: 'Invalid token!',
        addition: 'instanceof jwt.JsonWebTokenError',
      })
      return
    }
  }

  Token.findOne({ tokenId: payload.id })
    .exec()
    .then((token: any) => {
      if (token === null) {
        throw new Error('Invalid token!')
      }
      return updateToken(token.userId)
    })
    .then((tokens) => {
      res.json(tokens)
    })
    .catch((err) =>
      res
        .status(400)
        .json({ message: `Ошибка обновления токена, ${err.message}` })
    )
}
