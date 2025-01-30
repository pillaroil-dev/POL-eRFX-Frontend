import { prisma } from "@/utilities/helpers/prismaInstace"; // Fixed typo in 'prismaInstace'
import { AuthRefreshTokenStorage, GetTokenByCookieName } from "@/utilities/helpers/redisStorage";
import { defineMiddleware } from "astro:middleware";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";

export const auth = defineMiddleware(async ({ cookies, locals, request, redirect, session }, next) => {
    const sessionCookie = await cookies.get(import.meta.env.SESSION_NAME)?.value;
    const jwtSecret = import.meta.env.JWT_SECRET as string;

    if (!sessionCookie) {
        return next();
    }

    const tokenData = await GetTokenByCookieName.get(sessionCookie);
    const token = tokenData[3]; // based on stored data structure by astro session.

    const x_pol_rfx_secret = process.env.X_POL_RFX_SECRET;
    request.headers.set("x-pol-rfx-secret", x_pol_rfx_secret);

    if (!token) {
        console.error("Token is missing from token data.");
        return redirect('/forbidden', 301);
    }

    //decode the token
    const decoded = jwtDecode(token) as JwtPayload;

    // check if token is valid
    const tokenActive = decoded.exp * 1000 > Date.now();

    const refreshUserToken = async () => {
        //get refresh token
        const refreshToken = await AuthRefreshTokenStorage.getItem(`${decoded.id}`) as string;
        if (!refreshToken) {
            return;
        };
        const decodedRefreshToken = jwtDecode(refreshToken) as JwtPayload;

        // Generate new access token
        const tokenPayload = { 
            email: decodedRefreshToken.email, 
            role: decodedRefreshToken.role, 
            id: decodedRefreshToken.id 
        };

        if (decodedRefreshToken && decodedRefreshToken.exp * 1000 > Date.now()) {
           try {
            const [token, refreshedToken] = await Promise.all([
                jwt.sign(tokenPayload, jwtSecret, { 
                    expiresIn: parseInt(import.meta.env.JWT_EXPIRES_IN)
                }),
                jwt.sign(tokenPayload, jwtSecret, { 
                    expiresIn: parseInt(import.meta.env.JWT_REFRESH_EXPIRES_IN)
                })
            ]);
            // Store tokens in Redis in parallel
            await Promise.all([
                // Store tokens in session instead (making each session identifiable using the user id)
                session.set(`user_${tokenPayload.id}`, token),
                AuthRefreshTokenStorage.setItem(`${tokenPayload.id}`, refreshedToken, {
                    ttl: parseInt(import.meta.env.JWT_REFRESH_EXPIRES_IN)
                })
            ]);
           } catch (error) {
            console.log(error);
           }
        }else{
            //destroy the entire session and redirect to login
            session.destroy();
            return redirect('auth/login');
        }
    };

    //if token isn't active, call the refresh token method.
    if(!tokenActive){
        await refreshUserToken();
    };


    try {

        const userQueryOptions = {
            where: { email: decoded.email },
            include: { user: { select: { role: true, verified: true } } }
        };

        const user = decoded.role.startsWith('fx-')
            ? await prisma.fxbidder.findFirst(userQueryOptions)
            : await prisma.contractor.findFirst(userQueryOptions);

        if (user) {
            //@ts-ignore
            locals.user = user as User;
            locals.isLoggedIn = true;
        } else {
            console.error("User not found for the given email:", decoded.email);
            return redirect('/forbidden', 301);
        }
    } catch (error) {
        console.error("JWT verification failed:", error);
        //return redirect('/forbidden', 301);
    }
    return next();
});