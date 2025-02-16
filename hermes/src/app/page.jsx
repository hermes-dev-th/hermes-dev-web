"use client";
import { useState, useEffect } from "react";
import Hero from "./components/Hero.jsx";
import Button from "./components/Button.jsx";
import ServicesPage from "./components/ServicesPage.jsx";
import Pricing from "./components/Pricing.jsx";
import Contact from "./components/Contact.jsx";
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
      <div className="h-screen overflow-y-scroll scroll-smooth snap-y snap-proximity">
        {/* Logo */}
        <section className="snap-center h-full flex flex-col justify-center items-center">
          <Parallax speed={15} startScroll={0} endScroll={500} opacity={[1, 0]} className='fixed top-[12vh]'>
            <img src="/images/Only-Hermes-Dev-Logo.png" className="h-[7vw]" />
          </Parallax>

          {/* Hero Section */}

          <Parallax
            speed={15}
            startScroll={0}
            endScroll={500}
            scale={[1, 0.75]}
            opacity={[1, isPassed ? 0 : 1]}
            className={`fixed top-[20vh] ${isPassed ? "opacity-0" : "opacity-100"
              } transition-opacity duration-800`}
          >
            <Hero />
          </Parallax>

          {/* Contact Button */}
          <Parallax speed={15} startScroll={0} endScroll={500} opacity={[1, 0]} className='fixed top-[45vh]'>
            <Button Text="Contact Us" />
          </Parallax>
        </section>


        {/* Services Section - Add ID to detect when it appears */}
        <section className="snap-center h-screen justify-center content-center" id="services-section">
          <Parallax>
            <ServicesPage />
          </Parallax>
        </section>

        {/* Pricing Section */}
        <section className="h-full snap-center content-center">
          <Pricing />
        </section >
        <section className="h-screen snap-center content-center">
          <Contact />
        </section >
      </div>
    </ParallaxProvider>
  );
}
