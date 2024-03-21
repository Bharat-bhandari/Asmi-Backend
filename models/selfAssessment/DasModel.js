const mongoose = require("mongoose");

const { Schema } = require("mongoose");

const DasSchema = new Schema(
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
      type: Number,
      required: true,
    },
    qn2: {
      type: Number,
      required: true,
    },
    qn3: {
      type: Number,
      required: true,
    },
    qn4: {
      type: Number,
      required: true,
    },
    qn5: {
      type: Number,
      required: true,
    },
    qn6: {
      type: Number,
      required: true,
    },
    qn7: {
      type: Number,
      required: true,
    },
    qn8: {
      type: Number,
      required: true,
    },
    qn9: {
      type: Number,
      required: true,
    },
    qn10: {
      type: Number,
      required: true,
    },
    qn11: {
      type: Number,
      required: true,
    },
    qn12: {
      type: Number,
      required: true,
    },
    qn13: {
      type: Number,
      required: true,
    },
    qn14: {
      type: Number,
      required: true,
    },
    qn15: {
      type: Number,
      required: true,
    },
    qn16: {
      type: Number,
      required: true,
    },
    qn17: {
      type: Number,
      required: true,
    },
    qn18: {
      type: Number,
      required: true,
    },
    qn19: {
      type: Number,
      required: true,
    },
    qn20: {
      type: Number,
      required: true,
    },
    qn21: {
      type: Number,
      required: true,
    },
    depressionresult: {
      type: String,
      required: true,
    },
    anxietyresult: {
      type: String,
      required: true,
    },
    stressresult: {
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

const DasAssessment = mongoose.model("DasAssessment", DasSchema);

module.exports = DasAssessment;
