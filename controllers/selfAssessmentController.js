const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const EatingProblemAssessment = require("../models/selfAssessment/EatingProblemModel");
const { response } = require("express");
const MoodImbalanceAssessment = require("../models/selfAssessment/MoodImbalanceModel");
const SleepDisturbanceAssessment = require("../models/selfAssessment/SleepDisturbanceModel");
const SucideRiskAssessment = require("../models/selfAssessment/SucideRiskModel");
const DasAssessment = require("../models/selfAssessment/DasModel");
const StressAssessment = require("../models/selfAssessment/StressModel");
const AssessmentRegisteredUser = require("../models/AssessmentRegisterUserModel");

// eating problem controllers
exports.eatingproblemget = async (req, res) => {
  return res.json({ status: 201, message: "hi" });
};

exports.eatingproblempost = async (req, res) => {
  const { username, email, q1, q2, q3, q4, q5, id } = await req.body;
  console.log("value from form ", q1, q2, q3, q4, q5, id);

  let score = 0;
  const response = { status: "" };

  if (q1 === true) {
    score += 1;
  }
  if (q2 === true) {
    score += 1;
  }
  if (q3 === true) {
    score += 1;
  }
  if (q3 === true) {
    score += 1;
  }
  if (q4 === true) {
    score += 1;
  }
  if (q5 === true) {
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

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "bharatbhandari0302@gmail.com", // Change this to the recipient's email address
    subject: `Eating Problem Assessment Result of ${username}`,
    html: `
      <p>Eating Problem Assessment.</p>
      <p>User name: ${username}</p>
      <p>User Email: ${email}</p>
      <p>Here are the responses:</p>
      <ul>
        <li>Do you make yourself Sick because you feel uncomfortably full? ${
          q1 ? "Yes" : "No"
        }</li>
        <li>Do you worry you have lost Control over how much you eat? ${
          q2 ? "Yes" : "No"
        }</li>
        <li>Have you recently lost more than One stone (6.35 kg) in a three-month period? ${
          q3 ? "Yes" : "No"
        }</li>
        <li>Do you believe yourself to be Fat when others say you are too thin? ${
          q4 ? "Yes" : "No"
        }</li>
        <li>Would you say Food dominates your life? ${q5 ? "Yes" : "No"}</li>
      </ul>
    `,
  };

  await transporter.sendMail(mailOptions);

  console.log("Eating Problem> mail send successfully");

  let result = "";

  if (score >= 2) {
    result = "positive";
  } else {
    result = "negative";
  }

  // change form status

  if (!mongoose.isValidObjectId(id)) {
    res.status(400);
    return res.json({ message: "couldnot validate" });
  }

  const updatedDocument = await AssessmentRegisteredUser.findByIdAndUpdate(
    id,
    { assessmentAppeared: true },
    { new: true }
  );

  if (!updatedDocument) {
    console.log("Document not found.");
  } else {
    console.log("Document updated successfully:", updatedDocument);
  }

  res.status(201);
  return res.json({ status: 201, result: result });
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
    id,
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
    qnfive,
    id
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

  // change form status
  if (!mongoose.isValidObjectId(id)) {
    res.status(400);
    return res.json({ message: "couldnot validate" });
  }
  const updatedDocument = await AssessmentRegisteredUser.findByIdAndUpdate(
    id,
    { assessmentAppeared: true },
    { new: true }
  );
  if (!updatedDocument) {
    console.log("Document not found.");
  } else {
    console.log("Document updated successfully:", updatedDocument);
  }

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
    id,
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
    qnelevensubqn5,
    id
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

  // change form status

  if (!mongoose.isValidObjectId(id)) {
    res.status(400);
    return res.json({ message: "couldnot validate" });
  }

  const updatedDocument = await AssessmentRegisteredUser.findByIdAndUpdate(
    id,
    { assessmentAppeared: true },
    { new: true }
  );

  if (!updatedDocument) {
    console.log("Document not found.");
  } else {
    console.log("Document updated successfully:", updatedDocument);
  }

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
    id,
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
    qnfiveres,
    id
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

  // change form status

  if (!mongoose.isValidObjectId(id)) {
    res.status(400);
    return res.json({ message: "couldnot validate" });
  }

  const updatedDocument = await AssessmentRegisteredUser.findByIdAndUpdate(
    id,
    { assessmentAppeared: true },
    { new: true }
  );

  if (!updatedDocument) {
    console.log("Document not found.");
  } else {
    console.log("Document updated successfully:", updatedDocument);
  }

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
    id,
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
    qn21,
    id
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

  // change form status

  if (!mongoose.isValidObjectId(id)) {
    res.status(400);
    return res.json({ message: "couldnot validate" });
  }

  const updatedDocument = await AssessmentRegisteredUser.findByIdAndUpdate(
    id,
    { assessmentAppeared: true },
    { new: true }
  );

  if (!updatedDocument) {
    console.log("Document not found.");
  } else {
    console.log("Document updated successfully:", updatedDocument);
  }

  // mailstart

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "teerthrajverma181001@gmail.com", // Change this to the recipient's email address
    subject: `Depression Anxiety Stress Assessment Result of ${username}`,
    html: `
      <p>Depression Anxiety Stress Assessment.</p>
      <p>User name: ${username}</p>
      <p>User Email: ${email}</p>

<div>
      <p>The rating scale is as follows:</p>
      <p> 0 Did not apply to me at all</p>
      <p> 1 Applied to me to some degree, or some of the time</p>
      <p>2 Applied to me to a considerable degree or a good part of time</p>
      <p>3 Applied to me very much or most of the time</p>
</div>

      <p>Here are the responses:</p>


      <ul>
       
      <li>1: I found it hard to wind down: ${qn1}</li>
      <li>2: I was aware of dryness of my mouth: ${qn2}</li>
      <li>3: I couldn’t seem to experience any positive feeling at all: ${qn3}</li>
      <li>4: I experienced breathing difficulty (e.g. excessively rapid breathing, breathlessness in the absence of physical exertion): ${qn4}</li>
      <li>5: I found it difficult to work up the initiative to do things: ${qn5}</li>
      <li>6: I tended to over-react to situations: ${qn6}</li>
      <li>7: I experienced trembling (e.g. in the hands): ${qn7}</li>
      <li>8: I felt that I was using a lot of nervous energy: ${qn8}</li>
      <li>9: I was worried about situations in which I might panic and make a fool of myself: ${qn9}</li>
      <li>10: I felt that I had nothing to look forward to: ${qn10}</li>
      <li>11: I found myself getting agitated: ${qn11}</li>
      <li>12: I found it difficult to relax: ${qn12}</li>
      <li>13: I felt down-hearted and blue: ${qn13}</li>
      <li>14: I was intolerant of anything that kept me from getting on with what I was doing: ${qn14}</li>
      <li>15: I felt I was close to panic: ${qn15}</li>
      <li>16: I was unable to become enthusiastic about anything: ${qn16}</li>
      <li>17: I felt I wasn’t worth much as a person: ${qn17}</li>
      <li>18: I felt that I was rather touchy: ${qn18}</li>
      <li>19: I was aware of the action of my heart in the absence of physical exertion (e.g. sense of heart rate increase, heart missing a beat): ${qn19}</li>
      <li>20: I felt scared without any good reason: ${qn20}</li>
      <li>21: I felt that life was meaningless: ${qn21}</li>
    
      </ul>
    `,
  };

  await transporter.sendMail(mailOptions);

  console.log("Depression Anxiety Stress mail send successfully");

  //mailend

  res.status(201);
  return res.json({ status: 201, result: result });
};

//stress
exports.stressget = async (req, res) => {
  return res.json({ status: 201, message: "hi" });
};

exports.stresspost = async (req, res) => {
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
    id,
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
    id
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

  // change form status

  if (!mongoose.isValidObjectId(id)) {
    res.status(400);
    return res.json({ message: "couldnot validate" });
  }

  const updatedDocument = await AssessmentRegisteredUser.findByIdAndUpdate(
    id,
    { assessmentAppeared: true },
    { new: true }
  );

  if (!updatedDocument) {
    console.log("Document not found.");
  } else {
    console.log("Document updated successfully:", updatedDocument);
  }

  // mailstart

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "teerthrajverma181001@gmail.com", // Change this to the recipient's email address
    subject: `Stress Assessment Result of ${username}`,
    html: `
      <p>Stress Assessment.</p>
      <p>User name: ${username}</p>
      <p>User Email: ${email}</p>
      <p>Here are the responses:</p>
      <ul>
       
    
      <li>1. In the last month, how often have you been upset because of something that happened unexpectedly? :${qn1} </li>
      <li>2. In the last month, how often have you felt that you were unable to control the important things in your life? :${qn2} </li>
      <li>3. In the last month, how often have you felt nervous and stressed? :${qn3} </li>
      <li>4. In the last month, how often have you felt confident about your ability to handle your personal problems? :${qn4} </li>
      <li>5: In the last month, how often have you felt that things were going your way? :${qn5} </li>
      <li>6. In the last month, how often have you found that you could not cope with all the things that you had to do? :${qn6} </li>
      <li>7. In the last month, how often have you been able to control irritations in your life? :${qn7} </li>
      <li>8. In the last month, how often have you felt that you were on top of things? :${qn8} </li>
      <li>9. In the last month, how often have you been angered because of things that happened that were outside of your control? :${qn9} </li>
      <li>10. In the last month, how often have you felt difficulties were piling up so high that you could not overcome them? :${qn10} </li>
    
      </ul>
    `,
  };

  await transporter.sendMail(mailOptions);

  console.log("Stress mail send successfully");

  //mailend

  res.status(201);
  return res.json({ status: 201, result: result });
};

// low self esteem
exports.lowselfesteemget = async (req, res) => {
  return res.json({ status: 201, message: "hi" });
};

exports.lowselfesteempost = async (req, res) => {
  console.log("hii");
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
    id,
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
    id
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

  // change form status

  if (!mongoose.isValidObjectId(id)) {
    res.status(400);
    return res.json({ message: "couldnot validate" });
  }

  // mailstart

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "teerthrajverma181001@gmail.com", // Change this to the recipient's email address
    subject: `Low Self Esteem Assessment Result of ${username}`,
    html: `
      <p>Low Self Esteem Assessment.</p>
      <p>User name: ${username}</p>
      <p>User Email: ${email}</p>
      <p>Here are the responses:</p>
      <ul>
       
    
      <li>On the whole, I am satisfied with myself :${qn1} </li>
      <li>At times, I think I am no good at all :${qn2} </li>
      <li>I feel that I have a number of good qualities :${qn3} </li>
      <li>I am able to do things as well as most other people :${qn4} </li>
      <li>I feel I do not have much to be proud of :${qn5} </li>
      <li>I certainly feel useless at times :${qn6} </li>
      <li>I feel that I'm a person of worth, at least on an equal plane with others :${qn7} </li>
      <li>I wish I could have more respect for myself :${qn8} </li>
      <li>All in all, I am inclined to feel that I am a failure :${qn9} </li>
      <li>I take a positive attitude toward myself :${qn10} </li>
    
      </ul>
    `,
  };

  await transporter.sendMail(mailOptions);

  console.log("Low Self Esteem mail send successfully");

  //mailend

  const updatedDocument = await AssessmentRegisteredUser.findByIdAndUpdate(
    id,
    { assessmentAppeared: true },
    { new: true }
  );

  if (!updatedDocument) {
    console.log("Document not found.");
  } else {
    console.log("Document updated successfully:", updatedDocument);
  }

  res.status(201);
  return res.json({ status: 201, result: result });
};
