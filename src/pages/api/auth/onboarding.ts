import { FROM_NAME, ONBOARDING_COMPLETE_HTML } from "@/constants/notifications/email";
import { transporter } from "@/utilities/helpers/emailTransporter";
import { PrismaClient } from "@prisma/client";
import type { APIRoute } from "astro";
import jwt from "jsonwebtoken";


const prisma = new PrismaClient()

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
    let x_pol_rfx_secret = process.env.X_POL_RFX_SECRET;
    request.headers.set("x-pol-rfx-secret", `${x_pol_rfx_secret}`);
    
    const data = await request.json();
    //@ts-ignore
    const email = jwt.verify(cookies.get(process.env.COOKIE_NAME)?.value, process.env.JWT_SECRET)?.email;

    try {
        if (data.companyName) {
            const payload = {
                companyName: data.companyName,
                businessPhone: data.businessPhone,
                homePhone: data.homePhone,
                email: email,
                falconRegistration: data.falconRegistration
            };

            const user = await prisma.contractor.create({
                data: {
                    ...payload,
                    user: {
                        connect: {
                            email: email,
                    },
                }}
            });

            if (user?.id) {
                // Send mail with defined transport object
                let info = await transporter.sendMail({
                    from: `${FROM_NAME} <${process.env.MAIL_USERNAME}>`, // Sender address
                    to: email, // List of receivers
                    subject: "Welcome to POL eRFX", // Subject line
                    text: `Welcome to POL eRFX`, // Plain text body
                    html: ONBOARDING_COMPLETE_HTML(payload?.companyName, 'POL eRFX'), 
                });
                if (info.messageId) {
                    return new Response(JSON.stringify({ message: "Onboarding complete!" }), { status: 200 })
                } else {
                    return new Response(JSON.stringify({
                        message: "Onboarding failed. Try again."
                    }), { status: 400 })
                }
            };
        } else if (data.firstName) {
            const payload = {
                firstName: data.firstName,
                lastName: data.lastName,
                businessPhone: data.businessPhone,
                email: email
            }
            const user = await prisma.fxbidder.create({
                data: {
                    ...payload,
                    user: {
                        connect: {
                            email: email,
                        },
                    }
                }
            }
            );
            if (user?.id) {
                const updateUserRole = await prisma.user.update({
                    where: {
                        email: email,
                    },
                    data: {
                        role: 'fx-user',
                    },
                });
                if (updateUserRole.id) {
                    
                    // Send mail with defined transport object
                    let info = await transporter.sendMail({
                        from: `${FROM_NAME}  <${process.env.MAIL_USERNAME}>`, // Sender address
                        to: email, // List of receivers
                        subject: "Welcome to POL eRFX", // Subject line
                        text: `Welcome to POL eRFX`, // Plain text body
                        html: ONBOARDING_COMPLETE_HTML(payload?.firstName, 'Pillar Fx'),
                    });
                    if (info.messageId) {
                        return new Response(JSON.stringify({ message: "Onboarding complete!" }), { status: 200 })
                    } else {
                        return new Response(JSON.stringify({
                            message: "Onboarding failed. Try again."
                        }), { status: 400 })
                    }
                }

            };
        } else {
            return redirect("/auth/onboarding");
        }

    } catch (error) {
        console.log(error)
    }

}

