"use client";
import React from "react";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";

const AppIcon = ({ imgSrc, altText, isMobile }) => {
  return (
    <div className="mx-auto md:w-[74px] w-[46px] md:h-[74px] h-[46px] pt-[2px] pb-1 pr-1 pl-[2px] rounded-2xl app-integration-gradient">
      <div className="bg-white w-full h-full rounded-[12px] flex items-center justify-center">
        <Image
          className={isMobile ? "w-[24px]" : "w-[42px]"}
          src={imgSrc}
          alt={altText}
          width={isMobile ? "24" : "42"}
          height={isMobile ? "24" : "42"}
        />
      </div>
    </div>
  );
};

const AppIntegrationSection = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

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

  const mobileImageList = [
    { imgSrc: "/images/slack.svg", altText: "Slack-icon" },
    { imgSrc: "/images/hubspot.svg", altText: "Hubspot-icon" },
    { imgSrc: "/images/google-drive.svg", altText: "Google-Drive-icon" },
    { imgSrc: "/images/sheets.svg", altText: "Sheets-icon" },
    { imgSrc: "/images/gmail.svg", altText: "Gmail-icon" },
    { imgSrc: "/images/linkedin.svg", altText: "Linkedin-icon" },
    { imgSrc: "/images/facebook.svg", altText: "Facebook-icon" },
    { imgSrc: "/images/google-docs.svg", altText: "Google-Docs-icon" },
    { imgSrc: "/images/shopify.svg", altText: "Shopify-icon" },
    { imgSrc: "/images/wordpress.svg", altText: "Wordpress-icon" },
  ];

  return (
    <div className="w-full h-auto bg-app-integration">
      <div className="block md:hidden">
        <div className="grid grid-cols-8 gap-10 justify-items-center pt-16 pb-36">
          {/* First row - 3 icons centered */}
          <div className="col-start-2 col-span-1 mt-3">
            <AppIcon
              imgSrc={mobileImageList[0].imgSrc}
              altText={mobileImageList[0].altText}
              isMobile={isMobile}
            />
          </div>
          <div className="col-start-4 col-span-1">
            <AppIcon
              imgSrc={mobileImageList[1].imgSrc}
              altText={mobileImageList[1].altText}
              isMobile={isMobile}
            />
          </div>
          <div className="col-start-7 col-span-1 -mt-5">
            <AppIcon
              imgSrc={mobileImageList[2].imgSrc}
              altText={mobileImageList[2].altText}
              isMobile={isMobile}
            />
          </div>

          {/* Second row - 2 icons centered */}
          <div className="col-start-3 col-span-1 mb-5">
            <AppIcon
              imgSrc={mobileImageList[3].imgSrc}
              altText={mobileImageList[3].altText}
              isMobile={isMobile}
            />
          </div>
          <div className="col-start-6 col-span-1">
            <AppIcon
              imgSrc={mobileImageList[4].imgSrc}
              altText={mobileImageList[4].altText}
              isMobile={isMobile}
            />
          </div>

          {/* Third row - 2 icons centered */}
          <div className="col-start-2 col-span-1 -mt-4">
            <AppIcon
              imgSrc={mobileImageList[5].imgSrc}
              altText={mobileImageList[5].altText}
              isMobile={isMobile}
            />
          </div>
          <div className="col-start-4 col-span-1">
            <AppIcon
              imgSrc={mobileImageList[6].imgSrc}
              altText={mobileImageList[6].altText}
              isMobile={isMobile}
            />
          </div>
          <div className="col-start-7 col-span-1 -mt-5">
            <AppIcon
              imgSrc={mobileImageList[7].imgSrc}
              altText={mobileImageList[7].altText}
              isMobile={isMobile}
            />
          </div>

          {/* Fourth row - 3 icons centered */}

          <div className="col-start-3 col-span-1">
            <AppIcon
              imgSrc={mobileImageList[8].imgSrc}
              altText={mobileImageList[8].altText}
              isMobile={isMobile}
            />
          </div>
          <div className="col-start-6 col-span-1">
            <AppIcon
              imgSrc={mobileImageList[9].imgSrc}
              altText={mobileImageList[9].altText}
              isMobile={isMobile}
            />
          </div>
        </div>
      </div>
      <div className="md:block hidden">
        <div className="grid grid-cols-9 gap-10 justify-items-center pt-16 pb-36">
          {/* First row - 3 icons centered */}
          <div className="col-start-3 col-span-1">
            <AppIcon
              imgSrc={ImageList[0].imgSrc}
              altText={ImageList[0].altText}
              isMobile={isMobile}
            />
          </div>
          <div className="col-start-5 col-span-1">
            <AppIcon
              imgSrc={ImageList[1].imgSrc}
              altText={ImageList[1].altText}
              isMobile={isMobile}
            />
          </div>
          <div className="col-start-8 col-span-1">
            <AppIcon
              imgSrc={ImageList[2].imgSrc}
              altText={ImageList[2].altText}
              isMobile={isMobile}
            />
          </div>
          {/* Second row - 2 icons centered */}
          <div className="col-start-4 col-span-1">
            <AppIcon
              imgSrc={ImageList[3].imgSrc}
              altText={ImageList[3].altText}
              isMobile={isMobile}
            />
          </div>
          <div className="col-start-7 col-span-1">
            <AppIcon
              imgSrc={ImageList[4].imgSrc}
              altText={ImageList[4].altText}
              isMobile={isMobile}
            />
          </div>
          {/* Third row - 2 icons centered */}
          <div className="col-start-2 col-span-1">
            <AppIcon
              imgSrc={ImageList[5].imgSrc}
              altText={ImageList[5].altText}
              isMobile={isMobile}
            />
          </div>
          <div className="col-start-5 col-span-1">
            <AppIcon
              imgSrc={ImageList[6].imgSrc}
              altText={ImageList[6].altText}
              isMobile={isMobile}
            />
          </div>
          <div className="col-start-6 col-span-1">
            <AppIcon
              imgSrc={ImageList[7].imgSrc}
              altText={ImageList[7].altText}
              isMobile={isMobile}
            />
          </div>
          {/* Fourth row - 3 icons centered */}
          <div className="col-start-3 col-span-1">
            <AppIcon
              imgSrc={ImageList[8].imgSrc}
              altText={ImageList[8].altText}
              isMobile={isMobile}
            />
          </div>
          <div className="col-start-7 col-span-1">
            <AppIcon
              imgSrc={ImageList[9].imgSrc}
              altText={ImageList[9].altText}
              isMobile={isMobile}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppIntegrationSection;
