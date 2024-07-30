import Image from "next/image"
import React from 'react'

import SpliderSwipe from "./SpliderSwipe"

const FoundationTech = () => {
  return (
    <div className=" min-h-[100vh] py-[150px] bg-black">
        <div className="">
        <div  className="text-center container  mx-auto">
            <h1 className="text-[60px] text-[#fff] font-bold">Foundational Technology</h1>
        </div>
        <div>
        <SpliderSwipe/>
        </div>
        <div className="flex flex-col gap-[4rem] mt-[150px] justify-center items-center container mx-auto ">
            <div className=" text-[60px] text-white font-light">How does Agent Assist Work?</div>
            <Image
              src={"/images/agent-copilot/diagram-callsavings-v2-1.svg"}
              className="md:scale-[1] scale-[0.8] lg:pb-[30px]"
              width="1300"
              height="700"
              priority="true"
            />
        
        </div>
        </div>
    </div>
  )
}

export default FoundationTech