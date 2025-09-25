import winston, { createLogger as createWinstonLogger } from 'winston'
import Transporter from './configurations/Transporter.js'
import { levelColor } from './constants/index.js'
import type {
	FlexibleLogger,
	LoggerOptions,
	LoggerWithLevels
} from './interface/interfaces.js'

const createLogger = ({
	serviceName,
	level,
	transports,
	dateFormat,
	colorLevels
}: LoggerOptions): FlexibleLogger => {
	const loggerConfig: winston.LoggerOptions = {
		levels: colorLevels?.levels || levelColor.levels,
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

	if (transports?.fileRotate) {
		transporters.push(transporter.fileRotateTransporter(transports.fileRotate))
	}

	loggerConfig.transports = transporters
	loggerConfig.exceptionHandlers = transporters
	loggerConfig.rejectionHandlers = transporters

	winston.addColors(colorLevels?.colors || levelColor.colors)

	return createWinstonLogger(loggerConfig) as FlexibleLogger
}

export type {
	CustomLogger,
	FlexibleLogger,
	LoggerWithLevels
} from './interface/interfaces.js'
export { createLogger }

// Helper function for creating loggers with strongly typed custom levels
export function createTypedLogger<T extends Record<string, number>>(
	options: LoggerOptions
): LoggerWithLevels<T> {
	return createLogger(options) as unknown as LoggerWithLevels<T>
}
