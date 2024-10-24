"use client";
import React from "react";
import Image from "next/image";

const AppIntegrationSection = () => {
  return (
    <div>
      <div className="container mx-auto max-w-[1200px] lg:py-[80px] md:py-[50px] py-10 flex flex-row items-center">
        <div className="flex flex-col lg:flex-row lg:gap-[70px] items-center gap-5 md:gap-0">
          <div className="mb-4 lg:mb-0 md:pr-5">
            <Image
              className="md:max-w-[440px] max-w-[260px]"
              src="/images/group-app-integration.webp"
              alt="Immediate data source"
              width="570"
              height="565"
            />
          </div>
          <div className="md:pl-6">
            <h2 className="new-h2 lg:w-[80%] w-full !text-left mr-auto mb-5">
              Effortless Integration with Your Favorite Apps and Tools
            </h2>

            <p className="text-lg text-colorBlack font-normal pl-4 md:pl-0">
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
