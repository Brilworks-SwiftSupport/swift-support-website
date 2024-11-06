"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const SolutionHeroSection = ({ title, description, image, buttontext }) => {
  return (
    <div className="solutions flex mt-20 3xl:mt-22 h-full solution-hero-bg">
      <div className="container max-w-[1200px] mx-auto">
        <div className="w-full h-full flex flex-col">
          <div className="flex gap-6 lg:flex-row flex-col items-center h-full md:pb-20 3xl:py-20 py-8 xl:px-0 px-4">
            <div className="lg:w-1/2 w-full flex flex-col">
              <h1
                className="mb-8"
                dangerouslySetInnerHTML={{ __html: title }}
              />
              <p className="lg:!text-2xl !text-xl md:!leading-tight text-colorBlack lg:mb-10 mb-6">
                {description}
              </p>

              {/* <div className=""> */}
              <Link
                href="https://cal.com/swiftsupport/demo"
                target="_blank"
                className="common-button black-button w-fit border-colorBlack border"
              >
                {buttontext}
              </Link>
            </div>
            <div className="lg:w-1/2 w-full">
              <Image
                className="!w-full"
                src={image?.filename}
                alt={image?.alt || "guide-banner-image"}
                width="525"
                height="550"
                unoptimized
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolutionHeroSection;
