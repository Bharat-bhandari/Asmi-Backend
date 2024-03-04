const mongoose = require("mongoose");

// Define the Career schema
const careerSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: String,
    address: String,
    highDegree: String,
    universityName: String,
    yearOfGraduation: String,
    languageKnown: String,
    rce: String,
    noYearPractice: String,
    expRes: String,
    expText: String,
    shareSession: String,
    accomplishments: String,
    dailyPractice: String,
    noHour: String,
    available: String,
    specialization: String,
    degreeImage: String, // Store the Cloudinary URL for the degree image
    cvImage: String, // Store the Cloudinary URL for the CV image
  },
  {
    timestamps: true,
  }
);

// Create the Career model
const Career = mongoose.model("Career", careerSchema);

module.exports = Career;
