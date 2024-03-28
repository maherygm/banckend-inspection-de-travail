const express = require("express");

const DossierController = require("../controllers/dossierController");
const demoAuthMiddleware = require("../middlewares/demoAuthMiddleware");

const router = express.Router();

router.use(demoAuthMiddleware);

router.get("/", DossierController.getAllDossiers);
router.get("/:DossierId", DossierController.getDossierById);
router.post("/", DossierController.createDossier);
router.put("/:DossierId", DossierController.updateDossier);
router.delete("/:DossierId", DossierController.deleteDossier);

module.exports = router;
