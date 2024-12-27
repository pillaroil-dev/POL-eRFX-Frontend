import jwt, { type JwtPayload } from 'jsonwebtoken';
import { defineMiddleware } from "astro:middleware";
import { PROTECTED_ROUTE } from "../constants/index";

export const validateEndpoints = defineMiddleware(async ({ request, redirect}, next) => {
    const currentPath = new URL(request.url).pathname.replace(/\/+$/, '');
    const X_POL_RFX_SECRET = request.headers.get('x-pol-rfx-secret');

    try {
        if (PROTECTED_ROUTE.includes(currentPath)) {
            const { access } = jwt.verify(X_POL_RFX_SECRET, process.env.X_POL_RFX_TOKEN) as JwtPayload;

            if (!access) {
                return redirect('/forbidden');
            }
        }
    } catch (error) {
        const message = error.message === "Forbidden" ? "Forbidden" : 
        "Access to this resource is forbidden without proper authorization";
        const status = error.message === "Forbidden" ? 403 : 401;
        return new Response(JSON.stringify(message), {
            status,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    return next();
});