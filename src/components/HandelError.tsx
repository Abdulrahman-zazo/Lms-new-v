"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";

const HandelError = () => {
  const t = useTranslations("translation");

  const navigations = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
          />
        </svg>
      ),
      title: t("Header.Home"),
      desc: t("error.back"),
      to: "/",
    },
  ];

  return (
    <main>
      <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-start h-screen md:px-8">
        <div className="max-w-lg mx-auto text-gray-600">
          <div className="space-y-3 text-center">
            <p className="text-gray-800 text-xl font-semibold sm:text-2xl">
              {t("error.noInternet")}
            </p>
            <p className="text-sm">{t("error.noInternet2")}</p>
          </div>
          <div className="mt-12">
            <ul className="divide-y">
              {navigations.map((item, idx) => (
                <li key={idx} className="flex gap-x-4 py-6">
                  <div className="flex-none w-14 h-14 bg-indigo-50 rounded-full text-primary flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-gray-800 font-medium text-base sm:text-lg">
                      {item.title}
                    </h4>

                    <Link
                      href={item.to}
                      className="text-sm sm:text-base text-primary duration-150 hover:text-indigo-400 font-medium inline-flex items-center gap-x-1"
                    >
                      {item.desc}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};
export default HandelError;
