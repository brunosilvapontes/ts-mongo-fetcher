import { Response } from 'express'
import { IRecordResponse } from "./IRecord";

export interface IResponse {
  code: number
  msg: string
  records: Array<IRecordResponse>
}

export const formatFetchResponse = (
  res: Response,
  statusCode: number,
  code = 998,
  msg = 'Unknown error',
  records: Array<IRecordResponse> = []
) => {
  return res.status(statusCode).json({ code, msg, records })
}
