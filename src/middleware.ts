"use server";

import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const PrivateRoutes = [
    "/playlists",
    "/liked-videos",
    "/watch-history",
    "/community-posts",
    "/dashboard/@me",
    "/profile",
    "/profile/settings",
    "/profile/@me",
    "/notifications",
];

const AuthRoutes = ["/auth/login", "/auth/register"];

export const middleware = async (requset: NextRequest) => {
    const { pathname } = requset.nextUrl;

    // const accessToken = requset.cookies.get("accessToken")?.value || "";
    // const decodedToken =
    //     accessToken && (jwt.decode(accessToken) as jwt.JwtPayload);

    // console.log(pathname, decodedToken);

    // const isTokenExpired =
    //     decodedToken &&
    //     decodedToken?.exp &&
    //     decodedToken?.exp < Date.now() / 1000;
    // const isAuthenticated = !!decodedToken && !isTokenExpired;

    // if (isAuthenticated && AuthRoutes.includes(pathname)) {
    //     return NextResponse.redirect(new URL("/", requset.url));
    // }

    // console.log(process.env.NODE_ENV, isAuthenticated, pathname);

    // if (
    //     process.env.NODE_ENV === "production" &&
    //     !isAuthenticated &&
    //     (PrivateRoutes.includes(pathname) || pathname.startsWith("/channel"))
    // ) {
    //     return NextResponse.redirect(new URL("/auth/login", requset.url));
    // }

    return NextResponse.next();
};

const config = {
    // matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
    matcher: [...AuthRoutes, ...PrivateRoutes],
};
