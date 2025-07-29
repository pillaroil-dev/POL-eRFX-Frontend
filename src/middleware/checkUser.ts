import { defineMiddleware } from "astro:middleware";
import { PUBLIC_ROUTE } from "../constants/index";

/**
 * Middleware to check user authentication and route access.
 * - Redirects unauthenticated users from protected "/u" routes to login.
 * - Redirects logged-in users away from login/signup to their dashboard.
 * - Allows public routes to be accessed freely.
 */
export const checkUser = defineMiddleware(async ({ request, locals, session, redirect }, next) => {
    // Normalize the current path (removes trailing slashes)
    const currentPath = new URL(request.url).pathname.replace(/\/+$/, '');

    // Get authentication and user info from locals
    const loggedIn = locals?.isLoggedIn;
    const role = locals?.user?.user?.role;
    const userId = locals?.user?.userId;

    // Check if the current route is public
    const isPublicRoute = PUBLIC_ROUTE.includes(currentPath);

    // Check if the user has an active session
    const activeSession = await session.get(`user_${userId}`);

    // Check if the route is a protected user route (e.g., /u/...)
    const isUserRoute = currentPath.startsWith('/u');

    // If accessing a protected user route without an active session, redirect to login
    if (isUserRoute && !activeSession) {
        return redirect("/auth/login");
    }

    // If accessing a public route and already logged in, redirect away from login/signup to dashboard
    if (isPublicRoute && loggedIn && role) {
        if (currentPath === "/auth/login" || currentPath === "/auth/signup") {
            return redirect(`/u/${role}`);
        }
        // Allow access to other public routes if logged in
        return next();
    }

    // Default: allow the request to proceed
    return next();
});