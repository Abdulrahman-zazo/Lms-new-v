import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = cookies();

  (await cookieStore).set("auth_token", "", {
    httpOnly: true,
    path: "/",
    expires: new Date(0), // احذف الكوكي عن طريق تعيين تاريخ ماضٍ
  });

  return NextResponse.json({ success: true });
}
