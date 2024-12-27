import { defineMiddleware } from "astro:middleware";
import { PUBLIC_ROUTE } from "../constants/index";

let redirected = false;

export const checkUser = defineMiddleware(async ({ request, locals, redirect }, next) => {
    const currentPath = new URL(request.url).pathname;
    //@ts-ignore
    const loggedIn = locals.isLoggedIn;
    //@ts-ignore
    const role = locals.user?.user?.role;

    if (PUBLIC_ROUTE.includes(currentPath)) {
        if ( !role && !redirected) {
            redirected = true;
            return redirect(`/auth/login`);
        }
        return next();
    }

    // if (!loggedIn || !role || !redirected) {
    //     //redirect user if not logged in
    //     redirected = true;
    //     return redirect(`/auth/login`);
    // }
    
    if (loggedIn && role) {
        if (!redirected) {
            redirected = true;
            return redirect(`/u/${role}`);
        }
    }

    return next();
})