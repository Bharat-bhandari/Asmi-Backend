const express = require("express");
const {
  fetchNews,
  fetchNewsByID,
  postNews,
  deleteNews,
} = require("../controllers/newsControllers");
const upload = require("../middleware/multer");
const router = express.Router();
// fetch All news
router.route("/fetchnews").get(fetchNews);
//fetch single news
router.route("/fetchnews/:id").get(fetchNewsByID);
//post news
router
  .route("/postnews")
  .post(upload.fields([{ name: "coverImage", maxCount: 1 }]), postNews); //need to verify admin
//delete single news
router.route("/deletenews/:id").delete(deleteNews); //need to verify admin

module.exports = router;
