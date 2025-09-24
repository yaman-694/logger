import { format } from 'winston'
import { formatType } from '../interface/type'
import type { Format } from 'logform'

const { printf } = format

class Formatter {
	colors = {
		gray: '\x1b[90m',
		reset: '\x1b[0m'
	}
	detailedLogFormat = printf(
		({ level, message, timestamp, service, ...meta }) => {
			// ANSI color codes for custom coloring

			const serviceTag = service ? `[${(service as string).toUpperCase()}]` : ''

			// Format metadata in a more readable way
			const metaString = Object.entries(meta)
				// eslint-disable-next-line no-unused-vars
				.filter(([key, value]) => value !== undefined && value !== null)
				.map(([key, value]) => {
					if (typeof value === 'object') {
						return `${key}: ${JSON.stringify(value, null, 2)}`
					}
					return `${key}: ${value}`
				})
				.join(' | ')

			const metaSection = metaString
				? `\n   ${this.colors.gray}📊 Metadata: ${metaString}${this.colors.reset}`
				: ''

			// Color timestamp gray while keeping other elements with their winston colors
			return `${this.colors.gray}${timestamp}${this.colors.reset} ${level} ${serviceTag} → ${message}${metaSection}`
		}
	)

	jsonLogFormat = format.json()

	compactLogFormat = printf(({ level, message, timestamp, service }) => {
		// ANSI color codes for custom coloring

		const serviceTag = service ? `[${(service as string).toUpperCase()}]` : ''

		// Color timestamp gray while keeping other elements with their winston colors
		return `${this.colors.gray}${timestamp}${this.colors.reset} ${level} ${serviceTag} → ${message}`
	})

	getFormatType(formatType: formatType): Format {
		switch (formatType) {
			case 'detailed':
				return this.detailedLogFormat
			case 'json':
				return this.jsonLogFormat
			case 'compact':
				return this.compactLogFormat
		}
	}
}

export const formatter = new Formatter()
