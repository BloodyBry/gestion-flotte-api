const express = require("express");
const utilisateurController = require("../controllers/utilisateur.controller");
const validerBody = require("../middlewares/validation.middleware");

const {
    verifierAuthentification,
    exigerAdmin
} = require("../middlewares/auth.middleware");

const {
    creationCompteChauffeurSchema
} = require("../validations/auth.validation");

const router = express.Router();

router.use(verifierAuthentification, exigerAdmin);

router.post(
    "/",
    validerBody(creationCompteChauffeurSchema),
    utilisateurController.creerCompteChauffeur
);

module.exports = router;