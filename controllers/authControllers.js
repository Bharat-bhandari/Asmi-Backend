const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Ensure to set a secure secret key in your environment variables
const secretKey = process.env.SECRET_KEY;

// Function to handle admin login
exports.postAdminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const userDoc = await User.findOne({ username });

    // Check if user exists
    if (!userDoc) {
      return res.status(404).json({ error: "User not found" });
    }

    // Compare passwords
    const passOk = await bcrypt.compare(password, userDoc.password);
    if (passOk) {
      // Generate JWT token
      jwt.sign(
        { username, id: userDoc._id },
        secretKey,
        { expiresIn: "1h" },
        (err, token) => {
          if (err) {
            throw err;
          }
          // Set token as a cookie and send user info in response
          res
            .cookie("token", token, {
              httpOnly: true,
              secure: true,
              sameSite: "strict",
            })
            .json({
              id: userDoc._id,
              username,
            });
        }
      );
    } else {
      // Incorrect credentials
      res.status(400).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    // Handle errors
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function to get user profile
exports.getProfile = (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Verify JWT token
  jwt.verify(token, secretKey, {}, (err, info) => {
    if (err) {
      console.error("JWT verification error:", err);
      return res.status(401).json({ error: "Unauthorized" });
    }
    res.json(info);
  });
};

// Function to handle user logout
exports.postLogout = (req, res) => {
  // Clear token cookie upon logout
  res
    .clearCookie("token", { sameSite: "strict", secure: true })
    .json("Logout successful");
};
