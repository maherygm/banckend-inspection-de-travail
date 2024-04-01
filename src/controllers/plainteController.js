const Plainte = require("../models/Plainte");

exports.getAllPlaintes = (req, res, next) => {
  Plainte.find({})
    .then((Plaintes) => {
      res.send(Plaintes);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};
exports.getPlainteById = (req, res, next) => {
  const id = req.params.PlainteId;
  console.log(id);

  Plainte.findById(id)
    .then((Plainte) => {
      res.status(200).send({
        response: Plainte,
      });
    })
    .catch((err) => {
      res.status(400).send({
        error: true,
        message: "Plainte not Found",
      });
    });
};

exports.createPlainte = (req, res, next) => {
  const body = req.body;
  const PlainteNew = new Plainte(body);
  PlainteNew.save()
    .then((response) => {
      res.status(200).send({
        message: "Plainte successfully added",
        response,
      });
    })
    .catch((err) => {
      res.status(400).send({
        error: `error adding new Plainte' ${err}`,
      });
    });
};

exports.updatePlainte = (req, res, next) => {
  const PlainteId = req.params.PlainteId;
  const updateBody = req.body;

  Plainte.findOneAndUpdate({ _id: PlainteId }, updateBody, {
    new: true,
    overwrite: true,
  })
    .then((updtatedPlainte) => {
      if (!updtatedPlainte) {
        return res.status(404).send({
          error: "Plainte not found",
        });
      }
      res.status(200).send({
        message: "Plainte successfully updated",
        Plainte: updtatedPlainte,
      });
    })
    .catch((err) => {
      res.status(400).send({
        error: `Error updating the Plainte :${err}`,
      });
    });
};

exports.deletePlainte = (req, res, next) => {
  const PlainteId = req.params.PlainteId;

  Plainte.findOneAndDelete({ _id: PlainteId })
    .then((deletedPlainte) => {
      if (!deletedPlainte) {
        return res.status(404).send({
          error: "Plainte not found",
        });
      }
      res.status(200).send({
        message: "Plainte successfully deleted",
        remainingPlainte: deletedPlainte,
      });
    })
    .catch((err) => {
      res.status(400).send({
        error: `Error deleting the Plainte: ${err}`,
      });
    });
};
