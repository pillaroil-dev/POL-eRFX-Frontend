import { NEW_BID_NOTIFICATION_HTML } from "@/constants/notifications/email";
import { transporter } from "@/utilities/helpers/emailTransporter";
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
        //send email alert to admin/operator
        const dateAndTime = new Date().toLocaleString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        }).replace(',', ' |');

        await transporter.sendMail({
            from: `"POL eRFX" <${process.env.MAIL_USERNAME}>`,
            subject: "New Bid Placement Alert",
            to: import.meta.env.ADMIN_EMAIL,
            html: NEW_BID_NOTIFICATION_HTML(bidData.contractor.companyName, bidData.tenderId, bidData.tender.title, dateAndTime)
        });

        return new Response(JSON.stringify({ message: "Bid placed succesfully" }), { status: 200 });
    } else {
        return new Response(JSON.stringify({ message: "An error occured" }), { status: 400 });
    }
}

export const GET: APIRoute = async ({request}) => {
    const tenderId = new URL(request.url).searchParams.get('tender');
    const id = Number(tenderId)

    try {
        if (tenderId) {
            const res = await prisma.bidPlacement.findMany({
                where: {
                    tenderId: id,
                },
                include: {
                    files: true,
                    contractor: true,
                    tender: true
                }
            });
            return new Response(JSON.stringify({ data: res }), { status: 200 })
        } else {
            const res = await prisma.bidPlacement.findMany({
                include: {
                    files: true,
                    contractor: true,
                    tender: true
                }
            });
            return new Response(JSON.stringify({ data: res }), { status: 200 })
        }
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify(null), { status: 400 });
    }
}