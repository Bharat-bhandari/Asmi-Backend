const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const newsSchema = new Schema(
  {
    category: {
      type: String,
      required: true,
      uppercase: true,
    },
    tag: {
      type: String,
      required: true,
      uppercase: true,
    },
    date: {
      type: Date,
      required: true,
    },
    publishedBy: {
      type: String,
    },
    headline: {
      type: String,
      required: true,
    },
    subheadline: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      // required: true,
    },
    socialmedialink: {
      type: String,
      // required: true,
    },
    coverImage: {
      type: String, //cloudinary url
      required: true,
    },
  },
  { timestamps: true }
);

const News = mongoose.model("News", newsSchema);
module.exports = News;
