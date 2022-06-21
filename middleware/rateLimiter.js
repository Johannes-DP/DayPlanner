const { RateLimiterMemory } = require('rate-limiter-flexible');
const logger = require('../config/logger');

const options = {
  points: 10, // 10 requests
  duration: 1, // Per 1 second by IP
  blockDuration: 15, // If used more than bucked blocked for 30 seconds
};

const rateLimiter = new RateLimiterMemory(options);

const bucketRateLimiter = (request, res, next) => {
  logger.info(request.ip);
  rateLimiter.consume(request.ip)
    .then(() => {
      next();
    })
    .catch(() => {
      res.status(429).json({ status: 429, message: 'Too Many Requests' });
    });
};

module.exports = {
  bucketRateLimiter,
  rateLimiter,
};
