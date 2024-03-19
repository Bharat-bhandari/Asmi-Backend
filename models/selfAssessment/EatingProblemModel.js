const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const EatingProblemSchema = new Schema(
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
    qn5: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const EatingProblemAssessment = mongoose.model(
  "EatingProblemAssessment",
  EatingProblemSchema
);
module.exports = EatingProblemAssessment;
