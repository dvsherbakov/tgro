import {
  verify,
  TokenExpiredError,
  JsonWebTokenError,
  Secret,
} from 'jsonwebtoken'
import * as config from 'config'

const secret: Secret = config.get('jwt.secret')

export default (req, res, next) => {
  const authHeader = req.get('Authorization')
  if (!authHeader) {
    res.status(401).json({ message: 'Token not provided!' })
    return
  }
  const token = authHeader.replace('Bearer ', '')
  try {
    const payload = <any>verify(token, secret)
    if (payload.type !== 'access') {
      res.status(401).json({ message: 'Invalid token!', addon: 'not access' })
      return
    }
  } catch (e) {
    if (e instanceof TokenExpiredError) {
      res.status(401).json({ message: 'Token expired!' })
      return
    }
    if (e instanceof JsonWebTokenError) {
      res.status(401).json({
        message: 'Invalid token!',
        addon: 'instanceof jwt.JsonWebTokenError',
      })
    }
  }
  next()
}
