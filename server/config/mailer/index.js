const nodemailer = require("nodemailer");

let mailConfig = {
  port: process.env.MAIL_PORT,
  host: 'smtp.ethereal.email',
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
  transactionLog: true,
};

let transporter = nodemailer.createTransport(mailConfig);

const sendMail = (toEmail, subject, text) => {
  let mailOptions = {
    from: process.env.MAIL_USER,
    to: toEmail,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      return console.log(err);
    }

    console.log(`Message sent: ${info.messageId}`);
    console.log(`Message status: Completed`);
  });
};

module.exports = {sendMail};
