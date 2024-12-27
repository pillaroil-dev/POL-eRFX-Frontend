//This endpoint will be a cron job to be run once a day!
import { prisma } from "@/utilities/helpers/prismaInstace";
import type { APIRoute } from "astro";


export const GET: APIRoute = async () => {
    console.log("Cron started: ", new Date())

    const currentDate = new Date();

    const checkOpenFx = async () => {
        //Ths method check for the each fx to see where the status are pending - once the start date is less than the current date. it changes the status to open
        const fx = await prisma.fx.findMany({
            where: {
                startTime: { lte: currentDate.toISOString() },
                OR: [
                    { status: 'pending' },
                    { status: 'sent' }
                ]
            },
        });
        return fx
    }
    const checkClosedFx = async () => {
        //Ths method check for the each tender to see where the status are open - once the end date is less than the current date. it changes the status to closed
        const fx = await prisma.fx.findMany({
            where: {
                endTime: { lt: currentDate.toISOString() },
                status: 'open'
            },
        });
        return fx
    }

    const fxToOpen = await checkOpenFx();
    const fxToClose = await checkClosedFx();


    try {
        if (fxToOpen.length > 0) {
            await Promise.all(
                fxToOpen.map(async (fx) => {
                    await prisma.fx.update({
                        where: { id: fx.id },
                        data: { status: "open" },
                    });

                    // Corrected updateMany for bids
                    await prisma.fxBid.updateMany({
                        where: {
                            fxId: fx.id,
                            status: {
                                not: "closed"
                            }
                        },
                        data: { status: "open" },
                    });
                })
            );
            //you can trigger email sending here
        };

        if (fxToClose.length > 0) {
            await Promise.all(
                fxToClose.map(async (fx) => {
                    await prisma.fx.update({
                        where: { id: fx.id },
                        data: { status: "closed" },
                    });

                    await prisma.fxBid.updateMany({
                        where: { fxId: fx.id },
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