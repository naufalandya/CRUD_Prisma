const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 5000, 
    max: 1,
    handler: (req, res) => {
        res.status(429).json({ error: 'Too many requests, please try again later.' });
    }  
});

module.exports = limiter;