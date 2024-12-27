import bcrypt from 'bcryptjs';
import { prisma } from "@/utilities/helpers/prismaInstace";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request, redirect }) => {
    let x_pol_rfx_secret = process.env.X_POL_RFX_SECRET;
    request.headers.set("x-pol-rfx-secret", `${x_pol_rfx_secret}`);
    
    const data = await request.formData();

    const token = JSON.parse(atob(data.get('token') as string));
    const password = data.get('password');
    const confirmPassword = data.get('confirm-password');

    if (!password || !confirmPassword || password !== confirmPassword) {
        return new Response("Passwords do not match or are missing", { status: 400 });
    }

    const userEmail = token.email;
    if (!userEmail) {
        return new Response("Invalid token", { status: 400 });
    }

    const user = await prisma.user.findUnique({
        where: {
            email: userEmail,
        },
    });

    if (!user) {
        return new Response("User not found", { status: 404 });
    } else {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password as string, salt);

    await prisma.user.update({
        where: {
            email: userEmail,
        },
        data: {
            password: hashedPassword,
            verified: true
        },
    });
    }

    return redirect('/auth/login');
}