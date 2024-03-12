const express = require("express");

const contratController = require("../controllers/ContratController");
const demoAuthMiddleware = require("../middlewares/demoAuthMiddleware");

const router = express.Router();

router.use(demoAuthMiddleware);

router.get("/", contratController.getAllContrats);
router.get("/:ContratId", contratController.getContratById);
router.post("/", contratController.createContrat);
router.put("/:ContratId", contratController.updateContrat);
router.delete("/:ContratId", contratController.deleteContrat);

module.exports = router;
