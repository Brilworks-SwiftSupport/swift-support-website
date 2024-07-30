import Image from "next/image";
import React from "react";

const FoundationSwiperDataDiv = () => {
  return (
    <div className="flex shadow-lg lg:h-[560px] lg:w-[1300px]  w-full  ">
      <div className="flex rounded-lg  flex-col lg:flex-row  bg-[#fff] bg-opacity-[0.1] ">
        <div className="flex-[0.5] p-4 ">
          <Image
            src={"/images/Education_img.webp"}
            className="object-fill w-full h-full"
            width="580"
            height="520"
            priority="true"
          ></Image>
        </div>
        <div className="flex-[0.5] flex justify-between flex-col space-y-5 p-5">
          <div className="space-y-5">
            <h1 className="lg:text-[40px] text-[20px] font-bold text-white">
              Powerd by LLaMb
            </h1>
            <p className="text-white lg:text-[22px] text-[15px]">
              LLaMB is a new low code framworks for building powerfull
              generative ai Agents in the enterprise safely securely and fast
            </p>

            <ul className="list-outside pl-6 space-y-1">
              <li className="text-[#ffffff54] marker:text-[#ffffff54] font-[400] lg:text-[18px] text-[15px] leading-[32px] list-disc ">
                Built in Trust Layer
              </li>
              <li className="text-[#ffffff54] marker:text-[#ffffff54] font-[400] lg:text-[18px] text-[15px] leading-[32px] list-disc ">
                Dynamic prompts
              </li>
              <li className="text-[#ffffff54] marker:text-[#ffffff54] font-[400] lg:text-[18px] text-[15px] leading-[32px] list-disc ">
                Built in Trust Layer
              </li>
              <li className="text-[#ffffff54] marker:text-[#ffffff54] font-[400] lg:text-[18px] text-[15px] leading-[32px] list-disc ">
                Dynamic prompts
              </li>
            </ul>
          </div>

          <div>
            <button className="bg-[#01a9f4] rounded-[40px] hover:bg-black text-[#fff]  text-[12px] md:text-[18px] px-[21px] lg:px-[31px] py-[0.6rem] hover:text-[#fff] ">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoundationSwiperDataDiv;
