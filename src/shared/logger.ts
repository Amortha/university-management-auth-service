/* eslint-disable no-undef */
import { createLogger, format, transports } from 'winston'
import path from 'path'
// const { combine, timestamp, label, printf } = format;

const logger = createLogger({
  level: 'info',
  format: format.json(),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: path.join(process.cwd(), 'logs', 'winston', 'success.log'),
      level: 'info',
    }),
  ],
})
const errorlogger = createLogger({
  level: 'error',
  format: format.json(),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: path.join(process.cwd(), 'logs', 'winston', 'error.log'),
      level: 'error',
    }),
  ],
})
export { logger, errorlogger }

//log/winston/
// success.log
//error.log
