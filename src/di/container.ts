import { tokens } from './tokens'
import { container } from 'tsyringe'
import { WinstonLogger } from '../infrastructure/logger/winstonLogger'
import { MongoDBClient } from '../infrastructure/database/MongoDBClient'

const childContainer = container.createChildContainer()

childContainer.registerSingleton(tokens.Logger, WinstonLogger)
childContainer.registerSingleton(tokens.MongoDBClient, MongoDBClient)

export { childContainer as container }
