import Image from "next/image";
import React from "react";
import { useMediaQuery } from "react-responsive";

const OpenForConversation = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return (
    <div className="section-padding">
      <div className="flex flex-col items-center justify-center md:mb-[58px] mb-7">
        <h2 className="font-bold text-2xl md:text-3xl xl:text-4xl xl:leading-[45.36px] mb-[30px] text-center">
          Open for Conversation: Chatbot {!isMobile && <br/>}
          with Embed Code
        </h2>
        <p className="text-lg font-normal text-colorGray md:text-center md:w-4/5 w-full">
          Embed our chatbot easily using the provided code and unlock instant,
          interactive communication. Seamlessly integrate the chatbot into your
          platform to engage users effortlessly. With our open approach,
          fostering conversations has never been more accessible. Start
          enhancing user experience now by integrating our chatbot using the
          provided embed code.
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
