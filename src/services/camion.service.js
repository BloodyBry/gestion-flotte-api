const Camion = require("../models/camion.model");

async function creerCamion(donnees = {}) {
    await Camion.init();

    const camion = await Camion.create({
        immatriculation: donnees.immatriculation,
        marque: donnees.marque,
        kilometrageTotal: donnees.kilometrageTotal
    });

    return camion;
}

async function listerCamions() {
    const camions = await Camion.find();

    return camions;
}

async function obtenirCamion(id) {
    const camion = await Camion.findById(id);

    if (!camion) {
        const error = new Error("Camion introuvable");
        error.status = 404;
        throw error;
    }

    return camion;
}


async function modifierCamion(id, donnees = {}) {
    for (const champ of Object.keys(donnees)) {
        if (champ !== "immatriculation" && champ !== "marque") {
            const error = new Error(
                "Seuls les champs immatriculation et marque sont modifiables ici"
            );
            error.status = 400;
            throw error;
        }
    }

    if (
        donnees.immatriculation === undefined &&
        donnees.marque === undefined
    ) {
        const error = new Error("Aucun champ à modifier");
        error.status = 400;
        throw error;
    }

    const camion = await obtenirCamion(id);

    if (donnees.immatriculation !== undefined) {
        camion.immatriculation = donnees.immatriculation;
    }

    if (donnees.marque !== undefined) {
        camion.marque = donnees.marque;
    }

    await camion.save();

    return camion;
}



module.exports = {
    creerCamion,
    listerCamions,
    obtenirCamion,
    modifierCamion
};