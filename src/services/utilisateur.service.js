const bcrypt = require("bcrypt");
const Utilisateur = require("../models/utilisateur.model");

async function creerUtilisateur(donnees = {}) {
    if (
        typeof donnees.motDePasse !== "string" ||
        donnees.motDePasse.length < 8
    ) {
        const error = new Error(
            "Le mot de passe doit contenir au moins 8 caractères"
        );
        error.status = 400;
        throw error;
    }

    if (Buffer.byteLength(donnees.motDePasse, "utf8") > 72) {
        const error = new Error("Le mot de passe est trop long");
        error.status = 400;
        throw error;
    }

    const motDePasseHache = await bcrypt.hash(donnees.motDePasse, 12);

    await Utilisateur.init();

    const utilisateur = await Utilisateur.create({
        nom: donnees.nom,
        email: donnees.email,
        motDePasse: motDePasseHache,
        role: donnees.role
    });

    return {
        id: utilisateur._id,
        nom: utilisateur.nom,
        email: utilisateur.email,
        role: utilisateur.role
    };
}


async function creerCompteChauffeur(donnees = {}) {
    for (const champ of Object.keys(donnees)) {
        if (
            champ !== "nom" &&
            champ !== "email" &&
            champ !== "motDePasse"
        ) {
            const error = new Error(
                "Seuls les champs nom, email et motDePasse sont autorisés"
            );
            error.status = 400;
            throw error;
        }
    }

    return creerUtilisateur({
        nom: donnees.nom,
        email: donnees.email,
        motDePasse: donnees.motDePasse,
        role: "chauffeur"
    });
}


module.exports = {
    creerUtilisateur,
    creerCompteChauffeur
};