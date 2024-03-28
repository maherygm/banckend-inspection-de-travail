const Dossier = require("../models/Dossier");

exports.getAllDossiers = (req, res, next) => {
  Dossier.find({})
    .then((Dossiers) => {
      res.send(Dossiers);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};
exports.getDossierById = (req, res, next) => {
  const id = req.params.DossierId;
  console.log(id);

  Dossier.findById(id)
    .then((Dossier) => {
      res.status(200).send({
        response: Dossier,
      });
    })
    .catch((err) => {
      res.status(400).send({
        error: true,
        message: "Dossier not Found",
      });
    });
};

exports.createDossier = (req, res, next) => {
  const body = req.body;
  const DossierNew = new Dossier(body);
  DossierNew.save()
    .then((response) => {
      res.status(200).send({
        message: "Dossier successfully added",
        response,
      });
    })
    .catch((err) => {
      res.status(400).send({
        error: `error adding new Dossier' ${err}`,
      });
    });
};

exports.updateDossier = (req, res, next) => {
  const DossierId = req.params.DossierId;
  const updateBody = req.body;

  Dossier.findOneAndUpdate({ _id: DossierId }, updateBody, {
    new: true,
    overwrite: true,
  })
    .then((updtatedDossier) => {
      if (!updtatedDossier) {
        return res.status(404).send({
          error: "Dossier not found",
        });
      }
      res.status(200).send({
        message: "Dossier successfully updated",
        Dossier: updtatedDossier,
      });
    })
    .catch((err) => {
      res.status(400).send({
        error: `Error updating the Dossier :${err}`,
      });
    });
};

exports.deleteDossier = (req, res, next) => {
  const DossierId = req.params.DossierId;

  Dossier.findOneAndDelete({ _id: DossierId })
    .then((deletedDossier) => {
      if (!deletedDossier) {
        return res.status(404).send({
          error: "Dossier not found",
        });
      }
      res.status(200).send({
        message: "Dossier successfully deleted",
        remainingDossier: deletedDossier,
      });
    })
    .catch((err) => {
      res.status(400).send({
        error: `Error deleting the Dossier: ${err}`,
      });
    });
};
