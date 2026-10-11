const mongoose = require("mongoose");

const chauffeurSchema = new mongoose.Schema(
    {
        utilisateur: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Utilisateur",
            required: [true, "Le compte utilisateur est obligatoire"],
            unique: true
        },

        numeroPermis: {
            type: String,
            required: [true, "Le numéro de permis est obligatoire"],
            trim: true,
            uppercase: true,
            maxlength: 50,
            unique: true
        },

        telephone: {
            type: String,
            required: [true, "Le téléphone est obligatoire"],
            trim: true,
            match: [
                /^\+?[0-9]{8,15}$/,
                "Le téléphone doit contenir entre 8 et 15 chiffres, avec un + éventuel au début"
            ]
        }
    },
    {
        timestamps: true
    }
);

const Chauffeur = mongoose.model("Chauffeur", chauffeurSchema);

module.exports = Chauffeur;