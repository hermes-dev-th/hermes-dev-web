import { NextResponse } from 'next/server';
import acceptLanguage from 'accept-language';

acceptLanguage.languages(['en', 'th']);

export const config = {
  // Only run on specific paths, skip static files like images, etc.
  matcher: ['/((?!api|_next/static|_next/image|images|sukhumvit-font|locales|lib|favicon.ico).*)'],
};

const cookieName = 'NEXT_LOCALE';
const defaultLocale = 'en';

export function middleware(request) {
  // Get the locale from URL path
  const pathname = request.nextUrl.pathname;
  
  // Check if the pathname already has a locale
  const pathnameHasLocale = ['en', 'th'].some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // If pathname already has locale, return
  if (pathnameHasLocale) return;

  // Skip redirects for static assets
  if (pathname.includes('sukhumvit-font') || 
      pathname.includes('images') || 
      pathname.includes('locales') ||
      pathname.includes('lib')) {
    return;
  }

  // Get locale from cookie or accept-language header
  let locale;
  
  // Use cookie if available
  if (request.cookies.has(cookieName)) {
    locale = request.cookies.get(cookieName).value;
  } else {
    // Otherwise use accept-language header
    const acceptLanguageHeader = request.headers.get('accept-language');
    locale = acceptLanguageHeader 
      ? acceptLanguage.get(acceptLanguageHeader) 
      : defaultLocale;
  }

  // Redirect if locale is not in pathname
  return NextResponse.redirect(
    new URL(
      `/${locale}${pathname.startsWith('/') ? pathname : `/${pathname}`}`,
      request.url
    )
  );
} 