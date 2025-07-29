"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();

  const switchLanguage = (nextLocale: string) => {
    if (nextLocale === locale) return;

    const segments = pathname.split("/").filter(Boolean); // ['ar', 'about']
    if (segments[0] === locale) {
      segments.shift(); // احذف اللغة الحالية
    }
    const newPath = `/${nextLocale}/${segments.join("/")}`;

    startTransition(() => {
      router.replace(newPath);
    });
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={() => switchLanguage("en")}
        disabled={isPending}
        className={`px-2 py-1 rounded ${
          locale === "en" ? "font-bold underline" : "opacity-60"
        }`}
      >
        English
      </button>
      <button
        onClick={() => switchLanguage("ar")}
        disabled={isPending}
        className={`px-2 py-1 rounded ${
          locale === "ar" ? "font-bold underline" : "opacity-60"
        }`}
      >
        العربية
      </button>
    </div>
  );
}
