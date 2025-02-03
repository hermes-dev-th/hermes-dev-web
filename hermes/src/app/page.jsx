import Hero from './components/Hero.jsx'
import ServicesPage from './components/ServicesPage.jsx'

export default function Home() {
  return (
    <div className='flex flex-col justify-center items-center'>
     <Hero />
     <ServicesPage />

    </div>
  );
}
