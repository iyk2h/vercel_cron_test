// mail.js
"use server";

import { createTransport } from "nodemailer";

export async function sendEmail(v) {
  const { NEXT_PUBLIC_EMAIL_SERVICE, NEXT_PUBLIC_USER, NEXT_PUBLIC_PASS } =
    process.env;

  // const transporter = createTransport({
  //   host: "smtp.gmail.com",
  //   port: 465,
  //   secure: true,
  //   auth: {
  //     user: NEXT_PUBLIC_USER,
  //     pass: NEXT_PUBLIC_PASS,
  //   },
  // });

  // const mailData = {
  //   from: {
  //     name: `LagLess`,
  //     address: NEXT_PUBLIC_USER,
  //   },
  //   to: "yee0230@gmail.com",
  //   subject: `${v} form message`,
  //   text: `test message ${Math.random()}`,
  // };

  // return new Promise((resolve, reject) => {
  //   transporter.sendMail(mailData, (err, info) => {
  //     if (err) {
  //       console.error(err);
  //       reject(err);
  //     } else {
  //       console.log("Email Sent : ", info);
  //       resolve(info);
  //     }
  //   });
  // });

  const sgMail = require("@sendgrid/mail");
  sgMail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY);
  const msg = {
    from: NEXT_PUBLIC_USER, // Change to your recipient
    to: "yee0230@gmail.com", // Change to your verified sender
    subject: "Sending with SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  };

  return new Promise((resolve, reject) => {
    sgMail
      .send(msg)
      .then((info) => {
        console.log("sent : ", info);
        resolve({ ok: info });
      })
      .catch((error) => {
        console.error("Error occurred:", error);
        reject({ err: error });
      });
  });
}
