import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ redirect, cookies, request, session }) => {
    let x_pol_rfx_secret = process.env.X_POL_RFX_SECRET;
    request.headers.set("x-pol-rfx-secret", `${x_pol_rfx_secret}`);
    session.destroy();
    cookies.delete(process.env.SESSION_NAME, { path: "/" });

    //Delete if it ever exists for "Operators"
    cookies.delete("otp-verified", { path: '/' });
    return redirect('/auth/login');
}