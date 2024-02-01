const mongoose = require("mongoose");

const webUserSchema = mongoose.Schema({
  username: {
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

const WebUser = mongoose.model("webuser", webUserSchema);

module.exports = WebUser;
