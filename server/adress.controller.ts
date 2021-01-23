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
    try {
      const { city, street, home, additional } = req.body
      console.log(city)
      //const item = new AdressModel({ city, street, home, additional })
      //item.save()
      resp.status(200).json({ message: 'test post ok' })
    } catch (e) {
      resp
        .status(500)
        .json({ message: 'server error, adress.controller', error: e })
    }
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
