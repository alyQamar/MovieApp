const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  //[x] 1) Create transporter (service that will send email like "gmail","sendGrid")
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT, // if (secure) --> {port=465} else if(!secure )--> {port=587}
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  //[x] 2) Define email options (like from,to,subject,email content)
  const mailOptions = {
    from: `Movie App <${process.env.EMAIL_USER}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  //[x] 3) send email
  await transporter.sendMail(mailOptions);
};
module.exports = sendEmail;
