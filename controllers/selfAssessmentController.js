const mongoose = require("mongoose");
const EatingProblemAssessment = require("../models/selfAssessment/EatingProblemModel");

// eating problem controllers
exports.eatingproblemget = async (req, res) => {
  return res.json({ status: 201, message: "hi" });
};

exports.eatingproblempost = async (req, res) => {
  const { username, email, q1, q2, q3, q4, q5 } = req.body;

  return res.json({ status: 201, status: "lowscore" });
};
