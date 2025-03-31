import type { APIRoute } from "astro";
// import { ADD_ADMIN_EMAIL_NOTIFICATION } from "@/constants/notifications/email";
// import { transporter } from "@/utilities/helpers/emailTransporter";
// import { generateRandomPassword } from "@/utilities/helpers/generatePassword";
import { prisma } from "@/utilities/helpers/prismaInstace";

// import bcrypt from 'bcryptjs';

// // Generate a salt for hashing passwords
// const salt = bcrypt.genSaltSync(10);

export const GET: APIRoute = async () => {
    const user = await prisma.user.findMany({
        select: {
            id: true,
            email: true,
            role: true
        }
    });
    const settings = await prisma.settings.findMany();
    const data = { user, settings };

    if (!data) {
        throw new Error("An error occured!");
    }
    return new Response(JSON.stringify({ data }));
};

// export const POST: APIRoute = async ({request}) => {
//     const data = await request.json();
//     const {id, newAdminEmail, fullname, role, appName, appUrl, smtpUser, smtpHost, smtpPassword, smtpPort} = data.payload;

//     const generatedPassword = generateRandomPassword(8);
//     const password = bcrypt.hashSync(generatedPassword, salt);

//     try {
//         if (!newAdminEmail) {
//             await prisma.settings.update({
//                 where: {
//                     id: id
//                 },
//                 data: {
//                     appName: appName,
//                     appLogo: data.appLogo ? data.appLogo : data.payload.appLogo,
//                     appUrl: appUrl,
//                     smtpHost: smtpHost,
//                     smtpPort: smtpPort,
//                     smtpUser: smtpUser,
//                     smtpPassword: smtpPassword,
//                 }
//             });
//         } else {
//             await prisma.$transaction(async (tx) => {
//                 const user = await tx.user.create({
//                     data: {
//                         email: newAdminEmail,
//                         role: role,
//                         password: password
//                     }
//                 });

//                 if(user.id){
//                     //send email to the user based on their role
//                 // Send mail with defined transport object
//                     await transporter.sendMail({
//                         from: `${process.env.FROM_NAME} <${process.env.MAIL_USERNAME}>`, // Sender address
//                         to: newAdminEmail, // List of receivers
//                         subject: `You're now an ${role} on POL-eRFX`, // Subject line
//                         html: ADD_ADMIN_EMAIL_NOTIFICATION(role, fullname, password),
//                     });
//                 }
//                 await tx.settings.update({
//                     where: {
//                         id: id
//                     },
//                     data: {
//                         appName: appName,
//                         appLogo: data.appLogo ? data.appLogo : data.payload.appLogo,
//                         appUrl: appUrl,
//                         smtpHost: smtpHost,
//                         smtpPort: smtpPort,
//                         smtpUser: smtpUser,
//                         smtpPassword: smtpPassword,
//                     }
//                 });
//             });
//         }
//         return new Response(JSON.stringify({ message: 'Settings updated' }), { status: 200 })
//     } catch (error) {
//         console.log(error)
//         return new Response(JSON.stringify({message: 'An error occured'}), {status: 400})
//     }
// } 