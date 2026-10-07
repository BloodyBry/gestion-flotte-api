const camionService = require("../services/camion.service");

async function creerCamion(req, res, next) {
    try {
        const camion = await camionService.creerCamion(req.body);

        res.status(201).json(camion);
    } catch (error) {
        next(error);
    }
}

async function listerCamions(req, res, next) {
    try {
        const camions = await camionService.listerCamions();

        res.status(200).json(camions);
    } catch (error) {
        next(error);
    }
}

async function obtenirCamion(req, res, next) {
    try {
        const camion = await camionService.obtenirCamion(req.params.id);

        res.status(200).json(camion);
    } catch (error) {
        next(error);
    }
}


async function modifierCamion(req, res, next) {
    try {
        const camion = await camionService.modifierCamion(
            req.params.id,
            req.body
        );

        res.status(200).json(camion);
    } catch (error) {
        next(error);
    }
}



module.exports = {
    creerCamion,
    listerCamions,
    obtenirCamion,
    modifierCamion
};