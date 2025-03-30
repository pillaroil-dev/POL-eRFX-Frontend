import { APPROVE_SIGN_UP_HTML, FROM_NAME } from '@/constants/notifications/email';
import { checkEmailInput } from '@/utilities/helpers/checkEmailInput';
import { transporter } from '@/utilities/helpers/emailTransporter';
import { prisma } from '@/utilities/helpers/prismaInstace';
import { AuthRefreshTokenStorage } from '@/utilities/helpers/redisStorage';
import type { APIRoute } from 'astro';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Generate a salt for hashing passwords
const salt = bcrypt.genSaltSync(10);

/**
 * Handles the POST request to sign up a new user.
 * 
 * @param {object} context - The request context, including request and redirect functions.
 * @returns A redirect response to the root path '/'.
 */
export const POST: APIRoute = async ({ request, redirect, session, cookies }) => {
    let x_pol_rfx_secret = process.env.X_POL_RFX_SECRET;
    request.headers.set("x-pol-rfx-secret", `${x_pol_rfx_secret}`);
    
    const data = await request.json();
    const { email, password: pass } = data;
    // Hash the password using bcrypt
    const password = bcrypt.hashSync(pass, salt);

    const isEmail = checkEmailInput(email);

    try {
        // Create a new user in the database
        const user = await prisma.user.create({
            data: {
                email: isEmail && email as string,
                password: password as string,
            },
        });

        const tokenPayload = { 
            email: user.email, 
            role: user.role, 
            id: user.id 
        };

        // Generate tokens in parallel
        const [token, refreshToken] = await Promise.all([
            jwt.sign(tokenPayload, process.env.JWT_SECRET || process.env.JWT_SECRET_OLD, { 
                expiresIn: parseInt(process.env.JWT_EXPIRES_IN)
            }),
            jwt.sign(tokenPayload, process.env.JWT_SECRET || process.env.JWT_SECRET_OLD, { 
                expiresIn: parseInt(process.env.JWT_REFRESH_EXPIRES_IN)
            })
        ]);
        // Store tokens in Redis in parallel
        await Promise.all([
            // Store tokens in session instead (making eah session identifiable using the user id)
            session.set(`user_${user.id}`, token),
            // store refreshToken in memory
            AuthRefreshTokenStorage.setItem(`${user.id}`, refreshToken, {
                ttl: parseInt(process.env.JWT_REFRESH_EXPIRES_IN)
            })
        ]);

        //do OTP verification before redirect!!!
        const otp = Math.floor(1000 + Math.random() * 9000); // Generate 4 digit OTP
        
        // Send mail with defined transport object
        let info = await transporter.sendMail({
            from: `${FROM_NAME} <${process.env.MAIL_USERNAME}>`, // Sender address
            to: email, // List of receivers
            subject: "Verify your account", // Subject line
            text: `Your OTP is ${otp}`, // Plain text body
            html: APPROVE_SIGN_UP_HTML(otp),
        });

        // Save OTP in cookies with a TTL of 15 minutes
        cookies.set('otp', JSON.stringify(otp), { path: "/", maxAge: 60 * 15, httpOnly: true });
        if (info?.messageId) {
            return new Response(JSON.stringify({ message: 'Signup successful' }), {
                status: 200,
            }); 
        }
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Signup failed. Check email and try again.' }), {
            status: 400,
        });
    }
};
