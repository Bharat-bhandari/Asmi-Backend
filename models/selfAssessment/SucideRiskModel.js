const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const SucideRiskSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    qn1: {
      type: Boolean,
      required: true,
    },
    qn2: {
      type: Boolean,
      required: true,
    },
    qn3: {
      type: Boolean,
      required: true,
    },
    qn4: {
      type: Boolean,
      required: true,
    },
    qnfourres1: {
      type: String,
    },
    qnfourres2: {
      type: String,
    },
    qn5: {
      type: Boolean,
    },
    qnfiveres: {
      type: String,
    },
    result: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const SucideRiskAssessment = mongoose.model(
  "SucideRiskAssessment",
  SucideRiskSchema
);

module.exports = SucideRiskAssessment;
