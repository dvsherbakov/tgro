import * as express from 'express'
import * as config from 'config'
import { User } from './user.model'
import AuthMiddleware from './auth.middleware'
const secret = config.get('jwt.secret')

const userRoutes = express.Router()

userRoutes.get(
  '/api/users/:id',
  async (
    req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    const userId = req.params.id

    const user = await User.findById(userId).populate('organization')
    if (!user) {
      res.status(500).json({ message: 'User does not exists!' })
    }
    res.status(200).json({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    })
  }
)

userRoutes.get(
  '/api/users',
  AuthMiddleware,
  async (
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
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

export { userRoutes }
