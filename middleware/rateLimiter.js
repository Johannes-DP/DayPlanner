const {RateLimiterMemory} = require('rate-limiter-flexible');
const logger = require('../config/logger');

const opts = {
  points: 10, // 10 requests
  duration: 1, // per 1 second by IP
  blockDuration: 15 // if used more than bucked blocked for 30 seconds
};

const rateLimiter = new RateLimiterMemory(opts);

const rateLimiterMiddleware = (req, res, next) => {
  logger.info(req.ip)
  rateLimiter.consume(req.ip)
    .then(() => {
      next();
    })
    .catch(() => {
      res.status(429).json({status: 429, message:'Too Many Requests'});
    });
};

module.exports = {
  rateLimiterMiddleware,
  rateLimiter
};