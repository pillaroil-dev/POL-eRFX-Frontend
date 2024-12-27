import { prisma } from "@/utilities/helpers/prismaInstace";
import type { APIRoute } from "astro";


export const GET: APIRoute = async ({ request }) => {

    const vendorId = new URL(request.url).searchParams.get('vendor')

    try {
        const vendor = await prisma.fxbidder.findUnique({
            where: {
                id: Number(vendorId)
            },
            include: {
                user: true,
                FxBidPlacement: true,
                FxBid: true
            }
        });
        if (vendor) {
            return new Response(JSON.stringify({ vendor }), { status: 200 })
        }
    } catch (error) {
        return new Response(JSON.stringify({ vendor: null }), { status: 400 })
    }

}


export const POST: APIRoute = async ({ request }) => {
    const data = await request.json();
    const payload = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        businessPhone: data.businessPhone,
    }
    try {
        const updatedVendor = await prisma.fxbidder.update({
            where: {
                id: Number(data.id)
            },
            data: payload
        });
        if (updatedVendor) {
            return new Response(JSON.stringify({ message: 'Vendor updated' }), { status: 200 })
        } else {
            return new Response(JSON.stringify({ message: 'Vendor update failed' }), { status: 400 })
        }
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ message: 'An error occured' }), { status: 400 })
    }
}

