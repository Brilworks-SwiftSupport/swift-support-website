"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { useGoogleLogin, useGoogleOneTapLogin } from "@react-oauth/google";
import axios from "axios";

const HeroSection = () => {
  const router = useRouter();

  const ANALYTICS_ENDPOINT = "https://app.swiftsupport.ai/dashboard";
  const ONBOARDING_ENDPOINT = "https://app.swiftsupport.ai/onboarding";

  const doLogin = async (access_token) => {
    await axios
      .post(`https://api.swiftsupport.ai/api/register`, {
        google_token: access_token,
      })
      .then((response) => {
        if (response.status === 200) {
          router.replace(
            response?.data?.onboarding
              ? ANALYTICS_ENDPOINT
              : ONBOARDING_ENDPOINT
          );
        }
      })
      .catch((error) => {
        console.log(error);
        console.log(
          error.response?.data?.message || error.response?.data?.error
        );
      });
  };

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      // Call the async function without returning it
      doLogin(tokenResponse?.access_token).catch((error) => {
        console.error("Error during login:", error);
      });
    },
  });

  useGoogleOneTapLogin({
    onSuccess: login,
    onError: () => {
      console.log("Login Failed");
    },
  });

  return (
    <div className="hero-section xl:pb-[60px] xl:pt-[5px] 3xl:!py-[60px] py-[60px] lg:mt-[6%] md:mt-[10%] mt-[14%]">
      <div className="container max-w-[1200px] mx-auto">
        <div className="w-full flex flex-col">
          <div className="flex gap-6 lg:gap-0 lg:flex-row flex-col items-center xl:px-0 px-4">
            <div className="lg:w-1/2 w-full flex flex-col">
              <h1 className="lg:text-[54px] md:text-[42px] leading-tight text-[34px] w-full text-colorBlack font-bold mx-auto mb-[30px]">
                <span>
                  AI-Powered Support
                  <div className="banner-underline" />
                </span>
                for Your Business
              </h1>
              <p className="lg:!text-2xl !text-xl md:!leading-tight text-colorBlack lg:mb-[50px] md:mb-10 mb-8">
                SwiftSupport's mission is to streamline customer interactions
                and reduce wait times by providing businesses with&nbsp;
                <span className="bg-clip-text text-transparent bg-text-theme-gradient">
                  AI Automation, AI Co-pilots, & AI Agents.
                </span>
              </p>

              <div className="flex items-center justify-start flex-wrap gap-5 md:!mb-[60px] !mb-8">
                <Link
                  href="https://www.youtube.com/@SwiftSupportdotai"
                  target="_blank"
                  className="play-icon-btn rounded-[80px] pl-2 pr-[30px] py-2 text-base"
                >
                  <div className="p-[14px] !pl-4 rounded-full">
                    <Image
                      src="/images/play-arrow.svg"
                      alt="solution-providing"
                      width="14"
                      height="16"
                    />
                  </div>
                  Watch Demo
                </Link>
                <Link
                  href="https://app.swiftsupport.ai/signup"
                  target="_blank"
                  rel="noopener nofollow"
                  className="common-button try-now-btn rounded-[80px] px-[30px] py-[18px]"
                >
                  Try For Free
                </Link>
              </div>
              <div className="flex items-center justify-start">
                <Image
                  src="/images/image_avtar.svg"
                  alt="image-avtar"
                  width="42"
                  height="42"
                />
                <Image
                  className="-ml-[10px]"
                  src="/images/image_avtar (1).svg"
                  alt="image-avtar"
                  width="42"
                  height="42"
                />
                <Image
                  className="-ml-[10px]"
                  src="/images/image_avtar (2).svg"
                  alt="image-avtar"
                  width="42"
                  height="42"
                />
                <div className="flex items-center justify-center w-[42px] h-[42px] bg-themeBlue rounded-full -ml-[10px] border border-colorWhite">
                  <p className="text-sm text-center">2k+</p>
                </div>
                <p className="mx-[10px] text-base">Customers</p>
              </div>
            </div>
            <div className="lg:w-1/2 w-full h-full">
              <Image
                className="h-full !w-full"
                src="/images/hero-img.svg"
                alt="hero-image"
                width="615"
                height="641"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
