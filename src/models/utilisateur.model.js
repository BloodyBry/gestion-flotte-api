const mongoose = require("mongoose");

const utilisateurSchema = new mongoose.Schema(
    {
        nom: {
            type: String,
            required: [true, "Le nom est obligatoire"],
            trim: true
        },
        email: {
            type: String,
            required: [true, "L'email est obligatoire"],
            trim: true,
            lowercase: true,
            unique: true,
            match: [
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                "Le format de l'email est invalide"
            ]
        },
        motDePasse: {
            type: String,
            required: [true, "Le mot de passe est obligatoire"],
            select: false
        },
        refreshTokenHash: {
            type: String,
            default: null,
            select: false
        },
        role: {
            type: String,
            enum: ["admin", "chauffeur"],
            default: "chauffeur"
        },
        actif: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

const Utilisateur = mongoose.model("Utilisateur", utilisateurSchema);

module.exports = Utilisateur;