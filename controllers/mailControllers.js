const nodemailer = require("nodemailer");
const fs = require("fs");

function sendEmail({ recipient_email, message }) {
  return new Promise((resolve, reject) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mail_configs = {
      from: process.env.EMAIL_USER,
      to: recipient_email,
      subject: "Hello world",
      text: message,
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

exports.postCareerMail = async (req, res) => {
  try {
    // Access the uploaded files from req.files
    const file1 = req.files["degree"][0]; // Access the first file uploaded with field name 'file1'
    const file2 = req.files["cv"][0]; // Access the first file uploaded with field name 'file2'

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
      to: "bharatbhandari0302@gmail.com", // Change this to the recipient's email address
      subject: "New Form Submission",
      text: emailMessage,
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
      to: "bharatbhandari0302@gmail.com", // Change this to the recipient's email address
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
      to: "bharatbhandari0302@gmail.com", // Change this to the recipient's email address
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
      to: "bharatbhandari0302@gmail.com", // Change this to the recipient's email address
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
      to: "bharatbhandari0302@gmail.com", // Change this to the recipient's email address
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
