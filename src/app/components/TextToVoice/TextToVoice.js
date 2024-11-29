"use client"
import React,{ useState } from "react";
import freeForever from "@/app/images/freeForever.svg"
import Image from "next/image";
import BannerLine from "../Tools/BannerLine";
import NavigationButton from "@/app/(pages)/tools/NavigationButton/NavigationButton";

import google_voice from "@/app/images/google_voice.svg"
import voice_text from "@/app/images/voice_text.svg"

const TextToVoiceConverter = () => {
   
      

  return (
    <main className="flex mt-32 justify-center">
      
      <div className="container mx-auto max-w-6xl px-4">
        <Image className="mx-auto mb-5 mt-5" src={freeForever} alt="free-forever" width={"auto"} />
        
        {/* Title Section */}
        <div>
              
                <p className="text-4xl md:text-5xl font-bold mb-5 w-full max-w-[80%] mx-auto font-Urbanist text-[54px]">Convert Your Voice into Words with Ease.</p>
                <BannerLine mLeft={"auto"} mRight={"410px"}/>

                    <p className="text-center text-gray-600 b-8  w-full max-w-[90%] mx-auto mt-2 font-Urbanist font-normal text-[24px]">
                        Effortlessly transcribe spoken words into <span className="bg-clip-text text-transparent bg-text-theme-gradient">Accurate Text</span> with AI.
                    </p>
        </div>

              <div className="flex items-center gap-4 mt-11">
                    <p className="text-[#3B82F6] font-bold whitespace-nowrap font-Urbanist text-[24px]">Other Tools:</p>
                    <div className="flex flex-wrap gap-2">
                    <NavigationButton img={google_voice} href={""} name={"AI Text To Voice"} bgColor={'#FFFEEE'}/>

                    <NavigationButton img={voice_text} href={"/tools/voice-to-text/"} name={"AI Voice To Text"} bgColor={'#FFFFFF'}/>
                       
                      
                        
                    </div>
                    
              </div>
        
      
      </div>
    </main>
  );
};

export default TextToVoiceConverter;