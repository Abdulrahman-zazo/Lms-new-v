import type { Metadata } from "next";

import { hasLocale, NextIntlClientProvider } from "next-intl";

import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

import MainLayout from "@/components/MainLayout";
import { cookies } from "next/headers";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations("translation");
  const locale = params?.locale ?? "ar";

  return {
    title: t("pages.Home", { defaultValue: "H Platform - الصفحة الرئيسية" }),
    description: t("pages.Home_description", {
      defaultValue:
        "في عالم يتغير بسرعة، لم يعد التعلم وحده كافيًا بل يجب أن تتميّز. منصة H ليست مجرد أداة تعليمية؛ إنها الجسر الذي يربط بين أحلامك والواقع.",
    }),
    alternates: {
      canonical: `https://h-platform.online/${locale}`,
      languages: {
        ar: "https://h-platform.online/ar",
        en: "https://h-platform.online/en",
      },
    },
    openGraph: {
      title: t("pages.Home"),
      description: t("pages.Home_description"),
      url: `https://h-platform.online/${locale}`,
      type: "website",
      siteName: "H Platform",
      images: [
        {
          url: "https://www.h-platform.online/scema.png",
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

export default async function LocaleLayout({
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

  const token = await (await cookies()).get("auth_token")?.value;

  return (
    <div lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "H Platform",
              url: "https://www.h-platform.online",
              inLanguage: locale,
            },
            {
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
            },
          ]),
        }}
      />
      <NextIntlClientProvider>
        <MainLayout token={token || ""}>{children}</MainLayout>
      </NextIntlClientProvider>
    </div>
  );
}
