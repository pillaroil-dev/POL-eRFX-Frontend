import { prisma } from "@/utilities/helpers/prismaInstace"; 
import { AuthRefreshTokenStorage, GetTokenByCookieName } from "@/utilities/helpers/redisStorage";
import { defineMiddleware } from "astro:middleware";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";

export const auth = defineMiddleware(async ({ cookies, locals, request, redirect, session }, next) => {
    
    request.headers.set("x-pol-rfx-secret", import.meta.env.X_POL_RFX_SECRET);
    const sessionCookie = cookies.get(import.meta.env.SESSION_NAME)?.value;
    const jwtSecret = import.meta.env.JWT_SECRET as string;

    if (!sessionCookie) {
        return next();
    };

    const tokenData = await GetTokenByCookieName.get(sessionCookie);
    const token = tokenData[3];

    try {
        if (!token) {
            console.error("Token is missing from token data.");
            return redirect('/forbidden', 301);
        }
    
        const decoded = jwtDecode(token) as JwtPayload;
        const tokenActive = decoded.exp * 1000 > Date.now();
    
    
        // Function to refresh user token
        const refreshUserToken = async () => {
            const refreshToken = await AuthRefreshTokenStorage.getItem(`${decoded.id}`) as string;
            if (!refreshToken) {
                session.destroy();
                cookies.delete(process.env.SESSION_NAME, { path: "/" });
                return redirect('/auth/login');
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
                return redirect('/auth/login');
            }
        };

        // Fetch user data based on the email in the decoded token
        const userQueryOptions = {
            where: { email: decoded.email },
            include: { user: { select: { role: true, verified: true } } }
        };

        const user = decoded.role.startsWith('fx-')
            ? await prisma.fxbidder.findFirst(userQueryOptions)
            : (await prisma.contractor.findFirst(userQueryOptions) 
                ?? await prisma.member.findFirst({
                    ...userQueryOptions,
                    include: {
                        contractor: true,
                        user: { select: { role: true, verified: true } }
                    }
                }) 
                ?? await prisma.admin.findFirst(userQueryOptions));
        if (user) {
            locals.user = user as User;
            locals.isLoggedIn = true;
        };
    
    } catch (error) {
            console.error("JWT verification failed:", error);
            locals.isLoggedIn = false;
            return redirect('/forbidden', 301);
    };
    return next(); 
});