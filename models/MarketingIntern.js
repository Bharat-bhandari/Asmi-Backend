const mongoose = require("mongoose");

const mInternSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String,
  address: String,
  universityName: String,
  collegeName: String,
  dcs: String,
  internpref: String,
  noh: String,
  qnMember: String,
  viewSm: String,
  smc: String,
  smcl: String,
  dpw: String,
});

const MIntern = mongoose.model("MIntern", mInternSchema);

module.exports = MIntern;
