const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const reglementInterieurSchema = new Schema({
  reglementInterieur: {
    descriptionReglementInterieur: String,
    dateReglementInterieur: String,
    etablissement: {
      nomEtab: String,
      nomChefEtab: String,
      caracteristiqueEtab: String,
      adresseEtab: {
        ville: String,
        quartier: String,
        codePostal: String,
      },
    },
  },
});

const ReglementInterieur = mongoose.model(
  "reglementInterieur",
  reglementInterieurSchema
);

module.exports = ReglementInterieur;
