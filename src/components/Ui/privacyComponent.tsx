import { getTranslations } from "next-intl/server";

export default async function PrivacyComponent() {
  const t = await getTranslations("translation");
  return (
    <div className="w-5/6 m-auto my-10   ">
      <h2 className="mb-6 text-center text-text text-lg sm:text-2xl lg:text-3xl font-semibold ">
        {t("privacy.text")}
      </h2>

      <div className="border [border-image:linear-gradient(to_right,transparent,theme(colors.slate.300/.8),transparent)1] mt-6" />
      <p className="font-semibold mt-8 sm:mt-12 "> {t("privacy.title")}</p>
      <span className="text-sm md:text-base text-paragraph   py-4 block leading-5 sm:leading-6">
        {t("privacy.introduction")}
      </span>

      <ol className=" sm:m-4  list-decimal">
        <li>
          <p className="font-semibold text-base my-4">
            {t("privacy.collected_information")}
          </p>
          <ol className="list-disc sm:m-4 text-sm md:text-base text-paragraph leading-5 sm:leading-6">
            <li>{t("privacy.personal_information")}</li>
            <li>{t("privacy.usage_data")}</li>
          </ol>
        </li>

        <li>
          <p className="font-semibold my-4">
            {t("privacy.usage_of_information")}
          </p>
          <ol className="list-disc  sm:m-4  text-sm md:text-base text-paragraph leading-5 sm:leading-6">
            <li>{t("privacy.service_provision")}</li>
            <li>{t("privacy.platform_improvement")}</li>
            <li>{t("privacy.communication")}</li>
          </ol>
        </li>

        <li>
          <p className="font-semibold my-4">
            {t("privacy.information_sharing")}
          </p>
          <ol className="list-disc  sm:m-4  text-sm md:text-base text-paragraph leading-5 sm:leading-6">
            <li>{t("privacy.service_providers")}</li>
          </ol>
        </li>

        <li>
          <p className="font-semibold my-4">{t("privacy.security")}</p>
          <ol className="list-disc  sm:m-4  text-sm md:text-base text-paragraph leading-5 sm:leading-6">
            <li>{t("privacy.data_security")}</li>
          </ol>
        </li>

        <li>
          <p className="font-semibold my-4">{t("privacy.your_rights")}</p>
          <ol className="list-disc  sm:m-4  text-sm md:text-base text-paragraph leading-5 sm:leading-6">
            <li>{t("privacy.title1")}</li>
            <li>{t("privacy.title2")}</li>
            <li>{t("privacy.title3")}</li>
            <li>{t("privacy.title4")}</li>
          </ol>
        </li>

        <li>
          <p className="font-semibold my-4">{t("privacy.policy_changes")}</p>
          <ol className="list-disc  sm:m-4  text-sm md:text-base text-paragraph leading-5 sm:leading-6">
            <li>{t("privacy.text1")}</li>
          </ol>
        </li>

        <li>
          <p className="font-semibold my-4"> {t("privacy.contact_us")}</p>
          <ol className="list-disc  sm:m-4  text-sm md:text-base text-paragraph">
            <li>
              {t("privacy.contact")}
              <a
                title={t("privacy.whats")}
                className="text-primary mx-2"
                href="https://wa.me/+963958263253?text=مرحباً، لدي استفسار بخصوص سياسة الخصوصية"
              >
                {t("privacy.whats")}
              </a>
            </li>
          </ol>
        </li>
      </ol>
    </div>
  );
}
