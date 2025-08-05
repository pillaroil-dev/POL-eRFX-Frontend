/*
// This action is used to send a verification OTP to the operator email for bid access
// The OTP is stored in Redis and is valid for 15 minutes
// The OTP is sent to the operator email and the operator can use the OTP to access the bid
// The OTP is verified when the operator clicks on the link in the email
// The OTP is verified when the operator clicks on the link in the email
// Please note this astro version is specifically used to enable me use both
// astro endpoints and astro actions. Read more about compatibility and issues
// https://docs.astro.build/en/guides/actions/compatibility/
*/

import { BIDS_ACCESS_VERIFICATION_OTP_EMAIL, EXTEND_END_DATE_OTP_HTML } from "@/constants/notifications/email";
import { transporter } from "@/utilities/helpers/emailTransporter";
import { generateOTP } from "@/utilities/helpers/generateOTP";
import { OTPStorage } from "@/utilities/helpers/redisStorage";
import { defineAction } from "astro:actions";
import { z } from "astro:content";


export const bidAccessAction = {
    create: defineAction({
        input: z.object({
            bidId: z.number(),
            operatorEmail: z.string().email(),
        }),
        handler: async ({operatorEmail, bidId}) => {
            try {
                const generatedOtp = await generateOTP(6);
                await OTPStorage.setItem(operatorEmail, generatedOtp, {
                    ttl: 900
                });
                await transporter.sendMail({
                    from: `"POL eRFX" <${process.env.MAIL_USERNAME}>`,
                    to: process.env.OPERATOR_APPROVAL_ADMINS, 
                    subject: "Bids Access Verification",
                    html: BIDS_ACCESS_VERIFICATION_OTP_EMAIL(parseInt(generatedOtp), bidId),
                });
                return {
                    message: 'OTP sent successfully',
                    status: 200
                }
            } catch (error) {
                console.log(error)
                return {
                    message: 'Something went wrong. Please try again later',
                    status: 400
                }
            }
        }
    }),

    verify: defineAction({
        input: z.object({
            otp: z.number(),
            operatorEmail: z.string().email(),
        }),
        handler: async ({otp, operatorEmail}) => {
            try {
                const storedOtp = await OTPStorage.getItem(operatorEmail);
                if (storedOtp === otp) {
                    await OTPStorage.removeItem(operatorEmail);
                    return {
                        message: 'OTP verified successfully',
                        status: 200
                    }
                }else{
                    throw new Error('OTP does not match');
                }
            } catch (error) {
                console.log(error)
                return {
                    message: 'OTP expired. Please try again',
                    status: 400
                }
            }
        }
    })
}