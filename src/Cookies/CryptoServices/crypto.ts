// import CryptoJS from "crypto-js";

// // ------ مفتاح التشفير (يجب أن يكون سريًا ويُخزن بأمان) ------
// const SECRET_KEY = process.env.VITE_ENCRYPTION_KEY!;

// // ------ تشفير التوكن ------
// export const encryptToken = (token: string): string => {
//   const encrypted = CryptoJS.AES.encrypt(token, SECRET_KEY).toString();
//   cookieService.set("auth_token", encrypted);
//   return encrypted;
// };

// // ------ فك تشفير التوكن ------
// export const decryptToken = (encryptedToken?: string): string => {
//   if (!encryptedToken) return "";
//   try {
//     const bytes = CryptoJS.AES.decrypt(encryptedToken, SECRET_KEY);
//     return bytes.toString(CryptoJS.enc.Utf8);
//   } catch (error) {
//     console.error("خطأ في فك التشفير:", error);
//     return "";
//   }
// };
