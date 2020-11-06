import * as express from 'express'
import { Organization } from './organizaiton.model'
import { Adress, IAdressModel } from './adress.model'
export const OrganizationRouter = express.Router()

OrganizationRouter.post(
  '/api/org',
  async (
    req: express.Request,
    resp: express.Response,
    next: express.NextFunction
  ) => {
    try {
      let adr: IAdressModel
      const { name, adress } = req.body
      let adrCandidate = await Adress.findOne(adress)
      console.log(adrCandidate)
      if (adrCandidate) {
        adr = adrCandidate
      } else {
        adr = new Adress(adress)
        await adr.save()
      }
      const org = new Organization({ name, adress: adr })
      await org.save()
      resp.status(200).json({ message: 'recieved', organization: org })
    } catch (err) {
      console.log(err)
      resp.status(500).json({ message: `Internal error ${err}` })
    }
  }
)
