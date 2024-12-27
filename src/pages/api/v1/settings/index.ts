import { prisma } from "@/utilities/helpers/prismaInstace";
import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
    const user = await prisma.user.findMany({
        select: {
            id: true,
            email: true,
            role: true
        }
    });
    const settings = await prisma.settings.findMany();
    const data = { user, settings };

    if (!data) {
        throw new Error("An error occured!");
    }
    return new Response(JSON.stringify({ data }));
};

export const POST: APIRoute = async ({request}) => {
    const data = await request.json();

    try {
        if (!data.role) {
            await prisma.settings.update({
                where: {
                    id: data.payload.id
                },
                data: {
                    appName: data.payload.appName,
                    appLogo: data.appLogo ? data.appLogo : data.payload.appLogo,
                    appUrl: data.payload.appUrl,
                    smtpHost: data.payload.smtpHost,
                    smtpPort: data.payload.smtpPort,
                    smtpUser: data.payload.smtpUser,
                    smtpPassword: data.payload.smtpPassword,
                }
            });
        } else {
            await prisma.user.update({
                where: {
                    id: data.user.id,
                },
                data: {
                    role: data.role
                }
            });
        }
        return new Response(JSON.stringify({ message: 'Settings updated' }), { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({message: 'An error occured'}), {status: 400})
    }
} 