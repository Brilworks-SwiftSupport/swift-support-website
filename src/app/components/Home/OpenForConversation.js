import Image from "next/image";
import React from "react";
import { useMediaQuery } from "react-responsive";

const OpenForConversation = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return (
    <div className="section-padding">
      <div className="flex flex-col items-center justify-center md:mb-[58px] mb-7">
        <h2 className="font-bold text-2xl md:text-3xl xl:text-4xl xl:leading-[45.36px] mb-[30px] text-center">
          Swift Integration: Effortlessly Embed Our AI Chatbot
          {!isMobile && <br />}
          for Instant Customer Engagement!
        </h2>
        <p className="text-lg font-normal text-colorGray md:text-center lg:w-4/5 w-full">
          Say goodbye to complex installation processes and hello to immediate
          deployment. Our user-friendly embed functionality ensures that you can
          have the power of AI-driven customer engagement up and running in no
          time. With just a few lines of code, businesses can easily incorporate
          our AI chatbot into their websites and software applications.
        </p>
      </div>
      <div className="flex items-center justify-center">
        <Image
          src="/images/Ways.svg"
          alt="Customize experince"
          width="1058"
          height="514"
        />
      </div>
    </div>
  );
};

export default OpenForConversation;
