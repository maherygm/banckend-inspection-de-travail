const Different = require("../models/Different");

exports.getAllDifferents = (req, res, next) => {
  Different.find({})
    .then((Differents) => {
      res.send(Differents);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};
exports.getDifferentById = (req, res, next) => {
  const id = req.params.DifferentId;
  console.log(id);

  Different.findById(id)
    .then((Different) => {
      res.status(200).send({
        response: Different,
      });
    })
    .catch((err) => {
      res.status(400).send({
        error: true,
        message: "Different not Found",
      });
    });
};

exports.createDifferent = (req, res, next) => {
  const body = req.body;
  const DifferentNew = new Different(body);
  DifferentNew.save()
    .then((response) => {
      res.status(200).send("Different successfully added");
    })
    .catch((err) => {
      res.status(400).send({
        error: `error adding new Different' ${err}`,
      });
    });
};

exports.updateDifferent = (req, res, next) => {
  const DifferentId = req.params.DifferentId;
  const updateBody = req.body;

  Different.findOneAndUpdate({ _id: DifferentId }, updateBody, {
    new: true,
    overwrite: true,
  })
    .then((updtatedDifferent) => {
      if (!updtatedDifferent) {
        return res.status(404).send({
          error: "Different not found",
        });
      }
      res.status(200).send({
        message: "Different successfully updated",
        Different: updtatedDifferent,
      });
    })
    .catch((err) => {
      res.status(400).send({
        error: `Error updating the Different :${err}`,
      });
    });
};

exports.deleteDifferent = (req, res, next) => {
  const DifferentId = req.params.DifferentId;

  Different.findOneAndDelete({ _id: DifferentId })
    .then((deletedDifferent) => {
      if (!deletedDifferent) {
        return res.status(404).send({
          error: "Different not found",
        });
      }
      res.status(200).send({
        message: "Different successfully deleted",
        remainingDifferent: deletedDifferent,
      });
    })
    .catch((err) => {
      res.status(400).send({
        error: `Error deleting the Different: ${err}`,
      });
    });
};
