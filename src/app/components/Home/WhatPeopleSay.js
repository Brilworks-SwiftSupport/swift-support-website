"use client";
import Image from "next/image";
import React from "react";
import "@splidejs/splide/dist/css/splide.min.css";
import { Splide, SplideSlide } from "@splidejs/react-splide";

const WhatPeopleSay = () => {
  return (
    <div className="bg-[#FFFBFB] py-[80px]">
      <div className="container max-w-[1080px] mx-auto w-full">
        <h2 className="new-h2 mb-[50px]">What people are saying</h2>
        <div>
          <Splide
            options={{
              type: "loop",
              drag: "free",
              arrows: true,
              gap: 15,
              pagination: false,
              isNavigation: true,
              perPage: 2,
              breakpoints: {
                1023: {
                  perPage: 2,
                  gap: 15,
                },
                480: {
                  perPage: 1,
                  gap: 10,
                },
              },
            }}
          >
            <SplideSlide>
              <div className="bg-colorWhite flex min-w-[530px]">
                <Image
                  src="/images/Dianna.png"
                  alt="client"
                  width="198"
                  height="309"
                />
                <div className="p-[30px]">
                  <div className="flex gap-[6px] items-center justify-start mb-[30px]">
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
                  <div>
                    <Image
                      className="mb-5"
                      src="/images/quote-icon.svg"
                      alt="client"
                      width="36"
                      height="28"
                    />
                    <p className="text-colorBlack text-base mb-[30px]">
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
              <div className="bg-colorWhite flex min-w-[530px]">
                <Image
                  src="/images/Sinan.png"
                  alt="client"
                  width="198"
                  height="309"
                />
                <div className="p-[30px]">
                  <div className="flex gap-[6px] items-center justify-start mb-[30px]">
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
                  <div>
                    <Image
                      className="mb-5"
                      src="/images/quote-icon.svg"
                      alt="client"
                      width="36"
                      height="28"
                    />
                    <p className="text-colorBlack text-base mb-[30px]">
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
        {/* <div className="flex gap-8">
          <div className="bg-colorWhite flex min-w-[530px]">
            <Image
              src="/images/Dianna.png"
              alt="client"
              width="198"
              height="309"
            />
            <div className="p-[30px]">
              <div className="flex gap-[6px] items-center justify-start mb-[30px]">
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
              <div>
                <Image
                  className="mb-5"
                  src="/images/quote-icon.svg"
                  alt="client"
                  width="36"
                  height="28"
                />
                <p className="text-colorBlack text-base mb-[30px]">
                  SwiftSupport's AI chatbot revolutionized our customer service,
                  delivering prompt responses and enhancing overall
                  satisfaction.
                </p>
                <span className="text-colorBlack text-xl font-medium">
                  Dianna
                </span>
              </div>
            </div>
          </div>
          <div className="bg-colorWhite flex min-w-[530px]">
            <Image
              src="/images/Sinan.png"
              alt="client"
              width="198"
              height="309"
            />
            <div className="p-[30px]">
              <div className="flex gap-[6px] items-center justify-start mb-[30px]">
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
              <div>
                <Image
                  className="mb-5"
                  src="/images/quote-icon.svg"
                  alt="client"
                  width="36"
                  height="28"
                />
                <p className="text-colorBlack text-base mb-[30px]">
                  Our customer service reached new heights with SwiftSupport's
                  AI chatbot, ensuring rapid responses and heightened
                  satisfaction
                </p>
                <span className="text-colorBlack text-xl font-medium">
                  Sinan
                </span>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default WhatPeopleSay;
