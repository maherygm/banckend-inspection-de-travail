const Etablissement = require("../models/Etablissement");

exports.getAllEtablissements = (req, res, next) => {
  Etablissement.find({})
    .then((Etablissements) => {
      res.send(Etablissements);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};
exports.getEtablissementById = (req, res, next) => {
  const id = req.params.EtablissementId;
  console.log(id);

  Etablissement.findById(id)
    .then((Etablissement) => {
      res.status(200).send({
        response: Etablissement,
      });
    })
    .catch((err) => {
      res.status(400).send({
        error: true,
        message: "Etablissement not Found",
      });
    });
};

exports.createEtablissement = (req, res, next) => {
  const body = req.body;
  const EtablissementNew = new Etablissement(body);
  EtablissementNew.save()
    .then((response) => {
      res.status(200).send("Etablissement successfully added");
    })
    .catch((err) => {
      res.status(400).send({
        error: `error adding new Etablissement' ${err}`,
      });
    });
};

exports.updateEtablissement = (req, res, next) => {
  const EtablissementId = req.params.EtablissementId;
  const updateBody = req.body;

  Etablissement.findOneAndUpdate({ _id: EtablissementId }, updateBody, {
    new: true,
    overwrite: true,
  })
    .then((updtatedEtablissement) => {
      if (!updtatedEtablissement) {
        return res.status(404).send({
          error: "Etablissement not found",
        });
      }
      res.status(200).send({
        message: "Etablissement successfully updated",
        Etablissement: updtatedEtablissement,
      });
    })
    .catch((err) => {
      res.status(400).send({
        error: `Error updating the Etablissement :${err}`,
      });
    });
};

exports.deleteEtablissement = (req, res, next) => {
  const EtablissementId = req.params.EtablissementId;

  Etablissement.findOneAndDelete({ _id: EtablissementId })
    .then((deletedEtablissement) => {
      if (!deletedEtablissement) {
        return res.status(404).send({
          error: "Etablissement not found",
        });
      }
      res.status(200).send({
        message: "Etablissement successfully deleted",
        remainingEtablissement: deletedEtablissement,
      });
    })
    .catch((err) => {
      res.status(400).send({
        error: `Error deleting the Etablissement: ${err}`,
      });
    });
};
