import { NextRequest, NextResponse } from "next/server";
import { markets } from "./config/markets";
const DEFAULT_MARKET = markets.eg.key;

const PUBLIC_ROUTES = [
  "login",
  "register",
  "forgot-password",
  "reset-password",
];

const NON_MARKET_ROUTES = ["account", "dashboard"];

function isValidMarket(value: string | undefined): boolean {
  return (
    !!value && Object.values(markets).some((market) => market.key === value)
  );
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const segments = pathname.split("/");
  const firstSegment = segments[1];
  if (
    NON_MARKET_ROUTES.includes(firstSegment) ||
    PUBLIC_ROUTES.includes(firstSegment)
  ) {
    return NextResponse.next();
  }
  if (isValidMarket(firstSegment)) {
    const response = NextResponse.next();
    response.cookies.set("country_code", firstSegment, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
    return response;
  }
  const cookieMarket = request.cookies.get("country_code")?.value;
  const market = isValidMarket(cookieMarket) ? cookieMarket! : DEFAULT_MARKET;
  const url = request.nextUrl.clone();
  url.pathname = `/${market.toLowerCase()}${pathname === "/" ? "" : pathname}`;
  const response = NextResponse.redirect(url);
  response.cookies.set("country_code", firstSegment, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  return response;
}
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
