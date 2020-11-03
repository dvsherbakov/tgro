import { app } from './app'
import * as http from 'http'
import * as mongoose from 'mongoose'
import * as config from 'config'

const MONGO_URI: string = config.get('server.mongoUri')
const confPort: number = config.get('server.port')
const PORT = confPort || 8080

const server = http.createServer(app)
server.listen(PORT)
server.on('listening', async () => {
  console.info(`Listening on port ${PORT}`)
  mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  mongoose.connection.on('open', () => {
    console.info('Connected to mongo...')
  })
  mongoose.connection.on('error', (err) => {
    console.error(err)
  })
})
