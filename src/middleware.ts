import { NextRequest, NextResponse } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest, _res: NextResponse) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const redirectUrl = req.nextUrl.clone();
  redirectUrl.pathname = "/";

  const { data: activeSession } = await supabase.auth.getSession();
  const { data: user } = await supabase.from("profile").select("*").single();

  if (req.nextUrl.pathname.includes("/api/admin/")) {
    if (user.role !== "admin") {
      return NextResponse.redirect(redirectUrl);
    }
    return;
  }

  if (
    req.nextUrl.pathname.includes("/api/") &&
    !req.nextUrl.pathname.includes("/api/uploadthing")
  ) {
    if (activeSession.session === null) {
      return NextResponse.redirect(redirectUrl);
    }
    return;
  }

  if (
    req.nextUrl.pathname === "/login" ||
    req.nextUrl.pathname === "/register"
  ) {
    if (activeSession) {
      return;
    } else {
      return NextResponse.redirect(redirectUrl);
    }
  }

  if (!activeSession) {
    return NextResponse.redirect(redirectUrl);
  }

  if (req.nextUrl.pathname.includes("/admin")) {
    if (user?.role !== "admin") {
      return NextResponse.redirect(redirectUrl);
    }
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/account/:path*",
    "/admin/:path*",
    "/login:path*",
    "/register:path*",
    "/api/:path*",
  ],
};
