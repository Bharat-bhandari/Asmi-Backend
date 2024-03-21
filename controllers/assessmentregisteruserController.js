const mongoose = require("mongoose");
const AssessmentRegisteredUser = require("../models/AssessmentRegisterUserModel");
const nodemailer = require("nodemailer");

module.exports.userFetch = async (req, res) => {
  const { username, email, assessmentCategory, paymentid, assessmentAppeared } =
    await req.body;

  const assessmentAppearedbool = assessmentAppeared === "true" ? true : false;

  // ################# register user #########################
  const newUser = await AssessmentRegisteredUser.create({
    username,
    email,
    assessmentCategory,
    paymentid,
    assessmentAppeared: assessmentAppearedbool,
  });

  if (!newUser) {
    return res
      .status(400)
      .json({ message: "couldnot add newuser to database" });
  }
  console.log("ASSESSMENTREGISTERUSERCONTROLLER >>user added to database");
  // ################### send Mail to user ########################

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const emailMessage = `
    

   <h1>Thanks for payment<h1>
   <p>Complete your assessment ob below link <p>

   <a href="http://localhost:5173/assessmentURL/${newUser._id}">click here<a>
   
  
    `;

  let mailOptions = {
    from: process.env.EMAIL_USER,
    to: `${email}`,
    // cc: "general.care@anjanajyoti.org",
    // to: "bharatbhandari0302@gmail.com",
    subject: "New Career Form Submission",
    html: emailMessage,
  };
  await transporter.sendMail(mailOptions);
  console.log("ASSESSMENTREGISTERUSERCONTROLLER >>mail sent to user");
  // #############################################

  return res.json({
    status: 201,
    message: "new user added successfully and mail sent successfully",
  });
};

module.exports.userGet = async (req, res) => {
  const { id } = req.params;
  console.log("ASSESSMENTREGISTERUSERCONTROLLER >> userid inside params ", id);
  const isvalid = mongoose.isValidObjectId(id);

  if (!isvalid) {
    res.status(400);
    return res.json({ message: "Wrong _id " });
  }

  const data = await AssessmentRegisteredUser.findById(id);
  if (!data) {
    res.status(400);
    return res.json({ message: "Wrong _id " });
  }
  console.log("ASSESSMENTREGISTERUSERCONTROLLER >> userid valid ", id);

  res.status(201);
  return res.json(data);
};
