import { tokens } from './tokens'
import { container } from 'tsyringe'
import { WinstonLogger } from 'infrastructure/logger/winstonLogger'
import { MongoDBClient } from 'infrastructure/database/MongoDBClient'
import { MongoRecordRepository } from 'domain/MongoRecordRepository'

const childContainer = container.createChildContainer()

childContainer.registerSingleton(tokens.Logger, WinstonLogger)
childContainer.registerSingleton(tokens.MongoDBClient, MongoDBClient)
childContainer.registerSingleton(tokens.RecordRepository, MongoRecordRepository)

export { childContainer as container }
