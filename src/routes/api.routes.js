const express = require("express");

const camionRoutes = require("./camion.routes");
const remorqueRoutes = require("./remorque.routes");
const authRoutes = require("./auth.routes");
const utilisateurRoutes = require("./utilisateur.routes");
const chauffeurRoutes = require("./chauffeur.routes");

const router = express.Router();

router.use("/camions", camionRoutes);
router.use("/remorques", remorqueRoutes);
router.use("/auth", authRoutes);
router.use("/utilisateurs", utilisateurRoutes);
router.use("/chauffeurs", chauffeurRoutes);

module.exports = router;