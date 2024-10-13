import Image from "next/image";
import React from "react";

const ImageWithGridSection = ({ sectionName }) => {
  const unlockPotentialGridData = {
    title: "Unlock the Full Potential of Your Business with an AI Automation",
    imageSrc: "/images/AI-AUTOMATION.svg",
    imageAlt: "ai-automation",
    gridData: [
      {
        title: "Problem",
        description: "Critical - 2-4 hours, Non critical - 4-8 hours",
        bgColor: "bg-[#FFEFEF]",
      },
      {
        title: "Impact",
        description: "Customer needs to wait",
        bgColor: "bg-[#EAFAFF]",
      },
      {
        title: "Solution",
        description: "1/3 emails can be automated",
        bgColor: "bg-[#E3FFF3]",
      },
      {
        title: "Output",
        description: "Response Time < 1sec",
        bgColor: "bg-[#F9F1FF]",
      },
    ],
  };
  const aiCopilotData = {
    imageSrc: "/images/AI-COPILOT.svg",
    imageAlt: "ai-copilot",
    gridData: [
      {
        title: "Problem",
        description: "Field Service Agent - Manual Reading time 15 - 30 Mins",
        bgColor: "bg-[#FFEFEF]",
      },
      {
        title: "Impact",
        description: "Delay Response",
        bgColor: "bg-[#EAFAFF]",
      },
      {
        title: "Solution",
        description: "a. Make Search Faster, b. Streamline Data",
        bgColor: "bg-[#E3FFF3]",
      },
      {
        title: "Output",
        description: "Resolution on Time",
        bgColor: "bg-[#F9F1FF]",
      },
    ],
  };
  const aiAgentData = {
    imageSrc: "/images/AI-AGENT.svg",
    imageAlt: "ai-agent",
    gridData: [
      {
        title: "Problem",
        description: "Increase Men Power",
        bgColor: "bg-[#FFEFEF]",
      },
      {
        title: "Impact",
        description: "High Cost",
        bgColor: "bg-[#EAFAFF]",
      },
      {
        title: "Solution",
        description: "a. Web Chat, b. WhatsApp Chat",
        bgColor: "bg-[#E3FFF3]",
      },
      {
        title: "Output",
        description: "Reducing Cost 66%",
        bgColor: "bg-[#F9F1FF]",
      },
    ],
  };

  const showDataBasedOnSectionName = {
    "Unlock Full Potential": unlockPotentialGridData,
    "AI Copilot": aiCopilotData,
    "AI Agent": aiAgentData,
  };

  const sectionData = showDataBasedOnSectionName[sectionName] || {};

  return (
    <div
      className="py-[60px]"
      id={sectionName?.replace(" ", "-")?.toLowerCase()}
    >
      <div className="container max-w-[1080px] mx-auto w-full">
        {sectionData?.title && (
          <h2 className="new-h2 w-[80%] mx-auto lg:mb-[50px] md:mb-10 mb-6">
            {sectionData?.title}
          </h2>
        )}
        <div className="flex items-center justify-center mb-[30px]">
          <Image
            className="w-full"
            src={sectionData?.imageSrc}
            alt={sectionData?.imageAlt}
            width="1080"
            height="510"
          />
        </div>
        <div className="grid grid-cols-2 gap-5 mb-[30px] mx-5">
          {sectionData?.gridData.map((item, index) => (
            <div key={index} className={`${item.bgColor} rounded-[20px] p-5`}>
              <p className="text-colorBlack text-xl font-medium mb-[10px]">
                {item.title}:
              </p>
              <p className="text-base text-colorBlack">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageWithGridSection;
