const dateFin = new Date(process.env.API_V1_SUNSET);

if (Number.isNaN(dateFin.getTime())) {
    throw new Error("API_V1_SUNSET est manquante ou invalide");
}

function annoncerFinVersion(req, res, next) {
    res.setHeader("Sunset", dateFin.toUTCString());

    next();
}

module.exports = annoncerFinVersion;