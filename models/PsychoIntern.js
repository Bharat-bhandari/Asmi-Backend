const mongoose = require("mongoose");

const pInternSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: String,
    address: String,
    universityName: String,
    collegeName: String,
    dcs: String,
    qnMember: String,
    whyPsycho: String,
    dedtime: String,
    isHybrid: String,
    aoi: String,
    prevworked: String,
    prevworkdet: String,
  },
  {
    timestamps: true,
  }
);

const PIntern = mongoose.model("PIntern", pInternSchema);

module.exports = PIntern;
