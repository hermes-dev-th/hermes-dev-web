import Link from "next/link"; 

export default function Navbar() {
  return (
    <div>
      <nav className="flex fixed h-[4vw] w-full bg-white justify-between items-center px-[2.5vw]">
        <div>
        <Link href="/">
          <img
            src="/images/Hermes-Dev-Logo.png"
            alt="Logo"
            className="w-[9vw]"
          />
          </Link>
        </div>
        <div>
          {[
            ["About Us", "/about"],
            ["Services", "/services"],
            ["Pricing", "/pricing"],
            ["Contact Us", "/contact"],
          ].map(([title, url]) => (
            <a
              key={title}
              href={url}
              className="p-[0.8vw] text-[0.8vw] font-bold hover:bg-gray-100 rounded-[0.35vw] hover:text-black-900 "
            >
              {title}
            </a>
          ))}
        </div>
      </nav>
    </div>
  );
}
