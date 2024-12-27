import { GENERATE_PASSWORD_RESET_OTP_HTML } from '@/constants/notifications/email';
import { transporter } from '@/utilities/helpers/emailTransporter';
import { prisma } from '@/utilities/helpers/prismaInstace';
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
    let x_pol_rfx_secret = process.env.X_POL_RFX_SECRET;
    request.headers.set("x-pol-rfx-secret", `${x_pol_rfx_secret}`);
    
    const data = await request.formData();
    const email = data.get('email') as string;

    if (!email) {
        return new Response("Email is required", { status: 400 });
    }

    const user = await prisma.user.findUnique({
        where: {
            email: email as string,
        },
    });

    if (!user) {
        return new Response("User not found", { status: 404 });
    }

    // Generate a 4 digit OTP
    const otp = Math.floor(1000 + Math.random() * 9000);
    //set the otp in cookies
    cookies.set('otp', String(otp), {path: '/', httpOnly: true, maxAge: 60 * 60 * 15});
    
    // Send mail with defined transport object
    const info = await transporter.sendMail({
        from: `"POL eRFX" <${process.env.MAIL_USERNAME}>`, // Sender address
        to: email, // List of receivers
        subject: "Password Reset OTP", // Subject line
        html: GENERATE_PASSWORD_RESET_OTP_HTML(otp), // HTML body with styling
    });

    if (info.messageId) {
        cookies.set('otp-type', 'pass-reset-otp', { path: '/' });
        cookies.set('user', email, { path: '/' });
        return redirect('/auth/confirm-otp');
    }

    return redirect('/auth/forgot-password');;
}
