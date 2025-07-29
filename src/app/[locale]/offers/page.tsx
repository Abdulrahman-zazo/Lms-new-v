import HeroHeader from "@/components/HeroHeader";
import { Loaders } from "@/components/Loader";
import Offers from "@/components/Offers";
import GetStarted from "@/components/Ui/GetStarted";
import WhyDifferentSection from "@/components/Ui/WhyDifferent";
import { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("translation");

  return {
    title: t("pages.offer", { defaultValue: "H-Platform - العروض" }),
    description: t("pages.Home_description", {
      defaultValue:
        "  استفد من باقاتنا التعليمية المصممة بعناية لمساعدتك على تحقيق أهدافك بطريقة مرنة وبسعر أقل! اختر العرض الذي يناسب اهتماماتك وابدأ التعلم اليوم.",
    }),
    icons: {
      icon: [{ url: "/favicon.ico" }, { url: "/icon.png", type: "image/png" }],
      apple: [{ url: "/apple-icon.png" }],
    },
  };
}
const OfferPage = () => {
  const t = useTranslations("translation");

  //   const token = cookieService.get("auth_token");
  return (
    <div>
      <HeroHeader
        aria-label={t("offer-header.title3")}
        buttonText={t("offer-header.title3")}
        title={t("offer-header.title1")}
        description={t("offer-header.title2")}
      />
      <Suspense fallback={<Loaders />}>
        <Offers />
      </Suspense>
      <WhyDifferentSection />
      <GetStarted />
    </div>
  );
};

export default OfferPage;
