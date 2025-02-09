import { ActionError, defineAction } from 'astro:actions';
import { z } from 'astro:schema';

import { MEMBER_CREATE_HTML, FROM_NAME } from '@/constants/notifications/email';
import { checkEmailInput } from '@/utilities/helpers/checkEmailInput';
import { transporter } from '@/utilities/helpers/emailTransporter';
import { prisma } from '@/utilities/helpers/prismaInstace';
import bcrypt from 'bcryptjs';

// Generate a salt for hashing passwords
const salt = bcrypt.genSaltSync(10);


export const createMemberAction = {
    create: defineAction({
        input: z.object({
            fullname: z.string(),
            email: z.string().email(),
            memberAddress: z.string().nullable(),
            memberPhone: z.string().nullable(),
            userId: z.number()
        }),
        handler: async ({ fullname, email, memberAddress, memberPhone, userId }, context) => {

            let x_pol_rfx_secret = process.env.X_POL_RFX_SECRET;
            context.request.headers.set("x-pol-rfx-secret", `${x_pol_rfx_secret}`);
        
            const generatedPassword = Array(12)
                .fill('')
                .map(() => String.fromCharCode(Math.floor(Math.random() * 26) + 97))
                .join('');
            const password = bcrypt.hashSync(generatedPassword, salt);
        
            const isEmail = checkEmailInput(email);
            try {
                // Create a new user in the database
                const user = await prisma.user.create({
                    data: {
                        email: isEmail && email as string,
                        password: password as string,
                        verified: true,
                    },
                });
                if(!user) {
                    return;
                };
        
                const memberCreatePayload = {
                    user: user.id,
                    fullname: fullname,
                    email: email,
                    address: memberAddress,
                    phone: memberPhone
                };
        
                const member = await prisma.member.create({
                    //@ts-ignore
                    data: {
                        ...memberCreatePayload,
                        contractor: {
                            connect: {
                                id: userId,
                            }
                        },
                        user: {
                            connect: {
                                email: email,
                        },
                    }}
                });

                if (!member) {
                    return;
                };
        
                // Send mail with defined transport object
                let info = await transporter.sendMail({
                    from: `${FROM_NAME} <${process.env.MAIL_USERNAME}>`, // Sender address
                    to: email, // List of receivers
                    subject: "Welcome to POL eRFX", // Subject line
                    text: `Your account has been created successfully. Your password is: ${generatedPassword} Ensure to change your password after login.`, // Plain text body
                    html: MEMBER_CREATE_HTML(generatedPassword), // HTML body content
                });

                return {
                    member: member.id,
                    message: 'Member added successfully!'
                };
        
            }
            catch (error) {
                console.log(error);
                throw new ActionError({
                    code: "UNAUTHORIZED",
                    message: "An error occured. Member not added",
                  });
            };
        }
    }),
    fetch: defineAction({
        handler: async () => {
            const members = await prisma.member.findMany();
            return {
                members
            };
        }
    }),
    delete: defineAction({
        input: z.object({
            id: z.number()
        }),
        handler: async ({id}) => {
            try {
                const result = await prisma.$transaction(async (tx) => {
                    const member = await tx.member.delete({
                        where: {
                            id: id
                        },
                        include: {
                            user: true
                        }
                    });
                    await tx.user.delete({
                        where: {
                            id: member.userId
                        }
                    });
                    return {
                        member: member.id,
                        message: 'Member deleted successfully!'
                    };
                });
                return result;
            } 
            catch (error) {
                console.log(error);
                throw new ActionError({
                    code: "UNAUTHORIZED",
                    message: "An error occured. Member not deleted",
                  });
            };
        }
    })
}