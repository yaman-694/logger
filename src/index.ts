import winston, { createLogger as createWinstonLogger } from 'winston'
import Transporter from './configurations/Transporter.js'
import { levelColor } from './constants/index.js'
import type { LoggerOptions } from './interface/interfaces.js'

winston.addColors(levelColor.colors)

const createLogger = ({
  serviceName,
  level,
  transports,
  dateFormat,
  colorLevels
}: LoggerOptions) => {
  const loggerConfig: winston.LoggerOptions = {
    levels: colorLevels || levelColor.levels,
    level: level || 'info',
    defaultMeta: { service: serviceName }
  }

  const transporters = []

  const transporter = new Transporter({
    serviceName,
    ...(dateFormat && { dateFormat })
  })

  if (transports?.loki) {
    transporters.push(transporter.lokiTransporter(transports.loki))
  }

  if (transports?.telegram) {
    const { botToken, chatId, opts } = transports.telegram
    transporters.push(transporter.telegramTransporter(botToken, chatId, opts))
  }

  if (transports?.console) {
    const { type, customFormat } = transports.console
    transporters.push(transporter.consoleTransporter(type, customFormat))
  }

  loggerConfig.transports = transporters
  loggerConfig.exceptionHandlers = transporters
  loggerConfig.rejectionHandlers = transporters

  return createWinstonLogger(loggerConfig)
}

export { createLogger }
