const express = require("express");

const UtilisateurController = require("../controllers/utilisateurController");
const demoAuthMiddleware = require("../middlewares/demoAuthMiddleware");

const router = express.Router();

router.use(demoAuthMiddleware);

router.get("/", UtilisateurController.getAllUtilisateurs);
router.get("/:UtilisateurId", UtilisateurController.getUtilisateurById);
router.post("/", UtilisateurController.createUtilisateur);
router.put("/:UtilisateurId", UtilisateurController.updateUtilisateur);
router.delete("/:UtilisateurId", UtilisateurController.deleteUtilisateur);

module.exports = router;
