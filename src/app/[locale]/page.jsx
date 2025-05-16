"use client";

import { useState, useRef, useEffect } from 'react';
import { useTranslation } from '../../lib/useTranslation';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ServicesPage from '../components/ServicesPage';
import Pricing from '../components/Pricing';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import { use } from 'react';

export default function Home({ params }) {
  // Unwrap params using React.use()
  const unwrappedParams = use(params);
  const { locale } = unwrappedParams;
  
  const [activeSection, setActiveSection] = useState('hero-section');
  const scrollContainerRef = useRef(null);
  const sectionRefs = {
    'hero-section': useRef(null),
    'services-section': useRef(null),
    'pricing-section': useRef(null),
    'contact-section': useRef(null),
  };
  
  // Function to scroll to a specific section
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 70, // Adjust for navbar height
        behavior: 'smooth'
      });
    }
  };

  // Observer to detect the active section during scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-100px 0px -100px 0px',
        threshold: 0.3
      }
    );

    // Observe each section
    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      // Cleanup observer on component unmount
      Object.values(sectionRefs).forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  useEffect(() => {
    // Initialize refs after component mounts
    sectionRefs['hero-section'].current = document.getElementById('hero-section');
    sectionRefs['services-section'].current = document.getElementById('services-section');
    sectionRefs['pricing-section'].current = document.getElementById('pricing-section');
    sectionRefs['contact-section'].current = document.getElementById('contact-section');
    
    // Start observing sections
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-100px 0px -100px 0px',
        threshold: 0.3
      }
    );

    // Observe each section
    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      // Cleanup observer on component unmount
      Object.values(sectionRefs).forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  return (
    <div ref={scrollContainerRef} className="relative scroll-smooth">
      <Navbar activeSection={activeSection} scrollToSection={scrollToSection} />
      
      <div id="hero-section">
        <Hero scrollContainerRef={scrollContainerRef} />
      </div>
      
      <div id="services-section">
        <ServicesPage />
      </div>
      
      <div id="pricing-section">
        <Pricing />
      </div>
      
      <div id="contact-section">
        <Contact />
      </div>
      
      <Footer />
    </div>
  );
} 