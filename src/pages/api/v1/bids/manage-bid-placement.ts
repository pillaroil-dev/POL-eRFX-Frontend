import { BID_ACCEPTANCE_HTML, BID_REJECTION_HTML } from "@/constants/notifications/email";
import { transporter } from "@/utilities/helpers/emailTransporter";
import { prisma } from "@/utilities/helpers/prismaInstace";
import type { APIRoute } from "astro";


export const GET: APIRoute = async ({ request }) => {

    const bidId = new URL(request.url).searchParams.get('bid');
    const id = Number(bidId);
    try {
        const bid = await prisma.bidPlacement.findUnique({
            where: {
                id: id
            },
            include: {
                tender: true,
                contractor: true,
                files: true
            }
        });
        if (bid) {
            return new Response(JSON.stringify({ bid }), { status: 200 })
        }
    } catch (error) {
        return new Response(JSON.stringify({ tender: null }), { status: 400 })
    }

}


export const POST: APIRoute = async ({request}) => {
    const res = await request.json();

    try {
        switch (res?.action) {
            case 'accept':
                await prisma.bidPlacement.update({
                    where: {
                        id: res?.id,
                    },
                    data: {
                        status: 'accepted'
                    }
                });
                //send acceptance email
                await transporter.sendMail({
                    from: `"POL eRFX" <${import.meta.env.MAIL_USERNAME}>`,
                    to: res.email,
                    subject: import.meta.env.BID_EMAIL_SUBJECT,
                    html: BID_ACCEPTANCE_HTML(res.companyName, res.title),
                });

                break;
            case 'reject':
                await prisma.bidPlacement.update({
                    where: {
                        id: res?.id,
                    },
                    data: {
                        status: 'rejected'
                    }
                });
                //send rejection email
                await transporter.sendMail({
                    from: `"POL eRFX" <${import.meta.env.MAIL_USERNAME}>`,
                    to: res.email,
                    subject: import.meta.env.BID_EMAIL_SUBJECT,
                    html: BID_REJECTION_HTML(res.companyName, res.title),
                });
                break;
            default:
                break;
        }
        return new Response(JSON.stringify({message: `Operation Successful. ${res.action === 'accept' ? 'Accepted.' : 'Rejected.'}`}), {status: 200})
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ message: 'Operation Failed' }), { status: 400 })
    }
}