const express = require("express");

const ReglementInterieurController = require("../controllers/reglementInterieurController");
const demoAuthMiddleware = require("../middlewares/demoAuthMiddleware");

const router = express.Router();

router.use(demoAuthMiddleware);

router.get("/", ReglementInterieurController.getAllReglementInterieurs);
router.get(
  "/:ReglementInterieurId",
  ReglementInterieurController.getReglementInterieurById
);
router.post("/", ReglementInterieurController.createReglementInterieur);
router.put(
  "/:ReglementInterieurId",
  ReglementInterieurController.updateReglementInterieur
);
router.delete(
  "/:ReglementInterieurId",
  ReglementInterieurController.deleteReglementInterieur
);

module.exports = router;
