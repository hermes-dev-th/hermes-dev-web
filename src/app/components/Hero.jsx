"use client";
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslation } from '../../lib/useTranslation';

const Hero = ({ scrollContainerRef }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 640);
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024);
    };
    
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  const handleScroll = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element && scrollContainerRef?.current) {
      scrollContainerRef.current.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  return (
    <section className="w-full min-h-[calc(100vh-80px)] flex flex-col justify-center items-center py-10 sm:py-16 md:py-20 bg-white text-black overflow-hidden px-4 sm:px-6 md:px-8">
      <motion.div 
        className="max-w-7xl mx-auto w-full"
        initial="hidden"
        animate="visible"
        variants={staggerChildren}
      >
        <motion.div 
          className="text-center mb-8 sm:mb-12 md:mb-16"
          variants={staggerChildren}
        >
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-4 md:mb-6"
            variants={fadeInUp}
          >
            <motion.span 
              className="block"
              variants={fadeInUp}
            >
              {t('hero.title')}
            </motion.span>
            <motion.span 
              className="block bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent"
              variants={fadeInUp}
            >
              {t('hero.subtitle')}
            </motion.span>
          </motion.h1>
          <motion.p 
            className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto"
            variants={fadeInUp}
          >
            Experience the perfect blend of elegance and functionality with Hermes.
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="relative mt-4 sm:mt-8"
          variants={fadeInUp}
        >
          <div className="aspect-[16/9] w-full max-w-5xl mx-auto rounded-lg overflow-hidden shadow-xl relative">
            <motion.div
              className="w-full h-full"
              initial={{ scale: 1.05, opacity: 0.9 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5 }}
            >
              <Image
                src="/images/hero-product.jpg"
                alt="Hermes flagship product"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
                className="object-cover"
                priority={true}
                quality={90}
              />
            </motion.div>
            
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
          </div>
        </motion.div>
        
        <motion.div 
          className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mt-8 sm:mt-12"
          variants={staggerChildren}
        >
          <motion.button
            onClick={() => handleScroll('services-section')} 
            className="bg-black text-white px-8 py-3 rounded-full text-lg font-medium hover:opacity-90 transition-all hover:scale-105 active:scale-95"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            variants={fadeInUp}
            aria-label="Explore our services"
          >
            {t('services.title')}
          </motion.button>
          <motion.button
            onClick={() => handleScroll('contact-section')} 
            className="bg-transparent border border-gray-300 px-8 py-3 rounded-full text-lg font-medium hover:bg-gray-50 transition-all hover:border-gray-400"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            variants={fadeInUp}
            aria-label="Contact our team"
          >
            {t('contact.title')}
          </motion.button>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="flex justify-center mt-12 sm:mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center items-start p-1"
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <div className="w-1 h-2 bg-gray-500 rounded-full"></div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;