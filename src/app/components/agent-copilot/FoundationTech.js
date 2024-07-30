import Image from "next/image";
import React from "react";

import SpliderSwipe from "./SpliderSwipe";

const FoundationTech = () => {
  return (
    <div className=" lg:min-h-[100vh] lg:py-[150px] py-[10%] bg-black">
      <div className="">
        <div className="text-center container  mx-auto">
          <h1 className="lg:text-[60px] text-[30px] text-[#fff] font-bold">
            Foundational Technology
          </h1>
        </div>
        <div>
          <SpliderSwipe />
        </div>
        <div className="flex flex-col lg:gap-[4rem] gap-[1rem] lg:mt-[150px] mt-[10%] justify-center items-center container mx-auto ">
          <div className=" lg:text-[60px] text-[30px] text-center text-white font-light">
            How does Agent Assist Work?
          </div>
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
  );
};

export default FoundationTech;
