import { redirect } from 'next/navigation';
import { cookies, headers } from 'next/headers';

export default function Home() {
  // Get preferred language from cookie or accept-language header
  const cookieStore = cookies();
  const localeCookie = cookieStore.get('NEXT_LOCALE');
  
  const locale = localeCookie?.value || 
                 headers().get('accept-language')?.split(',')[0]?.split('-')[0] || 
                 'en';
                 
  // Only redirect to 'en' or 'th'
  const validLocale = ['en', 'th'].includes(locale) ? locale : 'en';
  
  // This page should never be rendered directly
  redirect(`/${validLocale}`);
  
  return null; // This won't be rendered
}
