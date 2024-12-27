import { prisma } from "@/utilities/helpers/prismaInstace";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({request, params}) => {
    const fxBidId = new URL(request.url).searchParams.get('bid');

    try {
        const data = await prisma.fxBidPlacement.findMany({
            where: { id: { equals: Number(fxBidId) }},
            include: {
                fxBid: {
                    include: {fx: true}
                },
                bidder: true
            }
        });

        return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify("An error occured"), { status: 400 });
    }
}

export const POST: APIRoute = async ({request}) => {
    const data = await request.json();
    try {
        const res = prisma.fxBidPlacement.update({
            where: {
                id: data?.id,
            },
            data: {
                status: data?.approval
            }
        })

        const response = await res;
        return new Response(JSON.stringify(response), { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify(null), { status: 400 })
    }
}