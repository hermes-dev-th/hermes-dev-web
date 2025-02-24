import PricingCard from "./PricingCard";
export default function Pricing() {
    return (
        <div className="flex flex-col justify-center items-center w-full h-full gap-[3vw]">
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-[3.5vw] font-bold mb-[-1vw]">Pricing</h1>
                <p className="text-[0.9vw]">Choose a Plan That Fits Your Needs</p>
            </div>

            <div className="flex justify-center gap-[5vw] w-full">
                <PricingCard Title='Basic Blueprint' Descript='For those who need a simple webpage that is ready to use.' Price='10,000' Website={true} Image='./images/Only-Hermes-Dev-Logo.png'/>
                <PricingCard Title='Dynamic Dashboard' Descript='For those who need a backend system for easy content management.' Price='50,000' Website={true} Backend={true} Maintenance={true} Image='./images/Only-Hermes-Dev-Logo.png'/>
                <PricingCard Title='Ultimate Uptime' Descript='For those who need a fully-featured website with maintenance and support.' Price='100,000' Website={true} Backend={true} Dashboard={true} Maintenance={true} Admin={true} Image='./images/Only-Hermes-Dev-Logo.png'/>
            </div>
        </div>
    );
}