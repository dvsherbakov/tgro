import { Request, Response, Router } from 'express'
import authMiddleware from './auth.middleware'
import jwt_decode from 'jwt-decode'
import { User } from './user.model'

const myRoutes = Router()

interface myJwt  {
  userId: string
  type: string
  iat: number
  exp: number
 }

myRoutes.post('/api/my', authMiddleware, async (req: Request, res: Response) => {
  const token = req.get('Authorization').replace('Bearer', '')
  console.log(token)
  try {
    const {userId} = jwt_decode<myJwt>(token)
    const user = await User.findById(userId)
    console.log('user:', user)
  } catch (e) {
    res.status(201).json({ message: e.message })
  }
  res.status(200).json({ message: 'i returned this', token })
})

myRoutes.get('/api/my', (req: Request, res: Response) => {
  res.status(200).json({ message: 'test my ok' })
})

export { myRoutes }
