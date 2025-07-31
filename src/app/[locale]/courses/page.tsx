import HeroHeader from "@/components/HeroHeader";
import { Loaders } from "@/components/Loader";
import ComplaintsSections from "@/components/Ui/Complaints";
import CoursesComponent from "@/components/Ui/Courses";
import GetStarted from "@/components/Ui/GetStarted";
import WhyDifferentSection from "@/components/Ui/WhyDifferent";
import { Metadata } from "next";
// import { getToken } from "@/Cookies/CookiesServices";
import { useTranslations } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";
import { Suspense } from "react";
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("translation");
  const locale = await getLocale();
  return {
    title: t("pages.Courses", { defaultValue: "H-Platform - الدورات" }),
    description: t("pages.Courses_description", {
      defaultValue:
        "H ليست مجرد منصة تعليمية، بل تجربة ذكية وملهمة تجمع بين التكنولوجيا المتقدمة وخبرة نخبة من المدرّسين لتقدّم لك تعلماً حقيقياً بقيمة عالية.",
    }),

    alternates: {
      canonical: `https://h-platform.online/${locale}/courses`,
      languages: {
        ar: "https://h-platform.online/ar/courses",
        en: "https://h-platform.online/en/courses",
      },
    },
    openGraph: {
      title: t("pages.Courses"),
      description: t("pages.Courses_description"),
      url: `https://h-platform.online/${locale}/courses`,
      type: "website",
      siteName: "H Platform",
      images: [
        {
          url: "https://www.h-platform.online/scema.png",
          width: 1200,
          height: 630,
          alt: "H Platform Courses Preview",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("pages.Courses"),
      description: t("pages.Courses_description"),
      images: [{ url: "https://www.h-platform.online/scema.png" }],
    },
  };
}
const CoursessPage = () => {
  const t = useTranslations("translation");

  const token = false;
  return (
    <div>
      <HeroHeader
        title={t("course-header.title1")}
        description={t("course-header.title2")}
        buttonText={t("course-header.title3")}
      />
      <Suspense fallback={<Loaders />}>
        <CoursesComponent />
      </Suspense>
      <WhyDifferentSection />
      {!token ? <GetStarted /> : <ComplaintsSections />}
    </div>
  );
};

export default CoursessPage;
