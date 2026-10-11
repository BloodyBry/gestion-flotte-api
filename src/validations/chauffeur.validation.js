const Joi = require("joi");

const creationChauffeurSchema = Joi.object({
    utilisateur: Joi.string()
        .hex()
        .length(24)
        .required()
        .messages({
            "string.hex":
                "L'identifiant utilisateur doit être hexadécimal",
            "string.length":
                "L'identifiant utilisateur doit contenir 24 caractères"
        }),

    numeroPermis: Joi.string()
        .trim()
        .uppercase()
        .max(50)
        .required(),

    telephone: Joi.string()
        .trim()
        .pattern(/^\+?[0-9]{8,15}$/)
        .required()
        .messages({
            "string.pattern.base":
                "Le téléphone doit contenir entre 8 et 15 chiffres, avec un + éventuel au début"
        })
});

const modificationChauffeurSchema = Joi.object({
    numeroPermis: creationChauffeurSchema
        .extract("numeroPermis")
        .optional(),

    telephone: creationChauffeurSchema
        .extract("telephone")
        .optional()
})
    .min(1)
    .messages({
        "object.min":
            "Vous devez renseigner au moins le numéro de permis ou le téléphone"
    });

module.exports = {
    creationChauffeurSchema,
    modificationChauffeurSchema
};