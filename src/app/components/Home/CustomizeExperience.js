import Image from "next/image";
import React from "react";

const CustomizeExperience = () => {
  return (
    <div className="section-padding flex flex-wrap">
      <div className="lg:w-1/3 w-full md:pr-[30px]">
        <div className="mb-[30px]">
          <h2 className="font-bold text-2xl md:text-3xl xl:text-4xl xl:leading-[45.36px] md:pr-20">
            Customize the Entire Experience
          </h2>
        </div>
        <div className="flex mb-10">
          <div className="min-w-[14px] h-6 custom-shadow bg-themePink rounded-xl mt-1"></div>
          <div className="ml-7">
            <h3 className="text-colorDarkBlue text-2xl font-medium mb-[10px]">
              Tailored Interaction
            </h3>
            <p className="text-colorGray text-lg font-normal">
              Customize your chatbot experience to meet your specific
              preferences.
            </p>
          </div>
        </div>
        <div className="flex mb-10">
          <div className="min-w-[14px] h-6 custom-shadow bg-themeBlue rounded-xl mt-1"></div>
          <div className="ml-7">
            <h3 className="text-colorDarkBlue text-2xl font-medium mb-[10px]">
              Personalized Settings
            </h3>
            <p className="text-colorGray text-lg font-normal">
              Adjust settings according to your liking for a truly personalized
              interaction.
            </p>
          </div>
        </div>
        <div className="flex">
          <div className="min-w-[14px] h-6 custom-shadow bg-themeYellow rounded-xl mt-1"></div>
          <div className="ml-7">
            <h3 className="text-colorDarkBlue text-2xl font-medium mb-[10px]">
              Seamless Adaptability
            </h3>
            <p className="text-colorGray text-lg font-normal">
              Enjoy a chatbot journey that's seamlessly adaptable, putting you
              in control.
            </p>
          </div>
        </div>
      </div>
      <div className="lg:w-2/3 w-full my-4 lg:my-0 ">
        <div className="flex items-end justify-end">
          <Image
            className="self-end"
            src="/images/customize-experience.svg"
            alt="Customize experince"
            width="815"
            height="563"
          />
        </div>
      </div>
    </div>
  );
};

export default CustomizeExperience;
