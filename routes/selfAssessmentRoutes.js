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

router.route("moodimbalance/postformdata").post(moodimbalancepost);
router.route("moodimbalance/getformdata").get(moodimbalanceget);

// sleepdisturbance

router.route("sleepdisturbanceget").get(sleepdisturbanceget);
router.route("sleepdisturbancepost").post(sleepdisturbancepost);

// suciderisk

router.route("sucideriskget").get(sucideriskget);
router.route("sucideriskpost").post(sucideriskpost);

// dass

router.route("dassget").get(dasget);
router.route("dasspost").post(daspost);

// stress

router.route("stressget").get(stressget);
router.route("stresspost").post(stresspost);

// low self esteem
router.route("lowselfesteemget").get(lowselfesteemget);
router.route("lowselfesteempost").post(lowselfesteempost);

module.exports = router;
