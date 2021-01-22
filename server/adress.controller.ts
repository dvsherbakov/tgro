import { Request, Response, NextFunction, Router } from 'express'
import authMiddleware from './auth.middleware'
import { AdressModel } from './adress.model'

const adressRouter = Router()

adressRouter.get(
  '/api/adress',
  async (req: Request, resp: Response, next: NextFunction) => {
    resp.status(200).json({ message: 'test get ok' })
  }
)

adressRouter.post(
  '/api/adress',
  authMiddleware,
  async (req: Request, resp: Response, next: NextFunction) => {
    resp.status(200).json({ message: 'test post ok' })
  }
)

adressRouter.put(
  '/api/adress/:id',
  authMiddleware,
  async (req: Request, resp: Response, next: NextFunction) => {
    resp.status(200).json({ message: 'test put ok' })
  }
)

adressRouter.delete(
  '/api/adress/:id',
  authMiddleware,
  async (req: Request, resp: Response, next: NextFunction) => {
    resp.status(200).json({ message: 'test delete ok' })
  }
)

export { adressRouter }
