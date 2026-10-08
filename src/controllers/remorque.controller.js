const remorqueService = require("../services/remorque.service");

async function creerRemorque(req, res, next) {
    try {
        const remorque = await remorqueService.creerRemorque(req.body);

        res.status(201).json(remorque);
    } catch (error) {
        next(error);
    }
}

async function listerRemorques(req, res, next) {
    try {
        const remorques = await remorqueService.listerRemorques();

        res.status(200).json(remorques);
    } catch (error) {
        next(error);
    }
}

async function obtenirRemorque(req, res, next) {
    try {
        const remorque = await remorqueService.obtenirRemorque(
            req.params.id
        );

        res.status(200).json(remorque);
    } catch (error) {
        next(error);
    }
}

async function modifierRemorque(req, res, next) {
    try {
        const remorque = await remorqueService.modifierRemorque(
            req.params.id,
            req.body
        );

        res.status(200).json(remorque);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    creerRemorque,
    listerRemorques,
    obtenirRemorque,
    modifierRemorque
};