import nodemailer from 'nodemailer';

import {  SMTP_PASSWORD,
    SMTP_USERNAME,
    EMAIL_FROM,
    SMTP_HOST,
    SMTP_PORT} from '../constants.js'
const mailsend = async (to, subject, html) => {

    const transporter = nodemailer.createTransport({
        service: 'Zoho Mail',
        port: SMTP_PORT,               // true for 465, false for other ports
        host: SMTP_HOST,
        secure: true, // true for 465, false for other ports
        auth: {
            user: SMTP_USERNAME,
            pass: SMTP_PASSWORD
        }
    });

    const mailOptions = {
        from: EMAIL_FROM,
        to: to,
        subject: subject,
        html: html
    };

    try {
        const result = await transporter.sendMail(mailOptions);
        return result.messageId;
    } catch (error) {
        return error;
    }

};

export default mailsend;