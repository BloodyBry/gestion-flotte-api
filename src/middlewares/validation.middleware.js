function validerBody(schema) {
    return function (req, res, next) {
        const { error, value } = schema.validate(req.body ?? {}, {
            abortEarly: false,
            allowUnknown: false,
            messages: {
                "any.required":
                    "Le champ {{#label}} est obligatoire",

                "string.base":
                    "Le champ {{#label}} doit être un texte",

                "string.empty":
                    "Le champ {{#label}} ne peut pas être vide",

                "string.email":
                    "Le champ {{#label}} doit être un email valide",

                "string.min":
                    "Le champ {{#label}} doit contenir au moins {{#limit}} caractères",

                "string.max":
                    "Le champ {{#label}} doit contenir au maximum {{#limit}} caractères",

                "object.unknown":
                    "Le champ {{#label}} n'est pas autorisé",

                "object.base":
                    "Le corps de la requête doit être un objet JSON"
            }
        });

        if (error) {
            const erreur = new Error(error.message);
            erreur.status = 400;

            return next(erreur);
        }

        req.body = value;
        next();
    };
}

module.exports = validerBody;