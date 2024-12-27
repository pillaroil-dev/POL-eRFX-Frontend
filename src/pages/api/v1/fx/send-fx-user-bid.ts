import { prisma } from "@/utilities/helpers/prismaInstace";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({request}) => {

    const data = await request.json();

    try {
        const res = await prisma.fxBidPlacement.create({
            data: {
                status: "placed",
                amount: data?.fxBidAmount,
                fxBid: {
                    connect: {
                        id: data?.id
                    }
                },
                bidder: {
                    connect: {
                        id: data?.bidderId
                    }
                }
            }
        });
        return new Response(JSON.stringify({ data: res, message: "Fx Bid Placed Successfully"}), {status: 200})
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ data: null, message: "Fx Bid Placement Failed" }), {status: 400})
    }
}



