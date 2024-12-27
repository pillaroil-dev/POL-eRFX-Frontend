import type { APIRoute } from 'astro';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const GET: APIRoute = async () => {
    try {
        const fxBidders = await prisma.fxbidder.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        role: true,
                        verified: true

            }} },
        });
        return new Response(JSON.stringify(fxBidders), { status: 200 });
    } catch (error) {
        console.log(error)
        return new Response(null, { status: 200 })
    }
};
