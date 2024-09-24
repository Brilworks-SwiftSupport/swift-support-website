import "@splidejs/splide/dist/css/splide.min.css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import Image from "next/image";
import React from "react";

const TrustedBy = () => {
  const trustedCompaniesLogo = [
    {
      src: "/images/Logo (1).svg",
      alt: "Trusted company logo 1",
      width: 132,
      height: 35,
    },
    {
      src: "/images/Logo (2).png",
      alt: "Trusted company logo 2",
      width: 172,
      height: 40,
    },
    {
      src: "/images/Logo (3).png",
      alt: "Trusted company logo 3",
      width: 119,
      height: 30,
    },
    {
      src: "/images/Logo (4).png",
      alt: "Trusted company logo 4",
      width: 134,
      height: 34,
    },
    {
      src: "/images/Logo (5).png",
      alt: "Trusted company logo 5",
      width: 154,
      height: 27,
    },
    {
      src: "/images/accelevents-logo.webp",
      alt: "Trusted company logo 6",
      width: 154,
      height: 27,
    },
    {
      src: "/images/cruit.webp",
      alt: "Trusted company logo 7",
      width: 154,
      height: 27,
    },
    {
      src: "/images/service buddy.webp",
      alt: "Trusted company logo 8",
      width: 140,
      height: 30,
    },
  ];

  return (
    <div className="section-padding !px-0" id="about-us">
      <div className="container mx-auto">
        <p className="md:text-[36px] text-[26px] font-bold text-center mb-10 pt-14">
          Trusted by 500+ companies.
        </p>
      </div>

      <Splide
        options={{
          type: "loop",
          drag: "free",
          arrows: false,
          pagination: false,
          perPage: 7,
          autoScroll: {
            pauseOnHover: true,
            pauseOnFocus: false,
            rewind: false,
            speed: 1,
          },
          breakpoints: {
            1535: {
              perPage: 5,
            },
            1080: {
              perPage: 4,
            },
            767: {
              perPage: 3,
            },
            535: {
              perPage: 2,
            },
          },
        }}
        extensions={{ AutoScroll }}
      >
        {trustedCompaniesLogo.map((logo, index) => (
          <SplideSlide key={index}>
            <div className="single-logo">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                className="block mx-auto"
              />
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default TrustedBy;
