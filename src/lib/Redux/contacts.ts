import { cache } from "react";

export const getContactData = cache(async () => {
  try {
    const res = await fetch(
      `https://backend.h-platform.online/api/UserAllContact`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: { revalidate: 60 }, // إذا بتحب تستخدم ISR
      }
    );

    if (!res.ok) {
      console.error("Failed to fetch contact data");
      return null;
    }

    const data = await res.json();
    return data?.Contact[0] || null;
  } catch (error) {
    console.error("getContactData() error:", error);
    return null;
  }
});
