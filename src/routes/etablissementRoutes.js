const express = require("express");

const EtablissementController = require("../controllers/etablissementController");
const demoAuthMiddleware = require("../middlewares/demoAuthMiddleware");

const router = express.Router();

router.use(demoAuthMiddleware);

router.get("/", EtablissementController.getAllEtablissements);
router.get("/:EtablissementId", EtablissementController.getEtablissementById);
router.post("/", EtablissementController.createEtablissement);
router.put("/:EtablissementId", EtablissementController.updateEtablissement);
router.delete("/:EtablissementId", EtablissementController.deleteEtablissement);

module.exports = router;
