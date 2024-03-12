const ReglementInterieur = require("../models/ReglementInterieur");

exports.getAllReglementInterieurs = (req, res, next) => {
  ReglementInterieur.find({})
    .then((ReglementInterieurs) => {
      res.send(ReglementInterieurs);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};
exports.getReglementInterieurById = (req, res, next) => {
  const id = req.params.ReglementInterieurId;
  console.log(id);

  ReglementInterieur.findById(id)
    .then((ReglementInterieur) => {
      res.status(200).send({
        response: ReglementInterieur,
      });
    })
    .catch((err) => {
      res.status(400).send({
        error: true,
        message: "ReglementInterieur not Found",
      });
    });
};

exports.createReglementInterieur = (req, res, next) => {
  const body = req.body;
  const ReglementInterieurNew = new ReglementInterieur(body);
  ReglementInterieurNew.save()
    .then((response) => {
      res.status(200).send("ReglementInterieur successfully added");
    })
    .catch((err) => {
      res.status(400).send({
        error: `error adding new ReglementInterieur' ${err}`,
      });
    });
};

exports.updateReglementInterieur = (req, res, next) => {
  const ReglementInterieurId = req.params.ReglementInterieurId;
  const updateBody = req.body;

  ReglementInterieur.findOneAndUpdate(
    { _id: ReglementInterieurId },
    updateBody,
    {
      new: true,
      overwrite: true,
    }
  )
    .then((updtatedReglementInterieur) => {
      if (!updtatedReglementInterieur) {
        return res.status(404).send({
          error: "ReglementInterieur not found",
        });
      }
      res.status(200).send({
        message: "ReglementInterieur successfully updated",
        ReglementInterieur: updtatedReglementInterieur,
      });
    })
    .catch((err) => {
      res.status(400).send({
        error: `Error updating the ReglementInterieur :${err}`,
      });
    });
};

exports.deleteReglementInterieur = (req, res, next) => {
  const ReglementInterieurId = req.params.ReglementInterieurId;

  ReglementInterieur.findOneAndDelete({ _id: ReglementInterieurId })
    .then((deletedReglementInterieur) => {
      if (!deletedReglementInterieur) {
        return res.status(404).send({
          error: "ReglementInterieur not found",
        });
      }
      res.status(200).send({
        message: "ReglementInterieur successfully deleted",
        remainingReglementInterieur: deletedReglementInterieur,
      });
    })
    .catch((err) => {
      res.status(400).send({
        error: `Error deleting the ReglementInterieur: ${err}`,
      });
    });
};
