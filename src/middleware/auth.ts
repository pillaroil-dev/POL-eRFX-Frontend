import { prisma } from "@/utilities/helpers/prismaInstace"; // Fixed typo in 'prismaInstace'
import { GetTokenByCookieName } from "@/utilities/helpers/redisStorage";
import { defineMiddleware } from "astro:middleware";
import jwt, { type JwtPayload } from "jsonwebtoken";

export const auth = defineMiddleware(async ({ cookies, locals, request, redirect }, next) => {
    const sessionCookie = cookies.get(import.meta.env.SESSION_NAME)?.value;
    if (!sessionCookie) {
        return next();
    }

    try {
        const tokenData = await GetTokenByCookieName.get(sessionCookie);
        const token = tokenData[3]; // based on stored data structure by astro session.
        const secret = process.env.JWT_SECRET;

        const x_pol_rfx_secret = process.env.X_POL_RFX_SECRET; 
        request.headers.set("x-pol-rfx-secret", x_pol_rfx_secret || ''); 

        if (!token) {
            console.error("Token is missing from token data.");
            return redirect('/forbidden', 301);
        }

        const decoded = jwt.verify(token, secret) as JwtPayload;
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
        return redirect('/forbidden', 301);
    }
    return next();
});