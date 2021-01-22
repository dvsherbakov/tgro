import { Request, Response, NextFunction, Router } from 'express'
import { TodoModel } from './todo.model'

const todoRoutes = Router()

todoRoutes.get(
  '/api/todo',
  async (req: Request, resp: Response, next: NextFunction) => {
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
  '/api/todo',
  async (req: Request, resp: Response, next: NextFunction) => {
    //console.log(req.body)
    const description = req.body['description']
    const item = new TodoModel({ description: description })
    await item.save()
    resp.status(200).json({ message: 'sucsesfully added' })
  }
)

todoRoutes.put(
  '/api/todo/:id',
  async (req: Request, resp: Response, next: NextFunction) => {
    const description = req.body['description']
    const id = req.params['id']
    await TodoModel.findByIdAndUpdate(id, { description: description })
    resp.end()
  }
)

todoRoutes.delete(
  '/api/todo/:id',
  async (req: Request, resp: Response, next: NextFunction) => {
    const id = req.params['id']
    await TodoModel.findByIdAndRemove(id)
    resp.end()
  }
)

export { todoRoutes }
