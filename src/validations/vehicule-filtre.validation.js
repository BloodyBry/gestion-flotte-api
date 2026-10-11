const Joi = require("joi");

const filtresVehiculeSchema = Joi.object({
    recherche: Joi.string().trim().max(50),

    statut: Joi.string().valid(
        "disponible",
        "maintenance"
    ),

    archive: Joi.boolean()
}).messages({
    "string.base":
        "Le paramètre {{#label}} doit être un texte",

    "string.empty":
        "Le paramètre {{#label}} ne peut pas être vide",

    "string.max":
        "Le paramètre {{#label}} ne doit pas dépasser {{#limit}} caractères",

    "any.only":
        "Le statut doit être disponible ou maintenance",

    "boolean.base":
        "Le paramètre archive doit être true ou false",

    "object.unknown":
        "Le paramètre {{#label}} n'est pas autorisé"
});

module.exports = {
    filtresVehiculeSchema
};