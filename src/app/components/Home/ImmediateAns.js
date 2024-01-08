import Image from "next/image";
import React from "react";

const ImmediateAns = () => {
  return (
    <div className="px-[70px] pb-[100px] flex flex-wrap items-center">
      <div className="lg:w-3/5 w-full pr-[35px]">
        <Image
          className="self-end"
          src="/images/Immediate-ans.svg"
          alt="Immediate data source"
          width="700"
          height="421"
        />
      </div>
      <div className="lg:w-2/5 w-full pl-[35px]">
        <h2 className="font-bold text-4xl leading-[45.36px] pr-20 mb-[30px]">
          Immediate Answers
        </h2>

        <p className="text-lg text-colorGray font-normal">
          Reviewing code Say goodbye to the frustration of scrolling through
          endless blue links. Our platform revolutionizes your search experience
          by providing quick and direct answers, sparing you the hassle of
          navigating through lengthy lists. Enjoy the efficiency of instant
          information at your fingertips, ensuring a seamless and productive
          search process. Embrace a new era of convenience with our commitment
          to delivering immediate and relevant answers tailored to your queries.
        </p>
      </div>
    </div>
  );
};

export default ImmediateAns;
