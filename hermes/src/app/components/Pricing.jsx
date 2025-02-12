import PricingCard from "./PricingCard";
export default function Pricing() {
    return (
        <div className="flex flex-col justify-center items-center w-full h-screen">
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-[3.5vw] font-bold mb-[-1vw]">Pricing</h1>
                <p className="text-[0.9vw]">Choose a Plan That Fits Your Needs</p>
            </div>

            <div className="flex justify-center gap-[5vw] w-full">
                <PricingCard Title='Basic Blueprint' Descript='For those who need a simple webpage that is ready to use.' Price='10,000'/>
                <PricingCard Title='Dynamic Dashboard'/>
                <PricingCard Title='Ultimate Uptime'/>
            </div>
        </div>
    );
}