// src/components/CourseView.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { useGetCourseByIdQuery } from "@/lib/Redux/features/Courses/CoursesApi";
import HeaderCourse from "@/components/HeaderCourse"; // نعم، سنستخدمه هنا
import SkeletonCustom from "@/components/Skeleton";
import HandelError from "@/components/HandelError";
import CoursePageClientContent from "./CoursePageClientContent";

const CourseView = () => {
  const params = useSearchParams();
  const id: string | null = params?.get("id");

  // 1. جلب البيانات باستخدام RTK Query Hook
  // نمرر `skip: !id` لنتجنب إرسال طلب إذا لم يكن الـ id موجوداً
  const { data, isLoading, isError, isSuccess } = useGetCourseByIdQuery(
    id || "",
    {
      skip: !id,
    }
  );

  // 2. عرض حالات التحميل والخطأ
  if (isLoading) {
    return <SkeletonCustom type="list" />;
  }

  if (isError || !data) {
    return <HandelError />;
  }

  // 3. عندما تنجح العملية وتوجد البيانات، نعرض كل شيء
  if (isSuccess && data) {
    return (
      <div className="container mx-auto p-4">
        {/* نعرض HeaderCourse هنا ونمرر له البيانات بعد جلبها */}
        <HeaderCourse
          title={data.course.name}
          description={data.course.summary}
          type={data.course.type}
          hours={data.course.hours}
        />

        {/* نعرض باقي محتوى الصفحة في مكون منفصل لتنظيم الكود */}
        <CoursePageClientContent course={data.course} />
      </div>
    );
  }

  // حالة احتياطية
  return null;
};

export default CourseView;
