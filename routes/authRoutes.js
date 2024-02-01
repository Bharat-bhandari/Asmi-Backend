const express = require("express");

const router = express.Router();

const authController = require("../controllers/authControllers");

router.post("/login", authController.postAdminLogin);

router.get("/profile", authController.getProfile);

router.post("/logout", authController.postLogout);

module.exports = router;
