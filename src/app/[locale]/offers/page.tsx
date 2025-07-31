import HeroHeader from "@/components/HeroHeader";
import { Loaders } from "@/components/Loader";
import Offers from "@/components/Offers";
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
    title: t("pages.offer", { defaultValue: "H-Platform - العروض" }),
    description: t("pages.Home_description", {
      defaultValue:
        "  استفد من باقاتنا التعليمية المصممة بعناية لمساعدتك على تحقيق أهدافك بطريقة مرنة وبسعر أقل! اختر العرض الذي يناسب اهتماماتك وابدأ التعلم اليوم.",
    }),
    alternates: {
      canonical: `https://h-platform.online/${locale}/offers`,
      languages: {
        ar: "https://h-platform.online/ar/offers",
        en: "https://h-platform.online/en/offers",
      },
    },
    openGraph: {
      title: t("pages.offer"),
      description: t("pages.Home_description"),
      url: `https://h-platform.online/${locale}/offers`,
      type: "website",
      siteName: "H Platform",
      images: [
        {
          url: "https://www.h-platform.online/scema.png",
          width: 1200,
          height: 630,
          alt: "H Platform offers Preview",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("pages.offer"),
      description: t("pages.Home_description"),
      images: [{ url: "https://www.h-platform.online/scema.png" }],
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
