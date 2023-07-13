const express = require("express");
const router = express.Router();
const fs = require("fs");
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");

router.post("/", upload.single("file"), async (req, res) => {
  try {
    
    const uploader = async (path) => await cloudinary.uploads(path, 'files');
    const file = req.file;

    if (!file) {
        return res.send({ status: 400, message: "Please select file" });
    }

    const { path } = file;
    const newPath = await uploader(path)
    fs.unlinkSync(path)
    
    res.json({ msg: "success", file : newPath });
  } catch (error) {
    res.send("Error " + err);
  }
});

module.exports = router;
