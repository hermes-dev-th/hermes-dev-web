"use client";
import Hero from './components/Hero.jsx'
import Button from './components/Button.jsx'
import ServicesPage from './components/ServicesPage.jsx'
import Pricing from './components/Pricing.jsx'
import { Parallax, ParallaxProvider } from 'react-scroll-parallax';

export default function Home() {
  return (

    <ParallaxProvider>
      <div className='flex flex-col justify-center items-center mt-[30vw]'>
        <div className='flex flex-col items-center justify-center'>
          <Parallax speed={-40} startScroll={200} endScroll={450} opacity={[1, 0]}>
            <img src="/images/Only-Hermes-Dev-Logo.png" className="h-[7vw]" />
          </Parallax>
          <Parallax speed={-40} startScroll={200} endScroll={450} scale={[1, 0.75]}>
            <Hero />
          </Parallax>
          <Parallax speed={-40} startScroll={200} endScroll={450} opacity={[1, 0]}>
            <Button Text='Contact Us' />
          </Parallax>
        </div>
      </div>

      <ServicesPage />
      <Pricing  />



    </ParallaxProvider >

  );
}
