import { Request, Response, NextFunction, Router } from 'express'
import authMiddleware from './auth.middleware'
import { AdressModel } from './adress.model'
import { check, validationResult } from 'express-validator'

const adressRouter = Router()

adressRouter.get(
  '/api/adress',
  async (_req: Request, resp: Response, _next: NextFunction) => {
    const adresses = await AdressModel.find({})
    resp.status(200).json(adresses)
  }
)

adressRouter.post(
  '/api/adress',
  [check('city', 'city is required').exists()],
  authMiddleware,
  async (req: Request, resp: Response, _next: NextFunction) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return resp.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при регистрации',
        })
      }
      const { city, street, home, additional } = req.body
      console.log(city, street, home, additional)
      const item = new AdressModel({ city, street, home, additional })
      item.save()
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
