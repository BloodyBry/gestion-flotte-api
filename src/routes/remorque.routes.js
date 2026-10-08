const express = require("express");
const remorqueController = require("../controllers/remorque.controller");

const router = express.Router();

router.post("/", remorqueController.creerRemorque);
router.get("/", remorqueController.listerRemorques);
router.get("/:id", remorqueController.obtenirRemorque);
router.patch("/:id", remorqueController.modifierRemorque);

module.exports = router;