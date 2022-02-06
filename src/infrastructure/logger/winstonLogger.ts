import { ILogger } from './ILogger'
import { injectable } from 'tsyringe'
import winston from 'winston'

@injectable()
export class WinstonLogger implements ILogger {
  private readonly logger: winston.Logger
  constructor() {
    this.logger = winston.createLogger({
      level: 'debug',
      levels: {
        error: 0,
        warn: 1,
        info: 2,
        http: 3,
        debug: 4,
      },
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
        winston.format.colorize({ all: true }),
        winston.format.printf(
          (info) => `${info.timestamp} ${info.level}: ${info.message}`,
        ),
      ),
      transports: [new winston.transports.Console()]
    })
  }

  public error(message: string): void {
    this.logger.error(message)
  }
}
