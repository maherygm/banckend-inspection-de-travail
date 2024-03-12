module.exports = useGenerateImageUrl = (req, imagePath) => {
  return `${req.protocol}://${req.get("host")}/uploads/${imagePath}`;
};
