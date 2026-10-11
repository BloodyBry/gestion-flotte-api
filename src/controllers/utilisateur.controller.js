const utilisateurService = require("../services/utilisateur.service");

async function creerCompteChauffeur(req, res, next) {
    try {
        const utilisateur = await utilisateurService.creerCompteChauffeur(
            req.body
        );

        res.status(201).json(utilisateur);
    } catch (error) {
        next(error);
    }
}

async function modifierStatutChauffeur(req, res, next) {
    try {
        const utilisateur =
            await utilisateurService.modifierStatutChauffeur(
                req.params.id,
                req.body
            );

        res.status(200).json(utilisateur);
    } catch (erreur) {
        next(erreur);
    }
}

async function listerComptesChauffeurs(req, res, next) {
    try {
        const utilisateurs =
            await utilisateurService.listerComptesChauffeurs();

        res.status(200).json(utilisateurs);
    } catch (erreur) {
        next(erreur);
    }
}

async function obtenirCompteChauffeur(req, res, next) {
    try {
        const utilisateur =
            await utilisateurService.obtenirCompteChauffeur(
                req.params.id
            );

        res.status(200).json(utilisateur);
    } catch (erreur) {
        next(erreur);
    }
}

async function modifierCompteChauffeur(req, res, next) {
    try {
        const utilisateur =
            await utilisateurService.modifierCompteChauffeur(
                req.params.id,
                req.body
            );

        res.status(200).json(utilisateur);
    } catch (erreur) {
        next(erreur);
    }
}

module.exports = {
    creerCompteChauffeur,
    modifierStatutChauffeur,
    listerComptesChauffeurs,
    obtenirCompteChauffeur,
    modifierCompteChauffeur
};