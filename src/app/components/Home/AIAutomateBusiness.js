import Image from "next/image";
import React from "react";

const AIAutomateBusiness = () => {
  return (
    <div className="bg-[#F6FDFF] md:py-[60px] py-10 h-full">
      <div className="container max-w-[1080px] mx-auto w-full h-full">
        <h2 className="new-h2 md:w-[80%] w-full mx-auto lg:mb-[50px] md:mb-10 mb-6 px-4">
          Ever imagined having AI automate your business seamlessly?
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full h-full px-6">
          <div className="card-with-shadow p-5 h-full flex flex-col">
            <div className="flex-1">
              <div className="text-sm flex gap-1 mb-4">
                <Image
                  src="/images/before-after-arrow.svg"
                  alt="arrow-b-a"
                  width="16"
                  height="12"
                />{" "}
                Before
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
          <div className="card-with-shadow p-5 h-full flex flex-col">
            <div className="flex-1">
              <div className="text-sm flex gap-1 mb-4">
                <Image
                  src="/images/before-after-arrow.svg"
                  alt="arrow-b-a"
                  width="16"
                  height="12"
                />{" "}
                After
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
  );
};

export default AIAutomateBusiness;
