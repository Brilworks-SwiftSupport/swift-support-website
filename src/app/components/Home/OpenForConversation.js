import Image from "next/image";
import React from "react";

const OpenForConversation = () => {
  return (
    <div className="pb-[100px] px-[70px]">
      <div className="flex flex-col items-center justify-center mb-[58px]">
        <h2 className="font-bold text-4xl leading-[45.36px] text-center mb-[30px]">
          Open for Conversation: Chatbot <br />
          with Embed Code
        </h2>
        <p className="text-lg font-normal text-colorGray text-center w-4/5">
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
