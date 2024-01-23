import "@splidejs/splide/dist/css/splide.min.css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import Image from "next/image";
import React from "react";
import { useMediaQuery } from "react-responsive";

const PeopleSaying = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return (
    <div className="section-padding !px-0">
      <div className="flex flex-col items-center justify-center mb-[30px]">
        <h2 className="font-bold text-2xl md:text-3xl xl:text-4xl xl:leading-[45.36px] md:mb-30 md:mt-0 md:mb-2 mb-5 lg:w-[70%] text-center w-full">
          What people are saying about
        </h2>
        <Image
          src="/images/logo.svg"
          alt="SwiftSupport Logo"
          width={isMobile ? 176 : 270}
          height={isMobile ? 49 : 74}
        />
      </div>
      <div className="">
        <Splide
          options={{
            type: "loop",
            drag: "free",
            arrows: false,
            gap: 20,
            pagination: false,
            perPage: 3,
            autoScroll: {
              pauseOnHover: true,
              pauseOnFocus: false,
              rewind: false,
              speed: 1,
            },
            breakpoints: {
              1080: {
                perPage: 3,
              },
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
          extensions={{ AutoScroll }}
        >
          <SplideSlide>
            <div className="bg-[#D7F4FE] rounded-[30px] p-[30px]">
              <div className="flex items-center justify-between">
                <div className="flex md:gap-[10px] gap-1 mb-4">
                  <Image
                    src="/images/icon_star.png"
                    alt="star-icon"
                    width={30}
                    height={30}
                    className=""
                  />
                  <Image
                    src="/images/icon_star.png"
                    alt="star-icon"
                    width={30}
                    height={30}
                    className=""
                  />
                  <Image
                    src="/images/icon_star.png"
                    alt="star-icon"
                    width={30}
                    height={30}
                    className=""
                  />
                  <Image
                    src="/images/icon_star.png"
                    alt="star-icon"
                    width={30}
                    height={30}
                    className=""
                  />
                  <Image
                    src="/images/icon_star_white.png"
                    alt="star-icon"
                    width={30}
                    height={30}
                    className=""
                  />
                </div>
                <div>
                  <Image
                    src="/images/icon_quote_blue.svg"
                    alt="star-icon"
                    width={64}
                    height={64}
                    className=""
                  />
                </div>
              </div>
              <p className="text-base font-medium mb-5 md:w-4/5 w-full">
                Our customer service reached new heights with SwiftSupport's AI
                chatbot, ensuring rapid responses and heightened satisfaction
              </p>
              <p className="text-xl font-normal text-colorDarkBlue">Sinan</p>
            </div>
          </SplideSlide>
          <SplideSlide>
            <div className="bg-[#D7F4FE] rounded-[30px] p-[30px]">
              <div className="flex items-center justify-between">
                <div className="flex gap-[10px] mb-4">
                  <Image
                    src="/images/icon_star.png"
                    alt="star-icon"
                    width={30}
                    height={30}
                    className=""
                  />
                  <Image
                    src="/images/icon_star.png"
                    alt="star-icon"
                    width={30}
                    height={30}
                    className=""
                  />
                  <Image
                    src="/images/icon_star.png"
                    alt="star-icon"
                    width={30}
                    height={30}
                    className=""
                  />
                  <Image
                    src="/images/icon_star.png"
                    alt="star-icon"
                    width={30}
                    height={30}
                    className=""
                  />
                  <Image
                    src="/images/icon_star_white.png"
                    alt="star-icon"
                    width={30}
                    height={30}
                    className=""
                  />
                </div>
                <div>
                  <Image
                    src="/images/icon_quote_pink.svg"
                    alt="star-icon"
                    width={64}
                    height={64}
                    className=""
                  />
                </div>
              </div>
              <p className="text-base font-medium mb-5 md:w-4/5 w-full">
                SwiftSupport's chatbot transformed our support, providing quick
                responses and boosting customer satisfaction.
              </p>
              <p className="text-xl font-normal text-colorDarkBlue">Danielle</p>
            </div>
          </SplideSlide>
          <SplideSlide>
            <div className="bg-[#D7F4FE] rounded-[30px] p-[30px]">
              <div className="flex items-center justify-between">
                <div className="flex gap-[10px] mb-4">
                  <Image
                    src="/images/icon_star.png"
                    alt="star-icon"
                    width={30}
                    height={30}
                    className=""
                  />
                  <Image
                    src="/images/icon_star.png"
                    alt="star-icon"
                    width={30}
                    height={30}
                    className=""
                  />
                  <Image
                    src="/images/icon_star.png"
                    alt="star-icon"
                    width={30}
                    height={30}
                    className=""
                  />
                  <Image
                    src="/images/icon_star.png"
                    alt="star-icon"
                    width={30}
                    height={30}
                    className=""
                  />
                  <Image
                    src="/images/icon_star_white.png"
                    alt="star-icon"
                    width={30}
                    height={30}
                    className=""
                  />
                </div>
                <div>
                  <Image
                    src="/images/icon_quote_yellow.svg"
                    alt="star-icon"
                    width={64}
                    height={64}
                    className=""
                  />
                </div>
              </div>
              <p className="text-base font-medium mb-5 md:w-4/5 w-full">
                SwiftSupport's AI chatbot revolutionized our customer service,
                delivering prompt responses and enhancing overall satisfaction.
              </p>
              <p className="text-xl font-normal text-colorDarkBlue">Dianna</p>
            </div>
          </SplideSlide>
        </Splide>
      </div>
    </div>
  );
};

export default PeopleSaying;
