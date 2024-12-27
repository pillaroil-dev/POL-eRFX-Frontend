import { EXTEND_END_DATE_OTP_HTML } from "@/constants/notifications/email";
import { transporter } from "@/utilities/helpers/emailTransporter";
import { prisma } from "@/utilities/helpers/prismaInstace";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
    const data = await request.json();
    const otp = data.otp;

    try {
        const updatedEndDate =  await transporter.sendMail({
            from: `"POL eRFX" <${process.env.MAIL_USERNAME}>`,
            to: process.env.ADMIN_EMAIL,
            subject: "Extend End Date OTP",
            html: EXTEND_END_DATE_OTP_HTML(otp),
        });
        if (updatedEndDate.messageId) {
            return new Response(null, { status: 200 })
        } else {
            return new Response(null, { status: 400 })
        }
    } catch (error) {
        console.log(error)
        return new Response(null, { status: 400 })
    }
}