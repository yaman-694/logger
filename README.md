# omnilogs

[![npm version](https://badge.fury.io/js/%40zyan%2Flogger.svg)](https://badge.fury.io/js/%40zyan%2Flogger)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js CI](https://github.com/yaman-694/logger/workflows/Node.js%20CI/badge.svg)](https://github.com/yaman-694/logger/actions)

A comprehensive, production-ready logging solution for Node.js applications. Built on top of Winston, this logger provides multiple transport options including console, Loki, and Telegram with customizable formatting and log levels.


## Repository

More Info [https://github.com/yaman-694/omnilogs](https://github.com/yaman-694/omnilogs)


## Features

- **Easy Setup** - Simple plug-and-play configuration
- **Multiple Formats** - Detailed, compact, and JSON formatting options
- **Multiple Transports** - Console, Loki (Grafana), and Telegram support
- **Highly Configurable** - Customize log levels, colors, and date formats
- **TypeScript Support** - Full TypeScript definitions included
- **Performance Optimized** - Built on Winston for production use
- **Colored Output** - Beautiful colored console logs
- **Structured Logging** - JSON and structured metadata support
- **Error Handling** - Built-in exception and rejection handlers

## Installation

```bash
npm install omnilogs
```

```bash
yarn add omnilogs
```

```bash
pnpm add omnilogs
```

## Quick Start

```typescript
import { createLogger } from 'omnilogs'

const logger = createLogger({
  serviceName: 'my-server',
  level: 'info',
  transports: {
    console: {
      type: 'detailed'
    }
  }
})

logger.info('Hello World!')
logger.error('Something went wrong', { userId: 123, action: 'login' })
logger.success('User authenticated successfully')
```

## API Reference

### `createLogger(options: LoggerOptions)`

Creates a new logger instance with the specified configuration.

#### Parameters

```typescript
interface LoggerOptions {
  serviceName: string
  level?: string
  dateFormat?: string
  transports?: {
    loki?: LokiTransportOptions
    telegram?: TelegramTransportOptions
    console?: ConsoleTransportOptions
  }
  colorLevels?: CustomLevels
}
```

### Configuration Options

#### `serviceName` (required)
- **Type**: `string`
- **Description**: Name of your service/application
- **Example**: `'my-api-server'`

#### `level` (optional)
- **Type**: `string`
- **Default**: `'info'`
- **Options**: `'critical'`, `'error'`, `'warn'`, `'success'`, `'info'`, `'debug'`
- **Description**: Minimum log level to output

#### `dateFormat` (optional)
- **Type**: `string`
- **Default**: `'YYYY-MM-DD HH:mm:ss'`
- **Description**: Custom date format for timestamps

#### `colorLevels` (optional)
- **Type**: `object`
- **Description**: Custom log levels configuration
- **Default**:
```typescript
{
  levels: {
    critical: 0,
    error: 1,
    warn: 2,
    success: 3,
    info: 4,
    debug: 5
  },
  colors: {
    critical: 'magenta',
    error: 'red',
    warn: 'yellow',
    success: 'green',
    info: 'cyan',
    debug: 'gray'
  }
}
```

## Transport Configuration

### Console Transport

```typescript
interface ConsoleTransportOptions {
  type?: 'detailed' | 'json' | 'compact'
  customFormat?: Format
}
```

#### Console Format Types

##### `detailed` (default)
- Includes timestamp, log level, service name, message, and metadata
- Color-coded output with icons
- Structured metadata display

```
2025-09-23 10:30:45 info [MY-SERVER] → User login successful
   Metadata: userId: 123 | ip: 192.168.1.1
```

##### `compact`
- Minimal output with essential information only
- Perfect for development environments

```
2025-09-23 10:30:45 info [MY-SERVER] → User login successful
```

##### `json`
- Machine-readable JSON format
- Ideal for log aggregation systems

```json
{"level":"info","message":"User login successful","timestamp":"2025-09-23 10:30:45","service":"my-server"}
```

### Loki Transport (Grafana)

```typescript
interface LokiTransportOptions {
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
  useWinstonMetaAsLabels?: boolean
  ignoredMeta?: Array<string>
  format?: Format
}
```

#### Required Options
- **`host`**: Loki server URL (e.g., `'http://localhost:3100'`)

#### Example Configuration
```typescript
const logger = createLogger({
  serviceName: 'my-api',
  transports: {
    loki: {
      host: 'http://localhost:3100',
      labels: { 
        environment: 'production',
        version: '1.0.0'
      },
      batching: true,
      interval: 5000
    }
  }
})
```

### Telegram Transport

```typescript
interface TelegramTransportOptions {
  botToken: string
  chatId: number
  opts?: {
    messageThreadId?: number
    parseMode?: string
    level?: string
    unique?: boolean
    silent?: boolean
    disableNotification?: boolean
    name?: string
    template?: string
    formatMessage?: (params: any, info: any) => string
    handleExceptions?: boolean
    batchingDelay?: number
    batchingSeparator?: string
  }
}
```

#### Required Options
- **`botToken`**: Telegram bot token from BotFather
- **`chatId`**: Telegram chat ID to send messages to

#### Example Configuration
```typescript
const logger = createLogger({
  serviceName: 'critical-service',
  transports: {
    telegram: {
      botToken: 'YOUR_BOT_TOKEN',
      chatId: -1001234567890,
      opts: {
        level: 'error', // Only send error and above
        disableNotification: false,
        parseMode: 'Markdown'
      }
    }
  }
})
```

## Usage Examples

### Basic Console Logging

```typescript
import { createLogger } from 'omnilogs'

const logger = createLogger({
  serviceName: 'my-app',
  level: 'debug',
  transports: {
    console: {
      type: 'detailed'
    }
  }
})

// Different log levels
logger.critical('System is down!')
logger.error('Database connection failed', { error: 'ECONNREFUSED' })
logger.warn('High memory usage detected', { usage: '85%' })
logger.success('Payment processed successfully', { amount: 100, currency: 'USD' })
logger.info('User logged in', { userId: 123 })
logger.debug('Cache hit', { key: 'user:123', ttl: 300 })
```

### Multiple Transports

```typescript
const logger = createLogger({
  serviceName: 'production-api',
  level: 'info',
  dateFormat: 'DD/MM/YYYY HH:mm:ss',
  transports: {
    console: {
      type: 'compact'
    },
    loki: {
      host: 'https://loki.company.com',
      basicAuth: 'username:password',
      labels: {
        environment: 'production',
        service: 'api-gateway'
      }
    },
    telegram: {
      botToken: process.env.TELEGRAM_BOT_TOKEN!,
      chatId: parseInt(process.env.TELEGRAM_CHAT_ID!),
      opts: {
        level: 'error',
        template: '[{level}] {service}: {message}',
        disableNotification: true
      }
    }
  }
})
```

### Custom Format

```typescript
import { format } from 'winston'

const customFormat = format.printf(({ timestamp, level, message, service }) => {
  return `${timestamp} | ${level.toUpperCase()} | ${service} | ${message}`
})

const logger = createLogger({
  serviceName: 'custom-service',
  transports: {
    console: {
      type: 'detailed',
      customFormat
    }
  }
})
```

### Error Handling

```typescript
const logger = createLogger({
  serviceName: 'error-prone-service',
  transports: {
    console: { type: 'detailed' },
    telegram: {
      botToken: 'YOUR_BOT_TOKEN',
      chatId: -1001234567890,
      opts: {
        level: 'error',
        handleExceptions: true
      }
    }
  }
})

// Automatically handles uncaught exceptions and rejections
process.on('uncaughtException', (error) => {
  logger.critical('Uncaught Exception', { error: error.message, stack: error.stack })
})

process.on('unhandledRejection', (reason) => {
  logger.critical('Unhandled Rejection', { reason })
})
```

## Log Levels

The logger supports 6 log levels with corresponding colors:

| Level | Priority | Color | Description |
|-------|----------|-------|-------------|
| `critical` | 0 | Magenta | System failures, immediate attention required |
| `error` | 1 | Red | Error conditions, functionality affected |
| `warn` | 2 | Yellow | Warning conditions, potential issues |
| `success` | 3 | Green | Successful operations, positive outcomes |
| `info` | 4 | Cyan | General information, normal operations |
| `debug` | 5 | Gray | Detailed debugging information |

## Environment Variables

For sensitive configuration like Telegram tokens, use environment variables:

```bash
# .env file
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHAT_ID=-1001234567890
LOKI_HOST=http://localhost:3100
LOKI_BASIC_AUTH=username:password
```

```typescript
import dotenv from 'dotenv'
dotenv.config()

const logger = createLogger({
  serviceName: 'secure-app',
  transports: {
    telegram: {
      botToken: process.env.TELEGRAM_BOT_TOKEN!,
      chatId: parseInt(process.env.TELEGRAM_CHAT_ID!),
      opts: { level: 'error' }
    },
    loki: {
      host: process.env.LOKI_HOST!,
      basicAuth: process.env.LOKI_BASIC_AUTH
    }
  }
})
```

## Development Setup

```bash
# Clone the repository
git clone https://github.com/yaman-694/logger.git

# Navigate to package directory
cd logger/package

# Install dependencies
npm install

# Build the project
npm run build

# Run tests
npm test

# Development mode with watch
npm run dev
```

## TypeScript Support

The package includes full TypeScript definitions. All interfaces and types are exported for your convenience:

```typescript
import { 
  createLogger, 
  type LoggerOptions,
  type LokiTransportOptions,
  type TelegramTransportOptions 
} from 'omnilogs'

// Full type safety
const config: LoggerOptions = {
  serviceName: 'typed-service',
  level: 'info',
  transports: {
    console: { type: 'detailed' }
  }
}

const logger = createLogger(config)
```

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built on top of [Winston](https://github.com/winstonjs/winston)
- Loki transport powered by [winston-loki](https://github.com/JaniAnttonen/winston-loki)
- Telegram transport powered by [winston-telegram](https://github.com/ivanmarban/winston-telegram)

## Support

- [Bug Reports](https://github.com/yaman-694/logger/issues)
- [Feature Requests](https://github.com/yaman-694/logger/issues)
- [Email Support](mailto:yamanjain694@gmail.com)
- [Documentation](https://github.com/yaman-694/logger#readme)

## Roadmap

- [ ] File transport support
- [ ] Database transport options
- [ ] Custom transport plugin system
- [ ] Performance metrics and monitoring
- [ ] Log rotation and archiving
- [ ] Configuration validation
- [ ] CLI tool for log management

---

Made with by [Yaman Jain](https://github.com/yaman-694)