import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail", // atau sesuaikan dengan provider email kamu
  auth: {
    user: process.env.EMAIL_USER, // email pengirim
    pass: process.env.EMAIL_PASS, // password aplikasi/email
  },
});