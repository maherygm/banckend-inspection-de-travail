const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const plainteSchema = new Schema({
  dossier: {
    usager: {
      nom: String,
      prenom: String,
      adresse: String,
      sexe: String,
    },
    description: String,
    date: String,
    etats: String,
    types: String,
    accepter: Boolean,
  },
});

const plainte = mongoose.model("plainte", plainteSchema);

module.exports = plainte;
