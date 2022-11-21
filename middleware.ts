import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {   
  const url = request.nextUrl.clone()   
  if (url.pathname === '/') {
    url.pathname = '/inbox'
    return NextResponse.redirect(url)   
  } 
}