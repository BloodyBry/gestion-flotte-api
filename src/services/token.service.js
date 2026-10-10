const jwt = require("jsonwebtoken");
const crypto = require("crypto");

function obtenirSecret(type) {
    const nomVariable = type === "access"
        ? "JWT_SECRET"
        : "JWT_REFRESH_SECRET";

    const secret = process.env[nomVariable];

    if (!secret || secret.length < 64) {
        throw new Error(`${nomVariable} est manquante ou trop courte`);
    }

    return secret;
}

function creerToken(utilisateur, type) {
    const duree = type === "access"
        ? process.env.JWT_EXPIRES_IN || "15m"
        : process.env.JWT_REFRESH_EXPIRES_IN || "7d";

    return jwt.sign(
        { type },
        obtenirSecret(type),
        {
            subject: utilisateur._id.toString(),
            expiresIn: duree,
            algorithm: "HS256",
            jwtid: crypto.randomUUID()
        }
    );
}

function verifierToken(token, type) {
    const secret = obtenirSecret(type);
    let contenu;

    try {
        contenu = jwt.verify(token, secret, {
            algorithms: ["HS256"]
        });
    } catch (error) {
        const erreur = new Error(
            error.name === "TokenExpiredError"
                ? "Token expiré"
                : "Token invalide"
        );

        erreur.status = 401;
        throw erreur;
    }

    if (
        !contenu ||
        contenu.type !== type ||
        typeof contenu.sub !== "string" ||
        !/^[a-fA-F0-9]{24}$/.test(contenu.sub) ||
        !Number.isInteger(contenu.exp)
    ) {
        const error = new Error("Token invalide");
        error.status = 401;
        throw error;
    }

    return contenu;
}

function creerTokenAcces(utilisateur) {
    return creerToken(utilisateur, "access");
}

function creerTokenRefresh(utilisateur) {
    return creerToken(utilisateur, "refresh");
}

function verifierTokenAcces(token) {
    return verifierToken(token, "access");
}

function verifierTokenRefresh(token) {
    return verifierToken(token, "refresh");
}

function hacherToken(token) {
    return crypto.createHash("sha256").update(token).digest("hex");
}

module.exports = {
    creerTokenAcces,
    creerTokenRefresh,
    verifierTokenAcces,
    verifierTokenRefresh,
    hacherToken
};