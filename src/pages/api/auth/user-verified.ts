import type { APIRoute } from "astro";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { GetTokenByCookieName } from "@/utilities/helpers/redisStorage";

const prisma = new PrismaClient();
interface JwtPayload {
    email: string;
}

let email: string;


// update the user status upon email confirmation
export const POST: APIRoute = async ({ cookies, redirect, request, session }) => {
    let x_pol_rfx_secret = process.env.X_POL_RFX_SECRET;
    request.headers.set("x-pol-rfx-secret", `${x_pol_rfx_secret}`);

    const sessionCookie = await cookies.get(import.meta.env.SESSION_NAME)?.value;

    if (!sessionCookie) {
        return new Response("No session cookie found", { status: 400 });
    }

    const tokenData = await GetTokenByCookieName.get(sessionCookie);
    const token = tokenData[3];

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET || process.env.JWT_SECRET_OLD) as JwtPayload;
        email = decodedToken.email;
    } catch (error) {
        console.error("Error decoding email:", error);
        return new Response("Error decoding email", { status: 400 });
    }

    const user = await prisma.user.update({
        where: {
            email: email,
        },
        data: {
            verified: true,
        }
    });
    if (user.verified) {
        cookies.delete("otp", {path: "/"})
        return redirect("/auth/onboarding")
    }
    return new Response(JSON.stringify(user.verified));
}

