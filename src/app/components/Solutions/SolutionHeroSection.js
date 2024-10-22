"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const SolutionHeroSection = ({ title, description, image, buttontext }) => {
  return (
    <div className="solutions flex mt-24 h-full solution-hero-bg">
      <div className="container max-w-[1080px] mx-auto">
        <div className="w-full h-full flex flex-col">
          <div className="flex gap-6 lg:flex-row flex-col items-start h-full md:py-20 py-8 xl:px-0 px-4">
            <div className="lg:w-1/2 w-full flex flex-col h-full">
              <div className="flex-grow">
                <h1 className="mb-6">{title}</h1>
                <p className="lg:!text-2xl !text-xl md:!leading-tight text-colorBlack">
                  {description}
                </p>
              </div>
              <div className="lg:mt-auto mt-6">
                <Link
                  href="https://cal.com/swiftsupport/demo"
                  target="_blank"
                  className="flex items-center justify-center w-fit font-semibold border-colorBlack border bg-colorBlack text-colorWhite rounded-[30px] px-6 py-4 text-xl"
                >
                  {buttontext}
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2 w-full h-full">
              <Image
                className="h-full !w-full"
                src={image?.filename}
                alt={image?.alt || "guide-banner-image"}
                width="525"
                height="550"
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
