export default function Navbar() {
  return (
    <div>
      <nav className="flex fixed h-[4vw] w-full bg-white justify-between items-center px-[2.5vw]">
        <div>
          <img
            src="/material/Hermes-Dev-Logo.png"
            alt="Logo"
            className="w-[9vw]"
          />
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
              className="px-3 py-2 text-black text-[0.8vw] font-bold hover:bg-gray-100 rounded-[0.3vw] hover:text-black-900 font-sukhumvit"
            >
              {title}
            </a>
          ))}
        </div>
      </nav>
    </div>
  );
}
