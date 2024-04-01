const express = require("express");

const plainteController = require("../controllers/plainteController");
const demoAuthMiddleware = require("../middlewares/demoAuthMiddleware");

const router = express.Router();

router.use(demoAuthMiddleware);

router.get("/", plainteController.getAllPlaintes);
router.get("/:PlainteId", plainteController.getPlainteById);
router.post("/", plainteController.createPlainte);
router.put("/:PlainteId", plainteController.updatePlainte);
router.delete("/:PlainteId", plainteController.deletePlainte);

module.exports = router;
