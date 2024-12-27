import bcrypt from 'bcryptjs';
import CryptoJS from "crypto-js";

const secretKey = process.env.JWT_SECRET;

export const encryptDocumentPassword = (password: string) => {
    const encryptedText = CryptoJS.AES.encrypt(password, secretKey).toString();
    return encryptedText;
}

export const decryptDocumentPassword = (password: string) => {
    const bytes = CryptoJS.AES.decrypt(password, secretKey);
    const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedText;
}

export const decodePassword = (password: string, hashedPassword?: string) => {
    // Check and return value for null/undefined
    if (!password || !hashedPassword) {
        return false;
    }
    return bcrypt.compareSync(password, hashedPassword);
};

export const encodePassword = (password: string) => {
    // Define salt rounds for hashing
    const saltRounds = 10;
    // Generate a salt and hash on separate function calls
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);
    return hashedPassword;
};

