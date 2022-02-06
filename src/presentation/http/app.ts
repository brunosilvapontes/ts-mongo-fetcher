import 'express-async-errors'
import express from 'express'
import { router } from './routes'
import { errorHandler } from './middlewares/errorHandler'

class App {
  public express: express.Application

  public constructor () {
    this.express = express()
    this.middlewares()
    this.routes()
    this.express.use(errorHandler)
  }

  private middlewares (): void {
    this.express.use(express.json())
  }

  private routes (): void {
    this.express.use(router)
  }
}

export default new App().express
