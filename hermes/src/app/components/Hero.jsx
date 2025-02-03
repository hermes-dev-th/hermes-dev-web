import Button from './/Button.jsx'

export default function Hero() {
    return (
      <div className='h-screen'>
        <div className="h-fit w-full flex flex-col justify-center items-center my-[10vw]">
        <img src="/images/Only-Hermes-Dev-Logo.png" className="h-[7vw]" />
        <div className='flex flex-col justify-center items-center my-[1vw] mb-[2vw]'>
          <h1 className='font-bold text-[5.2vw] my-[-1vw]'>Empower the Bussiness</h1>
          <p className='font-light text-[1.8vw] '>Transform YourBusiness with Innovative Web Solutions</p>
        </div>
        <Button Text='Contact Us' />
      </div>
      </div>
    );
  }
  