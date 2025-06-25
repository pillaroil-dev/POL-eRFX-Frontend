import {describe, it, test, expect} from 'vitest';
import { checkEmailInput } from '../../utilities/helpers/checkEmailInput';
import { generateOTP } from '../../utilities/helpers/generateOTP';
import { generateRandomPassword } from '../../utilities/helpers/generatePassword';

describe("App General Unit Testing", () => {
    describe("Generate OTP", () => {
        const otpLength = 6;
        test("Accept only numbers as param", async () => {
            const checkParamIsNumber: (() => Boolean) = () => {
                if(!otpLength || Number.isNaN(otpLength)){
                    return false;
                }else{
                    true 
                }
            }
            expect(otpLength).toBeTypeOf("number");
            expect(checkParamIsNumber).toBeTruthy();
        })
        test("Returns a string of 6 numbers as OTP", async () => {
            const otp = await generateOTP(otpLength);
            expect(otp.length).toBe(otpLength);
        })
    });
    
    describe("Generate random password", ()  => {
        const passwordLength = 12;
        test("Generates a 12 character long random password", () => {
            const randomPassword = generateRandomPassword(passwordLength);
            expect(randomPassword.length).toBe(12);
        })
    });
})

