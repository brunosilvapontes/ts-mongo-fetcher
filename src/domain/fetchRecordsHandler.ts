import { Request, Response } from 'express'
import { formatFetchResponse, IResponse } from 'domain/Response'
import { container } from 'di/container'
import { tokens } from 'di/tokens'
import { IRecordRepository } from 'domain/IRecordRepository'

const validatePayload = (
  startDate: string,
  endDate: string,
  minCount: number,
  maxCount: number,
): { code: number, msg: string } | undefined => {
  const errors: Array<string> = []

  if (!startDate) errors.push('startDate is mandatory')
  if (!endDate) errors.push('endDate is mandatory')
  if (!minCount) errors.push('minCount is mandatory')
  if (!maxCount) errors.push('maxCount is mandatory')

  if (errors.length) return { code: 1, msg: errors.join('; ') }

  if (typeof startDate !== 'string') errors.push('startDate must be a string')
  if (typeof endDate !== 'string') errors.push('endDate must be a string')
  if (typeof minCount !== 'number') errors.push('minCount must be a number')
  if (typeof maxCount !== 'number') errors.push('maxCount must be a number')

  if (errors.length) return { code: 2, msg: errors.join('; ') }

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/

  if (!dateRegex.test(startDate)) return { code: 3, msg: 'startDate must have YYYY-MM-DD format' }
  if (!dateRegex.test(endDate)) return { code: 4, msg: 'endDate must have YYYY-MM-DD format' }
  if (endDate < startDate) return { code: 5, msg: 'startDate must represent a date before endDate' }

  if (minCount < 0) return { code: 6, msg: 'minCount must be >= 0' }
  if (maxCount < 0) return { code: 7, msg: 'maxCount must be >= 0' }
  if (maxCount < minCount) return { code: 8, msg: 'maxCount must be >= minCount' }

  return undefined
}

export const fetchRecords = async (req: Request, res: Response): Promise<Response<IResponse>> => {
  const { startDate, endDate, minCount, maxCount } = req.body

  const validationError = validatePayload(startDate, endDate, minCount, maxCount)
  if (validationError) return formatFetchResponse(res, 422, validationError.code, validationError.msg)

  const endDateObject = new Date(endDate)
  endDateObject.setDate(endDateObject.getDate() + 1)

  const recordRepository = container.resolve(tokens.RecordRepository) as IRecordRepository
  const records = await recordRepository.getFilteredRecords(
    new Date(startDate),
    endDateObject,
    minCount,
    maxCount,
  )

  return formatFetchResponse(res, 200, 0, 'success', records)
}
