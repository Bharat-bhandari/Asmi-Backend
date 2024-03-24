const mongoose = require("mongoose");
const EatingProblemAssessment = require("../models/selfAssessment/EatingProblemModel");
const { response } = require("express");
const MoodImbalanceAssessment = require("../models/selfAssessment/MoodImbalanceModel");
const SleepDisturbanceAssessment = require("../models/selfAssessment/SleepDisturbanceModel");
const SucideRiskAssessment = require("../models/selfAssessment/SucideRiskModel");
const DasAssessment = require("../models/selfAssessment/DasModel");
const StressAssessment = require("../models/selfAssessment/StressModel");

// eating problem controllers
exports.eatingproblemget = async (req, res) => {
  return res.json({ status: 201, message: "hi" });
};

exports.eatingproblempost = async (req, res) => {
  const { username, email, q1, q2, q3, q4, q5 } = await req.body;
  console.log("value from form ", q1, q2, q3, q4, q5);

  let score = 0;
  const response = { status: "" };

  if (q1 == true) {
    score += 1;
  }
  if (q2 == true) {
    score += 1;
  }
  if (q3 == true) {
    score += 1;
  }
  if (q3 == true) {
    score += 1;
  }
  if (q4 == true) {
    score += 1;
  }
  if (q5 == true) {
    score += 1;
  }
  console.log("score calculated: ", score);

  const eatingproblemEntry = await EatingProblemAssessment.create({
    username,
    email,
    qn1: q1,
    qn2: q2,
    qn3: q3,
    qn4: q4,
    qn5: q5,
    score,
  });
  if (!eatingproblemEntry) {
    res.status(400);
    return res.json({ message: "couldnot add  to database" });
  }
  console.log("Entry of eatingproblem form in databse successful");

  if (score <= 2) {
    response.status = "positive";
  } else {
    response.status = "negative";
  }

  res.status(201);
  return res.json({ status: 201, result: response.status });
};

//mood imbalance controllers
exports.moodimbalanceget = async (req, res) => {
  return res.json({ status: 201, message: "hi" });
};

exports.moodimbalancepost = async (req, res) => {
  const {
    username,
    email,
    qnonesubqn1,
    qnonesubqn2,
    qnonesubqn3,
    qnonesubqn4,
    qnonesubqn5,
    qnonesubqn6,
    qnonesubqn7,
    qnonesubqn8,
    qnonesubqn9,
    qnonesubqn10,
    qnonesubqn11,
    qnonesubqn12,
    qnonesubqn13,
    qnonesubqn14,
    qntwo,
    qnthree,
    qnfour,
    qnfive,
  } = await req.body;
  console.log(
    "value from form ",
    username,
    email,
    qnonesubqn1,
    qnonesubqn2,
    qnonesubqn3,
    qnonesubqn4,
    qnonesubqn5,
    qnonesubqn6,
    qnonesubqn7,
    qnonesubqn8,
    qnonesubqn9,
    qnonesubqn10,
    qnonesubqn11,
    qnonesubqn12,
    qnonesubqn13,
    qnonesubqn14,
    qntwo,
    qnthree,
    qnfour,
    qnfive
  );

  let scoreqn1 = 0;

  const response = { status: "" };

  if (qnonesubqn1 == true) {
    scoreqn1 += 1;
  }
  if (qnonesubqn2 == true) {
    scoreqn1 += 1;
  }
  if (qnonesubqn3 == true) {
    scoreqn1 += 1;
  }
  if (qnonesubqn4 == true) {
    scoreqn1 += 1;
  }
  if (qnonesubqn5 == true) {
    scoreqn1 += 1;
  }
  if (qnonesubqn6 == true) {
    scoreqn1 += 1;
  }
  if (qnonesubqn7 == true) {
    scoreqn1 += 1;
  }
  if (qnonesubqn8 == true) {
    scoreqn1 += 1;
  }
  if (qnonesubqn9 == true) {
    scoreqn1 += 1;
  }
  if (qnonesubqn10 == true) {
    scoreqn1 += 1;
  }
  if (qnonesubqn11 == true) {
    scoreqn1 += 1;
  }
  if (qnonesubqn12 == true) {
    scoreqn1 += 1;
  }
  if (qnonesubqn13 == true) {
    scoreqn1 += 1;
  }
  if (qnonesubqn14 == true) {
    scoreqn1 += 1;
  }

  console.log("qn1 score calculated: ", scoreqn1);

  let result = "";

  result =
    scoreqn1 >= 7 &&
    qntwo == true &&
    (qnthree === "MODERATE" || qnthree === "SERIOUS")
      ? "positive"
      : "negative";

  const moodimbalanceEntry = await MoodImbalanceAssessment.create({
    username,
    email,
    qnonesubqn1,
    qnonesubqn2,
    qnonesubqn3,
    qnonesubqn4,
    qnonesubqn5,
    qnonesubqn6,
    qnonesubqn7,
    qnonesubqn8,
    qnonesubqn9,
    qnonesubqn10,
    qnonesubqn11,
    qnonesubqn12,
    qnonesubqn13,
    qnonesubqn14,
    qntwo,
    qnthree,
    qnfour,
    qnfive,
    result,
  });
  if (!moodimbalanceEntry) {
    res.status(400);
    return res.json({ message: "couldnot add  to database" });
  }
  console.log("Entry of moodimbalance form in databse successful");

  res.status(201);
  return res.json({ status: 201, result: result });
};

// sleep distrubance
exports.sleepdisturbanceget = async (req, res) => {
  return res.json({ status: 201, message: "hi" });
};

exports.sleepdisturbancepost = async (req, res) => {
  const {
    username,
    email,
    qn0,
    qn1,
    qn2,
    qn3,
    qn4,
    qn5,
    qn6,
    qn7,
    qn8,
    qn9,
    qn10,

    qnelevensubqn1,
    qnelevensubqn2,
    qnelevensubqn3,
    qnelevensubqn4,
    qnelevensubqn5,
  } = await req.body;
  console.log(
    "value from form ",
    username,
    email,
    qn0,
    qn1,
    qn2,
    qn3,
    qn4,
    qn5,
    qn6,
    qn7,
    qn8,
    qn9,
    qn10,
    qnelevensubqn1,
    qnelevensubqn2,
    qnelevensubqn3,
    qnelevensubqn4,
    qnelevensubqn5
  );
  // ###################score calculation
  let myarr = [qn1, qn2, qn3, qn4, qn5, qn6, qn7, qn8, qn9, qn10];
  let scoreall = 0;
  myarr.map((qn) => {
    let indiscore = 0;
    if (qn === "Never") {
      indiscore = 0;
    } else if (qn === "Sometimes") {
      indiscore = 1;
    } else if (qn === "Usually") {
      indiscore = 2;
    } else {
      indiscore = 3;
    }
    scoreall += indiscore;
  });
  console.log("score calculated: ", scoreall);
  let result = "";
  result = scoreall >= 11 ? "positive" : "negative";

  // ############################database entry
  const sleepdisturbanceEntry = await SleepDisturbanceAssessment.create({
    username,
    email,
    qn0,
    qn1,
    qn2,
    qn3,
    qn4,
    qn5,
    qn6,
    qn7,
    qn8,
    qn9,
    qn10,
    qnelevensubqn1,
    qnelevensubqn2,
    qnelevensubqn3,
    qnelevensubqn4,
    qnelevensubqn5,
    result,
  });
  if (!sleepdisturbanceEntry) {
    res.status(400);
    return res.json({ message: "couldnot add  to database" });
  }
  console.log("Entry of sleepdisturbance form in databse successful");

  res.status(201);
  return res.json({ status: 201, result: result });
};

//  sucide risk

exports.sucideriskget = async (req, res) => {
  return res.json({ status: 201, message: "hi" });
};

exports.sucideriskpost = async (req, res) => {
  const {
    username,
    email,
    qn1,
    qn2,
    qn3,
    qn4,
    qnfourres1,
    qnfourres2,
    qn5,
    qnfiveres,
  } = await req.body;
  console.log(
    "value from form ",
    username,
    email,
    qn1,
    qn2,
    qn3,
    qn4,
    qnfourres1,
    qnfourres2,
    qn5,
    qnfiveres
  );
  // ###################score calculation

  let result = "";
  result =
    qn1 == true || qn2 == true || qn3 == true || qn4 == true
      ? "positive"
      : "negative";

  // ############################database entry
  const sucideriskEntry = await SucideRiskAssessment.create({
    username,
    email,
    qn1,
    qn2,
    qn3,
    qn4,
    qnfourres1,
    qnfourres2,
    qn5,
    qnfiveres,
    result,
  });
  if (!sucideriskEntry) {
    res.status(400);
    return res.json({ message: "couldnot add  to database" });
  }
  console.log("Entry of suciderisk form in database successful");

  res.status(201);
  return res.json({ status: 201, result: result });
};

// depression, anxiety, stress
exports.dasget = async (req, res) => {
  return res.json({ status: 201, message: "hi" });
};

exports.daspost = async (req, res) => {
  const {
    username,
    email,
    qn1,
    qn2,
    qn3,
    qn4,
    qn5,
    qn6,
    qn7,
    qn8,
    qn9,
    qn10,
    qn11,
    qn12,
    qn13,
    qn14,
    qn15,
    qn16,
    qn17,
    qn18,
    qn19,
    qn20,
    qn21,
  } = await req.body;
  console.log(
    "value from form ",
    username,
    email,
    qn1,
    qn2,
    qn3,
    qn4,
    qn5,
    qn6,
    qn7,
    qn8,
    qn9,
    qn10,
    qn11,
    qn12,
    qn13,
    qn14,
    qn15,
    qn16,
    qn17,
    qn18,
    qn19,
    qn20,
    qn21
  );
  // ###################score calculation
  let depressionscore = 0;
  let anxietyscore = 0;
  let stressscore = 0;

  depressionscore = (qn3 + qn5 + qn10 + qn13 + qn16 + qn17 + qn21) * 2;
  anxietyscore = (qn2 + qn4 + qn7 + qn9 + qn15 + qn19 + qn20) * 2;
  stressscore = (qn1 + qn6 + qn8 + qn11 + qn12 + qn14 + qn18) * 2;

  let depressionresult =
    depressionscore <= 9
      ? "Normal"
      : depressionscore <= 13
      ? "Mild"
      : depressionscore <= 20
      ? "Moderate"
      : depressionscore <= 27
      ? "Severe"
      : "ExtremelySevere";
  let anxietyresult =
    anxietyscore <= 9
      ? "Normal"
      : anxietyscore <= 13
      ? "Mild"
      : anxietyscore <= 20
      ? "Moderate"
      : anxietyscore <= 27
      ? "Severe"
      : "ExtremelySevere";
  let stressresult =
    stressscore <= 9
      ? "Normal"
      : stressscore <= 13
      ? "Mild"
      : stressscore <= 20
      ? "Moderate"
      : stressscore <= 27
      ? "Severe"
      : "ExtremelySevere";

  let result = "";
  result =
    depressionscore >= 10 || anxietyscore >= 10 || stressscore >= 10
      ? "positive"
      : "negative";

  // ############################database entry
  const dasEntry = await DasAssessment.create({
    username,
    email,
    qn1,
    qn2,
    qn3,
    qn4,
    qn5,
    qn6,
    qn7,
    qn8,
    qn9,
    qn10,
    qn11,
    qn12,
    qn13,
    qn14,
    qn15,
    qn16,
    qn17,
    qn18,
    qn19,
    qn20,
    qn21,
    depressionresult,
    anxietyresult,
    stressresult,
    result,
  });
  if (!dasEntry) {
    res.status(400);
    return res.json({ message: "couldnot add  to database" });
  }
  console.log("Entry of das form in databse successful");

  res.status(201);
  return res.json({ status: 201, result: result });
};

//stress
exports.stressget = async (req, res) => {
  return res.json({ status: 201, message: "hi" });
};

exports.stresspost = async (req, res) => {
  const { username, email, qn1, qn2, qn3, qn4, qn5, qn6, qn7, qn8, qn9, qn10 } =
    await req.body;
  console.log(
    "value from form ",
    username,
    email,
    qn1,
    qn2,
    qn3,
    qn4,
    qn5,
    qn6,
    qn7,
    qn8,
    qn9,
    qn10
  );
  // ###################score calculation
  let myarr1 = [qn1, qn2, qn3, qn6, qn9, qn10];
  let myarr2 = [qn4, qn5, qn7, qn8];
  let scoreall = 0;
  myarr1.map((qn) => {
    let indiscore = 0;
    if (qn === "Never") {
      indiscore = 0;
    } else if (qn === "Almost Never") {
      indiscore = 1;
    } else if (qn === "Sometimes") {
      indiscore = 2;
    } else if (qn === "Fairly Often") {
      indiscore = 3;
    } else {
      indiscore = 4;
    }
    scoreall += indiscore;
  });
  myarr2.map((qn) => {
    let indiscore = 0;
    if (qn === "Never") {
      indiscore = 4;
    } else if (qn === "Almost Never") {
      indiscore = 3;
    } else if (qn === "Sometimes") {
      indiscore = 2;
    } else if (qn === "Fairly Often") {
      indiscore = 1;
    } else {
      indiscore = 0;
    }
    scoreall += indiscore;
  });

  console.log("score calculated: ", scoreall);
  let score =
    scoreall <= 13
      ? "less stress"
      : scoreall <= 26
      ? "moderate stress"
      : "percieved stress";

  let result = "";
  result = scoreall >= 13 ? "positive" : "negative";

  // ############################database entry
  const stressEntry = await StressAssessment.create({
    username,
    email,
    qn1,
    qn2,
    qn3,
    qn4,
    qn5,
    qn6,
    qn7,
    qn8,
    qn9,
    qn10,
    score,
    result,
  });
  if (!stressEntry) {
    res.status(400);
    return res.json({ message: "couldnot add  to database" });
  }
  console.log("Entry of stress form in databse successful");

  res.status(201);
  return res.json({ status: 201, result: result });
};

// low self esteem
exports.lowselfesteemget = async (req, res) => {
  return res.json({ status: 201, message: "hi" });
};

exports.lowselfesteempost = async (req, res) => {
  console.log("hii");
  const { username, email, qn1, qn2, qn3, qn4, qn5, qn6, qn7, qn8, qn9, qn10 } =
    await req.body;
  console.log(
    "value from form ",
    username,
    email,
    qn1,
    qn2,
    qn3,
    qn4,
    qn5,
    qn6,
    qn7,
    qn8,
    qn9,
    qn10
  );
  // ###################score calculation
  let myarr1 = [qn1, qn3, qn4, qn7, qn10];
  let myarr2 = [qn2, qn5, qn6, qn8, qn9];
  let scoreall = 0;
  myarr1.map((qn) => {
    let indiscore = 0;
    if (qn === "Strongly Agree") {
      indiscore = 1;
    } else if (qn === "Agree") {
      indiscore = 2;
    } else if (qn === "Disagree") {
      indiscore = 3;
    } else {
      indiscore = 4;
    }
    scoreall += indiscore;
  });
  myarr2.map((qn) => {
    let indiscore = 0;
    if (qn === "Strongly Agree") {
      indiscore = 4;
    } else if (qn === "Agree") {
      indiscore = 3;
    } else if (qn === "Disagree") {
      indiscore = 2;
    } else {
      indiscore = 1;
    }
    scoreall += indiscore;
  });
  console.log("score calculated: ", scoreall);
  let score = scoreall <= 15 ? "problemetic" : "okay";
  let result = "";
  result = scoreall <= 15 ? "positive" : "negative";

  // ############################database entry
  const sleepdisturbanceEntry = await SleepDisturbanceAssessment.create({
    username,
    email,
    qn1,
    qn2,
    qn3,
    qn4,
    qn5,
    qn6,
    qn7,
    qn8,
    qn9,
    qn10,
    score,
    result,
  });
  if (!sleepdisturbanceEntry) {
    res.status(400);
    return res.json({ message: "couldnot add  to database" });
  }
  console.log("Entry of sleepdisturbance form in databse successful");

  res.status(201);
  return res.json({ status: 201, result: result });
};
