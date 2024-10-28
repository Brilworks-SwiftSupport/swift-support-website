import Image from "next/image";
import React from "react";

const SolutionSection2 = ({ data }) => {
  const { title, description, banner_image } = data;
  return (
    <div className="solutions py-[90px] bg-themeBlueLight">
      <div className="container max-w-[1200px] mx-auto">
        <div>
          <h2 className="mb-5 text-center">{title}</h2>
          <p className="lg:mb-[60px] md:mb-10 mb-6 text-center !text-base">
            {description}
          </p>
          <Image
            className="h-full lg:w-[80%] w-full mx-auto px-5"
            src={banner_image?.filename}
            alt={banner_image?.alt || "Lead-captured"}
            width="995"
            height="480"
          />
        </div>
      </div>
    </div>
  );
};

export default SolutionSection2;
