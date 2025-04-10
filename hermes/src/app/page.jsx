"use client";
import { useState, useEffect, useRef } from "react";
import Hero from "@/app/components/Hero.jsx";
import Button from "@/app/components/Button.jsx";
import ServicesPage from "@/app/components/ServicesPage.jsx";
import Pricing from "@/app/components/Pricing.jsx";
import Contact from "@/app/components/Contact.jsx";
import Footer from "@/app/components/Footer";

export default function Home() {
  const scrollContainerRef = useRef(null); // Create ref for scrollable div
  const [logoOpacity, setLogoOpacity] = useState(1);

useEffect(() => {
    const handleScroll = () => {
      if (!scrollContainerRef?.current) return;

      const scrollTop = scrollContainerRef.current.scrollTop;
      const scrollHeight = scrollContainerRef.current.scrollHeight;
      const screenHeight = window.innerHeight;

      // Calculate scroll progress as a percentage of the total scrollable area
      const scrollProgress = scrollTop / (scrollHeight - screenHeight); // 0 to 1 scale

      // Fade out when scrolling past 50% of the screen height
      if (scrollProgress >= 0.1) {
        setLogoOpacity(0); // Fade out logo
      } else {
        const newOpacity = 1 - scrollProgress*2; // Fade from full opacity to 0 as you scroll
        setLogoOpacity(newOpacity);
      }
    };

    const scrollDiv = scrollContainerRef?.current;
    if (scrollDiv) {
      scrollDiv.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollDiv) {
        scrollDiv.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div
      ref={scrollContainerRef} // Attach ref to scrolling div
      className="h-[99vh] overflow-y-scroll scroll-smooth snap-y snap-proximity"
    >
     

      <section className=" h-[92vh] flex flex-col justify-center items-center" id="hero-section">
      <div
        className="w-full flex justify-center items-center"
        style={{
          opacity: logoOpacity,
          transition: "opacity 0.3s ease",  // Instant fade effect
        }}
      >
        <img
          src="/images/Only-Hermes-Dev-Logo.png"
          className="h-[7vw]"
          alt="Logo"
        />
      </div>
        
        {/* Pass scroll reference to Hero */}
        <Hero scrollContainerRef={scrollContainerRef} />

        <div
          className="transition-opacity"
          style={{
            opacity: logoOpacity,
            transition: "opacity 0.3s ease",  // Instant fade effect
          }}
        >
          <Button Text="Contact Us" />
        </div>
      </section>

      <section className="snap-center h-fit content-center mb-[30vh] pt-[5vh]" id="services-section">
        <ServicesPage />
      </section>

      <section className="h-full snap-center content-center pb-[8vh] mb-[12vh]" id="pricing-section">
        <Pricing />
      </section>

      <section className="h-full snap-center content-center pt-[8vh]" id="contact-section">
        <Contact />
      </section>
      
      <section>
      <Footer />
      </section>
    </div>
  );
}
