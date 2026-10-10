const authService = require("../services/auth.service");

async function seConnecter(req, res, next) {
    try {
        const resultat = await authService.connecterUtilisateur(req.body);

        res.status(200).json(resultat);
    } catch (error) {
        next(error);
    }
}


async function renouvelerTokens(req, res, next) {
    try {
        const resultat = await authService.renouvelerTokens(req.body);

        res.status(200).json(resultat);
    } catch (error) {
        next(error);
    }
}

async function seDeconnecter(req, res, next) {
    try {
        const resultat = await authService.deconnecterUtilisateur(req.body);

        res.status(200).json(resultat);
    } catch (error) {
        next(error);
    }
}


module.exports = {
    seConnecter,
    renouvelerTokens,
    seDeconnecter
};