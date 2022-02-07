export interface IRecord {
  _id: string
  key: string
  createdAt: Date
  counts: Array<number>
  value: string
}

export interface IRecordResponse {
  key: string
  createdAt: Date
  totalCount: number
}

