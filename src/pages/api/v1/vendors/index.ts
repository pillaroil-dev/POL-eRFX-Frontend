import type { APIRoute } from 'astro';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const GET: APIRoute = async ({ params, request }) => {
 try {
   const vendors = await prisma.contractor.findMany({
     include: { user: true },
   });
   return new Response(JSON.stringify(vendors), { status: 200 });
 } catch (error) {
    console.log(error)
    return new Response(null, {status: 200})
 }
};
