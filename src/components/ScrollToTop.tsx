"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const ScrollToTop = () => {
  // usePathname from next/navigation gets the current route path
  const pathname = usePathname();

  // The useEffect hook runs after a route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]); // The effect re-runs every time the pathname changes

  return null; // This component does not render any UI
};

export default ScrollToTop;
