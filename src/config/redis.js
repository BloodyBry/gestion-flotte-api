const { createClient } = require("redis");

const redisClient = createClient({
    url: process.env.REDIS_URL
});

redisClient.on("error", (erreur) => {
    console.error("Erreur Redis :", erreur.message);
});

async function connecterRedis() {
    if (!process.env.REDIS_URL) {
        throw new Error("REDIS_URL est manquante dans .env");
    }

    await redisClient.connect();
    await redisClient.ping();

    console.log("Connexion Redis réussie");
}

module.exports = {
    redisClient,
    connecterRedis
};