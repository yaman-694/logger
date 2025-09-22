import type { Format } from 'logform'
import { format, transports } from 'winston'
import LokiTransport from 'winston-loki'
import TelegramTransport from 'winston-telegram'
import type {
  LokiTransportOptions,
  TelegramTransportOptions
} from '../interface/interfaces.js'
import type { formatType } from '../interface/type.js'
import { formatter } from './Formatter.js'

const { combine, timestamp, prettyPrint, errors } = format

class Transporter {
  private serviceName: string
  dateFormat = 'YYYY-MM-DD HH:mm:ss'

  constructor({
    serviceName,
    dateFormat
  }: {
    serviceName: string
    dateFormat?: string
  }) {
    this.serviceName = serviceName
    if (dateFormat) {
      this.dateFormat = dateFormat
    }
  }

  lokiTransporter(opts: LokiTransportOptions) {
    return new LokiTransport({
      labels: { service_name: this.serviceName },
      ...opts,
      format:
        opts.format ||
        combine(timestamp({ format: this.dateFormat }), prettyPrint())
    })
  }

  telegramTransporter(
    botToken: string,
    chatId: number,
    opts: TelegramTransportOptions = {}
  ) {
    return new TelegramTransport({
      token: botToken,
      chatId,
      ...opts
    })
  }

  // Enhanced detailed log format with structured metadata

  consoleTransporter(type: formatType = 'detailed', customFormat?: Format) {
    let consoleFormat = null

    switch (type) {
      case 'detailed':
        consoleFormat = formatter.detailedLogFormat
        break
      case 'json':
        consoleFormat = formatter.jsonLogFormat
        break
      case 'compact':
        consoleFormat = formatter.compactLogFormat
        break
    }

    return new transports.Console({
      format: combine(
        ...(type !== 'json' ? [format.colorize({ all: true })] : []),
        timestamp({ format: this.dateFormat }),
        customFormat ? customFormat : consoleFormat,
        errors({
          stack: true
        })
      )
    })
  }
}

export default Transporter
