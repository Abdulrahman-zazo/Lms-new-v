import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://h-platform.online";

  // مثال لصفحة الدورات
  const basePage = {
    url: `${baseUrl}/ar`, // الرابط الأساسي لهذه الدورة في الـ sitemap
    lastModified: new Date(),
    priority: 1,
    alternates: {
      languages: {
        en: `${baseUrl}/en/courses`, // رابط نفس الصفحة باللغة الإنجليزية
        ar: `${baseUrl}/ar/courses`, // رابط نفس الصفحة باللغة العربية
      },
    },
  };
  // مثال لصفحة الدورات
  const coursesPage = {
    url: `${baseUrl}/ar/courses`, // الرابط الأساسي لهذه الدورة في الـ sitemap
    lastModified: new Date(),
    priority: 0.8,

    alternates: {
      languages: {
        en: `${baseUrl}/en/courses`, // رابط نفس الصفحة باللغة الإنجليزية
        ar: `${baseUrl}/ar/courses`, // رابط نفس الصفحة باللغة العربية
      },
    },
  };

  // مثال لصفحة "من نحن"
  const aboutUsPage = {
    url: `${baseUrl}/ar/about-us`,
    lastModified: new Date(),
    priority: 0.8,

    alternates: {
      languages: {
        en: `${baseUrl}/en/about-us`,
        ar: `${baseUrl}/ar/about-us`,
      },
    },
  };

  return [coursesPage, aboutUsPage, basePage];
}
