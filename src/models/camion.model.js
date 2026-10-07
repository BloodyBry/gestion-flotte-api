const mongoose = require("mongoose");

const camionSchema = new mongoose.Schema(
    {
        immatriculation: {
            type: String,
            required: [true, "L'immatriculation est obligatoire"],
            trim: true,
            uppercase: true,
            unique: true
        },
        marque: {
            type: String,
            required: [true, "La marque est obligatoire"],
            trim: true
        },
        kilometrageTotal: {
            type: Number,
            required: [true, "Le kilométrage est obligatoire"],
            min: [0, "Le kilométrage ne peut pas être négatif"]
        },
        statut: {
            type: String,
            enum: ["disponible", "maintenance"],
            default: "disponible"
        }
    },
    {
        timestamps: true
    }
);

const Camion = mongoose.model("Camion", camionSchema);

module.exports = Camion;