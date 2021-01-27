import * as express from 'express'
import { Organization } from './organizaiton.model'
import { AdressModel, IAdressModel } from './adress.model'

const organizationRouter = express.Router()

organizationRouter.get(
  '/api/org',
  async (
    _req: express.Request,
    resp: express.Response,
    _next: express.NextFunction
  ) => {
    try {
      const orgs = await Organization.find({}).populate('adress')
      if (orgs) {
        resp.status(200).json(orgs)
      } else resp.status(500).json({ message: 'Organization not found' })
    } catch (err) {
      resp.status(500).json({ message: `Internal server err: ${err}` })
    }
  }
)

organizationRouter.post(
  '/api/org',
  async (
    req: express.Request,
    resp: express.Response,
    _next: express.NextFunction
  ) => {
    try {
      let adr: IAdressModel
      const { name, adress } = req.body

      const adrCandidate = await AdressModel.findById(adress)
      if (adrCandidate) {
        adr = adrCandidate
      } else {
        adr = new AdressModel(adress)
        await adr.save()
      }
      const org = new Organization({ name, adress: adr._id })
      await org.save()
      resp.status(200).json({ message: 'recieved', organization: org })
    } catch (err) {
      console.error(err)
      resp.status(500).json({ message: `Internal error ${err}` })
    }
  }
)

export { organizationRouter }
