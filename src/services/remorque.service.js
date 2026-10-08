const Remorque = require("../models/remorque.model");

async function creerRemorque(donnees = {}) {
    await Remorque.init();

    const remorque = await Remorque.create({
        immatriculation: donnees.immatriculation,
        type: donnees.type,
        kilometrageTotal: donnees.kilometrageTotal
    });

    return remorque;
}

async function listerRemorques() {
    const remorques = await Remorque.find();

    return remorques;
}

async function obtenirRemorque(id) {
    const remorque = await Remorque.findById(id);

    if (!remorque) {
        const error = new Error("Remorque introuvable");
        error.status = 404;
        throw error;
    }

    return remorque;
}


async function modifierRemorque(id, donnees = {}) {
    for (const champ of Object.keys(donnees)) {
        if (champ !== "immatriculation" && champ !== "type") {
            const error = new Error(
                "Seuls les champs immatriculation et type sont modifiables ici"
            );
            error.status = 400;
            throw error;
        }
    }

    if (
        donnees.immatriculation === undefined &&
        donnees.type === undefined
    ) {
        const error = new Error("Aucun champ à modifier");
        error.status = 400;
        throw error;
    }

    const remorque = await obtenirRemorque(id);

    if (donnees.immatriculation !== undefined) {
        remorque.immatriculation = donnees.immatriculation;
    }

    if (donnees.type !== undefined) {
        remorque.type = donnees.type;
    }

    await remorque.save();

    return remorque;
}


module.exports = {
    creerRemorque,
    listerRemorques,
    obtenirRemorque,
    modifierRemorque
};