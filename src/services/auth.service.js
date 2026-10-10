const bcrypt = require("bcrypt");
const Utilisateur = require("../models/utilisateur.model");
const tokenService = require("./token.service");

async function connecterUtilisateur(donnees = {}) {
    if (
        typeof donnees.email !== "string" ||
        donnees.email.trim() === "" ||
        typeof donnees.motDePasse !== "string" ||
        donnees.motDePasse === ""
    ) {
        const error = new Error("L'email et le mot de passe sont obligatoires");
        error.status = 400;
        throw error;
    }

    if (Buffer.byteLength(donnees.motDePasse, "utf8") > 72) {
        const error = new Error("Le mot de passe est trop long");
        error.status = 400;
        throw error;
    }

    const email = donnees.email.trim().toLowerCase();

    const utilisateur = await Utilisateur.findOne({ email })
        .select("+motDePasse");

    if (
        !utilisateur ||
        !(await bcrypt.compare(donnees.motDePasse, utilisateur.motDePasse))
    ) {
        const error = new Error("Email ou mot de passe incorrect");
        error.status = 401;
        throw error;
    }

    if (!utilisateur.actif) {
        const error = new Error("Ce compte est désactivé");
        error.status = 403;
        throw error;
    }

    const accessToken = tokenService.creerTokenAcces(utilisateur);
    const refreshToken = tokenService.creerTokenRefresh(utilisateur);

    utilisateur.refreshTokenHash = tokenService.hacherToken(refreshToken);

    await utilisateur.save();

    return {
        accessToken,
        refreshToken,
        utilisateur: {
            id: utilisateur._id,
            nom: utilisateur.nom,
            email: utilisateur.email,
            role: utilisateur.role
        }
    };
}

async function authentifierUtilisateur(token) {
    const contenu = tokenService.verifierTokenAcces(token);

    const utilisateur = await Utilisateur.findById(contenu.sub);

    if (!utilisateur) {
        const error = new Error("Compte utilisateur introuvable");
        error.status = 401;
        throw error;
    }

    if (!utilisateur.actif) {
        const error = new Error("Ce compte est désactivé");
        error.status = 403;
        throw error;
    }

    return utilisateur;
}


async function renouvelerTokens(donnees = {}) {
    if (
        typeof donnees.refreshToken !== "string" ||
        donnees.refreshToken.trim() === ""
    ) {
        const error = new Error("Le refresh token est obligatoire");
        error.status = 400;
        throw error;
    }

    const contenu = tokenService.verifierTokenRefresh(donnees.refreshToken);

    const compte = { _id: contenu.sub };

    const accessToken = tokenService.creerTokenAcces(compte);
    const refreshToken = tokenService.creerTokenRefresh(compte);

    const utilisateur = await Utilisateur.findOneAndUpdate(
        {
            _id: contenu.sub,
            actif: true,
            refreshTokenHash: tokenService.hacherToken(donnees.refreshToken)
        },
        {
            $set: {
                refreshTokenHash: tokenService.hacherToken(refreshToken)
            }
        },
        {
            returnDocument: "after"
        }
    );

    if (!utilisateur) {
        const error = new Error(
            "Refresh token révoqué, déjà utilisé ou compte indisponible"
        );
        error.status = 401;
        throw error;
    }

    return {
        accessToken,
        refreshToken
    };
}


async function deconnecterUtilisateur(donnees = {}) {
    if (
        typeof donnees.refreshToken !== "string" ||
        donnees.refreshToken.trim() === ""
    ) {
        const error = new Error("Le refresh token est obligatoire");
        error.status = 400;
        throw error;
    }

    const contenu = tokenService.verifierTokenRefresh(donnees.refreshToken);

    const utilisateur = await Utilisateur.findOneAndUpdate(
        {
            _id: contenu.sub,
            refreshTokenHash: tokenService.hacherToken(donnees.refreshToken)
        },
        {
            $set: {
                refreshTokenHash: null
            }
        },
        {
            returnDocument: "after"
        }
    );

    if (!utilisateur) {
        const error = new Error("Refresh token révoqué ou déjà utilisé");
        error.status = 401;
        throw error;
    }

    return {
        message: "Déconnexion réussie"
    };
}


module.exports = {
    connecterUtilisateur,
    authentifierUtilisateur,
    renouvelerTokens,
    deconnecterUtilisateur
};