"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useMediaQuery } from "react-responsive";
import { scrollToSection } from "./lib/Common";
import { usePathname } from "next/navigation";

const Footer = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const pathname = usePathname();

  const socialIcons = [
    {
      imageSrc: "/images/fb-logo.svg",
      imageAlt: "fb-icon",
      hrefUrl: "https://www.facebook.com/Swiftsupportai",
    },
    {
      imageSrc: "/images/youtube-icon.svg",
      imageAlt: "youtube-icon",
      hrefUrl: "https://www.youtube.com/@SwiftSupportdotai",
    },
    {
      imageSrc: "/images/linkedin-logo.svg",
      imageAlt: "x-icon",
      hrefUrl: "https://www.linkedin.com/company/swiftsupport/",
    },
    {
      imageSrc: "/images/insta-logo.svg",
      imageAlt: "instagram-icon",
      hrefUrl: "https://www.instagram.com/swiftsupport.ai/",
    },
    {
      imageSrc: "/images/new-twitter-logo.svg",
      imageAlt: "x-icon",
      hrefUrl: "https://x.com/Swiftsupport_ai",
    },
  ];

  return (
    <div className="footer">
      <div>
        <div className="flex items-center justify-center md:pt-[30px] py-6 pd:b-[45px]">
          <Image
            src="/images/footer-logo.svg"
            alt="SwiftSupport footer logo"
            width={isMobile ? 176 : 255}
            height={isMobile ? 49 : 70}
          />
        </div>
        <div className="flex items-center justify-center md:gap-[18px] gap-2 lg:mb-[60px] md:mb-10 mb-8">
          {socialIcons.map(({ imageSrc, imageAlt, hrefUrl }, index) => {
            return (
              <Link
                key={index}
                className="bg-[#04333F] rounded-full"
                href={hrefUrl}
                rel="noopener"
                target="_blank"
              >
                <Image
                  className="cursor-pointer m-[10px]"
                  src={imageSrc}
                  alt={imageAlt}
                  width="20"
                  height="20"
                />
              </Link>
            );
          })}
        </div>
        <div className="footer-underline flex items-center md:flex-row flex-col justify-center lg:gap-[60px] md:gap-10 gap-4 md:pb-10 pb-5">
          {pathname === "/" && (
            <>
              <Link
                href="#unlock-full potential"
                onClick={(e) => scrollToSection(e, "unlock-full potential")}
                className="text-center text-base"
              >
                Features
              </Link>

              <Link
                href="#pricing-plan"
                onClick={(e) => scrollToSection(e, "pricing-plan")}
                className="text-center text-base"
              >
                Pricing
              </Link>
              {/* <Link
                href="#about-us"
                onClick={(e) => scrollToSection(e, "about-us")}
                className="text-center text-base"
              >
                About
              </Link> */}
            </>
          )}
          <Link href="/blog" className="text-center text-base">
            Blog
          </Link>
          <Link
            href="https://cal.com/swiftsupport/demo"
            rel="noopener"
            target="_blank"
            className="text-center text-base"
          >
            Contact
          </Link>
          <Link href="/privacy-policy" className="text-center text-base">
            Privacy Policy
          </Link>
          <Link href="/terms-and-conditions" className="text-center text-base">
            Terms & Conditions
          </Link>
        </div>
      </div>
      <div className="bg-[#04333F]">
        <span className="flex item-center justify-center text-sm py-4">
          @copyright {new Date().getFullYear()} SwiftSupport. All rights
          reserved.
        </span>
      </div>
    </div>
  );
};

export default Footer;
