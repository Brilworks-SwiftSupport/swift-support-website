"use client";
import React, { useEffect, useState } from "react";
import { Navbar, IconButton, Collapse } from "@material-tailwind/react";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 767 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 md:mb-0 md:mt-0 md:flex-row md:items-center md:gap-6">
      <Link
        href="/features"
        className="flex items-center md:justify-center justify-start font-medium"
      >
        Features
      </Link>
      <Link
        href="#"
        className="flex items-center md:justify-center justify-start font-medium"
      >
        Pricing
      </Link>
      <Link
        href="#"
        className="flex items-center md:justify-center justify-start font-medium"
      >
        Contact
      </Link>
      <Link
        href="#"
        className="flex items-center md:justify-center justify-start px-[30px] py-[10px] bg-colorBlack font-bold text-colorWhite rounded-xl"
      >
        <span className="py-[10px] px-3 text-center">Sign Up</span>
      </Link>
    </ul>
  );

  return (
    <div className="header">
      <Navbar
        className={`rounded-0 border-none z-10 max-w-full py-0 px-0 ${
          openNav ? "h-[100vh] bg-colorWhite" : "bg-transparent"
        }`}
      >
        <div className="flex items-center flex-row-reverse md:flex-row justify-between px-[70px] py-[30px]">
          <div className="py-2">
            <Link href="/">
              <Image
                src="/images/logo.svg"
                alt="Custom AI Logo"
                width="263"
                height="45"
                priority={true}
              />
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden md:block">{navList}</div>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent md:hidden"
              ripple={false}
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
                  className="top-[45px] left-[20px]"
                />
              )}
            </IconButton>
          </div>
        </div>
        <Collapse
          open={openNav}
          className={`bg-white overflow-y-scroll ${
            openNav ? "!h-full mt-2" : ""
          }`}
        >
          <div className="w-[88%] mx-auto md:pt-8 py-4">
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
