function gererErreur(error, req, res, next) {
    let status = error.status || 500;
    let message = "Erreur interne du serveur";

    if (status < 500) {
        message = error.message;
    }

    if (
        error.name === "ValidationError" ||
        error.name === "CastError"
    ) {
        status = 400;
        message = error.message;
    }

    if (error.code === 11000) {
        status = 409;

        if (error.keyPattern && error.keyPattern.email) {
            message = "Cet email est déjà utilisé.";
        } else if (
            error.keyPattern &&
            error.keyPattern.utilisateur
        ) {
            message = "Ce compte possède déjà une fiche chauffeur.";
        } else if (
            error.keyPattern &&
            error.keyPattern.numeroPermis
        ) {
            message = "Ce numéro de permis est déjà utilisé.";
        } else {
            message = "Cette immatriculation existe déjà.";
        }
    }

    if (status >= 500) {
        console.error(error);
    }

    res.status(status).json({ message });
}

module.exports = gererErreur;