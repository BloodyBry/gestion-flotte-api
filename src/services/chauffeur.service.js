const Chauffeur = require("../models/chauffeur.model");
const utilisateurService = require("./utilisateur.service");

async function creerChauffeur(donnees) {
    const utilisateur =
        await utilisateurService.obtenirCompteChauffeur(
            donnees.utilisateur
        );

    await Chauffeur.init();

    const chauffeur = await Chauffeur.create({
        utilisateur: utilisateur._id,
        numeroPermis: donnees.numeroPermis,
        telephone: donnees.telephone
    });

    return chauffeur.populate(
        "utilisateur",
        "nom email role actif"
    );
}

async function listerChauffeurs() {
    return Chauffeur.find().populate(
        "utilisateur",
        "nom email role actif"
    );
}

async function obtenirChauffeur(id) {
    if (!/^[a-fA-F0-9]{24}$/.test(id)) {
        const erreur = new Error("Identifiant chauffeur invalide");
        erreur.status = 400;
        throw erreur;
    }

    const chauffeur = await Chauffeur.findById(id).populate(
        "utilisateur",
        "nom email role actif"
    );

    if (!chauffeur) {
        const erreur = new Error("Fiche chauffeur introuvable");
        erreur.status = 404;
        throw erreur;
    }

    return chauffeur;
}

async function modifierChauffeur(id, donnees = {}) {
    for (const champ of Object.keys(donnees)) {
        if (champ !== "numeroPermis" && champ !== "telephone") {
            const erreur = new Error(
                "Seuls les champs numeroPermis et telephone sont autorisés"
            );
            erreur.status = 400;
            throw erreur;
        }
    }

    if (
        donnees.numeroPermis === undefined &&
        donnees.telephone === undefined
    ) {
        const erreur = new Error(
            "Vous devez renseigner au moins le numéro de permis ou le téléphone"
        );
        erreur.status = 400;
        throw erreur;
    }

    const chauffeur = await obtenirChauffeur(id);

    if (donnees.numeroPermis !== undefined) {
        chauffeur.numeroPermis = donnees.numeroPermis;
    }

    if (donnees.telephone !== undefined) {
        chauffeur.telephone = donnees.telephone;
    }

    await chauffeur.save();

    return chauffeur;
}

module.exports = {
    creerChauffeur,
    listerChauffeurs,
    obtenirChauffeur,
    modifierChauffeur
};