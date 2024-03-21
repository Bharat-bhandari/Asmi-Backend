const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const LowSelfEsteemSchema = new Schema(
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
      type: String,
      required: true,
    },
    qn2: {
      type: String,
      required: true,
    },
    qn3: {
      type: String,
      required: true,
    },
    qn4: {
      type: String,
      required: true,
    },
    qn5: {
      type: String,
      required: true,
    },
    qn6: {
      type: String,
      required: true,
    },
    qn7: {
      type: String,
      required: true,
    },
    qn8: {
      type: String,
      required: true,
    },
    qn9: {
      type: String,
      required: true,
    },
    qn10: {
      type: String,
      required: true,
    },
    score: {
      type: String,
      required: true,
    },
    result: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const LowSelfEsteemAssessment = mongoose.model(
  "LowSelfEsteemAssessment",
  LowSelfEsteemSchema
);

module.exports = LowSelfEsteemAssessment;
