"use client";
import React, { useEffect } from 'react';

const ScrollToTopOnRefresh = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top
  }, []);

  return null; // No need to render anything here
};

export default ScrollToTopOnRefresh;
//change