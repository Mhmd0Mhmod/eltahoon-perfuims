import { NextRequest, NextResponse } from "next/server";
import { markets } from "./config/markets";
import { cookies } from "next/headers";
const DEFAULT_MARKET = markets.eg.code;

const PUBLIC_ROUTES = [
  "login",
  "register",
  "forgot-password",
  "reset-password",
];

const GLOBAL_ROUTES = ["account", "dashboard"];

function isValidMarket(value: string | undefined): boolean {
  return (
    !!value &&
    Object.values(markets).some((market) => market.code === value.toUpperCase())
  );
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const segments = pathname.split("/");
  const firstSegment = segments[1];
  if (
    GLOBAL_ROUTES.includes(firstSegment) ||
    PUBLIC_ROUTES.includes(firstSegment)
  ) {
    return NextResponse.next();
  }
  const cookieStore = await cookies();
  if (isValidMarket(firstSegment)) {
    const response = NextResponse.next();
    cookieStore.set("country_code", firstSegment.toUpperCase(), {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
    response.cookies.set("country_code", firstSegment.toUpperCase(), {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
    return response;
  }
  const cookieMarket = request.cookies.get("country_code")?.value;
  const market = isValidMarket(cookieMarket) ? cookieMarket! : DEFAULT_MARKET;
  const url = request.nextUrl.clone();
  url.pathname = `/${market.toLowerCase()}${pathname === "/" ? "" : pathname}`;
  const response = NextResponse.redirect(url);
  cookieStore.set("country_code", market.toUpperCase(), {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
  response.cookies.set("country_code", market.toUpperCase(), {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });

  return response;
}

export const config = {
  matcher: [
    /*
     * Match everything except:
     * - API routes
     * - Next.js static files
     * - Next.js image optimization
     */
    "/((?!api|_next/static|_next/image).*)",
  ],
};
