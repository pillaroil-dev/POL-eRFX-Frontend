import { prisma } from "@/utilities/helpers/prismaInstace";
import { encryptDocumentPassword } from "@/utilities/helpers/verifyUser";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
    const data = await request.json();
    const { documentPassword, files, data: bidData } = data;

    const filesData = JSON.parse(files);

    const res = await prisma.bidPlacement.create({
        data: {
            documentPassword: encryptDocumentPassword(documentPassword),
            files: {
                create: filesData.map((item) => ({
                    name: item.name,
                    size: item.size,
                    path: item.path
                }))
            },
            contractor: {
                connect: {
                    id: bidData.contractorId,
                }
            },
            tender: {
                connect: {
                    id: bidData.tenderId
                }
            }
        }
    });

    if (res.status === "placed") {
        return new Response(JSON.stringify({ message: "Bid placed succesfully" }), { status: 200 });
    } else {
        return new Response(JSON.stringify({ message: "An error occured" }), { status: 400 });
    }
}

export const GET: APIRoute = async () => {
    try {
        const res = await prisma.bidPlacement.findMany({
            include: {
                files: true,
                contractor: true,
                tender: true
            }
        });
        return new Response(JSON.stringify({ data: res }), { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify(null), { status: 400 });
    }
}