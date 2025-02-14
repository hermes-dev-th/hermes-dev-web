"use client";
import { useState, useEffect } from "react";
import Hero from "./components/Hero.jsx";
import Button from "./components/Button.jsx";
import ServicesPage from "./components/ServicesPage.jsx";
import Pricing from "./components/Pricing.jsx";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";

export default function Home() {
  const [isPassed, setIsPassed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Get the ServicesPage section position
      const serviceSection = document.getElementById("services-section");
      if (serviceSection) {
        const rect = serviceSection.getBoundingClientRect();
        setIsPassed(rect.top <= 100); // Adjust threshold as needed
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <ParallaxProvider>
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col items-center justify-center mt-[8vw]">
          {/* Logo */}
          <Parallax speed={15} startScroll={0} endScroll={500} opacity={[1, 0]} className='fixed top-[5vw]'>
            <img src="/images/Only-Hermes-Dev-Logo.png" className="h-[7vw]" />
          </Parallax>

          {/* Hero Section */}
          <Parallax
            speed={15}
            startScroll={0}
            endScroll={500}
            scale={[1, 0.75]}
            opacity={[1, isPassed ? 0 : 1]}
            className={`fixed top-[10vw] ${
              isPassed ? "opacity-0" : "opacity-100"
            } transition-opacity duration-800`}
          >
            <Hero />
          </Parallax>

          {/* Contact Button */}
          <Parallax speed={15} startScroll={0} endScroll={500} opacity={[1, 0]} className='fixed top-[25vw]'>
            <Button Text="Contact Us" />
          </Parallax>
        </div>
      </div>

      {/* Services Section - Add ID to detect when it appears */}
      <Parallax className="mt-[60vw]" id="services-section" speed={-15}>
        <ServicesPage />
      </Parallax>

      {/* Pricing Section */}
      <Parallax speed={50}>
        <Pricing />
      </Parallax>
    </ParallaxProvider>
  );
}
