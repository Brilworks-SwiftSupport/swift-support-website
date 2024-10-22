import Image from "next/image";
import React from "react";

const SolutionHowAIAgent = ({ title, aiAgentTransformation }) => {
  const aiAgentTransformationLength = aiAgentTransformation.length;

  return (
    <div className="solutions xl:py-[90px] lg:py-[60px] md:py-10 py-8">
      <div className="container max-w-[1080px] mx-auto">
        <h2 className="lg:mb-[50px] md:mb-10 mb-8 md:text-center text-left lg:px-0 px-4">
          {title}
        </h2>
        {aiAgentTransformation
          ?.slice(1, aiAgentTransformationLength)
          ?.map(({ title, description, image }, index) => (
            <div
              className="flex items-center justify-center md:flex-row flex-col gap-[30px] lg:mb-[60px] last:mb-0 md:mb-10 mb-6 mx-4"
              key={index}
            >
              <div
                className={`md:w-1/2 w-full ${
                  (index + 1) % 2 === 0 ? "md:order-1 order-2" : "order-2"
                }`}
              >
                <h3 className="text-colorBlack font-semibold text-2xl mb-4">
                  {title}
                </h3>
                <p className="text-colorBlack !text-base lg:text-lg">
                  {description}
                </p>
              </div>
              <div
                className={`md:w-1/2 w-full ${
                  (index + 1) % 2 === 0 ? "md:order-2 order-1" : "order-1"
                }`}
              >
                <Image
                  className="rounded-[20px]"
                  src={image?.filename}
                  alt={`${title}-img`}
                  width="520"
                  height="280"
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SolutionHowAIAgent;
