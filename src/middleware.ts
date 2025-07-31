import createIntlMiddleware from "next-intl/middleware";

export default createIntlMiddleware({
  locales: ["en", "ar"],
  defaultLocale: "ar",
});

export const config = {
  matcher: [
    // تخطى كل المسارات الداخلية وملفات الـ static
    "/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|site.webmanifest|robots.txt|sitemap.xml).*)",
  ],
};
