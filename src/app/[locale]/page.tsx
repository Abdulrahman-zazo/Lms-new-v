import { ArrowRightCircle } from "react-feather";
import React, { Suspense } from "react";
import HeroHome from "@/components/Ui/HeroHome";
import { Loaders } from "@/components/Loader";
import WhyDifferentSection from "@/components/Ui/WhyDifferent";
import CoursesComponent from "@/components/Ui/Courses";
import { useTranslations } from "next-intl";
import Link from "next/link";
import HowItWorksSection from "@/components/Ui/HowItWorks";
import FaqSection from "@/components/Ui/FAQ";
import GetStarted from "@/components/Ui/GetStarted";

const HomePage = () => {
  const t = useTranslations("translation");

  return (
    <>
      <HeroHome />
      <WhyDifferentSection />
      <Suspense fallback={<Loaders />}>
        <div className="bg-bg-purple py-2 ">
          <CoursesComponent max={6} />
          <div className="flex flex-col items-center">
            <Link
              title={t("Courses.more")}
              aria-label={t("Courses.more")}
              href={"/courses"}
              className="text-primary text-sm sm:text-base mb-12 p-4 flex items-center gap-4 cursor-pointer hover:text-primary/80 "
            >
              <span>
                <ArrowRightCircle />
              </span>
              <span>{t("Courses.more")}</span>
            </Link>
          </div>
        </div>
      </Suspense>
      <HowItWorksSection />
      <FaqSection />
      <GetStarted />
    </>
  );
};

export default HomePage;
