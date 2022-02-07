import { Router } from 'express'
import { fetchRecords } from 'domain/fetchRecordsHandler'

const router: Router = Router()

router.post('/', fetchRecords)

export { router }
