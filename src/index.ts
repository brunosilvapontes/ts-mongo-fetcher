import 'reflect-metadata'
import 'dotenv/config'
import app from './presentation/http/app'

const port = process.env.PORT || 8000

app.listen(port)
console.log(`Hit me on port ${port}`)
