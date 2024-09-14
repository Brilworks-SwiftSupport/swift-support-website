import React from "react";
import Image from "next/image";

const AppIcon = ({ imgSrc, altText }) => {
  return (
    <div className="mx-auto w-[74px] h-[74px] pt-[2px] pb-1 pr-1 pl-[2px] rounded-2xl app-integration-gradient">
      <div className="bg-white w-full h-full rounded-[12px] flex items-center justify-center">
        <Image src={imgSrc} alt={altText} width="42" height="42" />
      </div>
    </div>
  );
};

const AppIntegrationSection = () => {
  const ImageList = [
    { imgSrc: "/images/slack.svg", altText: "Slack-icon" },
    { imgSrc: "/images/gmail.svg", altText: "Gmail-icon" },
    { imgSrc: "/images/wordpress.svg", altText: "Wordpress-icon" },
    { imgSrc: "/images/google-drive.svg", altText: "Google-Drive-icon" },
    { imgSrc: "/images/shopify.svg", altText: "Shopify-icon" },
    { imgSrc: "/images/hubspot.svg", altText: "Hubspot-icon" },
    { imgSrc: "/images/linkedin.svg", altText: "Linkedin-icon" },
    { imgSrc: "/images/facebook.svg", altText: "Facebook-icon" },
    { imgSrc: "/images/sheets.svg", altText: "Sheets-icon" },
    { imgSrc: "/images/google-docs.svg", altText: "Google-Docs-icon" },
  ];
  return (
    <div className="w-full h-auto bg-app-integration">
      <div className="grid grid-cols-9 gap-10 justify-items-center pt-16 pb-36">
        {/* First row - 3 icons centered */}
        <div className="col-start-3 col-span-1">
          <AppIcon
            imgSrc={ImageList[0].imgSrc}
            altText={ImageList[0].altText}
          />
        </div>
        <div className="col-start-5 col-span-1">
          <AppIcon
            imgSrc={ImageList[1].imgSrc}
            altText={ImageList[1].altText}
          />
        </div>
        <div className="col-start-8 col-span-1">
          <AppIcon
            imgSrc={ImageList[2].imgSrc}
            altText={ImageList[2].altText}
          />
        </div>

        {/* Second row - 2 icons centered */}
        <div className="col-start-4 col-span-1">
          <AppIcon
            imgSrc={ImageList[3].imgSrc}
            altText={ImageList[3].altText}
          />
        </div>
        <div className="col-start-7 col-span-1">
          <AppIcon
            imgSrc={ImageList[4].imgSrc}
            altText={ImageList[4].altText}
          />
        </div>

        {/* Third row - 2 icons centered */}
        <div className="col-start-2 col-span-1">
          <AppIcon
            imgSrc={ImageList[5].imgSrc}
            altText={ImageList[5].altText}
          />
        </div>
        <div className="col-start-5 col-span-1">
          <AppIcon
            imgSrc={ImageList[6].imgSrc}
            altText={ImageList[6].altText}
          />
        </div>
        <div className="col-start-6 col-span-1">
          <AppIcon
            imgSrc={ImageList[7].imgSrc}
            altText={ImageList[7].altText}
          />
        </div>

        {/* Fourth row - 3 icons centered */}

        <div className="col-start-3 col-span-1">
          <AppIcon
            imgSrc={ImageList[8].imgSrc}
            altText={ImageList[8].altText}
          />
        </div>
        <div className="col-start-7 col-span-1">
          <AppIcon
            imgSrc={ImageList[9].imgSrc}
            altText={ImageList[9].altText}
          />
        </div>
      </div>
    </div>
  );
};

export default AppIntegrationSection;
