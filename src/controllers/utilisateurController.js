const multer = require("multer");
const Utilisateur = require("../models/Utilisateur");
// const GenerateImageUrl = require("../utils/GenerateImageUrl");

function GenerateImageUrl(req, imagePath) {
  console.log(req.protocol);
  return `${req.protocol}://${req.get("host")}/uploads/${imagePath}`;
}
exports.getAllUtilisateurs = (req, res, next) => {
  Utilisateur.find({})
    .then((Utilisateurs) => {
      Utilisateurs.map(
        (util) =>
          (util.utilisateur.image.contentType = GenerateImageUrl(
            req,
            util.utilisateur.image.contentType
          ))
      );
      res.send(Utilisateurs);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};
exports.getUtilisateurById = (req, res, next) => {
  const id = req.params.UtilisateurId;
  Utilisateur.findById(id)
    .then((Utilisateur) => {
      Utilisateur.utilisateur.image.contentType = GenerateImageUrl(
        req,
        Utilisateur.utilisateur.image.contentType
      );
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
    const imageUrl = req.file.path;

    const UtilisateurNew = new Utilisateur({
      ...body,
      image: {
        data: "",
        contentType: imageUrl,
      },
    });

    UtilisateurNew.save()
      .then((response) => {
        res.status(200).send({
          message: "Utilisateur successfully added",
          response: response,
        });
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
