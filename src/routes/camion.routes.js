const express = require("express");
const camionController = require("../controllers/camion.controller");
const {
    verifierAuthentification,
    exigerAdmin
} = require("../middlewares/auth.middleware");

const router = express.Router();

router.use(verifierAuthentification, exigerAdmin);

router.post("/", camionController.creerCamion);
router.get("/", camionController.listerCamions);
router.get("/:id", camionController.obtenirCamion);
router.patch("/:id", camionController.modifierCamion);

module.exports = router;