const Joi = require("joi");

const archivageCamionSchema = Joi.object({
    archive: Joi.boolean().strict().required().messages({
        "boolean.base":
            "Le champ archive doit être true ou false, sans guillemets"
    })
});

module.exports = {
    archivageCamionSchema
};