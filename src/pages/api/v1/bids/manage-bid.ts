import { prisma } from "@/utilities/helpers/prismaInstace";
import type { APIRoute } from "astro";


export const GET: APIRoute = async ({ request }) => {

    const bidId = new URL(request.url).searchParams.get('bidId');
    const id = Number(bidId);
    try {
        const bid = await prisma.bid.findUnique({
            where: {
                id: id
            },
            include: {
                contractor: true,
                tender: {
                    include: {
                        files: true,
                        items: true,
                        BidPlacement: {
                            include: {
                                files: true
                            }
                        }
                    }
                },
            }
        });
        if (bid) {
            return new Response(JSON.stringify({ bid }), { status: 200 })
        }
    } catch (error) {
        return new Response(JSON.stringify({ tender: null }), { status: 400 })
    }

}
