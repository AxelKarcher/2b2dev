/*
** Copyright 2b2dev - All Rights Reserved
** Unauthorized copying of this file, via any medium is strictly prohibited
** Proprietary and confidential
** Written by Alexandre Chetrit <alexandre.chetrit@epitech.eu>
*/

import morgan from 'morgan'
import winston from 'winston'
import 'winston-daily-rotate-file'

winston.addColors({
  error: 'bold red',
  warn: 'bold yellow',
  info: 'bold blue',
  http: 'bold cyan',
  verbose: 'bold brown',
  debug: 'bold grey',
  silly: 'bold purple'
})

const logger = winston.createLogger({
  level: 'http',
  transports: [
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'YY-MM-DD HH:mm:ss'
        }),
        winston.format.printf(info =>
          winston.format.colorize().colorize(info.level, `[${info.timestamp}] [${info.level}] ${info.message}`)
        ))
    })
  ],
  exitOnError: false
})

const morganConf = {
  format: ':email :remote-addr :remote-user | :method :url | :status',
  options: {
    stream: {
      write: message => logger.http(message.trim())
    }
  }
}

function createMorganToken () {
  morgan.token('email', (req, res) => req.session?.account?.email ?? '-')
}

const logApiRequest = morgan(morganConf.format, morganConf.options)

export { logger as default, logApiRequest, createMorganToken }
