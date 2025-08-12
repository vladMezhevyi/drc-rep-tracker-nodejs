import rateLimit from 'express-rate-limit';

export const limiterMiddleware = rateLimit({
  windowMs: 15 * 60 * 1000, // How long to remember requests for, in millisecond
  limit: 100, // How many requests to allow
  message: { message: 'Too much requests' }, // Response to return after limit is reached
  standardHeaders: 'draft-8', // Enable the Ratelimit header
  legacyHeaders: false, // Disable the X-Rate-Limit header
  ipv6Subnet: 60 // How many bits of IPv6 addresses to use in default keyGenerator
});
