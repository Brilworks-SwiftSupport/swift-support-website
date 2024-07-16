"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useMediaQuery } from "react-responsive";

const ResolveCustomerQuestions = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1080 });

  return (
    <div className="mx-auto w-full section-padding">
      <div className="relative flex items-center justify-center">
        <Image
          className="md:block hidden self-center w-full"
          src={
            isMobile || isTablet
              ? "/images/tablet-signup.svg"
              : "/images/signup.svg"
          }
          width={1300}
          height={852}
          alt="Resolve customer questions"
        />
        <div className={isMobile ? "" : "signup-content"}>
          <h2 className="font-bold text-2xl md:text-3xl xl:text-4xl xl:leading-[45.36px] mb-[30px] text-center">
            Hybrid support model that combines{!isTablet && <br />}
            AI and human support
          </h2>
          <form className="w-full md:-mt-8 xl:mt-0">
            <div className="w-full md:w-4/5 lg:w-full mx-auto mb-[10px]">
              <label className="text-[#7E7E7E] text-base font-normal">
                Email Address
              </label>
            </div>
            <div className="w-full md:w-4/5 lg:w-full mx-auto lg:inline-flex flex flex-wrap gap-5">
              <input
                className="xl:w-[460px] md:w-3/5 w-full border border-colorBlack lg:h-[60px] h-[50px] md:rounded-[13px] rounded-[10px] md:py-[30px] md:pl-5 pl-3"
                type="email"
                placeholder="john123@gmail.com"
              />
              <Link
                rel="noopener"
                target="_blank"
                href="https://dev.swiftsupport.ai/signup"
                className="md:h-[60px] h-[50px] xl:w-[207px] md:w-2/6 w-full signup-button border border-colorBlack flex items-center justify-center"
              >
                <p className="font-bold">Sign Up for Free</p>
              </Link>
              {isMobile || isTablet ? (
                ""
              ) : (
                <div className="swing moving-pointer absolute -right-[46px] -bottom-[86px]">
                  <Image
                    className="self-end w-full"
                    src="/images/signup-click.svg"
                    width={60}
                    height={60}
                    alt="Signup pointer"
                  />
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResolveCustomerQuestions;
