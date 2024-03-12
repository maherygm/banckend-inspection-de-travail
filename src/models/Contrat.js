const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const contratSchema = new Schema({
  contrat: {
    natureContrat: String,
    dateContrat: {
      type: String,
      required: true,
    },
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
    agent: {
      codeAgent: String,
      nomAgent: String,
      prenomAgent: String,
    },
  },
});

const Contrat = mongoose.model("contrat", contratSchema);

module.exports = Contrat;
