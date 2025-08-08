import createIntlMiddleware from "next-intl/middleware";

export default createIntlMiddleware({
  locales: ["en", "ar"],
  defaultLocale: "ar",
});

export const config = {
  matcher: [
    // تخطى كل المسارات الداخلية وملفات الـ static
    "/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|site.webmanifest|robots.txt|sitemap.xml|62b4f46620ee4878a10397a1c6120973.txt).*)",
  ],
};
