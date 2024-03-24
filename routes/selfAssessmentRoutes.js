const express = require("express");
const {
  eatingproblemget,
  eatingproblempost,
  moodimbalanceget,
  moodimbalancepost,
  sleepdisturbanceget,
  sleepdisturbancepost,
  sucideriskget,
  sucideriskpost,
  dasget,
  daspost,
  stressget,
  stresspost,
  lowselfesteemget,
  lowselfesteempost,
} = require("../controllers/selfAssessmentController");

const router = express.Router();

// eatingproblem
router.route("/eatingproblem/postformdata").post(eatingproblempost);

router.route("/eatingproblem/getformdata").get(eatingproblemget);

//  moodimbalance

router.route("/moodimbalance/postformdata").post(moodimbalancepost);

router.route("/moodimbalance/getformdata").get(moodimbalanceget);

// sleepdisturbance

router.route("/sleepdisturbance/postformdata").post(sleepdisturbancepost);

router.route("/sleepdisturbance/getformdata").get(sleepdisturbanceget);

// suciderisk

router.route("/suciderisk/postformdata").post(sucideriskpost);

router.route("/suciderisk/getformdata").get(sucideriskget);

// dass

router.route("/das/postformdata").post(daspost);

router.route("/das/getformdata").get(dasget);

// stress

router.route("/stress/getformdata").get(stressget);

router.route("/stress/postformdata").post(stresspost);

// low self esteem
router.route("lowselfesteem/postformdata").post(lowselfesteempost);

router.route("lowselfesteem/getformdata").get(lowselfesteemget);

module.exports = router;
