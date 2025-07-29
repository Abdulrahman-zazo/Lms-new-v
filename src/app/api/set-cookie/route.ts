import { cookies } from "next/headers";
interface Iprops {
  token: string | null;
}
export async function POST(req: Request) {
  const { token }: Iprops = await req.json();

  if (!token) {
    return new Response(JSON.stringify({ error: "Token is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  (await cookies()).set({
    name: "auth_token",
    value: token,
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // أسبوع
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
