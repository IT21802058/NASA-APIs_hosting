import React from "react";
import wave from "../assets/wave.gif"

const AstroMainmid = ()=>{
    return(
        <div className="bg-black/10 h-full text-white relative">
        <div className="h-full flex justify-center items-center p-4">
            <div className="container grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-4 lg:pr-36">
                    <h1 className="text-5xl lg:text-5xl font-bold uppercase">Beyond Earth's atmosphere...</h1>
                    <p>Discover captivating images of distant nebulae, majestic planets, and breathtaking cosmic phenomena that will leave you spellbound. Stay updated with the latest news and discoveries from the forefront of astronomy, including groundbreaking research, fascinating space missions, and celestial events that illuminate the heavens.</p>
                    </div>
            </div>
        </div>
        <img src={wave} alt="" className="h-[25px] w-full object-cover mix-blend-screen-translate-y-0 relative z-[8] blur-3xl" />
    </div>
    )
}

export default AstroMainmid;