import 'reflect-metadata'
import 'dotenv/config'
import app from './presentation/http/app'

const port = 8000

app.listen(port)
console.log(`Hit me on port ${port}`)
