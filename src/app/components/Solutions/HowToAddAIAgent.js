import Link from "next/link";
import React from "react";

const HowToAddAIAgent = ({ howToAddAIAgentData }) => {
  const { title, description, button_text, banner_image, youtube_link } =
    howToAddAIAgentData?.[0];

  return (
    <div
      className="solutions xl:py-[90px] lg:py-[60px] md:py-10 py-8 !px-4 lg:px-0 relative"
      style={{
        backgroundImage: `url(${banner_image?.filename})`,
        backgroundPosition: "center",
        backgroundSize: "fill",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-80 z-0"></div>
      <div className="relative container max-w-[1080px] mx-auto z-10">
        <h2 className="mb-5 md:text-center text-left text-colorWhite">
          {title}
        </h2>
        <p className="md:mb-10 mb-8 text-center text-colorWhite">
          {description}
        </p>
        <div className="flex items-center justify-center flex-col z-20">
          <div>
            <Link
              href={youtube_link?.url}
              target="_blank"
              className="flex items-center justify-center w-fit font-semibold border-colorWhite border bg-colorWhite text-colorBlack rounded-[30px] px-6 py-4 text-xl cursor-pointer"
            >
              {button_text}
            </Link>
          </div>
          {/* <Image
            className="h-full"
            src={banner_image?.filename}
            alt={banner_image?.alt || "how-to-add-ai-agent-image"}
            width="1080"
            height="506"
          /> */}
        </div>
      </div>
    </div>
  );
};

export default HowToAddAIAgent;
