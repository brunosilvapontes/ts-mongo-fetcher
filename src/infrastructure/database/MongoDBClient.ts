import { MongoClient } from 'mongodb'
import { injectable } from 'tsyringe'

@injectable()
export class MongoDBClient {
  private client: MongoClient | undefined

  constructor() {
    const mongodbUri: string | undefined = process.env.MONGODB_URI
    if (mongodbUri) {
      this.client = new MongoClient(mongodbUri)
      this.client.connect()
    }
  }

  public getDB() {
    return this.client?.db()
  }
}
