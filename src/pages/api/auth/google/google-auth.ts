import { oauth2Client } from "@/utilities/helpers/oauth2Client";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({redirect, request}) => {
    request.headers.set('Access-Control-Allow-Origin', '*')
    request.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    request.headers.set('Access-Control-Allow-Headers', 'Content-Type')

    const scopes = ['email', 'profile'];

    const url = oauth2Client.generateAuthUrl({
        // 'online' (default) or 'offline' (gets refresh_token)
        access_type: 'offline',
        scope: scopes
    });
    
    return redirect(url);
}