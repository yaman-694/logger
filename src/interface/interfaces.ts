import http from 'http'
import https from 'https'
import type { Format } from 'logform'
import { Logger as WinstonLogger } from 'winston'
import DailyRotateFile, { GeneralDailyRotateFileTransportOptions } from 'winston-daily-rotate-file'
import type WinstonTelegram from 'winston-telegram'
import TransportStream from 'winston-transport'
import {
	AbstractConfigSetColors,
	AbstractConfigSetLevels
} from 'winston/lib/winston/config/index.js'
import type { formatType } from './type.js'

export interface LokiTransportOptions
  extends TransportStream.TransportStreamOptions {
  host: string
  basicAuth?: string
  headers?: object
  interval?: number
  json?: boolean
  batching?: boolean
  labels?: object
  clearOnError?: boolean
  replaceTimestamp?: boolean
  gracefulShutdown?: boolean
  timeout?: number
  httpAgent?: http.Agent | boolean
  httpsAgent?: https.Agent | boolean
  useWinstonMetaAsLabels?: boolean
  ignoredMeta?: Array<string>
  onConnectionError?(error: unknown): void
  format?: Format
}

export interface TelegramTransportOptions {
  /** The Telegram identifier of a message thread to which the message belongs. */
  messageThreadId?: number
  /** The Telegram mode for parsing entities in the message text. */
  parseMode?: string
  /** Level of messages that this transport should log. (default "info") */
  level?: string
  /** Whether to log only the declared level and none above. (default false) */
  unique?: boolean
  /** Whether to suppress output. (default false) */
  silent?: boolean
  /** Sends the message silently. (default false) */
  disableNotification?: boolean
  /** ? (default "winston-telegram") */
  name?: string
  /** Format output message. (default "[{level}] [message]") */
  template?: string
  /** Format output message by own method. */
  formatMessage?: (params: WinstonTelegram.FormatOptions, info: any) => string
  /** Handle uncaught exceptions. (default true) */
  handleExceptions?: boolean
  /** Time in ms within which to batch messages together. (default = 0) (0 = disabled) */
  batchingDelay?: number
  /** String with which to join batched messages with (default "\n\n") */
  batchingSeparator?: string
}

export interface LoggerOptions {
  serviceName: string
  level?: string
  dateFormat?: string
  transports?: {
    loki?: LokiTransportOptions
    telegram?: {
      botToken: string
      chatId: number
      opts?: object
    }
    console?: {
      type?: formatType
      customFormat?: Format
    }
    fileRotate?: FileTransport
  }
  colorLevels?: ColorLevels
}

export interface ColorLevels {
  levels: AbstractConfigSetLevels
  colors: AbstractConfigSetColors
}

// Generic type that creates log methods based on the level keys
export type LoggerWithLevels<T extends Record<string, number>> =
  WinstonLogger & {
    [K in keyof T]: WinstonLogger['info']
  }

// Default logger type with our standard levels
export type CustomLogger = LoggerWithLevels<{
  critical: number
  error: number
  warn: number
  success: number
  info: number
  debug: number
}>

// More flexible logger type that accepts any string keys as log methods
export type FlexibleLogger = WinstonLogger &
  Record<string, WinstonLogger['info']>

export type FileTransport = Omit<GeneralDailyRotateFileTransportOptions, 'filename'> & {
	customFormat?: Format
	formatType?: formatType
}
