import { google } from "googleapis";

export const oauth2Client = new google.auth.OAuth2(
    import.meta.env.OAUTH_CLIENT_ID,
    import.meta.env.OAUTH_CLIENT_SECRET,
    import.meta.env.REDIRECT_URL
);