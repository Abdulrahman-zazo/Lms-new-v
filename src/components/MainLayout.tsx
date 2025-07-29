// components/MainLayout.tsx

"use client"; // This is the crucial part!

import { useAppSelector } from "@/lib/Redux/store";
import { useDispatch } from "react-redux";
import Header from "@/components/Ui/Header";
import SettingsModal from "@/components/settings";
import { closeModal } from "@/lib/Redux/features/settings/settingsModalSlice";
import Footer from "@/components/Ui/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { useGetContactQuery } from "@/lib/Redux/features/Contacts/contactApi";
import FloatingButton from "./Ui/FloatingButton";
import { useLocale } from "next-intl";
import { AuthProvider } from "./AuthContext";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("translation");

  return {
    title: t("pages.Home", { defaultValue: "H Platform - الصفحة الرئيسية" }),
    description: t("pages.Home_description", {
      defaultValue:
        "في عالم يتغير بسرعة، لم يعد التعلم وحده كافيًا بل يجب أن تتميّز. منصة H ليست مجرد أداة تعليمية؛ إنها الجسر الذي يربط بين أحلامك والواقع.",
    }),
    icons: {
      icon: [{ url: "/favicon.ico" }, { url: "/icon.png", type: "image/png" }],
      apple: [{ url: "/apple-icon.png" }],
    },
    alternates: {
      canonical: "https://h-platform.online", // ضع رابط موقعك هنا
    },

    openGraph: {
      title: t("pages.Home"),
      description: t("pages.Home_description"),
      url: "https://h-platform.online", // عدلها حسب رابطك
      type: "website",
      siteName: "H Platform",

      images: [
        {
          url: "https://www.h-platform.online/scema.png", // ضعها في public/
          width: 1200,
          height: 630,
          alt: "H Platform Preview",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("pages.Home"),
      description: t("pages.Home_description"),
      images: [{ url: "https://www.h-platform.online/scema.png" }],
    },
  };
}
// Define a type for the props, including contact data
type MainLayoutProps = {
  children: React.ReactNode;
  token: string;
};

export default function MainLayout({ children, token }: MainLayoutProps) {
  const { isOpen, image } = useAppSelector((state) => state.settingsModal);
  const dispatch = useDispatch();
  const { data } = useGetContactQuery();
  const local = useLocale();
  return (
    // You can move the NextIntlClientProvider here if it depends on client context
    <>
      <AuthProvider token={token}>
        <Header />
        <SettingsModal
          isOpen={isOpen}
          ImageUser={image}
          onClose={() => dispatch(closeModal())}
        />
        <ScrollToTop />
        <main>{children}</main>
        <FloatingButton lang={local} contact={data?.Contact[0] || {}} />
        <Footer contact={data?.Contact[0] || {}} />
      </AuthProvider>
    </>
  );
}
