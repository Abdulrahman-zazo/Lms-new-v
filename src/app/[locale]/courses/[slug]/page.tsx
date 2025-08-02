"use client";
import { CourseInfo } from "@/components/CourseInfo";
import HandelError from "@/components/HandelError";
import HeaderCourse from "@/components/HeaderCourse";
import { Reviews } from "@/components/Reviews";
import SkeletonCustom from "@/components/Skeleton";
import ComplaintsSections from "@/components/Ui/Complaints";
import { useGetContactQuery } from "@/lib/Redux/features/Contacts/contactApi";
import { useGetCourseByIdQuery } from "@/lib/Redux/features/Courses/CoursesApi";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const CoursePage = () => {
  const [activeTab, setActiveTab] = useState<"info" | "reviews">("info");
  const params = useSearchParams();

  const id: string | null = params?.get("id");

  const { data, isLoading, isError } = useGetCourseByIdQuery(id || "");
  const t = useTranslations("translation");
  const whatsappMessage = encodeURIComponent(
    `مرحبًا،\nأرغب بالحصول على مزيد من التفاصيل حول كورس "${data?.course.name}".\nهل ما زال التسجيل متاحًا؟ وما هي المواعيد والتكاليف؟\nشكرًا لكم.`
  );
  const { data: ContactsData } = useGetContactQuery();
  if (isLoading) {
    return <SkeletonCustom type="list" />;
  }
  if (isError) {
    return <HandelError />;
  }

  return (
    <div className="container mx-auto p-4">
      <HeaderCourse
        // material={data?.course.material}
        title={data?.course.name}
        description={data?.course.summary}
        type={data?.course.type}
        hours={data?.course.hours}
      />
      <div className="flex justify-center my-8">
        {/* Main content area */}
        <div className="bg-white rounded-lg overflow-hidden  sm:w-[90%] lg:flex">
          <div className="lg:w-1/2 p-6">
            <Image
              loading="lazy"
              width={400}
              height={300}
              src={data?.course.image}
              alt="Boy learning web development"
              className="w-full h-[300px] object-cover rounded-md mb-2"
            />

            {/* Tab Navigation */}
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                <button
                  aria-label={t("Courses.Course_info")}
                  title={t("Courses.Course_info")}
                  onClick={() => setActiveTab("info")}
                  className={`${
                    activeTab === "info"
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-xs sm:text-sm`}
                >
                  {t("Courses.Course_info")}
                </button>
                <button
                  aria-label={t("Courses.comments")}
                  title={t("Courses.comments")}
                  onClick={() => setActiveTab("reviews")}
                  className={`${
                    activeTab === "reviews"
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-xs sm:text-sm`}
                >
                  {t("Courses.comments")}({data?.course.comments.length})
                </button>
              </nav>
            </div>

            {/* Tab Content */}
            <div className="mt-6">
              {activeTab === "info" ? (
                <CourseInfo description={data?.course.description} />
              ) : (
                <Reviews
                  comments={data?.course.comments}
                  course_id={data?.course.id}
                />
              )}
            </div>
          </div>

          {/* Right Section (What You'll Learn, Material Includes, Requirements) */}
          <div className="lg:w-1/2 sm:border border-gray-200 p-0 sm:p-8 m-6 rounded-2xl">
            <h3 className="text-sm md:text-base  font-semibold text-text mb-4">
              {t("Courses.what_we_learn")}
            </h3>
            <ul className="list-disc list-inside text-paragraph text-sm md:text-base space-y-2 mb-6">
              <li>{data?.course.contents}</li>
            </ul>

            <h3 className="text-sm md:text-base  font-semibold text-text mb-4">
              {t("Courses.content_course")}
            </h3>
            <ul className="list-disc list-inside text-paragraph text-sm md:text-base space-y-2 mb-6">
              <li>{data?.course.hours} ساعة.</li>
              {data?.course.material && <li>{data?.course.material}</li>}
            </ul>

            <h3 className="text-sm md:text-base  font-semibold text-text mb-4">
              {t("Courses.requairment")}
            </h3>
            <ul className="list-disc list-inside text-paragraph text-sm md:text-base space-y-2 mb-6">
              <li>{data?.course.requirements}</li>
            </ul>

            <Link
              href={`https://wa.me/${ContactsData?.Contact[0]?.whatsapp_num}?text=${whatsappMessage}`}
              title={t("Courses.button_free")}
              target="_blank"
              className="w-full bg-primary text-sm md:text-base text-white py-3 px-4 rounded-md hover:bg-primary/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50 cursor-pointer"
            >
              {t("Courses.button_free")}
            </Link>
          </div>
        </div>
      </div>
      <ComplaintsSections />
    </div>
  );
};

export default CoursePage;
