import * as express from 'express'
import { TodoModel } from './todo.model'

const todoRoutes = express.Router()

todoRoutes.get(
  '/todo',
  async (
    req: express.Request,
    resp: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const items: any = await TodoModel.find({})
      const result = items.map((item: any) => {
        return { id: item._id, description: item.description }
      })
      resp.status(200).json(result)
    } catch (err) {
      resp.status(500).json({ message: err.errmsg })
      console.error('Caught error', err)
    }
  }
)

todoRoutes.post(
  '/todo',
  async (
    req: express.Request,
    resp: express.Response,
    next: express.NextFunction
  ) => {
    console.log(req.body)
    const description = req.body['description']
    const item = new TodoModel({ description: description })
    await item.save()
    resp.end()
  }
)

todoRoutes.put(
  '/todo/:id',
  async (
    req: express.Request,
    resp: express.Response,
    next: express.NextFunction
  ) => {
    const description = req.body['description']
    const id = req.params['id']
    await TodoModel.findByIdAndUpdate(id, { description: description })
    resp.end()
  }
)

todoRoutes.delete(
  '/todo/:id',
  async (
    req: express.Request,
    resp: express.Response,
    next: express.NextFunction
  ) => {
    const id = req.params['id']
    await TodoModel.findByIdAndRemove(id)
    resp.end()
  }
)

export { todoRoutes }
