"use client";
import React from "react";
import Image from "next/image";

const AppIntegrationSection = () => {
  return (
    <div className="bg-[#F6FDFF]">
      <div className="container mx-auto max-w-[1080px] py-[80px] flex flex-row items-center">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="mb-4 lg:mb-0 pr-5">
            <Image
              className="md:max-w-[360px] max-w-[320px]"
              src="/images/group-app-integration.webp"
              alt="Immediate data source"
              width="570"
              height="565"
            />
          </div>
          <div className="pl-6">
            <h2 className="font-semibold text-colorBlack text-3xl md:text-4xl xl:text-[52px] xl:leading-tight md:mb-6 mb-5">
              Effortless Integration with Your Favorite Apps and Tools
            </h2>

            <p className="text-lg text-colorBlack font-normal">
              Integrate your favourite apps and tools in just a few clicks.
              SwiftSupport is built to integrate with popular apps and services,
              ensuring seamless workflows and enhanced productivity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppIntegrationSection;
