const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const agentSchema = new Schema({
  agent: {
    code: String,
    nom: String,
    prenom: String,
    dateNaiss: String,
    adresse: {
      quartier: String,
      ville: String,
    },
    matriculeAgent: String,
  },
});

const Agent = mongoose.model("agent", agentSchema);

module.exports = Agent;
