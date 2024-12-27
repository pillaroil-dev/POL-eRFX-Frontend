import { prisma } from "@/utilities/helpers/prismaInstace";
import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
    const response = await prisma.fx.findMany();
    const data = response;
    return new Response(JSON.stringify({data}))
}