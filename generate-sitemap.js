// generate-sitemap.js

import { SitemapStream, streamToPromise } from "sitemap";
import { Readable } from "stream";
import { writeFileSync } from "fs";
import { join } from "path";

async function generateAndSaveSitemap() {
  const baseUrl = "https://h-platform.online";
  const lastModified = new Date(); // استخدم هذا التاريخ لجميع الصفحات أو قم بتخصيصه

  // تعريف جميع الروابط الخاصة بك هنا
  // يجب أن تكون كل نسخة لغوية (عربي وإنجليزي) رابطًا رئيسيًا في القائمة
  const links = [
    // الصفحة الرئيسية
    {
      url: `${baseUrl}/ar`,
      changefreq: "daily",
      priority: 1,
      lastmod: lastModified,
      // الروابط البديلة (hreflang)
      alternates: [
        { lang: "en", href: `${baseUrl}/en` },
        { lang: "ar", href: `${baseUrl}/ar` }, // تشير لنفسها لتكون واضحة
      ],
    },
    {
      url: `${baseUrl}/en`,
      changefreq: "daily",
      priority: 1,
      lastmod: lastModified,
      alternates: [
        { lang: "ar", href: `${baseUrl}/ar` },
        { lang: "en", href: `${baseUrl}/en` },
      ],
    },

    // صفحة الدورات
    {
      url: `${baseUrl}/ar/courses`,
      changefreq: "daily",
      priority: 0.8,
      lastmod: lastModified,
      alternates: [
        { lang: "en", href: `${baseUrl}/en/courses` },
        { lang: "ar", href: `${baseUrl}/ar/courses` },
      ],
    },
    {
      url: `${baseUrl}/en/courses`,
      changefreq: "daily",
      priority: 0.8,
      lastmod: lastModified,
      alternates: [
        { lang: "ar", href: `${baseUrl}/ar/courses` },
        { lang: "en", href: `${baseUrl}/en/courses` },
      ],
    },

    // صفحة "من نحن"
    {
      url: `${baseUrl}/ar/about-us`,
      changefreq: "daily",
      priority: 0.8,
      lastmod: lastModified,
      alternates: [
        { lang: "en", href: `${baseUrl}/en/about-us` },
        { lang: "ar", href: `${baseUrl}/ar/about-us` },
      ],
    },
    {
      url: `${baseUrl}/en/about-us`,
      changefreq: "daily",
      priority: 0.8,
      lastmod: lastModified,
      alternates: [
        { lang: "ar", href: `${baseUrl}/ar/about-us` },
        { lang: "en", href: `${baseUrl}/en/about-us` },
      ],
    },

    {
      url: `${baseUrl}/ar/offers`,
      changefreq: "daily",
      priority: 0.8,
      lastmod: lastModified,
      alternates: [
        { lang: "en", href: `${baseUrl}/en/offers` },
        { lang: "ar", href: `${baseUrl}/ar/offers` },
      ],
    },
    {
      url: `${baseUrl}/en/offers`,
      changefreq: "daily",
      priority: 0.8,
      lastmod: lastModified,
      alternates: [
        { lang: "ar", href: `${baseUrl}/ar/offers` },
        { lang: "en", href: `${baseUrl}/en/offers` },
      ],
    },
  ];

  try {
    const sitemapPath = join(process.cwd(), "public", "sitemap.xml");

    // إنشاء الـ stream لكتابة Sitemap
    const sitemap = new SitemapStream({
      hostname: baseUrl,
      xmlns: {
        // تحديد مساحات الاسم بـ HTTP بدلاً من HTTPS
        sitemap: "http://www.sitemaps.org/schemas/sitemap/0.9",
        xhtml: "http://www.w3.org/1999/xhtml",
      },
    });

    // إضافة الروابط إلى الـ Sitemap
    // يجب أن تكون الروابط قابلة للقراءة (Readable)
    const readable = new Readable({
      objectMode: true,
      read() {
        links.forEach((link) => this.push(link));
        this.push(null);
      },
    });

    const sitemapOutput = await streamToPromise(readable.pipe(sitemap));
    writeFileSync(sitemapPath, sitemapOutput.toString());

    console.log("✅ Sitemap generated and saved successfully at:", sitemapPath);
  } catch (error) {
    console.error("❌ Error generating sitemap:", error);
  }
}

// استدعاء الوظيفة لتوليد وحفظ Sitemap عند تشغيل السكربت
generateAndSaveSitemap();
