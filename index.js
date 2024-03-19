const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const nodemailer = require("nodemailer");

//test9

require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const mailRoutes = require("./routes/mailRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
// APPU
const newsRoutes = require("./routes/newsRoutes");
const selfAssessmentRoutes = require("./routes/selfAssessmentRoutes");
const registeruserRoutes = require("./routes/registerUserRoutes");
// APPU

const app = express();

const PORT = process.env.PORT || 4001;
const mongoURI = process.env.MONGO_URL;

// middlewares
app.use(
  cors({
    credentials: true,
    origin: [
      "https://asmi.life",
      "https://www.asmi.life",
      "http://localhost:5173",
    ],
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

// end of middlewares

app.get("/", (req, res) => {
  res.json("test ok");
});
app.post("/testpost", (req, res) => {
  const { data } = req.body;

  return res.json({ status: 201, data: data || "hello" });
});
// doc file

app.get("/agreement", (req, res) => {
  res.download("./INDEPENDENT_CONTRACTOR_AGREEMENT.pdf");
});

// doc file

app.use(authRoutes);
app.use(postRoutes);
app.use(mailRoutes);
app.use(paymentRoutes);
// APPU
app.use("/news", newsRoutes);
// #############################################
app.use("/assessyourself", selfAssessmentRoutes);
app.use("/aru", registeruserRoutes);
// APPU

mongoose
  .connect(mongoURI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
