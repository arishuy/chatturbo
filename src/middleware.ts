import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
	const pathname = req.nextUrl.pathname;
	const protectedPaths = [
    "/dashboard",
	"/message",
	"/message/[id]",
	"/people",
	"/reminder",
	"/reminder/[id]",
	"/settings",
  ];
	const isPathProtected = protectedPaths?.some((path) => pathname == path || pathname.startsWith(path));
	const res = NextResponse.next();

	if (isPathProtected) {
		const token = await getToken({ req });
		if (!token) {
			const url = new URL(`/login`, req.url);
			return NextResponse.redirect(url);
		}
		else {
			return res;
		}
	}
	return res;
}
