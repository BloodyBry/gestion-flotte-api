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

async function modifierStatutChauffeur(id, donnees = {}) {
    verifierIdentifiantUtilisateur(id);

    if (typeof donnees.actif !== "boolean") {
        const erreur = new Error(
            "Le champ actif doit être un booléen"
        );
        erreur.status = 400;
        throw erreur;
    }

    const modifications = {
        actif: donnees.actif
    };

    if (donnees.actif === false) {
        modifications.refreshTokenHash = null;
    }

    const utilisateur = await Utilisateur.findOneAndUpdate(
        {
            _id: id,
            role: "chauffeur"
        },
        {
            $set: modifications
        },
        {
            returnDocument: "after",
            runValidators: true
        }
    );

    if (!utilisateur) {
        const erreur = new Error("Compte chauffeur introuvable");
        erreur.status = 404;
        throw erreur;
    }

    return {
        id: utilisateur._id,
        nom: utilisateur.nom,
        email: utilisateur.email,
        role: utilisateur.role,
        actif: utilisateur.actif
    };
}

function verifierIdentifiantUtilisateur(id) {
    if (!/^[a-fA-F0-9]{24}$/.test(id)) {
        const erreur = new Error("Identifiant utilisateur invalide");
        erreur.status = 400;
        throw erreur;
    }
}

async function listerComptesChauffeurs() {
    return Utilisateur.find({
        role: "chauffeur"
    }).select("nom email role actif");
}

async function obtenirCompteChauffeur(id) {
    verifierIdentifiantUtilisateur(id);

    const utilisateur = await Utilisateur.findOne({
        _id: id,
        role: "chauffeur"
    }).select("nom email role actif");

    if (!utilisateur) {
        const erreur = new Error("Compte chauffeur introuvable");
        erreur.status = 404;
        throw erreur;
    }

    return utilisateur;
}

async function modifierCompteChauffeur(id, donnees = {}) {
    for (const champ of Object.keys(donnees)) {
        if (champ !== "nom" && champ !== "email") {
            const erreur = new Error(
                "Seuls les champs nom et email sont autorisés"
            );
            erreur.status = 400;
            throw erreur;
        }
    }

    if (donnees.nom === undefined && donnees.email === undefined) {
        const erreur = new Error(
            "Vous devez renseigner au moins le nom ou l'email"
        );
        erreur.status = 400;
        throw erreur;
    }

    const utilisateur = await obtenirCompteChauffeur(id);

    if (donnees.nom !== undefined) {
        utilisateur.nom = donnees.nom;
    }

    if (donnees.email !== undefined) {
        utilisateur.email = donnees.email;
    }

    await utilisateur.save();

    return utilisateur;
}

module.exports = {
    creerUtilisateur,
    creerCompteChauffeur,
    modifierStatutChauffeur,
    listerComptesChauffeurs,
    obtenirCompteChauffeur,
    modifierCompteChauffeur
};