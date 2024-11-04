"use client";
import React from "react";
import SolutionContactForm from "./SolutionContactForm";

const SolutionWhyChooseUs = ({ title, description, keyValueData }) => {
  const keyValueLength = keyValueData.length;

  return (
    <div className="solutions xl:py-[90px] lg:py-[60px] md:py-10 py-8 md:px-0 !px-4">
      <div className="container max-w-[1200px] mx-auto">
        <div className="w-full">
          <h2 className="mb-5 md:text-center text-start">{title}</h2>
          <p className="!text-base text-colorBlack md:text-center text-left lg:mb-[50px] md:mb-10 mb-6">
            {description}
          </p>
        </div>
        <div className="grid md:grid-cols-3 grid-cols-1 lg:mb-[60px] md:mb-12 mb-9">
          {keyValueData?.slice(2, keyValueLength)?.map((data, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center md:border-r border-b md:border-b-0 border-[#BDBDBD] last:border-r-0 last:border-b-0"
            >
              <span className="font-bold lg:text-[62px] md:text-[52px] text-[42px] text-colorBlack">
                {data?.Key}
              </span>
              <p className="md:text-2xl text-xl md:leading-[58px] font-medium leading-[38px] bg-clip-text text-transparent bg-text-theme-gradient">
                {data?.Value}
              </p>
            </div>
          ))}
        </div>
        <SolutionContactForm />
      </div>
    </div>
  );
};

export default SolutionWhyChooseUs;
