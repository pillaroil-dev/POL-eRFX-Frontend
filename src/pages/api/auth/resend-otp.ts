import { FROM_NAME, RESEND_OTP_HTML } from "@/constants/notifications/email";
import { transporter } from "@/utilities/helpers/emailTransporter";
import type { APIRoute } from "astro";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer"

interface JwtPayload {
    email: string;
}

let email: string;

//resend otp
export const GET: APIRoute = async ({ cookies, request }) => {
    let x_pol_rfx_secret = process.env.X_POL_RFX_SECRET;
    request.headers.set("x-pol-rfx-secret", `${x_pol_rfx_secret}`);
    try {
        const token = cookies.get(import.meta.env.COOKIE_NAME!)?.value!;
        const decodedToken = jwt.verify(token, import.meta.env.JWT_SECRET) as JwtPayload;
        email = decodedToken.email;
    } catch (error) {
        console.error("Error decoding email:", error);
        return new Response("Error decoding email", { status: 400 });
    }
    // Perform OTP verification before redirecting
    const otp = Math.floor(1000 + Math.random() * 9000); // Generate 4 digit OTP

    // // Send mail with defined transport object
    let info = await transporter.sendMail({
        from: `${FROM_NAME} <${process.env.MAIL_USERNAME}>`, // Sender address
        to: email, // List of receivers
        subject: "Verify your account", // Subject line
        text: `Your OTP is ${otp}`, // Plain text body
        html: RESEND_OTP_HTML(otp)
    });
    if (info?.messageId) {
        // Save OTP in cookies with a TTL of 15 minutes
        cookies.set('otp', JSON.stringify(otp), { path: "/", maxAge: 60 * 15, httpOnly: true });
        
        return new Response(JSON.stringify({message: true}));
    }

    return new Response(JSON.stringify({ message: false }));
};