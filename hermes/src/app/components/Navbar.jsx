export default function Navbar() {
    return (
        <div>
            <nav className="flex fixed h-[4vw] w-full bg-white justify-between items-center px-[1.5vw]">
        <div>
            <img src="/material/Hermes-Dev-Logo.png" alt="Logo" className="w-[9vw]" />
        </div>
        <div>
            {[
                ['About Us', '/about'],
                ['Services', '/services'],
                ['Pricing', '/pricing'],
                ['Contact Us', '/contact'],
            ].map(([title, url]) => (
                <a href={url} className="px-3 py-2 text-black font-semibold hover:bg-slate-100 hover:text-slate-900 font-Sukhumvit">{title}</a>
            ))}
        </div>
    </nav>
    </div>
    )
}