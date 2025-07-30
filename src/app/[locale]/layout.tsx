import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { StoreProvider } from "@/lib/Redux/StoreProvider";

import MainLayout from "@/components/MainLayout";
import { cookies } from "next/headers";
import { getTranslations } from "next-intl/server";

const alexandria = localFont({
  src: [
    {
      path: "../../fonts/alexandria-v3-arabic_latin-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../fonts/alexandria-v3-arabic_latin-700.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../fonts/alexandria-v3-arabic_latin-900.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-alexandria", // لإنشاء متغير CSS يمكن استخدامه لاحقًا إذا أردت
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("translation");

  return {
    title: t("pages.Home", { defaultValue: "H Platform - الصفحة الرئيسية" }),

    // ✅ هذا هو المفتاح المطلوب لـ <meta name="description">
    description: t("pages.Home_description", {
      defaultValue:
        "في عالم يتغير بسرعة، لم يعد التعلم وحده كافيًا بل يجب أن تتميّز. منصة H ليست مجرد أداة تعليمية؛ إنها الجسر الذي يربط بين أحلامك والواقع.",
    }),
    alternates: {
      canonical: "https://h-platform.online", // ضع رابط موقعك هنا
    },
    openGraph: {
      title: t("pages.Home"),
      description: t("pages.Home_description"),
      url: "https://h-platform.online", // عدلها حسب رابطك
      type: "website",
      siteName: "H Platform",

      images: [
        {
          url: "https://www.h-platform.online/scema.png", // ضعها في public/
          width: 1200,
          height: 630,
          alt: "H Platform Preview",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("pages.Home"),
      description: t("pages.Home_description"),
      images: [{ url: "https://www.h-platform.online/scema.png" }],
    },
  };
}
export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const locale = params.locale;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  const googleClientId = process.env.NEXT_CLIENT_ID_GOOGLE || "";
  const fontClassName = locale === "ar" ? alexandria.variable : inter.variable;
  const token = await (await cookies()).get("auth_token")?.value;

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "@id": "https://www.h-platform.online#organization",
              name: "H Educational Platform - منصة H التعليمية",
              url: "https://www.h-platform.online",
              logo: "https://www.h-platform.online/scema.png",
              description:
                "منصة تعليمية ذكية تقدم دورات ومساقات تفاعلية لتطوير مهارات الأطفال واليافعين وتأهيلهم لمستقبل واعد.",
              sameAs: [
                "https://www.facebook.com/share/17VAoVRZ9b/",
                "https://www.instagram.com/hplatform1",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+963996202648",
                contactType: "customer support",
                areaServed: "SY",
                availableLanguage: ["ar", "en"],
              },
              foundingDate: "2024",
              address: {
                "@type": "PostalAddress",
                addressCountry: "SY",
              },
            }),
          }}
        />
      </head>
      <body className={fontClassName}>
        <GoogleOAuthProvider clientId={googleClientId}>
          <StoreProvider>
            <NextIntlClientProvider>
              <MainLayout token={token || ""}>{children}</MainLayout>
            </NextIntlClientProvider>
          </StoreProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
