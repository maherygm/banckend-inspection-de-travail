const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const EtablissementSchema = new Schema({
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
});

const Etablissement = mongoose.model("etablissement", EtablissementSchema);

module.exports = Etablissement;
