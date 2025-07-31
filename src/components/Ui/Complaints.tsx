"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";

export default function ComplaintsSections() {
  const t = useTranslations("translation");
  return (
    <>
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 py-8 sm:py-16  ">
        {/* Title */}
        <div className="w-[90%]mx-auto flex flex-col items-center rounded-2xl">
          <h2 className="text-lg sm:text-2xl lg:text-3xl font-semibold text-center mb-4 sm:mb-6">
            {t("complaints.title1")}
          </h2>
          <p className="text-sm lg:text-base text-paragraph text-center sm:max-w-[60%] ">
            {t("complaints.title2")}
          </p>

          <Link
            href="/complaints"
            className="bg-primary text-sm sm:text-base text-white px-5 py-4 my-4 rounded hover:bg-primary/80 transition"
          >
            {t("complaints.title3")}💻!
          </Link>
        </div>
      </section>
    </>
  );
}
