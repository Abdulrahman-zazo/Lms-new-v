// app/[locale]/components/HeroHome/index.tsx (server)
"use client";
import { useGetContactQuery } from "@/lib/Redux/features/Contacts/contactApi";
import HeroHomeClient from "./HeroHomeClient";
import { useLocale, useTranslations } from "next-intl";

export default function HeroHome() {
  const t = useTranslations("translation");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const { data } = useGetContactQuery();
  const texts = {
    title: t("HeroHome.Home_title"),
    text1: t("HeroHome.text1"),
    text2: t("HeroHome.text2"),
    button: t("HeroHome.text3"),
  };

  return (
    <HeroHomeClient
      contact={data?.Contact[0] || {}}
      texts={texts}
      isRTL={isRTL}
    />
  );
}
