import { NextFunction, Request, Response } from 'express'
import { BusinessException } from 'exceptions/BusinessException'
import { container } from 'di/container'
import { tokens } from 'di/tokens'
// TODO: config TS, babel and jest paths/alias to use import like this: @infrastructure...
import { ILogger } from '../../../infrastructure/logger/ILogger'

export function errorHandler(
  error: Error,
  _req: Request,
  res: Response,
  _: NextFunction
): Response {
  const logger = container.resolve(tokens.Logger) as ILogger
  logger.error(error.message)

  if (
    error instanceof BusinessException
  ) {
    return res.status(error.statusCode).json({
      name: error.name,
      message: error.message,
    })
  }

  return res.status(500).json({
    name: 'InternalServerError',
    message: error.message,
  })
}
