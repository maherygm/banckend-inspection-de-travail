const express = require("express");

const SecretaireController = require("../controllers/secretaireController");
const demoAuthMiddleware = require("../middlewares/demoAuthMiddleware");

const router = express.Router();

router.use(demoAuthMiddleware);

router.get("/", SecretaireController.getAllSecretaires);
router.get("/:SecretaireId", SecretaireController.getSecretaireById);
router.post("/", SecretaireController.createSecretaire);
router.put("/:SecretaireId", SecretaireController.updateSecretaire);
router.delete("/:SecretaireId", SecretaireController.deleteSecretaire);

module.exports = router;
