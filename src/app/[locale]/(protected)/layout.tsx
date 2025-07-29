// app/[locale]/protected/layout.tsx
// "use client";
// import { getToken } from "@/Cookies/CookiesServices";
import { getLocale } from "next-intl/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import type { ReactNode } from "react";

export default async function ProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const locale = await getLocale();
  const token = (await cookies()).get("auth_token")?.value;

  if (!token) {
    redirect(`/${locale}/login`);
  }

  return <>{children}</>;
}
