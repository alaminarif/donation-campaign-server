// import { transports } from 'winston';

import nodemailer from 'nodemailer';
import config from '../config';
export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com.',
    port: 587,
    secure: config.env === 'production', // Use `true` for port 465, `false` for all other ports
    auth: {
      user: 'arifurr231@gmail.com',
      pass: 'iips xmzy mbnz zikx',
    },
  });

  await transporter.sendMail({
    from: 'arifurr231@gmail.com', // sender address
    to,
    subject: 'password change ', // Subject line
    text: 'Reset your password within 10 mins', // plain text body
    html, // html body
  });
};
