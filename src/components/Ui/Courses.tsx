"use client"; // <== ضروري بسبب استخدام الـ Hooks

import { useTranslations } from "next-intl";
import { useGetAllCoursesQuery } from "@/lib/Redux/features/Courses/CoursesApi";

import CourseCard from "./courseCard";
import HandelError from "../HandelError";
import SkeletonCustom from "../Skeleton";

interface IcourseMax {
  max?: number;
}
export interface IcourseCard {
  // <== يفضل تصديرها إذا كان CourseCard يحتاجها
  id: number;
  name: string;
  description: string;
  image: string;
  summary: string;
}

const CoursesComponent = ({ max }: IcourseMax) => {
  const t = useTranslations("translation"); // <== استخدام hook الترجمة الجديد وتحديد النطاق

  const { data, isLoading, isError } = useGetAllCoursesQuery({});

  if (isLoading) {
    return <SkeletonCustom type="card" />;
  }
  if (isError) {
    return <HandelError />;
  }

  return (
    <section className="bg-bg-purple px-4 sm:px-8 py-8 sm:py-16">
      <div className="mx-auto w-[90%] max-w-[1440px]">
        {/* Header */}
        <div className="mb-4 sm:mb-10">
          <h2 className="text-2xl sm:text-2xl lg:text-4xl font-semibold sm:mb-4 leading-10 sm:leading-14">
            {t("Courses.title")}
            <br />
            <span className="text-primary">{t("Courses.slogan")}</span>
          </h2>
          <p className="text-sm sm:text-base text-paragraph max-w-2xl">
            {t("Courses.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-0">
          {data?.courses.slice(0, max).map((course: IcourseCard) => (
            <CourseCard
              key={course.id}
              id={course.id}
              description={course.description}
              summary={course.summary}
              title={course.name}
              image={course.image}
              // تأكد من أن مكون CourseCard يستخدم <Link> من 'next-intl/link'
              link={`/courses`}
            />
          ))}
        </div>

        {data?.courses.length === 0 && (
          <div className="flex justify-center py-12">
            <p className="text-xs sm:text-base text-neutral-500">
              {t("Courses.Nocourse")}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CoursesComponent;
