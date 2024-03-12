const express = require("express");

const DifferentController = require("../controllers/differentController");
const demoAuthMiddleware = require("../middlewares/demoAuthMiddleware");

const router = express.Router();

router.use(demoAuthMiddleware);

router.get("/", DifferentController.getAllDifferents);
router.get("/:DifferentId", DifferentController.getDifferentById);
router.post("/", DifferentController.createDifferent);
router.put("/:DifferentId", DifferentController.updateDifferent);
router.delete("/:DifferentId", DifferentController.deleteDifferent);

module.exports = router;
