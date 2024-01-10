"use client";
import Image from "next/image";
import React, { useState } from "react";

const VideoSection = () => {
  const [isVideoPause, setVideoPause] = useState(true);
  return (
    <div className="youtube-video-main lg:w-full md:w-[80%] mx-auto section-padding pt-8">
      <div className="intro-video relative">
        <span className="video-play-icon z-10">
          {isVideoPause && (
            <span className="play-icon-img xs:block hidden">
              <Image
                src="/images/play_button.svg"
                alt="Play Icon"
                width={100}
                height={100}
              />
            </span>
          )}
        </span>
        <div onClick={() => setVideoPause(!isVideoPause)}>
          <video
            className="rounded-[25px] md:rounded-[40px] lg:rounded-[50px]"
            src="https://youtu.be/8-E1LbChJ88?feature=shared"
            controls
            loading="lazy"
            width="1026"
            height="528"
          />
        </div>
      </div>
    </div>
  );
};

export default VideoSection;
