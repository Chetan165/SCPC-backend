const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Query = require("./models/Query");
const validator = require("./validation");
const nodemailer = require("nodemailer");
require("dotenv").config();

app.use(express.json());

const SendMail = async (user) => {
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  const mailOptions = {
    from: `"TCET Shastra" <${process.env.EMAIL_USER}>`,
    to: user,
    subject: "Your Query Has Been Acknowledged - SCPC Hackathon",
    text: "Thank you for reaching out to SCPC by TCET Shastra. Your query has been received and our team will get back to you soon.",
    html: `
  <div style="font-family: Arial, sans-serif; text-align: center; padding: 24px;">
    <img src="https://media.licdn.com/dms/image/v2/D4E0BAQGasYpyjgM-Bg/company-logo_200_200/company-logo_200_200/0/1665760793967?e=1770854400&v=beta&t=HJXKlYjfNQ_dVIa1zdTimzl7JVBvlla8caVUYf9-5t4" alt="SCPC Logo" style="width:120px; margin-bottom:16px;" />
    <h2 style="color: #2e6c80;">Thank You for Contacting Us!</h2>
    <p style="font-size: 16px; color: #333;">
      Dear Participant,<br>
      Your query has been successfully received by the SCPC Hackathon team.<br>
      We appreciate your interest and will respond as soon as possible.<br><br>
      <strong>SCPC - TCET Shastra</strong>
    </p>
    <hr style="margin: 24px 0;">
    <p style="font-size: 13px; color: #888;">
      This is an automated message.
    </p>
  </div>
`,
  };
  const info = await transporter.sendMail(mailOptions);
  console.log("Email sent:", info.messageId);
};

app.post("/api/query", validator, async (req, res) => {
  try {
    const { Name, Email, Subject, Message } = req.body;
    await Query.create({
      Name,
      Email,
      Subject,
      Message,
    });
    SendMail(Email);
    res.json({
      success: true,
      message: "Query submitted successfully",
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: "Something went wrong",
    });
  }
});

app.listen(process.env.PORT, async () => {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("Connected to MongoDB");
  console.log(`Server started at port ${process.env.PORT}`);
});
