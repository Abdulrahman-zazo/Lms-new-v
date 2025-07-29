// "use client";
import HeroHeader from "@/components/HeroHeader";
import AboutusSection from "@/components/Ui/AboutusSection";
import InstructorCallSection from "@/components/Ui/InstructorCallSection";
import HeroWorldMap from "@/components/Ui/Map";
import WhyDifferentSection from "@/components/Ui/WhyDifferent";
import { Metadata } from "next";

import { getTranslations } from "next-intl/server";
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("translation");

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
