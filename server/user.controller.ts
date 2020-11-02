import * as express from 'express'
import * as config from 'config'
import { User } from './user.model'

const secret = config.get('jwt.secret')

const userRoutes = express.Router()

userRoutes.get(
  '/users/id',
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const userId = req.params.id

    const user = await User.findById(userId)
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

export { userRoutes }
