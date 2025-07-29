"use client";

import { useState } from "react";
import { LogOut } from "react-feather";
import { LogoutHandler } from "./LogoutHandler";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { openModal } from "@/lib/Redux/features/settings/settingsModalSlice";
import Link from "next/link";
import { useTranslations } from "next-intl";

interface User {
  name: string;
  avatar: string;
  email: string;
}

const UserMenu = ({ name, avatar, email }: User) => {
  const [open, setOpen] = useState(false);

  const t = useTranslations("translation");
  const dispatch = useDispatch();
  return (
    <div className="relative inline-block text-left " tabIndex={0}>
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 focus:outline-none cursor-pointer hover:opacity-80"
      >
        <div className="sm:flex flex-col items-end hidden ">
          <p className="text-sm  font-medium text-paragraph">{name}</p>
          <p className="text-xs font-medium text-neutral-500">{email}</p>
        </div>
        <div className="relative w-8 h-8 rounded-full  cursor-pointer ">
          <Image
            fill
            sizes="(max-width: 200px) 100px, 50px"
            quality={90}
            priority
            src={avatar}
            alt="Avatar"
            className="object-cover rounded-full "
          />
        </div>
      </div>

      {open && (
        <div className="absolute -right-30 sm:right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 ">
          <ul className="py-1  text-gray-700 flex flex-col items-start">
            <Link
              href={"/about-us/#instructor"}
              className="px-4 py-2 hover:bg-gray-100 w-full cursor-pointer  text-xs  sm:text-sm"
              onClick={() => setOpen(false)}
            >
              {t("userMenu.join")}
            </Link>
            <Link
              href={"/complaints"}
              className="px-4 py-2 hover:bg-gray-100 w-full cursor-pointer text-xs  sm:text-sm"
              onClick={() => setOpen(false)}
            >
              {t("userMenu.complaints")}
            </Link>

            <li
              className="px-4 py-2 hover:bg-gray-100 w-full cursor-pointer text-xs  sm:text-sm"
              onClick={() => {
                setOpen(false);
                dispatch(openModal(avatar));
              }}
            >
              {t("userMenu.settings")}
            </li>
            <li className="border-t my-1" />
            <button
              aria-label={t("userMenu.logout")}
              onClick={() => LogoutHandler()}
              className="px-4 w-full py-2 flex items-center justify-between text-xs  sm:text-sm hover:bg-gray-100 cursor-pointer text-red-600"
            >
              <span>
                <LogOut size={16} />
              </span>
              <span> {t("userMenu.logout")}</span>
            </button>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
