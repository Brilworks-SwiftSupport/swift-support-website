"use client";
import React from "react";
import Image from "next/image";

const AppIntegrationSection = () => {
  return (
    <div className="container mx-auto section-padding lg:!pt-14 pt-6 flex flex-wrap items-center gap-8">
      <div className="lg:w-1/2 w-full mx-auto lg:pr-[35px] mb-4 lg:mb-0">
        <Image
          className="w-[500px] self-end"
          src="/images/group-app-integration.webp"
          alt="Immediate data source"
          width="570"
          height="565"
        />
      </div>
      <div className="lg:w-2/5 w-full mx-auto lg:pl-[35px]">
        <h2 className="font-bold text-2xl md:text-3xl xl:text-4xl xl:leading-[45.36px] md:mb-30 md:mt-0 mb-5">
          Effortless Integration with Your Favorite Apps and Tools
        </h2>

        <p className="text-lg text-colorGray font-normal">
          Integrate your favourite apps and tools in just a few clicks.
          SwiftSupport is built to integrate with popular apps and services,
          ensuring seamless workflows and enhanced productivity.
        </p>
      </div>
    </div>
  );
};

export default AppIntegrationSection;
