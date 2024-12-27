import { prisma } from "@/utilities/helpers/prismaInstace";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({request }) => {
    const id = Number(new URL(request.url).searchParams.get('id'));

    const data = await prisma.bid.findMany({
        where: { contractorId: id },
        include: {
            tender: {
                include: {
                    BidPlacement: {
                        where: {
                         contractorId: id
                        },
                        include: {
                            files: true
                        }
                    }
            }
        },}
    })

    if (data) {
        return new Response(JSON.stringify({data}), {status: 200});
    } else {
        return new Response(JSON.stringify({ message: "An error occured" }), { status: 400 });
    }
}