import Image from "next/image";
import Link from "next/link";
import React from "react";

const HeroSection = () => {
  return (
    <div className="hero-section section-padding lg:!pt-[100px] md:!pt-[150px] !pt-[100px] mt-[6%]">
      <div className="container max-w-[1080px] mx-auto">
        <h1 className="lg:text-[68px] md:text-[48px] leading-tight text-4xl md:w-[80%] w-full text-colorBlack font-semibold mx-auto text-center mb-4">
          AI-Powered Support for Your Business
        </h1>
        <p className="text-colorBlack font-medium text-2xl text-center">
          Your customers deserve SwiftSupport, always!
        </p>
        <div className="banner-underline"></div>
        {/* <div className="!w-[418px] !h-4 bg-gradient-to-r from-[#F3EE7C] via-[#83DEFC] via-33% to-[#FFFFFF] to-70% lg:mb-[50px] md:mb-[40px] mb-7" /> */}
        <p className="md:text-2xl text-xl text-colorBlack text-center md:pb-[60px] pb-8">
          Swift Support's mission is to streamline customer interactions and
          reduce wait times by providing businesses with&nbsp;
          <span className="text-[#2563EB] font-semibold">
            AI Automation, AI Co-pilots, and AI Agents.
          </span>
        </p>
        <div className="flex items-center justify-center flex-wrap gap-5 lg:!mb-[110px] md:!mb-[60px] !mb-10">
          <Link
            href="https://www.youtube.com/@SwiftSupportdotai"
            target="_blank"
            className="flex items-center justify-center gap-2 font-semibold border-colorBlack border bg-colorBlack text-colorWhite rounded-[30px] px-6 py-4 text-xl"
          >
            <Image
              src="/images/play-arrow.svg"
              alt="solution-providing"
              width="12"
              height="14"
            />
            Watch Demo
          </Link>
          <Link
            href="https://app.swiftsupport.ai/signup"
            target="_blank"
            className="font-semibold text-xl border-colorBlack border rounded-[30px] !bg-colorWhite px-6 py-4"
          >
            Try Now
          </Link>
        </div>
        <div className="flex items-center justify-center !mt-5">
          <Image
            className="max-w-full"
            src="/images/solution-providing.svg"
            alt="solution-providing"
            width="1020"
            height="380"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
