const express = require("express");
const authController = require("../controllers/auth.controller");
const validerBody = require("../middlewares/validation.middleware");

const {
    connexionSchema,
    refreshTokenSchema
} = require("../validations/auth.validation");

const router = express.Router();

router.post(
    "/login",
    validerBody(connexionSchema),
    authController.seConnecter
);

router.post(
    "/refresh",
    validerBody(refreshTokenSchema),
    authController.renouvelerTokens
);

router.post(
    "/logout",
    validerBody(refreshTokenSchema),
    authController.seDeconnecter
);

module.exports = router;