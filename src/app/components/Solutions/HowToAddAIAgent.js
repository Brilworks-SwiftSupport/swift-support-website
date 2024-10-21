import Image from "next/image";
import Link from "next/link";
import React from "react";

const HowToAddAIAgent = ({ howToAddAIAgentData }) => {
  const { title, description, button_text, banner_image, youtube_link } =
    howToAddAIAgentData?.[0];

  return (
    <div className="solutions xl:py-[90px] lg:py-[60px] md:py-10 py-8 !px-4 lg:px-0">
      <div className="container max-w-[1080px] mx-auto">
        <h2 className="mb-5 md:text-center text-left">{title}</h2>
        <p className="md:mb-10 mb-8 text-center">{description}</p>
        <div className="flex items-center justify-center flex-col">
          <div className="lg:mb-[70px] md:mb-[50px] mb-9">
            <Link
              href={youtube_link?.url}
              target="_blank"
              className="flex items-center justify-center w-fit font-semibold border-colorBlack border bg-colorBlack text-colorWhite rounded-[30px] px-6 py-4 text-xl"
            >
              {button_text}
            </Link>
          </div>
          <Image
            className="h-full"
            src={banner_image?.filename}
            alt={banner_image?.alt || "how-to-add-ai-agent-image"}
            width="1080"
            height="506"
          />
        </div>
      </div>
    </div>
  );
};

export default HowToAddAIAgent;
