"use client";

import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { X, Menu, LogOut } from "react-feather";
import Logo from "./Logo";
import UserMenu from "../userMenu";

import { LogoutHandler } from "../LogoutHandler";
import { useGetuserInformationQuery } from "@/lib/Redux/features/User/userApi";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useAuth } from "../AuthContext";
// import { cookies } from "next/headers";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { ref, inView } = useInView({ threshold: 0 });
  const t = useTranslations("translation");
  const { token } = useAuth();
  const { data, isLoading } = useGetuserInformationQuery(token as string);

  return (
    <>
      <div ref={ref} className="h-[1px]" />
      <header
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ease-in-out  px-4 sm:px-8 py-4
        ${!inView ? "bg-white shadow-sm  rounded-b-xl" : "bg-white  "}
        `}
      >
        <div className="max-w-[1440px] mx-auto flex justify-between items-center px-0 sm:px-8">
          {/* Logo */}
          <Link href={"/"} className={"mx-4"}>
            <Logo type="h" className="w-28 lg:w-32 h-full" />
          </Link>

          {/* Desktop Nav */}
          <nav
            className={`hidden mx-2 md:hidden lg:flex items-center gap-2 lg:gap-6 font-medium text-paragraph md:text-xs  lg:text-sm `}
          >
            <Link href={"/"}>{t("Header.Home")}</Link>
            <Link href={"/about-us"}>{t("Header.About")}</Link>
            <Link href={"/courses"}>{t("Header.Courses")}</Link>
            <Link href={"/curricula"}>{t("Header.Curricula")}</Link>
            <Link href={"/offers"}>{t("Header.offer")}</Link>
            <Link href={"/#faq"}>{t("Header.FAQ")}</Link>
          </nav>

          {/* Auth buttons */}
          {!token && (
            <div className="hidden md:hidden lg:flex gap-3">
              <Link
                className="text-xs lg:text-sm px-2 py-1.5 text-primary"
                href={"/login"}
              >
                {t("Header.login")}
              </Link>
              <Link
                className="bg-primary text-white px-4 py-1.5 rounded text-xs lg:text-sm"
                href={"/get-started"}
              >
                {t("Header.Register")}
              </Link>
            </div>
          )}

          {token && !isLoading && (
            <div className="hidden lg:inline">
              <UserMenu
                name={data?.user.name}
                email={data?.user.email}
                avatar={data?.user.image}
              />
            </div>
          )}
          {token && isLoading && (
            <div className="hidden lg:flex gap-4 items-center rounded animate-pulse">
              <div className="flex flex-col ">
                <div className="w-32 h-4 bg-gray-200 mb-2 rounded-md" />
                <div className="w-28 h-3 bg-gray-200 rounded-md" />
              </div>
              <div className="h-8 w-8 rounded-full bg-gray-200" />
            </div>
          )}

          {/* Mobile Hamburger */}
          <div className="lg:hidden text-2xl text-gray-700 flex items-center gap-2">
            {token && !isLoading && (
              <UserMenu
                name={data?.user.name}
                email={data?.user.email}
                avatar={data?.user.image}
              />
            )}

            <button
              title={menuOpen ? "Close" : "Open"}
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 cursor-pointer"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden mt-3 bg-white rounded-md shadow px-4 py-3 space-y-2">
            {/* Links */}
            <nav className="flex flex-col text-sm font-medium text-gray-700 space-y-3">
              <Link href={"/"} onClick={() => setMenuOpen(false)}>
                {t("Header.Home")}
              </Link>
              <Link href={"/about-us"} onClick={() => setMenuOpen(false)}>
                {t("Header.About")}
              </Link>
              <Link href={"/courses"} onClick={() => setMenuOpen(false)}>
                {t("Header.Courses")}
              </Link>
              <Link href={"/curricula"} onClick={() => setMenuOpen(false)}>
                {t("Header.Curricula")}
              </Link>
              <Link href={"/offers"} onClick={() => setMenuOpen(false)}>
                {t("Header.offer")}
              </Link>
              <Link href={"/#faq"} onClick={() => setMenuOpen(false)}>
                {t("Header.FAQ")}
              </Link>

              {token && (
                <div className="flex justify-center items-center rounded-lg my-2 py-2 bg-red-100/40 w-full">
                  <button
                    onClick={() => LogoutHandler()}
                    className="px-4 w-full py-2 flex items-center justify-center text-red-600"
                  >
                    <LogOut size={16} className="mx-2" />
                    <span>{t("userMenu.logout")}</span>
                  </button>
                </div>
              )}
            </nav>

            {!token && (
              <div className="flex flex-col gap-3 text-sm md:text-base pt-4">
                <Link href={"/login"} onClick={() => setMenuOpen(false)}>
                  {t("Header.login")}
                </Link>
                <Link
                  href={"/get-started"}
                  onClick={() => setMenuOpen(false)}
                  className="bg-primary text-white px-4 py-1.5 rounded"
                >
                  {t("Header.Register")}
                </Link>
              </div>
            )}
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
