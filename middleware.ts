import { NextResponse, NextRequest } from "next/server";

const allowedOriginList =
  process.env.NODE_ENV === "production"
    ? ["http://localhost:3000", "https://auth-cookie-hazel.vercel.app"]
    : ["http://localhost:3000", "https://auth-cookie-hazel.vercel.app"];

export function middleware(req: NextRequest) {
  const origin = req.headers.get("origin");

  if (origin && !allowedOriginList.includes(origin)) {
    return new NextResponse(null, {
      status: 400,
    });
  }

  if (req.nextUrl.pathname.startsWith("/secret")) {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}
