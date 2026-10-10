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

module.exports = { creerCompteChauffeur };