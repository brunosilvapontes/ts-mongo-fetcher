import { Router, Request, Response } from 'express'
import { MongoDBClient } from 'infrastructure/database/MongoDBClient'
import { container } from 'di/container'
import { tokens } from 'di/tokens'

const router: Router = Router()

router.post('/', async (req: Request, res: Response) => {
  console.log('req.body', JSON.stringify(req.body, null, 3))
  const m = container.resolve(tokens.MongoDBClient) as MongoDBClient
  const db = m.getDB().collection('records')
  const r = await db.find({ key: 'TAKwGc6Jr4i8Z487' }).toArray()
  console.log('r', JSON.stringify(r, null, 3))

  return res.status(200).send({ ok: 2 })
})

export { router }
