const Usager = require("../models/Usager");

exports.getAllUsagers = (req, res, next) => {
  Usager.find({})
    .then((Usagers) => {
      res.send(Usagers);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};
exports.getUsagerById = (req, res, next) => {
  const id = req.params.UsagerId;
  console.log(id);

  Usager.findById(id)
    .then((Usager) => {
      res.status(200).send({
        response: Usager,
      });
    })
    .catch((err) => {
      res.status(400).send({
        error: true,
        message: "Usager not Found",
      });
    });
};

exports.createUsager = (req, res, next) => {
  const body = req.body;
  const UsagerNew = new Usager(body);
  UsagerNew.save()
    .then((response) => {
      res.status(200).send("Usager successfully added");
    })
    .catch((err) => {
      res.status(400).send({
        error: `error adding new Usager' ${err}`,
      });
    });
};

exports.updateUsager = (req, res, next) => {
  const UsagerId = req.params.UsagerId;
  const updateBody = req.body;

  Usager.findOneAndUpdate({ _id: UsagerId }, updateBody, {
    new: true,
    overwrite: true,
  })
    .then((updtatedUsager) => {
      if (!updtatedUsager) {
        return res.status(404).send({
          error: "Usager not found",
        });
      }
      res.status(200).send({
        message: "Usager successfully updated",
        Usager: updtatedUsager,
      });
    })
    .catch((err) => {
      res.status(400).send({
        error: `Error updating the Usager :${err}`,
      });
    });
};

exports.deleteUsager = (req, res, next) => {
  const UsagerId = req.params.UsagerId;

  Usager.findOneAndDelete({ _id: UsagerId })
    .then((deletedUsager) => {
      if (!deletedUsager) {
        return res.status(404).send({
          error: "Usager not found",
        });
      }
      res.status(200).send({
        message: "Usager successfully deleted",
        remainingUsager: deletedUsager,
      });
    })
    .catch((err) => {
      res.status(400).send({
        error: `Error deleting the Usager: ${err}`,
      });
    });
};
