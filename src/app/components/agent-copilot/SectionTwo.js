import Image from "next/image";
import React from "react";
import DiscriptionList from "./DiscriptionList";
import ImageSection from "./ImageSection";

const SectionTwo = () => {
  return (
    <div className="lg:py-[150px] py-[100px] bg-[#fff] ">
   <div className="container mx-auto lg:px-[5rem]">
        <div className=" w-full px-[15px] flex mb-[80px] flex-col space-y-4 ">
          <div className="image flex justify-center">
            <Image
              src={"/images/agent-copilot/ab2.svg"}
              className="md:scale-[1] scale-[0.8] lg:pb-[30px]"
              width="85"
              height="85"
              priority="true"
            ></Image>
          </div>
          <div className=" flex-[0.2] flex  font-bold md:scale-[1] scale-[0.8]  justify-center lg:text-[40px] text-[38px]">
            <span className="text-blue-500  mr-2"> Pre-Call</span>
            Assist
          </div>
        </div>
        <div className="flex flex-col lg:gap-[unset]  gap-[5rem] ">
        <div className="flex lg:flex-row  flex-col lg:h-[665px]">
          <DiscriptionList />
          <ImageSection />
        </div>
        <div className="flex lg:flex-row  flex-col lg:h-[665px]">
          <ImageSection />

          <DiscriptionList />
        </div>
        <div className="flex lg:flex-row  flex-col lg:h-[665px]">
          <DiscriptionList />
          <ImageSection />
        </div>
        </div>
      </div>
    </div>
  );
};

export default SectionTwo;
