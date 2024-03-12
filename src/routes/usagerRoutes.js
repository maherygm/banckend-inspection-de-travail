const express = require("express");

const UsagerController = require("../controllers/usagerController");
const demoAuthMiddleware = require("../middlewares/demoAuthMiddleware");

const router = express.Router();

router.use(demoAuthMiddleware);

router.get("/", UsagerController.getAllUsagers);
router.get("/:UsagerId", UsagerController.getUsagerById);
router.post("/", UsagerController.createUsager);
router.put("/:UsagerId", UsagerController.updateUsager);
router.delete("/:UsagerId", UsagerController.deleteUsager);

module.exports = router;
