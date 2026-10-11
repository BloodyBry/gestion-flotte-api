function construireFiltresVehicule(parametres = {}) {
    const filtres = {};

    if (parametres.recherche !== undefined) {
        const recherche = parametres.recherche.replace(
            /[.*+?^${}()|[\]\\]/g,
            "\\$&"
        );

        filtres.immatriculation = {
            $regex: recherche,
            $options: "i"
        };
    }

    if (parametres.statut !== undefined) {
        filtres.statut = parametres.statut;
    }

    if (parametres.archive === true) {
        filtres.archive = true;
    } else if (parametres.archive === false) {
        filtres.archive = {
            $ne: true
        };
    }

    return filtres;
}

module.exports = construireFiltresVehicule;