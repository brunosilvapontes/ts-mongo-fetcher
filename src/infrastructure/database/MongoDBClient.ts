import { MongoClient } from 'mongodb'
import { injectable } from 'tsyringe'

@injectable()
export class MongoDBClient {
  private client: MongoClient

  constructor() {
    this.client = new MongoClient(process.env.MONGODB_URI as string)
    this.client.connect()
  }

  public getDB() {
    return this.client.db()
  }
}
