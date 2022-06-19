/* eslint-disable no-shadow */
const { createLogger, format, transports } = require('winston');

const {
  combine, timestamp, printf, colorize,
} = format;
require('winston-daily-rotate-file');

const transport = new transports.DailyRotateFile({
  filename: 'logs/application-%DATE%.log',
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
});

const customFormat = printf(
  ({
    level, message, label, timestamp,
  }) => `${timestamp} [${label}] ${level}: ${message}`,
);

const customFormatConsole = printf(
  ({ level, message, timestamp }) => `${level}: ${timestamp} ${message}`,
);

const logger = createLogger({
  level: 'info',
  format: combine(timestamp(), customFormat),
  defaultMeta: { service: 'user-service' },
  transports: [
    new transports.File({
      filename: 'logs/error.log',
      level: 'error',
    }),
    transport,
  ],
});

logger.add(
  new transports.Console({
    format: combine(colorize(), timestamp(), customFormatConsole),
    json: true,
    colorize: true,
  }),
);

if (process.env.NODE_ENV === 'production') {
  console.log = () => {};
}

module.exports = logger;
