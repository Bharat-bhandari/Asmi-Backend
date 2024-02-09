const nodemailer = require("nodemailer");
const fs = require("fs");

const Vendor = require("../models/VendorModel");
const Career = require("../models/CareerModel");
const MIntern = require("../models/MarketingIntern");
const PIntern = require("../models/PsychoIntern");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function sendEmail({ recipient_email, message, userName }) {
  return new Promise((resolve, reject) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const emailMessage = `
    New Message from Contact Form

    - UserName: ${userName}
    - UserEmail: ${recipient_email}
    - userMessage: ${message}
    
    `;

    const mail_configs = {
      from: process.env.EMAIL_USER,
      to: "hello@asmi.life",
      cc: "general.care@anjanajyoti.org",

      subject: "New Message from Contact us - Asmi",
      text: emailMessage,
    };
    transporter.sendMail(mail_configs, function (error, info) {
      if (error) {
        console.log(error);
        return reject({ message: `An error has occured` });
      }
      return resolve({ message: "Email sent succesfuly" });
    });
  });
}

exports.postMail = (req, res) => {
  console.log("Somebody just hit me");
  console.log(req.body);
  sendEmail(req.body)
    .then((response) => res.send(response.message))
    .catch((error) => res.status(500).send(error.message));
};

//test
exports.postFormMail = async (req, res) => {
  try {
    // Access the uploaded files from req.files
    const file1 = req.files["file1"][0]; // Access the first file uploaded with field name 'file1'
    const file2 = req.files["file2"][0]; // Access the first file uploaded with field name 'file2'

    // Process file1
    const { originalname: originalname1, path: path1 } = file1;
    const parts1 = originalname1.split(".");
    const ext1 = parts1[parts1.length - 1];
    const newPath1 = path1 + "." + ext1;
    fs.renameSync(path1, newPath1);

    // Process file2
    const { originalname: originalname2, path: path2 } = file2;
    const parts2 = originalname2.split(".");
    const ext2 = parts2[parts2.length - 1];
    const newPath2 = path2 + "." + ext2;
    fs.renameSync(path2, newPath2);

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: "bharatbhandari0302@gmail.com", // Change this to the recipient's email address
      subject: "Email with Attachments",
      text: "Please find the attached files.",
      attachments: [
        {
          filename: originalname1,
          path: newPath1,
        },
        {
          filename: originalname2,
          path: newPath2,
        },
      ],
    };

    await transporter.sendMail(mailOptions);

    fs.unlinkSync(newPath1);
    fs.unlinkSync(newPath2);

    // Send response
    res.send("Uploads successful");
  } catch (error) {
    console.error("Error handling uploads:", error);
    res.status(500).send("Error handling uploads");
  }
};
// test

exports.postCareerMail = async (req, res) => {
  try {
    // Access the uploaded files from req.files
    const file1 = req.files["degree"][0]; // Access the first file uploaded with field name 'file1'
    const file2 = req.files["cv"][0]; // Access the first file uploaded with field name 'file2'

    const response1 = await cloudinary.uploader.upload(file1.path, {
      resource_type: "auto",
    });

    const response2 = await cloudinary.uploader.upload(file2.path, {
      resource_type: "auto",
    });

    const path1 = response1.secure_url;
    const path2 = response2.secure_url;

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
      highDegree,
      universityName,
      yog,
      lanKnown,
      Rci,
      noyPractice,
      expRes,
      expText,
      shareSession,
      noh,
      available,
      specialization,
    } = req.body;

    await Career.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
      highDegree,
      universityName,
      yearOfGraduation: yog,
      languageKnown: lanKnown,
      Rci,
      noYearPractice: noyPractice,
      expRes,
      expText,
      shareSession,
      noHour: noh,
      available,
      specialization,
      degreeImage: path1, // Store degree image URL
      cvImage: path2, // Store CV image URL
    });

    const emailMessage = `
    New Form Submission:

    Personal Information:
    - FirstName:  ${firstName}
    - LastName:  ${lastName}
    - Email:  ${email}
    - PhoneNo:  ${phoneNumber}
    - Address:  ${address}

    Educational Background:
    - High Degree Earned:  ${highDegree}
    - Name of University:  ${universityName}
    - Year of Graduation:  ${yog}

    - Languages Known: ${lanKnown}

    Professional Credentials:
    - RCI Number:  ${Rci}
    - No. of years practicing as a Psychologist:  ${noyPractice}

    Online Counselling Experience:
    - Do you have experience in Online Counselling?:  ${expRes}
    - If yes, please describe your experience in online counselling:  ${expText}
    - Share a challenging counselling session:  ${shareSession}

    Availability:
    - How many hours a day can you dedicate to our App?:  ${noh}
    - Are you available for online sessions during night hours?:  ${available}

    Specializations:
    - List your specializations:  ${specialization}
    `;

    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: "Tanvi.gupta@asmi.life", // Change this to the recipient's email address
      cc: "general.care@anjanajyoti.org",
      subject: "New Career Form Submission",
      text: emailMessage,
      attachments: [
        {
          filename: file1.originalname,
          path: file1.path,
        },
        {
          filename: file2.originalname,
          path: file2.path,
        },
      ],
    };

    // console.log(mailOptions);

    await transporter.sendMail(mailOptions);

    fs.unlinkSync(file1.path);
    fs.unlinkSync(file2.path);

    // Send response
    res.send("Uploads successful");
  } catch (error) {
    console.error("Error handling uploads:", error);
    res.status(500).send("Error handling uploads");
  }
};

exports.postVendorMail = async (req, res) => {
  try {
    // Access the uploaded files from req.files
    const file1 = req.files["panCard"][0];
    const file2 = req.files["gstFile"] ? req.files["gstFile"][0] : null;
    const file3 = req.files["cheque"][0];

    // Upload images to Cloudinary
    const uploadPromises = [
      cloudinary.uploader.upload(file1.path, { resource_type: "auto" }),
      cloudinary.uploader.upload(file3.path, { resource_type: "auto" }),
    ];

    // Upload file2 if it exists
    if (file2) {
      uploadPromises.push(cloudinary.uploader.upload(file2.path), {
        resource_type: "auto",
      });
    }

    // Wait for all uploads to complete
    const results = await Promise.all(uploadPromises);

    // Extract image URLs
    const [panCardImage, chequeImage, gstImage] = results.map(
      (result) => result.secure_url
    );

    // Extract data from req.body
    const {
      firstName,
      lastName,
      email,
      mobile,
      designation,
      companyName,
      orgType,
      address,
      state,
      pinCode,
      gstin,
      companyPan,
      bankAccountName,
      bankAccountNumber,
      bankName,
      bankBranchState,
      ifsc,
    } = req.body;

    // Create a new vendor document with image URLs
    const newVendor = await Vendor.create({
      firstName,
      lastName,
      email,
      mobile,
      designation,
      companyName,
      orgType,
      address,
      state,
      pinCode,
      gstin,
      companyPan,
      bankAccountName,
      bankAccountNumber,
      bankName,
      bankBranchState,
      ifsc,
      panCardImage,
      gstImage,
      chequeImage,
    });

    // Send email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const emailMessage = `
      Vendor Onboarding Form Submission:

      Personal Information:
      - FirstName: ${firstName}
      - Last Name: ${lastName}
      - Email: ${email}
      - Mobile: ${mobile}
      - Designation: ${designation}

      Company Information:
      - Company Name: ${companyName}
      - Type of Organisation: ${orgType}

      Address Information:
      - Address: ${address}
      - State/UT: ${state}
      - PIN Code: ${pinCode}
      - GSTIN: ${gstin}

      Bank Information:
      - Company PAN: ${companyPan}
      - Bank Account Name: ${bankAccountName}
      - Bank Account Number: ${bankAccountNumber}
      - Bank Name: ${bankName}
      - Bank Branch & State: ${bankBranchState}
      - IFSC: ${ifsc}
    `;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "ayushi@anjanajyoti.org", // Change this to the recipient's email address
      cc: "general.care@anjanajyoti.org",
      subject: "New Vendor Form Submission",
      text: emailMessage,
      attachments: [
        {
          filename: file1.originalname,
          path: file1.path,
        },
        {
          filename: file3.originalname,
          path: file3.path,
        },
      ],
    };

    // Add the GST file attachment only if it exists
    if (file2) {
      mailOptions.attachments.push({
        filename: file2.originalname,
        path: file2.path,
      });
    }

    await transporter.sendMail(mailOptions);

    fs.unlinkSync(file1.path);
    if (file2) {
      fs.unlinkSync(file2.path);
    }
    fs.unlinkSync(file3.path);

    // Send response
    res.send("Uploads successful");
  } catch (error) {
    console.error("Error handling uploads:", error);
    res.status(500).send("Error handling uploads");
  }
};

exports.postmInternMail = async (req, res) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
      universityName,
      collegeName,
      dcs,
      internpref,
      noh,
      qnMember,
      viewSm,
      smc,
      smcl,
      dpw,
    } = req.body;

    const emailMessage = `
    Asmi - New Marketing Internship Form:

    Personal Information:
    - FirstName: ${firstName}
    - LastName: ${lastName}
    - Email: ${email}
    - PhoneNo: ${phoneNumber}
    - Address: ${address}
    
    Educational Information:
    - University Name: ${universityName}
    - College Name: ${collegeName}
    - Dept, Course & Semester: ${dcs}
    
    Internship Preferences:
    - Type of Internship: ${internpref}
    - Part Time Hours/Day (if applicable): ${noh}
    
    Societies Membership:
    - Member of Societies?: ${qnMember}
    - Name of Society(ies), reason for joining, and experience so far: ${viewSm}
    
    Social Media Views:
    - Views on Social Media and its importance in Marketing and Branding: ${smc}
    
    Social Media Content:
    - Created Social Media Video Content?: ${smc === "Yes" ? "Yes" : "No"}
    - Links to some content (if applicable): ${smcl}
    
    Availability:
    - Days per week you can come to the office: ${dpw}
    `;

    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: "arvinder@anjanajyoti.org", // Change this to the recipient's email address
      cc: "general.care@anjanajyoti.org",
      subject: "New Marketing Internship Form Submission",
      text: emailMessage,
    };

    await transporter.sendMail(mailOptions);

    // Save the form data to the database
    await MIntern.create(req.body);

    res.send("Form submission successful");
  } catch (error) {
    console.error("Error handling form submission:", error);
    res.status(500).send("Error handling form submission");
  }
};

exports.postpInternMail = async (req, res) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
      universityName,
      collegeName,
      dcs,
      qnMember,
      whyPsycho,
      dedtime,
      aoi,
      prevworked,
      prevworkdet,
    } = req.body;

    const emailMessage = `
    Asmi - New Psychology Internship Form:
    
    Personal Information:
    - FirstName: ${firstName}
    - LastName: ${lastName}
    - Email: ${email}
    - PhoneNo: ${phoneNumber}
    - Address: ${address}
    
    Educational Information:
    - University Name: ${universityName}
    - College Name: ${collegeName}
    - Dept, Course & Semester: ${dcs}
    
    Internship Preferences:
    - Member of Societies?: ${qnMember}
    
    Additional Information:
    - Why did you choose Psychology as a Subject?: ${whyPsycho}
    - Ready to dedicate 20 hours a week for your internship?: ${dedtime}
    - Areas of Psychology that interest you the most: ${aoi}
    
    Previous Experience:
    - Worked/Interned in a similar program?: ${prevworked}
    - If yes, please provide details: ${prevworkdet}
    `;

    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: "Felicia@asmi.life", // Change this to the recipient's email address
      cc: "general.care@anjanajyoti.org",

      subject: "New Psychology Internship Form Submission",
      text: emailMessage,
    };

    await transporter.sendMail(mailOptions);

    // Save the form data to the database
    await PIntern.create(req.body);

    res.send("Form submission successful");
  } catch (error) {
    console.error("Error handling form submission:", error);
    res.status(500).send("Error handling form submission");
  }
};

exports.postYogaMail = async (req, res) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      country,
      physicalFitness,
      stressRelief,
      spiritualGrowth,
    } = req.body;

    const emailMessage = `
    Asmi - Yoga Form Submission:
    
    Personal Information:
    - FirstName: ${firstName}
    - LastName: ${lastName}
    - Email: ${email}
    - PhoneNo: ${phoneNumber}
    - Country: ${country}
    
    Primary Goal in Yoga:
    - Physical Fitness and Flexibility: ${physicalFitness ? "Yes" : "No"}
    - Stress Relief and Relaxation: ${stressRelief ? "Yes" : "No"}
    - Spiritual Growth and Mindfulness: ${spiritualGrowth ? "Yes" : "No"}
    `;

    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: "arvinder@anjanajyoti.org", // Change this to the recipient's email address
      cc: "general.care@anjanajyoti.org",

      subject: "New Form Submission",
      text: emailMessage,
    };

    await transporter.sendMail(mailOptions);

    res.send("sent mail successful");
  } catch (error) {
    console.error("Error handling uploads:", error);
    res.status(500).send("Error handling uploads");
  }
};

exports.postAsseemnetMail = async (req, res) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const { name, email } = req.body;

    const emailMessage = `
    Asmi - Assesment form  :
    
    Personal Information:
    - UserName: ${name}
    - Email: ${email}
   
  
    `;

    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: "hello@asmi.life", // Change this to the recipient's email address
      cc: "general.care@anjanajyoti.org",

      subject: "New Form Submission",
      text: emailMessage,
    };

    await transporter.sendMail(mailOptions);

    res.send("sent mail successful");
  } catch (error) {
    console.error("Error handling uploads:", error);
    res.status(500).send("Error handling uploads");
  }
};
