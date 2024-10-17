"use client";
import React, { useEffect, useState, useRef } from "react";
import {
  Navbar,
  Collapse,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import Link from "next/link";
import Image from "next/image";
import { Icon, scrollToSection } from "./lib/Common";
import { usePathname } from "next/navigation";
// import { MenuCustomList } from "./Menu";

const Header = () => {
  const [openNav, setOpenNav] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(false);
  const pathname = usePathname();
  const navbarRef = useRef(null);
  const [navbarHeight, setNavbarHeight] = useState(0);
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
    if (navbarRef.current) {
      const height = navbarRef.current.offsetHeight;
      setNavbarHeight(height);
    }
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
      () => window.innerWidth >= 980 && setOpenNav(false)
    );

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleOpen = (value) =>
    setOpenAccordion(openAccordion === value ? 0 : value);

  const navList = (
    <ul className="w-full mt-2 mb-4 flex flex-col md:gap-1 gap-3 items-start md:mb-0 md:mt-0 md:flex-row md:items-center">
      <div className="flex flex-col md:flex-row gap-3 md:items-center items-start w-full">
        {/* {pathname === "/" && (
          <Link
            href="#features"
            onClick={(e) => {
              scrollToSection(e, "features");
              setOpenNav(false);
            }}
            className={`nav-underline flex items-center md:justify-center justify-start font-medium ${
              openNav ? "mt-4 md:mt-9" : ""
            }`}
          >
            Features
          </Link>
        )} */}

        <Link
          href="/blog"
          onClick={() => setOpenNav(false)}
          className={` w-full nav-underline md:border-b-0 border-b border-[#e5e7eb] flex items-center md:justify-center justify-start font-medium !px-3 ${
            openNav ? "mt-4 md:mt-9" : ""
          }`}
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
            className="w-full nav-underline md:border-b-0 border-b border-[#e5e7eb] flex items-center md:justify-center justify-start font-medium !px-3"
          >
            Pricing
          </Link>
        )}

        <Link
          // href="https://cal.com/hiteshr/15min"
          href="https://cal.com/swiftsupport/demo"
          rel="noopener"
          target="_blank"
          onClick={() => setOpenNav(false)}
          className="w-full nav-underline flex items-center md:border-b-0 border-b border-[#e5e7eb] md:justify-center justify-start font-medium !px-3"
        >
          Contact
        </Link>
      </div>
      <div className="hidden md:block">
        <Menu
          className="font-Urbanist font-medium"
          placement="bottom"
          dismiss={{ itemPress: true, ancestorScroll: true }}
          animate={{
            mount: { y: 0 },
            unmount: { y: 25 },
          }}
          allowHover
          offset={15}
        >
          <MenuHandler>
            <MenuItem className="flex items-center pt-2 my-1 px-0">
              <Link
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                }}
                className="!flex !items-center nav-underline"
              >
                <p className="!font-medium">Guide</p>
                <svg
                  className="w-4 h-[6px] ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </Link>
            </MenuItem>
          </MenuHandler>
          <MenuList
            dismissible
            className="flex flex-col !z-[100] rounded-b-lg border min-w-[180px] mt-2 p-1"
          >
            <MenuItem className="flex items-center gap-4 py-2 px-3 hover:bg-[#EAFAFF] hover:rounded-lg">
              <Link
                className="font-Urbanist !font-medium"
                href="/guide/how-to-add-live-chat-to-website/"
              >
                How to Add Live Chat ?
              </Link>
            </MenuItem>
            {/* <MenuItem className="flex items-center gap-4 py-2 px-3 hover:bg-[#EAFAFF] hover:rounded-lg">
              <Link
                className="font-Urbanist font-medium"
                href="/guide/how-to-build-an-ai-agent/"
              >
                How To Build Your Own AI Agent ?
              </Link>
            </MenuItem> */}
          </MenuList>
        </Menu>
      </div>
      <div className="md:hidden block w-full">
        <Accordion
          open={openAccordion === 2}
          icon={
            <Icon
              openClass="rotate-180"
              closeClass={"rotate-0"}
              id={2}
              open={openAccordion}
            />
          }
          className="border-b border-[#e5e7eb] !px-3"
        >
          <AccordionHeader
            onClick={() => handleOpen(2)}
            className={`flex justify-between items-center border-none w-full py-[5px] font-Urbanist text-colorBlack text-base !font-medium select-none transition-colors${
              openAccordion === 2 ? "" : ""
            }`}
          >
            Guide
          </AccordionHeader>
          <AccordionBody className={openAccordion === 2 ? "" : ""}>
            <Link
              className="font-Urbanist !font-medium ml-4"
              href="/guide/how-to-add-live-chat-to-website/"
              onClick={() => setOpenNav(false)}
            >
              How to Add Live Chat ?
            </Link>
          </AccordionBody>
        </Accordion>
      </div>

      <Link
        rel="noopener"
        target="_blank"
        href="https://app.swiftsupport.ai/login"
        onClick={() => setOpenNav(false)}
        className={`${openNav ? "" : "!hidden"} ${
          pathname.includes("agent-copilot")
            ? "!text-[#000] !bg-white black-button"
            : "new-button-black !text-colorWhite ml-3"
        }`}
      >
        Log In
      </Link>
      {/* <Link
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
      </Link> */}
    </ul>
  );

  return (
    <div className="container mx-auto max-w-[1280px] bg-white">
      <div className="header border-b border-[#e5e7eb]">
        <Navbar
          ref={navbarRef}
          className={`rounded-none border-none z-10 max-w-[1280px] mx-auto lg:py-4 md:py-4 py-2 px-0 ${
            openNav ? "h-[100vh]" : ""
          }`}
        >
          <div
            className={`flex items-center md:flex-row justify-between header_padding ${
              hideHeader || openNav || pathname !== "/" ? "header-bg" : ""
            }`}
          >
            <div className="xs:pr-0" onClick={() => setOpenNav(false)}>
              <Link href="/">
                <Image
                  className="!w-3/5 md:!w-4/5 lg:w-full"
                  src="/images/logo.svg"
                  alt="SwiftSupport Logo"
                  width="176"
                  height="49"
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
            <div className="md:block hidden">
              <Link
                rel="noopener"
                target="_blank"
                href="https://app.swiftsupport.ai/login"
                onClick={() => setOpenNav(false)}
                className={` ${
                  pathname.includes("agent-copilot")
                    ? "!text-[#000] !bg-white black-button"
                    : "new-button-black"
                }`}
              >
                Log in
              </Link>
            </div>
          </div>
          <Collapse
            open={openNav}
            className={`bg-white ${openNav ? "!h-full mt-2" : ""}`}
          >
            <div
              className={
                openNav
                  ? "w-full mx-auto md:pt-8 py-4 border-t border-[#e5e7eb]"
                  : "hidden"
              }
            >
              <div
                className={`flex slg:flex-row flex-col md:gap-12 lg:gap-20 gap-8 ${
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
        <div className={pathname === "/" ? "relative" : "hidden"}>
          <div
            className="fixed z-10 w-full"
            style={{ top: `${navbarHeight}px` }}
          >
            <Link
              href="https://cal.com/swiftsupport/demo"
              className="w-full"
              target="_blank"
            >
              <Image
                className="w-full md:max-h-[105px]"
                src="/images/Gitex Global.webp"
                alt="upcoming-event"
                width="1440"
                height="80"
                priority
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
