// 📁 app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { StoreProvider } from "@/lib/Redux/StoreProvider";
import "./globals.css";

// ١. تعريف الخطوط هنا
const alexandria = localFont({
  src: [
    {
      path: "../fonts/alexandria-v3-arabic_latin-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/alexandria-v3-arabic_latin-700.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/alexandria-v3-arabic_latin-900.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-alexandria",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// ٢. تعريف Metadata أساسية (اختياري)
export const metadata: Metadata = {
  title: "H Platform",
  description: "منصة H التعليمية لتنمية مهارات الأطفال واليافعين",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const googleClientId = process.env.NEXT_CLIENT_ID_GOOGLE || "";

  return (
    // ٣. تطبيق متغيرات الخطوط على الـ body
    <html lang="ar">
      <body className={`${alexandria.variable} ${inter.variable}`}>
        {/* ٤. وضع الـ Providers العامة هنا */}
        <GoogleOAuthProvider clientId={googleClientId}>
          <StoreProvider>{children}</StoreProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
