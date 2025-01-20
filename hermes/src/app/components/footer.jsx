import React from 'react';

const Footer = () => {
    return (
        <>
            <div className="flex flex-row justify-between  px-[2.5vw] bg-black h-[3vw] items-center">
                <div>
                <p className='text-[1vw]'>Hermes-Dev</p>
                </div>

                <div className="flex justify-between flex-row gap-[0.75vw]">
                <a href=""><img className=' w-[2vw]  ' src="images/Group_62.png" alt="" /></a>
                <a href=""><img className=' w-[2vw]  ' src="images/Group_63.png" alt="" /></a>
                <a href=""><img className=' w-[2vw]  ' src="images/Group_64.png" alt="" /></a>
                </div>                
            </div>
        </>
    );
}

export default Footer;
