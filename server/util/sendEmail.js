
const nodemailer = require("nodemailer");
require("dotenv").config();

const user = process.env.USER;
const pass = process.env.PASS;

const transport = nodemailer.createTransport({
  service: process.env.SERVICE,
  auth: {
    user: user,
    pass: pass,
  },
});

module.exports.sendConfirmationEmail = (fullname, email, confirmationCode) => {
  transport.sendMail({
    from: process.env.USER,
    to: email,
    subject: "Please confirm your account",
    html: `<div><h1>Email Confirmation</h1>
        <h3>Hello ${fullname}</h3>
        <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
        <a href=http://localhost:3000/confirm/${confirmationCode}> Click here</a>
        </div>`,
  }).catch(err => console.log(err));
};

module.exports.sendConfirmatinPassword = (fullname, email, access_token) => {
  transport.sendMail({
    from: process.env.USER,
    to: email,
    subject: "change password ",
    html: `<h1>Email Confirmation</h1>
        <h3>Hello ${fullname}</h3>
        <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
        <a href=http://localhost:3000/reset/${access_token}> Click here</a>
        `,
  }).catch(err => console.log(err));
};
