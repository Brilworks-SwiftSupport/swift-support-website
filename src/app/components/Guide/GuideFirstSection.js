"use client";
import React from "react";
import Button from "../Common/Button";

const GuideFirstSection = ({ data }) => {
  const { title, description, banner_image, button_text, youtube_link } = data;

  function getYouTubeEmbedURL(url) {
    const videoIdMatch = url?.match(
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    const videoId = videoIdMatch ? videoIdMatch[1] : null;

    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  }

  return (
    <div className="container mx-auto">
      <div className="usecase flex mt-24">
        <div className="2xl:px-12 2xl:!w-[90%] !w-full mx-auto">
          <div className="flex gap-6 lg:flex-row flex-col items-center md:py-20 py-8 md:px-0 sxl:px-4 px-4">
            <div className="lg:w-2/4 w-full">
              <h1 className="!font-medium mb-6">{title}</h1>
              <p className="lg:!text-2xl !text-xl md:!leading-tight lg:w-[90%] text-colorGray">
                {description}
              </p>
              <div className="lg:mt-12 mt-5">
                <Button label={button_text} />
              </div>
            </div>
            <div className="lg:w-2/4 w-full">
              {/* <iframe
                className="w-full"
                title={"Youtube Video"}
                width="320"
                height="300"

                src={`https://www.youtube.com/embed/${
                  youtube_link?.url?.match(
                    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
                  )[[1]]
                }`}
              /> */}
              <iframe
                className="w-full"
                width="320"
                height="300"
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
                alt={banner_image?.alt}
                width="650"
                height="390"
                priority
              /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuideFirstSection;
