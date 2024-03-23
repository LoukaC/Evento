import { NextRequest, NextResponse } from "next/server";

// redirect /events to /events/all
export function middleware(request: NextRequest) {
return NextResponse.redirect(new URL("/events/all", request.url))
}

export const config = {
    matcher: ['/events']
}