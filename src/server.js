require("dotenv").config();

const app = require("./app");
const connecterDB = require("./config/db");

const PORT = process.env.PORT || 3000;

async function demarrerServeur() {
    try {
        await connecterDB();

        app.listen(PORT, () => {
            console.log(`Serveur démarré sur http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Échec du démarrage :", error.message);
        process.exit(1);
    }
}

demarrerServeur();