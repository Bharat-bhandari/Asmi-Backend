const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const SleepDisturbanceSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    qn0: {
      type: String,
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
    qnelevensubqn1: {
      type: String,
    },
    qnelevensubqn2: {
      type: String,
    },
    qnelevensubqn3: {
      type: String,
    },
    qnelevensubqn4: {
      type: String,
    },
    qnelevensubqn5: {
      type: String,
    },

    result: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const SleepDisturbanceAssessment = mongoose.model(
  "SleepDisturbanceAssessment",
  SleepDisturbanceSchema
);

module.exports = SleepDisturbanceAssessment;
