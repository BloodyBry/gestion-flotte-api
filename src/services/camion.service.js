const Camion = require("../models/camion.model");
const construireFiltresVehicule = require("./vehicule-filtre.service");

async function creerCamion(donnees = {}) {
    await Camion.init();

    const camion = await Camion.create({
        immatriculation: donnees.immatriculation,
        marque: donnees.marque,
        kilometrageTotal: donnees.kilometrageTotal
    });

    return camion;
}

async function listerCamions(parametres = {}) {
    const filtres = construireFiltresVehicule(parametres);

    return Camion.find(filtres);
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

async function modifierArchivageCamion(id, donnees = {}) {
    if (!/^[a-fA-F0-9]{24}$/.test(id)) {
        const erreur = new Error("Identifiant camion invalide");
        erreur.status = 400;
        throw erreur;
    }

    if (typeof donnees.archive !== "boolean") {
        const erreur = new Error(
            "Le champ archive doit être un booléen"
        );
        erreur.status = 400;
        throw erreur;
    }

    const camion = await Camion.findByIdAndUpdate(
        id,
        {
            $set: {
                archive: donnees.archive
            }
        },
        {
            returnDocument: "after",
            runValidators: true
        }
    );

    if (!camion) {
        const erreur = new Error("Camion introuvable");
        erreur.status = 404;
        throw erreur;
    }

    return camion;
}

module.exports = {
    creerCamion,
    listerCamions,
    obtenirCamion,
    modifierCamion,
    modifierArchivageCamion
};