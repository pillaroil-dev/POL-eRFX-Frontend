import  bcrypt  from 'bcryptjs';
import { oauth2Client } from "@/utilities/helpers/oauth2Client";
import type { APIRoute } from "astro";
import { google } from "googleapis";
import { PrismaClient } from "@prisma/client";
import { generateJWT } from '@/utilities/helpers/generateJWT';

const prisma = new PrismaClient();
// Generate a salt for hashing passwords
const salt = bcrypt.genSaltSync(10);

export const GET: APIRoute = async ({request, cookies, redirect}) => {
    const code = new URLSearchParams(request.url.split('?')[1]).get('code');
    
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2({
        version: 'v2',
        auth: oauth2Client
    });

    const { data } = await oauth2.userinfo.get();
    if (data?.email) {
        const user = await prisma.user.findFirst({
            where: {
                email: data?.email,
            }
        });

        if (user?.verified) {
            generateJWT({ email: data?.email, cookies });
            return redirect("/u");
        } else {
            //create the user as a new user with a generated password
            const generatedPassword = Math.random().toString(36).slice(-8);
            const password = bcrypt.hashSync(generatedPassword, salt);
            // Create a new user in the database
            const user = await prisma.user.create({
                data: {
                    email: data?.email as string,
                    password: password as string,
                    verified: true,
                    // Also create a related Contractor/Vendor entry
                    Contractor: {
                        create: {
                            email: data?.email as string,
                            companyName: `${data?.given_name + " " + data?.family_name}`,
                            avatarUrl: data?.picture
                        }
                    }
                },
            });

            if (user?.email && user.verified) {
                generateJWT({ email: user?.email, cookies });
                return redirect("/u")
            }

        }
    }

    return redirect("/auth/login")
}