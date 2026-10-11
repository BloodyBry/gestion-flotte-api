const express = require("express");
const chauffeurController = require("../controllers/chauffeur.controller");
const validerBody = require("../middlewares/validation.middleware");

const {
    verifierAuthentification,
    exigerAdmin
} = require("../middlewares/auth.middleware");

const {
    creationChauffeurSchema,
    modificationChauffeurSchema
} = require("../validations/chauffeur.validation");

const router = express.Router();

router.use(verifierAuthentification, exigerAdmin);

router.post(
    "/",
    validerBody(creationChauffeurSchema),
    chauffeurController.creerChauffeur
);

router.get(
    "/",
    chauffeurController.listerChauffeurs
);

router.get(
    "/:id",
    chauffeurController.obtenirChauffeur
);

router.patch(
    "/:id",
    validerBody(modificationChauffeurSchema),
    chauffeurController.modifierChauffeur
);

module.exports = router;