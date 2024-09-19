"use client";
import React, { useEffect, useState } from "react";
import { Navbar, Collapse } from "@material-tailwind/react";
import Link from "next/link";
import Image from "next/image";
import { scrollToSection } from "./lib/Common";
import { usePathname } from "next/navigation";
// import { MenuCustomList } from "./Menu";

const Header = () => {
  const [openNav, setOpenNav] = useState(false);
  const pathname = usePathname();
  const [hideHeader, setHideHeader] = useState(false);

  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScrollProgress = () => {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    setScrollProgress(scrolled);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScrollProgress);
    return () => {
      window.removeEventListener("scroll", handleScrollProgress);
    };
  }, []);

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
    <ul className="mt-2 mb-4 flex flex-col gap-3 items-center md:mb-0 md:mt-0 md:flex-row md:items-center md:gap-3 lg:gap-6">
      {pathname === "/" && (
        <Link
          href="#features"
          onClick={(e) => {
            scrollToSection(e, "features");
            setOpenNav(false);
          }}
          className="nav-underline flex items-center md:justify-center justify-start font-medium"
        >
          Features
        </Link>
      )}

      <Link
        href="/blog"
        onClick={() => setOpenNav(false)}
        className="nav-underline flex items-center md:justify-center justify-start font-medium"
      >
        Blog
      </Link>
      {pathname === "/" && (
        <Link
          href="#pricing-plan"
          onClick={(e) => {
            scrollToSection(e, "pricing-plan");
            setOpenNav(false);
          }}
          className="nav-underline flex items-center md:justify-center justify-start font-medium"
        >
          Pricing
        </Link>
      )}

      <Link
        href="https://cal.com/hiteshr/15min"
        rel="noopener"
        target="_blank"
        onClick={() => setOpenNav(false)}
        className="nav-underline flex items-center md:justify-center justify-start font-medium"
      >
        Contact
      </Link>
      <div>{/* <MenuCustomList/> */}</div>

      <Link
        rel="noopener"
        target="_blank"
        href="https://app.swiftsupport.ai/login"
        onClick={() => setOpenNav(false)}
        className={` ${
          pathname.includes("agent-copilot")
            ? "!text-[#000] !bg-white black-button"
            : "button_black white-button !py-3 !px-7"
        }`}
      >
        Log in
      </Link>
      <Link
        rel="noopener"
        target="_blank"
        href="https://app.swiftsupport.ai/signup"
        onClick={() => setOpenNav(false)}
        className={` ${
          pathname.includes("agent-copilot")
            ? "!text-[#000] !bg-white black-button"
            : "button_black !py-3 !px-7"
        }`}
      >
        Sign up for free
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
            hideHeader || openNav || pathname !== "/" ? "header-bg" : ""
          }`}
        >
          <div
            className="py-2 xs:pr-0 pr-[calc(100vw_-_320px)]"
            onClick={() => setOpenNav(false)}
          >
            <Link href="/">
              <Image
                className="block lg:hidden"
                src="/images/logo.svg"
                alt="SwiftSupport Logo"
                width="176"
                height="49"
                priority
              />
              <Image
                className="hidden lg:block"
                src="/images/logo.svg"
                alt="SwiftSupport Logo"
                width="270"
                height="74"
                priority
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
      {pathname.startsWith("/blog/") && (
        <div
          id="myBar"
          style={{
            width: `${scrollProgress}%`,
            height: "4px",
            backgroundColor: "var(--colorDarkBlue)",
          }}
        />
      )}
    </div>
  );
};

export default Header;
