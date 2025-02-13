import nodemailer from 'nodemailer';

const res = await fetch(`${import.meta.env.API_ENDPOINT}/v1/settings`, {
    headers: {
        "x-pol-rfx-secret": process.env.X_POL_RFX_SECRET,
        "Content-Type": "application/json",
    }
});

// Check if the response is ok
if (!res.ok) {
    const errorMessage = await res.text(); // Get the error message
    console.error(`Failed to fetch settings: ${res.status} - ${errorMessage}`);
    throw new Error("Error occurred while fetching app settings");
}

const { data } = await res.json();
const settings = data?.settings;

// Check if settings is an array and has at least one element
if (!Array.isArray(settings) || settings.length === 0) {
    throw new Error("Settings are not in the expected format or are empty");
}

const { smtpHost, smtpPort, smtpUser, smtpPassword } = settings[0];

// Create reusable transporter object using the default SMTP protocol
let transporter = nodemailer.createTransport({
    host: smtpHost || process.env.MAIL_HOST,
    port: smtpPort || process.env.MAIL_PORT || 587,
    secure: smtpPort === '465', // true for 465, false for other ports
    auth: {
        user: smtpUser || process.env.MAIL_USERNAME,
        pass: smtpPassword || process.env.MAIL_PASSWORD,
    },
});

export {
    transporter
}