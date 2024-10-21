"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const GuideFirstSection = ({ data }) => {
  const { title, description, banner_image, button_text, youtube_link } = data;
  const pathname = usePathname();

  return (
    <div className="container mx-auto">
      <div className="usecase flex mt-24">
        <div className="2xl:px-12 2xl:!w-[90%] !w-full mx-auto">
          <div className="flex gap-6 lg:flex-row flex-col items-center md:py-20 py-8 md:px-0 sxl:px-4 px-4">
            <div className="lg:w-2/4 w-full">
              <h1 className="mb-6">{title}</h1>
              <p className="lg:!text-2xl !text-xl md:!leading-tight lg:w-[90%] text-colorGray">
                {description}
              </p>
              <div className="lg:mt-12 mt-5">
                <Link
                  href="https://cal.com/hiteshr/15min"
                  target="_blank"
                  className="flex items-center justify-center w-fit gap-2 font-semibold border-colorBlack border bg-colorBlack text-colorWhite rounded-[30px] px-6 py-4 text-xl"
                >
                  {button_text}
                </Link>
              </div>
            </div>
            <div className="lg:w-2/4 w-full">
              {pathname === "/how-to-add-live-chat-to-website/" ? (
                <iframe
                  className="w-full"
                  width="320"
                  height="360"
                  src="https://www.youtube.com/embed/WFA536oxEn4"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              ) : (
                <Image
                  className="h-full"
                  src={banner_image?.filename}
                  alt={banner_image?.alt || "guide-banner-image"}
                  width="650"
                  height="400"
                  priority
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuideFirstSection;
