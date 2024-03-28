const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UsagerSchema = new Schema({
  usager: {
    nom: String,
    prenom: String,
    adresse: String,
    sexe: String,
    mdp: String,
  },
});

const Usager = mongoose.model("usager", UsagerSchema);

module.exports = Usager;
