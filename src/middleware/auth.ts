import { prisma } from "@/utilities/helpers/prismaInstace";
import { defineMiddleware } from "astro:middleware";
import jwt, { type JwtPayload } from "jsonwebtoken";

export const auth = defineMiddleware(async ({ cookies, locals, request, redirect }, next) => {
    const token = cookies.get(import.meta.env.COOKIE_NAME)?.value;
    if (!token) {
        return next();
    };
    const secret = process.env.JWT_SECRET;

    let x_pol_rfx_secret = process.env.X_POL_RFX_SECRET;
    request.headers.set("x-pol-rfx-secret", `${x_pol_rfx_secret}`);

    try {
        const decoded = jwt.verify(token, secret) as JwtPayload;

        const userQueryOptions = {
            where: { email: decoded.email },
            include: { user: { select: { role: true, verified: true } } }
        };

        let user;
        switch (decoded.role) {
            case 'fx-admin':
            case 'fx-operator':
            case 'fx-user':
                user = await prisma.fxbidder.findFirst(userQueryOptions);
                break;
            case "admin":
            case "operator":
            case "user":
                user = await prisma.contractor.findFirst(userQueryOptions);
                break;
            default:
                break;
        };

        if (user) {
            //@ts-ignore
            locals.user = user as User;
            locals.isLoggedIn = true;
        }
    } catch (error) {
        console.error("JWT verification failed:", error);
        return redirect('/forbidden', 301);
    }
    return next();
});