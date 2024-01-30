"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

const InstantSolution = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const colors = ["#f2ed7b", "#fbb8b8", "#83defc"];
  const [currentColorIndex, setCurrentColorIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
    }, 4000);
    return () => clearInterval(intervalId);
  }, []);

  const currentColor = colors[currentColorIndex];

  return (
    <div className="instant-solution section-padding !pt-[150px]">
      <div className="mb-[29px]">
        <p className="uppercase md:text-[22px] text-lg font-semibold text-colorGray leading-[27.72px] text-center">
          Instant Customer Solutions
        </p>
      </div>

      <div className="text-colorBlack font-light xl:text-[70px] md:text-[50px] text-[32px] flex items-center justify-center flex-col">
        <p className="xs:mb-4 mb-2">Resolve up to</p>
        <span className="build-chatbot w-auto bg-colorWhite mb-2 xs:mb-4">
          80% of Customer Queries with AI,
        </span>
        <div className="xs:flex xs:mb-4 mb-2">
          <div className="text-center">Deliver</div>
          <div
            className="website-button select-none md:py-2 py-3 mx-3"
            style={{
              backgroundColor: currentColor,
              transition: "all 0.3s ease",
            }}
          >
            <p className="typewriter"></p>
          </div>
          <div className="text-center">Support</div>
        </div>

        <div className="my-10 flex items-center justify-center">
          <Link href="#" className="button_black">
            Start a Free Trial
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InstantSolution;
