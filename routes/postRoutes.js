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

module.exports = router;
