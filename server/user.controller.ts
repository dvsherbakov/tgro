import { Router, Request, Response, NextFunction } from 'express'
import * as config from 'config'
import { User } from './user.model'
import AuthMiddleware from './auth.middleware'
const secret = config.get('jwt.secret')

const userRoutes = Router()

userRoutes.get(
  '/api/users/:id',
  async (req: Request, res: Response, _next: NextFunction) => {
    const userId = req.params.id

    const user = await User.findById(userId).populate('organization')
    if (!user) {
      res.status(500).json({ message: 'User does not exists!' })
    }

    res.status(200).json({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      organizaiton: user.organization,
    })
  }
)

userRoutes.get(
  '/api/users',
  AuthMiddleware,
  async (_req: Request, res: Response, _next: NextFunction) => {
    const users = await User.find({}).populate('organization')
    if (!users) {
      res.status(500).json({ message: 'Users not found' })
    }
    const result = users.map((user) => {
      return {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        middleName: user.middleName,
      }
    })
    res.status(200).json(result)
  }
)

userRoutes.put(
  '/api/users/:id',
  AuthMiddleware,
  async (req: Request, res: Response, _next: NextFunction) => {
    const userId = req.params.id

    const updateReq = { ...req.body }
    const user = await User.findByIdAndUpdate(userId, updateReq)
    if (!user) {
      res.status(500).json({ message: 'User does not exists!' })
    }

    res.status(200).json({ message: 'ok update user' })
  }
)

export { userRoutes }
