const Camion = require("../models/camion.model");

async function listerCamions(filtres = {}) {
    return Camion.find(filtres);
}

async function obtenirCamion(id) {
    return Camion.findById(id);
}

async function creerCamion(donnees) {
    await Camion.init();

    return Camion.create(donnees);
}

async function enregistrerCamion(camion) {
    return camion.save();
}

async function modifierArchivageCamion(id, archive) {
    return Camion.findByIdAndUpdate(
        id,
        { $set: { archive } },
        {
            returnDocument: "after",
            runValidators: true
        }
    );
}

module.exports = {
    listerCamions,
    obtenirCamion,
    creerCamion,
    enregistrerCamion,
    modifierArchivageCamion
};