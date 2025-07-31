import Curricula from "@/components/Curricula";
import HeroHeader from "@/components/HeroHeader";
import { Loaders } from "@/components/Loader";
import GetStarted from "@/components/Ui/GetStarted";
import WhyDifferentSection from "@/components/Ui/WhyDifferent";
import { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";
import { Suspense } from "react";
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("translation");
  const locale = await getLocale();
  return {
    title: t("pages.Curriculum", { defaultValue: "H-Platform - المناهج" }),
    description: t("pages.Curriculum_description", {
      defaultValue:
        "في عالم يتغير بسرعة، لم يعد التعلم وحده كافيًا بل يجب أن تتميّز. منصة H  ليست مجرد أداة تعليمية؛ إنها الجسر الذي يربط بين أحلامك والواقع.",
    }),
    alternates: {
      canonical: `https://h-platform.online/${locale}/curricula`,
      languages: {
        ar: "https://h-platform.online/ar/curricula",
        en: "https://h-platform.online/en/curricula",
      },
    },
    openGraph: {
      title: t("pages.Curriculum"),
      description: t("pages.Curriculum_description"),
      url: `https://h-platform.online/${locale}/curricula`,
      type: "website",
      siteName: "H Platform",
      images: [
        {
          url: "https://www.h-platform.online/scema.png",
          width: 1200,
          height: 630,
          alt: "H Platform Curriculum Preview",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("pages.Curriculum"),
      description: t("pages.Curriculum_description"),
      images: [{ url: "https://www.h-platform.online/scema.png" }],
    },
  };
}
const CurriculaPage = () => {
  const t = useTranslations("translation");
  return (
    <>
      <div className=" min-h-screen ">
        <HeroHeader
          buttonText={t("curricula-header.title3")}
          title={t("curricula-header.title1")}
          description={t("curricula-header.title2")}
        />
        <Suspense fallback={<Loaders />}>
          <Curricula />
        </Suspense>
        <WhyDifferentSection />
        <GetStarted />
      </div>
    </>
  );
};

export default CurriculaPage;
