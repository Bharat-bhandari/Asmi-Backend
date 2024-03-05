const fs = require("fs");
const Post = require("../models/Post");
const { isValidObjectId } = require("mongoose");
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Controller to post blogs
exports.postBlogs = async (req, res) => {
  console.log("POSTCONTROLLER --> Entering postBlogs");

  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    console.log("POSTCONTROLLER --> Image is present in postBlogs");

    const imgFile = req.file;
    const { title, summary, content } = req.body;

    // Upload image to Cloudinary
    const response = await cloudinary.uploader.upload(imgFile.path);
    const path = response.secure_url;

    console.log(
      "POSTCONTROLLER --> Data retrieved and uploaded to multer successfully"
    );

    // Create post document
    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover: path,
    });

    console.log(" POSTCONTROLLER --> Post created successfully \n");

    // Delete temporary image file
    fs.unlinkSync(imgFile.path);

    res.json(postDoc);
  } catch (error) {
    console.error("Error posting blog:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller to get all blogs
exports.getBlogs = async (req, res) => {
  console.log(" POSTCONTROLLER --> Entering get All blogs");

  const posts = await Post.find();

  console.log(" POSTCONTROLLER --> Retrieved all blogs \n");

  res.json(posts);
};

// Controller to get a single blog
exports.getSingleBlogs = async (req, res) => {
  console.log("POSTCONTROLLER --> Entering single blog");
  const { id } = req.params;

  console.log("isValid=", isValidObjectId(id));

  if (!isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid blog ID" });
  }

  console.log("POSTCONTROLLER --> Logging the id=", id);

  const post = await Post.findById(id);

  console.log("POSTCONTROLLER --> Retrieved the single blog \n");

  res.json(post);
};

// Controller to delete a single blog
exports.deleteSingleBlog = async (req, res) => {
  console.log("POSTCONTROLLER --> Entering delete blog");

  const postId = req.params.id;

  console.log("POSTCONTROLLER --> Logging the post id=", postId);

  try {
    // Check if the post exists
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Perform the deletion
    await post.deleteOne();

    console.log("POSTCONTROLLER --> Deleted successfully \n");

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
