const mongoose = require("mongoose");

const appUserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  hospitalName: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  ambulanceNumber: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const AppUser = mongoose.model("appuser", appUserSchema);

module.exports = AppUser;
