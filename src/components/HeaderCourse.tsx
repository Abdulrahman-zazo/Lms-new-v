"use client";
import HeaderCourseClient from "./HeaderCourseClient";
import { useLocale, useTranslations } from "next-intl";

// تعريف خصائص المكون
interface HeaderCourseProps {
  title: string;
  description: string;
  hours?: string;
  type: string;
}

const HeaderCourse = ({
  title,
  description,
  hours,
  type,
}: HeaderCourseProps) => {
  const t = useTranslations("translation");
  const locale = useLocale();
  const isRTL = locale === "ar";

  // 2. تجهيز البيانات لتمريرها
  const whatsappMessage = encodeURIComponent(
    `مرحبًا،\nأرغب بالحصول على مزيد من التفاصيل حول كورس "${title}".\nهل ما زال التسجيل متاحًا؟ وما هي المواعيد والتكاليف؟\nشكرًا لكم.`
  );

  const enrollText = t("buttons.eroll");

  return (
    <HeaderCourseClient
      title={title}
      description={description}
      hours={hours}
      type={type}
      isRTL={isRTL}
      whatsappMessage={whatsappMessage}
      enrollText={enrollText}
    />
  );
};

export default HeaderCourse;
