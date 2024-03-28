const express = require("express");
const agentRoutes = require("./agentRoutes");
const contratRoutes = require("./contratRoutes");
const differentRoutes = require("./differentRoutes");
const etablissementRoutes = require("./etablissementRoutes");
const reglementInterieurRoutes = require("./reglementInterieurRoutes");
const secretaireRoutes = require("./secretaireRoutes");
const usagerRoutes = require("./usagerRoutes");
const utilisateurRoutes = require("./utilisateurRoutes");
const dossierRoutes = require("./dossierRoutes");

const router = express.Router();

router.use("/agent", agentRoutes);
router.use("/contrat", contratRoutes);
router.use("/different", differentRoutes);
router.use("/etablissement", etablissementRoutes);
router.use("/reglementInterieur", reglementInterieurRoutes);
router.use("/secretaire", secretaireRoutes);
router.use("/usager", usagerRoutes);
router.use("/utilisateur", utilisateurRoutes);
router.use("/dossier", dossierRoutes);

module.exports = router;
