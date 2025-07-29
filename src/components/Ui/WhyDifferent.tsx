"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

const Image3 =
  "https://res.cloudinary.com/dmn6uzy82/image/upload/f_auto,q_auto/v1749856799/Puzzle_lnqqiy.png";
const Image2 =
  "https://res.cloudinary.com/dmn6uzy82/image/upload/f_auto,q_auto/v1749856799/Popular_Man_vjk9zy.png";
const Image1 =
  "https://res.cloudinary.com/dmn6uzy82/image/upload/f_auto,q_auto/v1749856799/Online_Support_txel1z.png";

const WhyDifferentSection = () => {
  const t = useTranslations("translation");

  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-8 py-6 sm:py-12">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center mx-auto w-[90%]">
          <div className="  ">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-12 font-semibold sm:mb-4">
              {t("why.why_we")}
              <span className="text-primary mx-1">{t("why.Differenet")}</span>
            </h2>
            <p className="text-paragraph text-sm  sm:text-base">
              {t("why.subtitle")}
            </p>
          </div>

          <div className="bg-bg-purple-light px-4 py-8 w-full h-full   flex flex-col items-start rounded-xl  hover:shadow-sm transition">
            <div className="relative  h-12  w-12 mb-2  ">
              <Image
                fill
                quality={90}
                priority
                sizes="(max-width: 768px) 250px, 400px"
                src={Image3}
                alt="دعم فوري بلا انتظار"
              />
            </div>
            <h3 className="font-semibold text-base sm:text-lg  my-2">
              {t("why.key3")}
            </h3>
            <p className="text-sm md:text-base text-paragraph">
              {t("why.value3")}
            </p>
          </div>

          <div className="bg-bg-green-light px-4 py-8   w-full h-full  flex flex-col items-start  rounded-xl  hover:shadow-sm transition">
            <div className="relative  h-12  w-12 mb-2  ">
              <Image
                fill
                quality={90}
                priority
                sizes="(max-width: 768px) 250px, 400px"
                src={Image2}
                alt="مدربون خبراء"
              />
            </div>
            <h3 className="font-semibold text-base sm:text-lg  my-2">
              {t("why.key2")}
            </h3>
            <p className="text-sm md:text-base text-paragraph">
              {t("why.value2")}
            </p>
          </div>

          <div className="bg-bg-beby-light px-4 py-8  w-full h-full  flex flex-col items-start rounded-xl  hover:shadow-sm transition">
            <div className="relative  h-12  w-12 mb-2  ">
              <Image
                src={Image1}
                fill
                quality={90}
                priority
                sizes="(max-width: 768px) 250px, 400px"
                alt="تعلّم مهارات جديدة"
              />
            </div>

            <h3 className="font-semibold text-base sm:text-lg  my-2">
              {t("why.key1")}
            </h3>
            <p className="text-sm md:text-base text-paragraph">
              {t("why.value1")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyDifferentSection;
