import Curricula from "@/components/Curricula";
import HeroHeader from "@/components/HeroHeader";
import { Loaders } from "@/components/Loader";
import GetStarted from "@/components/Ui/GetStarted";
import WhyDifferentSection from "@/components/Ui/WhyDifferent";
import { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("translation");

  return {
    title: t("pages.Curriculum", { defaultValue: "H-Platform - المناهج" }),
    description: t("pages.Curriculum_description", {
      defaultValue:
        "في عالم يتغير بسرعة، لم يعد التعلم وحده كافيًا بل يجب أن تتميّز. منصة H  ليست مجرد أداة تعليمية؛ إنها الجسر الذي يربط بين أحلامك والواقع.",
    }),
    icons: {
      icon: [{ url: "/favicon.ico" }, { url: "/icon.png", type: "image/png" }],
      apple: [{ url: "/apple-icon.png" }],
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
