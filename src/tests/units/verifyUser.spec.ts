import { decodePassword, encodePassword } from '../../utilities/helpers/verifyUser';
import { test, expect, describe } from 'vitest';

describe("Passwords Encryptions and Decryptions", () => {

    test("Encode password by acccepting a string param", () => {
        const encodedPassword = encodePassword("1234");
        expect(encodedPassword).toBeDefined();
    });
    
    test("Decode password by comparing 2 string params => Boolean value", () => {
        const hashedPassword = "$2y$10$dV2WKhvtWTkvXPyIJl23D.b6UT2hwASOfCjdVbw.l1Figbhzms.N2";
        const decodedPassword = decodePassword('1234', hashedPassword);
        expect(decodedPassword).toBeTruthy();
    });
    
});