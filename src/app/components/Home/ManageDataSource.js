import Image from "next/image";
import React from "react";

const ManageDataSource = () => {
  return (
    <div className="section-padding flex flex-wrap">
      <div className="lg:w-1/3 w-full md:pr-[30px]">
        <div className="mb-[30px]">
          <h2 className="font-bold text-2xl md:text-3xl xl:text-4xl xl:leading-[45.36px] md:pr-20">
            Manage all your AI Datasources
          </h2>
        </div>
        <div className="flex mb-10">
          <div className="min-w-[14px] h-6 custom-shadow bg-themePink rounded-xl mt-1"></div>
          <div className="ml-7">
            <h3 className="text-colorDarkBlue text-2xl font-medium mb-[10px]">
              Streamlined Data Management:
            </h3>
            <p className="text-colorGray text-lg font-normal">
              Simplify the handling of your datasources effortlessly.
            </p>
          </div>
        </div>
        <div className="flex mb-10">
          <div className="min-w-[14px] h-6 custom-shadow bg-themeBlue rounded-xl mt-1"></div>
          <div className="ml-7">
            <h3 className="text-colorDarkBlue text-2xl font-medium mb-[10px]">
              Centralized Organization:
            </h3>
            <p className="text-colorGray text-lg font-normal">
              Manage all your datasources in one convenient location.
            </p>
          </div>
        </div>
        <div className="flex">
          <div className="min-w-[14px] h-6 custom-shadow bg-themeYellow rounded-xl mt-1"></div>
          <div className="ml-7">
            <h3 className="text-colorDarkBlue text-2xl font-medium mb-[10px]">
              Efficient Control:
            </h3>
            <p className="text-colorGray text-lg font-normal">
              Say goodbye to complexity; our chatbot empowers seamless data
              management.
            </p>
          </div>
        </div>
      </div>
      <div className="lg:w-2/3 w-full lg:mt-0 mt-10">
        <div className="flex items-end justify-end">
          <Image
            className="self-end"
            src="/images/popup.svg"
            alt="Manage data source"
            width="852"
            height="455"
          />
        </div>
      </div>
    </div>
  );
};

export default ManageDataSource;
