export default function PricingCard({ Title, Descript, Price }) {
    return (
        <>
            <div className="border-[0.2vw] border-black rounded-[1vw] w-[20vw]">
                <div className="flex flex-col my-[2vw]">
                    <div className="flex flex-col items-center justify-center mb-[1vw]">
                        <h1 className="text-[1.4vw] font-bold">{Title}</h1>
                        <p className="text-[0.9vw] text-pretty text-center mx-[1.8vw]">{Descript}</p>
                    </div>
                    <div className="flex flex-col justify-start">
                        <h1 className="text-[1.7vw] font-bold">THB {Price}</h1>
                    </div>
                </div>
            </div>
        </>


    );
}