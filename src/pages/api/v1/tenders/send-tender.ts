import { ADD_TENDER_HTML } from "@/constants/notifications/email";
import { transporter } from "@/utilities/helpers/emailTransporter";
import { prisma } from "@/utilities/helpers/prismaInstace";
import type { APIRoute } from "astro";


export const POST: APIRoute = async ({ request }) => {

    const result = await request.json();

    try {
        const response = await prisma.bid.createMany({
            data: Array.isArray(result.recipientsWithDetails) ? result.recipientsWithDetails.map(recipient => ({
                status: result.tender.status,
                contractorId: recipient.id,
                tenderId: result.tender.id,
                submissionDate: new Date()
            })) : [{
                status: result.tender.status,
                contractorId: result.recipientsWithDetails.flatMap(recipient => recipient.id)[0],
                tenderId: result.tender.id,
                submissionDate: new Date()
            }],
            skipDuplicates: true,
            
        });
    
        const tenderId = Array.isArray(result.tender) ? result.tender[0].id : result.tender.id;

        if (response?.count > 0) {
            // Update the tender status to "sent"
            const tenderUpdated = await prisma.tender.update({
                where: { id: tenderId },
                data: { status: "sent", startDate: new Date() },
                include: {
                    bids: true
                }
            });


            if (tenderUpdated?.status === "sent") {

                const sentTender = await prisma.bid.findFirst({
                    where: {
                        tenderId: tenderId
                    }
                });

                if (sentTender?.id) {
                    // Function to send email to all recipients
                    const sendEmailToRecipients = async (recipients) => {
                        for (const recipient of recipients) {
                            // using the mail transporter and html email template
                            try {
                                await transporter.sendMail({
                                    from: `"POL eRFX" <${process.env.MAIL_USERNAME}>`,
                                    to: recipient.email,
                                    subject: "New Tender Alert",
                                    html: ADD_TENDER_HTML(recipient.companyName, sentTender.id),
                                });
                            } catch (error) {
                                console.log(error)
                            }
                        }
                    };
                    // Send email to all recipients
                    await sendEmailToRecipients(result.recipientsWithDetails);
                }
                
                return new Response(JSON.stringify({ message: "Tender sent successfully!" }), { status: 200 })
            };
        }
        else {
            return new Response(JSON.stringify({ message: "Tender sending failed!" }), { status: 400 })
        }
    } catch (error) {
        console.log({error})
        return new Response(JSON.stringify({ message: "Oops! An error occured!" }), { status: 400 })
    }

}