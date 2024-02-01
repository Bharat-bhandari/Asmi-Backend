const fs = require("fs");

const Post = require("../models/Post");

exports.postBlogs = async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  const { title, summary, content } = req.body;

  const postDoc = await Post.create({
    title,
    summary,
    content,
    cover: newPath,
  });

  res.json(postDoc);
};

exports.getBlogs = async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
};
