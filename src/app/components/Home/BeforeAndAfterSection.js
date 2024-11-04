"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";

const BeforeAndAfterSection = ({
  title,
  subTitleBefore,
  listItemBefore,
  subTitleAfter,
  listItemAfter,
}) => {
  const isTablet = useMediaQuery({ maxWidth: 1024 });
  const [isTabletDevice, setIsTabletDevice] = useState(false);

  useEffect(() => {
    setIsTabletDevice(isTablet);
  }, [isTablet]);

  const mainTitle = title || (
    <>
      Ever imagined having AI automate <br className="hidden md:block" /> your
      business seamlessly?"
    </>
  );
  const beforeTitle = subTitleBefore || "Manual, Time-Consuming Processes";
  const beforeList = listItemBefore || [
    {
      Display_text: "Tedious manual tasks for support and email management",
    },
    {
      Display_text: "Long hours spent reading and training staff",
    },
    {
      Display_text: "Delayed expertise and slow response to inquiries",
    },
    {
      Display_text: "Customers expect instant replies, driving up costs",
    },
    {
      Display_text:
        "Maintaining 24/7 support becomes expensive and inefficient",
    },
  ];

  const afterTitle = subTitleAfter || "AI-Driven Efficiency and Automation";
  const afterList = listItemAfter || [
    {
      Display_text:
        "AI automates email, quotes, and task categorization effortlessly",
    },
    {
      Display_text:
        "Instant AI assistance for field agents and troubleshooting",
    },
    {
      Display_text: "24/7 AI support reduces costs and improves response time",
    },
    {
      Display_text: "Boost team productivity by 2.5x with AI automation",
    },
  ];

  return (
    <div className="md:py-[70px] py-10 h-full">
      <div className="container max-w-[1200px] mx-auto w-full h-full">
        <h2 className="new-h2 w-full mx-auto lg:mb-[50px] md:mb-10 mb-6 px-4">
          {mainTitle}
        </h2>
      </div>
      <div className="before-after-bg">
        <div className="container max-w-[1200px] mx-auto w-full h-full">
          <div className="flex lg:flex-row flex-col lg:gap-14 md:gap-8 gap-4 w-full h-full lg:px-0 md:px-10 px-4">
            <div
              className={`${
                isTabletDevice ? "card-with-shadow py-10" : "lg:w-[45%] !py-20"
              }  p-4 xl:!pl-0 h-full flex flex-col`}
            >
              <div className="flex-1">
                <div className="relative flex gap-1 mb-4 text-[#FF5454] text-2xl w-fit pr-10">
                  <Image
                    src="/images/arrow-red.svg"
                    alt="arrow-red"
                    width="36"
                    height="36"
                  />
                  Before
                  <div className="absolute -top-4 right-0">
                    <Image
                      src="/images/red-three-lines.svg"
                      alt="emoji"
                      width="24"
                      height="23"
                    />
                  </div>
                </div>
                <h3 className="text-colorBlack md:text-2xl text-xl font-semibold mb-4">
                  {beforeTitle}
                </h3>
                <ul className="ai-automate">
                  {beforeList.map(({ Display_text }, index) => (
                    <li className="rewind" key={index}>
                      {Display_text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="lg:w-[10%] flex items-center justify-center lg:text-[62px] md:text-[52px] text-[40px] leading-snug lg:leading-[75px]">
              Vs
            </div>
            <div
              className={`${
                isTabletDevice ? "card-with-shadow py-10" : "lg:w-[45%] !py-20"
              }  p-4 xl:pr-0 h-full flex flex-col`}
            >
              <div className="flex-1 w-fit">
                <div className="relative flex gap-1 mb-4 text-2xl text-[#00AE65] w-fit pr-10">
                  <Image
                    src="/images/arrow-green.svg"
                    alt="arrow-green"
                    width="36"
                    height="36"
                  />
                  After
                  <div className="absolute -top-4 right-0">
                    <Image
                      src="/images/green-three-lines.svg"
                      alt="emoji"
                      width="24"
                      height="23"
                    />
                  </div>
                </div>
                <h3 className="text-colorBlack md:text-2xl text-xl font-semibold mb-4">
                  {afterTitle}
                </h3>
                <ul className="ai-automate">
                  {afterList.map(({ Display_text }, index) => (
                    <li key={index}>{Display_text}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeforeAndAfterSection;
