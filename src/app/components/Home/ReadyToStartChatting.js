import Image from "next/image";
import React from "react";

const ReadyToStartChatting = () => {
  return (
    <div className="section-padding flex flex-wrap items-center">
      <div className="lg:w-1/2 w-full md:pr-[35px] pr-0">
        <h2 className="font-bold text-2xl md:text-3xl xl:text-4xl xl:leading-[45.36px] md:mb-30 md:mt-0 mb-5 lg:w-[70%] w-full">
          Ready to Start Chatting just like that
        </h2>

        <p className="text-lg text-colorGray font-normal">
          Immerse yourself in effortless and meaningful conversations with our
          chatbot, offering an instant connection without any complications.
          Whether you're seeking answers, information, or just a friendly chat,
          our intuitive and user-friendly interface is designed to engage you
          seamlessly. Enjoy the unparalleled ease of communication without the
          need for any technical expertise. So, why wait? Begin your
          conversation journey effortlessly and relish the convenience of
          instant interaction with our ready-to-chat interface.
        </p>
      </div>
      <div className="lg:w-1/2 w-full lg:pl-[35px] mt-5">
        <div className="flex lg:items-end lg:justify-end md:items-center md:justify-center">
          <Image
            className="self-end"
            src="/images/start-chatting.svg"
            alt="Start chatting"
            width="595"
            height="456"
          />
        </div>
      </div>
    </div>
  );
};

export default ReadyToStartChatting;
