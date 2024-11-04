'use client';

import React, { useRef, useState } from 'react';
import { FaPlay, FaPause } from "react-icons/fa";

const VideoSection = () => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlayPause = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <div className="lg:h-[95vh] bg-[#01a9f4] flex items-center justify-center">
        <div className="container lg:mx-auto px-[5%] py-[10%] lg:py-[100px] lg:px-[120px]">
                <div className="mx-auto lg:w-[1300px] lg:h-[700px] relative">
                    <video
                        ref={videoRef}
                        className="rounded-xl"
                        width="1300"
                        height="730"
                        // controls
                    >
                        <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <button
                            
                            onClick={togglePlayPause}
                            className={`bg-[#01a9f4] lg:w-[150px] lg:h-[100px] h-[3rem] w-[4rem] lg:rounded-xl rounded-lg flex items-center justify-center ${isPlaying ?"opacity-[0]":""} transition-all duration-[0.5s] hover:opacity-[1] `}
                        >
                            {isPlaying ? (
                                <FaPause className="text-white text-3xl" />
                            ) : (
                                <FaPlay className="text-white text-3xl" />
                            )}
                        </button>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoSection;