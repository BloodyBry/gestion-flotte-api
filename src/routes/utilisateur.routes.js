const express = require("express");
const utilisateurController = require("../controllers/utilisateur.controller");
const validerBody = require("../middlewares/validation.middleware");

const {
    verifierAuthentification,
    exigerAdmin
} = require("../middlewares/auth.middleware");

const {
    creationCompteChauffeurSchema,
    statutCompteSchema
} = require("../validations/auth.validation");

const router = express.Router();

router.use(verifierAuthentification, exigerAdmin);

router.post(
    "/",
    validerBody(creationCompteChauffeurSchema),
    utilisateurController.creerCompteChauffeur
);

router.patch(
    "/:id/statut",
    validerBody(statutCompteSchema),
    utilisateurController.modifierStatutChauffeur
);

module.exports = router;