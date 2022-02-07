import { IRecordResponse } from "./IRecord";

export interface IRecordRepository {
  getFilteredRecords(
    startDate: Date,
    endDate: Date,
    minCount: number,
    maxCount: number,
  ): Promise<Array<IRecordResponse> | undefined>
}
