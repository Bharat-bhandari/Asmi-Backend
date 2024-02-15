const mongoose = require("mongoose");

const counselorSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  mobile: { type: String },
  birthday: { type: Date },
  presentAddress: { type: String },
  gender: { type: String },
  about: { type: String },
  qualification: { type: String },
  workExperience: { type: String },
  psychologistExperience: { type: String },
  specializations: [{ type: String }],
  reference: { type: String },
  referenceContact: { type: String },
  pan: { type: String },
  aadhar: { type: String },
  accountName: { type: String },
  accountNumber: { type: String },
  bankName: { type: String },
  branchName: { type: String },
  ifsc: { type: String },
  accountType: { type: String },
  preferredTimings: { type: String },
  preferredLanguage: { type: String },
  photoUrl: { type: String },
  certificatesUrl: { type: String },
  panUrl: { type: String },
  aadharUrl: { type: String },
  chequeUrl: { type: String },
});

const Counselor = mongoose.model("CounseloronBoarding", counselorSchema);

module.exports = Counselor;
