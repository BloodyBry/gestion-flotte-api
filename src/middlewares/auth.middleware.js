const authService = require("../services/auth.service");

async function verifierAuthentification(req, res, next) {
    try {
        const autorisation = req.get("Authorization") || "";
        const parties = autorisation.trim().split(/\s+/);

        if (
            parties.length !== 2 ||
            parties[0].toLowerCase() !== "bearer"
        ) {
            const error = new Error("Token d'accès requis");
            error.status = 401;
            throw error;
        }

        const token = parties[1];

        req.utilisateur = await authService.authentifierUtilisateur(token);

        next();
    } catch (error) {
        next(error);
    }
}

function exigerAdmin(req, res, next) {
    if (!req.utilisateur || req.utilisateur.role !== "admin") {
        const error = new Error("Accès réservé aux administrateurs");
        error.status = 403;
        return next(error);
    }

    next();
}

module.exports = {
    verifierAuthentification,
    exigerAdmin
};