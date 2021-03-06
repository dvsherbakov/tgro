import * as express from 'express'
import * as cors from 'cors'
import * as bodyparser from 'body-parser'

import { requestLoggerMiddleware } from './request.logger.middleware'
import { todoRoutes } from './todo.controller'
import { authRoutes } from './auth.controllet'
import { userRoutes } from './user.controller'
import { organizationRouter } from './organization.controller'
import { myRoutes } from './my.controller'
import { adressRouter } from './adress.controller'

const app = express()
app.use(cors())
app.use(bodyparser.json())

app.use(requestLoggerMiddleware)
app.use(todoRoutes)
app.use(authRoutes)
app.use(userRoutes)
app.use(organizationRouter)
app.use(myRoutes)
app.use(adressRouter)

export { app }
