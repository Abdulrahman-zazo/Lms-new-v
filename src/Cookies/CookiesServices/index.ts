// utils/auth/encrypt.ts
"use client";

import Cookies from "universal-cookie";
import CryptoJS from "crypto-js";

const cookies = new Cookies();
const SECRET_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY!;

export const encryptToken = (token: string): string => {
  const encrypted = CryptoJS.AES.encrypt(token, SECRET_KEY).toString();

  cookies.set("auth_token", encrypted, {
    path: "/",
    sameSite: "strict",
    secure:
      typeof window !== "undefined" && window.location.protocol === "https:",
    expires: new Date(Date.now() + 60 * 60 * 1000),
  });

  return encrypted;
};
export const getToken = (): string | null => {
  return cookies.get("auth_token") || null;
};

export const decryptToken = (): string | null => {
  const encrypted = cookies.get("auth_token");
  if (!encrypted) return null;

  try {
    const bytes = CryptoJS.AES.decrypt(encrypted, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error("خطأ في فك التوكن:", error);
    return null;
  }
};

export const RemoveToken = () => {
  return cookies.remove("auth_token");
};
