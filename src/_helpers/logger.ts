import { LoggerInterface } from '../models/logger.interface';
import * as winston from 'winston';
const minimist = require('minimist');

const cliArgs = minimist(process.argv.slice(2));
const logFileName = `LOG_${cliArgs.source} ${cliArgs.oryxType || ''} ${new Date().toISOString()}`;
export class Logger implements LoggerInterface {
  private static _instance: Logger | null = null;

  private _logger: winston.Logger | null = null;

  private constructor() {
    if (process.env.NODE_ENV === 'development') {
      this._logger = winston.createLogger({
        level: 'info',
        format: winston.format.json(),
        transports: [new winston.transports.File({ filename: './debug/' + logFileName + '.log' })],
      });

      this._logger.add(
        new winston.transports.Console({
          format: winston.format.simple(),
        }),
      );
    }
  }

  public static getInstance(): Logger {
    if (!Logger._instance) {
      Logger._instance = new Logger();
    }
    return Logger._instance;
  }

  public info(message: string) {
    if (this._logger === null) {
      return;
    }
    this._logger.info(message);
  }

  public error(message: string) {
    if (this._logger === null) {
      console.error(message);
      return;
    }
    this._logger.error(message);
  }

  public debug(message: string) {
    if (this._logger === null) {
      return;
    }
    this._logger.debug(message);
  }
}
