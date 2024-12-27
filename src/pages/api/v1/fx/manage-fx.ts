import { prisma } from "@/utilities/helpers/prismaInstace";
import type { APIRoute } from "astro";


export const GET: APIRoute = async ({ request }) => {
    const fxId = new URL(request.url).searchParams.get('fx');

    try {
        const fx = await prisma.fx.findUnique({
            where: {
                id: Number(fxId)
            },
            include: {
                FxRecipients: {
                    select: {
                        fxBidder: {
                            select: {
                                id: true,
                                firstName: true,
                                lastName: true,
                            }
                        }
                    }
                }
            }
        });
        if (fx) {
            return new Response(JSON.stringify({ fx }), { status: 200 })
        }
    } catch (error) {
        return new Response(JSON.stringify({ tender: null }), { status: 400 })
    }

}
