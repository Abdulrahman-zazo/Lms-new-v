"use client";
import { Facebook, Instagram, Send, Youtube } from "react-feather";

import { useTranslations } from "next-intl";

import LanguageSwitcher from "../LanguageSwitcher"; // تأكد من أن هذا المكون موجود
import { Contact } from "@/types";
import Link from "next/link";

const Footer = ({ contact }: { contact: Contact }) => {
  const t = useTranslations("translation");

  return (
    <footer className="bg-primary text-white py-10 px-4 sm:px-16 text-sm">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* عمود: شعار ووصف */}
        <div>
          <h3 className="font-semibold text-lg  sm:text-2xl mb-2">
            H-PLATFORM
          </h3>
          <p className="text-sm sm:text-base opacity-90 mb-4">
            {t("footer.slogan")}
          </p>
          <div className="flex gap-2 text-white text-base">
            {contact?.facebook_url && (
              <a
                title="H-platform on Facebook"
                href={contact?.facebook_url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-bg-icon p-2 rounded-full hover:text-primary"
              >
                <Facebook size={18} />
              </a>
            )}
            {contact?.instagram_url && (
              <a
                title="H-platform on twitter"
                href={contact?.instagram_url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-bg-icon p-2 rounded-full hover:text-primary"
              >
                <Instagram size={18} />
              </a>
            )}
            {contact?.youtube_url && (
              <a
                title="H-platform on youtube"
                href={contact?.youtube_url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-bg-icon p-2 rounded-full hover:text-primary"
              >
                <Youtube size={18} />
              </a>
            )}
            {contact?.telegram_url && (
              <a
                title="H-platform on Facebook"
                href={contact?.telegram_url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-bg-icon p-2  rounded-full hover:text-primary"
              >
                <Send size={18} />
              </a>
            )}
            {contact?.twitter_url && (
              <a
                title="H-platform on twitter"
                href={contact?.twitter_url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-bg-icon p-2  rounded-full hover:text-primary"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  id="twitter"
                  width="18"
                  height="18"
                  fill="none"
                  viewBox="0 0 512 512"
                >
                  <g clipPath="url(#clip0_84_15698)">
                    <rect width="512" height="512" fill="#" rx="60"></rect>
                    <path
                      fill="#fff"
                      d="M355.904 100h52.928L293.2 232.16 429.232 412H322.72l-83.424-109.072L143.84 412H90.88l123.68-141.36L84.065 100H193.28l75.408 99.696zm-18.576 280.32h29.328L177.344 130.016h-31.472z"
                    ></path>
                  </g>
                  <defs>
                    <clipPath id="clip0_84_15698">
                      <path fill="#fff" d="M0 0h512v512H0z"></path>
                    </clipPath>
                  </defs>
                </svg>
              </a>
            )}

            {contact?.tiktok_url && (
              <a
                title="H-platform on tiktok"
                href={contact?.tiktok_url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-bg-icon p-2  rounded-full hover:text-primary"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-white "
                  width="18"
                  height="18"
                  viewBox="0 0 32 32"
                >
                  <path
                    fill="#fff"
                    className="hover:text-primary"
                    d="M16.656 1.029c1.637-.025 3.262-.012 4.886-.025a7.76 7.76 0 0 0 2.189 5.213l-.002-.002A8.77 8.77 0 0 0 29 8.45l.028.002v5.036a13.3 13.3 0 0 1-5.331-1.247l.082.034a15.4 15.4 0 0 1-2.077-1.196l.052.034c-.012 3.649.012 7.298-.025 10.934a9.5 9.5 0 0 1-1.707 4.954l.02-.031c-1.652 2.366-4.328 3.919-7.371 4.011h-.014a9.071 9.071 0 0 1-5.139-1.31l.04.023C5.05 28.185 3.32 25.603 3 22.6l-.004-.041a23 23 0 0 1-.012-1.862c.49-4.779 4.494-8.476 9.361-8.476q.822.001 1.604.136l-.056-.008c.025 1.849-.05 3.699-.05 5.548a4.29 4.29 0 0 0-5.465 2.619l-.009.03c-.133.427-.21.918-.21 1.426q0 .31.037.61l-.002-.024a4.26 4.26 0 0 0 4.382 3.586h-.009a4.2 4.2 0 0 0 3.451-1.994l.01-.018c.267-.372.45-.822.511-1.311l.001-.014c.125-2.237.075-4.461.087-6.698.012-5.036-.012-10.06.025-15.083z"
                  ></path>
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* عمود: روابط أساسية */}
        <div className="flex flex-col gap-2  text-xs sm:text-sm">
          <Link href={"/about-us"} className="hover:text-bg-icon">
            {t("footer.aboutus")}
          </Link>
          <Link href={"/about-us/#instructor"} className="hover:text-bg-icon">
            {t("userMenu.join")}
          </Link>
          <Link href={"/courses"} className="hover:text-bg-icon">
            {t("footer.courses")}
          </Link>
          <Link href={"/curricula"} className="hover:text-bg-icon">
            {t("footer.curricula")}
          </Link>
        </div>

        {/* عمود: روابط قانونية ودعم */}
        <div className="flex flex-col gap-2  text-xs sm:text-sm">
          {/* <Link href="/" className="hover:text-bg-icon">
            {t("footer.help_center")}
          </Link> */}
          <Link href={"/h-platform-term"} className="hover:text-bg-icon">
            {t("footer.term")}
          </Link>
          <Link
            href={"/h-platform-privacy-policy"}
            className="hover:text-bg-icon"
          >
            {t("footer.privacy")}
          </Link>
          <LanguageSwitcher />
        </div>
      </div>

      {/* خط فاصل + حقوق النشر */}
      <div className="border-t border-white/10 mt-8 pt-4 text-center  text-xs sm:text-sm font-normal opacity-80">
        Designed by VegusCode, 2025, All rights reserved
      </div>
    </footer>
  );
};

export default Footer;
