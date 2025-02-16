"use client";

import { useState, useEffect } from "react";

export default function Hero({ scrollContainerRef }) {
  const [titleSize, setTitleSize] = useState(5.2); // Default size in vw
  const [subtitleSize, setSubtitleSize] = useState(1.8); // Default size in vw
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollContainerRef?.current) return;

      const currentScrollY = scrollContainerRef.current.scrollTop; // Get scroll position

      if (currentScrollY > lastScrollY) {
        // Scrolling down: Reduce text size
        setTitleSize((prev) => Math.max(prev - 0.1, 3.2)); // Min title size
        setSubtitleSize((prev) => Math.max(prev - 0.05, 1.2)); // Min subtitle size
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up: Increase text size
        setTitleSize((prev) => Math.min(prev + 0.1, 5.2)); // Max title size
        setSubtitleSize((prev) => Math.min(prev + 0.05, 1.8)); // Max subtitle size
      }

      setLastScrollY(currentScrollY);
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
  }, [lastScrollY, scrollContainerRef]);

  return (
    <div className="w-full flex flex-col justify-center items-center my-[3vw] sticky top-[12vh]">
      <h1
        className="font-bold my-[-1vw] transition-all duration-600"
        style={{ fontSize: `${titleSize}vw` }}
      >
        Empower the Business
      </h1>
      <p
        className="font-light transition-all duration-600"
        style={{ fontSize: `${subtitleSize}vw` }}
      >
        Transform Your Business with Innovative Web Solutions
      </p>
    </div>
  );
}
