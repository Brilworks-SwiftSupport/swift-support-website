import Image from "next/image";
import React from "react";

const AboutAgent = () => {
  return (
    <div className=" pt-[50px] lg:pt-[150px] pb-[60px] md:pb-[250px] bg-[url(/images/agent-copilot/bottom.svg)] bg-bottom bg-no-repeat w-[95%] mx-auto flex justify-center items-center">
      <div className="flex flex-col space-y-5 justify-center items-center container px-[5rem]">
        <div className="flex flex-col justify-center  md:mb-[75px]  mb-[45px] items-center">
              <Image
                src={"/images/logo.svg"}
                className="md:scale-[1.2] scale-[0.5] lg:pb-[50px]"
                width="275"
                height="40"
                priority="true"
              ></Image>
          <h1 className="lg:text-[4.125rem] text-[38px] lg:leading-[74px] text-center  leading-[44px]  font-semibold lg:font-bold">Your AI Copilot for the<br className="lg:block hidden "></br> Entire Call Journey</h1>
          <p className="py-[30px] lg:w-[58%] w-full px-[0.4rem] text-center lg:text-[22px] font-[300]">
            Our Agent Copilots intelligently guide agents through every step of
            the call journey. Once a call is accepted, our software thoughtfully
            provides AI-generated assistance, leveraging generative AI
            capabilities to enhance the entire experience.
          </p>
          <div className="lg:text-[18px] font-extralight flex text-gray-400">powered by <span className="font-bold text-[#000] uppercase flex"> 
          <Image
                src={"/images/logo.png"}
                className=" flex px-[4px]"
                width="30"
                height="30"
                priority="true"
              ></Image>llamb</span></div>
        </div>
        <div className="flex flex-col lg:flex-row  lg:gap-[4rem] gap-[3rem] justify-between ">
        
            <div className=" w-full px-[15px] flex flex-col space-y-4">
            <div className="image flex justify-center">
                <Image
                src={"/images/agent-copilot/ab1.svg"}
                className="md:scale-[1] scale-[0.8] lg:pb-[50px]"
                width="75"
                height="75"
                priority="true"
              ></Image>
                </div>
                <div className=" flex-[0.2] flex  md:scale-[1] scale-[0.8]  justify-center text-[40px]">
                <span className="text-blue-500  mr-2"> Pre-Call</span>
                Assist
                </div>
                <p className="lg:text-[20px] text-center font-[300]">
                Our AI Copilot gets a head start by mining relevant CRM data, previous requests, historical interactions and more before the first hello. Agents receive a panoramic customer view to hit the ground running.
                </p>

            </div>
            <div className="w-full px-[15px]  flex flex-col space-y-4">
            <div className="image flex justify-center">
                <Image
                src={"/images/agent-copilot/ab2.svg"}
                className="md:scale-[1] scale-[0.8] lg:pb-[50px]"
                width="75"
                height="75"
                priority="true"
              >
              </Image>
                </div>
                <div className=" flex-[0.2] flex  md:scale-[1] scale-[0.8]  justify-center text-[40px]">
                <span className="text-blue-500 mr-2">In-Call</span> Assist

                </div>
               
                <p className="lg:text-[20px] text-center font-[300]">
                No more app switching or silo scrambling for your agents. AI Copilot dynamically serves up the knowledge and responses they need, in lockstep with the conversation flow.
                </p>

            </div>
            <div className="w-full px-[15px]  flex flex-col space-y-4 ">
            <div className="image w-full h-full flex-[0.2] flex justify-center">
            <Image
                src={"/images/agent-copilot/ab3.svg"}
                className="md:scale-[1] scale-[0.8] lg:pb-[50px]"
                width="75"
                height="75"
                priority="true"
              >
              </Image>
                </div>
                <div className=" flex-[0.2] md:scale-[1] scale-[0.8] flex justify-center text-[40px]">
                <span className="text-blue-500 mr-2">Post-Call</span> Assist

                </div>
                <p className="lg:text-[20px] text-center font-[300]">Our AI Copilot ensures your agents make the most of their valuable time by reducing administrative burdens. Energize your customer service through the dual benefits of robust documentation and liberated employee focus.</p>

            </div>

        </div>
      </div>
    </div>
  );
};

export default AboutAgent;
