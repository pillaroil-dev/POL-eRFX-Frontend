import type { APIRoute } from 'astro';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const POST: APIRoute = async ({ request }) => {
    const data = await request.json();

    const title = data.title;
    const description = data.description;
    const location = data.location;
    const startDate = data.startDate;
    const endDate = data.endDate;
    const items = data.items;
    const files = data.files;
    const recipients = data.recipients;

    try {
        const tender = await prisma.tender.create({
            data: {
                title: title as string,
                description: description as string,
                location: location as string,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                status: 'pending',
                submissionDate: new Date(),
                items: {
                    create: items?.map((item) => ({
                        name: item.name,
                        quantity: Number(item.quantity),
                        unit: item.unit,
                    })),
                },
                files: {
                    create: files?.map((item) => ({
                        name: item.name,
                        path: item.path,
                        size: item.size
                    })),
                },
                recipients: {
                    create: recipients?.map(({ contractorId }) => ({
                        contractorId: contractorId,
                    }))
                }
            },
        });

        if (tender) {
            return new Response(JSON.stringify({ message: "Tender added successfully." }), {
                status: 200
            });
        } else {
            return new Response(JSON.stringify({ message: "An error occured. Try again." }), {
                status: 404,
            });
        }
    } catch (error) {
        console.log({ error })
        return new Response(JSON.stringify({ message: "Operation failed. Try again." }), {
            status: 404,
        });
    }
}
