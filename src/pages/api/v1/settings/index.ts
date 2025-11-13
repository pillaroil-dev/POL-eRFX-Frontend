import type { APIRoute } from "astro";
import { prisma } from "@/utilities/helpers/prismaInstace";
import bcrypt from "bcryptjs";
// import { transporter } from "@/utilities/helpers/emailTransporter";
import { ADD_ADMIN_EMAIL_NOTIFICATION } from "@/constants/notifications/email";
import { generateRandomPassword } from "@/utilities/helpers/generatePassword";

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

export const POST: APIRoute = async ({request}) => {
    const salt = bcrypt.genSaltSync(10);

    const data = await request.json();
    const {role, payload} = data;
    const {id, newAdminEmail, fullname, appName, appUrl, smtpUser, smtpHost, smtpPassword, smtpPort} = payload;

    const generatedPassword = generateRandomPassword(8);
    const password = bcrypt.hashSync(generatedPassword, salt);

    try {
        if (!newAdminEmail) {
            await prisma.settings.update({
                where: {
                    id: id
                },
                data: {
                    appName: appName,
                    appLogo: data.appLogo ? data.appLogo : data.payload.appLogo,
                    appUrl: appUrl,
                    smtpHost: smtpHost,
                    smtpPort: smtpPort,
                    smtpUser: smtpUser,
                    smtpPassword: smtpPassword,
                }
            });
        } else {
            const user = await prisma.$transaction(async (tx) => {
                const user = await tx.user.create({
                    data: {
                        email: newAdminEmail,
                        role: role,
                        password: password,
                        verified: true,
                        Admin: {
                            create: {
                                fullname: fullname,
                                email: newAdminEmail,
                            }
                        }
                    }
                });

                await tx.settings.update({
                    where: {
                        id: id
                    },
                    data: {
                        appName: appName,
                        appLogo: data.appLogo ? data.appLogo : data.payload.appLogo,
                        appUrl: appUrl,
                        smtpHost: smtpHost,
                        smtpPort: smtpPort,
                        smtpUser: smtpUser,
                        smtpPassword: smtpPassword,
                    }
                });

                return user;
            });

            if (user && user.id) {
                console.log(user);
                // try {
                //     // Send email to the user based on their role
                //     const msg = await transporter.sendMail({
                //         from: `POL eRFX <${import.meta.env.MAIL_USERNAME}>`, // Sender address
                //         to: newAdminEmail, // List of receivers
                //         subject: `You're now an ${role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()} on POL-eRFX`, // Subject line
                //         html: ADD_ADMIN_EMAIL_NOTIFICATION(role, fullname, generatedPassword),
                //     });
                //     console.log({"MESSAGE:::": msg})
                // } catch (emailError) {
                //     console.error('Failed to send email:', emailError);
                //     throw new Error('User created but failed to send email notification.');
                // }
            }
        }
        return new Response(JSON.stringify({ message: 'Settings updated' }), { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({message: 'An error occured'}), {status: 400})
    }
};

export const DELETE: APIRoute = async ({request}) => {
    const data = await request.json();

    const {id} = data;

    const deleteOperation = await prisma.$transaction([
        prisma.user.delete({
            where: {
                id: id
            },
        }),
        prisma.admin.delete({
            where: {
                userId: id
            },
        }),
    ]);

    if(!deleteOperation){
        throw new Error("An error occured!");
    }
    return new Response(JSON.stringify({
        message: "Admin deleted successfully"
    }), {status: 400})
};