const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const MoodImbalanceSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    qnonesubqn1: {
      type: Boolean,
      required: true,
    },
    qnonesubqn2: {
      type: Boolean,
      required: true,
    },
    qnonesubqn3: {
      type: Boolean,
      required: true,
    },
    qnonesubqn4: {
      type: Boolean,
      required: true,
    },
    qnonesubqn5: {
      type: Boolean,
      required: true,
    },
    qnonesubqn6: {
      type: Boolean,
      required: true,
    },
    qnonesubqn7: {
      type: Boolean,
      required: true,
    },
    qnonesubqn8: {
      type: Boolean,
      required: true,
    },
    qnonesubqn9: {
      type: Boolean,
      required: true,
    },
    qnonesubqn10: {
      type: Boolean,
      required: true,
    },
    qnonesubqn11: {
      type: Boolean,
      required: true,
    },
    qnonesubqn12: {
      type: Boolean,
      required: true,
    },
    qnonesubqn13: {
      type: Boolean,
      required: true,
    },
    qnonesubqn14: {
      type: Boolean,
      required: true,
    },
    qntwo: {
      type: Boolean,
      required: true,
    },
    qnthree: {
      type: String,
      required: true,
    },
    qnfour: {
      type: Boolean,
      required: true,
    },
    qnfive: {
      type: Boolean,
      required: true,
    },
    result: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const MoodImbalanceAssessment = mongoose.model(
  "MoodImbalanceAssessment",
  MoodImbalanceSchema
);

module.exports = MoodImbalanceAssessment;
