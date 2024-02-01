const express = require("express");
const multer = require("multer");

const mailControllers = require("../controllers/mailControllers");

const uploads = multer({ dest: "uploads/mail" });

const router = express.Router();

router.post(
  "/testmail",
  uploads.fields([
    { name: "file1", maxCount: 1 },
    { name: "file2", maxCount: 1 },
  ]),
  mailControllers.postFormMail
);

router.post(
  "/send-career",
  uploads.fields([
    { name: "degree", maxCount: 1 },
    { name: "cv", maxCount: 1 },
  ]),
  mailControllers.postCareerMail
);

router.post("/send-mIntern", uploads.none(), mailControllers.postmInternMail);

router.post("/send-pIntern", uploads.none(), mailControllers.postpInternMail);

router.post("/send-yoga", uploads.none(), mailControllers.postYogaMail);

router.post(
  "/send-assesment",
  uploads.none(),
  mailControllers.postAsseemnetMail
);

router.post("/send-email", mailControllers.postMail);

module.exports = router;
