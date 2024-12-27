import type { APIRoute } from 'astro';
import { prisma } from '@/utilities/helpers/prismaInstace';
import { transporter } from '@/utilities/helpers/emailTransporter';
import { ADD_VENDOR_HTML_MANUAL_VERIFY, FROM_NAME } from '@/constants/notifications/email';
import bcrypt from "bcryptjs"
import { generateRandomPassword } from '@/utilities/helpers/generatePassword';

export const POST: APIRoute = async ({ request }) => {
    const data = await request.json();
    const vendorId = data.vendorId;

    // Generate a new random password
    const newPassword = generateRandomPassword();

    // Hash the new password
    const saltRounds = 10;
    const newHashedPassword = await bcrypt.hash(newPassword, saltRounds);

    try {
        // Update the user's verified status
        const updatedUser = await prisma.user.update({
            where: {
                id: Number(vendorId)
            },
            data: {
                password: newHashedPassword,
                verified: true
            },
            include: {
                Contractor: true
            }
        });

        if (updatedUser) {
            // Send onboarding complete email
            await sendOnboardingCompleteEmail(updatedUser.email, updatedUser.Contractor?.companyName, newPassword);

            return new Response(JSON.stringify({ message: "Vendor verified successfully." }), {
                status: 200
            });
        } else {
            return new Response(JSON.stringify({ message: "Vendor verification failed." }), {
                status: 400
            });
        }
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: "An error occurred during vendor verification." }), {
            status: 500
        });
    }
};

async function sendOnboardingCompleteEmail(email: string, companyName: string | undefined, password: string) {
    return await transporter.sendMail({
        from: `${FROM_NAME} <${process.env.MAIL_USERNAME}>`,
        to: email,
        subject: "Onboarding Complete - Welcome to POL eRFX",
        text: `Welcome to POL eRFX, ${companyName}! Your account has been verified.`,
        html: ADD_VENDOR_HTML_MANUAL_VERIFY(companyName || 'Valued Vendor', password)
    });
}
