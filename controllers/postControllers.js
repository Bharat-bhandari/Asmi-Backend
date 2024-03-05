const fs = require("fs");

const Post = require("../models/Post");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.postBlogs = async (req, res) => {
  console.log("POSTCONTROLLER --> Enter in postBlogs");

  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    console.log("POSTCONTROLLER -->Img is there postBlogs");

    const imgFile = req.file;
    const { title, summary, content } = req.body;

    const response = await cloudinary.uploader.upload(imgFile.path);
    const path = response.secure_url;

    console.log(
      "POSTCONTROLLER -->Get the data and upload to multer succeceduklly"
    );

    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover: path,
    });

    console.log(" POSTCONTROLLER --> Post created succesfully");

    fs.unlinkSync(imgFile.path);

    res.json(postDoc);
  } catch (error) {
    console.error("Error posting blog:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getBlogs = async (req, res) => {
  console.log(" POSTCONTROLLER --> enter in get All blogs");

  const posts = await Post.find();

  console.log(" POSTCONTROLLER --> getted all blogs ");

  res.json(posts);
};

exports.getSingleBlogs = async (req, res) => {
  console.log("POSTCONTROLLER --> Enter in single blogs");
  const { id } = req.params;

  console.log("POSTCONTROLLER --> log the id=", id);

  const post = await Post.findById(id);

  console.log("POSTCONTROLLER --> Get the single blogs");

  res.json(post);
};

exports.deleteSingleBlog = async (req, res) => {
  console.log("POSTCONTROLLER --> Enter in delete blogs");

  const postId = req.params.id;

  console.log("POSTCONTROLLER --> log the postid=", postId);

  try {
    // Check if the post exists
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Perform the deletion
    await post.deleteOne();

    console.log("POSTCONTROLLER --> dleted succesfully");

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
