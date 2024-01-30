"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useMediaQuery } from "react-responsive";

const Footer = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

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
        <div className="flex items-center justify-center">
          <Link href="#">
            <Image
              className="mr-[1px]"
              src="/images/icon_fb.svg"
              alt="Fb icon"
              width="38"
              height="38"
            />
          </Link>
          <Link href="#">
            <Image
              className="mr-[1px]"
              src="/images/icon_twitter.svg"
              alt="Twitter icon"
              width="50"
              height="50"
            />
          </Link>
          <Link href="#">
            <Image
              src="/images/icon_linkedIn.svg"
              alt="SwiftSupport footer logo"
              width="60"
              height="60"
            />
          </Link>
        </div>
        <div className="flex items-center md:flex-row flex-col justify-center md:gap-[60px] xl:gap-[40px] gap-5 pt-8 pb-12">
          <Link
            href="#"
            className="footer-underline flex items-center justify-center font-medium"
          >
            Features
          </Link>
          <Link
            href="#"
            className="footer-underline flex items-center justify-center font-medium"
          >
            Pricing
          </Link>
          <Link
            href="#"
            className="footer-underline flex items-center justify-center font-medium"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="footer-underline flex items-center justify-center font-medium"
          >
            Contact
          </Link>
          <Link
            href="#"
            className="footer-underline flex items-center justify-center font-medium"
          >
            Privacy Policy
          </Link>
          <Link
            href="#"
            className="footer-underline flex items-center justify-center font-medium"
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
