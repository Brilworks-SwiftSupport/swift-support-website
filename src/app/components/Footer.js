"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { scrollToSection } from "./lib/Common";

const Footer = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [hoverItem, setHoverItem] = useState("");

  return (
    <div className="footer">
      <div>
        <div className="flex items-center justify-center py-[30px]">
          <Image
            src="/images/footer-logo.svg"
            alt="SwiftSupport footer logo"
            width={isMobile ? 176 : 270}
            height={isMobile ? 49 : 74}
          />
        </div>
        <div className="flex items-center justify-center md:gap-1 gap-[1px]">
          <Link
            href="#"
            onMouseOver={() => setHoverItem("facebook")}
            onMouseLeave={() => setHoverItem("")}
          >
            <Image
              className={
                hoverItem === "facebook" ? "cursor-pointer scale-110" : ""
              }
              src="/images/icon_fb.svg"
              alt="Fb icon"
              width="38"
              height="38"
            />
          </Link>
          <Link
            href="#"
            onMouseOver={() => setHoverItem("twitter")}
            onMouseLeave={() => setHoverItem("")}
          >
            <Image
              className={
                hoverItem === "twitter" ? "cursor-pointer scale-110" : ""
              }
              src="/images/icon_twitter.svg"
              alt="Twitter icon"
              width="50"
              height="50"
            />
          </Link>
          <Link
            href="https://www.linkedin.com/company/swiftsupport/"
            rel="noopener"
            target="_blank"
            onMouseOver={() => setHoverItem("linkedIn")}
            onMouseLeave={() => setHoverItem("")}
          >
            <Image
              className={
                hoverItem === "linkedIn" ? "cursor-pointer scale-110" : ""
              }
              src="/images/icon_linkedIn.svg"
              alt="SwiftSupport footer logo"
              width="60"
              height="60"
            />
          </Link>
        </div>
        <div className="footer-underline flex items-center md:flex-row flex-col justify-center md:gap-[40px] gap-5 pt-8 pb-12">
          <Link
            href="#features"
            onClick={(e) => scrollToSection(e, "features")}
            className="flex items-center justify-center font-medium"
          >
            Features
          </Link>
          <Link
            href="#pricing-plan"
            onClick={(e) => scrollToSection(e, "pricing-plan")}
            className="flex items-center justify-center font-medium"
          >
            Pricing
          </Link>
          <Link
            href="#about-us"
            onClick={(e) => scrollToSection(e, "about-us")}
            className="flex items-center justify-center font-medium"
          >
            About
          </Link>
          <Link
            href="https://cal.com/hiteshr/15min"
            rel="noopener"
            target="_blank"
            className="flex items-center justify-center font-medium"
          >
            Contact
          </Link>
          <Link
            href="#"
            className="flex items-center justify-center font-medium"
          >
            Privacy Policy
          </Link>
          <Link
            href="#"
            className="flex items-center justify-center font-medium"
          >
            Terms & Conditions
          </Link>
        </div>
      </div>
      <div className="bg-[#04333F]">
        <span className="flex item-center justify-center text-sm py-[11px]">
          @copyright {new Date().getFullYear()} SwiftSupport. All rights
          reserved.
        </span>
      </div>
    </div>
  );
};

export default Footer;
