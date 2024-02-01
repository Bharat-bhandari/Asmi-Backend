const nodemailer = require("nodemailer");
const Razorpay = require("razorpay");
const crypto = require("crypto");

const Payment = require("../models/PaymentModel");

function generateGiftCardCode() {
  const currentTimestamp = Date.now().toString();
  const randomValue = Math.random().toString(36).substring(2, 8);
  const giftCardCode = currentTimestamp + randomValue;

  return giftCardCode;
}

// mail the genarted code

function mailGeneratedCode(userEmail, message, recipientEmail) {
  return new Promise((resolve, reject) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    console.log(message);

    const mail_configs = {
      from: process.env.EMAIL_USER,
      to: [userEmail, recipientEmail],
      subject: "Asmi Gift Card Code",
      text: message,
    };
    transporter.sendMail(mail_configs, function (error, info) {
      if (error) {
        console.log(error);
        return reject({ message: `An error has occured` });
      }
      return resolve({ message: "Email sent succesfuly" });
    });

    console.log("Email Sent!!");
  });
}

// end of mail the genarted code

// redeem code

exports.redeemGiftCard = async (req, res) => {
  const { giftCardCode } = req.body;

  try {
    const payment = await Payment.findOne({ giftCardCode });

    if (!payment) {
      return res.status(404).json({ msg: "Invalid gift card code" });
    }

    if (payment.status) {
      return res.status(400).json({ msg: "Gift card code already redeemed" });
    }

    // Update the status of the gift card code to true
    await Payment.updateOne({ giftCardCode }, { status: true });

    res.json({ msg: "Gift card code redeemed successfully" });
  } catch (error) {
    console.error("Error redeeming gift card:", error);
    res.status(500).json({ msg: "Error redeeming gift card" });
  }
};

// End of redeem code

exports.postOrder = async (req, res) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZOR_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    const options = req.body;
    const order = await razorpay.orders.create(options);

    if (!order) {
      return res.status(500).send("Error in Payment");
    }

    res.json(order);
  } catch (err) {
    console.log(err);
    res.status(500).send("err");
  }
};

exports.postOrderValidate = async (req, res) => {
  const {
    userMessage,
    deliveryDate,
    recipientEmail,
    recipientName,
    userEmail,
    userName,
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
  } = req.body;

  console.log(req.body);

  const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
  sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);

  const digest = sha.digest("hex");

  // console.log("diefet", digest);
  // console.log("sign", razorpay_signature);

  const isAuthentic = digest === razorpay_signature;

  if (isAuthentic) {
    try {
      const giftCardCode = generateGiftCardCode();

      if (recipientEmail) {
        console.log("dhcb");
        const message = `Dear ${recipientName},

  ${userName} gifted you a counselling sessions with Asmi.

  Your gift card code is: ${giftCardCode}

  Message from ${userName}: ${userMessage}

  Please feel free to contact us if you have any questions or concerns.

  Best regards,
  Asmi Team`;

        await mailGeneratedCode(userEmail, message, recipientEmail);
      } else {
        console.log("In the message");

        const message = `Dear ${userName},

  Thank you for your purchase!

  Your gift card code is: ${giftCardCode}

  Please feel free to contact us if you have any questions or concerns.

  Best regards,
  Asmi Team`;

        await mailGeneratedCode(userEmail, message);
      }

      await Payment.create({
        giftCardCode,
        userName: userName,
        userEmail: userEmail,
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });

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

exports.getKey = (req, res) => {
  res.status(200).json({ key: process.env.RAZOR_KEY_ID });
};
