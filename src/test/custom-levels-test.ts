import { createLogger, createTypedLogger } from '../index.js'

// Example 1: Using default levels
const defaultLogger = createLogger({
  serviceName: 'default-service',
  transports: {
    console: { type: 'detailed' }
  }
})

// These should all work with TypeScript intellisense
defaultLogger.critical('Critical message')
defaultLogger.error('Error message')
defaultLogger.warn('Warning message')
defaultLogger.success('Success message')
defaultLogger.info('Info message')
defaultLogger.debug('Debug message')

// Example 2: Using custom levels
const customLogger = createLogger({
  serviceName: 'custom-service',
  transports: {
    console: { type: 'detailed' }
  },
  colorLevels: {
    levels: {
      emergency: 0,
      alert: 1,
      critical: 2,
      error: 3,
      warning: 4,
      notice: 5,
      info: 6,
      debug: 7
    },
    colors: {
      emergency: 'red',
      alert: 'magenta',
      critical: 'red',
      error: 'red',
      warning: 'yellow',
      notice: 'blue',
      info: 'green',
      debug: 'gray'
    }
  }
})

// With FlexibleLogger type, these should work even though they're custom levels
customLogger.emergency('Emergency message')
customLogger.alert('Alert message')
customLogger.notice('Notice message')

// Example 3: Cleaner way to get strict typing for custom levels
type MyCustomLevels = {
  fatal: number
  error: number
  warn: number
  info: number
  verbose: number
}

const strictCustomLogger = createTypedLogger<MyCustomLevels>({
  serviceName: 'strict-service',
  transports: {
    console: { type: 'detailed' }
  },
  colorLevels: {
    levels: {
      fatal: 0,
      error: 1,
      warn: 2,
      info: 3,
      verbose: 4
    },
    colors: {
      fatal: 'red',
      error: 'red',
      warn: 'yellow',
      info: 'green',
      verbose: 'gray'
    }
  }
})

// Now these are strongly typed and will show up in intellisense
strictCustomLogger.fatal('Fatal error')
strictCustomLogger.verbose('Verbose information')
