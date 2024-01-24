import Image from "next/image";
import React from "react";

const ExperienceAIBuild = () => {
  return (
    <div className="section-padding flex flex-wrap items-center">
      <div className="lg:w-1/2 w-full md:pr-[35px] pr-0">
        <h2 className="font-bold text-2xl md:text-3xl xl:text-4xl xl:leading-[45.36px] md:mb-30 md:mt-0 mb-5 w-full">
          Experience AI Built for Genuine Connection
        </h2>

        <p className="text-lg text-colorGray font-normal mb-6">
          Your customers aren't just into easy service – they want quick replies
          too! We're all about that. With SwiftSupport, provide
          faster-than-imagined service to your customers in their language of
          choice. Plus, it has an amazing knack for understanding intent, making
          conversations feel completely natural. Deliver omnichannel support
          Proactive customer service Consistent support 24/7  Hyper-personalized
          experience
        </p>
        <ul className="list-disc list-inside">
          <li className="text-lg font-medium leading-7 text-colorDarkBlue">
            Deliver omnichannel support
          </li>
          <li className="text-lg font-medium leading-7 text-colorDarkBlue">
            Proactive customer service
          </li>
          <li className="text-lg font-medium leading-7 text-colorDarkBlue">
            Consistent support 24/7 
          </li>
          <li className="text-lg font-medium leading-7 text-colorDarkBlue">
            Hyper-personalized experience
          </li>
        </ul>
      </div>
      <div className="lg:w-1/2 w-full lg:pl-[35px] mt-5">
        <div className="flex lg:items-end lg:justify-end md:items-center md:justify-center">
          <Image
            className="self-end"
            src="/images/start-chatting.svg"
            alt="Start chatting"
            width="595"
            height="456"
          />
        </div>
      </div>
    </div>
  );
};

export default ExperienceAIBuild;
