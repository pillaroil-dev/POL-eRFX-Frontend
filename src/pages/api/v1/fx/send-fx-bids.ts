import { ADD_TENDER_HTML } from "@/constants/notifications/email";
import { transporter } from "@/utilities/helpers/emailTransporter";
import { prisma } from "@/utilities/helpers/prismaInstace";
import type { APIRoute } from "astro";


export const POST: APIRoute = async ({ request }) => {

    const {fx: result} = await request.json();
    const fxBidId = Array.isArray(result) ? result[0].id : result.id;

    try {
        const response = await prisma.fxBid.createMany({
            data: Array.isArray(result?.FxRecipients) ? result?.FxRecipients?.map(item => ({
                status: result?.status,
                amount: result?.amount,
                fxId: result?.id,
                bidderId: item?.fxBidder?.id || null,
            })) : [{
                status: result?.status,
                amount: result?.amount,
                fxId: result?.id,
                bidderId: result?.FxRecipients?.fxBidder?.id || null
            }],
            skipDuplicates: true,
        });

        if (response) {
        const fxUpdated = await prisma.fx.update({
            where: { id: result?.id },
            data: { status: "sent" },
        });
            if (fxUpdated?.status === "sent") {
                // const sentFx = await prisma.fxBid.findFirst({
                //     where: {
                //         fxId: fxBidId
                //     },
                //     include: {
                //         bidder: true
                //     }
                // });
                // console.log({ sentFx })

                // if (sentFx.id) {
                //     // Function to send email to all recipients
                //     const sendEmailToRecipients = async (recipients) => {
                //         for (const recipient of recipients) {
                //             // using the mail transporter and html email template
                //             try {
                //                 await transporter.sendMail({
                //                     from: `"POL eRFX" <${process.env.MAIL_USERNAME}>`,
                //                     to: recipient.email,
                //                     subject: "New FX Alert",
                //                     html: ADD_TENDER_HTML(recipient.companyName, sentFx.id),
                //                 });
                //             } catch (error) {
                //                 console.log(error)
                //             }
                //         }
                //     };
                //     // Send email to all recipients
                //     await sendEmailToRecipients(result);
                // }
                return new Response(JSON.stringify({ message: "Fx sent successfully!" }), { status: 200 });
            }
            else {
            return new Response(JSON.stringify({ message: "Failed to update Fx status!" }), { status: 400 });
        }
        }
    } catch (error) {
        console.log({ error })
        return new Response(JSON.stringify({ message: "Oops! An error occured!" }), { status: 400 })
    }
}