import jwt, { type JwtPayload } from 'jsonwebtoken';
import { defineMiddleware } from "astro:middleware";

/**
 * Middleware to validate protected API endpoints using a JWT token
 * passed in the 'x-pol-rfx-secret' header.
 * - If the token is missing or invalid, returns a 401/403 response.
 * - If the token is valid but lacks 'access' permission, redirects to /forbidden.
 * - Otherwise, allows the request to proceed.
 */
export const validateEndpoints = defineMiddleware(async ({ request, redirect }, next) => {
    // Retrieve the secret token from the request headers
    const X_POL_RFX_SECRET = request.headers.get('x-pol-rfx-secret');

    try {
        // Verify the JWT token using the server's secret
        const { access } = jwt.verify(
            X_POL_RFX_SECRET,
            process.env.X_POL_RFX_TOKEN
        ) as JwtPayload;

        // If the token does not grant access, redirect to forbidden page
        if (!access) {
            return redirect('/forbidden');
        }
    } catch (error) {
        // Determine the error message and status code
        const message =
            error.message === "Forbidden"
                ? "Forbidden"
                : "Access to this resource is forbidden without proper authorization";
        const status = error.message === "Forbidden" ? 403 : 401;

        // Respond with a JSON error message and appropriate status code
        return new Response(JSON.stringify(message), {
            status,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    // If validation passes, continue to the next middleware or endpoint
    return next();
});