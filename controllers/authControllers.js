const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const secretKey = process.env.SECRET_KEY;

const User = require("../models/User");

exports.postAdminLogin = async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });
  const passOk = bcrypt.compareSync(password, userDoc.password);
  if (passOk) {
    // logged in
    jwt.sign({ username, id: userDoc._id }, secretKey, {}, (err, token) => {
      if (err) throw err;
      res.cookie("token", token).json({
        id: userDoc._id,
        username,
      });
    });
  } else {
    res.status(400).json("wrong credentials");
  }
};

exports.getProfile = (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json("Unauthorized");
  }

  jwt.verify(token, secretKey, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
};

exports.postLogout = (req, res) => {
  res.cookie("token", "").json("ok");
};
