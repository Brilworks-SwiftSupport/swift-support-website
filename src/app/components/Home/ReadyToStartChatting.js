import Image from "next/image";
import React from "react";

const ReadyToStartChatting = () => {
  return (
    <div className="px-[70px] pb-[100px] flex flex-wrap items-center">
      <div className="lg:w-1/2 w-full pr-[35px]">
        <h2 className="font-bold text-4xl leading-[45.36px] w-[70%] mb-[30px]">
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
      <div className="lg:w-1/2 w-full pl-[35px]">
        <div className="flex items-end justify-end">
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
