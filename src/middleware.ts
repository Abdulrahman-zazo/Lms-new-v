import createIntlMiddleware from "next-intl/middleware";

export default createIntlMiddleware({
  locales: ["en", "ar"],
  defaultLocale: "ar",
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
