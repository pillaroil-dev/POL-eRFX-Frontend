import { prisma } from "@/utilities/helpers/prismaInstace";
import type { APIRoute } from "astro";


export const GET: APIRoute = async ({ request }) => {

    const tenderId = new URL(request.url).searchParams.get('tender');
    try {
        const tender = await prisma.tender.findUnique({
            where: {
                id: Number(tenderId)
            },
            include: {
                items: true,
                files: true,
                recipients: true
            }
        });
        if (tender) {
            return new Response(JSON.stringify({ tender }), { status: 200 })
        }
    } catch (error) {
        return new Response(JSON.stringify({ tender: null }), { status: 400 })
    }

}


// export const POST: APIRoute = async ({ request }) => {
//     const data = await request.json();
//     const payload = {
//         companyName: data.companyName,
//         email: data.email,
//         homePhone: data.homePhone,
//         businessPhone: data.businessPhone,
//     }
//     try {
//         const updatedVendor = await prisma.contractor.update({
//             where: {
//                 id: Number(data.id)
//             },
//             data: payload
//         });
//         if (updatedVendor) {
//             return new Response(JSON.stringify({ message: 'Vendor updated' }), { status: 200 })
//         } else {
//             return new Response(JSON.stringify({ message: 'Vendor update failed' }), { status: 400 })
//         }
//     } catch (error) {
//         console.log(error)
//         return new Response(JSON.stringify({ message: 'An error occured' }), { status: 400 })
//     }
// }

