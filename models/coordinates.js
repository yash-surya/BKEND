const mongoose = require("mongoose");

const coordinatesSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

const Coordinates = mongoose.model("Coordinates", coordinatesSchema);

module.exports = Coordinates;
