const { rateLimit } = require("express-rate-limit");
const { RedisStore } = require("rate-limit-redis");
const { redisClient } = require("../config/redis");

const limiterRequetes = rateLimit({
    windowMs: 60 * 1000,

    limit: Number(process.env.RATE_LIMIT_MAX || 100),

    standardHeaders: "draft-8",
    legacyHeaders: false,

    store: new RedisStore({
        sendCommand: (...args) => redisClient.sendCommand(args),
        prefix: "flotte:limite:"
    }),

    message: {
        message: "Trop de requêtes. Réessayez dans une minute."
    }
});

module.exports = limiterRequetes;