import Image from "next/image";
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
      <div className="relative container max-w-[1200px] mx-auto z-10">
        <h2 className="mb-5 md:text-center text-left !text-colorWhite">
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
              className="common-button w-fit white-button cursor-pointer !mb-8"
            >
              {button_text}
            </Link>
          </div>
          <iframe
            className="w-full max-w-2xl"
            width="320"
            height="360"
            src="https://www.youtube.com/embed/WFA536oxEn4"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
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
