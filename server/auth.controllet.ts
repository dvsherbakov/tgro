import * as bCrypt from 'bcrypt'
import {
  verify,
  TokenExpiredError,
  JsonWebTokenError,
  Secret,
} from 'jsonwebtoken'
import { Request, Response, Router, NextFunction } from 'express'
import { User  } from './user.model'
import { Token, IToken } from './token.model'
import {check, validationResult} from 'express-validator'
import * as config from 'config'

const secret: Secret = config.get('jwt.secret')
import {
  generateAccessToken,
  generateRefreshToken,
  replaceDbRefreshToken,
} from './auth.helper'

const authRoutes = Router()

const updateToken = async (userId: string) => {
  const accessToken = generateAccessToken(userId)
  const refreshToken = generateRefreshToken()

  await replaceDbRefreshToken(refreshToken.id, userId)
  return { accessToken, refreshToken: refreshToken.token, userId }
}

authRoutes.post('/api/auth', (req: Request, res: Response) => {
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
})

authRoutes.get(
  '/api/register',
  async (
    req: Request,
    resp: Response,
    next: NextFunction
  ) => {
    try {
      resp.status(200).json({message: 'Test passwd'})
    } catch (err) {
      resp.status(500).json({ message: err.errmsg })
      console.error('Caught error', err)
    }
  }
)

authRoutes.post('/api/register', 
[
  check('email', 'input correct email').isEmail(),
  check('password', 'password is short').isLength({min: 5})
],
async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty) {
      return res.status(400).json({errors:errors.array, message:'incorrect creditance'})
    }
    const { email, password, firstName, middleName, lastName } = req.body
    const candidate = await User.findOne({ email })
    if (candidate) {
      res.status(400).json({ message: 'Такой пользователь уже существует' })
      return
    }

    const hashedPassword = await bCrypt.hash(password, 12)
    const user = new User({
      email,
      password: hashedPassword,
      middleName,
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
})

authRoutes.post('/api/refresh-tokens', (req: Request, res: Response) => {
  const { refreshToken } = req.body
  let payload: IToken

  try {
    payload = <IToken>verify(refreshToken, secret)

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
})

export { authRoutes }
