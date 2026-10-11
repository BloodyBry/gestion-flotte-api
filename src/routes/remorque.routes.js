const express = require("express");
const remorqueController = require("../controllers/remorque.controller");
const {
    verifierAuthentification,
    exigerAdmin
} = require("../middlewares/auth.middleware");

const router = express.Router();

const validerBody = require("../middlewares/validation.middleware");

const {
    archivageRemorqueSchema
} = require("../validations/remorque.validation");

router.use(verifierAuthentification, exigerAdmin);

router.post("/", remorqueController.creerRemorque);
router.get("/", remorqueController.listerRemorques);
router.get("/:id", remorqueController.obtenirRemorque);
router.patch("/:id", remorqueController.modifierRemorque);

router.patch(
    "/:id/archivage",
    validerBody(archivageRemorqueSchema),
    remorqueController.modifierArchivageRemorque
);

module.exports = router;