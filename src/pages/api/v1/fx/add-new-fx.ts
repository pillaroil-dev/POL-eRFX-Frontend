import { prisma } from "@/utilities/helpers/prismaInstace";
import type { APIRoute } from "astro";

export const POST: APIRoute = async (context) => {
    const data = await context.request.json();
    
    try {
        const fx = await prisma.fx.create({
            data: {
                title: data?.title,
                currency: data?.currency,
                amount: data?.amount,
                startTime: new Date(data?.startTime),
                endTime: new Date(data?.endTime),
                status: "pending",
                note: data?.note,
                submissionDate: new Date(),
                FxRecipients: {
                    create: data?.recipients?.map(({ fxBidder }) => ({
                        fxBidder: {
                            connect: { id: fxBidder }
                        }
                    }))
                },
            }
        });

        if (fx) {
            return new Response(JSON.stringify({ message: "Fx added successfully." }), {
                status: 200
            });
        } else {
            return new Response(JSON.stringify({ message: "Fx add failed." }), {
                status: 400,
            });
        }
    } catch (error) {
        console.log({error})
        return new Response(JSON.stringify({ message: "An error occured. Try again." }), {
            status: 400,
        });
    }
}