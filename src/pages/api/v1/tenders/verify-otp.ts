import { prisma } from "@/utilities/helpers/prismaInstace";
import type { APIRoute } from "astro";
import { promise } from "astro:schema";

export const POST: APIRoute = async ({ request }) => {
    const data = await request.json();
    const tenderId = data.tenderId;
    const newEndDate = data.newEndDate;

    async function updateTenderAndBid() {
        try {
            await prisma.$transaction(async (tx) => {
                // Update the tender
                await tx.tender.update({
                    where: { id: tenderId },
                    data: {
                        endDate: new Date(newEndDate),
                        status: "open",
                    },
                });
                await tx.bid.updateMany({
                    where: { tenderId: tenderId },
                    data: { status: 'open' }
                });
            });
            return true;
        } catch (error) {
            console.error(error)
            return false;
        }
    }

    try {

        const updatedTender = await updateTenderAndBid();
        if (updatedTender) {
            return new Response(JSON.stringify({ message: 'Tender updated successfully' }), { status: 200 });
        } else {
            return new Response(JSON.stringify({ message: 'Failed to update tender' }), { status: 400 });
        }
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ message: 'An error occurred' }), { status: 500 });
    }
}
