import Link from "next/link";
import { useTranslations } from "next-intl";

const GetStarted = () => {
  const t = useTranslations("translation");

  return (
    <>
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 py-8 sm:py-16">
        {/* Title */}
        <div className="w-[90%] mx-auto flex flex-col items-center">
          <h2 className="text-lg sm:text-2xl lg:text-3xl font-semibold  text-center mb-4 sm:mb-6">
            {t("Get_started.title1")}
          </h2>
          <p className="text-sm sm:text-base text-paragraph text-center max-w-[90%] ">
            {t("Get_started.title2")}
          </p>

          <Link
            aria-label={t("Get_started.title3")}
            title={t("Get_started.title3")}
            href={"/login"}
            className="bg-primary  text-white text-sm sm:text-base px-8 py-4 my-4 rounded hover:bg-primary/80 transition"
          >
            {t("Get_started.title3")}🚀!
          </Link>
        </div>
      </section>
    </>
  );
};

export default GetStarted;
