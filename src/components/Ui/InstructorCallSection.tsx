import { getContactData } from "@/lib/Redux/contacts";
import { getTranslations } from "next-intl/server";
import ScrollToHash from "../ScrollToHash";

const InstructorCallSection = async () => {
  // Fetch translations and data on the server
  const t = await getTranslations("translation");
  const contact = await getContactData();

  const whatsappMessage = encodeURIComponent(
    "مرحبًا، أرغب بالانضمام كمدرّب على منصتكم، اريد المزيد من التفاصيل."
  );

  return (
    <div>
      <ScrollToHash />
      <section
        id="instructor"
        className="max-w-[1440px] bg-bg-purple mx-auto px-4 sm:px-8 py-8 sm:py-16"
      >
        <div className="w-[90%] mx-auto flex flex-col items-center">
          <h2 className="text-lg sm:text-2xl lg:text-3xl font-semibold text-center mb-4 sm:mb-6">
            {t("Instructor.title1")}
          </h2>
          <p className="text-sm sm:text-base text-paragraph text-center my-2 sm:max-w-[40%]">
            {t("Instructor.title2")}
          </p>

          <a
            href={`https://wa.me/${contact?.whatsapp_num}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            title={t("Instructor.title3")}
            className="bg-primary text-white text-sm sm:text-base shadow-sm px-8 py-4 my-4 rounded-lg hover:bg-primary/80 transition"
          >
            {t("Instructor.title3")}
          </a>
        </div>
      </section>
    </div>
  );
};

export default InstructorCallSection;
