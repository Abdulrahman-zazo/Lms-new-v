"use client";

import { useTranslations } from "next-intl";

import Image from "next/image"; // 1. استيراد مكون الصور المحسن
import { slugify } from "../../utils/Slug"; // ستبقى هذه كما هي
import Link from "next/link";

interface Icourse {
  id: number;
  image: string;
  title: string;
  summary: string;
  link: string;
  btnType?: "link" | "button";
  description: string;
}

const CourseCard = (course: Icourse) => {
  const { btnType = "button", image, title, id, link, summary } = course;
  const t = useTranslations("translation");
  const slug = slugify(title);

  return (
    <div
      key={id}
      className="bg-white rounded-xl overflow-hidden flex flex-col h-full shadow-md"
    >
      <div className="relative h-40 w-full">
        <Image
          src={image}
          alt={title}
          fill // 2. استخدام fill لملء المساحة المتاحة
          className="object-cover"
          quality={90}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-base sm:text-lg mb-2">{title}</h3>
        <div className="text-sm my-2 sm:my-4 sm:text-base text-neutral-700">
          {summary}
        </div>

        {/* 3. استخدام Link وتمرير البيانات كـ search param */}
        <Link
          // href={`${link}/${slug}`
          href={{ query: { id: id }, pathname: `${link}/${slug}` }}
          title={t("buttons.btn-details")}
          aria-label={t("buttons.btn-details")}
          className={`mt-auto w-full text-center text-sm sm:text-base ${
            btnType === "button" ? "bg-primary text-white" : "text-primary"
          } border border-primary px-4 py-2 shadow-md rounded hover:bg-primary/80 hover:text-white transition`}
        >
          {t("buttons.btn-details")}
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;
