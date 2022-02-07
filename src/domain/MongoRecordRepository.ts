import { inject, injectable } from 'tsyringe'
import { IRecordRepository } from './IRecordRepository'
import { tokens } from 'di/tokens'
import { MongoDBClient } from 'infrastructure/database/MongoDBClient'
import { IRecordResponse } from './IRecord'

@injectable()
export class MongoRecordRepository implements IRecordRepository {
  private collection = 'records'

  constructor(
    @inject(tokens.MongoDBClient)
    private client: MongoDBClient,
  ) {}

  public async getFilteredRecords(
    startDate: Date,
    endDate: Date,
    minCount: number,
    maxCount: number
  ): Promise<IRecordResponse[] | undefined> {
    const collection = this.client.getDB().collection(this.collection)

    const records = await collection.aggregate([
      {
        $project: {
          _id: 0,
          key: 1,
          createdAt: 1,
          totalCount: { $sum: '$counts' },
        }
      },
      {
        $match: {
          createdAt: { $gte: startDate, $lt: endDate },
          totalCount: { $gte: minCount, $lte: maxCount }
        }
      }
    ]).toArray() as IRecordResponse[]

    return records ?? undefined
  }
}
