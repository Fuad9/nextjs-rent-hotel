const mongoose = require("mongoose");

const RentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  bedroom: {
    type: String,
    required: true,
  },
  bathroom: {
    type: String,
    required: true,
  },
  image1: {
    type: String,
  },
  image2: {
    type: String,
  },
  image3: {
    type: String,
  },
  image4: {
    type: String,
  },
  image5: {
    type: String,
  },
  price: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.models.hotels || mongoose.model("hotels", RentSchema);
