const express = require("express");
const {
  eatingproblemget,
  eatingproblempost,
} = require("../controllers/selfAssessmentController");

const router = express.Router();

// eatingproblem
router.route("/eatingproblem/postformdata").post(eatingproblempost);

router.route("/eatingproblem/getformdata").get(eatingproblemget);

//  moodimbalance
// router.route();
// sleepdisturbance
// router.route();
// suciderisk
// router.route();
// dass
// router.route();

module.exports = router;
