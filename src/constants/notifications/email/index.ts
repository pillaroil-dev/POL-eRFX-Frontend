export const FROM_NAME = "POL eRFX.";

export const ADMIN_OTP_EMAIL = [
    process.env.ADMIN_EMAIL,
];

export const APPROVE_SIGN_IN_HTML = (otp: number | number, signInUser?: string) => {
    return `
            <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px;">
                <h1 style="color: #333; font-size: 24px;">Approve Sign-in</h1>
                <p style="color: #555; font-size: 16px; margin: 20px 0;">Approve an operator (${signInUser}) account sign-in with the one-time pin (OTP) below:</p>
                <div style="background-color: #f8f8f8; padding: 10px; border-radius: 5px; margin: 20px 0;">
                    <h3 style="font-size: 20px; font-weight: bold; color: #007bff;">${otp}</h3>
                </div>
                <p style="color: #555; font-size: 14px;">Keep this code safe. It's valid for 15 minutes.</p>
            </div>
            `;
};

export const APPROVE_SIGN_UP_HTML = (otp: string | number) => {
    return `
            <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px;">
                <h1 style="color: #333; font-size: 24px;">Confirm your OTP</h1>
                <p style="color: #555; font-size: 16px; margin: 20px 0;">Verify your account with the one-time password (OTP) below:</p>
                <div style="background-color: #f8f8f8; padding: 10px; border-radius: 5px; margin: 20px 0;">
                    <h3 style="font-size: 20px; font-weight: bold; color: #007bff;">${otp}</h3>
                </div>
                <p style="color: #555; font-size: 14px;">Keep this code safe. It's valid for 15 minutes.</p>
            </div>
            `;
}

export const RESEND_OTP_HTML = APPROVE_SIGN_UP_HTML;

export const ADD_VENDOR_HTML = (companyName: string, token: string) => {
    return `
            <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px;">
                <h1 style="color: #333; font-size: 24px;">Welcome to POL eRFX, ${companyName}!</h1>
                <p style="color: #555; font-size: 16px; margin: 20px 0;">Your account has been successfully created.</p>
                <p style="color: #555; font-size: 16px; margin: 20px 0;">Please use the link below to set your password and start exploring our services:</p>
                <a href="${process.env.HOST}/auth/set-password?token=${token}" style="display: inline-block; background-color: #007bff; color: #ffffff; padding: 10px 20px; margin: 20px 0; border-radius: 5px; text-decoration: none;">Set Your Password</a>
                <p style="color: #555; font-size: 14px;">This link will expire in 24 hours.</p>
            </div>
            `;
};

export const ADD_VENDOR_HTML_MANUAL_VERIFY = (companyName: string, password: string) => {
    return `
            <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px;">
                <h1 style="color: #333; font-size: 24px;">Welcome to POL eRFX, ${companyName}!</h1>
                <p style="color: #555; font-size: 16px; margin: 20px 0;">Your account password has been generated:</p>
                <div style="background-color: #f8f8f8; border-radius: 8px; padding: 15px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <h4 style="color: #007bff; font-size: 18px; margin: 0; font-weight: 600;">Your Password</h4>
                    <p style="color: #333; font-size: 20px; margin: 10px 0 0; font-family: monospace; letter-spacing: 1px;">${password}</p>
                </div>
                
                <p style="color: #555; font-size: 14px;">Please ensure to change your password upon first login for security purposes.</p>
            </div>
            `;
};

export const ADD_TENDER_HTML = (companyName: string, tenderId: number) => {
    return `
            <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px;">
            <h1 style="color: #333; font-size: 24px;">Hi ${companyName}!</h1>
                <p style="color: #555; font-size: 16px; margin: 20px 0;">You have received a tender with ID PTID${tenderId}. Ensure to review and send in your bid before the close date.</p>
                 <p style="color: #555; font-size: 16px; margin: 20px 0;">Follow the link to see your tender</p>
                <a href="${process.env.HOST}/u/user/tenders/manage/${tenderId}" style="display: inline-block; background-color: #007bff; color: #ffffff; padding: 10px 20px; margin: 20px 0; border-radius: 5px; text-decoration: none;">View tender</a>
            </div>
            `;
};

export const ONBOARDING_COMPLETE_HTML = (companyName: string, platform: string) => {
    return `
            <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px;">
                <h1 style="color: #333; font-size: 24px;">Welcome to POL eRFX</h1>
                <p style="color: #555; font-size: 16px; margin: 20px 0;">Welcome ${companyName}, your account registration is complete</p>
                <div style="background-color: #f8f8f8; padding: 10px; border-radius: 5px; margin: 20px 0;">
                    <p style="font-size: 16px; color: gray;">You have successfully registered on ${platform} app. ,<br/>Ensure you follow all our guidlines to avoid desciplinary actions against you.<br/><br/>Feel free to reach out to us for any inquiry.</p>
                </div>
                <p style="color: #555; font-size: 14px;">&copy; ${new Date().getFullYear()}. POL eRFX</p>
            </div>
            `
}

export const GENERATE_PASSWORD_RESET_OTP_HTML = (otp: string | number) => {
    return `
        <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px;">
            <h1 style="color: #333; font-size: 24px;">Password Reset OTP</h1>
            <p style="color: #555; font-size: 16px; margin: 20px 0;">Your OTP for password reset is below:</p>
            <div style="background-color: #f8f8f8; padding: 10px; border-radius: 5px; margin: 20px 0;">
                <h3 style="font-size: 20px; font-weight: bold; color: #007bff;">${otp}</h3>
            </div>
            <p style="color: #555; font-size: 14px;">This OTP is valid for 15 minutes.</p>
        </div>
        `
}

export const EXTEND_END_DATE_OTP_HTML = (otp: number | number) => {
    return `
            <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px;">
                <h1 style="color: #333; font-size: 24px;">Extend End Date</h1>
                <p style="color: #555; font-size: 16px; margin: 20px 0;">Extend tender end date with the one-time pin (OTP) below:</p>
                <div style="background-color: #f8f8f8; padding: 10px; border-radius: 5px; margin: 20px 0;">
                    <h3 style="font-size: 20px; font-weight: bold; color: #007bff;">${otp}</h3>
                </div>
                <p style="color: #555; font-size: 14px;">Keep this code safe. It's valid for 15 minutes.</p>
            </div>
            `;
};

export const BID_ACCEPTANCE_HTML = (companyName: string, title: string) => {
    return `
            <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px;">
                <p style="color: #555; font-size: 16px; margin: 20px 0;">Dear ${companyName},</p>
                <h1 style="color: #333; font-size: 20px;">${title}</h1>
                <p style="color: #555; font-size: 16px; margin: 20px 0;">NOTIFICATION OF CONTRACT AWARD DECISION</p>
                <div style="background-color: #f8f8f8; padding: 10px; border-radius: 5px; margin: 20px 0;">
                    <p style="font-size: 16px; color: gray;">We write in response to your company’s proposal in response to our Tender. We are pleased to inform you that your proposal has been carefully reviewed and your bid has been <span style="color: #007bff; font-weight: 700;">accepted</span>. <br/><br/>
                    This notification is to intimate you that pre-contracting formalities shall follow prior to award of contract agreement and execution of same by parties.
                    <br/><br/>
                        Please note that this letter does not constitute a definitive contract between your company and ours. A detailed contract will be shared subsequently for your consideration.
                            <br/><br/>
                        Thank you as we look forward to a mutually beneficial relationship.
                    <br/><br/>Yours faithfully <br/><br/> 
                    For and on behalf of Pillar Oil Limited.</p>
                </div>
                <p style="color: #555; font-size: 14px; text-align: center">&copy; ${new Date().getFullYear()}. POL eRFX</p>
            </div>
            `
};



export const BID_REJECTION_HTML = (companyName: string, title: string) => {
    return `
            <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px;">
                <p style="color: #555; font-size: 16px; margin: 20px 0;">Dear ${companyName},</p>
                <h1 style="color: #333; font-size: 20px;">${title}</h1>
                <p style="color: #555; font-size: 16px; margin: 20px 0;">NOTIFICATION OF CONTRACT AWARD DECISION</p>
                <div style="background-color: #f8f8f8; padding: 10px; border-radius: 5px; margin: 20px 0;">
                    <p style="font-size: 16px; color: gray;">Thank you for taking part in this Tender Opportunity. We have now evaluated all the final [bids/quotes/tenders] we received. Based on this evaluation, I am writing to advise you that unfortunately on this occasion <span style="color: #dc2626; font-weight: 600;">you have not been successful</span>. <br/><br/>
                   In the meantime, on behalf of the Management of Pillar Oil Limited, I would like to take this opportunity to thank you for the time and effort you have taken over the preparation and submission of your proposals. I hope this will not discourage you from bidding again in the future.
                    <br/><br/>Yours faithfully <br/><br/> 
                    For and on behalf of Pillar Oil Limited.</p>
                </div>
                <p style="color: #555; font-size: 14px; text-align: center">&copy; ${new Date().getFullYear()}. POL eRFX</p>
            </div>
            `
}
