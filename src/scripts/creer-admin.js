require("dotenv").config();

const mongoose = require("mongoose");
const connecterDB = require("../config/db");
const utilisateurService = require("../services/utilisateur.service");

async function creerAdmin() {
    try {
        await connecterDB();

        const administrateur = await utilisateurService.creerUtilisateur({
            nom: process.env.ADMIN_NOM,
            email: process.env.ADMIN_EMAIL,
            motDePasse: process.env.ADMIN_PASSWORD,
            role: "admin"
        });

        console.log("Administrateur créé avec succès");
        console.log(administrateur);
    } catch (error) {
        if (error.code === 11000) {
            console.error("Un utilisateur possède déjà cet email.");
        } else {
            console.error("Échec de la création :", error.message);
        }

        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();
    }
}

creerAdmin();