const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UtilisateurSchema = new Schema({
  utilisateur: {
    nom: String,
    prenom: String,
    email: String,
    dateNaissance: String,
    fonction: {
      poste: String,
      typeUtilisateur: String,
    },
    image: {
      data: Buffer,
      contentType: String,
    },
    motsDePasse: String,
  },
});
const Utilisateur = mongoose.model("utilisateur", UtilisateurSchema);

module.exports = Utilisateur;
