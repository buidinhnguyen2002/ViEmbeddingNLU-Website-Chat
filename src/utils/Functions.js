import CryptoJS from 'crypto-js';
const secretKey = process.env.REACT_APP_SECRET_KEY;
export const encryptToken = (token) => {
    console.log( "SECRET",secretKey);
    return CryptoJS.AES.encrypt(token, secretKey).toString();
};
export const decryptToken = (encryptedToken) => {
    const bytes = CryptoJS.AES.decrypt(encryptedToken, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
};