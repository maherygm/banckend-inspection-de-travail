const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const agentSchema = new Schema({
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
  },
});

const dossier = mongoose.model("dossier", agentSchema);

module.exports = dossier;
