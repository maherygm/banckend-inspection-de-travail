const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SecretaireSchema = new Schema({
  secretaire: {
    nom: String,
    prenom: String,
    dateNaissance: String,
    matricule: String,
    adresse: {
      quartier: String,
      ville: String,
    },
  },
});

const secretaire = mongoose.model("secretaire", SecretaireSchema);

module.exports = secretaire;
