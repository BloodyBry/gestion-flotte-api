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
        message = "Cette immatriculation existe déjà.";
    }

    if (status >= 500) {
        console.error(error);
    }

    res.status(status).json({ message });
}

module.exports = gererErreur;