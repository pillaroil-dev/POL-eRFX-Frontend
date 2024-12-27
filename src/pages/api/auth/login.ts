import type { APIRoute } from 'astro';
import { PrismaClient } from '@prisma/client'
import { decodePassword } from '../../../utilities/helpers/verifyUser';
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()


export const POST: APIRoute = async ({ request, redirect, cookies }) => {
    let x_pol_rfx_secret = process.env.X_POL_RFX_SECRET;
    request.headers.set("x-pol-rfx-secret", `${x_pol_rfx_secret}`);
    
    const data = await request.json();
    const { email, password } = data;

    const user = await prisma.user.findFirst({
        where: {
            email: email as string,
        },
    })

    const decodedPassword = decodePassword(password as string, user?.password);

    if (decodedPassword) {
        // Generate a token for the user
        const token = jwt.sign({ email: user.email, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });
        cookies.set(process.env.COOKIE_NAME, token, { path: "/", expires: new Date(Date.now() + 60 * 60 * 24 * 1000), httpOnly: true, maxAge: 60 * 60 * 24 });

        return new Response(JSON.stringify({
            message: "Login successful", 
        }), { status: 200 })
    }

    return new Response(JSON.stringify({
        message: "Login failed. Try again.",
    }), {
        status: 400
    })
};
