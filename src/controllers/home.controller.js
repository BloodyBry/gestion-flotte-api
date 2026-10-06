function afficherAccueil(req, res) {
    res.json({
        message: "Bienvenue dans l'API de gestion de flotte"
    });
}

module.exports = {
    afficherAccueil
};