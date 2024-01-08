import Image from "next/image";
import React from "react";

const OptimizeAndDataStorage = () => {
  return (
    <div className="px-[70px] pb-[100px] flex flex-wrap items-center">
      <div className="lg:w-3/5 w-full pr-[35px]">
        <Image
          className="self-end"
          src="/images/optimal-extraction.svg"
          alt="Optimize link extraction"
          width="687"
          height="500"
        />
      </div>
      <div className="lg:w-2/5 w-full pl-[35px]">
        <h2 className="font-bold text-4xl leading-[45.36px] pr-20 mb-[30px]">
          Optimal Link Extraction and Data Storage Automation
        </h2>

        <p className="text-lg text-colorGray font-normal">
          Transform the way you manage information in your business with our
          advanced chatbot. Harness the power of automated data collection,
          allowing our intelligent chatbot to seamlessly compile comprehensive
          insights from various sources. Experience a time-saving solution that
          not only ensures accuracy but also empowers you to make informed
          decisions. Elevate your efficiency, stay well-informed, and enjoy a
          hassle-free data collection experience as our chatbot becomes your
          trusted ally in organizational data management.
        </p>
      </div>
    </div>
  );
};

export default OptimizeAndDataStorage;
