// components/Navbar.js
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-black text-white px-6 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <a>
            <img
              src="/images/HermesLogo.png"
              alt="Hermes-Dev Logo"
              className="w-32 h-auto"
            />
          </a>
        </Link>
        <div className="hidden md:flex space-x-6">
          <Link href="/">
            <a className="hover:bg-gray-800 px-3 py-2 rounded">Home</a>
          </Link>
          <Link href="/pages/about">
            <a className="hover:bg-gray-800 px-3 py-2 rounded">About Us</a>
          </Link>
          <Link href="/pages/services">
            <a className="hover:bg-gray-800 px-3 py-2 rounded">Services</a>
          </Link>
          <Link href="/pages/pricing">
            <a className="hover:bg-gray-800 px-3 py-2 rounded">Pricing</a>
          </Link>
          <Link href="/pages/contact">
            <a className="hover:bg-gray-800 px-3 py-2 rounded">Contact Us</a>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
