import type { APIRoute } from 'astro';
import { decodePassword } from '@/utilities/helpers/verifyUser';
import jwt from 'jsonwebtoken';
import { prisma } from '@/utilities/helpers/prismaInstace';
import { AuthRefreshTokenStorage } from '@/utilities/helpers/redisStorage';

export const POST: APIRoute = async ({ request, session }) => {
    try {
        // Set security header
        request.headers.set("x-pol-rfx-secret", process.env.X_POL_RFX_SECRET);

        const { email, password } = await request.json();

        if (!email || !password) {
            return new Response(JSON.stringify({
                message: "Email and password are required"
            }), { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { email },
            select: { email: true, password: true, role: true, id: true }
        });

        if (!user || !decodePassword(password, user.password)) {
            return new Response(JSON.stringify({
                message: "Invalid credentials"
            }), { status: 401 });
        }

        const tokenPayload = { email: user.email, role: user.role };

        // Generate tokens in parallel
        const [token, refreshToken] = await Promise.all([
            jwt.sign(tokenPayload, process.env.JWT_SECRET, { 
                expiresIn: parseInt(process.env.JWT_EXPIRES_IN)
            }),
            jwt.sign(tokenPayload, process.env.JWT_SECRET, { 
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

        return new Response(JSON.stringify({
            message: "Login successful"
        }), { status: 200 });

    } catch (error) {
        console.error('Login error:', error);
        return new Response(JSON.stringify({
            message: "Internal server error"
        }), { status: 500 });
    }
};
