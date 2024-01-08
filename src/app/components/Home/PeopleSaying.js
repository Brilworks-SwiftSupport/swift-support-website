import "@splidejs/splide/dist/css/splide.min.css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import Image from "next/image";
import React from "react";

const PeopleSaying = () => {
  return (
    <div className="pb-[100px] px-[70px]">
      <div className="flex flex-col items-center justify-center mb-[30px]">
        <h2 className="font-bold text-4xl leading-[45.36px] mb-2">
          What people are saying about
        </h2>
        <Image
          src="/images/logo.svg"
          alt="Custom AI Logo"
          width="263"
          height="45"
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
              767: {
                perPage: 2,
              },
            },
          }}
          extensions={{ AutoScroll }}
        >
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
                    src="/images/icon_quote_blue.svg"
                    alt="star-icon"
                    width={64}
                    height={64}
                    className=""
                  />
                </div>
              </div>
              <p className="text-base font-medium mb-5 w-2/3">
                Happy and regular user of chatbot. It has helped a great deal in
                my entrepreneurial journey
              </p>
              <p className="text-xl font-normal text-colorDarkBlue">Sinan E.</p>
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
              <p className="text-base font-medium mb-5 w-2/3">
                Happy and regular user of chatbot. It has helped a great deal in
                my entrepreneurial journey
              </p>
              <p className="text-xl font-normal text-colorDarkBlue">Sinan E.</p>
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
              <p className="text-base font-medium mb-5 w-2/3">
                Happy and regular user of chatbot. It has helped a great deal in
                my entrepreneurial journey
              </p>
              <p className="text-xl font-normal text-colorDarkBlue">Sinan E.</p>
            </div>
          </SplideSlide>
        </Splide>
      </div>
    </div>
  );
};

export default PeopleSaying;
