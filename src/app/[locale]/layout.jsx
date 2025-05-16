import { use } from 'react';

export default function LocaleLayout({ children, params }) {
  // Unwrap params using React.use()
  const unwrappedParams = use(params);
  const { locale } = unwrappedParams;
  
  // We'll pass children through as locale handling is done in RootLayout and ClientWrapper
  return children;
} 