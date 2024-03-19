const express = require("express");
const {
  userFetch,
  userGet,
} = require("../controllers/assessmentregisteruserController");
const router = express.Router();

router.route("/postuser").post(userFetch);
router.route("/getuser/:id").get(userGet);

module.exports = router;
