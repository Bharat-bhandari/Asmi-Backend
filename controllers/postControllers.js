const fs = require("fs");

const Post = require("../models/Post");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.postBlogs = async (req, res) => {
  // const { originalname, path } = req.file;
  // const parts = originalname.split(".");
  // const ext = parts[parts.length - 1];
  // const newPath = path + "." + ext;
  // fs.renameSync(path, newPath);

  // const imgFile = req.file

  // const { title, summary, content } = req.body;

  // const postDoc = await Post.create({
  //   title,
  //   summary,
  //   content,
  //   cover: newPath,
  // });

  // res.json(postDoc);

  const imgFile = req.file;

  const { title, summary, content } = req.body;

  const response = await cloudinary.uploader.upload(imgFile.path);

  const path = response.secure_url;

  const postDoc = await Post.create({
    title,
    summary,
    content,
    cover: path,
  });

  fs.unlinkSync(imgFile.path);

  res.json(postDoc);
};

exports.getBlogs = async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
};

exports.getSingleBlogs = async (req, res) => {
  const { id } = req.params;

  const post = await Post.findById(id);

  res.json(post);
};

exports.deleteSingleBlog = async (req, res) => {
  const postId = req.params.id;

  try {
    // Check if the post exists
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Perform the deletion
    await post.deleteOne();

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
