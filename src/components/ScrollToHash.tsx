"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const ScrollToHash = () => {
  // usePathname يتتبع تغيير المسار في Next.js
  const pathname = usePathname();

  useEffect(() => {
    // نحصل على الـ hash مباشرة من نافذة المتصفح
    const hash = window.location.hash;

    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        // الـ setTimeout قد يساعد في ضمان أن كل العناصر قد تم رسمها قبل التمرير
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, [pathname]); // نعيد تشغيل هذا التأثير عند كل تغيير في مسار الصفحة

  return null; // هذا المكون لا يعرض أي شيء في الواجهة
};

export default ScrollToHash;
