import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
    const token = await getToken({req})

    if(!token) {
        return NextResponse.redirect(new URL('/', req.url))
    }

    if(req.nextUrl.pathname.startsWith('/admin') && token.role !== "admin") {
        if(!token) {
            return NextResponse.redirect(new URL('/', req.url))
        }else {
            return NextResponse.redirect(new URL('/user', req.url))
        }
    }

    if(req.nextUrl.pathname.startsWith('/user') && !token) {
        return NextResponse.redirect(new URL('/', req.url))
    }
}

export const config = {
    matcher: ["/admin/:path*", "/user/:path*"]
}