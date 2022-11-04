//Image.js-models
const { string } = require("joi");
const mongoose = require("mongoose");

const imgSchema = new mongoose.Schema({
  username: String,
  img: {
    data: Buffer,
    contentType: String,
  },
});

module.exports = ImageModel = mongoose.model("Image", imgSchema);
