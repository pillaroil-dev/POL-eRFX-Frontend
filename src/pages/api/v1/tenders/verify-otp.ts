import { prisma } from "@/utilities/helpers/prismaInstace";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
    const data = await request.json();
    const tenderId = data.tenderId;
    const newEndDate = data.newEndDate;

    try {
        
        const updatedTender = await prisma.tender.update({
            where: {
                id: tenderId,
            },
            data: {
                endDate: new Date(newEndDate),
                status: "open"
            },
        });

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
