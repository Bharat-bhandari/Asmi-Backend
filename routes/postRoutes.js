const express = require("express");
const multer = require("multer");

const postControllers = require("../controllers/postControllers");

const uploadMiddleware = multer({ dest: "uploads/" });

const router = express.Router();

router.post(
  "/post",
  uploadMiddleware.single("file"),
  postControllers.postBlogs
);

router.get("/post", postControllers.getBlogs);

router.get("/post/:id", postControllers.getSingleBlogs);

router.delete("/post/:id", postControllers.deleteSingleBlog);

module.exports = router;
