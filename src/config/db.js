const mongoose = require("mongoose");

async function connecterDB() {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Connexion MongoDB réussie");
}

module.exports = connecterDB;