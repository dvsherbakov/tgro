import { Request, Response, Router, NextFunction } from 'express'
import authMiddleware from './auth.middleware'

const myRoutes = Router()

myRoutes.post('/api/my', authMiddleware, (req: Request, res: Response) => {
  const token = req.headers.authorization.replace('Bearer', '')
  res.status(200).json({ message: 'i returned this', token })
})

myRoutes.get('/api/my', (req: Request, res: Response) => {
  res.status(200).json({ message: 'test my ok' })
})

export { myRoutes }
