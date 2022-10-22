import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  if (process.env.ENABLE_BASIC_AUTH === "false") {
    return NextResponse.next();
  }

  const authorizationHeader = req.headers.get("authorization");

  if (authorizationHeader) {
    const basicAuth = authorizationHeader.split(" ")[1];
    const [user, password] = atob(basicAuth).split(":");

    if (
      user === process.env.BASIC_AUTH_USER &&
      password === process.env.BASIC_AUTH_PASSWORD
    ) {
      return NextResponse.next();
    }
  }

  const url = req.nextUrl;
  url.pathname = "/api/auth";

  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - verify (accessible to anyone)
     * - static (static files)
     * - favicon.ico (favicon file)
     */
    "/((?!verify|static|favicon.ico).*)",
    "/(api/(?!verify|new|auth).*)",
  ],
};
