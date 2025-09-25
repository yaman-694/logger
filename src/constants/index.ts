
import type { DailyRotateFileTransportOptions } from 'winston-daily-rotate-file'
import { ColorLevels } from "../interface/interfaces"

const levelColor: ColorLevels = {
  levels: {
    critical: 0,
    error: 1,
    warn: 2,
    success: 3,
    info: 4,
    debug: 5
  },
  colors: {
    critical: 'magenta', // Bright magenta for critical issues
    error: 'red', // Keep red for errors
    warn: 'yellow', // Keep yellow for warnings
    success: 'green', // Keep green for success
    info: 'cyan', // Cyan for info (better than white)
    debug: 'gray' // Gray for debug (less intrusive than pink)
  }
}

export { levelColor }
