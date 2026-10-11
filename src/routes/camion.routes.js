const express = require("express");
const camionController = require("../controllers/camion.controller");
const {
    verifierAuthentification,
    exigerAdmin
} = require("../middlewares/auth.middleware");

const router = express.Router();

const validerBody = require("../middlewares/validation.middleware");

const {
    archivageCamionSchema
} = require("../validations/camion.validation");

const validerFiltresVehicule = require("../middlewares/filtre-vehicule.middleware");

router.use(verifierAuthentification, exigerAdmin);

router.post("/", camionController.creerCamion);
router.get(
    "/",
    validerFiltresVehicule,
    camionController.listerCamions
);
router.get("/:id", camionController.obtenirCamion);
router.patch("/:id", camionController.modifierCamion);

router.patch(
    "/:id/archivage",
    validerBody(archivageCamionSchema),
    camionController.modifierArchivageCamion
);

module.exports = router;