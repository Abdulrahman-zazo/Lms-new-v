// "use client";
import HeroHeader from "@/components/HeroHeader";
import AboutusSection from "@/components/Ui/AboutusSection";
import InstructorCallSection from "@/components/Ui/InstructorCallSection";
import HeroWorldMap from "@/components/Ui/Map";
import WhyDifferentSection from "@/components/Ui/WhyDifferent";
import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("translation");

  const locale = await getLocale();
  return {
    title: t("pages.About", { defaultValue: "H-Platform - من نحن" }),
    description: t("pages.About_description", {
      defaultValue:
        "H-Platform مجتمع يقودك نحو التميز، ويمنحك الأدوات والمعرفة لتتقدّم بثقة في عالم سريع التغيّر نصنع تجربة تعلم رقمية متكاملة ترتقي بطموحك من الفكرة إلى الإنجاز.",
    }),
    icons: {
      icon: [{ url: "/favicon.ico" }, { url: "/icon.png", type: "image/png" }],
      apple: [{ url: "/apple-icon.png" }],
    },
    alternates: {
      canonical: `https://h-platform.online/${locale}/about-us`,
      languages: {
        ar: "https://h-platform.online/ar/about-us",
        en: "https://h-platform.online/en/about-us",
      },
    },
    openGraph: {
      title: t("pages.About"),
      description: t("pages.About_description"),
      url: `https://h-platform.online/${locale}/about-us`,
      type: "website",
      siteName: "H Platform",
      images: [
        {
          url: "https://www.h-platform.online/scema.png",
          width: 1200,
          height: 630,
          alt: "H Platform",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("pages.About"),
      description: t("pages.About_description"),
      images: [{ url: "https://www.h-platform.online/scema.png" }],
    },
  };
}
export default async function AboutPage() {
  const t = await getTranslations("translation");

  return (
    <div>
      <HeroHeader
        title={t("about-header.title1")}
        description={t("about-header.title2")}
        buttonText={t("about-header.title3")}
      />
      <AboutusSection />
      <HeroWorldMap />
      <WhyDifferentSection />
      <InstructorCallSection />
    </div>
  );
}
