"use client";
import React, { useEffect, useState } from "react";
import { Navbar, Collapse } from "@material-tailwind/react";
import Link from "next/link";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";

const Header = () => {
  const [openNav, setOpenNav] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [hideHeader, setHideHeader] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window && window.scrollY && document.documentElement) {
        if (window.scrollY > 30) {
          setHideHeader(true);
        } else {
          setHideHeader(false);
        }
      }
    };

    window.addEventListener(
      "resize",
      () => window.innerWidth >= 767 && setOpenNav(false)
    );

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-3 items-center md:mb-0 md:mt-0 md:flex-row md:items-center md:gap-6">
      <Link
        href="/features"
        className="nav-underline flex items-center md:justify-center justify-start font-medium"
      >
        Features
      </Link>
      <Link
        href="#"
        className="nav-underline flex items-center md:justify-center justify-start font-medium"
      >
        Pricing
      </Link>
      <Link
        href="/contact"
        className="nav-underline flex items-center md:justify-center justify-start font-medium"
      >
        Contact
      </Link>
      <Link href="#" className="button_black">
        Sign Up
      </Link>
    </ul>
  );

  return (
    <div className="header">
      <Navbar
        className={`rounded-none border-none z-10 max-w-full py-0 px-0 ${
          openNav ? "h-[100vh]" : "bg-transparent"
        }`}
      >
        <div
          className={`flex items-center md:flex-row justify-between header_padding ${
            hideHeader || openNav ? "header-bg" : ""
          }`}
        >
          <div className="py-2 xs:pr-0 pr-[calc(100vw_-_320px)]">
            <Link href="/">
              <Image
                src="/images/logo.svg"
                alt="SwiftSupport Logo"
                width={isMobile ? 176 : 270}
                height={isMobile ? 49 : 74}
                // priority={true}
              />
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden md:block">{navList}</div>
            <div
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent md:hidden"
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <Image
                  src="/images/menu-icon.svg"
                  alt="Menu icon"
                  width={20}
                  height={20}
                  priority={true}
                  className="top-[45px] left-[20px] mr-3"
                />
              )}
            </div>
          </div>
        </div>
        <Collapse
          open={openNav}
          className={`bg-white ${openNav ? "!h-full mt-2" : ""}`}
        >
          <div className={openNav ? "w-[88%] mx-auto md:pt-8 py-4" : "hidden"}>
            <div
              className={`flex md:flex-row flex-col md:gap-12 lg:gap-20 gap-8 ${
                openNav ? "mb-6" : ""
              }`}
            >
              <div>{navList}</div>
            </div>
          </div>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
