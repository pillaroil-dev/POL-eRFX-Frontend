import { prisma } from "@/utilities/helpers/prismaInstace";
import type { APIRoute } from "astro";

export const POST: APIRoute = async (context) => {
    const data = await context.request.json();

    console.log({data})

    try {
        const fx = await prisma.fxbidder.create({
            data: {
                firstName: data?.firstName,
                lastName: data?.lastName,
                businessPhone: data?.businessPhone,
                email: data?.email,
            }
        });

        if (fx) {
            return new Response(JSON.stringify({ message: "Fx vendor added successfully." }), {
                status: 200
            });
        } else {
            return new Response(JSON.stringify({ message: "Fx vendor add failed." }), {
                status: 400,
            });
        }
    } catch (error) {
        console.log({ error })
        return new Response(JSON.stringify({ message: "An error occured. Try again." }), {
            status: 400,
        });
    }
}