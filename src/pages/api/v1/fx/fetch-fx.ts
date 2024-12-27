import { prisma } from "@/utilities/helpers/prismaInstace";
import type { APIRoute } from "astro";

export const GET: APIRoute = async (context) => {
    const userId = new URL(context.request.url).searchParams.get('userId');

    try {
        const data = await prisma.fxBid.findMany({
            where: {
                bidderId: Number(userId),
            },
            include: {
                bidder: true,
                fx: true,
                FxBidPlacement: true,
            }
        });
        console.log(data)
        return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify("An error occured"), { status: 400 });
    }
}