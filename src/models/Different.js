const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const differentSchema = new Schema({
  different: {
    observation: String,
    usager: {
      nomUsager: String,
      prenomUsager: String,
      adresseUsager: String,
      dateNaissanceUsager: String,
    },
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
    dateDifferent: {
      type: String,
    },
    agent: {
      codeAgent: String,
      nomAgent: String,
      prenomAgent: String,
    },
    datePv: {
      type: String,
    },
  },
});

const Different = mongoose.model("different", differentSchema);

module.exports = Different;
