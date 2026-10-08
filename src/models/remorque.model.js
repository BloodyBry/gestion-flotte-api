const mongoose = require("mongoose");

const remorqueSchema = new mongoose.Schema(
    {
        immatriculation: {
            type: String,
            required: [true, "L'immatriculation est obligatoire"],
            trim: true,
            uppercase: true,
            unique: true
        },
        type: {
            type: String,
            required: [true, "Le type de remorque est obligatoire"],
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

const Remorque = mongoose.model("Remorque", remorqueSchema);

module.exports = Remorque;