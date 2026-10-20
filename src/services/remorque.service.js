const Remorque = require("../models/remorque.model");
const remorqueRepository = require("../repositories/remorque.repository");

async function creerRemorque(donnees = {}) {
    const remorque = await remorqueRepository.creerRemorque({
        immatriculation: donnees.immatriculation,
        type: donnees.type,
        kilometrageTotal: donnees.kilometrageTotal
    });

    return remorque;
}

async function listerRemorques() {
    return remorqueRepository.listerRemorques();
}

async function obtenirRemorque(id) {
    const remorque = await remorqueRepository.obtenirRemorque(id);

    if (!remorque) {
        const erreur = new Error("Remorque introuvable");
        erreur.status = 404;
        throw erreur;
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

    await remorqueRepository.enregistrerRemorque(remorque);

    return remorque;
}

async function modifierArchivageRemorque(id, donnees = {}) {
    if (!/^[a-fA-F0-9]{24}$/.test(id)) {
        const erreur = new Error("Identifiant remorque invalide");
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

    const remorque = await Remorque.findByIdAndUpdate(
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

    if (!remorque) {
        const erreur = new Error("Remorque introuvable");
        erreur.status = 404;
        throw erreur;
    }

    return remorque;
}


module.exports = {
    creerRemorque,
    listerRemorques,
    obtenirRemorque,
    modifierRemorque,
    modifierArchivageRemorque
};