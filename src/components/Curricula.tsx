"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useGetAllCurriculumsQuery } from "@/lib/Redux/features/Curriculum/CurriculumApi"; // تأكد من المسار
import { useGetContactQuery } from "@/lib/Redux/features/Contacts/contactApi"; // تأكد من المسار
import type { Curriculum, Stage, Subject } from "@/types"; // تأكد من مسار الأنواع

import SkeletonCustom from "./Skeleton";
import HandelError from "./HandelError";

const Curricula = () => {
  // --- 1. جلب البيانات والترجمة ---
  const t = useTranslations("translation");
  const { data, isLoading, isError } = useGetAllCurriculumsQuery({});
  const { data: contactData } = useGetContactQuery();

  const curricula: Curriculum[] = useMemo(
    () => data?.curriculums ?? [],
    [data]
  );
  const contact = contactData?.Contact[0];

  // --- 2. إدارة الحالة ---
  // نبدأ بحالة فارغة، وسيتم تحديثها عند وصول البيانات
  const [selectedCurriculumId, setSelectedCurriculumId] = useState<
    number | null
  >(null);
  const [stages, setStages] = useState<Stage[]>([]);
  const [selectedStageId, setSelectedStageId] = useState<number | null>(null);
  const [displayedSubjects, setDisplayedSubjects] = useState<Subject[]>([]);

  // --- 3. useEffect لضبط الحالة الأولية بعد جلب البيانات ---
  // هذا هو الإصلاح المهم: ننتظر وصول البيانات ثم نضبط الحالة
  useEffect(() => {
    if (curricula.length > 0 && selectedCurriculumId === null) {
      const initialCurriculum = curricula[0];
      setSelectedCurriculumId(initialCurriculum.id);

      const initialStages = initialCurriculum.pivot.map(({ stage }) => stage);
      setStages(initialStages);

      if (initialStages.length > 0) {
        const initialStage = initialStages[0];
        setSelectedStageId(initialStage.id);

        const initialPivot = initialCurriculum.pivot.find(
          (p) => p.stage.id === initialStage.id
        );
        setDisplayedSubjects(initialPivot?.subject ?? []);
      }
    }
  }, [curricula, selectedCurriculumId]);

  // --- 4. دوال التعامل مع التغيير (تبقى كما هي) ---
  const handleCurriculumChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const curriculumId = parseInt(event.target.value);
    setSelectedCurriculumId(curriculumId);

    const selectedCurriculum = curricula.find((c) => c.id === curriculumId);
    if (selectedCurriculum) {
      const newStages = selectedCurriculum.pivot.map((p) => p.stage);
      setStages(newStages);

      if (newStages.length > 0) {
        const firstStageId = newStages[0].id;
        setSelectedStageId(firstStageId);
        const selectedPivot = selectedCurriculum.pivot.find(
          (p) => p.stage.id === firstStageId
        );
        setDisplayedSubjects(selectedPivot?.subject ?? []);
      } else {
        setSelectedStageId(null);
        setDisplayedSubjects([]);
      }
    }
  };

  const handleStageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const stageId = parseInt(event.target.value);
    setSelectedStageId(stageId);

    const selectedCurriculum = curricula.find(
      (c) => c.id === selectedCurriculumId
    );
    if (selectedCurriculum) {
      const selectedPivot = selectedCurriculum.pivot.find(
        (p) => p.stage.id === stageId
      );
      setDisplayedSubjects(selectedPivot?.subject ?? []);
    }
  };

  // --- 5. عرض حالات التحميل والخطأ ---
  if (isLoading) return <SkeletonCustom type="card" />;
  if (isError) return <HandelError />;

  const selectedCurriculumImage = curricula.find(
    (c) => c.id === selectedCurriculumId
  )?.image;

  // --- 6. واجهة المستخدم (JSX) ---
  return (
    <div className="bg-bg-purple py-6 sm:py-10">
      <div className="container mx-auto p-6 max-w-[90%] lg:max-w-[1240px]">
        <p className="text-sm sm:text-base text-text text-center sm:hidden">
          {t("curricula.select")}
        </p>
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 items-center mt-4 mb-8">
          <p className="text-sm sm:text-base text-text text-center hidden md:block">
            {t("curricula.select")}
          </p>

          {/* Curriculum Select */}
          <div className="relative flex-1 w-full text-sm sm:text-base">
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                {selectedCurriculumImage && (
                  <Image
                    src={selectedCurriculumImage}
                    alt="Curriculum Icon"
                    width={32}
                    height={32}
                    quality={90}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                )}
              </div>
              <select
                id="curriculum-select"
                value={selectedCurriculumId || ""}
                onChange={handleCurriculumChange}
                className="block bg-white w-full pl-12 pr-10 py-3 text-gray-700 rounded-md border border-gray-300 focus:outline-none focus:ring-primary focus:border-primary cursor-pointer appearance-none"
              >
                <option value="" disabled>
                  {t("curricula.curricula_select")}
                </option>
                {curricula.map((curriculum) => (
                  <option key={curriculum.id} value={curriculum.id}>
                    {curriculum.name}
                  </option>
                ))}
              </select>
              {/* Arrow Icon */}
            </div>
          </div>

          {/* Stage Select */}
          <div className="relative flex-1 w-full text-sm sm:text-base">
            <div className="relative rounded-md shadow-sm">
              <select
                id="stage-select"
                value={selectedStageId || ""}
                onChange={handleStageChange}
                disabled={!selectedCurriculumId || stages.length === 0}
                className="block bg-white w-full pl-3 pr-10 py-3 text-gray-700 rounded-md border border-gray-300 focus:outline-none focus:ring-primary focus:border-primary cursor-pointer appearance-none"
              >
                <option value="" disabled>
                  {stages.length === 0
                    ? t("error.Nostage")
                    : t("error.selectStage")}
                </option>
                {stages.map((stage) => (
                  <option key={stage.id} value={stage.id}>
                    {stage.name}
                  </option>
                ))}
              </select>
              {/* Arrow Icon */}
            </div>
          </div>
        </div>

        {/* Displayed Subjects */}
        {displayedSubjects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedSubjects.map((subject) => (
              <div
                key={subject.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={subject.image}
                    alt={subject.name}
                    fill
                    sizes="(max-width: 768px) 250px, 400px"
                    quality={90}
                    className="w-full object-cover h-[200px]"
                  />
                </div>
                <div className="p-4 flex justify-between items-center">
                  <h3 className="text-xm sm:text-base md:text-lg font-semibold text-gray-800 text-center">
                    {subject.name}
                  </h3>
                  <a
                    href={`https://wa.me/${contact?.whatsapp_num}`}
                    title={t("curricula.button")}
                    className="..."
                  >
                    {t("curricula.button")}
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-sm sm:text-base text-gray-500 py-8">
            {selectedCurriculumId === null ? (
              <p>{t("curricula.empty")}</p>
            ) : (
              <p>{t("curricula.empty2")}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Curricula;
