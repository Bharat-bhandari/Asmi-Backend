const mongoose = require("mongoose");
const AssessmentRegisteredUser = require("../models/AssessmentRegisterUserModel");
const nodemailer = require("nodemailer");
const Razorpay = require("razorpay");

const crypto = require("crypto");

module.exports.userFetch = async (req, res) => {
  const {
    username,
    email,
    assessmentCategory,
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
    assessmentAppeared,
  } = await req.body;

  const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
  sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);

  const digest = sha.digest("hex");

  const isAuthentic = digest === razorpay_signature;

  if (isAuthentic) {
    try {
      const assessmentAppearedbool =
        assessmentAppeared === "true" ? true : false;

      // ################# register user #########################
      const newUser = await AssessmentRegisteredUser.create({
        username,
        email,
        assessmentCategory,
        assessmentAppeared: assessmentAppearedbool,
        razorpay_payment_id,
        razorpay_order_id,
        razorpay_signature,
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

      let assessmenttype = "";
      if (assessmentCategory === "eatingproblem") {
        assessmenttype = "Eating Problem";
      } else if (assessmentCategory === "moodimbalance") {
        assessmenttype = "Mood Imbalance";
      } else if (assessmentCategory === "sleepdisturbance") {
        assessmenttype = "Sllep Disturbance";
      } else if (assessmentCategory === "suciderisk") {
        assessmenttype = "Sucide Risk";
      } else if (assessmentCategory === "das") {
        assessmenttype = "Depression Anxiety and Stress";
      } else if (assessmentCategory === "stress") {
        assessmenttype = "Stress";
      } else if (assessmentCategory === "lowselfesteem") {
        assessmenttype = "Low Self Esteem";
      }

      const emailMessage = `  <div style="background-color: #f4f4f4; padding: 20px;">
      <h3>Hello ${username},</h3>

      <p>We are glad that you have taken the time to cater to the needs for maintaining your mental health. Taking the first step towards breaking your silence and moving forward will surely be a fruitful decision. We understand that you might be confused about whether or not you should be taking up a session with a counselor for ${assessmenttype}.</p>

      <p><strong>Please <a href="${process.env.ASSESS_PAGE_URL}/assessmentURL/${newUser._id}">Click Here</a> to access the link for the assessment.</strong></p>
      <p>Please note that you can only open and fill this form link once.</p>
      <p>If the result says that further assessment is warranted, feel free to book a session with one of our counselors! <a href="${process.env.ASSESS_PAGE_URL}/counselors">go to counselors page </a></p>
  <p>Lots of love,</p>
  <p>Team Asmi</p>
  
    </div>
    `;
      //   const emailMessage = `<p>Please complete your assessment by clicking on the link below:</p>
      //   <p><a href="${process.env.ASSESS_PAGE_URL}/assessmentURL/${newUser._id}">Click Here</a></p>
      // `;

      let mailOptions = {
        from: process.env.EMAIL_USER,
        to: `${email}`,
        // cc: "general.care@anjanajyoti.org",
        // to: "bharatbhandari0302@gmail.com",
        subject: "Assess Yourself Link",
        html: emailMessage,
      };
      await transporter.sendMail(mailOptions);
      console.log("ASSESSMENTREGISTERUSERCONTROLLER >>mail sent to user");
      // #############################################

      res.json({
        msg: "success",
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
      });
    } catch (error) {
      console.error("Error occurred:", error);
      return res
        .status(500)
        .json({ msg: "Error occurred while processing the request" });
    }
  } else {
    return res.status(400).json({ msg: "Transaction is not valid!" });
  }
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
