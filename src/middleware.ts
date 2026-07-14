import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, isValidLocale, type Locale } from "@/i18n/config";

const PUBLIC_FILE = /\.(.*)$/;

function detectLocale(request: NextRequest): Locale {
  const cookie = request.cookies.get("NEXT_LOCALE")?.value;
  if (cookie && isValidLocale(cookie)) return cookie;

  const accept = request.headers.get("accept-language") ?? "";
  if (accept.toLowerCase().includes("zh")) return "zh";
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/assets") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const segment = pathname.split("/")[1];
  if (isValidLocale(segment)) {
    const response = NextResponse.next();
    response.cookies.set("NEXT_LOCALE", segment, { path: "/" });
    return response;
  }

  const locale = detectLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
