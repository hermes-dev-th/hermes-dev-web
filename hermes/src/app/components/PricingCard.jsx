import Link from "next/link";

export default function PricingCard({ Title, Descript, Price, Website, Backend, Dashboard, Maintenance, Admin, Image}) {
    return (
        <>
            <Link href="/">
            <div className="border-[0.2vw] border-black rounded-[1vw] w-[20vw] shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
                <div className="flex flex-col my-[1vw]">

                    <div className="flex flex-col items-center justify-center mb-[1vw]">
                        <h1 className="text-[1.4vw] font-bold">{Title}</h1>
                        <p className="text-[0.85vw] text-pretty text-center mx-[1.8vw] font-light">{Descript}</p>
                    </div>

                    <div className="flex flex-col justify-start ml-[1vw] gap-[0.3vw]">
                        <h1 className="text-[1.7vw] font-bold">THB {Price}</h1>
                        <div className="flex gap-[0.5vw]">
                            <img src={Website ? './images/check-icon.png' : './images/cross-icon.png'} className="h-[1vw]"></img>
                            <p className="text-[0.9vw] font-light">Website</p>
                        </div>
                        <div className="flex gap-[0.5vw]">
                            <img src={Backend ? './images/check-icon.png' : './images/cross-icon.png'} className="h-[1vw]"></img>
                            <p className="text-[0.9vw] font-light">Backend</p>
                        </div>
                        <div className="flex gap-[0.5vw]">
                            <img src={Maintenance ? './images/check-icon.png' : './images/cross-icon.png'} className="h-[1vw]"></img>
                            <p className="text-[0.9vw] font-light">Maintenance</p>
                        </div>
                        <div className="flex gap-[0.5vw]">
                            <img src={Dashboard ? './images/check-icon.png' : './images/cross-icon.png'} className="h-[1vw]"></img>
                            <p className="text-[0.9vw] font-light">Dashboard</p>
                        </div>
                        <div className="flex gap-[0.5vw]">
                            <img src={Admin ? './images/check-icon.png' : './images/cross-icon.png'} className="h-[1vw]"></img>
                            <p className="text-[0.9vw] font-light">Admin</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-center w-full mt-[1.5vw]">
                    <img src={Image} alt="Image" className="h-[10vw] w-[10vw]"></img>
                    </div>
                    
                </div>
            </div>
            </Link>
        </>


    );
}