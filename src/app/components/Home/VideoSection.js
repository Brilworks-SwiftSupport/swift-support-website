"use client";
import React, { useState } from "react";
import Image from "next/image";

const VideoSection = () => {
  const [isVideoPause, setVideoPause] = useState(true);
  return (
    <div className="youtube-video-main lg:w-full md:w-[80%] mx-auto section-padding pt-8">
      <div className="intro-video relative">
        <span className="video-play-icon z-10">
          {isVideoPause && (
            <span className="play-icon-img xs:block hidden">
              <Image
                // className="hover:scale-105"
                src="/images/play_button.svg"
                alt="Play Icon"
                width="100"
                height="100"
              />
            </span>
          )}
        </span>
        <div onClick={() => setVideoPause(!isVideoPause)}>
          <Image
            src="/images/video-background.png"
            className="mx-auto rounded-[25px] md:rounded-[40px] lg:rounded-[50px]"
            // src="https://youtu.be/8-E1LbChJ88?feature=shared"
            // controls
            alt="Video Poster"
            width="1026"
            height="528"
          />
        </div>
      </div>
    </div>
  );
};

export default VideoSection;
