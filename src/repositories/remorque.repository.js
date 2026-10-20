const Remorque = require("../models/remorque.model");

async function listerRemorques() {
    return Remorque.find();
}

async function obtenirRemorque(id) {
    return Remorque.findById(id);
}

async function creerRemorque(donnees) {
    await Remorque.init();

    return Remorque.create(donnees);
}

async function enregistrerRemorque(remorque) {
    return remorque.save();
}

module.exports = {
    listerRemorques,
    obtenirRemorque,
    creerRemorque,
    enregistrerRemorque
};