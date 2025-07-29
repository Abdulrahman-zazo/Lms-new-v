import { getTranslations } from "next-intl/server";

export default async function Terms() {
  const t = await getTranslations("translation");
  return (
    <div className="w-5/6 m-auto my-10 ">
      <h1 className="sm:mb-6 text-center text-lg sm:text-2xl lg:text-3xl font-semibold  ">
        {t("term.title")}
      </h1>

      <div className="border [border-image:linear-gradient(to_right,transparent,theme(colors.slate.300/.8),transparent)1] mt-6" />

      <p className="font-semibold mt-6 sm:mt-12">{t("term.text")}</p>
      <span className=" text-sm md:text-base text-neutral-600 py-4 block leading-5 sm:leading-6">
        {t("term.introduction")}
      </span>

      <ol className="sm:m-4 list-decimal">
        <li>
          <p className="font-semibold my-4">{t("term.definitions")}</p>
          <ol className="list-disc sm:m-4  text-sm md:text-base text-neutral-600 leading-5 sm:leading-6">
            <li>{t("term.platform")}</li>
            <li>{t("term.user")}</li>
            <li>{t("term.services")}</li>
            <li>{t("term.content")}</li>
          </ol>
        </li>

        <li>
          <p className="font-semibold my-4">{t("term.platform_use")}</p>
          <ol className="list-disc  sm:m-4   text-sm md:text-base text-neutral-600 leading-5 sm:leading-6">
            <li>{t("term.registration")}</li>
            <li>{t("term.responsibility")}</li>
            <li>{t("term.legal_use")}</li>
          </ol>
        </li>

        <li>
          <p className="font-semibold my-4">
            {" "}
            {t("term.intellectual_property_rights")}{" "}
          </p>
          <ol className="list-disc sm:m-4   text-sm md:text-base text-neutral-600 leading-5 sm:leading-6">
            <li>{t("term.ownership")}</li>
            <li>{t("term.personal_use")}</li>
          </ol>
        </li>

        <li>
          <p className="font-semibold my-4">{t("term.liability")}</p>
          <ol className="list-disc sm:m-4   text-sm md:text-base text-neutral-600 leading-5 sm:leading-6">
            <li>{t("term.disclaimer")}</li>
          </ol>
        </li>

        <li>
          <p className="font-semibold my-4">{t("term.edit")} </p>
          <ol className="list-disc  sm:m-4   text-sm md:text-base text-neutral-600 leading-5 sm:leading-6">
            <li>{t("term.modifications")}</li>
          </ol>
        </li>

        <li>
          <p className="font-semibold my-4"> {t("term.contact")}</p>
          <ol className="list-disc  sm:m-4  text-sm md:text-base text-neutral-600 leading-5 sm:leading-6 ">
            <li>
              {t("term.contact_us")}{" "}
              <a
                title="https://www.veguscode.com"
                className="text-primary"
                href="https://www.veguscode.com"
              >
                www.veguscode.com
              </a>
            </li>
          </ol>
        </li>
      </ol>
    </div>
  );
}
