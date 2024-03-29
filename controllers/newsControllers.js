const mongoose = require("mongoose");
const News = require("../models/newsModel");
const uploadOnCloudinary = require("../utils/uploadToCloudinary");
const { isValidObjectId } = require("mongoose");

module.exports.fetchNews = async (req, res) => {
  const allNewsItem = await News.find();

  return res.status(201).json({
    status: 200,
    message: "fetched all NewsItem successfully ",
    allNewsItem,
  });
};

module.exports.fetchNewsByID = async (req, res) => {
  const { id } = await req.params;
  console.log(id);
  const validObjectId = isValidObjectId(id);
  if (!validObjectId) {
    return res.status(400).json({ error: `Invalid newsItemID  ${id}` });
  }
  const NewsItem = await News.findById(id);
  if (!NewsItem) {
    return res
      .status(400)
      .json({ error: `couldnot find newsItem with given id ${id}` });
  }

  res.status(201).json({
    status: 201,
    message: "single newsItem fetched sucessfully",
    NewsItem,
  });
};

module.exports.postNews = async (req, res) => {
  // get newsitem detail from request

  const {
    category,
    tag,
    date,
    publishedBy,
    headline,
    subheadline,
    content,
    socialmedialink,
  } = await req.body;

  //get newsitem file from request
  const coverImagePath = req.files?.coverImage[0]?.path;
  if (!coverImagePath) {
    return res.status(400).json({ message: "coverImage file is required" });
  }

  //upload to cloudinary
  const coverImage = await uploadOnCloudinary(coverImagePath);
  if (!coverImage) {
    return res
      .status(400)
      .json({ message: "coverImage file upload unsuccessfull " });
  }

  //upload to database
  const newsItem = await News.create({
    category,
    tag,
    date,
    publishedBy,
    headline,
    subheadline,
    content,
    socialmedialink: socialmedialink || "",
    coverImage: coverImage.url || "",
  });
  if (!newsItem) {
    return res
      .status(400)
      .json({ message: "couldnot add new newsItem to database" });
  }

  return res
    .status(201)
    .json({ status: 200, message: "news item created successfully" });
};

module.exports.deleteNews = async (req, res) => {
  console.log("hii");
  const { id } = req.params;
  console.log(id);
  const validObjectId = isValidObjectId(id);
  if (!validObjectId) {
    return res.status(400).json({ error: `Invalid newsItemID  ${id}` });
  }
  try {
    const NewsItem = await News.findByIdAndDelete(id);
    if (!NewsItem) {
      res.status(400);
      return res.json({
        error: `couldnot findand delete newsItem with given id ${id}`,
      });
    }

    res.status(201);
    return res.json({
      status: 201,
      message: "single newsItem deleted sucessfully",
      NewsItem,
    });
  } catch (error) {
    res.status(500);
    return res.json({ error: "Internal server error" });
  }
};
