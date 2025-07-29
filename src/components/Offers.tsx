"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { useGetAllOfferQuery } from "@/lib/Redux/features/Offer/OfferApi"; // تأكد من المسار
import { useGetContactQuery } from "@/lib/Redux/features/Contacts/contactApi"; // تأكد من المسار

import CourseCard from "./Ui/courseCard"; // تأكد من أن هذا المكون معدّل لـ Next.js
import SkeletonCustom from "./Skeleton";
import HandelError from "./HandelError";
import { ICourse } from "@/types";
interface IOffer {
  id: number;
  name: string;
  description: string;
  cost?: string;
  courses: ICourse[];
}
const Offers = () => {
  // --- 1. جلب البيانات والترجمة (يبقى كما هو) ---
  const t = useTranslations("translation");
  const { data, isLoading, isError } = useGetAllOfferQuery({});
  const { data: contactData } = useGetContactQuery();

  const offers: IOffer[] = data?.Offers;
  const contact = contactData?.Contact[0];

  // --- 2. إدارة الحالة (تبقى كما هي) ---
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  // --- 3. عرض حالات التحميل والخطأ (يبقى كما هو) ---
  if (isLoading) {
    return <SkeletonCustom type="h-card" />;
  }
  if (isError) {
    return <HandelError />;
  }

  // --- 4. واجهة المستخدم (JSX) مع التعديلات الطفيفة ---
  return (
    <div className="bg-white">
      <section>
        <div className="max-w-[90%] sm:max-w-[1240px] mx-auto px-4 sm:px-6 py-16">
          {offers.length > 0 ? (
            <>
              <h2 className="text-xl sm:text-2xl text-text font-semibold text-center mb-10">
                {t("offer.title")}
              </h2>

              <div className="space-y-4">
                {offers.length > 0 &&
                  offers.map(
                    (offer, index) =>
                      offer?.courses.length > 0 && (
                        <div
                          key={offer.id}
                          className="border border-gray-200 rounded-lg overflow-hidden shadow-sm"
                        >
                          <div
                            onClick={() => toggle(index)}
                            className="w-full flex justify-between items-center px-4 py-4 text-sm sm:text-base font-medium cursor-pointer text-text hover:bg-bg-purple transition"
                          >
                            <div>
                              <h3 className="text-base sm:text-lg font-semibold my-2">
                                {offer.name}
                              </h3>
                              <p className="text-sm sm:text-base">
                                {offer.description}
                              </p>
                            </div>
                            <a
                              href={`https://wa.me/${
                                contact?.whatsapp_num
                              }?text=${encodeURIComponent(
                                `مرحبًا، أرغب بالحصول على مزيد من التفاصيل حول عرض: "${offer.name}".`
                              )}`}
                              onClick={(e) => e.stopPropagation()} // يمنع فتح/غلق الأكورديون عند الضغط على الزر
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={t("offer.button")}
                              title={t("offer.button")}
                              className="text-white hidden sm:inline bg-primary px-8 py-3 rounded-lg shadow-md hover:bg-primary/80 transition-colors duration-300 text-sm"
                            >
                              {t("offer.button")}
                            </a>
                          </div>

                          <AnimatePresence initial={false}>
                            {openIndex === index && (
                              <motion.div
                                key="content"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{
                                  duration: 0.3,
                                  ease: "easeInOut",
                                }}
                                className="overflow-hidden"
                              >
                                <div className="px-4 pb-4 border-t border-gray-200">
                                  <p className="mx-2 my-4 text-paragraph/80 text-sm sm:text-base">
                                    {t("offer.lable")}
                                  </p>
                                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {offer.courses.map((course: ICourse) => (
                                      <CourseCard
                                        key={course.id}
                                        // ... props for CourseCard
                                        id={course.id}
                                        title={course.name}
                                        image={course.image}
                                        summary={course.summary}
                                        description={course.description}
                                        link={`/courses`} // استخدام رابط مناسب
                                      />
                                    ))}
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )
                  )}
              </div>
            </>
          ) : (
            <div>
              <p className="text-sm sm:text-base text-neutral-500 text-center">
                {t("offer.NoOffer")}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Offers;
