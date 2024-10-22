import Image from "next/image";
import React from "react";

const AIAutomateBusiness = () => {
  return (
    <div className="md:py-[70px] py-10 h-full">
      <div className="container max-w-[1200px] mx-auto w-full h-full">
        <h2 className="new-h2 md:w-[60%] w-full mx-auto lg:mb-[50px] md:mb-10 mb-6 px-4">
          Ever imagined having AI automate your business seamlessly?
        </h2>
      </div>
      <div className="before-after-bg">
        <div className="container max-w-[1200px] mx-auto w-full h-full">
          <div className="flex lg:gap-16 gap-8 w-full h-full">
            <div className="w-[45%] p-5 py-20 h-full flex flex-col">
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
                  Manual, Time-Consuming Processes
                </h3>
                <ul className="ai-automate">
                  <li className="rewind">
                    Tedious manual tasks for support and email management
                  </li>
                  <li className="rewind">
                    Long hours spent reading and training staff
                  </li>
                  <li className="rewind">
                    Delayed expertise and slow response to inquiries
                  </li>
                  <li className="rewind">
                    Customers expect instant replies, driving up costs
                  </li>
                  <li className="rewind">
                    Maintaining 24/7 support becomes expensive and inefficient
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-[10%] flex items-center justify-center text-[62px] leading-[75px]">
              Vs
            </div>
            <div className="w-[45%] p-5 py-20 pl-8 h-full flex flex-col">
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
                <h3 className="text-colorBlack text-2xl font-semibold mb-4">
                  AI-Driven Efficiency and Automation
                </h3>
                <ul className="ai-automate">
                  <li>
                    AI automates email, quotes, and task categorization
                    effortlessly
                  </li>
                  <li>
                    Instant AI assistance for field agents and troubleshooting
                  </li>
                  <li>
                    24/7 AI support reduces costs and improves response time
                  </li>
                  <li>Boost team productivity by 2.5x with AI automation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAutomateBusiness;
