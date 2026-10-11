const chauffeurService = require("../services/chauffeur.service");

async function creerChauffeur(req, res, next) {
    try {
        const chauffeur =
            await chauffeurService.creerChauffeur(req.body);

        res.status(201).json(chauffeur);
    } catch (erreur) {
        next(erreur);
    }
}

async function listerChauffeurs(req, res, next) {
    try {
        const chauffeurs =
            await chauffeurService.listerChauffeurs();

        res.status(200).json(chauffeurs);
    } catch (erreur) {
        next(erreur);
    }
}

async function obtenirChauffeur(req, res, next) {
    try {
        const chauffeur =
            await chauffeurService.obtenirChauffeur(
                req.params.id
            );

        res.status(200).json(chauffeur);
    } catch (erreur) {
        next(erreur);
    }
}

async function modifierChauffeur(req, res, next) {
    try {
        const chauffeur =
            await chauffeurService.modifierChauffeur(
                req.params.id,
                req.body
            );

        res.status(200).json(chauffeur);
    } catch (erreur) {
        next(erreur);
    }
}

module.exports = {
    creerChauffeur,
    listerChauffeurs,
    obtenirChauffeur,
    modifierChauffeur
};