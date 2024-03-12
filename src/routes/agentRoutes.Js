const express = require("express");

const agentController = require("../controllers/agentController");
const demoAuthMiddleware = require("../middlewares/demoAuthMiddleware");

const router = express.Router();

router.use(demoAuthMiddleware);

router.get("/", agentController.getAllAgents);
router.get("/:AgentId", agentController.getAgentById);
router.post("/", agentController.createAgent);
router.put("/:AgentId", agentController.updateAgent);
router.delete("/:AgentId", agentController.deleteAgent);

module.exports = router;
