require("dotenv").config();
const { connecterRedis } = require("./config/redis");

const connecterDB = require("./config/db");

const PORT = process.env.PORT || 3000;

async function demarrerServeur() {
    try {
        await connecterDB();
        await connecterRedis();

        const app = require("./app");

        app.listen(PORT, () => {
            console.log(`Serveur démarré sur http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Échec du démarrage :", error.message);
        process.exit(1);
    }
}

demarrerServeur();