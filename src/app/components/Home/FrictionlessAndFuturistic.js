import Image from "next/image";
import React from "react";

const FrictionlessAndFuturistic = () => {
  return (
    <div className="container mx-auto section-padding flex flex-wrap items-center">
      <div className="lg:w-3/5 w-full lg:pr-[35px] mb-4 lg:mb-0">
        <Image
          className="self-end"
          src="/images/Immediate-ans.svg"
          alt="Immediate data source"
          width="700"
          height="421"
        />
      </div>
      <div className="lg:w-2/5 w-full lg:pl-[35px]">
        <h2 className="font-bold text-2xl md:text-3xl xl:text-4xl xl:leading-[45.36px] md:mb-30 md:mt-0 mb-5">
          Frictionless and futuristic
        </h2>

        <p className="text-lg text-colorGray font-normal">
          Ditch the old-school AI chatbots and embrace Swift Support to solve
          complex queries in record time and empower your team with a powerful
          AI agent that seamlessly integrates your company's knowledge base,
          product information, and policy framework and can handle complex cases
          with ease and deliver personalized solutions 24/7. Ready to see it in
          action?
        </p>
      </div>
    </div>
  );
};

export default FrictionlessAndFuturistic;
