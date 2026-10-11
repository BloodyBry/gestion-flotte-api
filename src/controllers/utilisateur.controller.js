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

module.exports = {
    creerCompteChauffeur,
    modifierStatutChauffeur
};