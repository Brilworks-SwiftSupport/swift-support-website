import Image from "next/image";
import React from "react";
import { WhyGridIconWithText } from "../Home/WhySwiftSupport";

const SolutionKeyAdvantages = ({ title, rightSideImage, leftSideData }) => {
  return (
    <div className="solutions xl:py-[90px] lg:py-[60px] md:py-10 py-8">
      <div className="container max-w-[1200px] mx-auto">
        <h2 className="lg:mb-[50px] md:mb-10 mb-6 text-center">{title}</h2>
        <div className="flex items-center lg:flex-row flex-col-reverse lg:gap-16 md:gap-10">
          <div className="">
            {leftSideData?.slice(2, 6).map((data, index) => (
              <div key={index} className="">
                <div className="lg:max-h-[140px]">
                  <WhyGridIconWithText
                    title={data?.title}
                    description={data?.description}
                    imageSrc={data?.image?.filename}
                  />
                </div>
                {index !== 3 && (
                  <div className="lg:!my-[38px] !my-6 border-b border-[#E2E2E2]" />
                )}
              </div>
            ))}
          </div>
          <div className="">
            <Image
              className="w-full mx-auto"
              src={rightSideImage?.filename}
              alt={rightSideImage?.alt || "key-advantages"}
              width="424"
              height="894"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolutionKeyAdvantages;
