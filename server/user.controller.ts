import * as express from 'express'
import * as config from 'config'

const secret = config.get('jwt.secret')

const userRoutes = express.Router()
