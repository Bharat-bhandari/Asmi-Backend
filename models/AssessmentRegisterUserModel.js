const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const AssessmentRegisteredUserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    assessmentCategory: {
      type: String,
      required: true,
    },

    paymentid: {
      type: String,
      required: true,
    },

    assessmentAppeared: {
      type: Boolean,
      required: true,
    },
  },

  { timestamps: true }
);
const AssessmentRegisteredUser = mongoose.model(
  "AssessmentRegisteredUser",
  AssessmentRegisteredUserSchema
);

module.exports = AssessmentRegisteredUser;
