import { prisma } from "@/utilities/helpers/prismaInstace"; 
import { AuthRefreshTokenStorage, GetTokenByCookieName } from "@/utilities/helpers/redisStorage";
import { defineMiddleware } from "astro:middleware";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";

export const auth = defineMiddleware(async ({ cookies, locals, request, redirect, session }, next) => {
    const sessionCookie = await cookies.get(import.meta.env.SESSION_NAME)?.value;
    const jwtSecret = import.meta.env.JWT_SECRET as string;

    // If no session cookie, proceed without setting the user
    if (!sessionCookie) {
        locals.isLoggedIn = false;
        return next();
    }

    const tokenData = await GetTokenByCookieName.get(sessionCookie);
    const token = tokenData[3];

    const x_pol_rfx_secret = process.env.X_POL_RFX_SECRET;
    request.headers.set("x-pol-rfx-secret", x_pol_rfx_secret);

    if (!token) {
        console.error("Token is missing from token data.");
        locals.isLoggedIn = false;
        return redirect('/forbidden', 301);
    }

    const decoded = jwtDecode(token) as JwtPayload;
    const tokenActive = decoded.exp * 1000 > Date.now();

    // Function to refresh user token
    const refreshUserToken = async () => {
        const refreshToken = await AuthRefreshTokenStorage.getItem(`${decoded.id}`) as string;
        if (!refreshToken) {
            return null; // No refresh token available
        }
        const decodedRefreshToken = jwtDecode(refreshToken) as JwtPayload;

        if (decodedRefreshToken.exp * 1000 > Date.now()) {
            const tokenPayload = { 
                email: decodedRefreshToken.email, 
                role: decodedRefreshToken.role, 
                id: decodedRefreshToken.id 
            };

            try {
                const [newToken, refreshedToken] = await Promise.all([
                    jwt.sign(tokenPayload, jwtSecret, { expiresIn: parseInt(import.meta.env.JWT_EXPIRES_IN) }),
                    jwt.sign(tokenPayload, jwtSecret, { expiresIn: parseInt(import.meta.env.JWT_REFRESH_EXPIRES_IN) })
                ]);

                await Promise.all([
                    session.set(`user_${tokenPayload.id}`, newToken),
                    AuthRefreshTokenStorage.setItem(`${tokenPayload.id}`, refreshedToken, {
                        ttl: parseInt(import.meta.env.JWT_REFRESH_EXPIRES_IN)
                    })
                ]);

                return newToken; // Return the new token
            } catch (error) {
                console.error("Error refreshing token:", error);
                return null; // Indicate failure
            }
        }
        return null; // Token expired
    };

    // Refresh token if it's not active
    if (!tokenActive) {
        const newToken = await refreshUserToken();
        if (!newToken) {
            session.destroy();
            locals.isLoggedIn = false;
            return redirect('auth/login');
        }
    }

    // Fetch user data based on the email in the decoded token
    try {
        const userQueryOptions = {
            where: { email: decoded.email },
            include: { user: { select: { role: true, verified: true } } }
        };

        const user = decoded.role.startsWith('fx-')
            ? await prisma.fxbidder.findFirst(userQueryOptions)
            : (await prisma.contractor.findFirst(userQueryOptions) || await prisma.member.findFirst({
                ...userQueryOptions,
                include: {
                    contractor: true,
                    user: { select: { role: true, verified: true } }
                }
            }));

        if (user) {
            //@ts-ignore
            locals.user = user as User;
            locals.isLoggedIn = true;
        } else {
            console.error("User not found for the given email:", decoded.email);
            locals.isLoggedIn = false;
            return redirect('/forbidden', 301);
        }
    } catch (error) {
        console.error("JWT verification failed:", error);
        locals.isLoggedIn = false;
        return redirect('/forbidden', 301);
    }

    return next();
});