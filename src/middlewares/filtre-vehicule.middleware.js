const {
    filtresVehiculeSchema
} = require("../validations/vehicule-filtre.validation");

function validerFiltresVehicule(req, res, next) {
    const { error, value } = filtresVehiculeSchema.validate(
        req.query,
        {
            abortEarly: false,
            allowUnknown: false,
            convert: true
        }
    );

    if (error) {
        const erreur = new Error(error.message);
        erreur.status = 400;

        return next(erreur);
    }

    req.filtresVehicule = value;
    next();
}

module.exports = validerFiltresVehicule;