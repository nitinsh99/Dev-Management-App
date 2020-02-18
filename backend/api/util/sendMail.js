const nodemailer = require("nodemailer");
const sendEmail = body => {
  console.log("process.env.EMAIL_USERNAME", process.env.EMAIL_USERNAME);
  console.log("process.env.EMAIL_PASSWORD", process.env.EMAIL_PASSWORD);
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USERNAME, // generated ethereal user
      pass: process.env.EMAIL_PASSWORD // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  transporter.sendMail(body, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  });
};

module.exports = sendEmail;
