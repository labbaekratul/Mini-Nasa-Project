const mongoose = require("mongoose");

const launchesSchema = new mongoose.Schema({
  flightNumber: { type: Number, required: true },
  launchDate: { type: Date, required: true },
  mission: { type: String, required: true },
  rocket: { type: String, required: true },
  target: { type: String, require: true },
  customers: [String],
  upcoming: { type: Boolean, require: true },
  success: { type: String, require: true, default: true },
});

const Launch = mongoose.model("Launch", launchesSchema);

module.exports = Launch;
