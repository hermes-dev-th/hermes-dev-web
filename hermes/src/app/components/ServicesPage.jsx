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


  useEffect(() => {

    sectionRefs.current = sections.map((id) => document.getElementById(id));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sections.indexOf(entry.target.id);
            setActiveIndex(index);
            setShowDots(index > 0); // Hide dots at the first section
          }
        });
      },
      { threshold: 0.7 }
    );

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (index) => {
    sectionRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <div className="w-full overflow-hidden relative">
      {/* Scrollable Container */}
      <div className="h-[20vw] w-full snap-y snap-mandatory overflow-y-scroll no-scrollbar">
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

      {/* Vertical Dots Navigation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showDots ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="fixed right-[10vw] top-1/2 -translate-y-[7vh] flex flex-col gap-[1vw]"
      >
        {sections.map((_, index) => (
          <button
            key={index}
            className={`w-[1.4vw] h-[1.4vw] rounded-full transition-all duration-300 ${activeIndex === index ? "bg-black" : "bg-gray-300"
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
