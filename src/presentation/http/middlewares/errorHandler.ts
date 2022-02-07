import { NextFunction, Request, Response } from 'express'
import { container } from 'di/container'
import { tokens } from 'di/tokens'
import { ILogger } from 'infrastructure/logger/ILogger'

export function errorHandler(
  error: Error,
  _req: Request,
  res: Response,
  _: NextFunction
): Response {
  const logger = container.resolve(tokens.Logger) as ILogger
  logger.error(error.message)

  return res.status(500).json({
    msg: error.message,
    code: 999,
  })
}
