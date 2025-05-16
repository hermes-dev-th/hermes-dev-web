"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

export default function ServicesPage() {
  const sections = ["service1", "service2", "service3", "service4"];
  const sectionTitles = ["Web Development", "Mobile App Development", "Data Analysis", "UI/UX Design"];
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState(null);
  const sectionRefs = useRef([]);
  const [showDots, setShowDots] = useState(false);
  const servicesRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(false);
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
        setShowDots(entry.isIntersecting);
      },
      { threshold: 0.3 }
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
    setIsScrolling(true);
    sectionRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    
    // Reset scrolling state after animation completes
    setTimeout(() => {
      setIsScrolling(false);
    }, 1000);
  };

  const handleKeyDown = (e) => {
    if (isScrolling) return;
    
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      const nextIndex = (activeIndex + 1) % sections.length;
      scrollToSection(nextIndex);
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      const prevIndex = (activeIndex - 1 + sections.length) % sections.length;
      scrollToSection(prevIndex);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex, isScrolling]);

  const handleWheel = (e) => {
    if (isScrolling) {
      e.preventDefault();
      return;
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
    }
    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
    };
  }, [isScrolling]);

  // Apple-inspired minimal design colors
  const iconColors = [
    "text-gray-900",
    "text-gray-900",
    "text-gray-900",
    "text-gray-900"
  ];

  // Service components defined inline
  const ServiceIcon = ({ index }) => {
    const icons = [
      // Web Development
      <svg key="web" xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>,
      
      // Mobile App
      <svg key="mobile" xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>,
      
      // Data Analysis
      <svg key="data" xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>,
      
      // UI/UX Design
      <svg key="design" xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ];
    
    return (
      <div className="mb-6">
        <div className={`${iconColors[index]}`}>
          {icons[index]}
        </div>
      </div>
    );
  };

  return (
    <div ref={servicesRef} id="services-section" className="w-full overflow-hidden relative bg-white">
      {/* Parallax Scrollable Container */}
      <div 
        ref={scrollContainerRef}
        className="h-[90vh] w-full snap-y snap-mandatory overflow-y-scroll no-scrollbar relative scroll-smooth"
      >
        {sections.map((sectionId, index) => (
          <div 
            key={sectionId}
            id={sectionId} 
            className="h-screen w-full snap-start flex flex-col items-center justify-center relative"
          >
            <div className="absolute inset-0 bg-white -z-10"></div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: false }}
              className="max-w-2xl text-center px-4 z-10"
              style={{ 
                y: useTransform(
                  useScroll({ target: scrollContainerRef }).scrollYProgress, 
                  [0, 1], 
                  [0, -30 * (index + 1)]
                )
              }}
            >
              <ServiceIcon index={index} />
              <h2 className="text-3xl md:text-4xl font-medium mb-6 text-gray-900 tracking-tight">{sectionTitles[index]}</h2>
              <p className="text-base md:text-lg mb-8 text-gray-600 leading-relaxed font-light">
                {index === 0 && "We specialize in developing high-quality websites that support all platforms and devices, using modern technologies and focusing on excellent user experience."}
                {index === 1 && "Our team has experience in developing applications on both iOS and Android platforms, using cutting-edge technologies that address both user experience and system functionality."}
                {index === 2 && "We offer data analysis services that help businesses make efficient decisions by using advanced data analysis tools, including creating dashboards for real-time data visualization."}
                {index === 3 && "Our design team creates intuitive and engaging user interfaces that enhance user experience while maintaining brand consistency across all digital touchpoints."}
              </p>
              <div className="space-y-6 text-left mb-10">
                <ul className="space-y-3 text-gray-600 font-light text-base">
                  {index === 0 && (
                    <>
                      <li>• Custom website design and development</li>
                      <li>• Comprehensive E-commerce systems</li>
                      <li>• Content Management Systems (CMS)</li>
                      <li>• Performance optimization and speed</li>
                      <li>• SEO-friendly architecture</li>
                    </>
                  )}
                  {index === 1 && (
                    <>
                      <li>• Native and Cross-platform app development</li>
                      <li>• Mobile UI/UX design</li>
                      <li>• App Store optimization and deployment</li>
                      <li>• Continuous maintenance and support</li>
                      <li>• Integration with existing systems</li>
                    </>
                  )}
                  {index === 2 && (
                    <>
                      <li>• In-depth business data analysis</li>
                      <li>• Real-time data visualization dashboards</li>
                      <li>• Data-driven decision-making strategies</li>
                      <li>• Performance tracking and measurement</li>
                      <li>• Predictive analytics and forecasting</li>
                    </>
                  )}
                  {index === 3 && (
                    <>
                      <li>• User-centered interface design</li>
                      <li>• Interactive prototyping</li>
                      <li>• Brand identity integration</li>
                      <li>• Usability testing and optimization</li>
                      <li>• Responsive design across all devices</li>
                    </>
                  )}
                </ul>
              </div>
              
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <button className="px-8 py-3 bg-gray-900 text-white rounded-full text-sm font-medium tracking-wide hover:bg-gray-800 transition-colors">
                  Learn more
                </button>
              </motion.div>
            </motion.div>
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showDots ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="fixed right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50" 
      >
        {sections.map((_, index) => (
          <motion.button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              activeIndex === index ? "bg-gray-800" : "bg-gray-300"
            }`}
            onClick={() => scrollToSection(index)}
            aria-label={`Navigate to service ${index + 1}`}
            whileHover={{ scale: 1.2 }}
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
          ></motion.button>
        ))}
      </motion.div>

      {/* Tooltip for navigation dots */}
      <AnimatePresence>
        {hoverIndex !== null && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="fixed right-[48px] top-1/2 -translate-y-1/2 z-50 pointer-events-none"
            style={{ top: `calc(50% + ${(hoverIndex - sections.length/2 + 0.5) * 16}px)` }}
          >
            <div className="bg-white px-3 py-1 rounded-md shadow-sm text-xs font-medium text-gray-800">
              {sectionTitles[hoverIndex]}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 1, y: 0 }}
        animate={{ 
          opacity: activeIndex === sections.length - 1 ? 0 : 1,
          y: [0, 10, 0] 
        }}
        transition={{ 
          y: { repeat: Infinity, duration: 2, ease: "easeInOut" },
          opacity: { duration: 0.3 }
        }}
        className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50"
      >
        <div className="flex flex-col items-center">
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
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
