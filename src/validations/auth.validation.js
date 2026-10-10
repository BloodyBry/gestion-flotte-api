const Joi = require("joi");

const emailSchema = Joi.string()
    .trim()
    .lowercase()
    .email({ tlds: { allow: false } })
    .required();

const connexionSchema = Joi.object({
    email: emailSchema,
    motDePasse: Joi.string().required()
});

const refreshTokenSchema = Joi.object({
    refreshToken: Joi.string().trim().required()
});

const creationCompteChauffeurSchema = Joi.object({
    nom: Joi.string().trim().max(100).required(),
    email: emailSchema,
    motDePasse: Joi.string().min(8).required()
});

module.exports = {
    connexionSchema,
    refreshTokenSchema,
    creationCompteChauffeurSchema
};