import { prisma } from '@/utilities/helpers/prismaInstace';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const tenders = await prisma.tender.findMany({
    include: {
      items: true,
      files: true,
      bids: true
    }
  });
  if (tenders) {
    return new Response(JSON.stringify(tenders), { status: 200 });
  } else {
    return new Response(JSON.stringify({message: 'Error fetching bids'}), { status: 400 });
  }
};
