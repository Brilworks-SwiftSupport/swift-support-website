import Image from "next/image";
import React from "react";

const Main = () => {
  return (
    <>
      <div className="md:bg-[url(/images/agent-copilot/banner.webp)] bg-black bg- w-full h-[100vh] object-fill  bg-no-repeat  ">
        <div className="flex px-auto flex-col-reverse md:flex-row h-full pt-[100px] md:mx-[3%]  items-center">
          <div className="flex-[0.5] mx-[3%] md:mx-[0%] h-full flex-col py-[3rem] md:py-[6rem] flex justify-between ">
            <div className="main-title">
              <Image
                src={"/images/footer-logo.svg"}
                className="md:scale-[1.7] scale-[0.7] translate-x-[-14%] md:translate-x-[unset] md:pl-[3rem]"
                width="240"
                height="70"
                priority="true"
              ></Image>
            </div>
            <div className="space-y-4">
              <div>
                <h1 className="text-[2.063rem] md:text-[3.2rem]  lg:text-[4.938rem] font-bold text-[#fff]">
                  Meet the Copilot your Agents will Love...
                </h1>
                <h2 className="text-[0.875rem]  md:text-[2.2rem] lg:text-[3.063rem] font-thin text-[#fff]">
                  Powered by LLaMB™
                </h2>
              </div>
              <div className="flex gap-[0.5rem] md:gap-[3rem]">
                <button className="bg-[#01a9f4] rounded-[40px] hover:bg-black text-[#fff]  text-[12px] md:text-[18px] px-[21px] lg:px-[31px] py-[0.6rem] hover:text-[#fff] ">
                  {" "}
                  Request Demo
                </button>
                <button className="bg-[#ff006e] rounded-[40px] hover:bg-black text-[#fff] text-[12px] md:text-[18px]  px-[21px] lg:px-[31px]   hover:text-[#fff] ">
                  On Demand Livestream
                </button>
              </div>
            </div>
          </div>
          <div className="flex-[0.5] h-full bg-[url(/images/agent-copilot/banner.webp)] md:opacity-0  bg-no-repeat   w-full">
            {/* image Div */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
