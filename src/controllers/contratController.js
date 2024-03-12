const Contrat = require("../models/Contrat");

exports.getAllContrats = (req, res, next) => {
  Contrat.find({})
    .then((Contrats) => {
      res.send(Contrats);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};
exports.getContratById = (req, res, next) => {
  const id = req.params.ContratId;
  console.log(id);

  Contrat.findById(id)
    .then((Contrat) => {
      res.status(200).send({
        response: Contrat,
      });
    })
    .catch((err) => {
      res.status(400).send({
        error: true,
        message: "Contrat not Found",
      });
    });
};

exports.createContrat = (req, res, next) => {
  const body = req.body;
  const ContratNew = new Contrat(body);
  ContratNew.save()
    .then((response) => {
      res.status(200).send("Contrat successfully added");
    })
    .catch((err) => {
      res.status(400).send({
        error: `error adding new Contrat' ${err}`,
      });
    });
};

exports.updateContrat = (req, res, next) => {
  const ContratId = req.params.ContratId;
  const updateBody = req.body;

  Contrat.findOneAndUpdate({ _id: ContratId }, updateBody, {
    new: true,
    overwrite: true,
  })
    .then((updtatedContrat) => {
      if (!updtatedContrat) {
        return res.status(404).send({
          error: "Contrat not found",
        });
      }
      res.status(200).send({
        message: "Contrat successfully updated",
        Contrat: updtatedContrat,
      });
    })
    .catch((err) => {
      res.status(400).send({
        error: `Error updating the Contrat :${err}`,
      });
    });
};

exports.deleteContrat = (req, res, next) => {
  const ContratId = req.params.ContratId;

  Contrat.findOneAndDelete({ _id: ContratId })
    .then((deletedContrat) => {
      if (!deletedContrat) {
        return res.status(404).send({
          error: "Contrat not found",
        });
      }
      res.status(200).send({
        message: "Contrat successfully deleted",
        remainingContrat: deletedContrat,
      });
    })
    .catch((err) => {
      res.status(400).send({
        error: `Error deleting the Contrat: ${err}`,
      });
    });
};
