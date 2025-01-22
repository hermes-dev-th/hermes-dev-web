import "./globals.css";
import Footer from '@/app/components/footer'
import Navbar from './components/Navbar.jsx'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sukhumvit">
        <Navbar />
        <div className="h-[4vw]"></div>
        {children}
        <Footer />

      </body>
    </html>
  );
}