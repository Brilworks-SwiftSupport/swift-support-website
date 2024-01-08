"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="footer">
      <div>
        <div className="flex items-center justify-center py-[50px]">
          <Image
            src="/images/footer-logo.svg"
            alt="Custom AI footer logo"
            width="263"
            height="45"
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
              alt="Custom AI footer logo"
              width="60"
              height="60"
            />
          </Link>
        </div>
        <div className="flex items-center justify-center gap-[60px] pt-8 pb-12">
          <Link
            href="#"
            className="flex items-center justify-center font-medium"
          >
            Featured
          </Link>
          <Link
            href="#"
            className="flex items-center justify-center font-medium"
          >
            Pricing
          </Link>
          <Link
            href="#"
            className="flex items-center justify-center font-medium"
          >
            About
          </Link>
          <Link
            href="#"
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
      <div className="bg-[#30353A]">
        <span className="flex item-center justify-center text-sm py-[11px]">
          @copyright 2023 Custom AI. All rights reserved.
        </span>
      </div>
    </div>
  );
};

export default Footer;
