import { prisma } from '@/utilities/helpers/prismaInstace';
import { decodePassword } from '@/utilities/helpers/verifyUser';
import { ActionError, defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { transporter } from '@/utilities/helpers/emailTransporter';
import { APPROVE_SIGN_UP_HTML, FROM_NAME, ONBOARDING_COMPLETE_HTML } from '@/constants/notifications/email';
import { redisStorage } from '@/utilities/helpers/redisStorage';

const token = process.env.X_POL_RFX_SECRET;

export const authAction = {
  login: defineAction({
    accept: 'form',  
    input: z.object({
      email: z.string().email(),
      password: z.string()
    }),
    handler: async ({email, password}, {request, session}) => {
        request.headers.set("x-pol-rfx-secret", `${token}`);
        const user = await prisma.user.findFirst({
            where: {
                email: email,
            },
        });

        // Check if user exists
        if (!user) {
            return {
                success: false,
                message: "User not found"
            }
        }

        const decodedPassword = await decodePassword(password, user.password);
        // Verify password matches
        if (!decodedPassword) {
            return {
                success: false, 
                message: "Invalid password"
            }
        }

        // Generate a token for the user
        const sessionToken = jwt.sign({ 
            email: user.email, 
            role: user.role,
            userId: user.id // Include user ID in token
        }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });

        // Set session token with user ID
        session.set(`${process.env.SESSION_NAME}:${user.id}`, sessionToken);
        console.log({sessionToken})

        return {
            success: true,
            message: "Login successful",
            data: {
                email: user.email,
                role: user.role
            }
        }
    }
  }),
  //register action
//   register: defineAction({
//     accept: 'form',
//     input: z.object({
//       email: z.string().email(),
//       password: z.string().min(6),
//     }),
//     handler: async({email, password}, {request, session}) => {
//         const salt = bcrypt.genSaltSync(10);
//         request.headers.set("x-pol-rfx-secret", `${token}`);
//         const encryptedPassword = bcrypt.hashSync(password, salt);

//         console.log({salt, encryptedPassword})
//         // Create a new user in the database
//         const user = await prisma.user.create({
//             data: {
//                 email: email,
//                 password: encryptedPassword,
//             },
//         });
//         // // Generate a token for the new user
//         const sessionToken = jwt.sign({ email: user.email, role: user.role }, process.env.JWT_SECRET, {
//             expiresIn: process.env.JWT_EXPIRES_IN,
//         });
//         // set the generated token as session token
//         session.set(process.env.SESSION_NAME, sessionToken);

//         //do OTP verification before redirect!!!
//         const otp = Math.floor(1000 + Math.random() * 9000); // Generate 4 digit OTP

//         // Send mail with defined transport object
//         const sender = await transporter.sendMail({
//             from: `${FROM_NAME} <${process.env.MAIL_USERNAME}>`, // Sender address
//             to: email, // List of receivers
//             subject: "Verify your account", // Subject line
//             text: `Your OTP is ${otp}`, // Plain text body
//             html: APPROVE_SIGN_UP_HTML(otp), //html bdy
//         });

//         // save otp in redis db fro verification:
//         await redisStorage.set(`otp:${email}`, otp, {
//             ex: 900, // 15 minutes in seconds
//             db: 14 // redis database index
//         });

//         if (sender?.messageId) {
//             return {
//                 success: true,
//                 message: 'Signup successful'
//             };
//         }
//         return {
//             success: false,
//             message: 'Signup failed. Check email and try again.'
//         };
//     },
//   }),
//   //onboarding action
//   onboarding: defineAction({
//     accept: 'form',
//     input: z.object({
//         firstName: z.string().nullable(),
//         lastName: z.string().nullable(),
//         email: z.string().email(),
//         companyName: z.string().nullable(),
//         businessPhone: z.string(),
//         homePhone: z.string().nullable().optional(),
//         falconRegistration: z.boolean(),
//     }),
//     handler: async (input, {request, session}) => {
//         request.headers.set("x-pol-rfx-secret", `${token}`);
//         //extract user email from jwt using active session
//         const extractedEmail = await jwt.verify(session.get(process.env.COOKIE_NAME)?.value, process.env.JWT_SECRET).email;

//         if(input.companyName){
//             //extract the needed data from the input into a payload
//             const payload = {
//                 companyName: input.companyName,
//                 businessPhone: input.businessPhone,
//                 homePhone: input.homePhone,
//                 email: extractedEmail,
//                 falconRegistration: input.falconRegistration
//             };
//             const user = await prisma.contractor.create({
//                 data: {
//                     ...payload,
//                     user: {
//                         connect: {
//                             email: extractedEmail,
//                     },
//                 }}
//             });

//             if (user?.id) {
//                 // Send mail with defined transport object
//                 let sender = await transporter.sendMail({
//                     from: `${FROM_NAME} <${process.env.MAIL_USERNAME}>`, // Sender address
//                     to: extractedEmail, // List of receivers
//                     subject: "Welcome to POL eRFX", // Subject line
//                     text: `Welcome to POL eRFX`, // Plain text body
//                     html: ONBOARDING_COMPLETE_HTML(payload?.companyName, 'POL eRFX'), 
//                 });
//                 if (sender.messageId) {
//                     return new Response(JSON.stringify({ message: "Onboarding complete!" }), { status: 200 })
//                 } else {
//                     return new Response(JSON.stringify({
//                         message: "Onboarding failed. Try again."
//                     }), { status: 400 })
//                 }
//             }
//         }            
//         else if (input.firstName) {
//             const payload = {
//                 firstName: input.firstName,
//                 lastName: input.lastName,
//                 businessPhone: input.businessPhone,
//                 email: extractedEmail
//             }
//             const user = await prisma.fxbidder.create({
//                 data: {
//                     ...payload,
//                     user: {
//                         connect: {
//                             email: extractedEmail,
//                         },
//                     }
//                 }
//             }
//             );
//             if (user?.id) {
//                 const updateUserRole = await prisma.user.update({
//                     where: {
//                         email: extractedEmail,
//                     },
//                     data: {
//                         role: 'fx-user',
//                     },
//                 });
//                 if (updateUserRole.id) {
                    
//                     // Send mail with defined transport object
//                     let info = await transporter.sendMail({
//                         from: `${FROM_NAME}  <${process.env.MAIL_USERNAME}>`, // Sender address
//                         to: extractedEmail, // List of receivers
//                         subject: "Welcome to POL eRFX", // Subject line
//                         text: `Welcome to POL eRFX`, // Plain text body
//                         html: ONBOARDING_COMPLETE_HTML(payload?.firstName, 'Pillar Fx'),
//                     });
//                     if (info.messageId) {
//                         return new Response(JSON.stringify({ message: "Onboarding complete!" }), { status: 200 })
//                     } else {
//                         return new Response(JSON.stringify({
//                             message: "Onboarding failed. Try again."
//                         }), { status: 400 })
//                     }
//                 }

//             };
//         }
//         else {
//             //return redirect("/auth/onboarding");
//             return;
//         }
//     }
//   }),
//   resetPassword: defineAction(/* ... */),
//   setPassword: defineAction(/* ... */),
//   forgotPassword: defineAction(/* ... */),
//   confirmOtp: defineAction(/* ... */),
//   congratulations: defineAction(/* ... */),
};