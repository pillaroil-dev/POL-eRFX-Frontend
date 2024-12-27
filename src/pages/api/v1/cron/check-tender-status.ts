//This endpoint will be a cron job to be run once a day!
import { prisma } from "@/utilities/helpers/prismaInstace";
import type { APIRoute } from "astro";


export const GET: APIRoute = async () => {
    console.log("Cron started: ", new Date())
    
    const currentDate = new Date();

    const checkTendersToOpen = async () => {
        //Ths method check for the each tender to see where the status are pending - once the start date is less than the current date. it changes the status to open
        const tenders = await prisma.tender.findMany({
            where: {
                startDate: { lte: currentDate.toISOString() },
                OR: [
                    // { status: 'pending' },
                    { status: 'sent' }
                ]
            },
        });
        return tenders
    }
    
    const checkTendersToClose = async () => {
        /* 
        This method checks if the status is open and if the endDate of the tender is equal
        to the current date with the time set to 16:00:00 (4 PM).
        once the end date is less than the current date. it changes 
        the status to closed. 
        */
        const tenders = await prisma.tender.findMany({
            where: {
                endDate: { lte: new Date(currentDate.setHours(16, 0, 0, 0)).toISOString() },
                status: 'open'
            },
        });
        return tenders
    }

    const tenderToOpen = await checkTendersToOpen();
    const tenderToClose = await checkTendersToClose();


    try {
        if (tenderToOpen.length > 0) {
            await Promise.all(
                tenderToOpen.map(async (tender) => {
                    await prisma.tender.update({
                        where: { id: tender.id },
                        data: { status: "open" },
                    });

                    // Corrected updateMany for bids
                    await prisma.bid.updateMany({
                        where: {
                            tenderId: tender.id,
                            status: {
                                not: "closed"
                            }
                        },
                        data: { status: "open" },
                    });
                })
            );
        };

        if (tenderToClose.length > 0) {
            await Promise.all(
                tenderToClose.map(async (tender) => {
                    await prisma.tender.update({
                        where: { id: tender.id },
                        data: { status: "closed" },
                    });

                    await prisma.bid.updateMany({
                        where: { tenderId: tender.id },
                        data: { status: "closed" },
                    });
                })
            );
        };

        return new Response(JSON.stringify("Operation successfull!"), { status: 200 });
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify("Operation failed!"), { status: 400 });
    }
}