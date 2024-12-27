import nodemailer from 'nodemailer';

const res = await fetch(`${import.meta.env.API_ENDPOINT}/v1/settings`, {
    headers: {
        "x-pol-rfx-secret": process.env.X_POL_RFX_SECRET,
        "Content-Type": "application/json",
    }
});

if (!res.ok) {
    throw new Error("Error occured while fetching app settings");
}

const { data } = await res?.json();
const settings = data?.settings;

const {smtpHost, smtpPort, smtpUser, smtpPassword} = settings[0];


// Create reusable transporter object using the default SMTP protocol
let transporter = nodemailer.createTransport({
    host: smtpHost || process.env.MAIL_HOST,
    port: smtpPort || process.env.MAIL_PORT || 587,
    secure: smtpPort === '465' ? true : false, // true for 465, false for other ports
    auth: {
        user: smtpUser || process.env.MAIL_USERNAME,
        pass: smtpPassword || process.env.MAIL_PASSWORD,
    },
});

export {
    transporter
}