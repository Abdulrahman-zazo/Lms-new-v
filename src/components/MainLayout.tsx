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
        {/* <MyStatsig> */}
        <main>{children}</main>
        {/* </MyStatsig> */}

        <FloatingButton lang={local} contact={data?.Contact[0] || {}} />
        <Footer contact={data?.Contact[0] || {}} />
      </AuthProvider>
    </>
  );
}
