import { LoggerInterface } from '../models/logger.interface';
import * as winston from 'winston';
const minimist = require('minimist');
const path = require('path');

const directory = __dirname;
const fullPath = path.join(directory, '../../debug/');
const cliArgs = minimist(process.argv.slice(2));
const logFileName = `LOG_${cliArgs.source} ${cliArgs.oryxType || ''} ${new Date().toISOString()}.log`;
const filePath = path.join(fullPath, logFileName);

export class Logger implements LoggerInterface {
  private static _instance: Logger | null = null;

  private _logger: winston.Logger | null = null;

  private constructor() {
    try {
      this._logger = winston.createLogger({
        level: 'info',
        format: winston.format.json(),
        transports: [new winston.transports.File({ filename: filePath })],
      });
      if (process.env.NODE_ENV === 'development') {
        this._logger.add(
          new winston.transports.Console({
            format: winston.format.simple(),
          }),
        );
      }
    } catch (error) {
      console.log('error creating logger');
      console.log(error);
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
    if (process.env.NODE_ENV === 'development') {
      console.debug(message);
      return;
    }
    if (this._logger === null) {
      return;
    }
    this._logger.debug(message);
  }
}
