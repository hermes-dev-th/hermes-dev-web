"use client";

import { useState, useEffect } from "react";

const Navmenu = [
  { title: "About Us", section_id: "about" },
  { title: "Services", section_id: "services-section" },
  { title: "Pricing", section_id: "pricing-section" },
  { title: "Contact Us", section_id: "contact-section" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    const sectionIds = Navmenu.map((item) => item.section_id);
    const sections = sectionIds.map((id) => document.getElementById(id));

    const observer = new IntersectionObserver(
      (entries) => {
        let anyVisible = false;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            anyVisible = true;
          }
        });

        if (!anyVisible) {
          setActiveSection(null); // Reset when no section is in view
        }
      },
      { threshold: 0.6 }
    );

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div>
      <nav className="flex fixed h-[8vh] w-full bg-white justify-between items-center px-[2.5vw] z-10">
      <button onClick={() => scrollToSection("hero-section")}>
          <img
            src="/images/Hermes-Dev-Logo.png"
            alt="Logo"
            className="w-[9vw]"
          />
        </button>
        <div className="flex gap-4">
          {Navmenu.map((item, index) => (
            <button
              key={index}
              onClick={() => scrollToSection(item.section_id)}
              className={`m-[0.4vw] p-[0.4vw] text-[0.8vw] font-bold rounded-[0.35vw] transition-all duration-700 transition-discrete
                ${
                  activeSection === item.section_id
                    ? "bg-black text-white"
                    : activeSection === null
                    ? "bg-transparent text-black"
                    : "bg-transparent text-black hover:bg-gray-100"
                }
              `}
            >
              {item.title}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
