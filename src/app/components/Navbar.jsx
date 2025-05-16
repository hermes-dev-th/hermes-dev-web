"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useTranslation } from '../../lib/useTranslation';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar({ activeSection, scrollToSection }) {
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useTranslation();
  
  const navigationItems = [
    { name: t('nav.home'), section: "hero-section", ariaLabel: "Go to home section" },
    { name: t('nav.services'), section: "services-section", ariaLabel: "View our services" },
    { name: t('nav.pricing'), section: "pricing-section", ariaLabel: "Check our pricing" },
    { name: t('nav.contact'), section: "contact-section", ariaLabel: "Contact us" }
  ];
  
  // ตรวจสอบขนาดหน้าจอและการ scroll
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768);
      
      // เมื่อหน้าจอเล็กกว่า 768px ให้ปิดเมนู
      if (window.innerWidth >= 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    checkDevice();
    handleScroll();
    
    window.addEventListener("resize", checkDevice);
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("resize", checkDevice);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMenuOpen]);
  
  // จัดการการคลิ๊กที่เมนู
  const handleMenuClick = (sectionId) => {
    scrollToSection(sectionId);
    setIsMenuOpen(false);
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || activeSection !== "hero-section" 
            ? "backdrop-blur-lg bg-white/80 shadow-sm border-b border-gray-100" 
            : "backdrop-blur-md bg-white/30"
        }`}
        role="banner"
      >
        <div className="max-w-6xl mx-auto">
          {/* Desktop & Mobile Navigation */}
          <div className={`flex justify-between items-center ${isMobile ? "p-4" : "px-10 py-4"}`}>
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Image 
                  src="/images/Only-Hermes-Dev-Logo.png" 
                  width={28}
                  height={28}
                  className={`transition-all ${isMobile ? "w-6 h-6" : "w-7 h-7"}`} 
                  alt="Hermes Logo" 
                  priority
                />
              </div>
              <span className={`font-medium text-gray-800 tracking-tight ${isMobile ? "text-sm" : "text-base"}`}>
                Hermes Dev
              </span>
            </div>

            {/* Desktop Navigation */}
            {!isMobile && (
              <nav className="flex items-center gap-8" role="navigation" aria-label="Main Navigation">
                {navigationItems.map((item) => (
                  <button 
                    key={item.name}
                    onClick={() => scrollToSection(item.section)}
                    className={`relative text-sm py-1 tracking-wide transition-colors group`}
                    aria-label={item.ariaLabel}
                    aria-current={activeSection === item.section ? "page" : undefined}
                  >
                    <span className={`${
                      activeSection === item.section 
                        ? "text-black font-medium" 
                        : "text-gray-600 hover:text-gray-800"
                    }`}>
                      {item.name}
                    </span>
                    
                    {/* Animated underline */}
                    <span 
                      className={`absolute bottom-0 left-0 w-full h-0.5 transform origin-left transition-transform duration-300 ${
                        activeSection === item.section 
                          ? "bg-black scale-x-100" 
                          : "bg-gray-400 scale-x-0 group-hover:scale-x-100"
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                ))}
                
                {/* Language Switcher for Desktop */}
                <div className="ml-2">
                  <LanguageSwitcher />
                </div>
              </nav>
            )}
            
            {/* Contact Button (Desktop Only) */}
            {!isMobile && (
              <button 
                onClick={() => scrollToSection("contact-section")}
                className="bg-black text-white text-sm px-5 py-2 rounded-full hover:bg-gray-800 transition-colors"
                aria-label="Contact us now"
              >
                {t('hero.cta')}
              </button>
            )}
            
            {/* Mobile Menu Button */}
            {isMobile && (
              <div className="flex items-center gap-4">
                {/* Language Switcher for Mobile */}
                <LanguageSwitcher />
                
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-gray-800 p-1 focus:outline-none"
                  aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                  aria-expanded={isMenuOpen}
                  aria-controls="mobile-menu"
                >
                  <motion.svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-6 w-6" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    animate={{ rotate: isMenuOpen ? 90 : 0 }}
                    transition={{ duration: 0.3 }}
                    aria-hidden="true"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={1.5} 
                      d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
                    />
                  </motion.svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
    
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobile && isMenuOpen && (
          <motion.nav 
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-[65px] z-40 bg-white/95 backdrop-blur-lg border-b border-gray-100 shadow-lg"
            role="navigation"
            aria-label="Mobile Navigation"
          >
            <div className="flex flex-col py-2">
              {navigationItems.map((item) => (
                <button 
                  key={item.name}
                  onClick={() => handleMenuClick(item.section)}
                  className={`py-4 px-6 text-left transition-colors ${
                    activeSection === item.section 
                      ? "text-black font-medium" 
                      : "text-gray-600"
                  }`}
                  aria-label={item.ariaLabel}
                  aria-current={activeSection === item.section ? "page" : undefined}
                >
                  {item.name}
                </button>
              ))}
              <div className="px-5 py-4 border-t border-gray-100 mt-2">
                <button 
                  onClick={() => handleMenuClick("contact-section")}
                  className="bg-black text-white w-full text-center py-3 rounded-full hover:bg-gray-800 transition-colors"
                  aria-label="Contact us now"
                >
                  {t('hero.cta')}
                </button>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
} 