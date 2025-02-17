"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Service1 from "./Service1";
import Service2 from "./Service2";
import Service3 from "./Service3";

export default function ServicesPage() {
  const sections = ["service1", "service2", "service3"];
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef([]);
  const [showDots, setShowDots] = useState(false);
  const servicesRef = useRef(null); // Ref for the whole ServicesPage

  useEffect(() => {
    sectionRefs.current = sections.map((id) => document.getElementById(id));

    // Observer for individual sections
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sections.indexOf(entry.target.id);
            setActiveIndex(index);
          }
        });
      },
      { threshold: 0.7 }
    );

    // Observer for the whole ServicesPage
    const servicesObserver = new IntersectionObserver(
      ([entry]) => {
        setShowDots(entry.isIntersecting); // Show dots only if ServicesPage is in view
      },
      { threshold: 0.3 } // Detect when at least 30% of the section is in view
    );

    sectionRefs.current.forEach((section) => {
      if (section) sectionObserver.observe(section);
    });

    if (servicesRef.current) {
      servicesObserver.observe(servicesRef.current);
    }

    return () => {
      sectionObserver.disconnect();
      servicesObserver.disconnect();
    };
  }, []);

  const scrollToSection = (index) => {
    sectionRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div ref={servicesRef} className="w-full overflow-hidden relative p-4">
      {/* Scrollable Container */}
      <div className="h-[20vw] w-full snap-y snap-mandatory overflow-y-scroll no-scrollbar relative">
        <div id="service1" className="h-[20vw] w-full snap-start flex items-center justify-center">
          <Service1 />
        </div>
        <div id="service2" className="h-[20vw] w-full snap-start flex items-center justify-center">
          <Service2 />
        </div>
        <div id="service3" className="h-[20vw] w-full snap-start flex items-center justify-center">
          <Service3 />
        </div>
      </div>

      {/* Dots inside ServicesPage */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showDots ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="absolute right-[10vw] top-1/2 -translate-y-1/2 flex flex-col gap-[1vw]" 
      >
        {sections.map((_, index) => (
          <button
            key={index}
            className={`w-[1.4vw] h-[1.4vw] rounded-full transition-all duration-300 ${
              activeIndex === index ? "bg-black" : "bg-gray-300"
            }`}
            onClick={() => scrollToSection(index)}
          ></button>
        ))}
      </motion.div>

      {/* Hide scrollbar globally */}
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
