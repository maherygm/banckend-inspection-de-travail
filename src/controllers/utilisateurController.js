const Utilisateur = require("../models/Utilisateur");

exports.getAllUtilisateurs = (req, res, next) => {
  Utilisateur.find({})
    .then((Utilisateurs) => {
      res.send(Utilisateurs);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};
exports.getUtilisateurById = (req, res, next) => {
  const id = req.params.UtilisateurId;
  console.log(id);

  Utilisateur.findById(id)
    .then((Utilisateur) => {
      res.status(200).send({
        response: Utilisateur,
      });
    })
    .catch((err) => {
      res.status(400).send({
        error: true,
        message: "Utilisateur not Found",
      });
    });
};

exports.createUtilisateur = (req, res, next) => {
  const body = req.body;
  const UtilisateurNew = new Utilisateur(body);
  UtilisateurNew.save()
    .then((response) => {
      res.status(200).send("Utilisateur successfully added");
    })
    .catch((err) => {
      res.status(400).send({
        error: `error adding new Utilisateur' ${err}`,
      });
    });
};

exports.updateUtilisateur = (req, res, next) => {
  const UtilisateurId = req.params.UtilisateurId;
  const updateBody = req.body;

  Utilisateur.findOneAndUpdate({ _id: UtilisateurId }, updateBody, {
    new: true,
    overwrite: true,
  })
    .then((updtatedUtilisateur) => {
      if (!updtatedUtilisateur) {
        return res.status(404).send({
          error: "Utilisateur not found",
        });
      }
      res.status(200).send({
        message: "Utilisateur successfully updated",
        Utilisateur: updtatedUtilisateur,
      });
    })
    .catch((err) => {
      res.status(400).send({
        error: `Error updating the Utilisateur :${err}`,
      });
    });
};

exports.deleteUtilisateur = (req, res, next) => {
  const UtilisateurId = req.params.UtilisateurId;

  Utilisateur.findOneAndDelete({ _id: UtilisateurId })
    .then((deletedUtilisateur) => {
      if (!deletedUtilisateur) {
        return res.status(404).send({
          error: "Utilisateur not found",
        });
      }
      res.status(200).send({
        message: "Utilisateur successfully deleted",
        remainingUtilisateur: deletedUtilisateur,
      });
    })
    .catch((err) => {
      res.status(400).send({
        error: `Error deleting the Utilisateur: ${err}`,
      });
    });
};
