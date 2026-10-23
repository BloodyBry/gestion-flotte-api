const { slowDown } = require("express-slow-down");
const { RedisStore } = require("rate-limit-redis");
const { redisClient } = require("../config/redis");

const seuil = Number(process.env.SLOW_DOWN_AFTER || 50);

const ralentirRequetes = slowDown({
    windowMs: 60 * 1000,

    delayAfter: seuil,

    delayMs: (nombreRequetes) => {
        return (nombreRequetes - seuil) * 1000;
    },

    maxDelayMs: 2000,

    store: new RedisStore({
        sendCommand: (...args) => redisClient.sendCommand(args),
        prefix: "flotte:ralentissement:"
    })
});

module.exports = ralentirRequetes;