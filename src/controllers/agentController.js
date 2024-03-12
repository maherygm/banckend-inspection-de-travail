const Agent = require("../models/Agent");

exports.getAllAgents = (req, res, next) => {
  Agent.find({})
    .then((Agents) => {
      res.send(Agents);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};
exports.getAgentById = (req, res, next) => {
  const id = req.params.AgentId;
  console.log(id);

  Agent.findById(id)
    .then((Agent) => {
      res.status(200).send({
        response: Agent,
      });
    })
    .catch((err) => {
      res.status(400).send({
        error: true,
        message: "Agent not Found",
      });
    });
};

exports.createAgent = (req, res, next) => {
  const body = req.body;
  const AgentNew = new Agent(body);
  AgentNew.save()
    .then((response) => {
      res.status(200).send("Agent successfully added");
    })
    .catch((err) => {
      res.status(400).send({
        error: `error adding new Agent' ${err}`,
      });
    });
};

exports.updateAgent = (req, res, next) => {
  const AgentId = req.params.AgentId;
  const updateBody = req.body;

  Agent.findOneAndUpdate({ _id: AgentId }, updateBody, {
    new: true,
    overwrite: true,
  })
    .then((updtatedAgent) => {
      if (!updtatedAgent) {
        return res.status(404).send({
          error: "Agent not found",
        });
      }
      res.status(200).send({
        message: "Agent successfully updated",
        Agent: updtatedAgent,
      });
    })
    .catch((err) => {
      res.status(400).send({
        error: `Error updating the Agent :${err}`,
      });
    });
};

exports.deleteAgent = (req, res, next) => {
  const AgentId = req.params.AgentId;

  Agent.findOneAndDelete({ _id: AgentId })
    .then((deletedAgent) => {
      if (!deletedAgent) {
        return res.status(404).send({
          error: "Agent not found",
        });
      }
      res.status(200).send({
        message: "Agent successfully deleted",
        remainingAgent: deletedAgent,
      });
    })
    .catch((err) => {
      res.status(400).send({
        error: `Error deleting the Agent: ${err}`,
      });
    });
};
