import Image from "next/image";
import React from "react";

const BusinessHelpIcons = ({ imgSrc, altText }) => {
  return (
    <div className="mx-auto md:w-[170px] w-[100px] md:h-[170px] h-[100px] pt-[2px] pb-1 pr-1 pl-[2px] rounded-2xl app-integration-gradient">
      <div className="bg-white w-full h-full rounded-[12px] flex items-center justify-center">
        <Image
          className="w-[50%]"
          src={imgSrc}
          alt={altText}
          width="86"
          height="86"
        />
      </div>
    </div>
  );
};

const HelpBusinesses = () => {
  const howSwiftSupportHelpBusiness = [
    {
      imgSrc: "/images/active-directory.png",
      imgSrcAlt: "Data-Source",
      title: "Manage all your AI Data Sources",
      desc: "Integrate and control all your data sources in one powerful platform.",
    },
    {
      imgSrc: "/images/robotic-process-automation.png",
      imgSrcAlt: "Frictionless-service",
      title: "Frictionless, Futuristic Automation",
      desc: "Save time with AI-driven workflows and automated responses.",
    },
    {
      imgSrc: "/images/customer-service.png",
      imgSrcAlt: "24X7-Support",
      title: "24/7 Omnichannel Support",
      desc: "Provide consistent support across chat, email, phone, and social media-anytime, anywhere.",
    },
    {
      imgSrc: "/images/customer.png",
      imgSrcAlt: "Personalizes-experience",
      title: "Hyper-Personalized Experiences",
      desc: "Tailor responses to each customer with AI insights, improving customer satisfaction.",
    },
    {
      imgSrc: "/images/supporting.png",
      imgSrcAlt: "Quick-support",
      title: "Proactive Support",
      desc: "Predict and resolve issues before they escalate.",
    },
    {
      imgSrc: "/images/decision.png",
      imgSrcAlt: "Data-driven-insight",
      title: "Data- Driven Insights",
      desc: "Make informed decisions with real-time analytics and reporting.",
    },
  ];
  return (
    <div className="container mx-auto w-full section-padding">
      <h2 className="w-full md:text-[36px] text-[26px] font-bold md:text-center text-left mb-10 md:mb-[60px]">
        Here’s how SwiftSupport can help businesses
      </h2>
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-x-[30px] md:gap-y-[60px] gap-y-[30px]">
        {howSwiftSupportHelpBusiness.map((data, index) => (
          <div
            className="flex md:flex-nowrap flex-wrap items-center gap-[30px]"
            key={index}
          >
            <div className="md:w-auto w-full flex items-center">
              <BusinessHelpIcons
                imgSrc={data?.imgSrc}
                imgSrcAlt={data?.imgSrcAlt}
              />
            </div>
            <div>
              <h3 className="md:text-2xl lg:text-xl xl:text-2xl text-xl font-medium lg:mb-5 mb-2">
                {data?.title}
              </h3>
              <p className="md:text-2xl lg:text-xl xl:text-2xl text-xl text-colorGray font-normal">
                {data?.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HelpBusinesses;
