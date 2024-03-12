const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UsagerSchema = new Schema({
  usager: {
    nom: String,
    prenom: String,
    adresse: {
      quartier: String,
      ville: String,
    },
    typeUsager: String,
    classificationProfessionel: String,
  },
});

const Usager = mongoose.model("usager", UsagerSchema);

module.exports = Usager;
