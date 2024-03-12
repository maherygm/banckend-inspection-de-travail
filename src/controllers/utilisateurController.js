const multer = require("multer");
const Utilisateur = require("../models/Utilisateur");
const useGenerateImageUrl = require("../utils/useGenerateImageUrl");
exports.getAllUtilisateurs = (req, res, next) => {
  Utilisateur.find({})
    .then((Utilisateurs) => {
      const utilisateursAvecUrl = Utilisateurs.map((util) => {
        util.image.contentType = useGenerateImageUrl(
          req,
          util.image.contentType
        );
      });
      res.send(utilisateursAvecUrl);
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
      const UtilisateurAvecUrl = (Utilisateur.image.contentType =
        useGenerateImageUrl(req, util.image.contentType));
      res.status(200).send({
        response: UtilisateurAvecUrl,
      });
    })
    .catch((err) => {
      res.status(400).send({
        error: true,
        message: "Utilisateur not Found",
      });
    });
};
const storage = multer.diskStorage({
  destination: function (red, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage }).single("image");
exports.createUtilisateur = (req, res, next) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res
        .status(400)
        .send({ error: "an error ocured during file upload" });
    } else if (err) {
      return res.status(500).send({ error: err });
    }
    const body = req.body;
    const imageUrl = useGenerateImageUrl(req, req.file.path);
    console.log("hy ", body);

    const UtilisateurNew = new Utilisateur({
      ...body,
      image: {
        contentType: imageUrl,
      },
    });

    UtilisateurNew.save()
      .then((response) => {
        res.status(200).send("Utilisateur successfully added");
      })
      .catch((err) => {
        res.status(400).send({
          error: `error adding new Utilisateur' ${err}`,
        });
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
