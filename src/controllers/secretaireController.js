const Secretaire = require("../models/Secretaire");

exports.getAllSecretaires = (req, res, next) => {
  Secretaire.find({})
    .then((Secretaires) => {
      res.send(Secretaires);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};
exports.getSecretaireById = (req, res, next) => {
  const id = req.params.SecretaireId;
  console.log(id);

  Secretaire.findById(id)
    .then((Secretaire) => {
      res.status(200).send({
        response: Secretaire,
      });
    })
    .catch((err) => {
      res.status(400).send({
        error: true,
        message: "Secretaire not Found",
      });
    });
};

exports.createSecretaire = (req, res, next) => {
  const body = req.body;
  const SecretaireNew = new Secretaire(body);
  SecretaireNew.save()
    .then((response) => {
      res.status(200).send("Secretaire successfully added");
    })
    .catch((err) => {
      res.status(400).send({
        error: `error adding new Secretaire' ${err}`,
      });
    });
};

exports.updateSecretaire = (req, res, next) => {
  const SecretaireId = req.params.SecretaireId;
  const updateBody = req.body;

  Secretaire.findOneAndUpdate(
    { _id: SecretaireId },
    updateBody,
    {
      new: true,
      overwrite: true,
    }
  )
    .then((updtatedSecretaire) => {
      if (!updtatedSecretaire) {
        return res.status(404).send({
          error: "Secretaire not found",
        });
      }
      res.status(200).send({
        message: "Secretaire successfully updated",
        Secretaire: updtatedSecretaire,
      });
    })
    .catch((err) => {
      res.status(400).send({
        error: `Error updating the Secretaire :${err}`,
      });
    });
};

exports.deleteSecretaire = (req, res, next) => {
  const SecretaireId = req.params.SecretaireId;

  Secretaire.findOneAndDelete({ _id: SecretaireId })
    .then((deletedSecretaire) => {
      if (!deletedSecretaire) {
        return res.status(404).send({
          error: "Secretaire not found",
        });
      }
      res.status(200).send({
        message: "Secretaire successfully deleted",
        remainingSecretaire: deletedSecretaire,
      });
    })
    .catch((err) => {
      res.status(400).send({
        error: `Error deleting the Secretaire: ${err}`,
      });
    });
};
