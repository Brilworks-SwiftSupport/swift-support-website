"use client";
import Image from "next/image";
import React from "react";
import "@splidejs/splide/dist/css/splide.min.css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { useMediaQuery } from "react-responsive";

const WhatPeopleSay = ({ title }) => {
  const isMobile = useMediaQuery({ maxWidth: 1024 });
  return (
    <div className="bg-[#FFFBFB] py-[80px] md:py-[60px] pt-[30px]">
      <div className="container max-w-[1200px] mx-auto w-full">
        <h2 className="new-h2 mb-[50px]">
          {title || "AI-Powered Solutions Across Industries"}
        </h2>
        <div>
          <Splide
            options={{
              type: "loop",
              drag: "free",
              arrows: true,
              gap: 15,
              pagination: false,
              isNavigation: true,
              perPage: isMobile ? 1 : 2,
            }}
          >
            <SplideSlide>
              <div className="bg-colorWhite flex !rounded-[10px] md:!mx-[100px] lg:!mx-[unset] mx-4">
                {/* <Image
                  className="rounded-l-[10px] md:min-w-[198px]"
                  src="/images/Dianna.png"
                  alt="client"
                  width="198"
                  height="309"
                /> */}
                <div className="md:p-[30px] p-3">
                  <div className="flex gap-[6px] items-center justify-center md:mb-[30px] mb-4">
                    <Image
                      src="/images/star-icon.svg"
                      alt="client"
                      width="17"
                      height="17"
                    />
                    <Image
                      src="/images/star-icon.svg"
                      alt="client"
                      width="17"
                      height="17"
                    />
                    <Image
                      src="/images/star-icon.svg"
                      alt="client"
                      width="17"
                      height="17"
                    />
                    <Image
                      src="/images/star-icon.svg"
                      alt="client"
                      width="17"
                      height="17"
                    />
                    <Image
                      src="/images/star-icon.svg"
                      alt="client"
                      width="17"
                      height="17"
                    />
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <Image
                      className="md:mb-5 mb-3 w-[15%] md:w-[unset]"
                      src="/images/quote-icon.svg"
                      alt="client"
                      width="36"
                      height="28"
                    />
                    <p className="text-colorBlack text-center text-base md:mb-[30px] mb-4">
                      SwiftSupport's AI chatbot revolutionized our customer
                      service, delivering prompt responses and enhancing overall
                      satisfaction.
                    </p>
                    <span className="text-colorBlack text-xl font-medium">
                      Dianna
                    </span>
                  </div>
                </div>
              </div>
            </SplideSlide>
            <SplideSlide>
              <div className="bg-colorWhite flex !rounded-[10px] md:!mx-[100px] lg:!mx-[unset] mx-4">
                {/* <Image
                  className="rounded-l-[10px] md:min-w-[198px]"
                  src="/images/Sinan.png"
                  alt="client"
                  width="198"
                  height="309"
                /> */}
                <div className="md:p-[30px] p-3">
                  <div className="flex gap-[6px] items-center justify-center md:mb-[30px] mb-4">
                    <Image
                      src="/images/star-icon.svg"
                      alt="star-icon"
                      width="17"
                      height="17"
                    />
                    <Image
                      src="/images/star-icon.svg"
                      alt="star-icon"
                      width="17"
                      height="17"
                    />
                    <Image
                      src="/images/star-icon.svg"
                      alt="star-icon"
                      width="17"
                      height="17"
                    />
                    <Image
                      src="/images/star-icon.svg"
                      alt="star-icon"
                      width="17"
                      height="17"
                    />
                    <Image
                      src="/images/star-icon.svg"
                      alt="star-icon"
                      width="17"
                      height="17"
                    />
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <Image
                      className="md:mb-5 mb-3 w-[15%] md:w-[unset]"
                      src="/images/quote-icon.svg"
                      alt="quote-img"
                      width="36"
                      height="28"
                    />
                    <p className="text-colorBlack text-center text-base md:mb-[30px] mb-4">
                      Our customer service reached new heights with
                      SwiftSupport's AI chatbot, ensuring rapid responses and
                      heightened satisfaction
                    </p>
                    <span className="text-colorBlack text-xl font-medium">
                      Sinan
                    </span>
                  </div>
                </div>
              </div>
            </SplideSlide>
          </Splide>
        </div>
      </div>
    </div>
  );
};

export default WhatPeopleSay;
