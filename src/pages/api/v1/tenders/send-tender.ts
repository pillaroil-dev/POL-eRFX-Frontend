import { ADD_TENDER_HTML } from "@/constants/notifications/email";
import { transporter } from "@/utilities/helpers/emailTransporter";
import { prisma } from "@/utilities/helpers/prismaInstace";
import type { APIRoute } from "astro";

/**
 * API endpoint to send a tender to contractors
 */
export const POST: APIRoute = async ({ request }) => {
    const result = await request.json();
    try {
        // First, get all contractors and their members
        const contractorsWithMembers = await Promise.all(
            result.recipientsWithDetails.map(async (recipient) => {
                const contractor = await prisma.contractor.findUnique({
                    where: { id: recipient.id },
                    include: {
                        members: true
                    }
                });
                return {
                    ...recipient,
                    members: contractor?.members || []
                };
            })
        );

        // Create bids for contractors
        const response = await prisma.bid.createMany({
            data: Array.isArray(result.recipientsWithDetails) ? result.recipientsWithDetails.map(recipient => ({
                status:  "open", //result.tender.status,  //contraint: tender status changes to open when sent, so this should be open instead of sent/pending
                contractorId: recipient.id,
                tenderId: result.tender.id,
                submissionDate: new Date()
            })) : [{
                status:  "open", //result.tender.status,  //contraint: tender status changes to open when sent, so this should be open instead of sent/pending
                contractorId: result.recipientsWithDetails.flatMap(recipient => recipient.id)[0],
                tenderId: result.tender.id,
                submissionDate: new Date()
            }],
            skipDuplicates: true,
        });
    
        const tenderId = Array.isArray(result.tender) ? result.tender[0].id : result.tender.id;

        if (response?.count > 0) {
            /**
             * Change the default status to open instead of sent because tenders are rather open when sent.
             */
            const tenderUpdated = await prisma.tender.update({
                where: { id: tenderId },
                data: { status: "open", startDate: new Date() },
                include: {
                    bids: true
                }
            });


            if (tenderUpdated?.status === "open") {

                const sentTender = await prisma.bid.findFirst({
                    where: {
                        tenderId: tenderId
                    }
                });

                if (sentTender?.id) {
                    // Function to send email to all recipients and their members
                    const sendEmailToRecipients = async (recipients) => {
                        for (const recipient of recipients) {
                            // Send to contractor
                            try {
                                await transporter.sendMail({
                                    from: `"POL eRFX" <${process.env.MAIL_USERNAME}>`,
                                    to: recipient.email,
                                    subject: "New Tender Alert",
                                    html: ADD_TENDER_HTML(recipient.companyName, sentTender.id),
                                });

                                // Send to contractor members
                                const contractor = contractorsWithMembers.find(c => c.id === recipient.id);
                                if (contractor?.members?.length > 0) {
                                    for (const member of contractor.members) {
                                        await transporter.sendMail({
                                            from: `"POL eRFX" <${process.env.MAIL_USERNAME}>`,
                                            to: member.email,
                                            subject: "New Tender Alert",
                                            html: ADD_TENDER_HTML(`${member.fullname} (${recipient.companyName} Member)`, sentTender.id),
                                        });
                                    }
                                }
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